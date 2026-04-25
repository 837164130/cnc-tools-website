// Product Reports / Whitepapers
class ProductReports {
  constructor() {
    this.init();
  }

  init() {
    this.displayReports();
  }

  displayReports() {
    const container = document.querySelector('[data-reports]');
    if (!container) return;

    const reports = JSON.parse(container.dataset.reports || '[]');
    if (reports.length === 0) return;

    container.innerHTML = '<h3 style="margin-bottom: 24px;">技术报告</h3>';

    const grid = document.createElement('div');
    grid.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 16px;';

    reports.forEach(report => {
      const card = document.createElement('a');
      card.href = report.url || '#';
      card.target = '_blank';
      card.style.cssText = `
        display: block;
        padding: 24px;
        background: var(--bg-secondary);
        border-radius: 12px;
        text-decoration: none;
        color: inherit;
        transition: transform 0.2s, box-shadow 0.2s;
      `;

      card.innerHTML = `
        <div style="display: flex; gap: 12px; margin-bottom: 12px;">
          <span style="
            padding: 4px 10px;
            background: var(--bg-tertiary);
            border-radius: 12px;
            font-size: 12px;
            color: var(--text-secondary);
          ">${report.type || '白皮书'}</span>
          <span style="font-size: 12px; color: var(--text-secondary);">${report.date || ''}</span>
        </div>
        <h4 style="margin: 0 0 8px; font-size: 16px; line-height: 1.4;">${report.title}</h4>
        <p style="margin: 0 0 12px; color: var(--text-secondary); font-size: 14px; line-height: 1.6; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">${report.summary || ''}</p>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span style="font-size: 12px; color: var(--text-secondary);">📄 ${report.pages || ''} 页</span>
          <span style="font-size: 14px; color: #0071e3;">下载 PDF →</span>
        </div>
      `;

      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-4px)';
        card.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)';
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
  new ProductReports();
});
