// Product Partners
class ProductPartners {
  constructor() {
    this.init();
  }

  init() {
    this.displayPartners();
  }

  displayPartners() {
    const container = document.querySelector('[data-partners]');
    if (!container) return;

    const partners = JSON.parse(container.dataset.partners || '[]');
    if (partners.length === 0) return;

    container.innerHTML = '<h3 style="margin-bottom: 24px;">合作伙伴</h3>';

    const grid = document.createElement('div');
    grid.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px;';

    partners.forEach(partner => {
      const card = document.createElement('div');
      card.style.cssText = `
        padding: 24px;
        background: var(--bg-secondary);
        border-radius: 12px;
        text-align: center;
        transition: transform 0.2s, box-shadow 0.2s;
      `;

      card.innerHTML = `
        <div style="font-size: 48px; margin-bottom: 12px;">${partner.icon || '🤝'}</div>
        <div style="font-weight: 600; margin-bottom: 4px;">${partner.name}</div>
        <div style="font-size: 14px; color: var(--text-secondary);">${partner.description || ''}</div>
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
  new ProductPartners();
});
