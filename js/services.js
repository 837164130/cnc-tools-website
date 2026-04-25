// Product Services
class ProductServices {
  constructor() {
    this.init();
  }

  init() {
    this.displayServices();
  }

  displayServices() {
    const container = document.querySelector('[data-services]');
    if (!container) return;

    const services = JSON.parse(container.dataset.services || '[]');
    if (services.length === 0) return;

    container.innerHTML = '<h3 style="margin-bottom: 24px;">相关服务</h3>';

    const grid = document.createElement('div');
    grid.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 16px;';

    services.forEach(service => {
      const card = document.createElement('div');
      card.style.cssText = `
        padding: 24px;
        background: var(--bg-secondary);
        border-radius: 12px;
        text-align: center;
        transition: transform 0.2s, box-shadow 0.2s;
      `;

      card.innerHTML = `
        <div style="font-size: 48px; margin-bottom: 16px;">${service.icon || '🔧'}</div>
        <h4 style="margin: 0 0 8px; font-size: 18px;">${service.name}</h4>
        <p style="margin: 0; color: var(--text-secondary); font-size: 14px; line-height: 1.6;">${service.description}</p>
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
  new ProductServices();
});
