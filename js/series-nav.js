// Product Series Navigation
class SeriesNav {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('[data-series-nav]').forEach(container => {
      this.setupNavigation(container);
    });
  }

  setupNavigation(container) {
    const series = JSON.parse(container.dataset.seriesNav || '[]');
    if (series.length === 0) return;

    const currentId = container.dataset.currentId;

    container.innerHTML = `
      <div style="background: var(--bg-secondary); border-radius: 16px; padding: 24px;">
        <h3 style="margin-bottom: 16px; font-size: 18px;">产品系列</h3>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          ${series.map(item => `
            <a href="${item.url}" style="
              display: flex;
              align-items: center;
              padding: 12px 16px;
              border-radius: 10px;
              text-decoration: none;
              color: inherit;
              transition: all 0.2s;
              background: ${item.id === currentId ? 'var(--accent)' : 'transparent'};
              color: ${item.id === currentId ? 'white' : 'inherit'};
            " onmouseover="if(this.dataset.active!=='true'){this.style.background='var(--bg-tertiary)'}" onmouseout="if(this.dataset.active!=='true'){this.style.background='transparent'}" data-active="${item.id === currentId}">
              <span style="font-size: 20px; margin-right: 12px;">${item.icon}</span>
              <div style="flex: 1;">
                <div style="font-weight: 600; font-size: 14px;">${item.name}</div>
                <div style="font-size: 12px; opacity: 0.7;">${item.count}款产品</div>
              </div>
              ${item.id === currentId ? '<span style="font-size: 12px;">当前</span>' : '<span style="opacity: 0.5;">→</span>'}
            </a>
          `).join('')}
        </div>
      </div>
    `;
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new SeriesNav();
});
