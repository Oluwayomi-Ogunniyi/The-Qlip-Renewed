/* eslint-disable no-console */
/**
 * Static prerender for SEO — turns the SPA into a set of fully-rendered
 * HTML pages (one per route) so crawlers see real content without JS.
 *
 * Runs AFTER `vite build`. It:
 *   1. Renders every route's view to HTML via Vite's SSR module loader.
 *   2. Injects per-route <title>, meta description, canonical, Open Graph
 *      and Twitter tags, plus JSON-LD structured data.
 *   3. Writes dist/<route>/index.html for every route, plus dist/404.html.
 *   4. Generates dist/sitemap.xml and writes the production Sitemap URL
 *      into dist/robots.txt.
 *
 * The client-side router still hydrates over this markup, so navigation,
 * animations and the AI chat keep working exactly as before.
 */
import { createServer } from 'vite';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const dist = resolve(root, 'dist');

const escapeHtml = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const htmlForPage = (html, page, absoluteUrl, jsonLd) => {
  let out = html
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(page.title)}</title>`)
    .replace(/<link rel="canonical" href="[^"]*"/, () => `<link rel="canonical" href="${escapeHtml(absoluteUrl)}"`);

  const setTextMeta = (attr, key, value) => {
    const re = new RegExp(`<meta ${attr}="${key}" content="[^"]*"[^>]*>`);
    const tag = out.match(re)?.[0];
    if (tag) out = out.replace(tag, tag.replace(/content="[^"]*"/, `content="${escapeHtml(value)}"`));
  };

  setTextMeta('name', 'description', page.description);
  setTextMeta('property', 'og:title', page.title);
  setTextMeta('property', 'og:description', page.description);
  setTextMeta('property', 'og:url', absoluteUrl);
  setTextMeta('property', 'og:image', page.image || '');
  setTextMeta('property', 'og:type', page.ogType || 'website');
  setTextMeta('name', 'twitter:title', page.title);
  setTextMeta('name', 'twitter:description', page.description);
  setTextMeta('name', 'twitter:image', page.image || '');

  out = out.replace(
    /<script id="seo-jsonld"[\s\S]*?<\/script>/,
    `<script id="seo-jsonld" type="application/ld+json">\n${jsonLd}\n    </script>`,
  );
  out = out.replace(
    /<main id="app-view">[\s\S]*?<\/main>/,
    `<main id="app-view">\n    ${page.content}\n    </main>`,
  );
  return out;
};

const write = (relPath, content) => {
  const target = resolve(dist, relPath);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, content, 'utf8');
};

const server = await createServer({
  root,
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'error',
});

try {
  const seo = await server.ssrLoadModule('/src/seo.js');
  const data = await server.ssrLoadModule('/src/data/articles.js');

  const { SITE, getMeta, renderJsonLd } = seo;
  const { articles } = data;

  const template = readFileSync(resolve(dist, 'index.html'), 'utf8');

  const staticRoutes = [
    { path: '/', module: '/src/views/home.js', view: 'homeView' },
    { path: '/about', module: '/src/views/about.js', view: 'aboutView' },
    { path: '/work', module: '/src/views/work.js', view: 'workView' },
    { path: '/insights', module: '/src/views/insights.js', view: 'renderInsights', isFn: true },
    { path: '/services/software-engineering', module: '/src/views/software.js', view: 'softwareView' },
    { path: '/services/testing-support', module: '/src/views/testing.js', view: 'testingView' },
    { path: '/services/multimedia', module: '/src/views/multimedia.js', view: 'multimediaView' },
    { path: '/services/cybersecurity', module: '/src/views/cyber.js', view: 'cyberView' },
    { path: '/services/machine-learning', module: '/src/views/ml.js', view: 'mlView' },
    { path: '/services/training-consultancy', module: '/src/views/training.js', view: 'trainingView' },
  ];

  const articleRoutes = articles.map((a) => ({ path: `/insights/${a.id}`, id: a.id }));

  console.log(`[prerender] Site URL: ${SITE.url}`);
  console.log(`[prerender] Rendering ${staticRoutes.length + articleRoutes.length} pages...`);

  const sitemapUrls = [];

  for (const route of staticRoutes) {
    const mod = await server.ssrLoadModule(route.module);
    const content = route.isFn ? mod[route.view]() : mod[route.view];
    const params = {};
    const meta = { ...getMeta(route.path, params), image: seo.absImage(getMeta(route.path, params).image) };
    const absolute = SITE.url + (route.path === '/' ? '/' : `${route.path}/`);

    const html = htmlForPage(template, { ...meta, content }, absolute, renderJsonLd(route.path, params));
    write(route.path === '/' ? 'index.html' : route.path.replace(/^\//, '') + '/index.html', html);
    sitemapUrls.push({
      loc: absolute,
      lastmod: new Date().toISOString().slice(0, 10),
      priority: route.path === '/' ? 1.0 : route.path === '/insights' ? 0.8 : 0.9,
      changefreq: route.path === '/' ? 'weekly' : 'monthly',
    });
    console.log(`  ✓ ${route.path}`);
  }

  for (const route of articleRoutes) {
    const mod = await server.ssrLoadModule('/src/views/article.js');
    const content = mod.renderArticle({ id: route.id });
    const meta = { ...getMeta(route.path, { id: route.id }), image: seo.absImage(getMeta(route.path, { id: route.id }).image) };
    const article = articles.find((a) => a.id === route.id);
    const absolute = SITE.url + route.path + '/';

    const html = htmlForPage(template, { ...meta, content }, absolute, renderJsonLd(route.path, { id: route.id }));
    write(`insights/${route.id}/index.html`, html);
    sitemapUrls.push({
      loc: absolute,
      lastmod: (article?.date || new Date().toISOString()).slice(0, 10),
      priority: 0.8,
      changefreq: 'monthly',
    });
    console.log(`  ✓ ${route.path}`);
  }

  // 404 page
  const notFoundMeta = {
    title: '404 — Page Not Found | The Qlip',
    description: 'The page you are looking for does not exist. Head back to The Qlip home page.',
    image: SITE.url + SITE.logo,
    content: `
    <section class="container" style="padding-top: 160px; padding-bottom: 120px; text-align: center; min-height: 60vh;">
      <span class="sub-label">ERROR 404</span>
      <h1 class="axon-section-title" style="margin-top: 24px;">Intel Not Found</h1>
      <p class="section-desc" style="margin: 24px auto 32px; max-width: 480px;">The page you requested could not be located in our databanks. It may have been moved or decommissioned.</p>
      <a href="/" class="btn-explore" data-link>Back to Home</a>
    </section>`,
  };
  const notFoundAbsolute = SITE.url + '/404.html';
  const notFoundHtml = htmlForPage(template, notFoundMeta, notFoundAbsolute, renderJsonLd('/'));
  write('404.html', notFoundHtml);
  console.log('  ✓ /404.html');

  // sitemap.xml
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls
  .map((u) => `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority.toFixed(1)}</priority>\n  </url>`)
  .join('\n')}
</urlset>
`;
  write('sitemap.xml', sitemap);
  console.log(`  ✓ /sitemap.xml (${sitemapUrls.length} URLs)`);

  // robots.txt with the production Sitemap URL
  const robotsBase = readFileSync(resolve(root, 'public', 'robots.txt'), 'utf8');
  const robots = `${robotsBase.replace(/[\s]*$/,'')}

Sitemap: ${SITE.url}/sitemap.xml
`;
  write('robots.txt', robots);
  console.log('  ✓ /robots.txt');

  console.log('[prerender] Done.');
} finally {
  await server.close();
}