import gsap from 'gsap';
import { homeView } from './views/home.js';
import { softwareView } from './views/software.js';
import { testingView } from './views/testing.js';
import { multimediaView } from './views/multimedia.js';
import { cyberView } from './views/cyber.js';
import { mlView } from './views/ml.js';
import { trainingView } from './views/training.js';
import { workView } from './views/work.js';
import { aboutView } from './views/about.js';
import { renderInsights } from './views/insights.js';
import { renderArticle } from './views/article.js';
import { SITE, getMeta, absUrl, absImage, renderJsonLd } from './seo.js';
const routes = {
  '/': { view: homeView },
  '/services/software-engineering': { view: softwareView },
  '/services/testing-support': { view: testingView },
  '/services/multimedia': { view: multimediaView },
  '/services/cybersecurity': { view: cyberView },
  '/services/machine-learning': { view: mlView },
  '/services/training-consultancy': { view: trainingView },
  '/work': { view: workView },
  '/about': { view: aboutView },
  '/insights': { view: renderInsights },
};

const setMeta = (attr, key, content) => {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
};

const setLink = (rel, href) => {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
};

export class Router {
  constructor(appContainerId, reInitAnimationsCallback) {
    this.appContainer = document.getElementById(appContainerId);
    this.reInitAnimations = reInitAnimationsCallback;

    // Listen for back/forward buttons
    window.addEventListener('popstate', this.handleRoute.bind(this));

    // Initial route
    this.handleRoute();
  }

  async handleRoute() {
    let path = window.location.pathname;

    // Hash fallback handling (in case of old # links)
    if (window.location.hash) {
      path = window.location.hash.replace('#', '/');
      // Remove hash and update URL without reloading
      window.history.replaceState({}, '', path);
    }

    // Normalize path
    if (path !== '/' && path.endsWith('/')) {
      path = path.slice(0, -1);
    }

    const pathSegments = path.split('/').filter(Boolean);
    let route = routes[path];
    let params = {};

    // Dynamic Route Matching
    if (!route && path.startsWith('/insights/')) {
      const id = pathSegments[1];
      if (id) {
        route = { view: renderArticle };
        params = { id };
      }
    }

    // Fuzzy matching for services (e.g., if AI or user types /cybersecurity instead of /services/cybersecurity)
    if (!route && routes[`/services${path}`]) {
      path = `/services${path}`;
      route = routes[path];
      window.history.replaceState({}, '', path);
    }

    // Fallback to home if 404
    if (!route) route = routes['/'];

    this.applySEO(path, params);

    // Load dynamic view if it's a string (template) or a function returning a string/promise
    let newHtml = '';
    if (typeof route.view === 'string') {
      newHtml = route.view;
    } else if (typeof route.view === 'function') {
      newHtml = await route.view(params);
    }

    this.transitionView(newHtml);
  }

  applySEO(path, params = {}) {
    const meta = getMeta(path, params);
    const canonical = absUrl(path === '/' ? '/' : path.endsWith('/') ? path : `${path}/`);
    const image = absImage(meta.image || SITE.logo);

    document.title = meta.title;
    setMeta('name', 'description', meta.description);
    setLink('canonical', canonical);

    setMeta('property', 'og:title', meta.title);
    setMeta('property', 'og:description', meta.description);
    setMeta('property', 'og:type', meta.ogType || 'website');
    setMeta('property', 'og:url', absUrl(path));
    setMeta('property', 'og:image', image);

    setMeta('name', 'twitter:title', meta.title);
    setMeta('name', 'twitter:description', meta.description);
    setMeta('name', 'twitter:image', image);

    let ld = document.getElementById('seo-jsonld');
    if (!ld) {
      ld = document.createElement('script');
      ld.id = 'seo-jsonld';
      ld.type = 'application/ld+json';
      document.head.appendChild(ld);
    }
    ld.textContent = renderJsonLd(path, params);
  }

  transitionView(newHtml) {
    // Fade out current content
    gsap.to(this.appContainer, {
      opacity: 0,
      y: 20,
      duration: 0.4,
      ease: 'power2.inOut',
      onComplete: () => {
        // Swap content
        this.appContainer.innerHTML = newHtml;

        // Force scroll to top using multiple methods to ensure it works across all devices
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;

        // Also do it on the next frame to guarantee DOM has painted the new height
        requestAnimationFrame(() => {
          window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        });

        // Call the main.js callback to re-initialize GSAP scroll triggers and canvases for the new DOM
        if (this.reInitAnimations) {
          this.reInitAnimations();
        }

        // Fade in new content
        gsap.to(this.appContainer, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out'
        });
      }
    });
  }

  navigate(path) {
    if (path === window.location.pathname) return;
    window.history.pushState({}, '', path);
    this.handleRoute();
  }

  // Bind all internal links to the router
  bindLinks() {
    document.body.addEventListener('click', e => {
      const link = e.target.closest('a');
      if (link && link.hasAttribute('data-link')) {
        e.preventDefault();
        this.navigate(link.getAttribute('href'));
      }
    });
  }
}