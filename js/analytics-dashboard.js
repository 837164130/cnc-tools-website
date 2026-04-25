// Analytics Dashboard Component
class AnalyticsDashboard {
  constructor() {
    this.init();
  }

  init() {
    this.displayDashboard();
  }

  displayDashboard() {
    const container = document.querySelector('[data-analytics]');
    if (!container) return;

    const metrics = JSON.parse(container.dataset.analytics || '[]');
    if (metrics.length === 0) return;

    container.innerHTML = '<h3 style="margin-bottom: 24px;">数据分析</h3>';

    const grid = document.createElement('div');
    grid.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px;';

    metrics.forEach(metric => {
      const card = document.createElement('div');
      card.style.cssText = `
        padding: 20px;
        background: var(--bg-secondary);
        border-radius: 12px;
        text-align: center;
        transition: transform 0.2s, box-shadow 0.2s;
      `;

      const trendColor = metric.trend > 0 ? '#34c759' : metric.trend < 0 ? '#ff3b30' : 'var(--text-secondary)';
      const trendIcon = metric.trend > 0 ? '↑' : metric.trend < 0 ? '↓' : '→';

      card.innerHTML = `
        <div style="font-size: 32px; margin-bottom: 8px;">${metric.icon || '📊'}</div>
        <div style="font-size: 28px; font-weight: 700; margin-bottom: 4px;">${metric.value}</div>
        <div style="font-size: 14px; color: var(--text-secondary); margin-bottom: 8px;">${metric.label}</div>
        <div style="font-size: 12px; color: ${trendColor}; font-weight: 600;">
          ${trendIcon} ${Math.abs(metric.trend || 0)}%
        </div>
      `;

      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-4px)';
        card.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)';
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.boxShadow = '';
      });

      grid.appendChild(card);
    });

    container.appendChild(grid);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new AnalyticsDashboard();
});
