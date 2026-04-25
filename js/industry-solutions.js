// Industry Solutions Display
class IndustrySolutions {
  constructor() {
    this.init();
  }

  init() {
    this.displaySolutions();
  }

  displaySolutions() {
    const container = document.querySelector('[data-industry-solutions]');
    if (!container) return;

    const solutions = [
      {
        title: '航空航天',
        desc: '钛合金、高温合金等难加工材料的高效切削解决方案',
        icon: '✈️',
        products: ['钛合金专用铣刀', '高温合金钻头', '复合材料刀具']
      },
      {
        title: '汽车制造',
        desc: '发动机、变速箱等零部件的高精度加工方案',
        icon: '🚗',
        products: ['发动机缸体刀具', '曲轴加工刀具', '齿轮滚刀']
      },
      {
        title: '模具加工',
        desc: '高硬度模具钢的高效粗精加工解决方案',
        icon: '🔧',
        products: ['高硬度铣刀', '精密电极', '深孔钻头']
      },
      {
        title: '医疗器械',
        desc: '不锈钢、钛合金等生物材料的精密加工',
        icon: '🏥',
        products: ['微型钻头', '精密车刀', '骨科植入物刀具']
      }
    ];

    container.innerHTML = '<h3 style="margin-bottom: 24px;">行业解决方案</h3>';

    const grid = document.createElement('div');
    grid.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px;';

    solutions.forEach(solution => {
      const card = document.createElement('div');
      card.style.cssText = `
        padding: 24px;
        background: var(--bg-secondary);
        border-radius: 12px;
        transition: transform 0.2s, box-shadow 0.2s;
      `;

      card.innerHTML = `
        <div style="font-size: 40px; margin-bottom: 12px;">${solution.icon}</div>
        <h4 style="margin-bottom: 8px;">${solution.title}</h4>
        <p style="color: var(--text-secondary); font-size: 14px; line-height: 1.6; margin-bottom: 12px;">${solution.desc}</p>
        <div style="display: flex; flex-wrap: wrap; gap: 6px;">
          ${solution.products.map(p => `
            <span style="
              padding: 4px 10px;
              background: var(--bg-tertiary);
              border-radius: 12px;
              font-size: 12px;
              color: var(--text-secondary);
            ">${p}</span>
          `).join('')}
        </div>
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
  new IndustrySolutions();
});
