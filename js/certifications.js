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

    const certs = JSON.parse(container.dataset.certifications || '[]');
    if (certs.length === 0) return;

    container.innerHTML = '<h3 style="margin-bottom: 16px;">产品认证</h3>';

    const grid = document.createElement('div');
    grid.style.cssText = 'display: flex; flex-wrap: wrap; gap: 16px;';

    certs.forEach(cert => {
      const badge = document.createElement('div');
      badge.style.cssText = `
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 16px 20px;
        background: var(--bg-secondary);
        border-radius: 12px;
        border: 1px solid var(--border);
      `;

      badge.innerHTML = `
        <div style="
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #0071e3, #5856d6);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 20px;
          flex-shrink: 0;
        ">✓</div>
        <div>
          <div style="font-weight: 600;">${cert.name}</div>
          <div style="font-size: 12px; color: var(--text-secondary);">${cert.standard || ''}</div>
        </div>
      `;

      grid.appendChild(badge);
    });

    container.appendChild(grid);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ProductCertifications();
});
