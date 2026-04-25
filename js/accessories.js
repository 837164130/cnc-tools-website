// Product Accessories
class ProductAccessories {
  constructor() {
    this.init();
  }

  init() {
    this.displayAccessories();
  }

  displayAccessories() {
    const container = document.querySelector('[data-accessories]');
    if (!container) return;

    const accessories = JSON.parse(container.dataset.accessories || '[]');
    if (accessories.length === 0) return;

    container.innerHTML = '<h3 style="margin-bottom: 16px;">推荐配件</h3>';

    const grid = document.createElement('div');
    grid.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px;';

    accessories.forEach(accessory => {
      const card = document.createElement('a');
      card.href = accessory.url || '#';
      card.style.cssText = `
        display: block;
        padding: 16px;
        background: var(--bg-secondary);
        border-radius: 12px;
        text-decoration: none;
        color: inherit;
        transition: transform 0.2s, box-shadow 0.2s;
      `;
      card.innerHTML = `
        <div style="width: 100%; height: 120px; background: var(--bg-tertiary); border-radius: 8px; margin-bottom: 12px; display: flex; align-items: center; justify-content: center;">
          ${accessory.image ? `<img src="${accessory.image}" alt="" style="max-width: 100%; max-height: 100%; object-fit: cover;">` : '🔧'}
        </div>
        <div style="font-weight: 600; margin-bottom: 4px;">${accessory.name}</div>
        <div style="color: var(--text-secondary); font-size: 14px; margin-bottom: 8px;">${accessory.price}</div>
        <button style="
          width: 100%;
          padding: 8px;
          background: var(--bg-tertiary);
          border: 1px solid var(--border);
          border-radius: 8px;
          cursor: pointer;
          font-size: 14px;
        ">查看详情</button>
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
  new ProductAccessories();
});
