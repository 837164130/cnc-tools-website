// Help Center / Support Hub
class HelpCenter {
  constructor() {
    this.init();
  }

  init() {
    this.displayHelp();
  }

  displayHelp() {
    const container = document.querySelector('[data-help]');
    if (!container) return;

    const categories = [
      {
        title: '购物指南',
        icon: '🛒',
        items: ['如何下单', '支付方式', '订单查询', '发票申请']
      },
      {
        title: '配送服务',
        icon: '🚚',
        items: ['配送范围', '运费说明', '签收须知', '物流跟踪']
      },
      {
        title: '售后服务',
        icon: '🔧',
        items: ['退换货政策', '维修服务', '质量保证', '投诉建议']
      },
      {
        title: '产品知识',
        icon: '📚',
        items: ['产品选型', '使用指南', '保养维护', '技术参数']
      }
    ];

    container.innerHTML = '<h3 style="margin-bottom: 24px;">帮助中心</h3>';

    const grid = document.createElement('div');
    grid.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 16px;';

    categories.forEach(cat => {
      const card = document.createElement('div');
      card.style.cssText = `
        padding: 24px;
        background: var(--bg-secondary);
        border-radius: 12px;
        transition: transform 0.2s, box-shadow 0.2s;
      `;

      card.innerHTML = `
        <div style="font-size: 32px; margin-bottom: 12px;">${cat.icon}</div>
        <h4 style="margin-bottom: 12px;">${cat.title}</h4>
        <ul style="list-style: none; padding: 0; margin: 0;">
          ${cat.items.map(item => `
            <li style="margin-bottom: 8px;">
              <a href="#" style="
                color: var(--text-secondary);
                text-decoration: none;
                font-size: 14px;
                transition: color 0.2s;
              " onmouseover="this.style.color='#0071e3'" onmouseout="this.style.color='var(--text-secondary)'">${item}</a>
            </li>
          `).join('')}
        </ul>
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
  new HelpCenter();
});
