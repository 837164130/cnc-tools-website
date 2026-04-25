// Product Sandbox / Playground
class ProductSandbox {
  constructor() {
    this.init();
  }

  init() {
    this.displaySandbox();
  }

  displaySandbox() {
    const container = document.querySelector('[data-sandbox]');
    if (!container) return;

    const sandbox = JSON.parse(container.dataset.sandbox || '{}');

    container.innerHTML = `
      <div style="
        padding: 24px;
        background: var(--bg-secondary);
        border-radius: 12px;
      ">
        <h3 style="margin-bottom: 16px;">在线沙盒</h3>
        <p style="margin-bottom: 24px; color: var(--text-secondary);">${sandbox.description || '在浏览器中直接体验产品功能'}</p>
        
        <div style="
          width: 100%;
          height: 500px;
          background: #1e1e1e;
          border-radius: 12px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        ">
          <div style="
            padding: 12px 16px;
            background: #2d2d2d;
            display: flex;
            gap: 8px;
            align-items: center;
          ">
            <div style="width: 12px; height: 12px; border-radius: 50%; background: #ff5f56;"></div>
            <div style="width: 12px; height: 12px; border-radius: 50%; background: #ffbd2e;"></div>
            <div style="width: 12px; height: 12px; border-radius: 50%; background: #27c93f;"></div>
            <span style="margin-left: 8px; color: #ccc; font-size: 14px; font-family: monospace;">${sandbox.title || 'product-sandbox'}</span>
          </div>
          
          <div style="flex: 1; padding: 20px; color: #d4d4d4; font-family: monospace; font-size: 14px; overflow: auto;">
            <div style="color: #6a9955;">// 欢迎使用产品沙盒环境</div>
            <div style="color: #6a9955;">// 在这里测试和体验产品功能</div>
            <div style="margin-top: 16px;">
              <span style="color: #569cd6;">const</span> 
              <span style="color: #9cdcfe;">product</span> = 
              <span style="color: #ce9178;">'${sandbox.productName || 'CNC Tool'}'</span>;
            </div>
            <div>
              <span style="color: #dcdcaa;">console</span>.
              <span style="color: #dcdcaa;">log</span>(
              <span style="color: #ce9178;">'Loading sandbox...'</span>);
            </div>
            <div style="margin-top: 16px; color: #858585;">> Ready to explore!</div>
          </div>
        </div>
        
        <div style="margin-top: 16px; display: flex; gap: 12px;">
          <button style="
            padding: 10px 20px;
            background: #0071e3;
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 600;
          ">运行代码</button>
          <button style="
            padding: 10px 20px;
            background: var(--bg-tertiary);
            color: var(--text-primary);
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 14px;
          ">重置</button>
          <button style="
            padding: 10px 20px;
            background: var(--bg-tertiary);
            color: var(--text-primary);
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 14px;
          ">分享</button>
        </div>
      </div>
    `;
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ProductSandbox();
});
