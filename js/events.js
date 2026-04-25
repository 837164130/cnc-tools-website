// Product Events
class ProductEvents {
  constructor() {
    this.init();
  }

  init() {
    this.displayEvents();
  }

  displayEvents() {
    const container = document.querySelector('[data-events]');
    if (!container) return;

    const events = JSON.parse(container.dataset.events || '[]');
    if (events.length === 0) return;

    container.innerHTML = '<h3 style="margin-bottom: 24px;">活动预告</h3>';

    const grid = document.createElement('div');
    grid.style.cssText = 'display: grid; gap: 16px;';

    events.forEach(event => {
      const card = document.createElement('div');
      card.style.cssText = `
        display: flex;
        gap: 16px;
        padding: 20px;
        background: var(--bg-secondary);
        border-radius: 12px;
        transition: transform 0.2s, box-shadow 0.2s;
      `;

      card.innerHTML = `
        <div style="
          min-width: 80px;
          text-align: center;
          padding: 12px;
          background: var(--bg-tertiary);
          border-radius: 12px;
        ">
          <div style="font-size: 24px; font-weight: 700; color: #0071e3;">${event.day || '01'}</div>
          <div style="font-size: 14px; color: var(--text-secondary);">${event.month || 'JAN'}</div>
        </div>
        
        <div style="flex: 1;">
          <div style="font-weight: 600; margin-bottom: 4px;">${event.title}</div>
          <div style="font-size: 14px; color: var(--text-secondary); margin-bottom: 8px;">${event.description}</div>
          <div style="display: flex; gap: 16px; font-size: 12px; color: var(--text-secondary);">
            <span>🕐 ${event.time || ''}</span>
            <span>📍 ${event.location || ''}</span>
          </div>
        </div>
        
        <div style="display: flex; align-items: center;">
          <button style="
            padding: 8px 16px;
            background: #0071e3;
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 14px;
          ">报名</button>
        </div>
      `;

      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateX(4px)';
        card.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
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
  new ProductEvents();
});
