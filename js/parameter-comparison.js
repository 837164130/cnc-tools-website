// Product Parameter Comparison
class ParameterComparison {
  constructor() {
    this.init();
  }

  init() {
    this.displayParameterComparison();
  }

  displayParameterComparison() {
    const container = document.querySelector('[data-parameter-comparison]');
    if (!container) return;

    const config = JSON.parse(container.dataset.parameterComparison || '{}');

    container.innerHTML = `
      <div style="
        padding: 24px;
        background: var(--bg-secondary);
        border-radius: 12px;
      ">
        <h3 style="margin-bottom: 16px;">${config.title || '参数对比'}</h3>
        <p style="margin-bottom: 24px; color: var(--text-secondary);">${config.description || '详细对比产品技术参数'}</p>
        
        <div class="param-comparison-table" style="overflow-x: auto;">
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background: var(--bg-tertiary);">
                <th style="padding: 12px; text-align: left; border-bottom: 2px solid var(--border); min-width: 150px;">参数</th>
                ${(config.products || []).map(product => `
                  <th style="padding: 12px; text-align: center; border-bottom: 2px solid var(--border); min-width: 120px;">
                    <div style="font-weight: 600;">${product.name}</div>
                  </th>
                `).join('')}
              </tr>
            </thead>
            <tbody>
              ${(config.parameters || []).map((param, i) => `
                <tr style="${i % 2 === 0 ? 'background: var(--bg-tertiary);' : ''}">
                  <td style="padding: 12px; border-bottom: 1px solid var(--border); font-weight: 600;">${param.name}</td>
                  ${(config.products || []).map(product => `
                    <td style="padding: 12px; text-align: center; border-bottom: 1px solid var(--border);">
                      ${this.formatValue(product[param.key], param.unit)}
                    </td>
                  `).join('')}
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        
        ${config.chart ? `
          <div style="margin-top: 24px;">
            <div style="font-weight: 600; margin-bottom: 16px;">可视化对比</div>
            <div class="param-chart" style="height: 300px; background: var(--bg-tertiary); border-radius: 12px; padding: 20px;">
              <!-- Chart will be rendered here -->
            </div>
          </div>
        ` : ''}
      </div>
    `;

    if (config.chart) {
      this.renderChart(container, config);
    }
  }

  formatValue(value, unit) {
    if (value === undefined || value === null) return '-';
    if (typeof value === 'boolean') return value ? '✓' : '✗';
    return unit ? `${value} ${unit}` : value;
  }

  renderChart(container, config) {
    const chartContainer = container.querySelector('.param-chart');
    if (!chartContainer) return;

    // Simple bar chart visualization
    const chartParam = config.chartParameter || config.parameters[0];
    const maxValue = Math.max(...config.products.map(p => parseFloat(p[chartParam.key]) || 0));

    chartContainer.innerHTML = `
      <div style="display: flex; align-items: flex-end; justify-content: space-around; height: 100%; padding: 0 20px;">
        ${config.products.map(product => {
          const value = parseFloat(product[chartParam.key]) || 0;
          const height = maxValue > 0 ? (value / maxValue * 200) : 0;
          return `
            <div style="display: flex; flex-direction: column; align-items: center; flex: 1;">
              <div style="font-size: 12px; margin-bottom: 8px; font-weight: 600;">${value}${chartParam.unit || ''}</div>
              <div style="
                width: 60px;
                height: ${height}px;
                background: linear-gradient(to top, #0071e3, #5856d6);
                border-radius: 4px 4px 0 0;
                transition: height 0.5s ease;
              "></div>
              <div style="margin-top: 8px; font-size: 12px; text-align: center;">${product.name}</div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ParameterComparison();
});
