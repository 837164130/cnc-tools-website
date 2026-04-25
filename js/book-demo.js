// Product Demo Booking
class BookDemo {
  constructor() {
    this.init();
  }

  init() {
    this.displayBookDemo();
  }

  displayBookDemo() {
    const container = document.querySelector('[data-book-demo]');
    if (!container) return;

    const config = JSON.parse(container.dataset.bookDemo || '{}');

    container.innerHTML = `
      <div style="
        padding: 24px;
        background: var(--bg-secondary);
        border-radius: 12px;
      ">
        <h3 style="margin-bottom: 16px;">${config.title || '预约演示'}</h3>
        <p style="margin-bottom: 24px; color: var(--text-secondary);">${config.description || '预约产品演示，了解产品详情'}</p>
        
        <form class="demo-form" style="display: grid; gap: 16px;">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
            <div>
              <label style="display: block; margin-bottom: 8px; font-weight: 600; font-size: 14px;">姓名 *</label>
              <input type="text" name="name" placeholder="您的姓名" required style="
                width: 100%;
                padding: 12px;
                border: 1px solid var(--border);
                border-radius: 8px;
                font-size: 16px;
                background: var(--bg-primary);
                color: var(--text-primary);
              ">
            </div>
            <div>
              <label style="display: block; margin-bottom: 8px; font-weight: 600; font-size: 14px;">电话 *</label>
              <input type="tel" name="phone" placeholder="联系电话" required style="
                width: 100%;
                padding: 12px;
                border: 1px solid var(--border);
                border-radius: 8px;
                font-size: 16px;
                background: var(--bg-primary);
                color: var(--text-primary);
              ">
            </div>
          </div>
          
          <div>
            <label style="display: block; margin-bottom: 8px; font-weight: 600; font-size: 14px;">邮箱 *</label>
            <input type="email" name="email" placeholder="您的邮箱" required style="
              width: 100%;
              padding: 12px;
              border: 1px solid var(--border);
              border-radius: 8px;
              font-size: 16px;
              background: var(--bg-primary);
              color: var(--text-primary);
            ">
          </div>
          
          <div>
            <label style="display: block; margin-bottom: 8px; font-weight: 600; font-size: 14px;">公司名称</label>
            <input type="text" name="company" placeholder="您的公司" style="
              width: 100%;
              padding: 12px;
              border: 1px solid var(--border);
              border-radius: 8px;
              font-size: 16px;
              background: var(--bg-primary);
              color: var(--text-primary);
            ">
          </div>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
            <div>
              <label style="display: block; margin-bottom: 8px; font-weight: 600; font-size: 14px;">预约日期</label>
              <input type="date" name="date" required style="
                width: 100%;
                padding: 12px;
                border: 1px solid var(--border);
                border-radius: 8px;
                font-size: 16px;
                background: var(--bg-primary);
                color: var(--text-primary);
              ">
            </div>
            <div>
              <label style="display: block; margin-bottom: 8px; font-weight: 600; font-size: 14px;">预约时间</label>
              <select name="time" required style="
                width: 100%;
                padding: 12px;
                border: 1px solid var(--border);
                border-radius: 8px;
                font-size: 16px;
                background: var(--bg-primary);
                color: var(--text-primary);
              ">
                <option value="">选择时间</option>
                <option value="09:00">09:00</option>
                <option value="10:00">10:00</option>
                <option value="11:00">11:00</option>
                <option value="14:00">14:00</option>
                <option value="15:00">15:00</option>
                <option value="16:00">16:00</option>
              </select>
            </div>
          </div>
          
          <div>
            <label style="display: block; margin-bottom: 8px; font-weight: 600; font-size: 14px;">感兴趣的产品</label>
            <select name="product" style="
              width: 100%;
              padding: 12px;
              border: 1px solid var(--border);
              border-radius: 8px;
              font-size: 16px;
              background: var(--bg-primary);
              color: var(--text-primary);
            ">
              <option value="">选择产品</option>
              <option value="endmills">立铣刀</option>
              <option value="drills">钻头</option>
              <option value="inserts">刀片</option>
              <option value="tool-holders">刀柄</option>
              <option value="collets">卡簧</option>
              <option value="arbors">刀盘</option>
            </select>
          </div>
          
          <div>
            <label style="display: block; margin-bottom: 8px; font-weight: 600; font-size: 14px;">备注</label>
            <textarea name="notes" rows="3" placeholder="其他需求或问题" style="
              width: 100%;
              padding: 12px;
              border: 1px solid var(--border);
              border-radius: 8px;
              font-size: 16px;
              background: var(--bg-primary);
              color: var(--text-primary);
              resize: vertical;
            "></textarea>
          </div>
          
          <button type="submit" style="
            padding: 14px;
            background: #0071e3;
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 16px;
            font-weight: 600;
          ">提交预约</button>
        </form>
      </div>
    `;

    const form = container.querySelector('.demo-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (window.notifications) {
          window.notifications.show('预约申请已提交，我们会尽快与您联系确认', 'success');
        }
        
        form.reset();
      });
    }
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new BookDemo();
});
