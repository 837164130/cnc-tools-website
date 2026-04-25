// Training Services
class TrainingServices {
  constructor() {
    this.init();
  }

  init() {
    this.displayTraining();
  }

  displayTraining() {
    const container = document.querySelector('[data-training]');
    if (!container) return;

    const courses = [
      { name: '数控刀具选型基础', duration: '2天', level: '初级', desc: '了解刀具材料、几何参数、涂层技术等基础知识' },
      { name: '切削参数优化', duration: '3天', level: '中级', desc: '掌握不同材料的最优切削参数设置方法' },
      { name: '刀具磨损分析与寿命管理', duration: '2天', level: '中级', desc: '学习刀具磨损机理和寿命预测方法' },
      { name: '高端刀具应用技术', duration: '5天', level: '高级', desc: '五轴加工、难加工材料切削等高级技术' }
    ];

    container.innerHTML = '<h3 style="margin-bottom: 16px;">培训服务</h3>';

    const grid = document.createElement('div');
    grid.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px;';

    courses.forEach(course => {
      const card = document.createElement('div');
      card.style.cssText = `
        padding: 20px;
        background: var(--bg-secondary);
        border-radius: 12px;
        transition: transform 0.2s, box-shadow 0.2s;
      `;

      const levelColor = course.level === '初级' ? '#34c759' : 
                         course.level === '中级' ? '#0071e3' : '#ff9500';

      card.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
          <h4 style="margin: 0;">${course.name}</h4>
          <span style="
            padding: 2px 10px;
            background: ${levelColor}20;
            color: ${levelColor};
            border-radius: 10px;
            font-size: 12px;
            font-weight: 600;
          ">${course.level}</span>
        </div>
        <div style="font-size: 14px; color: var(--text-secondary); margin-bottom: 8px;">
          ⏱️ ${course.duration}
        </div>
        <p style="font-size: 14px; color: var(--text-secondary); line-height: 1.6; margin: 0;">${course.desc}</p>
        <button style="
          width: 100%;
          margin-top: 16px;
          padding: 10px;
          background: #0071e3;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
        ">立即报名</button>
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
  new TrainingServices();
});
