// Price Calculator
class PriceCalculator {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('[data-price-calculator]').forEach(container => {
      this.setupCalculator(container);
    });
  }

  setupCalculator(container) {
    const basePrice = parseFloat(container.dataset.basePrice) || 0;
    const options = JSON.parse(container.dataset.options || '[]');

    container.innerHTML = `
      <div style="background: var(--bg-secondary); border-radius: 12px; padding: 24px;">
        <h3 style="margin-bottom: 20px;">价格计算器</h3>
        
        <div style="margin-bottom: 20px;">
          <label style="display: block; margin-bottom: 8px; font-weight: 600;">数量</label>
          <div data-quantity data-min="1" data-max="1000" data-step="1"></div>
        </div>

        ${options.map((opt, index) => `
          <div style="margin-bottom: 16px;">
            <label style="display: block; margin-bottom: 8px; font-weight: 600;">${opt.name}</label>
            <select class="calc-option" data-option-index="${index}" style="width: 100%; padding: 12px; border: 2px solid var(--border); border-radius: 8px; background: var(--bg-primary); font-size: 14px;">
              ${opt.values.map(val => `
                <option value="${val.price}" data-label="${val.label}">${val.label} (+¥${val.price})</option>
              `).join('')}
            </select>
          </div>
        `).join('')}

        <div style="border-top: 2px solid var(--border); padding-top: 20px; margin-top: 20px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <div style="font-size: 14px; color: var(--text-secondary);">单价</div>
              <div class="unit-price" style="font-size: 24px; font-weight: 700; color: var(--accent);">¥${basePrice.toFixed(2)}</div>
            </div>
            <div style="text-align: right;">
              <div style="font-size: 14px; color: var(--text-secondary);">总价</div>
              <div class="total-price" style="font-size: 32px; font-weight: 700; color: var(--accent);">¥${basePrice.toFixed(2)}</div>
            </div>
          </div>
        </div>

        <button class="btn btn-primary calc-inquiry" style="width: 100%; margin-top: 20px; padding: 16px;">立即询价</button>
      </div>
    `;

    // Initialize quantity selector
    new QuantitySelector();

    const qtyInput = container.querySelector('.qty-input');
    const optionSelects = container.querySelectorAll('.calc-option');
    const unitPriceEl = container.querySelector('.unit-price');
    const totalPriceEl = container.querySelector('.total-price');
    const inquiryBtn = container.querySelector('.calc-inquiry');

    const calculate = () => {
      const quantity = parseInt(qtyInput?.value) || 1;
      let unitPrice = basePrice;

      optionSelects.forEach(select => {
        unitPrice += parseFloat(select.value) || 0;
      });

      const total = unitPrice * quantity;

      unitPriceEl.textContent = `¥${unitPrice.toFixed(2)}`;
      totalPriceEl.textContent = `¥${total.toFixed(2)}`;
    };

    qtyInput?.addEventListener('change', calculate);
    optionSelects.forEach(select => {
      select.addEventListener('change', calculate);
    });

    inquiryBtn.addEventListener('click', () => {
      const quantity = parseInt(qtyInput?.value) || 1;
      const total = totalPriceEl.textContent;
      const options = Array.from(optionSelects).map(s => {
        const selected = s.options[s.selectedIndex];
        return selected.dataset.label;
      }).join(', ');

      const params = new URLSearchParams({
        quantity: quantity.toString(),
        total: total,
        options: options
      });

      window.location.href = `contact.html?${params.toString()}`;
    });

    calculate();
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new PriceCalculator();
});
