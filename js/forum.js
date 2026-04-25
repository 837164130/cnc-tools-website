// Product Forum / Community
class ProductForum {
  constructor() {
    this.init();
  }

  init() {
    this.displayForum();
  }

  displayForum() {
    const container = document.querySelector('[data-forum]');
    if (!container) return;

    const topics = JSON.parse(container.dataset.forum || '[]');
    if (topics.length === 0) return;

    container.innerHTML = '<h3 style="margin-bottom: 24px;">技术论坛</h3>';

    const grid = document.createElement('div');
    grid.style.cssText = 'display: grid; gap: 16px;';

    topics.forEach(topic => {
      const card = document.createElement('div');
      card.style.cssText = `
        padding: 20px;
        background: var(--bg-secondary);
        border-radius: 12px;
        transition: transform 0.2s, box-shadow 0.2s;
        cursor: pointer;
      `;

      card.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
          <h4 style="margin: 0; font-size: 16px; line-height: 1.4;">${topic.title}</h4>
          <span style="
            padding: 2px 8px;
            background: ${topic.solved ? '#34c759' : '#ff9500'};
            color: white;
            border-radius: 10px;
            font-size: 11px;
            white-space: nowrap;
          ">${topic.solved ? '已解决' : '讨论中'}</span>
        </div>
        <p style="margin: 0 0 12px; color: var(--text-secondary); font-size: 14px; line-height: 1.6; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">${topic.summary}</p>
        <div style="display: flex; justify-content: space-between; align-items: center; font-size: 12px; color: var(--text-secondary);">
          <div style="display: flex; gap: 16px;">
            <span>👤 ${topic.author}</span>
            <span>💬 ${topic.replies || 0} 回复</span>
            <span>👁 ${topic.views || 0} 浏览</span>
          </div>
          <span>${topic.time || ''}</span>
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
  new ProductForum();
});
