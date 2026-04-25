// Product Subscription Plans
class ProductSubscription {
  constructor() {
    this.init();
  }

  init() {
    this.displaySubscription();
  }

  displaySubscription() {
    const container = document.querySelector('[data-subscription]');
    if (!container) return;

    const plans = JSON.parse(container.dataset.subscription || '[]');
    if (plans.length === 0) return;

    container.innerHTML = '<h3 style="margin-bottom: 24px;">订阅计划</h3>';

    const grid = document.createElement('div');
    grid.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px;';

    plans.forEach(plan => {
      const card = document.createElement('div');
      card.style.cssText = `
        padding: 24px;
        background: ${plan.popular ? 'linear-gradient(135deg, #0071e3 0%, #5856d6 100%)' : 'var(--bg-secondary)'};
        border-radius: 16px;
        color: ${plan.popular ? 'white' : 'inherit'};
        position: relative;
        transition: transform 0.2s, box-shadow 0.2s;
      `;

      card.innerHTML = `
        ${plan.popular ? '<div style="position: absolute; top: -10px; right: 20px; padding: 4px 12px; background: #ff9500; color: white; border-radius: 12px; font-size: 12px; font-weight: 600;">最受欢迎</div>' : ''}
        
        <div style="font-size: 20px; font-weight: 600; margin-bottom: 8px;">${plan.name}</div>
        <div style="margin-bottom: 16px;">
          <span style="font-size: 36px; font-weight: 700;">${plan.price}</span>
          <span style="font-size: 14px; opacity: 0.8;">/${plan.period || '月'}</span>
        </div>
        
        <div style="display: grid; gap: 8px; margin-bottom: 20px;">
          ${(plan.features || []).map(feature => `
            <div style="display: flex; align-items: center; gap: 8px; font-size: 14px;">
              <span style="color: ${plan.popular ? '#34c759' : '#0071e3'};">✓</span>
              <span>${feature}</span>
            </div>
          `).join('')}
        </div>
        
        <button style="
          width: 100%;
          padding: 12px;
          background: ${plan.popular ? 'white' : '#0071e3'};
          color: ${plan.popular ? '#0071e3' : 'white'};
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 16px;
          font-weight: 600;
        ">${plan.cta || '选择计划'}</button>
      `;

      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-4px)';
        card.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)';
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
  new ProductSubscription();
});
