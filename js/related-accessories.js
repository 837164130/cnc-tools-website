// Related Accessories
class RelatedAccessories {
  constructor() {
    this.init();
  }

  init() {
    this.displayAccessories();
  }

  displayAccessories() {
    const container = document.querySelector('[data-related-accessories]');
    if (!container) return;

    const accessories = JSON.parse(container.dataset.relatedAccessories || '[]');
    if (accessories.length === 0) return;

    container.innerHTML = '<h3 style="margin-bottom: 16px;">相关配件</h3>';

    const grid = document.createElement('div');
    grid.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px;';

    accessories.forEach(item => {
      const card = document.createElement('a');
      card.href = item.url || '#';
      card.style.cssText = `
        display: block;
        padding: 16px;
        background: var(--bg-secondary);
        border-radius: 12px;
        text-decoration: none;
        color: inherit;
        text-align: center;
        transition: transform 0.2s, box-shadow 0.2s;
      `;

      card.innerHTML = `
        <div style="font-size: 48px; margin-bottom: 12px;">${item.icon || '🔧'}</div>
        <div style="font-weight: 600; margin-bottom: 4px;">${item.name}</div>
        <div style="font-size: 14px; color: var(--text-secondary);">${item.price || ''}</div>
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
  new RelatedAccessories();
});
