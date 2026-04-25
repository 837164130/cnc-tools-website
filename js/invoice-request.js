// Product Invoice Request
class InvoiceRequest {
  constructor() {
    this.init();
  }

  init() {
    this.displayInvoiceRequest();
  }

  displayInvoiceRequest() {
    const container = document.querySelector('[data-invoice-request]');
    if (!container) return;

    const config = JSON.parse(container.dataset.invoiceRequest || '{}');

    container.innerHTML = `
      <div style="
        padding: 24px;
        background: var(--bg-secondary);
        border-radius: 12px;
      ">
        <h3 style="margin-bottom: 16px;">${config.title || '发票申请'}</h3>
        <p style="margin-bottom: 24px; color: var(--text-secondary);">${config.description || '申请开具增值税发票'}</p>
        
        <form class="invoice-form" style="display: grid; gap: 16px;">
          <div>
            <label style="display: block; margin-bottom: 8px; font-weight: 600; font-size: 14px;">发票类型</label>
            <div style="display: flex; gap: 12px;">
              <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                <input type="radio" name="invoice-type" value="personal" checked style="cursor: pointer;">
                <span>个人发票</span>
              </label>
              <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                <input type="radio" name="invoice-type" value="company" style="cursor: pointer;">
                <span>企业发票</span>
              </label>
            </div>
          </div>
          
          <div>
            <label style="display: block; margin-bottom: 8px; font-weight: 600; font-size: 14px;">发票抬头 *</label>
            <input type="text" name="invoice-title" placeholder="请输入发票抬头" required style="
              width: 100%;
              padding: 12px;
              border: 1px solid var(--border);
              border-radius: 8px;
              font-size: 16px;
              background: var(--bg-primary);
              color: var(--text-primary);
            ">
          </div>
          
          <div class="company-fields" style="display: none;">
            <label style="display: block; margin-bottom: 8px; font-weight: 600; font-size: 14px;">税号 *</label>
            <input type="text" name="tax-number" placeholder="请输入纳税人识别号" style="
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
            <label style="display: block; margin-bottom: 8px; font-weight: 600; font-size: 14px;">发票内容</label>
            <select name="invoice-content" style="
              width: 100%;
              padding: 12px;
              border: 1px solid var(--border);
              border-radius: 8px;
              font-size: 16px;
              background: var(--bg-primary);
              color: var(--text-primary);
            ">
              <option value="tools">数控刀具</option>
              <option value="parts">机械零件</option>
              <option value="service">技术服务</option>
            </select>
          </div>
          
          <div>
            <label style="display: block; margin-bottom: 8px; font-weight: 600; font-size: 14px;">接收邮箱 *</label>
            <input type="email" name="email" placeholder="请输入接收邮箱" required style="
              width: 100%;
              padding: 12px;
              border: 1px solid var(--border);
              border-radius: 8px;
              font-size: 16px;
              background: var(--bg-primary);
              color: var(--text-primary);
            ">
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
          ">提交申请</button>
        </form>
      </div>
    `;

    const form = container.querySelector('.invoice-form');
    const typeRadios = container.querySelectorAll('input[name="invoice-type"]');
    const companyFields = container.querySelector('.company-fields');

    typeRadios.forEach(radio => {
      radio.addEventListener('change', () => {
        if (radio.value === 'company' && radio.checked) {
          companyFields.style.display = 'block';
        } else {
          companyFields.style.display = 'none';
        }
      });
    });

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (window.notifications) {
          window.notifications.show('发票申请已提交，我们将尽快处理', 'success');
        }
        
        form.reset();
        companyFields.style.display = 'none';
      });
    }
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new InvoiceRequest();
});
