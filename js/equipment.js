// Production Equipment Display
class ProductionEquipment {
  constructor() {
    this.init();
  }

  init() {
    this.displayEquipment();
  }

  displayEquipment() {
    const container = document.querySelector('[data-equipment]');
    if (!container) return;

    const equipment = [
      { name: '五轴数控工具磨床', brand: 'WALTER', count: '20台', desc: '德国进口，精度±0.003mm' },
      { name: 'CVD涂层设备', brand: 'PLATIT', count: '5台', desc: '瑞士进口，涂层厚度均匀' },
      { name: 'PVD涂层设备', brand: 'Oerlikon', count: '8台', desc: '纳米级涂层技术' },
      { name: '三坐标测量仪', brand: 'ZEISS', count: '10台', desc: '德国蔡司，精度0.001mm' },
      { name: '轮廓测量仪', brand: 'Mahr', count: '6台', desc: '精密轮廓检测' },
      { name: '金相显微镜', brand: 'Olympus', count: '4台', desc: '材料微观结构分析' }
    ];

    container.innerHTML = '<h3 style="margin-bottom: 24px;">生产设备</h3>';

    const grid = document.createElement('div');
    grid.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px;';

    equipment.forEach(item => {
      const card = document.createElement('div');
      card.style.cssText = `
        padding: 20px;
        background: var(--bg-secondary);
        border-radius: 12px;
        transition: transform 0.2s, box-shadow 0.2s;
      `;

      card.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
          <h4 style="margin: 0;">${item.name}</h4>
          <span style="
            padding: 4px 10px;
            background: var(--bg-tertiary);
            border-radius: 12px;
            font-size: 12px;
            color: var(--text-secondary);
          ">${item.count}</span>
        </div>
        <div style="font-size: 14px; color: var(--text-secondary); margin-bottom: 4px;">品牌: ${item.brand}</div>
        <div style="font-size: 14px; color: var(--text-tertiary);">${item.desc}</div>
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
  new ProductionEquipment();
});
