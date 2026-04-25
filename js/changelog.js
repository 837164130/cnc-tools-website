// Product Changelog
class ProductChangelog {
  constructor() {
    this.init();
  }

  init() {
    this.displayChangelog();
  }

  displayChangelog() {
    const container = document.querySelector('[data-changelog]');
    if (!container) return;

    const versions = JSON.parse(container.dataset.changelog || '[]');
    if (versions.length === 0) return;

    container.innerHTML = '<h3 style="margin-bottom: 24px;">更新日志</h3>';

    const timeline = document.createElement('div');
    timeline.style.cssText = 'display: grid; gap: 16px;';

    versions.forEach(version => {
      const card = document.createElement('div');
      card.style.cssText = `
        padding: 20px;
        background: var(--bg-secondary);
        border-radius: 12px;
        border-left: 4px solid #0071e3;
      `;

      const typeColors = {
        'feature': '#34c759',
        'fix': '#ff3b30',
        'improvement': '#0071e3',
        'breaking': '#ff9500'
      };

      card.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <span style="font-size: 18px; font-weight: 700; color: #0071e3;">v${version.version}</span>
            <span style="font-size: 14px; color: var(--text-secondary);">${version.date}</span>
          </div>
          ${version.latest ? '<span style="padding: 2px 8px; background: #34c759; color: white; border-radius: 10px; font-size: 11px;">最新</span>' : ''}
        </div>
        
        <div style="display: grid; gap: 8px;">
          ${(version.changes || []).map(change => `
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="
                padding: 2px 6px;
                background: ${typeColors[change.type] || '#0071e3'}20;
                color: ${typeColors[change.type] || '#0071e3'};
                border-radius: 4px;
                font-size: 11px;
                font-weight: 600;
                text-transform: uppercase;
              ">${change.type}</span>
              <span style="font-size: 14px;">${change.description}</span>
            </div>
          `).join('')}
        </div>
      `;

      timeline.appendChild(card);
    });

    container.appendChild(timeline);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ProductChangelog();
});
