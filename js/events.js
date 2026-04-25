// Events & Exhibitions
class EventsExhibitions {
  constructor() {
    this.init();
  }

  init() {
    this.displayEvents();
  }

  displayEvents() {
    const container = document.querySelector('[data-events]');
    if (!container) return;

    const events = [
      { name: '中国国际机床展览会(CIMT)', date: '2024-04-15', location: '北京', status: '即将开始' },
      { name: '中国国际工业博览会', date: '2024-09-20', location: '上海', status: '报名中' },
      { name: '德国EMO汉诺威机床展', date: '2023-09-18', location: '德国', status: '已结束' },
      { name: '美国IMTS芝加哥机床展', date: '2024-09-09', location: '美国', status: '筹备中' }
    ];

    container.innerHTML = '<h3 style="margin-bottom: 16px;">展会活动</h3>';

    const grid = document.createElement('div');
    grid.style.cssText = 'display: grid; gap: 12px;';

    events.forEach(event => {
      const card = document.createElement('div');
      card.style.cssText = `
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 16px;
        background: var(--bg-secondary);
        border-radius: 12px;
        transition: transform 0.2s, box-shadow 0.2s;
      `;

      const statusColor = event.status === '即将开始' ? '#34c759' : 
                          event.status === '报名中' ? '#0071e3' : 
                          event.status === '筹备中' ? '#ff9500' : '#8e8e93';

      card.innerHTML = `
        <div style="
          padding: 12px;
          background: var(--bg-tertiary);
          border-radius: 12px;
          text-align: center;
          min-width: 60px;
        ">
          <div style="font-size: 12px; color: var(--text-secondary);">${event.date.split('-')[1]}月</div>
          <div style="font-size: 24px; font-weight: 700;">${event.date.split('-')[2]}</div>
        </div>
        <div style="flex: 1;">
          <div style="font-weight: 600; margin-bottom: 4px;">${event.name}</div>
          <div style="font-size: 14px; color: var(--text-secondary);">📍 ${event.location}</div>
        </div>
        <span style="
          padding: 4px 12px;
          background: ${statusColor}20;
          color: ${statusColor};
          border-radius: 12px;
          font-size: 12px;
          font-weight: 600;
        ">${event.status}</span>
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
  new EventsExhibitions();
});
