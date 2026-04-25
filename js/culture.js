// Company Culture Display
class CompanyCulture {
  constructor() {
    this.init();
  }

  init() {
    this.displayCulture();
  }

  displayCulture() {
    const container = document.querySelector('[data-culture]');
    if (!container) return;

    const values = [
      {
        title: '精益求精',
        desc: '追求极致的产品品质，每一把刀具都经过严格检测',
        icon: '🔬'
      },
      {
        title: '客户至上',
        desc: '以客户需求为导向，提供个性化解决方案',
        icon: '🤝'
      },
      {
        title: '创新驱动',
        desc: '持续研发投入，引领行业技术发展',
        icon: '💡'
      },
      {
        title: '诚信共赢',
        desc: '与合作伙伴建立长期稳定的合作关系',
        icon: '🤲'
      }
    ];

    container.innerHTML = '<h3 style="margin-bottom: 24px;">企业文化</h3>';

    const grid = document.createElement('div');
    grid.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px;';

    values.forEach(value => {
      const card = document.createElement('div');
      card.style.cssText = `
        padding: 24px;
        background: var(--bg-secondary);
        border-radius: 12px;
        text-align: center;
        transition: transform 0.2s, box-shadow 0.2s;
      `;

      card.innerHTML = `
        <div style="font-size: 48px; margin-bottom: 16px;">${value.icon}</div>
        <h4 style="margin-bottom: 8px;">${value.title}</h4>
        <p style="color: var(--text-secondary); font-size: 14px; line-height: 1.6;">${value.desc}</p>
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
  new CompanyCulture();
});
