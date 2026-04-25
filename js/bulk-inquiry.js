// Bulk Inquiry Form
class BulkInquiry {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('[data-bulk-inquiry]').forEach(container => {
      this.setupForm(container);
    });
  }

  setupForm(container) {
    container.innerHTML = `
      <div style="background: var(--bg-secondary); border-radius: 16px; padding: 32px;">
        <h3 style="margin-bottom: 8px;">批量询价</h3>
        <p style="color: var(--text-secondary); margin-bottom: 24px;">填写以下信息，我们将在24小时内为您提供报价</p>
        
        <form class="bulk-inquiry-form" style="display: flex; flex-direction: column; gap: 16px;">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
            <div>
              <label style="display: block; margin-bottom: 8px; font-weight: 600; font-size: 14px;">联系人 *</label>
              <input type="text" name="name" required style="width: 100%; padding: 12px; border: 2px solid var(--border); border-radius: 8px; background: var(--bg-primary); font-size: 14px;" placeholder="您的姓名">
            </div>
            <div>
              <label style="display: block; margin-bottom: 8px; font-weight: 600; font-size: 14px;">联系电话 *</label>
              <input type="tel" name="phone" required style="width: 100%; padding: 12px; border: 2px solid var(--border); border-radius: 8px; background: var(--bg-primary); font-size: 14px;" placeholder="您的电话">
            </div>
          </div>

          <div>
            <label style="display: block; margin-bottom: 8px; font-weight: 600; font-size: 14px;">公司名称</label>
            <input type="text" name="company" style="width: 100%; padding: 12px; border: 2px solid var(--border); border-radius: 8px; background: var(--bg-primary); font-size: 14px;" placeholder="您的公司名称">
          </div>

          <div>
            <label style="display: block; margin-bottom: 8px; font-weight: 600; font-size: 14px;">产品需求 *</label>
            <textarea name="requirements" required rows="4" style="width: 100%; padding: 12px; border: 2px solid var(--border); border-radius: 8px; background: var(--bg-primary); font-size: 14px; resize: vertical;" placeholder="请描述您需要的产品规格、数量、用途等"></textarea>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
            <div>
              <label style="display: block; margin-bottom: 8px; font-weight: 600; font-size: 14px;">预估数量</label>
              <input type="number" name="quantity" min="1" style="width: 100%; padding: 12px; border: 2px solid var(--border); border-radius: 8px; background: var(--bg-primary); font-size: 14px;" placeholder="数量">
            </div>
            <div>
              <label style="display: block; margin-bottom: 8px; font-weight: 600; font-size: 14px;">期望交期</label>
              <input type="date" name="deadline" style="width: 100%; padding: 12px; border: 2px solid var(--border); border-radius: 8px; background: var(--bg-primary); font-size: 14px;">
            </div>
          </div>

          <button type="submit" class="btn btn-primary" style="padding: 16px; font-size: 16px; margin-top: 8px;">
            提交询价
          </button>
        </form>
      </div>
    `;

    const form = container.querySelector('.bulk-inquiry-form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSubmit(form);
    });
  }

  handleSubmit(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Simulate submission
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.textContent = '提交中...';
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.textContent = '提交成功！';
      submitBtn.style.background = '#34c759';

      if (window.notifications) {
        window.notifications.show('询价已提交，我们将尽快与您联系', 'success');
      }

      setTimeout(() => {
        form.reset();
        submitBtn.textContent = '提交询价';
        submitBtn.style.background = '';
        submitBtn.disabled = false;
      }, 3000);
    }, 1500);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new BulkInquiry();
});
