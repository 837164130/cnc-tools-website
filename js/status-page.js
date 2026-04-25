// System Status Page Component
class StatusPage {
  constructor() {
    this.init();
  }

  init() {
    this.displayStatus();
  }

  displayStatus() {
    const container = document.querySelector('[data-status]');
    if (!container) return;

    const services = JSON.parse(container.dataset.status || '[]');
    if (services.length === 0) return;

    container.innerHTML = '<h3 style="margin-bottom: 24px;">系统状态</h3>';

    const grid = document.createElement('div');
    grid.style.cssText = 'display: grid; gap: 12px;';

    services.forEach(service => {
      const statusColors = {
        'operational': '#34c759',
        'degraded': '#ff9500',
        'down': '#ff3b30',
        'maintenance': '#0071e3'
      };

      const statusLabels = {
        'operational': '正常运行',
        'degraded': '性能下降',
        'down': '服务中断',
        'maintenance': '维护中'
      };

      const card = document.createElement('div');
      card.style.cssText = `
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px 20px;
        background: var(--bg-secondary);
        border-radius: 12px;
        transition: transform 0.2s;
      `;

      card.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px;">
          <div style="
            width: 10px;
            height: 10px;
            background: ${statusColors[service.status] || '#34c759'};
            border-radius: 50%;
            ${service.status === 'operational' ? 'animation: pulse 2s infinite;' : ''}
          "></div>
          <div>
            <div style="font-weight: 600; font-size: 14px;">${service.name}</div>
            <div style="font-size: 12px; color: var(--text-secondary);">${service.description || ''}</div>
          </div>
        </div>
        <div style="
          padding: 4px 12px;
          background: ${statusColors[service.status] || '#34c759'}20;
          color: ${statusColors[service.status] || '#34c759'};
          border-radius: 12px;
          font-size: 12px;
          font-weight: 600;
        ">${statusLabels[service.status] || '正常'}</div>
      `;

      grid.appendChild(card);
    });

    container.appendChild(grid);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new StatusPage();
});
