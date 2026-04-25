// Global Service Network
class GlobalNetwork {
  constructor() {
    this.init();
  }

  init() {
    this.displayNetwork();
  }

  displayNetwork() {
    const container = document.querySelector('[data-global-network]');
    if (!container) return;

    const regions = [
      { name: '华东地区', cities: '上海、苏州、杭州、宁波', icon: '🏭' },
      { name: '华南地区', cities: '深圳、广州、东莞、佛山', icon: '🏭' },
      { name: '华北地区', cities: '北京、天津、青岛、大连', icon: '🏭' },
      { name: '西南地区', cities: '成都、重庆、西安、昆明', icon: '🏭' },
      { name: '海外市场', cities: '德国、美国、日本、东南亚', icon: '🌍' }
    ];

    container.innerHTML = '<h3 style="margin-bottom: 16px;">全球服务网络</h3>';

    const grid = document.createElement('div');
    grid.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px;';

    regions.forEach(region => {
      const card = document.createElement('div');
      card.style.cssText = `
        padding: 20px;
        background: var(--bg-secondary);
        border-radius: 12px;
        text-align: center;
        transition: transform 0.2s, box-shadow 0.2s;
      `;

      card.innerHTML = `
        <div style="font-size: 32px; margin-bottom: 12px;">${region.icon}</div>
        <h4 style="margin-bottom: 8px;">${region.name}</h4>
        <p style="font-size: 14px; color: var(--text-secondary);">${region.cities}</p>
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
  new GlobalNetwork();
});
