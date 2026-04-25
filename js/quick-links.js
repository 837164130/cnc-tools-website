// Quick Links Navigation
class QuickLinks {
  constructor() {
    this.init();
  }

  init() {
    this.displayQuickLinks();
  }

  displayQuickLinks() {
    const container = document.querySelector('[data-quick-links]');
    if (!container) return;

    const links = [
      { name: '热门产品', icon: '🔥', url: 'products/endmills.html' },
      { name: '新品上市', icon: '✨', url: 'products/drills.html' },
      { name: '促销专区', icon: '🏷️', url: '#' },
      { name: '技术文档', icon: '📄', url: '#' },
      { name: '视频教程', icon: '🎬', url: '#' },
      { name: '常见问题', icon: '❓', url: '#' },
      { name: '联系我们', icon: '📞', url: 'contact.html' },
      { name: '关于我们', icon: '🏢', url: 'about.html' }
    ];

    container.innerHTML = '<h3 style="margin-bottom: 16px;">快速链接</h3>';

    const grid = document.createElement('div');
    grid.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 12px;';

    links.forEach(link => {
      const card = document.createElement('a');
      card.href = link.url;
      card.style.cssText = `
        padding: 16px;
        background: var(--bg-secondary);
        border-radius: 12px;
        text-align: center;
        text-decoration: none;
        color: inherit;
        transition: transform 0.2s, box-shadow 0.2s;
      `;

      card.innerHTML = `
        <div style="font-size: 28px; margin-bottom: 8px;">${link.icon}</div>
        <div style="font-size: 14px; font-weight: 600;">${link.name}</div>
      `;

      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-4px)';
        card.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)';
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
  new QuickLinks();
});
