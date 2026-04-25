// Product Comparison Tool
class ProductComparisonTool {
  constructor() {
    this.init();
  }

  init() {
    this.displayComparisonTool();
  }

  displayComparisonTool() {
    const container = document.querySelector('[data-comparison-tool]');
    if (!container) return;

    const config = JSON.parse(container.dataset.comparisonTool || '{}');

    container.innerHTML = `
      <div style="
        padding: 24px;
        background: var(--bg-secondary);
        border-radius: 12px;
      ">
        <h3 style="margin-bottom: 16px;">${config.title || '产品对比工具'}</h3>
        <p style="margin-bottom: 24px; color: var(--text-secondary);">${config.description || '选择多个产品进行详细对比'}</p>
        
        <div class="product-selector" style="margin-bottom: 24px;">
          <label style="display: block; margin-bottom: 8px; font-weight: 600; font-size: 14px;">选择要对比的产品</label>
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            ${(config.products || []).map(product => `
              <label style="
                padding: 8px 16px;
                background: var(--bg-tertiary);
                border-radius: 8px;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 8px;
                font-size: 14px;
                transition: all 0.2s;
              ">
                <input type="checkbox" value="${product.id}" style="cursor: pointer;">
                <span>${product.name}</span>
              </label>
            `).join('')}
          </div>
        </div>
        
        <button class="compare-button" style="
          padding: 12px 32px;
          background: #0071e3;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 24px;
        ">开始对比</button>
        
        <div class="comparison-result" style="display: none; overflow-x: auto;">
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr>
                <th style="padding: 12px; text-align: left; border-bottom: 2px solid var(--border); min-width: 120px;">特性</th>
                <!-- Product columns will be inserted here -->
              </tr>
            </thead>
            <tbody>
              <!-- Comparison rows will be inserted here -->
            </tbody>
          </table>
        </div>
      </div>
    `;

    const compareBtn = container.querySelector('.compare-button');
    const resultDiv = container.querySelector('.comparison-result');
    const theadRow = container.querySelector('thead tr');
    const tbody = container.querySelector('tbody');

    if (compareBtn) {
      compareBtn.addEventListener('click', () => {
        const checkboxes = container.querySelectorAll('.product-selector input[type="checkbox"]:checked');
        
        if (checkboxes.length < 2) {
          if (window.notifications) {
            window.notifications.show('请至少选择2个产品进行对比', 'error');
          }
          return;
        }

        const selectedProducts = Array.from(checkboxes).map(cb => {
          return config.products.find(p => p.id === cb.value);
        });

        // Build comparison table
        theadRow.innerHTML = '<th style="padding: 12px; text-align: left; border-bottom: 2px solid var(--border); min-width: 120px;">特性</th>';
        selectedProducts.forEach(product => {
          theadRow.innerHTML += `
            <th style="padding: 12px; text-align: center; border-bottom: 2px solid var(--border); min-width: 150px;">
              <div style="font-weight: 600;">${product.name}</div>
              <div style="font-size: 12px; color: var(--text-secondary);">${product.price || ''}</div>
            </th>
          `;
        });

        const features = config.features || ['材质', '涂层', '硬度', '适用材料', '规格范围'];
        tbody.innerHTML = features.map(feature => `
          <tr>
            <td style="padding: 12px; border-bottom: 1px solid var(--border); font-weight: 600;">${feature}</td>
            ${selectedProducts.map(product => `
              <td style="padding: 12px; text-align: center; border-bottom: 1px solid var(--border);">
                ${product[feature] || '-'}
              </td>
            `).join('')}
          </tr>
        `).join('');

        resultDiv.style.display = 'block';
      });
    }
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ProductComparisonTool();
});
