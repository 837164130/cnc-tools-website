// Product Contact Information
class ProductContact {
  constructor() {
    this.init();
  }

  init() {
    this.displayContact();
  }

  displayContact() {
    const container = document.querySelector('[data-contact-info]');
    if (!container) return;

    const info = JSON.parse(container.dataset.contactInfo || '{}');

    container.innerHTML = `
      <div style="
        padding: 24px;
        background: var(--bg-secondary);
        border-radius: 12px;
      ">
        <h3 style="margin-bottom: 16px;">联系我们</h3>
        
        <div style="display: grid; gap: 16px;">
          <div style="display: flex; align-items: center; gap: 16px;">
            <div style="font-size: 24px;">📞</div>
            <div>
              <div style="font-weight: 600;">电话</div>
              <div style="color: var(--text-secondary); font-size: 14px;">${info.phone || '400-888-8888'}</div>
            </div>
          </div>
          
          <div style="display: flex; align-items: center; gap: 16px;">
            <div style="font-size: 24px;">📧</div>
            <div>
              <div style="font-weight: 600;">邮箱</div>
              <div style="color: var(--text-secondary); font-size: 14px;">${info.email || 'sales@cccnc.ru'}</div>
            </div>
          </div>
          
          <div style="display: flex; align-items: center; gap: 16px;">
            <div style="font-size: 24px;">📍</div>
            <div>
              <div style="font-weight: 600;">地址</div>
              <div style="color: var(--text-secondary); font-size: 14px;">${info.address || '俄罗斯莫斯科'}</div>
            </div>
          </div>
          
          <div style="display: flex; align-items: center; gap: 16px;">
            <div style="font-size: 24px;">🕐</div>
            <div>
              <div style="font-weight: 600;">工作时间</div>
              <div style="color: var(--text-secondary); font-size: 14px;">${info.hours || '周一至周五 9:00-18:00'}</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ProductContact();
});
