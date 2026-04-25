// Product Certifications
class ProductCertifications {
  constructor() {
    this.init();
  }

  init() {
    this.displayCertifications();
  }

  displayCertifications() {
    const container = document.querySelector('[data-certifications]');
    if (!container) return;

    const certifications = JSON.parse(container.dataset.certifications || '[]');
    if (certifications.length === 0) return;

    container.innerHTML = '<h3 style="margin-bottom: 24px;">产品认证</h3>';

    const grid = document.createElement('div');
    grid.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px;';

    certifications.forEach(cert => {
      const card = document.createElement('div');
      card.style.cssText = `
        padding: 24px;
        background: var(--bg-secondary);
        border-radius: 12px;
        text-align: center;
        transition: transform 0.2s, box-shadow 0.2s;
      `;

      card.innerHTML = `
        <div style="font-size: 48px; margin-bottom: 12px;">${cert.icon || '🏆'}</div>
        <div style="font-weight: 600; margin-bottom: 4px;">${cert.name}</div>
        <div style="font-size: 14px; color: var(--text-secondary);">${cert.description || ''}</div>
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
  new ProductCertifications();
});
