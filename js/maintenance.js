// Product Maintenance
class ProductMaintenance {
  constructor() {
    this.init();
  }

  init() {
    this.displayMaintenance();
  }

  displayMaintenance() {
    const container = document.querySelector('[data-maintenance]');
    if (!container) return;

    const items = JSON.parse(container.dataset.maintenance || '[]');
    if (items.length === 0) return;

    container.innerHTML = '<h3 style="margin-bottom: 24px;">维护保养</h3>';

    const grid = document.createElement('div');
    grid.style.cssText = 'display: grid; gap: 16px;';

    items.forEach(item => {
      const card = document.createElement('div');
      card.style.cssText = `
        padding: 20px;
        background: var(--bg-secondary);
        border-radius: 12px;
        border-left: 4px solid #0071e3;
      `;

      card.innerHTML = `
        <div style="display: flex; align-items: flex-start; gap: 16px;">
          <div style="font-size: 32px; flex-shrink: 0;">${item.icon || '🔧'}</div>
          <div style="flex: 1;">
            <h4 style="margin: 0 0 8px; font-size: 16px;">${item.title}</h4>
            <p style="margin: 0 0 12px; color: var(--text-secondary); line-height: 1.6;">${item.description}</p>
            ${item.frequency ? `
              <div style="
                display: inline-flex;
                align-items: center;
                gap: 6px;
                padding: 4px 12px;
                background: rgba(0, 113, 227, 0.1);
                border-radius: 12px;
                font-size: 12px;
                color: #0071e3;
              ">
                <span>🕐</span>
                <span>${item.frequency}</span>
              </div>
            ` : ''}
          </div>
        </div>
      `;

      grid.appendChild(card);
    });

    container.appendChild(grid);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ProductMaintenance();
});
