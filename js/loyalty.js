// Product Loyalty / Points Program
class ProductLoyalty {
  constructor() {
    this.init();
  }

  init() {
    this.displayLoyalty();
  }

  displayLoyalty() {
    const container = document.querySelector('[data-loyalty]');
    if (!container) return;

    const program = JSON.parse(container.dataset.loyalty || '{}');

    container.innerHTML = `
      <div style="
        padding: 24px;
        background: linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%);
        border-radius: 16px;
        border: 1px solid var(--border);
      ">
        <div style="text-align: center; margin-bottom: 24px;">
          <div style="font-size: 48px; margin-bottom: 8px;">🏆</div>
          <h3 style="margin-bottom: 4px;">${program.name || '会员积分计划'}</h3>
          <p style="color: var(--text-secondary); font-size: 14px;">${program.description || '购物赚积分，积分换好礼'}</p>
        </div>
        
        <div style="
          padding: 20px;
          background: white;
          border-radius: 12px;
          text-align: center;
          margin-bottom: 20px;
        ">
          <div style="font-size: 14px; color: var(--text-secondary); margin-bottom: 4px;">当前积分</div>
          <div style="font-size: 36px; font-weight: 700; color: #0071e3;">${program.points || 0}</div>
          <div style="font-size: 12px; color: var(--text-secondary);">价值约 ¥${(program.points * 0.01 || 0).toFixed(2)}</div>
        </div>
        
        <div style="display: grid; gap: 12px; margin-bottom: 20px;">
          ${(program.tiers || []).map(tier => `
            <div style="
              display: flex;
              align-items: center;
              gap: 12px;
              padding: 12px;
              background: white;
              border-radius: 8px;
              ${tier.current ? 'border: 2px solid #0071e3;' : ''}
            ">
              <div style="font-size: 24px;">${tier.icon || '⭐'}</div>
              <div style="flex: 1;">
                <div style="font-weight: 600; font-size: 14px;">${tier.name}</div>
                <div style="font-size: 12px; color: var(--text-secondary);">${tier.benefit}</div>
              </div>
              ${tier.current ? '<span style="padding: 2px 8px; background: #0071e3; color: white; border-radius: 10px; font-size: 11px;">当前</span>' : ''}
            </div>
          `).join('')}
        </div>
        
        <div style="display: flex; gap: 12px;">
          <button style="
            flex: 1;
            padding: 12px;
            background: #0071e3;
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 600;
          ">兑换礼品</button>
          <button style="
            flex: 1;
            padding: 12px;
            background: var(--bg-tertiary);
            color: var(--text-primary);
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 14px;
          ">积分明细</button>
        </div>
      </div>
    `;
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ProductLoyalty();
});
