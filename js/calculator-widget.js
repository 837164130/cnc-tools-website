// Product Calculator Widget
class ProductCalculatorWidget {
  constructor() {
    this.init();
  }

  init() {
    this.displayCalculator();
  }

  displayCalculator() {
    const container = document.querySelector('[data-calculator-widget]');
    if (!container) return;

    const calc = JSON.parse(container.dataset.calculatorWidget || '{}');

    container.innerHTML = `
      <div style="
        padding: 24px;
        background: var(--bg-secondary);
        border-radius: 12px;
      ">
        <h3 style="margin-bottom: 16px;">${calc.title || '产品计算器'}</h3>
        <p style="margin-bottom: 24px; color: var(--text-secondary);">${calc.description || '快速计算产品参数'}</p>
        
        <div class="calc-inputs" style="display: grid; gap: 16px; margin-bottom: 24px;">
          ${(calc.inputs || []).map((input, i) => `
            <div>
              <label style="display: block; margin-bottom: 8px; font-weight: 600; font-size: 14px;">${input.label}</label>
              <div style="display: flex; gap: 8px;">
                <input type="number" class="calc-input" data-index="${i}" placeholder="${input.placeholder || ''}" style="
                  flex: 1;
                  padding: 12px;
                  border: 1px solid var(--border);
                  border-radius: 8px;
                  font-size: 16px;
                ">
                <span style="display: flex; align-items: center; padding: 0 12px; background: var(--bg-tertiary); border-radius: 8px; font-size: 14px; color: var(--text-secondary);">${input.unit || ''}</span>
              </div>
            </div>
          `).join('')}
        </div>
        
        <button class="calc-button" style="
          width: 100%;
          padding: 14px;
          background: #0071e3;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 16px;
        ">计算</button>
        
        <div class="calc-results" style="
          padding: 20px;
          background: var(--bg-tertiary);
          border-radius: 12px;
          display: none;
        ">
          <div style="font-size: 14px; color: var(--text-secondary); margin-bottom: 8px;">计算结果</div>
          <div class="calc-result-value" style="font-size: 32px; font-weight: 700; color: #0071e3;">-</div>
          <div class="calc-result-unit" style="font-size: 14px; color: var(--text-secondary);"></div>
        </div>
      </div>
    `;

    // Calculate button
    const calcBtn = container.querySelector('.calc-button');
    const resultsDiv = container.querySelector('.calc-results');
    const resultValue = container.querySelector('.calc-result-value');
    const resultUnit = container.querySelector('.calc-result-unit');

    if (calcBtn) {
      calcBtn.addEventListener('click', () => {
        const inputs = container.querySelectorAll('.calc-input');
        const values = Array.from(inputs).map(input => parseFloat(input.value) || 0);
        
        // Simple calculation example - can be customized
        let result = 0;
        if (calc.formula) {
          try {
            result = calc.formula(...values);
          } catch (e) {
            result = values.reduce((a, b) => a + b, 0);
          }
        } else {
          result = values.reduce((a, b) => a * b, 1);
        }
        
        resultValue.textContent = result.toFixed(2);
        resultUnit.textContent = calc.resultUnit || '';
        resultsDiv.style.display = 'block';
        
        if (window.notifications) {
          window.notifications.show('计算完成', 'success');
        }
      });
    }
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ProductCalculatorWidget();
});
