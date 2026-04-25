// After-sales Service
class AfterSalesService {
  constructor() {
    this.init();
  }

  init() {
    this.displayService();
  }

  displayService() {
    const container = document.querySelector('[data-after-sales]');
    if (!container) return;

    container.innerHTML = `
      <div style="
        padding: 24px;
        background: var(--bg-secondary);
        border-radius: 12px;
      ">
        <h3 style="margin-bottom: 16px;">售后服务</h3>
        
        <div style="display: grid; gap: 16px;">
          <div style="display: flex; align-items: center; gap: 16px;">
            <div style="font-size: 32px;">📞</div>
            <div>
              <div style="font-weight: 600;">技术支持热线</div>
              <div style="color: var(--text-secondary); font-size: 14px;">400-888-9999（工作日 9:00-18:00）</div>
            </div>
          </div>
          
          <div style="display: flex; align-items: center; gap: 16px;">
            <div style="font-size: 32px;">🔧</div>
            <div>
              <div style="font-weight: 600;">维修服务</div>
              <div style="color: var(--text-secondary); font-size: 14px;">专业维修团队，快速响应</div>
            </div>
          </div>
          
          <div style="display: flex; align-items: center; gap: 16px;">
            <div style="font-size: 32px;">🎓</div>
            <div>
              <div style="font-weight: 600;">培训服务</div>
              <div style="color: var(--text-secondary); font-size: 14px;">提供产品使用培训和技术指导</div>
            </div>
          </div>
          
          <div style="display: flex; align-items: center; gap: 16px;">
            <div style="font-size: 32px;">📋</div>
            <div>
              <div style="font-weight: 600;">定期回访</div>
              <div style="color: var(--text-secondary); font-size: 14px;">定期了解产品使用情况，提供优化建议</div>
            </div>
          </div>
        </div>
        
        <div style="margin-top: 20px; text-align: center;">
          <a href="contact.html" style="
            display: inline-block;
            padding: 12px 32px;
            background: #0071e3;
            color: white;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
          ">联系售后</a>
        </div>
      </div>
    `;
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new AfterSalesService();
});
