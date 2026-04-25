// Print Functionality
class PrintManager {
  constructor() {
    this.init();
  }

  init() {
    this.addPrintButtons();
  }

  addPrintButtons() {
    // Add print button to product detail pages
    const productDetail = document.querySelector('.product-detail-card');
    if (productDetail) {
      const printBtn = document.createElement('button');
      printBtn.className = 'print-btn';
      printBtn.innerHTML = '🖨️ 打印';
      printBtn.style.cssText = `
        padding: 8px 16px;
        background: var(--bg-secondary);
        border: 1px solid var(--border);
        border-radius: 8px;
        cursor: pointer;
        font-size: 14px;
        margin-top: 16px;
        transition: all 0.3s;
      `;
      
      printBtn.addEventListener('click', () => this.print());
      productDetail.appendChild(printBtn);
    }
  }

  print() {
    window.print();
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new PrintManager();
});
