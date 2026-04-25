// Latest News / Updates
class LatestNews {
  constructor() {
    this.init();
  }

  init() {
    this.displayNews();
  }

  displayNews() {
    const container = document.querySelector('[data-latest-news]');
    if (!container) return;

    const news = [
      { title: '新品发布：高性能涂层铣刀系列', date: '2024-01-15', tag: '新品' },
      { title: '春节放假通知', date: '2024-01-10', tag: '公告' },
      { title: '2023年度优秀供应商评选结果', date: '2024-01-05', tag: '资讯' },
      { title: '数控刀具选型指南更新', date: '2023-12-28', tag: '技术' },
      { title: '元旦促销活动开始', date: '2023-12-20', tag: '促销' }
    ];

    container.innerHTML = '<h3 style="margin-bottom: 16px;">最新动态</h3>';

    const list = document.createElement('div');
    list.style.cssText = 'display: grid; gap: 12px;';

    news.forEach(item => {
      const card = document.createElement('a');
      card.href = '#';
      card.style.cssText = `
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 16px;
        background: var(--bg-secondary);
        border-radius: 12px;
        text-decoration: none;
        color: inherit;
        transition: transform 0.2s, box-shadow 0.2s;
      `;

      card.innerHTML = `
        <div style="
          padding: 4px 10px;
          background: var(--bg-tertiary);
          border-radius: 12px;
          font-size: 12px;
          color: var(--text-secondary);
          white-space: nowrap;
        ">${item.tag}</div>
        <div style="flex: 1; font-weight: 600;">${item.title}</div>
        <div style="font-size: 12px; color: var(--text-secondary); white-space: nowrap;">${item.date}</div>
      `;

      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateX(4px)';
        card.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.boxShadow = '';
      });

      list.appendChild(card);
    });

    container.appendChild(list);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new LatestNews();
});
