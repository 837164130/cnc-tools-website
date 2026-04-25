// Product Payment Method Selector
class PaymentMethodSelector {
  constructor() {
    this.init();
  }

  init() {
    this.displayPaymentMethodSelector();
  }

  displayPaymentMethodSelector() {
    const container = document.querySelector('[data-payment-method]');
    if (!container) return;

    const config = JSON.parse(container.dataset.paymentMethod || '{}');

    container.innerHTML = `
      <div style="
        padding: 24px;
        background: var(--bg-secondary);
        border-radius: 12px;
      ">
        <h3 style="margin-bottom: 16px;">${config.title || '支付方式'}</h3>
        <p style="margin-bottom: 24px; color: var(--text-secondary);">${config.description || '选择您方便的支付方式'}</p>
        
        <div class="payment-options" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 12px; margin-bottom: 24px;">
          ${(config.methods || []).map((method, i) => `
            <div class="payment-option" data-payment="${method.value}" style="
              padding: 20px;
              background: ${i === 0 ? '#0071e310' : 'var(--bg-tertiary)'};
              border: 2px solid ${i === 0 ? '#0071e3' : 'transparent'};
              border-radius: 12px;
              cursor: pointer;
              text-align: center;
              transition: all 0.2s;
            ">
              <div style="font-size: 32px; margin-bottom: 8px;">${method.icon || '💳'}</div>
              <div style="font-weight: 600; font-size: 14px; margin-bottom: 4px;">${method.name}</div>
              ${method.fee ? `<div style="font-size: 12px; color: var(--text-secondary);">手续费: ${method.fee}</div>` : ''}
            </div>
          `).join('')}
        </div>
        
        <div class="payment-security" style="
          padding: 16px;
          background: var(--bg-tertiary);
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 14px;
          color: var(--text-secondary);
        ">
          <span style="font-size: 20px;">🔒</span>
          <span>所有支付均经过 SSL 加密，保障您的资金安全</span>
        </div>
      </div>
    `;

    // Payment method selection
    container.querySelectorAll('.payment-option').forEach(option => {
      option.addEventListener('click', function() {
        // Reset all options
        container.querySelectorAll('.payment-option').forEach(o => {
          o.style.background = 'var(--bg-tertiary)';
          o.style.borderColor = 'transparent';
        });

        // Select this option
        this.style.background = '#0071e310';
        this.style.borderColor = '#0071e3';

        // Dispatch custom event
        const paymentValue = this.dataset.payment;
        container.dispatchEvent(new CustomEvent('paymentMethodChange', {
          detail: { method: paymentValue }
        }));
      });

      option.addEventListener('mouseenter', function() {
        if (this.style.borderColor !== 'rgb(0, 113, 227)') {
          this.style.transform = 'translateY(-2px)';
          this.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
        }
      });

      option.addEventListener('mouseleave', function() {
        this.style.transform = '';
        this.style.boxShadow = '';
      });
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new PaymentMethodSelector();
});
