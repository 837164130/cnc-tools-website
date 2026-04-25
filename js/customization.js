// Product Customization Service
class ProductCustomization {
  constructor() {
    this.init();
  }

  init() {
    this.displayCustomization();
  }

  displayCustomization() {
    const container = document.querySelector('[data-customization]');
    if (!container) return;

    const options = JSON.parse(container.dataset.customization || '[]');
    if (options.length === 0) return;

    container.innerHTML = `
      <div style="
        padding: 24px;
        background: linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%);
        border-radius: 12px;
        border: 1px solid var(--border);
      ">
        <h3 style="margin-bottom: 16px;">定制服务</h3>
        <p style="margin-bottom: 20px; color: var(--text-secondary);">根据您的需求定制专属刀具</p>
        
        <div style="display: grid; gap: 12px;">
          ${options.map(option => `
            <div style="
              display: flex;
              align-items: center;
              gap: 12px;
              padding: 12px;
              background: white;
              border-radius: 8px;
            ">
              <div style="font-size: 24px;">${option.icon || '🔧'}</div>
              <div style="flex: 1;">
                <div style="font-weight: 600;">${option.name}</div>
                <div style="font-size: 14px; color: var(--text-secondary);">${option.description}</div>
              </div>
            </div>
          `).join('')}
        </div>
        
        <button style="
          width: 100%;
          margin-top: 20px;
          padding: 12px;
          background: #0071e3;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 16px;
          font-weight: 600;
        ">咨询定制</button>
      </div>
    `;
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ProductCustomization();
});
