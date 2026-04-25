// Lead Time Calculator
class LeadTimeCalculator {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('[data-lead-time]').forEach(container => {
      this.setupCalculator(container);
    });
  }

  setupCalculator(container) {
    const baseDays = parseInt(container.dataset.leadTime) || 7;
    const options = JSON.parse(container.dataset.options || '[]');

    container.innerHTML = `
      <div style="background: var(--bg-secondary); border-radius: 16px; padding: 24px;">
        <h3 style="margin-bottom: 20px;">交期计算</h3>
        
        <div style="display: flex; flex-direction: column; gap: 16px; margin-bottom: 24px;">
          <div>
            <label style="display: block; margin-bottom: 8px; font-weight: 600; font-size: 14px;">产品数量</label>
            <input type="number" class="lead-time-qty" min="1" value="1" style="width: 100%; padding: 12px; border: 2px solid var(--border); border-radius: 8px; background: var(--bg-primary); font-size: 14px;">
          </div>
          
          ${options.map((opt, index) => `
            <div>
              <label style="display: block; margin-bottom: 8px; font-weight: 600; font-size: 14px;">${opt.name}</label>
              <select class="lead-time-option" data-days="${opt.days}" style="width: 100%; padding: 12px; border: 2px solid var(--border); border-radius: 8px; background: var(--bg-primary); font-size: 14px;">
                ${opt.choices.map(choice => `
                  <option value="${choice.days}">${choice.label} (+${choice.days}天)</option>
                `).join('')}
              </select>
            </div>
          `).join('')}
        </div>

        <div style="background: var(--bg-primary); border-radius: 12px; padding: 20px; text-align: center;">
          <div style="font-size: 14px; color: var(--text-secondary); margin-bottom: 8px;">预计交期</div>
          <div class="lead-time-result" style="font-size: 36px; font-weight: 700; color: var(--accent);">${baseDays}天</div>
          <div class="lead-time-date" style="font-size: 14px; color: var(--text-secondary); margin-top: 8px;"></div>
        </div>
      </div>
    `;

    const qtyInput = container.querySelector('.lead-time-qty');
    const optionSelects = container.querySelectorAll('.lead-time-option');
    const resultEl = container.querySelector('.lead-time-result');
    const dateEl = container.querySelector('.lead-time-date');

    const calculate = () => {
      const qty = parseInt(qtyInput.value) || 1;
      let totalDays = baseDays;

      // Add days based on quantity
      if (qty > 100) totalDays += 3;
      else if (qty > 50) totalDays += 2;
      else if (qty > 10) totalDays += 1;

      // Add days from options
      optionSelects.forEach(select => {
        totalDays += parseInt(select.value) || 0;
      });

      resultEl.textContent = `${totalDays}天`;

      // Calculate delivery date
      const deliveryDate = new Date();
      deliveryDate.setDate(deliveryDate.getDate() + totalDays);
      dateEl.textContent = `预计发货日期: ${deliveryDate.toLocaleDateString('zh-CN')}`;
    };

    qtyInput.addEventListener('input', calculate);
    optionSelects.forEach(select => {
      select.addEventListener('change', calculate);
    });

    calculate();
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new LeadTimeCalculator();
});
