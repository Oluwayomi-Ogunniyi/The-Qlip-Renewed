import { getArticleById } from './data/articles.js';

export const SITE = {
  name: 'The Qlip',
  tagline: 'Intelligence, Engineered.',
  url: (import.meta.env.VITE_SITE_URL || 'https://theqlip.com').replace(/\/+$/, ''),
  email: 'theqlipglobal@gmail.com',
  phone: '+2347087342882',
  whatsapp: 'https://wa.me/2347087342882',
  logo: '/images/logo.png',
  founded: '2024',
  description:
    'The Qlip is a deep-tech engineering and AI agency. We build high-performance software, applied AI systems, secure zero-trust infrastructure, multimedia experiences, machine learning and robotics — and we train teams to run it all.',
  socials: {
    linkedin: 'https://www.linkedin.com/in/oluwayomi-favour-ogunniyi',
    twitter: 'https://x.com/the_qlip',
    tiktok: 'https://www.tiktok.com/@the_qlip',
  },
};

export const absUrl = (path = '/') => `${SITE.url}${path.startsWith('/') ? '' : '/'}${path}`;
export const absImage = (src) => (src.startsWith('http') ? src : `${SITE.url}${src}`);

export const pageMeta = {
  '/': {
    title: 'The Qlip — AI Engineering, Software Development & Cybersecurity Agency',
    description:
      'The Qlip engineers high-performance software, applied AI systems, machine learning, multimedia and secure zero-trust infrastructure for demanding industries. Software engineering, cybersecurity, ML & robotics, testing and technical consultancy.',
  },
  '/about': {
    title: 'About The Qlip — Deep-Tech Engineering & AI Agency',
    description:
      'The Qlip is a deep-tech engineering agency building the systems that power the next decade: machine learning, offensive security, enterprise architecture and applied AI.',
  },
  '/work': {
    title: 'Our Work — Case Studies & Projects | The Qlip',
    description:
      'A curated portfolio of The Qlip’s finest architectural and digital achievements — neural infrastructure, cybersecurity perimeters, enterprise scalability and predictive analytics.',
  },
  '/insights': {
    title: 'Insights & Intel — Software, AI & Cybersecurity | The Qlip',
    description:
      'Deep dives and research from The Qlip on software architecture, applied artificial intelligence, machine learning and cybersecurity. Engineering intel for technical teams.',
  },
  '/services/software-engineering': {
    title: 'Software Engineering Services — System Architecture & APIs | The Qlip',
    description:
      'High-availability APIs, microservices, cloud-native applications and resilient system architecture. The Qlip builds software engineered to handle real traffic without failing.',
  },
  '/services/testing-support': {
    title: 'System Testing & QA Services — Load Testing, CI/CD | The Qlip',
    description:
      'Automated QA, load testing, stress analysis and CI/CD pipelines. The Qlip pushes your systems past their limits so failures never reach production.',
  },
  '/services/multimedia': {
    title: 'Multimedia & Interactive 3D Web Design | The Qlip',
    description:
      'WebGL interfaces, interactive 3D, motion design and premium user experience. The Qlip engineers digital experiences as beautiful as they are functional.',
  },
  '/services/cybersecurity': {
    title: 'Cybersecurity Services — Zero-Trust, Penetration Testing | The Qlip',
    description:
      'Zero-trust networks, threat intelligence, penetration testing and AI-driven threat detection. The Qlip builds infrastructure that simply ignores attacks.',
  },
  '/services/machine-learning': {
    title: 'Machine Learning & AI Development — LLMs, Computer Vision | The Qlip',
    description:
      'Custom LLMs, neural networks, predictive analytics, NLP and computer vision. The Qlip engineers applied machine learning models trained for strict business outcomes.',
  },
  '/services/training-consultancy': {
    title: 'Technical Training & Engineering Consultancy | The Qlip',
    description:
      'Hands-on engineering and AI training, architecture reviews and agile transformation. The Qlip elevates technical teams to world-class standards.',
  },
};

export const getMeta = (path, params = {}) => {
  if (path.startsWith('/insights/')) {
    const article = getArticleById(params.id);
    if (article) {
      return {
        title: `${article.title} | The Qlip`,
        description: article.excerpt || SITE.description,
        ogType: 'article',
        image: article.image,
        article,
      };
    }
    return {
      title: 'Intel Not Found | The Qlip',
      description: 'The requested research document could not be located in our databanks.',
      ogType: 'website',
      image: SITE.logo,
    };
  }
  return {
    ...(pageMeta[path] || pageMeta['/']),
    ogType: 'website',
    image: SITE.logo,
  };
};

export const jsonLdFor = (path, params = {}) => {
  const meta = getMeta(path, params);
  const url = absUrl(path);
  const graph = [organizationJsonLd(), websiteJsonLd()];

  if (meta.article) {
    graph.push(articleJsonLd(meta.article, url));
    graph.push(breadcrumbJsonLd('Insights', '/insights', meta.article.title, url));
  }
  if (path.startsWith('/services/')) {
    graph.push(serviceJsonLd(meta.title.replace(' | The Qlip', ''), url));
  }
  return graph;
};

export const organizationJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE.url}/#organization`,
  name: SITE.name,
  url: SITE.url,
  logo: absImage(SITE.logo),
  image: absImage(SITE.logo),
  email: SITE.email,
  telephone: SITE.phone,
  slogan: SITE.tagline,
  description: SITE.description,
  sameAs: Object.values(SITE.socials),
});

export const websiteJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE.url}/#website`,
  name: SITE.name,
  url: SITE.url,
  publisher: { '@id': `${SITE.url}/#organization` },
});

export const articleJsonLd = (article, url) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: article.title,
  description: article.excerpt,
  image: [absImage(article.image)],
  datePublished: article.date,
  dateModified: article.date,
  author: { '@type': 'Organization', name: SITE.name, url: SITE.url },
  publisher: { '@id': `${SITE.url}/#organization` },
  mainEntityOfPage: url,
});

export const breadcrumbJsonLd = (label, labelPath, currentLabel, currentUrl) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
    { '@type': 'ListItem', position: 2, name: label, item: absUrl(labelPath) },
    { '@type': 'ListItem', position: 3, name: currentLabel, item: currentUrl },
  ],
});

export const serviceJsonLd = (name, url) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name,
  url,
  serviceType: name,
  provider: { '@id': `${SITE.url}/#organization` },
  areaServed: 'Worldwide',
  availableChannel: [
    { '@type': 'ServiceChannel', availableLanguage: 'en', servicePhone: SITE.phone },
  ],
});

export const renderJsonLd = (path, params = {}) =>
  jsonLdFor(path, params).map((obj) => JSON.stringify(obj)).join('\n');