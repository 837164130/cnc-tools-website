// Product Map Location
class ProductMap {
  constructor() {
    this.init();
  }

  init() {
    this.displayMap();
  }

  displayMap() {
    const container = document.querySelector('[data-map]');
    if (!container) return;

    const location = JSON.parse(container.dataset.map || '{}');

    container.innerHTML = `
      <div style="
        padding: 24px;
        background: var(--bg-secondary);
        border-radius: 12px;
      ">
        <h3 style="margin-bottom: 16px;">地理位置</h3>
        
        <div style="
          width: 100%;
          height: 300px;
          background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        ">
          <div style="text-align: center;">
            <div style="font-size: 48px; margin-bottom: 8px;">📍</div>
            <div style="font-weight: 600;">${location.name || '公司总部'}</div>
            <div style="color: var(--text-secondary); font-size: 14px;">${location.address || '俄罗斯莫斯科'}</div>
          </div>
        </div>
        
        <div style="margin-top: 16px; display: flex; gap: 16px; flex-wrap: wrap;">
          <a href="https://maps.google.com/?q=${encodeURIComponent(location.address || '莫斯科')}" target="_blank" style="
            padding: 8px 16px;
            background: #0071e3;
            color: white;
            border-radius: 8px;
            text-decoration: none;
            font-size: 14px;
          ">在地图中查看</a>
        </div>
      </div>
    `;
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ProductMap();
});
