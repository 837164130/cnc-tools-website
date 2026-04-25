// Product SDK Downloads
class ProductSDK {
  constructor() {
    this.init();
  }

  init() {
    this.displaySDK();
  }

  displaySDK() {
    const container = document.querySelector('[data-sdk]');
    if (!container) return;

    const sdks = JSON.parse(container.dataset.sdk || '[]');
    if (sdks.length === 0) return;

    container.innerHTML = '<h3 style="margin-bottom: 24px;">SDK 下载</h3>';

    const grid = document.createElement('div');
    grid.style.cssText = 'display: grid; gap: 16px;';

    sdks.forEach(sdk => {
      const card = document.createElement('div');
      card.style.cssText = `
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 20px;
        background: var(--bg-secondary);
        border-radius: 12px;
        transition: transform 0.2s, box-shadow 0.2s;
      `;

      card.innerHTML = `
        <div style="font-size: 40px;">${sdk.icon || '📦'}</div>
        <div style="flex: 1;">
          <div style="font-weight: 600; margin-bottom: 4px;">${sdk.name}</div>
          <div style="font-size: 14px; color: var(--text-secondary); margin-bottom: 8px;">${sdk.description}</div>
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            ${(sdk.platforms || []).map(platform => `
              <span style="
                padding: 2px 8px;
                background: var(--bg-tertiary);
                border-radius: 4px;
                font-size: 11px;
                color: var(--text-secondary);
              ">${platform}</span>
            `).join('')}
          </div>
        </div>
        <a href="${sdk.downloadUrl || '#'}" download style="
          padding: 8px 16px;
          background: #0071e3;
          color: white;
          border-radius: 8px;
          text-decoration: none;
          font-size: 14px;
          white-space: nowrap;
        ">下载 ${sdk.version || ''}</a>
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
  new ProductSDK();
});
