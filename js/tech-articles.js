// Technical Articles
class TechArticles {
  constructor() {
    this.init();
  }

  init() {
    this.displayArticles();
  }

  displayArticles() {
    const container = document.querySelector('[data-tech-articles]');
    if (!container) return;

    const articles = [
      { title: '硬质合金刀具涂层技术详解', category: '技术', date: '2024-01-15', readTime: '8分钟' },
      { title: '钛合金加工刀具选型指南', category: '应用', date: '2024-01-10', readTime: '12分钟' },
      { title: '高速切削参数优化策略', category: '工艺', date: '2024-01-05', readTime: '10分钟' },
      { title: '刀具磨损机理与寿命预测', category: '技术', date: '2023-12-28', readTime: '15分钟' }
    ];

    container.innerHTML = '<h3 style="margin-bottom: 16px;">技术文章</h3>';

    const grid = document.createElement('div');
    grid.style.cssText = 'display: grid; gap: 12px;';

    articles.forEach(article => {
      const card = document.createElement('a');
      card.href = '#';
      card.style.cssText = `
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 16px;
        background: var(--bg-secondary);
        border-radius: 12px;
        text-decoration: none;
        color: inherit;
        transition: transform 0.2s, box-shadow 0.2s;
      `;

      card.innerHTML = `
        <div style="
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #0071e3, #5856d6);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 24px;
          flex-shrink: 0;
        ">📄</div>
        <div style="flex: 1;">
          <div style="font-weight: 600; margin-bottom: 4px;">${article.title}</div>
          <div style="display: flex; gap: 12px; font-size: 12px; color: var(--text-secondary);">
            <span style="
              padding: 2px 8px;
              background: var(--bg-tertiary);
              border-radius: 8px;
            ">${article.category}</span>
            <span>${article.date}</span>
            <span>⏱️ ${article.readTime}</span>
          </div>
        </div>
        <div style="color: #0071e3; font-size: 14px;">阅读 →</div>
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
  new TechArticles();
});
