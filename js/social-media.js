// Product Social Media Links
class ProductSocialMedia {
  constructor() {
    this.init();
  }

  init() {
    this.displaySocialMedia();
  }

  displaySocialMedia() {
    const container = document.querySelector('[data-social-media]');
    if (!container) return;

    const links = JSON.parse(container.dataset.socialMedia || '[]');
    if (links.length === 0) return;

    container.innerHTML = '<h3 style="margin-bottom: 16px;">关注我们</h3>';

    const grid = document.createElement('div');
    grid.style.cssText = 'display: flex; gap: 12px; flex-wrap: wrap;';

    links.forEach(link => {
      const iconMap = {
        'facebook': '📘',
        'twitter': '🐦',
        'instagram': '📷',
        'linkedin': '💼',
        'youtube': '🎬',
        'wechat': '💬',
        'weibo': '📱'
      };

      const card = document.createElement('a');
      card.href = link.url || '#';
      card.target = '_blank';
      card.style.cssText = `
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 12px 20px;
        background: var(--bg-secondary);
        border-radius: 8px;
        text-decoration: none;
        color: inherit;
        transition: transform 0.2s, box-shadow 0.2s;
      `;

      card.innerHTML = `
        <span style="font-size: 24px;">${iconMap[link.platform] || '🔗'}</span>
        <span style="font-weight: 600;">${link.name || link.platform}</span>
      `;

      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-2px)';
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
  new ProductSocialMedia();
});
