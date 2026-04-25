// Promotions & Special Offers
class Promotions {
  constructor() {
    this.init();
  }

  init() {
    this.displayPromotions();
  }

  displayPromotions() {
    const container = document.querySelector('[data-promotions]');
    if (!container) return;

    const promos = [
      {
        title: '新年特惠',
        discount: '8.5折',
        desc: '全场铣刀系列产品',
        endDate: '2024-02-15',
        color: '#ff3b30'
      },
      {
        title: '满减活动',
        discount: '满1000减100',
        desc: '订单满额立减',
        endDate: '2024-01-31',
        color: '#0071e3'
      },
      {
        title: '新品体验',
        discount: '首单9折',
        desc: '涂层钻头系列',
        endDate: '2024-02-28',
        color: '#34c759'
      }
    ];

    container.innerHTML = '<h3 style="margin-bottom: 16px;">促销活动</h3>';

    const grid = document.createElement('div');
    grid.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px;';

    promos.forEach(promo => {
      const card = document.createElement('div');
      card.style.cssText = `
        padding: 24px;
        background: linear-gradient(135deg, ${promo.color}15, ${promo.color}05);
        border-radius: 12px;
        border: 2px solid ${promo.color}30;
        position: relative;
        overflow: hidden;
      `;

      card.innerHTML = `
        <div style="
          position: absolute;
          top: -20px;
          right: -20px;
          width: 100px;
          height: 100px;
          background: ${promo.color}20;
          border-radius: 50%;
        "></div>
        <div style="position: relative; z-index: 1;">
          <div style="
            display: inline-block;
            padding: 4px 12px;
            background: ${promo.color};
            color: white;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            margin-bottom: 12px;
          ">进行中</div>
          <h4 style="margin-bottom: 8px; font-size: 20px;">${promo.title}</h4>
          <div style="font-size: 32px; font-weight: 700; color: ${promo.color}; margin-bottom: 8px;">${promo.discount}</div>
          <p style="color: var(--text-secondary); margin-bottom: 12px;">${promo.desc}</p>
          <div style="font-size: 12px; color: var(--text-tertiary);">截止: ${promo.endDate}</div>
        </div>
      `;

      grid.appendChild(card);
    });

    container.appendChild(grid);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new Promotions();
});
