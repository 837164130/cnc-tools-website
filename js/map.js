// Map Location Display
class MapLocation {
  constructor() {
    this.init();
  }

  init() {
    this.displayMap();
  }

  displayMap() {
    const container = document.querySelector('[data-map]');
    if (!container) return;

    container.innerHTML = `
      <div style="
        padding: 24px;
        background: var(--bg-secondary);
        border-radius: 12px;
      ">
        <h3 style="margin-bottom: 16px;">公司位置</h3>
        
        <div style="
          width: 100%;
          height: 300px;
          background: linear-gradient(135deg, #e8f4f8 0%, #d1e7dd 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        ">
          <div style="text-align: center;">
            <div style="font-size: 48px; margin-bottom: 8px;">📍</div>
            <div style="font-weight: 600;">江苏省常州市武进区高新区</div>
            <div style="font-size: 14px; color: var(--text-secondary); margin-top: 4px;">点击导航</div>
          </div>
          
          <!-- Decorative map elements -->
          <div style="
            position: absolute;
            top: 20%;
            left: 20%;
            width: 8px;
            height: 8px;
            background: #0071e3;
            border-radius: 50%;
            opacity: 0.5;
          "></div>
          <div style="
            position: absolute;
            top: 40%;
            right: 30%;
            width: 6px;
            height: 6px;
            background: #34c759;
            border-radius: 50%;
            opacity: 0.5;
          "></div>
          <div style="
            position: absolute;
            bottom: 30%;
            left: 40%;
            width: 10px;
            height: 10px;
            background: #ff9500;
            border-radius: 50%;
            opacity: 0.5;
          "></div>
        </div>
        
        <div style="margin-top: 16px; display: flex; gap: 12px;">
          <a href="https://map.baidu.com/search/江苏省常州市武进区高新区" target="_blank" style="
            flex: 1;
            padding: 12px;
            background: #0071e3;
            color: white;
            text-decoration: none;
            border-radius: 8px;
            text-align: center;
            font-weight: 600;
          ">百度地图</a>
          <a href="https://ditu.amap.com/search/江苏省常州市武进区高新区" target="_blank" style="
            flex: 1;
            padding: 12px;
            background: var(--bg-tertiary);
            color: var(--text-primary);
            text-decoration: none;
            border-radius: 8px;
            text-align: center;
            font-weight: 600;
          ">高德地图</a>
        </div>
      </div>
    `;
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new MapLocation();
});
