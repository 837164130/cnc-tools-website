// Product Applications
class ProductApplications {
  constructor() {
    this.init();
  }

  init() {
    this.displayApplications();
  }

  displayApplications() {
    const container = document.querySelector('[data-applications]');
    if (!container) return;

    const applications = JSON.parse(container.dataset.applications || '[]');
    if (applications.length === 0) return;

    container.innerHTML = '<h3 style="margin-bottom: 24px;">应用案例</h3>';

    const grid = document.createElement('div');
    grid.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px;';

    applications.forEach(app => {
      const card = document.createElement('div');
      card.style.cssText = `
        padding: 20px;
        background: var(--bg-secondary);
        border-radius: 12px;
        transition: transform 0.2s, box-shadow 0.2s;
      `;

      card.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
          <div style="font-size: 32px;">${app.icon || '🏭'}</div>
          <h4 style="margin: 0; font-size: 16px;">${app.title}</h4>
        </div>
        <p style="margin: 0 0 12px; color: var(--text-secondary); line-height: 1.6;">${app.description}</p>
        ${app.materials ? `
          <div style="display: flex; flex-wrap: wrap; gap: 6px;">
            ${app.materials.map(material => `
              <span style="
                padding: 4px 10px;
                background: var(--bg-tertiary);
                border-radius: 12px;
                font-size: 12px;
                color: var(--text-secondary);
              ">${material}</span>
            `).join('')}
          </div>
        ` : ''}
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
  new ProductApplications();
});
