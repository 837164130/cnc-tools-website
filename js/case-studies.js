// Customer Case Studies
class CaseStudies {
  constructor() {
    this.init();
  }

  init() {
    this.displayCases();
  }

  displayCases() {
    const container = document.querySelector('[data-case-studies]');
    if (!container) return;

    const cases = [
      {
        company: '某航空制造公司',
        industry: '航空航天',
        challenge: '钛合金零件加工效率低，刀具磨损快',
        solution: '采用CCCNC钛合金专用铣刀，优化切削参数',
        result: '加工效率提升40%，刀具寿命延长3倍',
        icon: '✈️'
      },
      {
        company: '某汽车零部件厂',
        industry: '汽车制造',
        challenge: '发动机缸体加工精度不稳定',
        solution: '定制专用镗刀和铣刀方案',
        result: '加工精度达到IT6级，良品率提升至99.5%',
        icon: '🚗'
      },
      {
        company: '某精密模具公司',
        industry: '模具加工',
        challenge: '高硬度模具钢(62HRC)加工困难',
        solution: '使用CBN涂层立铣刀，优化加工路径',
        result: '加工时间缩短50%，表面粗糙度Ra0.4',
        icon: '🔧'
      }
    ];

    container.innerHTML = '<h3 style="margin-bottom: 24px;">客户案例</h3>';

    const grid = document.createElement('div');
    grid.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px;';

    cases.forEach(caseItem => {
      const card = document.createElement('div');
      card.style.cssText = `
        padding: 24px;
        background: var(--bg-secondary);
        border-radius: 12px;
        transition: transform 0.2s, box-shadow 0.2s;
      `;

      card.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
          <div style="font-size: 32px;">${caseItem.icon}</div>
          <div>
            <div style="font-weight: 600;">${caseItem.company}</div>
            <div style="font-size: 14px; color: var(--text-secondary);">${caseItem.industry}</div>
          </div>
        </div>
        
        <div style="margin-bottom: 12px;">
          <div style="font-size: 12px; color: var(--text-tertiary); margin-bottom: 4px;">挑战</div>
          <div style="font-size: 14px;">${caseItem.challenge}</div>
        </div>
        
        <div style="margin-bottom: 12px;">
          <div style="font-size: 12px; color: var(--text-tertiary); margin-bottom: 4px;">解决方案</div>
          <div style="font-size: 14px;">${caseItem.solution}</div>
        </div>
        
        <div style="
          padding: 12px;
          background: rgba(52, 199, 89, 0.1);
          border-radius: 8px;
          border-left: 3px solid #34c759;
        ">
          <div style="font-size: 12px; color: #34c759; font-weight: 600;">成果</div>
          <div style="font-size: 14px; color: #34c759;">${caseItem.result}</div>
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
  new CaseStudies();
});
