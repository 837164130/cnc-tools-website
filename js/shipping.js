// Product Shipping Information
class ProductShipping {
  constructor() {
    this.init();
  }

  init() {
    this.displayShipping();
  }

  displayShipping() {
    const container = document.querySelector('[data-shipping]');
    if (!container) return;

    const info = JSON.parse(container.dataset.shipping || '{}');

    container.innerHTML = `
      <div style="
        padding: 24px;
        background: var(--bg-secondary);
        border-radius: 12px;
      ">
        <h3 style="margin-bottom: 16px;">配送信息</h3>
        
        <div style="display: grid; gap: 16px;">
          <div style="display: flex; align-items: center; gap: 16px;">
            <div style="font-size: 24px;">🚚</div>
            <div>
              <div style="font-weight: 600;">配送方式</div>
              <div style="color: var(--text-secondary); font-size: 14px;">${info.method || '快递配送'}</div>
            </div>
          </div>
          
          <div style="display: flex; align-items: center; gap: 16px;">
            <div style="font-size: 24px;">⏱️</div>
            <div>
              <div style="font-weight: 600;">预计时效</div>
              <div style="color: var(--text-secondary); font-size: 14px;">${info.time || '3-5个工作日'}</div>
            </div>
          </div>
          
          <div style="display: flex; align-items: center; gap: 16px;">
            <div style="font-size: 24px;">💰</div>
            <div>
              <div style="font-weight: 600;">运费</div>
              <div style="color: var(--text-secondary); font-size: 14px;">${info.cost || '满¥500免运费'}</div>
            </div>
          </div>
          
          ${info.freeShipping ? `
            <div style="
              padding: 12px;
              background: rgba(52, 199, 89, 0.1);
              border-radius: 8px;
              border-left: 3px solid #34c759;
            ">
              <div style="color: #34c759; font-weight: 600;">🎉 ${info.freeShipping}</div>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ProductShipping();
});
