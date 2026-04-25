// Environmental Responsibility
class EnvironmentalResponsibility {
  constructor() {
    this.init();
  }

  init() {
    this.displayEnvironment();
  }

  displayEnvironment() {
    const container = document.querySelector('[data-environment]');
    if (!container) return;

    container.innerHTML = `
      <div style="
        padding: 24px;
        background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
        border-radius: 12px;
      ">
        <h3 style="margin-bottom: 16px;">环境责任</h3>
        
        <div style="display: grid; gap: 16px;">
          <div style="display: flex; align-items: center; gap: 16px;">
            <div style="font-size: 32px;">♻️</div>
            <div>
              <div style="font-weight: 600;">绿色制造</div>
              <div style="color: var(--text-secondary); font-size: 14px;">采用环保工艺，减少废弃物排放</div>
            </div>
          </div>
          
          <div style="display: flex; align-items: center; gap: 16px;">
            <div style="font-size: 32px;">💧</div>
            <div>
              <div style="font-weight: 600;">节水节能</div>
              <div style="color: var(--text-secondary); font-size: 14px;">循环水系统，能耗降低30%</div>
            </div>
          </div>
          
          <div style="display: flex; align-items: center; gap: 16px;">
            <div style="font-size: 32px;">🌱</div>
            <div>
              <div style="font-weight: 600;">ISO 14001认证</div>
              <div style="color: var(--text-secondary); font-size: 14px;">通过环境管理体系认证</div>
            </div>
          </div>
          
          <div style="display: flex; align-items: center; gap: 16px;">
            <div style="font-size: 32px;">📦</div>
            <div>
              <div style="font-weight: 600;">环保包装</div>
              <div style="color: var(--text-secondary); font-size: 14px;">使用可回收材料，减少塑料使用</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new EnvironmentalResponsibility();
});
