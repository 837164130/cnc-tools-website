// Product Demo / Interactive Demo
class ProductDemo {
  constructor() {
    this.init();
  }

  init() {
    this.displayDemo();
  }

  displayDemo() {
    const container = document.querySelector('[data-demo]');
    if (!container) return;

    const demo = JSON.parse(container.dataset.demo || '{}');

    container.innerHTML = `
      <div style="
        padding: 24px;
        background: var(--bg-secondary);
        border-radius: 12px;
      ">
        <h3 style="margin-bottom: 16px;">产品演示</h3>
        
        <div style="
          width: 100%;
          height: 400px;
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          margin-bottom: 16px;
        ">
          <div style="text-align: center; color: white;">
            <div style="font-size: 64px; margin-bottom: 16px;">🎮</div>
            <div style="font-weight: 600; font-size: 20px; margin-bottom: 8px;">${demo.title || '交互式产品演示'}</div>
            <div style="opacity: 0.7; font-size: 14px; margin-bottom: 24px;">${demo.description || '体验产品的核心功能'}</div>
            <button style="
              padding: 12px 32px;
              background: #0071e3;
              color: white;
              border: none;
              border-radius: 8px;
              cursor: pointer;
              font-size: 16px;
              font-weight: 600;
            ">开始演示</button>
          </div>
        </div>
        
        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
          ${(demo.features || []).map(feature => `
            <div style="
              display: flex;
              align-items: center;
              gap: 8px;
              padding: 8px 16px;
              background: var(--bg-tertiary);
              border-radius: 8px;
              font-size: 14px;
            ">
              <span style="color: #34c759;">✓</span>
              <span>${feature}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ProductDemo();
});
