// Customer Feedback Form
class CustomerFeedback {
  constructor() {
    this.init();
  }

  init() {
    this.displayFeedback();
  }

  displayFeedback() {
    const container = document.querySelector('[data-feedback]');
    if (!container) return;

    container.innerHTML = `
      <div style="
        padding: 24px;
        background: var(--bg-secondary);
        border-radius: 12px;
      ">
        <h3 style="margin-bottom: 16px;">意见反馈</h3>
        
        <form class="feedback-form">
          <div style="margin-bottom: 16px;">
            <label style="display: block; margin-bottom: 8px; font-weight: 600;">反馈类型</label>
            <select style="
              width: 100%;
              padding: 12px;
              border: 1px solid var(--border);
              border-radius: 8px;
              background: var(--bg-primary);
              font-size: 14px;
            ">
              <option>产品建议</option>
              <option>网站问题</option>
              <option>服务投诉</option>
              <option>其他</option>
            </select>
          </div>
          
          <div style="margin-bottom: 16px;">
            <label style="display: block; margin-bottom: 8px; font-weight: 600;">您的姓名</label>
            <input type="text" placeholder="请输入姓名" style="
              width: 100%;
              padding: 12px;
              border: 1px solid var(--border);
              border-radius: 8px;
              background: var(--bg-primary);
              font-size: 14px;
            ">
          </div>
          
          <div style="margin-bottom: 16px;">
            <label style="display: block; margin-bottom: 8px; font-weight: 600;">联系电话</label>
            <input type="tel" placeholder="请输入电话" style="
              width: 100%;
              padding: 12px;
              border: 1px solid var(--border);
              border-radius: 8px;
              background: var(--bg-primary);
              font-size: 14px;
            ">
          </div>
          
          <div style="margin-bottom: 24px;">
            <label style="display: block; margin-bottom: 8px; font-weight: 600;">反馈内容 *</label>
            <textarea rows="4" placeholder="请详细描述您的意见或建议..." required style="
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
          ">提交反馈</button>
        </form>
      </div>
    `;

    container.querySelector('.feedback-form').addEventListener('submit', (e) => {
      e.preventDefault();
      if (window.notifications) {
        window.notifications.show('感谢您的反馈！我们会尽快处理', 'success');
      }
      e.target.reset();
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new CustomerFeedback();
});
