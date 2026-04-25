// Product Quantity Selector
class QuantitySelector {
  constructor() {
    this.init();
  }

  init() {
    this.displayQuantitySelector();
  }

  displayQuantitySelector() {
    const container = document.querySelector('[data-quantity-selector]');
    if (!container) return;

    const config = JSON.parse(container.dataset.quantitySelector || '{}');

    container.innerHTML = `
      <div style="
        display: inline-flex;
        align-items: center;
        background: var(--bg-secondary);
        border-radius: 8px;
        overflow: hidden;
        border: 1px solid var(--border);
      ">
        <button class="qty-minus" style="
          width: 40px;
          height: 40px;
          background: transparent;
          border: none;
          cursor: pointer;
          font-size: 18px;
          color: var(--text-primary);
          display: flex;
          align-items: center;
          justify-content: center;
        ">−</button>
        
        <input type="number" class="qty-input" value="${config.min || 1}" min="${config.min || 1}" max="${config.max || 99}" style="
          width: 60px;
          height: 40px;
          text-align: center;
          border: none;
          border-left: 1px solid var(--border);
          border-right: 1px solid var(--border);
          font-size: 16px;
          background: var(--bg-primary);
          color: var(--text-primary);
          -moz-appearance: textfield;
        ">
        
        <button class="qty-plus" style="
          width: 40px;
          height: 40px;
          background: transparent;
          border: none;
          cursor: pointer;
          font-size: 18px;
          color: var(--text-primary);
          display: flex;
          align-items: center;
          justify-content: center;
        ">+</button>
      </div>
    `;

    const input = container.querySelector('.qty-input');
    const minusBtn = container.querySelector('.qty-minus');
    const plusBtn = container.querySelector('.qty-plus');

    if (minusBtn) {
      minusBtn.addEventListener('click', () => {
        const current = parseInt(input.value) || 1;
        const min = parseInt(input.min) || 1;
        if (current > min) {
          input.value = current - 1;
          this.updatePrice(container, config);
        }
      });
    }

    if (plusBtn) {
      plusBtn.addEventListener('click', () => {
        const current = parseInt(input.value) || 1;
        const max = parseInt(input.max) || 99;
        if (current < max) {
          input.value = current + 1;
          this.updatePrice(container, config);
        }
      });
    }

    if (input) {
      input.addEventListener('change', () => {
        let value = parseInt(input.value) || 1;
        const min = parseInt(input.min) || 1;
        const max = parseInt(input.max) || 99;
        value = Math.max(min, Math.min(max, value));
        input.value = value;
        this.updatePrice(container, config);
      });
    }
  }

  updatePrice(container, config) {
    const input = container.querySelector('.qty-input');
    const quantity = parseInt(input.value) || 1;
    const unitPrice = parseFloat(config.unitPrice?.replace(/[^0-9.]/g, '') || 0);
    const total = quantity * unitPrice;

    // Dispatch custom event for price update
    container.dispatchEvent(new CustomEvent('quantityChange', {
      detail: { quantity, total: `¥${total.toFixed(2)}` }
    }));
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new QuantitySelector();
});
