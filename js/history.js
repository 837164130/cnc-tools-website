// Product History
class ProductHistory {
  constructor() {
    this.init();
  }

  init() {
    this.displayHistory();
  }

  displayHistory() {
    const container = document.querySelector('[data-history]');
    if (!container) return;

    const history = JSON.parse(container.dataset.history || '[]');
    if (history.length === 0) return;

    container.innerHTML = '<h3 style="margin-bottom: 24px;">发展历程</h3>';

    const timeline = document.createElement('div');
    timeline.style.cssText = 'position: relative; padding-left: 24px;';

    history.forEach((event, index) => {
      const item = document.createElement('div');
      item.style.cssText = `
        position: relative;
        padding-bottom: 24px;
        padding-left: 24px;
        border-left: 2px solid var(--border);
      `;

      item.innerHTML = `
        <div style="
          position: absolute;
          left: -9px;
          top: 0;
          width: 16px;
          height: 16px;
          background: #0071e3;
          border-radius: 50%;
          border: 3px solid var(--bg-primary);
        "></div>
        <div style="font-weight: 600; color: #0071e3; margin-bottom: 4px;">${event.year}</div>
        <div style="font-weight: 600; margin-bottom: 4px;">${event.title}</div>
        <div style="color: var(--text-secondary); font-size: 14px;">${event.description}</div>
      `;

      timeline.appendChild(item);
    });

    container.appendChild(timeline);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ProductHistory();
});
