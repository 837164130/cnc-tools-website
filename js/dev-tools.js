// Product Developer Tools
class ProductDevTools {
  constructor() {
    this.init();
  }

  init() {
    this.displayDevTools();
  }

  displayDevTools() {
    const container = document.querySelector('[data-dev-tools]');
    if (!container) return;

    const tools = JSON.parse(container.dataset.devTools || '[]');
    if (tools.length === 0) return;

    container.innerHTML = '<h3 style="margin-bottom: 24px;">开发者工具</h3>';

    const grid = document.createElement('div');
    grid.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 16px;';

    tools.forEach(tool => {
      const card = document.createElement('a');
      card.href = tool.url || '#';
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
        <div style="font-size: 32px; margin-bottom: 12px;">${tool.icon || '🛠️'}</div>
        <h4 style="margin: 0 0 8px; font-size: 16px;">${tool.name}</h4>
        <p style="margin: 0 0 12px; color: var(--text-secondary); font-size: 14px;">${tool.description}</p>
        <div style="font-size: 12px; color: #0071e3;">${tool.version || ''}</div>
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
  new ProductDevTools();
});
