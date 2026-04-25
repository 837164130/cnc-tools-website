// Product Comparison Chart
class ProductComparisonChart {
  constructor() {
    this.init();
  }

  init() {
    this.displayComparisonChart();
  }

  displayComparisonChart() {
    const container = document.querySelector('[data-comparison-chart]');
    if (!container) return;

    const data = JSON.parse(container.dataset.comparisonChart || '{}');

    container.innerHTML = `
      <div style="
        padding: 24px;
        background: var(--bg-secondary);
        border-radius: 12px;
      ">
        <h3 style="margin-bottom: 16px;">${data.title || '产品对比'}</h3>
        <p style="margin-bottom: 24px; color: var(--text-secondary);">${data.description || '直观对比不同产品特性'}</p>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
          ${(data.products || []).map(product => `
            <div style="
              padding: 20px;
              background: ${product.highlighted ? 'linear-gradient(135deg, #0071e3 0%, #5856d6 100%)' : 'var(--bg-tertiary)'};
              border-radius: 12px;
              color: ${product.highlighted ? 'white' : 'inherit'};
              text-align: center;
            ">
              <div style="font-size: 48px; margin-bottom: 12px;">${product.icon || '📦'}</div>
              <div style="font-weight: 600; margin-bottom: 8px;">${product.name}</div>
              <div style="font-size: 24px; font-weight: 700; margin-bottom: 16px;">${product.price}</div>
              
              <div style="display: grid; gap: 8px;">
                ${(product.specs || []).map(spec => `
                  <div style="
                    padding: 8px;
                    background: ${product.highlighted ? 'rgba(255,255,255,0.15)' : 'var(--bg-secondary)'};
                    border-radius: 8px;
                    font-size: 14px;
                  ">
                    <div style="font-size: 11px; opacity: 0.7; margin-bottom: 2px;">${spec.label}</div>
                    <div style="font-weight: 600;">${spec.value}</div>
                  </div>
                `).join('')}
              </div>
              
              <button style="
                width: 100%;
                margin-top: 16px;
                padding: 10px;
                background: ${product.highlighted ? 'white' : '#0071e3'};
                color: ${product.highlighted ? '#0071e3' : 'white'};
                border: none;
                border-radius: 8px;
                cursor: pointer;
                font-size: 14px;
                font-weight: 600;
              ">${product.cta || '选择'}</button>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ProductComparisonChart();
});
