// Product Referral Program
class ProductReferral {
  constructor() {
    this.init();
  }

  init() {
    this.displayReferral();
  }

  displayReferral() {
    const container = document.querySelector('[data-referral]');
    if (!container) return;

    const program = JSON.parse(container.dataset.referral || '{}');

    container.innerHTML = `
      <div style="
        padding: 32px;
        background: linear-gradient(135deg, #0071e3 0%, #5856d6 100%);
        border-radius: 16px;
        color: white;
        text-align: center;
      ">
        <h3 style="margin-bottom: 8px; color: white;">${program.title || '推荐有礼'}</h3>
        <p style="margin-bottom: 24px; opacity: 0.9;">${program.description || '邀请好友，双方获益'}</p>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 16px; margin-bottom: 24px;">
          ${(program.benefits || []).map(benefit => `
            <div style="padding: 16px; background: rgba(255,255,255,0.15); border-radius: 12px; backdrop-filter: blur(10px);">
              <div style="font-size: 32px; margin-bottom: 8px;">${benefit.icon || '🎁'}</div>
              <div style="font-weight: 600; font-size: 18px;">${benefit.value}</div>
              <div style="font-size: 12px; opacity: 0.8;">${benefit.label}</div>
            </div>
          `).join('')}
        </div>
        
        <div style="display: flex; gap: 12px; max-width: 500px; margin: 0 auto;">
          <input type="text" value="${program.code || 'YOUR-CODE-123'}" readonly style="
            flex: 1;
            padding: 12px 16px;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            text-align: center;
            font-family: monospace;
          ">
          <button class="copy-referral" style="
            padding: 12px 24px;
            background: white;
            color: #0071e3;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 16px;
            font-weight: 600;
          ">复制</button>
        </div>
        
        <div style="margin-top: 16px; font-size: 12px; opacity: 0.7;">
          已邀请 ${program.invited || 0} 人 · 获得奖励 ${program.earned || '¥0'}
        </div>
      </div>
    `;

    // Copy functionality
    const copyBtn = container.querySelector('.copy-referral');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        const input = container.querySelector('input');
        if (input) {
          input.select();
          document.execCommand('copy');
          copyBtn.textContent = '已复制!';
          setTimeout(() => { copyBtn.textContent = '复制'; }, 2000);
        }
        if (window.notifications) {
          window.notifications.show('推荐码已复制到剪贴板', 'success');
        }
      });
    }
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ProductReferral();
});
