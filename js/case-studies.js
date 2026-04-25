// Product Case Studies
class CaseStudies {
  constructor() {
    this.init();
  }

  init() {
    this.displayCaseStudies();
  }

  displayCaseStudies() {
    const container = document.querySelector('[data-case-studies]');
    if (!container) return;

    const cases = JSON.parse(container.dataset.caseStudies || '[]');
    if (cases.length === 0) return;

    container.innerHTML = '<h3 style="margin-bottom: 24px;">应用案例</h3>';

    const grid = document.createElement('div');
    grid.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 16px;';

    cases.forEach(c => {
      const card = document.createElement('div');
      card.style.cssText = `
        padding: 24px;
        background: var(--bg-secondary);
        border-radius: 12px;
        border-left: 4px solid #0071e3;
      `;

      card.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
          <div style="font-size: 32px;">${c.icon || '🏭'}</div>
          <div>
            <div style="font-weight: 600; font-size: 16px;">${c.title}</div>
            <div style="font-size: 14px; color: var(--text-secondary);">${c.industry || ''}</div>
          </div>
        </div>
        <p style="margin: 0 0 16px; line-height: 1.6; color: var(--text-primary);">${c.description}</p>
        <div style="display: flex; flex-wrap: wrap; gap: 8px;">
          ${(c.tags || []).map(tag => `
            <span style="
              padding: 4px 12px;
              background: var(--bg-tertiary);
              border-radius: 12px;
              font-size: 12px;
              color: var(--text-secondary);
            ">${tag}</span>
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
  new CaseStudies();
});
