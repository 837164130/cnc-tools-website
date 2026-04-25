// Product Downloads
class ProductDownloads {
  constructor() {
    this.init();
  }

  init() {
    this.displayDownloads();
  }

  displayDownloads() {
    const container = document.querySelector('[data-downloads]');
    if (!container) return;

    const downloads = JSON.parse(container.dataset.downloads || '[]');
    if (downloads.length === 0) return;

    container.innerHTML = '<h3 style="margin-bottom: 16px;">资料下载</h3>';

    const grid = document.createElement('div');
    grid.style.cssText = 'display: grid; gap: 12px;';

    downloads.forEach(file => {
      const card = document.createElement('a');
      card.href = file.url || '#';
      card.download = file.name;
      card.style.cssText = `
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 16px;
        background: var(--bg-secondary);
        border-radius: 12px;
        text-decoration: none;
        color: inherit;
        transition: transform 0.2s, box-shadow 0.2s;
      `;

      const iconMap = {
        'pdf': '📄',
        'cad': '📐',
        'zip': '📦',
        'doc': '📝',
        'xls': '📊',
        'image': '🖼️'
      };

      card.innerHTML = `
        <div style="font-size: 32px;">${iconMap[file.type] || '📄'}</div>
        <div style="flex: 1;">
          <div style="font-weight: 600; margin-bottom: 4px;">${file.name}</div>
          <div style="font-size: 14px; color: var(--text-secondary);">${file.size || ''} · ${file.date || ''}</div>
        </div>
        <div style="color: #0071e3; font-size: 14px;">下载 ↓</div>
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
  new ProductDownloads();
});
