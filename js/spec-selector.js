// Product Specification Selector
class SpecSelector {
  constructor() {
    this.init();
  }

  init() {
    this.displaySpecSelector();
  }

  displaySpecSelector() {
    const container = document.querySelector('[data-spec-selector]');
    if (!container) return;

    const config = JSON.parse(container.dataset.specSelector || '{}');

    container.innerHTML = `
      <div style="
        padding: 24px;
        background: var(--bg-secondary);
        border-radius: 12px;
      ">
        <h3 style="margin-bottom: 16px;">${config.title || '规格选择器'}</h3>
        <p style="margin-bottom: 24px; color: var(--text-secondary);">${config.description || '选择适合您的规格'}</p>
        
        <div class="spec-groups" style="display: grid; gap: 20px; margin-bottom: 24px;">
          ${(config.specs || []).map((spec, i) => `
            <div>
              <label style="display: block; margin-bottom: 8px; font-weight: 600;">${spec.name}</label>
              <select class="spec-select" data-group="${i}" style="
                width: 100%;
                padding: 12px;
                border: 1px solid var(--border);
                border-radius: 8px;
                font-size: 16px;
                background: var(--bg-primary);
                color: var(--text-primary);
              ">
                ${(spec.options || []).map((opt, j) => `
                  <option value="${opt.value}">${opt.label} ${opt.price ? `(+${opt.price})` : ''}</option>
                `).join('')}
              </select>
            </div>
          `).join('')}
        </div>
        
        <div style="
          padding: 20px;
          background: var(--bg-tertiary);
          border-radius: 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        ">
          <div>
            <div style="font-size: 14px; color: var(--text-secondary);">已选规格总价</div>
            <div class="spec-total-price" style="font-size: 28px; font-weight: 700; color: #0071e3;">${config.basePrice || '¥0'}</div>
          </div>
          <button style="
            padding: 12px 32px;
            background: #0071e3;
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 16px;
            font-weight: 600;
          ">确认选择</button>
        </div>
      </div>
    `;

    // Update price on change
    container.querySelectorAll('.spec-select').forEach(select => {
      select.addEventListener('change', () => this.updatePrice(container, config));
    });
  }

  updatePrice(container, config) {
    let total = parseFloat(config.basePrice?.replace(/[^0-9.]/g, '') || 0);
    
    container.querySelectorAll('.spec-select').forEach(select => {
      const selectedOption = select.options[select.selectedIndex];
      const priceMatch = selectedOption.textContent.match(/\+¥?([0-9.]+)/);
      if (priceMatch) {
        total += parseFloat(priceMatch[1]);
      }
    });

    const priceEl = container.querySelector('.spec-total-price');
    if (priceEl) {
      priceEl.textContent = `¥${total.toFixed(2)}`;
    }
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new SpecSelector();
});
