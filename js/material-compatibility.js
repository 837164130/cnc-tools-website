// Product Material Compatibility
class MaterialCompatibility {
  constructor() {
    this.init();
  }

  init() {
    this.displayCompatibility();
  }

  displayCompatibility() {
    const container = document.querySelector('[data-materials]');
    if (!container) return;

    const materials = JSON.parse(container.dataset.materials || '[]');
    if (materials.length === 0) return;

    container.innerHTML = '<h3 style="margin-bottom: 16px;">适用材料</h3>';

    const grid = document.createElement('div');
    grid.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 12px;';

    materials.forEach(material => {
      const card = document.createElement('div');
      card.style.cssText = `
        padding: 16px;
        background: var(--bg-secondary);
        border-radius: 12px;
        text-align: center;
        transition: transform 0.2s;
      `;

      const rating = material.rating || 'good';
      const ratingColors = {
        excellent: '#34c759',
        good: '#0071e3',
        fair: '#ff9500',
        poor: '#ff3b30'
      };

      card.innerHTML = `
        <div style="font-size: 32px; margin-bottom: 8px;">${material.icon || '🔧'}</div>
        <div style="font-weight: 600; margin-bottom: 4px;">${material.name}</div>
        <div style="
          display: inline-block;
          padding: 2px 8px;
          background: ${ratingColors[rating]}20;
          color: ${ratingColors[rating]};
          border-radius: 12px;
          font-size: 12px;
        ">
          ${material.ratingText || '适用'}
        </div>
      `;

      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-4px)';
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });

      grid.appendChild(card);
    });

    container.appendChild(grid);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new MaterialCompatibility();
});
