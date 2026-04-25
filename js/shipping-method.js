// Product Shipping Method Selector
class ShippingMethodSelector {
  constructor() {
    this.init();
  }

  init() {
    this.displayShippingMethodSelector();
  }

  displayShippingMethodSelector() {
    const container = document.querySelector('[data-shipping-method]');
    if (!container) return;

    const config = JSON.parse(container.dataset.shippingMethod || '{}');

    container.innerHTML = `
      <div style="
        padding: 24px;
        background: var(--bg-secondary);
        border-radius: 12px;
      ">
        <h3 style="margin-bottom: 16px;">${config.title || '配送方式'}</h3>
        <p style="margin-bottom: 24px; color: var(--text-secondary);">${config.description || '选择适合您的配送方式'}</p>
        
        <div class="shipping-options" style="display: grid; gap: 12px; margin-bottom: 24px;">
          ${(config.methods || []).map((method, i) => `
            <div class="shipping-option" data-method="${method.value}" style="
              padding: 16px;
              background: ${i === 0 ? '#0071e310' : 'var(--bg-tertiary)'};
              border: 2px solid ${i === 0 ? '#0071e3' : 'transparent'};
              border-radius: 12px;
              cursor: pointer;
              display: flex;
              align-items: center;
              gap: 16px;
              transition: all 0.2s;
            ">
              <div style="
                width: 48px;
                height: 48px;
                background: white;
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 24px;
              ">${method.icon || '📦'}</div>
              
              <div style="flex: 1;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                  <div style="font-weight: 600;">${method.name}</div>
                  <div style="font-weight: 700; color: #0071e3;">${method.price || '免费'}</div>
                </div>
                <div style="font-size: 13px; color: var(--text-secondary);">
                  ${method.estimatedTime ? `预计 ${method.estimatedTime}` : ''}
                  ${method.tracking ? ' • 可追踪' : ''}
                </div>
              </div>
              
              <div style="
                width: 20px;
                height: 20px;
                border-radius: 50%;
                border: 2px solid ${i === 0 ? '#0071e3' : 'var(--border)'};
                display: flex;
                align-items: center;
                justify-content: center;
              ">
                ${i === 0 ? '<div style="width: 10px; height: 10px; border-radius: 50%; background: #0071e3;"></div>' : ''}
              </div>
            </div>
          `).join('')}
        </div>
        
        <div class="shipping-summary" style="
          padding: 16px;
          background: var(--bg-tertiary);
          border-radius: 8px;
          font-size: 14px;
          color: var(--text-secondary);
        ">
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <span>配送费用</span>
            <span class="shipping-cost">${config.methods?.[0]?.price || '免费'}</span>
          </div>
          <div style="display: flex; justify-content: space-between; font-weight: 600; color: var(--text-primary);">
            <span>预计送达</span>
            <span class="shipping-time">${config.methods?.[0]?.estimatedTime || '-'}</span>
          </div>
        </div>
      </div>
    `;

    // Shipping method selection
    container.querySelectorAll('.shipping-option').forEach(option => {
      option.addEventListener('click', function() {
        // Reset all options
        container.querySelectorAll('.shipping-option').forEach(o => {
          o.style.background = 'var(--bg-tertiary)';
          o.style.borderColor = 'transparent';
          const radio = o.querySelector('div:last-child');
          if (radio) {
            radio.style.borderColor = 'var(--border)';
            radio.innerHTML = '';
          }
        });

        // Select this option
        this.style.background = '#0071e310';
        this.style.borderColor = '#0071e3';
        const radio = this.querySelector('div:last-child');
        if (radio) {
          radio.style.borderColor = '#0071e3';
          radio.innerHTML = '<div style="width: 10px; height: 10px; border-radius: 50%; background: #0071e3;"></div>';
        }

        // Update summary
        const methodValue = this.dataset.method;
        const methodData = config.methods?.find(m => m.value === methodValue);
        
        if (methodData) {
          const costEl = container.querySelector('.shipping-cost');
          const timeEl = container.querySelector('.shipping-time');
          if (costEl) costEl.textContent = methodData.price || '免费';
          if (timeEl) timeEl.textContent = methodData.estimatedTime || '-';
        }

        // Dispatch custom event
        container.dispatchEvent(new CustomEvent('shippingMethodChange', {
          detail: { method: methodValue }
        }));
      });

      option.addEventListener('mouseenter', function() {
        if (this.style.borderColor !== 'rgb(0, 113, 227)') {
          this.style.transform = 'translateX(4px)';
        }
      });

      option.addEventListener('mouseleave', function() {
        this.style.transform = '';
      });
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ShippingMethodSelector();
});
