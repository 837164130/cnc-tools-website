// Product Help Center
class ProductHelpCenter {
  constructor() {
    this.init();
  }

  init() {
    this.displayHelpCenter();
  }

  displayHelpCenter() {
    const container = document.querySelector('[data-help-center]');
    if (!container) return;

    const categories = JSON.parse(container.dataset.helpCenter || '[]');
    if (categories.length === 0) return;

    container.innerHTML = '<h3 style="margin-bottom: 24px;">帮助中心</h3>';

    const grid = document.createElement('div');
    grid.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 16px;';

    categories.forEach(category => {
      const card = document.createElement('div');
      card.style.cssText = `
        padding: 24px;
        background: var(--bg-secondary);
        border-radius: 12px;
        transition: transform 0.2s, box-shadow 0.2s;
        cursor: pointer;
      `;

      card.innerHTML = `
        <div style="font-size: 32px; margin-bottom: 12px;">${category.icon || '❓'}</div>
        <h4 style="margin: 0 0 8px; font-size: 16px;">${category.name}</h4>
        <p style="margin: 0 0 12px; color: var(--text-secondary); font-size: 14px;">${category.description}</p>
        <div style="font-size: 14px; color: #0071e3;">${category.articles || 0} 篇文章 →</div>
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
  new ProductHelpCenter();
});
