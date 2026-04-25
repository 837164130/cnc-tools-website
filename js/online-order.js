// Online Order Form
class OnlineOrder {
  constructor() {
    this.init();
  }

  init() {
    this.displayOrder();
  }

  displayOrder() {
    const container = document.querySelector('[data-online-order]');
    if (!container) return;

    container.innerHTML = `
      <div style="
        padding: 24px;
        background: var(--bg-secondary);
        border-radius: 12px;
      ">
        <h3 style="margin-bottom: 16px;">在线订购</h3>
        
        <form class="order-form">
          <div style="margin-bottom: 16px;">
            <label style="display: block; margin-bottom: 8px; font-weight: 600;">产品型号 *</label>
            <input type="text" placeholder="请输入产品型号" required style="
              width: 100%;
              padding: 12px;
              border: 1px solid var(--border);
              border-radius: 8px;
              background: var(--bg-primary);
              font-size: 14px;
            ">
          </div>
          
          <div style="margin-bottom: 16px;">
            <label style="display: block; margin-bottom: 8px; font-weight: 600;">数量 *</label>
            <input type="number" placeholder="请输入数量" min="1" required style="
              width: 100%;
              padding: 12px;
              border: 1px solid var(--border);
              border-radius: 8px;
              background: var(--bg-primary);
              font-size: 14px;
            ">
          </div>
          
          <div style="margin-bottom: 16px;">
            <label style="display: block; margin-bottom: 8px; font-weight: 600;">公司名称 *</label>
            <input type="text" placeholder="请输入公司名称" required style="
              width: 100%;
              padding: 12px;
              border: 1px solid var(--border);
              border-radius: 8px;
              background: var(--bg-primary);
              font-size: 14px;
            ">
          </div>
          
          <div style="margin-bottom: 16px;">
            <label style="display: block; margin-bottom: 8px; font-weight: 600;">联系人 *</label>
            <input type="text" placeholder="请输入联系人姓名" required style="
              width: 100%;
              padding: 12px;
              border: 1px solid var(--border);
              border-radius: 8px;
              background: var(--bg-primary);
              font-size: 14px;
            ">
          </div>
          
          <div style="margin-bottom: 16px;">
            <label style="display: block; margin-bottom: 8px; font-weight: 600;">联系电话 *</label>
            <input type="tel" placeholder="请输入联系电话" required style="
              width: 100%;
              padding: 12px;
              border: 1px solid var(--border);
              border-radius: 8px;
              background: var(--bg-primary);
              font-size: 14px;
            ">
          </div>
          
          <div style="margin-bottom: 16px;">
            <label style="display: block; margin-bottom: 8px; font-weight: 600;">收货地址 *</label>
            <textarea rows="2" placeholder="请输入详细收货地址" required style="
              width: 100%;
              padding: 12px;
              border: 1px solid var(--border);
              border-radius: 8px;
              background: var(--bg-primary);
              font-size: 14px;
              resize: vertical;
            "></textarea>
          </div>
          
          <div style="margin-bottom: 24px;">
            <label style="display: block; margin-bottom: 8px; font-weight: 600;">备注</label>
            <textarea rows="2" placeholder="如有特殊要求请说明..." style="
              width: 100%;
              padding: 12px;
              border: 1px solid var(--border);
              border-radius: 8px;
              background: var(--bg-primary);
              font-size: 14px;
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
          ">提交订单</button>
        </form>
      </div>
    `;

    container.querySelector('.order-form').addEventListener('submit', (e) => {
      e.preventDefault();
      if (window.notifications) {
        window.notifications.show('订单提交成功！我们会尽快与您确认', 'success');
      }
      e.target.reset();
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new OnlineOrder();
});
