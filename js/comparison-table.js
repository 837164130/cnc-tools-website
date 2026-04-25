// Product Comparison Table
class ComparisonTable {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('[data-comparison-table]').forEach(container => {
      this.setupTable(container);
    });
  }

  setupTable(container) {
    const products = JSON.parse(container.dataset.comparisonTable || '[]');
    if (products.length < 2) return;

    const allSpecs = [...new Set(products.flatMap(p => Object.keys(p.specs || {})))];

    container.innerHTML = `
      <div style="overflow-x: auto;">
        <table style="width: 100%; border-collapse: collapse; font-size: 14px; min-width: 600px;">
          <thead>
            <tr>
              <th style="padding: 16px; text-align: left; font-weight: 600; border-bottom: 2px solid var(--border); background: var(--bg-secondary); position: sticky; left: 0; z-index: 10;">规格参数</th>
              ${products.map(product => `
                <th style="padding: 16px; text-align: center; font-weight: 600; border-bottom: 2px solid var(--border); background: var(--bg-secondary); min-width: 150px;">
                  <div style="font-size: 24px; margin-bottom: 8px;">${product.icon}</div>
                  <div>${product.name}</div>
                </th>
              `).join('')}
            </tr>
          </thead>
          <tbody>
            ${allSpecs.map((spec, index) => `
              <tr style="background: ${index % 2 === 0 ? 'var(--bg-primary)' : 'var(--bg-secondary)'};">
                <td style="padding: 14px 16px; border-bottom: 1px solid var(--border); font-weight: 600; position: sticky; left: 0; background: inherit; z-index: 5;">${spec}</td>
                ${products.map(product => {
                  const value = product.specs?.[spec] || '-';
                  const isBest = product.bestSpecs?.includes(spec);
                  return `
                    <td style="padding: 14px 16px; border-bottom: 1px solid var(--border); text-align: center; ${isBest ? 'color: var(--accent); font-weight: 700; background: rgba(0, 113, 227, 0.05);' : ''}">
                      ${isBest ? '★ ' : ''}${value}
                    </td>
                  `;
                }).join('')}
              </tr>
            `).join('')}
            <tr style="background: var(--bg-secondary);">
              <td style="padding: 16px; border-bottom: 1px solid var(--border); font-weight: 600; position: sticky; left: 0; background: inherit;">价格</td>
              ${products.map(product => `
                <td style="padding: 16px; border-bottom: 1px solid var(--border); text-align: center;">
                  <div style="font-size: 20px; font-weight: 700; color: var(--accent);">${product.price}</div>
                </td>
              `).join('')}
            </tr>
            <tr>
              <td style="padding: 16px; position: sticky; left: 0; background: inherit;"></td>
              ${products.map(product => `
                <td style="padding: 16px; text-align: center;">
                  <a href="${product.url}" class="btn btn-primary" style="padding: 10px 20px; font-size: 14px;">查看详情</a>
                </td>
              `).join('')}
            </tr>
          </tbody>
        </table>
      </div>
    `;
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ComparisonTable();
});
