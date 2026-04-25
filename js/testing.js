// Testing & Quality Control
class TestingCapability {
  constructor() {
    this.init();
  }

  init() {
    this.displayTesting();
  }

  displayTesting() {
    const container = document.querySelector('[data-testing]');
    if (!container) return;

    const tests = [
      { name: '尺寸精度检测', desc: '三坐标测量仪检测，精度±0.001mm', icon: '📏' },
      { name: '表面粗糙度检测', desc: '轮廓仪检测，Ra值精确到0.01μm', icon: '🔍' },
      { name: '涂层厚度检测', desc: 'X射线荧光光谱仪，精度±0.1μm', icon: '🔬' },
      { name: '硬度检测', desc: '维氏硬度计，载荷1-50kgf', icon: '💎' },
      { name: '金相分析', desc: '金相显微镜，放大50-1000倍', icon: '🔭' },
      { name: '切削性能测试', desc: '专用切削试验台，模拟实际工况', icon: '⚙️' }
    ];

    container.innerHTML = '<h3 style="margin-bottom: 24px;">检测能力</h3>';

    const grid = document.createElement('div');
    grid.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 16px;';

    tests.forEach(test => {
      const card = document.createElement('div');
      card.style.cssText = `
        padding: 20px;
        background: var(--bg-secondary);
        border-radius: 12px;
        transition: transform 0.2s, box-shadow 0.2s;
      `;

      card.innerHTML = `
        <div style="font-size: 32px; margin-bottom: 12px;">${test.icon}</div>
        <h4 style="margin-bottom: 8px;">${test.name}</h4>
        <p style="font-size: 14px; color: var(--text-secondary); line-height: 1.6;">${test.desc}</p>
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
  new TestingCapability();
});
