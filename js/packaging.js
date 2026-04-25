// Packaging Information
class PackagingInfo {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('[data-packaging]').forEach(container => {
      this.setupPackaging(container);
    });
  }

  setupPackaging(container) {
    const packaging = JSON.parse(container.dataset.packaging || '{}');

    container.innerHTML = `
      <div style="background: var(--bg-secondary); border-radius: 16px; padding: 32px;">
        <h3 style="margin-bottom: 24px;">包装与物流</h3>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-bottom: 24px;">
          <div style="display: flex; align-items: flex-start; gap: 16px;">
            <div style="width: 48px; height: 48px; background: var(--accent); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 24px; flex-shrink: 0;">
              📦
            </div>
            <div>
              <div style="font-weight: 600; margin-bottom: 4px;">包装方式</div>
              <div style="color: var(--text-secondary); font-size: 14px;">${packaging.method || '防震泡沫+硬质纸箱'}</div>
            </div>
          </div>
          
          <div style="display: flex; align-items: flex-start; gap: 16px;">
            <div style="width: 48px; height: 48px; background: var(--accent); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 24px; flex-shrink: 0;">
              ⚖️
            </div>
            <div>
              <div style="font-weight: 600; margin-bottom: 4px;">包装重量</div>
              <div style="color: var(--text-secondary); font-size: 14px;">${packaging.weight || '0.5kg/件'}</div>
            </div>
          </div>
          
          <div style="display: flex; align-items: flex-start; gap: 16px;">
            <div style="width: 48px; height: 48px; background: var(--accent); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 24px; flex-shrink: 0;">
              📐
            </div>
            <div>
              <div style="font-weight: 600; margin-bottom: 4px;">包装尺寸</div>
              <div style="color: var(--text-secondary); font-size: 14px;">${packaging.dimensions || '15×10×5 cm'}</div>
            </div>
          </div>
          
          <div style="display: flex; align-items: flex-start; gap: 16px;">
            <div style="width: 48px; height: 48px; background: var(--accent); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 24px; flex-shrink: 0;">
              🚚
            </div>
            <div>
              <div style="font-weight: 600; margin-bottom: 4px;">运输方式</div>
              <div style="color: var(--text-secondary); font-size: 14px;">${packaging.shipping || '顺丰/德邦物流'}</div>
            </div>
          </div>
        </div>

        <div style="background: var(--bg-primary); border-radius: 12px; padding: 20px;">
          <h4 style="margin-bottom: 16px;">物流说明</h4>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <div style="display: flex; align-items: center; gap: 12px;">
              <span style="color: var(--accent);">✓</span>
              <span style="color: var(--text-secondary); font-size: 14px;">订单确认后24小时内发货</span>
            </div>
            <div style="display: flex; align-items: center; gap: 12px;">
              <span style="color: var(--accent);">✓</span>
              <span style="color: var(--text-secondary); font-size: 14px;">全国包邮，偏远地区除外</span>
            </div>
            <div style="display: flex; align-items: center; gap: 12px;">
              <span style="color: var(--accent);">✓</span>
              <span style="color: var(--text-secondary); font-size: 14px;">支持货到付款，开箱验货</span>
            </div>
            <div style="display: flex; align-items: center; gap: 12px;">
              <span style="color: var(--accent);">✓</span>
              <span style="color: var(--text-secondary); font-size: 14px;">大批量订单可定制包装方案</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new PackagingInfo();
});
