// Product Returns Policy
class ReturnsPolicy {
  constructor() {
    this.init();
  }

  init() {
    this.displayReturns();
  }

  displayReturns() {
    const container = document.querySelector('[data-returns]');
    if (!container) return;

    const policy = JSON.parse(container.dataset.returns || '{}');

    container.innerHTML = `
      <div style="
        padding: 24px;
        background: var(--bg-secondary);
        border-radius: 12px;
      ">
        <h3 style="margin-bottom: 16px;">退换货政策</h3>
        
        <div style="display: grid; gap: 16px;">
          <div style="display: flex; align-items: flex-start; gap: 12px;">
            <div style="
              width: 32px;
              height: 32px;
              background: #0071e3;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
              font-size: 16px;
              flex-shrink: 0;
            ">7</div>
            <div>
              <div style="font-weight: 600;">7天无理由退货</div>
              <div style="color: var(--text-secondary); font-size: 14px;">自签收之日起7天内，商品未使用且包装完好可申请退货</div>
            </div>
          </div>
          
          <div style="display: flex; align-items: flex-start; gap: 12px;">
            <div style="
              width: 32px;
              height: 32px;
              background: #34c759;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
              font-size: 16px;
              flex-shrink: 0;
            ">15</div>
            <div>
              <div style="font-weight: 600;">15天换货保障</div>
              <div style="color: var(--text-secondary); font-size: 14px;">质量问题15天内免费换货</div>
            </div>
          </div>
          
          <div style="display: flex; align-items: flex-start; gap: 12px;">
            <div style="
              width: 32px;
              height: 32px;
              background: #ff9500;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
              font-size: 16px;
              flex-shrink: 0;
            ">!</div>
            <div>
              <div style="font-weight: 600;">注意事项</div>
              <div style="color: var(--text-secondary); font-size: 14px;">定制产品、已使用产品不支持退换货</div>
            </div>
          </div>
        </div>
        
        ${policy.details ? `
          <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid var(--border);">
            <div style="font-size: 14px; color: var(--text-secondary);">${policy.details}</div>
          </div>
        ` : ''}
      </div>
    `;
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ReturnsPolicy();
});
