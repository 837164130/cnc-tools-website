// Product Training
class ProductTraining {
  constructor() {
    this.init();
  }

  init() {
    this.displayTraining();
  }

  displayTraining() {
    const container = document.querySelector('[data-training]');
    if (!container) return;

    const courses = JSON.parse(container.dataset.training || '[]');
    if (courses.length === 0) return;

    container.innerHTML = '<h3 style="margin-bottom: 24px;">培训服务</h3>';

    const grid = document.createElement('div');
    grid.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 16px;';

    courses.forEach(course => {
      const card = document.createElement('div');
      card.style.cssText = `
        padding: 24px;
        background: var(--bg-secondary);
        border-radius: 12px;
        border-left: 4px solid #0071e3;
      `;

      card.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
          <div style="font-size: 32px;">${course.icon || '📚'}</div>
          <h4 style="margin: 0; font-size: 18px;">${course.title}</h4>
        </div>
        <p style="margin: 0 0 16px; line-height: 1.6; color: var(--text-primary);">${course.description}</p>
        <div style="display: flex; flex-wrap: wrap; gap: 8px;">
          ${(course.features || []).map(feature => `
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
  new ProductTraining();
});
