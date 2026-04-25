// Product Qualifications
class ProductQualifications {
  constructor() {
    this.init();
  }

  init() {
    this.displayQualifications();
  }

  displayQualifications() {
    const container = document.querySelector('[data-qualifications]');
    if (!container) return;

    const qualifications = JSON.parse(container.dataset.qualifications || '[]');
    if (qualifications.length === 0) return;

    container.innerHTML = '<h3 style="margin-bottom: 24px;">企业资质</h3>';

    const grid = document.createElement('div');
    grid.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 16px;';

    qualifications.forEach(qual => {
      const card = document.createElement('div');
      card.style.cssText = `
        padding: 24px;
        background: var(--bg-secondary);
        border-radius: 12px;
        text-align: center;
        transition: transform 0.2s, box-shadow 0.2s;
      `;

      card.innerHTML = `
        <div style="font-size: 48px; margin-bottom: 12px;">${qual.icon || '📜'}</div>
        <div style="font-weight: 600; margin-bottom: 4px;">${qual.name}</div>
        <div style="font-size: 14px; color: var(--text-secondary);">${qual.description || ''}</div>
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
  new ProductQualifications();
});
