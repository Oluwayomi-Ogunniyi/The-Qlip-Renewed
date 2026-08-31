import { articles } from '../data/articles.js';

export const renderInsights = () => {
  const articlesHtml = articles.map((article, index) => `
    <a href="/insights/${article.id}" class="insight-card magnetic" data-link style="animation-delay: ${index * 0.1}s">
      <div class="insight-image-wrapper">
        <img src="${article.image}" alt="${article.title}" class="insight-image" loading="lazy" decoding="async" />
        <div class="insight-overlay"></div>
      </div>
      <div class="insight-content">
        <div class="insight-meta">
          <span class="insight-category">${article.category}</span>
          <span class="insight-date">${article.dateStr || article.date} &middot; ${article.readTime}</span>
        </div>
        <h3 class="insight-title">${article.title}</h3>
        <p class="insight-excerpt">${article.excerpt}</p>
        <div class="insight-footer">
          <span class="read-more">Read Intel</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </div>
      </div>
    </a>
  `).join('');

  return `
    <section class="insights-hero" style="padding-top: 150px; padding-bottom: 50px;">
      <div class="container text-center">
        <span class="sub-label">RESEARCH & INTEL</span>
        <h1 class="axon-section-title">Insights</h1>
        <p class="section-desc" style="margin: 0 auto;">Deep dives into software architecture, cybersecurity, and applied artificial intelligence.</p>
      </div>
    </section>

    <section class="insights-grid-section" style="padding-bottom: 150px;">
      <div class="container">
        <div class="insights-grid">
          ${articlesHtml}
        </div>
      </div>
    </section>
  `;
};
