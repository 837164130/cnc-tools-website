// Product Technical Documentation
class TechDocs {
  constructor() {
    this.init();
  }

  init() {
    this.displayDocs();
  }

  displayDocs() {
    const container = document.querySelector('[data-tech-docs]');
    if (!container) return;

    const docs = JSON.parse(container.dataset.techDocs || '[]');
    if (docs.length === 0) return;

    container.innerHTML = '<h3 style="margin-bottom: 16px;">技术文档</h3>';

    const grid = document.createElement('div');
    grid.style.cssText = 'display: grid; gap: 12px;';

    docs.forEach(doc => {
      const card = document.createElement('a');
      card.href = doc.url || '#';
      card.target = '_blank';
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
        'video': '🎬',
        'cad': '📐',
        'manual': '📖',
        'datasheet': '📊'
      };

      card.innerHTML = `
        <div style="font-size: 32px;">${iconMap[doc.type] || '📄'}</div>
        <div style="flex: 1;">
          <div style="font-weight: 600; margin-bottom: 4px;">${doc.name}</div>
          <div style="font-size: 14px; color: var(--text-secondary);">${doc.description || ''}</div>
        </div>
        <div style="color: #0071e3; font-size: 14px;">下载 →</div>
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
  new TechDocs();
});
