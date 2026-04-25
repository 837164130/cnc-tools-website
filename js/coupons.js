// Product Coupons / Discounts
class ProductCoupons {
  constructor() {
    this.init();
  }

  init() {
    this.displayCoupons();
  }

  displayCoupons() {
    const container = document.querySelector('[data-coupons]');
    if (!container) return;

    const coupons = JSON.parse(container.dataset.coupons || '[]');
    if (coupons.length === 0) return;

    container.innerHTML = '<h3 style="margin-bottom: 24px;">优惠券</h3>';

    const grid = document.createElement('div');
    grid.style.cssText = 'display: grid; gap: 16px;';

    coupons.forEach(coupon => {
      const card = document.createElement('div');
      card.style.cssText = `
        display: flex;
        background: linear-gradient(135deg, #0071e3 0%, #5856d6 100%);
        border-radius: 12px;
        overflow: hidden;
        color: white;
      `;

      card.innerHTML = `
        <div style="
          padding: 20px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          min-width: 100px;
          border-right: 2px dashed rgba(255,255,255,0.3);
        ">
          <div style="font-size: 32px; font-weight: 700;">${coupon.discount}</div>
          <div style="font-size: 12px; opacity: 0.8;">OFF</div>
        </div>
        
        <div style="flex: 1; padding: 20px; display: flex; flex-direction: column; justify-content: center;">
          <div style="font-weight: 600; margin-bottom: 4px;">${coupon.name}</div>
          <div style="font-size: 12px; opacity: 0.8; margin-bottom: 12px;">${coupon.description}</div>
          <div style="display: flex; gap: 8px; align-items: center;">
            <code style="
              padding: 4px 12px;
              background: rgba(255,255,255,0.2);
              border-radius: 4px;
              font-size: 14px;
              font-family: monospace;
            ">${coupon.code}</code>
            <button class="copy-coupon" style="
              padding: 4px 12px;
              background: white;
              color: #0071e3;
              border: none;
              border-radius: 4px;
              cursor: pointer;
              font-size: 12px;
              font-weight: 600;
            ">复制</button>
          </div>
        </div>
        
        <div style="
          padding: 20px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          min-width: 80px;
        ">
          <div style="font-size: 11px; opacity: 0.7; margin-bottom: 4px;">有效期至</div>
          <div style="font-size: 12px; font-weight: 600;">${coupon.expiry}</div>
        </div>
      `;

      // Copy functionality
      const copyBtn = card.querySelector('.copy-coupon');
      if (copyBtn) {
        copyBtn.addEventListener('click', () => {
          const code = card.querySelector('code');
          if (code) {
            navigator.clipboard.writeText(code.textContent).then(() => {
              copyBtn.textContent = '已复制!';
              setTimeout(() => { copyBtn.textContent = '复制'; }, 2000);
            });
          }
          if (window.notifications) {
            window.notifications.show('优惠券码已复制', 'success');
          }
        });
      }

      grid.appendChild(card);
    });

    container.appendChild(grid);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ProductCoupons();
});
