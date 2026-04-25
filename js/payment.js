// Payment Methods Display
class PaymentMethods {
  constructor() {
    this.init();
  }

  init() {
    this.displayPaymentMethods();
  }

  displayPaymentMethods() {
    const container = document.querySelector('[data-payment]');
    if (!container) return;

    const methods = JSON.parse(container.dataset.payment || '[]');
    if (methods.length === 0) {
      methods.push(
        { name: '支付宝', icon: '💳' },
        { name: '微信支付', icon: '💳' },
        { name: '银行转账', icon: '🏦' },
        { name: '对公账户', icon: '🏢' }
      );
    }

    container.innerHTML = `
      <div style="
        padding: 24px;
        background: var(--bg-secondary);
        border-radius: 12px;
      ">
        <h3 style="margin-bottom: 16px;">支付方式</h3>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 12px;">
          ${methods.map(method => `
            <div style="
              padding: 16px;
              background: var(--bg-primary);
              border-radius: 8px;
              text-align: center;
              border: 1px solid var(--border);
            ">
              <div style="font-size: 32px; margin-bottom: 8px;">${method.icon}</div>
              <div style="font-size: 14px; font-weight: 600;">${method.name}</div>
            </div>
          `).join('')}
        </div>
        
        <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid var(--border);">
          <div style="display: flex; align-items: center; gap: 8px; font-size: 14px; color: var(--text-secondary);">
            <span>🔒</span>
            <span>安全加密支付，保障您的资金安全</span>
          </div>
        </div>
      </div>
    `;
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new PaymentMethods();
});
