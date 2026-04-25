// Product Pricing Table
class ProductPricingTable {
  constructor() {
    this.init();
  }

  init() {
    this.displayPricingTable();
  }

  displayPricingTable() {
    const container = document.querySelector('[data-pricing-table]');
    if (!container) return;

    const plans = JSON.parse(container.dataset.pricingTable || '[]');
    if (plans.length === 0) return;

    container.innerHTML = '<h3 style="margin-bottom: 24px;">价格对比</h3>';

    const table = document.createElement('div');
    table.style.cssText = 'overflow-x: auto;';

    // Build table HTML
    let html = '<table style="width: 100%; border-collapse: collapse; background: var(--bg-secondary); border-radius: 12px; overflow: hidden;">';
    
    // Header
    html += '<thead><tr>';
    html += '<th style="padding: 16px; text-align: left; border-bottom: 1px solid var(--border);">功能</th>';
    plans.forEach(plan => {
      html += `<th style="padding: 16px; text-align: center; border-bottom: 1px solid var(--border); ${plan.popular ? 'background: #0071e3; color: white;' : ''}">${plan.name}</th>`;
    });
    html += '</tr></thead>';

    // Body
    html += '<tbody>';
    
    // Price row
    html += '<tr>';
    html += '<td style="padding: 16px; border-bottom: 1px solid var(--border); font-weight: 600;">价格</td>';
    plans.forEach(plan => {
      html += `<td style="padding: 16px; text-align: center; border-bottom: 1px solid var(--border); ${plan.popular ? 'background: #0071e310;' : ''}">
        <div style="font-size: 24px; font-weight: 700; color: #0071e3;">${plan.price}</div>
        <div style="font-size: 12px; color: var(--text-secondary);">/${plan.period || '月'}</div>
      </td>`;
    });
    html += '</tr>';

    // Feature rows
    const allFeatures = [...new Set(plans.flatMap(p => p.features.map(f => f.name)))];
    
    allFeatures.forEach((featureName, i) => {
      html += `<tr style="${i % 2 === 0 ? 'background: var(--bg-tertiary);' : ''}">`;
      html += `<td style="padding: 12px 16px; border-bottom: 1px solid var(--border);">${featureName}</td>`;
      
      plans.forEach(plan => {
        const feature = plan.features.find(f => f.name === featureName);
        const value = feature ? (feature.included ? '✓' : feature.value || '✗') : '✗';
        const color = feature?.included ? '#34c759' : (feature?.value ? '#0071e3' : 'var(--text-secondary)');
        
        html += `<td style="padding: 12px 16px; text-align: center; border-bottom: 1px solid var(--border); color: ${color}; ${plan.popular ? 'background: #0071e310;' : ''}">${value}</td>`;
      });
      
      html += '</tr>';
    });

    // CTA row
    html += '<tr>';
    html += '<td style="padding: 16px;"></td>';
    plans.forEach(plan => {
      html += `<td style="padding: 16px; text-align: center; ${plan.popular ? 'background: #0071e310;' : ''}">
        <button style="
          padding: 10px 24px;
          background: ${plan.popular ? '#0071e3' : 'var(--bg-tertiary)'};
          color: ${plan.popular ? 'white' : 'var(--text-primary)'};
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
        ">${plan.cta || '选择'}</button>
      </td>`;
    });
    html += '</tr>';

    html += '</tbody></table>';
    table.innerHTML = html;

    container.appendChild(table);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ProductPricingTable();
});
