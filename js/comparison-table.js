// Product Comparison Table
class ComparisonTable {
  constructor() {
    this.init();
  }

  init() {
    this.displayComparison();
  }

  displayComparison() {
    const container = document.querySelector('[data-comparison]');
    if (!container) return;

    const products = JSON.parse(container.dataset.comparison || '[]');
    if (products.length < 2) return;

    container.innerHTML = '<h3 style="margin-bottom: 16px;">产品对比</h3>';

    const table = document.createElement('div');
    table.style.cssText = 'overflow-x: auto;';

    // Get all unique specs
    const allSpecs = new Set();
    products.forEach(p => {
      Object.keys(p.specs || {}).forEach(spec => allSpecs.add(spec));
    });

    let html = '<table style="width: 100%; border-collapse: collapse; min-width: 500px;">';
    
    // Header row with product names
    html += '<tr style="border-bottom: 2px solid var(--border);">';
    html += '<th style="padding: 12px; text-align: left; background: var(--bg-secondary);">规格</th>';
    products.forEach(p => {
      html += `<th style="padding: 12px; text-align: center; background: var(--bg-secondary); min-width: 150px;">${p.name}</th>`;
    });
    html += '</tr>';

    // Spec rows
    Array.from(allSpecs).forEach((spec, index) => {
      html += `<tr style="border-bottom: 1px solid var(--border); ${index % 2 === 0 ? 'background: var(--bg-primary);' : ''}">`;
      html += `<td style="padding: 12px; font-weight: 600;">${spec}</td>`;
      products.forEach(p => {
        const value = p.specs?.[spec] || '-';
        html += `<td style="padding: 12px; text-align: center;">${value}</td>`;
      });
      html += '</tr>';
    });

    // Price row
    html += '<tr style="border-bottom: 2px solid var(--border); background: var(--bg-secondary);">';
    html += '<td style="padding: 12px; font-weight: 600;">价格</td>';
    products.forEach(p => {
      html += `<td style="padding: 12px; text-align: center; font-weight: 700; color: #0071e3;">${p.price || '-'}</td>`;
    });
    html += '</tr>';

    // Action row
    html += '<tr>';
    html += '<td style="padding: 12px;"></td>';
    products.forEach(p => {
      html += `
        <td style="padding: 12px; text-align: center;">
          <a href="${p.url || '#'}" style="
            display: inline-block;
            padding: 8px 16px;
            background: #0071e3;
            color: white;
            text-decoration: none;
            border-radius: 8px;
            font-size: 14px;
          ">查看详情</a>
        </td>
      `;
    });
    html += '</tr>';

    html += '</table>';
    table.innerHTML = html;
    container.appendChild(table);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ComparisonTable();
});
