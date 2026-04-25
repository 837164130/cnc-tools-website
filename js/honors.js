// Honors & Awards Display
class HonorsAwards {
  constructor() {
    this.init();
  }

  init() {
    this.displayHonors();
  }

  displayHonors() {
    const container = document.querySelector('[data-honors]');
    if (!container) return;

    const honors = [
      { name: '国家高新技术企业', year: '2023', level: '国家级' },
      { name: '江苏省专精特新企业', year: '2023', level: '省级' },
      { name: '中国机床工具工业协会优秀会员', year: '2022', level: '行业级' },
      { name: '常州市质量奖', year: '2022', level: '市级' },
      { name: 'AAA级信用企业', year: '2023', level: '国家级' },
      { name: 'ISO 9001质量管理体系认证', year: '2023', level: '国际级' }
    ];

    container.innerHTML = '<h3 style="margin-bottom: 24px;">荣誉资质</h3>';

    const grid = document.createElement('div');
    grid.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 16px;';

    honors.forEach(honor => {
      const card = document.createElement('div');
      card.style.cssText = `
        padding: 20px;
        background: var(--bg-secondary);
        border-radius: 12px;
        text-align: center;
        transition: transform 0.2s, box-shadow 0.2s;
        border: 2px solid transparent;
      `;

      card.innerHTML = `
        <div style="
          width: 64px;
          height: 64px;
          background: linear-gradient(135deg, #0071e3, #5856d6);
          border-radius: 50%;
          margin: 0 auto 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 28px;
        ">🏆</div>
        <div style="font-weight: 600; margin-bottom: 4px;">${honor.name}</div>
        <div style="font-size: 14px; color: var(--text-secondary); margin-bottom: 4px;">${honor.year}年获得</div>
        <div style="
          display: inline-block;
          padding: 2px 10px;
          background: var(--bg-tertiary);
          border-radius: 10px;
          font-size: 12px;
          color: var(--text-secondary);
        ">${honor.level}</div>
      `;

      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-4px)';
        card.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)';
        card.style.borderColor = '#0071e3';
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.boxShadow = '';
        card.style.borderColor = 'transparent';
      });

      grid.appendChild(card);
    });

    container.appendChild(grid);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new HonorsAwards();
});
