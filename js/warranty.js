// Product Warranty
class ProductWarranty {
  constructor() {
    this.init();
  }

  init() {
    this.displayWarranty();
  }

  displayWarranty() {
    const container = document.querySelector('[data-warranty]');
    if (!container) return;

    const warranty = JSON.parse(container.dataset.warranty || '{}');

    container.innerHTML = `
      <div style="
        padding: 24px;
        background: linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%);
        border-radius: 12px;
        border: 1px solid var(--border);
      ">
        <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 16px;">
          <div style="font-size: 48px;">🛡️</div>
          <div>
            <h3 style="margin: 0; font-size: 20px;">质保服务</h3>
            <p style="margin: 4px 0 0; color: var(--text-secondary);">${warranty.period || '12个月'}质保期</p>
          </div>
        </div>
        
        <div style="display: grid; gap: 12px;">
          ${(warranty.features || []).map(feature => `
            <div style="display: flex; align-items: center; gap: 12px;">
              <div style="
                width: 24px;
                height: 24px;
                background: #34c759;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 14px;
                flex-shrink: 0;
              ">✓</div>
              <div>${feature}</div>
            </div>
          `).join('')}
        </div>

        ${warranty.registration ? `
          <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid var(--border);">
            <button style="
              padding: 12px 24px;
              background: #0071e3;
              color: white;
              border: none;
              border-radius: 8px;
              cursor: pointer;
              font-size: 14px;
            ">注册质保</button>
          </div>
        ` : ''}
      </div>
    `;
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ProductWarranty();
});
