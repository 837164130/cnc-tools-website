// Invoice Information
class InvoiceInfo {
  constructor() {
    this.init();
  }

  init() {
    this.displayInvoice();
  }

  displayInvoice() {
    const container = document.querySelector('[data-invoice]');
    if (!container) return;

    container.innerHTML = `
      <div style="
        padding: 24px;
        background: var(--bg-secondary);
        border-radius: 12px;
      ">
        <h3 style="margin-bottom: 16px;">发票信息</h3>
        
        <div style="display: grid; gap: 12px;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="font-size: 24px;">📄</div>
            <div>
              <div style="font-weight: 600;">增值税普通发票</div>
              <div style="color: var(--text-secondary); font-size: 14px;">免费提供，下单时请选择</div>
            </div>
          </div>
          
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="font-size: 24px;">📋</div>
            <div>
              <div style="font-weight: 600;">增值税专用发票</div>
              <div style="color: var(--text-secondary); font-size: 14px;">需提供企业资质，税率13%</div>
            </div>
          </div>
          
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="font-size: 24px;">📧</div>
            <div>
              <div style="font-weight: 600;">电子发票</div>
              <div style="color: var(--text-secondary); font-size: 14px;">发送至您的邮箱，环保便捷</div>
            </div>
          </div>
        </div>
        
        <div style="margin-top: 16px; padding: 12px; background: rgba(0,113,227,0.1); border-radius: 8px; border-left: 3px solid #0071e3;">
          <div style="font-size: 14px; color: #0071e3;">💡 提示：发票将在订单完成后3个工作日内开具</div>
        </div>
      </div>
    `;
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new InvoiceInfo();
});
