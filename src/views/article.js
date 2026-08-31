import { marked } from 'marked';
import { getArticleById } from '../data/articles.js';
import { SITE } from '../seo.js';

export const renderArticle = (params) => {
  const article = getArticleById(params.id);

  if (!article) {
    return `
      <section class="container" style="padding-top: 150px; text-align: center; height: 60vh;">
        <h1 class="axon-section-title">Intel Not Found</h1>
        <p>The requested research document could not be located in our databanks.</p>
        <a href="/insights" class="btn-explore" data-link style="margin-top: 20px;">Return to Insights</a>
      </section>
    `;
  }

  const parsedContent = marked.parse(article.content);

  // Create share URLs
  const articleUrl = encodeURIComponent(`${SITE.url}/insights/${article.id}`);
  const articleTitle = encodeURIComponent(article.title);
  const linkedInShare = `https://www.linkedin.com/shareArticle?mini=true&url=${articleUrl}&title=${articleTitle}`;
  const twitterShare = `https://twitter.com/intent/tweet?url=${articleUrl}&text=${articleTitle}`;

  return `
    <article class="article-view">
      <div class="article-hero">
        <div class="article-hero-bg">
          <img src="${article.image}" alt="${article.title}" fetchpriority="high" />
          <div class="article-hero-overlay"></div>
        </div>
        <div class="container article-hero-content text-center">
          <a href="/insights" class="back-link" data-link>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            Back to Insights
          </a>
          <div class="article-meta">
            <span class="insight-category">${article.category}</span>
            <span class="insight-date">${article.dateStr || article.date} &middot; ${article.readTime}</span>
          </div>
          <h1 class="article-title">${article.title}</h1>
        </div>
      </div>

      <div class="container article-body-container">
        <div class="article-content">
          ${parsedContent}
        </div>

        <div class="article-share">
          <p class="sub-label">SHARE THIS INTEL</p>
          <div class="share-buttons">
            <a class="share-btn magnetic" href="${linkedInShare}" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a class="share-btn magnetic" href="${twitterShare}" target="_blank" rel="noopener noreferrer">Twitter</a>
            <button class="share-btn magnetic" type="button" onclick="navigator.clipboard.writeText('${SITE.url}/insights/${article.id}')">Copy Link</button>
          </div>
        </div>
      </div>
    </article>
  `;
};