// Social Media Links
class SocialMedia {
  constructor() {
    this.init();
  }

  init() {
    this.displaySocial();
  }

  displaySocial() {
    const container = document.querySelector('[data-social]');
    if (!container) return;

    const links = JSON.parse(container.dataset.social || '[]');
    if (links.length === 0) {
      links.push(
        { name: '微信', icon: '💬', url: '#' },
        { name: '微博', icon: '📱', url: '#' },
        { name: '抖音', icon: '🎵', url: '#' },
        { name: 'B站', icon: '📺', url: '#' },
        { name: 'LinkedIn', icon: '💼', url: '#' }
      );
    }

    container.innerHTML = '<h3 style="margin-bottom: 16px;">关注我们</h3>';

    const grid = document.createElement('div');
    grid.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 12px;';

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
        <div style="font-size: 32px; margin-bottom: 8px;">${link.icon}</div>
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
  new SocialMedia();
});
