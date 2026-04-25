// Product Safety Information
class ProductSafety {
  constructor() {
    this.init();
  }

  init() {
    this.displaySafety();
  }

  displaySafety() {
    const container = document.querySelector('[data-safety]');
    if (!container) return;

    const warnings = JSON.parse(container.dataset.safety || '[]');
    if (warnings.length === 0) return;

    container.innerHTML = `
      <div style="
        padding: 24px;
        background: linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%);
        border-radius: 12px;
        border: 1px solid #ffc107;
      ">
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
          <div style="font-size: 32px;">⚠️</div>
          <h3 style="margin: 0; color: #856404;">安全警告</h3>
        </div>
        
        <div style="display: grid; gap: 12px;">
          ${warnings.map(warning => `
            <div style="
              display: flex;
              align-items: flex-start;
              gap: 12px;
              padding: 12px;
              background: rgba(255, 255, 255, 0.7);
              border-radius: 8px;
            ">
              <div style="
                width: 24px;
                height: 24px;
                background: #ffc107;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #856404;
                font-size: 14px;
                font-weight: 600;
                flex-shrink: 0;
              ">!</div>
              <div style="color: #856404; line-height: 1.6;">${warning}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ProductSafety();
});
