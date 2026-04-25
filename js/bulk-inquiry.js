// Bulk Inquiry Form
class BulkInquiry {
  constructor() {
    this.init();
  }

  init() {
    this.attachEventListeners();
  }

  attachEventListeners() {
    document.querySelectorAll('[data-bulk-inquiry]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.showBulkInquiryModal(btn.dataset.bulkInquiry);
      });
    });
  }

  showBulkInquiryModal(productId) {
    const modal = document.createElement('div');
    modal.className = 'bulk-inquiry-modal';
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      padding: 40px;
    `;

    modal.innerHTML = `
      <div style="background: var(--bg-primary); border-radius: 16px; max-width: 500px; width: 100%; padding: 32px; position: relative;">
        <button class="close-bulk-modal" style="position: absolute; top: 16px; right: 16px; background: none; border: none; font-size: 24px; cursor: pointer;">✕</button>
        <h3 style="margin-bottom: 24px;">批量询价</h3>
        
        <form class="bulk-inquiry-form">
          <div style="margin-bottom: 16px;">
            <label style="display: block; margin-bottom: 8px; font-weight: 600;">产品型号</label>
            <input type="text" value="${productId}" readonly style="
              width: 100%;
              padding: 12px;
              border: 1px solid var(--border);
              border-radius: 8px;
              background: var(--bg-secondary);
            ">
          </div>
          
          <div style="margin-bottom: 16px;">
            <label style="display: block; margin-bottom: 8px; font-weight: 600;">数量 *</label>
            <input type="number" name="quantity" required min="10" placeholder="最少10件" style="
              width: 100%;
              padding: 12px;
              border: 1px solid var(--border);
              border-radius: 8px;
            ">
          </div>
          
          <div style="margin-bottom: 16px;">
            <label style="display: block; margin-bottom: 8px; font-weight: 600;">公司名称</label>
            <input type="text" name="company" placeholder="您的公司名称" style="
              width: 100%;
              padding: 12px;
              border: 1px solid var(--border);
              border-radius: 8px;
            ">
          </div>
          
          <div style="margin-bottom: 16px;">
            <label style="display: block; margin-bottom: 8px; font-weight: 600;">联系人 *</label>
            <input type="text" name="contact" required placeholder="您的姓名" style="
              width: 100%;
              padding: 12px;
              border: 1px solid var(--border);
              border-radius: 8px;
            ">
          </div>
          
          <div style="margin-bottom: 16px;">
            <label style="display: block; margin-bottom: 8px; font-weight: 600;">联系电话 *</label>
            <input type="tel" name="phone" required placeholder="您的联系电话" style="
              width: 100%;
              padding: 12px;
              border: 1px solid var(--border);
              border-radius: 8px;
            ">
          </div>
          
          <div style="margin-bottom: 24px;">
            <label style="display: block; margin-bottom: 8px; font-weight: 600;">备注需求</label>
            <textarea name="notes" rows="3" placeholder="其他特殊要求..." style="
              width: 100%;
              padding: 12px;
              border: 1px solid var(--border);
              border-radius: 8px;
              resize: vertical;
            "></textarea>
          </div>
          
          <button type="submit" style="
            width: 100%;
            padding: 14px;
            background: #0071e3;
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 16px;
            font-weight: 600;
          ">提交询价</button>
        </form>
      </div>
    `;

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    // Close handlers
    modal.querySelector('.close-bulk-modal').addEventListener('click', () => {
      modal.remove();
      document.body.style.overflow = '';
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.remove();
        document.body.style.overflow = '';
      }
    });

    // Form submission
    modal.querySelector('.bulk-inquiry-form').addEventListener('submit', (e) => {
      e.preventDefault();
      if (window.notifications) {
        window.notifications.show('询价已提交，我们将尽快与您联系', 'success');
      }
      modal.remove();
      document.body.style.overflow = '';
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new BulkInquiry();
});
