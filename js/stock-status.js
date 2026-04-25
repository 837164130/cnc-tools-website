// Product Stock Status
class StockStatus {
  constructor() {
    this.init();
  }

  init() {
    this.displayStockStatus();
  }

  displayStockStatus() {
    const container = document.querySelector('[data-stock]');
    if (!container) return;

    const stock = JSON.parse(container.dataset.stock || '{}');

    const statusConfig = {
      'in-stock': { color: '#34c759', text: '现货', icon: '✓' },
      'low-stock': { color: '#ff9500', text: '库存紧张', icon: '!' },
      'out-of-stock': { color: '#ff3b30', text: '暂时缺货', icon: '✕' },
      'pre-order': { color: '#0071e3', text: '可预订', icon: '◷' }
    };

    const config = statusConfig[stock.status] || statusConfig['in-stock'];

    container.innerHTML = `
      <div style="
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 8px 16px;
        background: ${config.color}15;
        border-radius: 20px;
        border: 1px solid ${config.color}30;
      ">
        <span style="
          width: 8px;
          height: 8px;
          background: ${config.color};
          border-radius: 50%;
          display: inline-block;
          ${stock.status === 'in-stock' ? 'animation: pulse 2s infinite;' : ''}
        "></span>
        <span style="color: ${config.color}; font-weight: 600; font-size: 14px;">${config.text}</span>
        ${stock.quantity ? `<span style="color: var(--text-secondary); font-size: 14px;">(${stock.quantity} 件)</span>` : ''}
      </div>
    `;

    // Add pulse animation
    if (!document.querySelector('#stock-pulse-style')) {
      const style = document.createElement('style');
      style.id = 'stock-pulse-style';
      style.textContent = `
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `;
      document.head.appendChild(style);
    }
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new StockStatus();
});
