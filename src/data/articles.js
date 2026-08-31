// We use Vite's import.meta.glob to load all JSON files from the CMS at build time
const cmsFiles = import.meta.glob('../../public/content/insights/*.json', { eager: true });

// Convert the glob object into an array and sort by date (newest first)
export const articles = Object.values(cmsFiles)
  .map(file => file.default || file)
  .map(article => {
    // Format the ISO date into a readable string if it exists
    if (article.date) {
      const d = new Date(article.date);
      article.dateStr = d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    }
    // Convert body to content for backwards compatibility with our views
    if (article.body) {
       article.content = article.body;
    }
    return article;
  })
  .sort((a, b) => new Date(b.date) - new Date(a.date));

export const getArticleById = (id) => articles.find(a => a.id === id);
