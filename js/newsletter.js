// Product Newsletter Subscription
class ProductNewsletter {
  constructor() {
    this.init();
  }

  init() {
    this.displayNewsletter();
  }

  displayNewsletter() {
    const container = document.querySelector('[data-newsletter]');
    if (!container) return;

    container.innerHTML = `
      <div style="
        padding: 32px;
        background: linear-gradient(135deg, #0071e3 0%, #5856d6 100%);
        border-radius: 16px;
        color: white;
        text-align: center;
      ">
        <h3 style="margin-bottom: 8px; color: white;">订阅产品资讯</h3>
        <p style="margin-bottom: 24px; opacity: 0.9;">获取最新产品信息、技术文章和行业动态</p>
        
        <form class="newsletter-form" style="display: flex; gap: 12px; max-width: 500px; margin: 0 auto;">
          <input type="email" placeholder="输入您的邮箱" required style="
            flex: 1;
            padding: 12px 16px;
            border: none;
            border-radius: 8px;
            font-size: 16px;
          ">
          <button type="submit" style="
            padding: 12px 24px;
            background: white;
            color: #0071e3;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 16px;
            font-weight: 600;
          ">订阅</button>
        </form>
        
        <p style="margin-top: 16px; font-size: 12px; opacity: 0.7;">我们尊重您的隐私，不会发送垃圾邮件</p>
      </div>
    `;

    // Form submission
    container.querySelector('.newsletter-form').addEventListener('submit', (e) => {
      e.preventDefault();
      if (window.notifications) {
        window.notifications.show('订阅成功！感谢您的关注', 'success');
      }
      e.target.reset();
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ProductNewsletter();
});
