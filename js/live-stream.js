// Product Live Stream
class ProductLiveStream {
  constructor() {
    this.init();
  }

  init() {
    this.displayLiveStream();
  }

  displayLiveStream() {
    const container = document.querySelector('[data-live-stream]');
    if (!container) return;

    const stream = JSON.parse(container.dataset.liveStream || '{}');

    container.innerHTML = `
      <div style="
        padding: 24px;
        background: var(--bg-secondary);
        border-radius: 12px;
      ">
        <h3 style="margin-bottom: 16px;">产品直播</h3>
        
        <div style="
          width: 100%;
          height: 300px;
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        ">
          <div style="text-align: center; color: white;">
            <div style="font-size: 48px; margin-bottom: 8px;">📹</div>
            <div style="font-weight: 600;">${stream.title || '产品演示直播'}</div>
            <div style="opacity: 0.7; font-size: 14px;">${stream.schedule || '每周三 14:00'}</div>
          </div>
          
          ${stream.live ? `
            <div style="
              position: absolute;
              top: 16px;
              right: 16px;
              padding: 4px 12px;
              background: #ff3b30;
              color: white;
              border-radius: 12px;
              font-size: 12px;
              font-weight: 600;
              animation: pulse 2s infinite;
            ">● 直播中</div>
          ` : ''}
        </div>
        
        <div style="margin-top: 16px; display: flex; gap: 12px; flex-wrap: wrap;">
          <button style="
            padding: 12px 24px;
            background: #0071e3;
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 16px;
            font-weight: 600;
          ">预约观看</button>
          
          <button style="
            padding: 12px 24px;
            background: var(--bg-tertiary);
            color: var(--text-primary);
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 16px;
          ">查看回放</button>
        </div>
      </div>
    `;
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ProductLiveStream();
});
