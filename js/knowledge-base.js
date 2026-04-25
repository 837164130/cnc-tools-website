// Product Knowledge Base
class ProductKnowledgeBase {
  constructor() {
    this.init();
  }

  init() {
    this.displayKnowledgeBase();
  }

  displayKnowledgeBase() {
    const container = document.querySelector('[data-knowledge-base]');
    if (!container) return;

    const articles = JSON.parse(container.dataset.knowledgeBase || '[]');
    if (articles.length === 0) return;

    container.innerHTML = '<h3 style="margin-bottom: 24px;">知识库</h3>';

    const grid = document.createElement('div');
    grid.style.cssText = 'display: grid; gap: 16px;';

    articles.forEach(article => {
      const card = document.createElement('div');
      card.style.cssText = `
        padding: 20px;
        background: var(--bg-secondary);
        border-radius: 12px;
        transition: transform 0.2s, box-shadow 0.2s;
        cursor: pointer;
      `;

      card.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
          <div style="font-size: 24px;">${article.icon || '📚'}</div>
          <h4 style="margin: 0; font-size: 16px;">${article.title}</h4>
        </div>
        <p style="margin: 0 0 12px; color: var(--text-secondary); font-size: 14px; line-height: 1.6;">${article.summary}</p>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span style="font-size: 12px; color: var(--text-secondary);">${article.category || '通用'}</span>
          <span style="font-size: 12px; color: #0071e3;">阅读 →</span>
        </div>
      `;

      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateX(4px)';
        card.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.boxShadow = '';
      });

      grid.appendChild(card);
    });

    container.appendChild(grid);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ProductKnowledgeBase();
});
