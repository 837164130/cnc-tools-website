// Product Technical Parameters
class TechParams {
  constructor() {
    this.init();
  }

  init() {
    this.displayParams();
  }

  displayParams() {
    const container = document.querySelector('[data-tech-params]');
    if (!container) return;

    const params = JSON.parse(container.dataset.techParams || '{}');
    if (Object.keys(params).length === 0) return;

    container.innerHTML = '<h3 style="margin-bottom: 16px;">技术参数</h3>';

    const grid = document.createElement('div');
    grid.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px;';

    Object.entries(params).forEach(([key, value]) => {
      const card = document.createElement('div');
      card.style.cssText = `
        padding: 16px;
        background: var(--bg-secondary);
        border-radius: 12px;
        text-align: center;
      `;

      card.innerHTML = `
        <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 8px; text-transform: uppercase;">${key}</div>
        <div style="font-size: 24px; font-weight: 700; color: #0071e3;">${value}</div>
      `;

      grid.appendChild(card);
    });

    container.appendChild(grid);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new TechParams();
});
