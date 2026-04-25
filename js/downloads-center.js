// Downloads Center
class DownloadsCenter {
  constructor() {
    this.init();
  }

  init() {
    this.displayDownloads();
  }

  displayDownloads() {
    const container = document.querySelector('[data-downloads-center]');
    if (!container) return;

    const downloads = [
      { name: '产品目录 2024', type: 'PDF', size: '15.2 MB', icon: '📄' },
      { name: '技术参数手册', type: 'PDF', size: '8.5 MB', icon: '📊' },
      { name: '选型指南', type: 'PDF', size: '5.3 MB', icon: '📖' },
      { name: 'CAD图纸库', type: 'ZIP', size: '120 MB', icon: '📐' },
      { name: '使用说明书', type: 'PDF', size: '3.1 MB', icon: '📋' },
      { name: '软件驱动', type: 'EXE', size: '45.6 MB', icon: '💿' }
    ];

    container.innerHTML = '<h3 style="margin-bottom: 16px;">下载中心</h3>';

    const grid = document.createElement('div');
    grid.style.cssText = 'display: grid; gap: 12px;';

    downloads.forEach(file => {
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

      card.innerHTML = `
        <div style="font-size: 32px;">${file.icon}</div>
        <div style="flex: 1;">
          <div style="font-weight: 600; margin-bottom: 4px;">${file.name}</div>
          <div style="font-size: 14px; color: var(--text-secondary);">
            ${file.type} · ${file.size}
          </div>
        </div>
        <button style="
          padding: 8px 20px;
          background: #0071e3;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
        ">下载</button>
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
  new DownloadsCenter();
});
