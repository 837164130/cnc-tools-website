// Product Solutions
class ProductSolutions {
  constructor() {
    this.init();
  }

  init() {
    this.displaySolutions();
  }

  displaySolutions() {
    const container = document.querySelector('[data-solutions]');
    if (!container) return;

    const solutions = JSON.parse(container.dataset.solutions || '[]');
    if (solutions.length === 0) return;

    container.innerHTML = '<h3 style="margin-bottom: 24px;">解决方案</h3>';

    const grid = document.createElement('div');
    grid.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 16px;';

    solutions.forEach(solution => {
      const card = document.createElement('div');
      card.style.cssText = `
        padding: 24px;
        background: var(--bg-secondary);
        border-radius: 12px;
        border-left: 4px solid #0071e3;
      `;

      card.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
          <div style="font-size: 32px;">${solution.icon || '💡'}</div>
          <h4 style="margin: 0; font-size: 18px;">${solution.title}</h4>
        </div>
        <p style="margin: 0 0 16px; line-height: 1.6; color: var(--text-primary);">${solution.description}</p>
        <div style="display: flex; flex-wrap: wrap; gap: 8px;">
          ${(solution.features || []).map(feature => `
            <span style="
              padding: 4px 12px;
              background: var(--bg-tertiary);
              border-radius: 12px;
              font-size: 12px;
              color: var(--text-secondary);
            ">${feature}</span>
          `).join('')}
        </div>
      `;

      grid.appendChild(card);
    });

    container.appendChild(grid);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ProductSolutions();
});
