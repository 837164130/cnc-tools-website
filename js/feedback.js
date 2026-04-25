// Product Feedback Form
class ProductFeedback {
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
        <h3 style="margin-bottom: 16px;">产品反馈</h3>
        <p style="margin-bottom: 24px; color: var(--text-secondary);">您的意见对我们很重要，帮助我们改进产品</p>
        
        <form class="feedback-form">
          <div style="margin-bottom: 16px;">
            <label style="display: block; margin-bottom: 8px; font-weight: 600;">反馈类型</label>
            <select name="type" style="
              width: 100%;
              padding: 12px;
              border: 1px solid var(--border);
              border-radius: 8px;
              background: var(--bg-primary);
            ">
              <option value="suggestion">产品建议</option>
              <option value="bug">问题反馈</option>
              <option value="praise">产品好评</option>
              <option value="other">其他</option>
            </select>
          </div>
          
          <div style="margin-bottom: 16px;">
            <label style="display: block; margin-bottom: 8px; font-weight: 600;">反馈内容 *</label>
            <textarea name="message" rows="4" required placeholder="请详细描述您的反馈..." style="
              width: 100%;
              padding: 12px;
              border: 1px solid var(--border);
              border-radius: 8px;
              resize: vertical;
            "></textarea>
          </div>
          
          <div style="margin-bottom: 24px;">
            <label style="display: block; margin-bottom: 8px; font-weight: 600;">联系方式（选填）</label>
            <input type="text" name="contact" placeholder="邮箱或电话，方便我们回复您" style="
              width: 100%;
              padding: 12px;
              border: 1px solid var(--border);
              border-radius: 8px;
            ">
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

    // Form submission
    container.querySelector('.feedback-form').addEventListener('submit', (e) => {
      e.preventDefault();
      if (window.notifications) {
        window.notifications.show('感谢您的反馈！我们会认真考虑您的建议', 'success');
      }
      e.target.reset();
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ProductFeedback();
});
