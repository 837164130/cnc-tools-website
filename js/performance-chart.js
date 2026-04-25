// Product Performance Chart
class PerformanceChart {
  constructor() {
    this.init();
  }

  init() {
    this.displayCharts();
  }

  displayCharts() {
    const container = document.querySelector('[data-performance-chart]');
    if (!container) return;

    const data = JSON.parse(container.dataset.performanceChart || '{}');
    if (!data.labels || !data.values) return;

    container.innerHTML = '<h3 style="margin-bottom: 16px;">性能参数</h3>';

    const chartContainer = document.createElement('div');
    chartContainer.style.cssText = `
      padding: 24px;
      background: var(--bg-secondary);
      border-radius: 12px;
    `;

    // Create simple bar chart using divs
    const maxValue = Math.max(...data.values);
    
    let chartHtml = '<div style="display: grid; gap: 12px;">';
    
    data.labels.forEach((label, index) => {
      const value = data.values[index];
      const percentage = (value / maxValue) * 100;
      
      chartHtml += `
        <div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
            <span style="font-size: 14px;">${label}</span>
            <span style="font-size: 14px; font-weight: 600;">${value}</span>
          </div>
          <div style="
            width: 100%;
            height: 24px;
            background: var(--bg-tertiary);
            border-radius: 12px;
            overflow: hidden;
          ">
            <div style="
              width: ${percentage}%;
              height: 100%;
              background: linear-gradient(90deg, #0071e3, #5856d6);
              border-radius: 12px;
              transition: width 1s ease-out;
            "></div>
          </div>
        </div>
      `;
    });
    
    chartHtml += '</div>';
    chartContainer.innerHTML = chartHtml;
    container.appendChild(chartContainer);

    // Animate bars
    setTimeout(() => {
      chartContainer.querySelectorAll('[style*="width:"]').forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => {
          bar.style.width = width;
        }, 100);
      });
    }, 100);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new PerformanceChart();
});
