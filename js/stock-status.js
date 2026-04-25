// Stock Status Display
class StockStatus {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('[data-stock]').forEach(el => {
      this.displayStock(el);
    });
  }

  displayStock(element) {
    const stock = parseInt(element.dataset.stock) || 0;
    const status = this.getStatus(stock);

    element.innerHTML = `
      <div style="display: inline-flex; align-items: center; gap: 8px; padding: 8px 16px; background: ${status.bg}; border-radius: 20px; font-size: 14px; font-weight: 600; color: ${status.color};">
        <span style="width: 8px; height: 8px; border-radius: 50%; background: ${status.color}; animation: ${stock > 0 ? 'pulse 2s infinite' : 'none'};"></span>
        <span>${status.text}</span>
        ${stock > 0 ? `<span style="opacity: 0.7;">(${stock}件)</span>` : ''}
      </div>
    `;
  }

  getStatus(stock) {
    if (stock === 0) {
      return { text: '暂时缺货', color: '#ff3b30', bg: 'rgba(255, 59, 48, 0.1)' };
    } else if (stock < 10) {
      return { text: '库存紧张', color: '#ff9500', bg: 'rgba(255, 149, 0, 0.1)' };
    } else if (stock < 50) {
      return { text: '现货供应', color: '#34c759', bg: 'rgba(52, 199, 89, 0.1)' };
    } else {
      return { text: '充足库存', color: '#0071e3', bg: 'rgba(0, 113, 227, 0.1)' };
    }
  }
}

// Add pulse animation
const style = document.createElement('style');
style.textContent = `
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
`;
document.head.appendChild(style);

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new StockStatus();
});
