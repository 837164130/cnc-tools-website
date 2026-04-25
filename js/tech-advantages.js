// Technical Advantages Display
class TechAdvantages {
  constructor() {
    this.init();
  }

  init() {
    this.displayAdvantages();
  }

  displayAdvantages() {
    const container = document.querySelector('[data-tech-advantages]');
    if (!container) return;

    const advantages = [
      {
        title: '先进涂层技术',
        desc: '采用PVD/CVD纳米涂层，硬度达3000HV以上，摩擦系数低至0.3',
        icon: '🔬'
      },
      {
        title: '精密制造工艺',
        desc: '五轴数控磨削，精度控制在±0.005mm以内',
        icon: '⚙️'
      },
      {
        title: '优质原材料',
        desc: '选用欧洲进口超细晶硬质合金，晶粒度0.5μm以下',
        icon: '💎'
      },
      {
        title: '严格质检体系',
        desc: '全检制度，配备三坐标测量仪、轮廓仪等精密检测设备',
        icon: '📏'
      }
    ];

    container.innerHTML = '<h3 style="margin-bottom: 24px;">技术优势</h3>';

    const grid = document.createElement('div');
    grid.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px;';

    advantages.forEach(advantage => {
      const card = document.createElement('div');
      card.style.cssText = `
        padding: 24px;
        background: var(--bg-secondary);
        border-radius: 12px;
        text-align: center;
        transition: transform 0.2s, box-shadow 0.2s;
      `;

      card.innerHTML = `
        <div style="font-size: 48px; margin-bottom: 16px;">${advantage.icon}</div>
        <h4 style="margin-bottom: 8px;">${advantage.title}</h4>
        <p style="color: var(--text-secondary); font-size: 14px; line-height: 1.6;">${advantage.desc}</p>
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
  new TechAdvantages();
});
