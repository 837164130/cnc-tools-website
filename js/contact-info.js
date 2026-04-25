// Contact Information Display
class ContactInfo {
  constructor() {
    this.init();
  }

  init() {
    this.displayContact();
  }

  displayContact() {
    const container = document.querySelector('[data-contact-info]');
    if (!container) return;

    container.innerHTML = `
      <div style="
        padding: 24px;
        background: var(--bg-secondary);
        border-radius: 12px;
      ">
        <h3 style="margin-bottom: 16px;">联系我们</h3>
        
        <div style="display: grid; gap: 16px;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="font-size: 24px;">📍</div>
            <div>
              <div style="font-weight: 600;">公司地址</div>
              <div style="color: var(--text-secondary); font-size: 14px;">江苏省常州市武进区高新区</div>
            </div>
          </div>
          
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="font-size: 24px;">📞</div>
            <div>
              <div style="font-weight: 600;">联系电话</div>
              <div style="color: var(--text-secondary); font-size: 14px;">400-888-9999</div>
            </div>
          </div>
          
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="font-size: 24px;">📧</div>
            <div>
              <div style="font-weight: 600;">电子邮箱</div>
              <div style="color: var(--text-secondary); font-size: 14px;">sales@cccnc.com</div>
            </div>
          </div>
          
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="font-size: 24px;">🕐</div>
            <div>
              <div style="font-weight: 600;">工作时间</div>
              <div style="color: var(--text-secondary); font-size: 14px;">周一至周六 8:30-17:30</div>
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
          ">在线咨询</a>
        </div>
      </div>
    `;
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ContactInfo();
});
