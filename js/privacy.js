// Privacy Policy Display
class PrivacyPolicy {
  constructor() {
    this.init();
  }

  init() {
    this.displayPrivacy();
  }

  displayPrivacy() {
    const container = document.querySelector('[data-privacy]');
    if (!container) return;

    container.innerHTML = `
      <div style="
        padding: 24px;
        background: var(--bg-secondary);
        border-radius: 12px;
      ">
        <h3 style="margin-bottom: 16px;">隐私政策</h3>
        
        <div style="display: grid; gap: 16px;">
          <div style="padding: 16px; background: var(--bg-primary); border-radius: 8px;">
            <div style="font-weight: 600; margin-bottom: 8px;">信息收集</div>
            <div style="font-size: 14px; color: var(--text-secondary); line-height: 1.6;">
              我们仅收集必要的用户信息，包括姓名、联系方式和地址，用于订单处理和客户服务。
            </div>
          </div>
          
          <div style="padding: 16px; background: var(--bg-primary); border-radius: 8px;">
            <div style="font-weight: 600; margin-bottom: 8px;">信息保护</div>
            <div style="font-size: 14px; color: var(--text-secondary); line-height: 1.6;">
              采用SSL加密传输，严格保护您的个人信息安全，不会向第三方出售或共享。
            </div>
          </div>
          
          <div style="padding: 16px; background: var(--bg-primary); border-radius: 8px;">
            <div style="font-weight: 600; margin-bottom: 8px;">Cookie使用</div>
            <div style="font-size: 14px; color: var(--text-secondary); line-height: 1.6;">
              使用Cookie改善用户体验，您可以在浏览器设置中管理Cookie偏好。
            </div>
          </div>
          
          <div style="padding: 16px; background: var(--bg-primary); border-radius: 8px;">
            <div style="font-weight: 600; margin-bottom: 8px;">用户权利</div>
            <div style="font-size: 14px; color: var(--text-secondary); line-height: 1.6;">
              您有权访问、修改或删除您的个人信息，请联系客服处理相关请求。
            </div>
          </div>
        </div>
        
        <div style="margin-top: 16px; text-align: center;">
          <span style="font-size: 14px; color: var(--text-secondary);">最后更新：2024年1月</span>
        </div>
      </div>
    `;
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new PrivacyPolicy();
});
