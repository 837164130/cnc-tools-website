// Terms of Service Display
class TermsOfService {
  constructor() {
    this.init();
  }

  init() {
    this.displayTerms();
  }

  displayTerms() {
    const container = document.querySelector('[data-terms]');
    if (!container) return;

    container.innerHTML = `
      <div style="
        padding: 24px;
        background: var(--bg-secondary);
        border-radius: 12px;
      ">
        <h3 style="margin-bottom: 16px;">用户协议</h3>
        
        <div style="display: grid; gap: 16px;">
          <div style="padding: 16px; background: var(--bg-primary); border-radius: 8px;">
            <div style="font-weight: 600; margin-bottom: 8px;">账户注册</div>
            <div style="font-size: 14px; color: var(--text-secondary); line-height: 1.6;">
              用户需提供真实有效的信息进行注册，并对账户安全负责。禁止转让或共享账户。
            </div>
          </div>
          
          <div style="padding: 16px; background: var(--bg-primary); border-radius: 8px;">
            <div style="font-weight: 600; margin-bottom: 8px;">订单规则</div>
            <div style="font-size: 14px; color: var(--text-secondary); line-height: 1.6;">
              下单后请在规定时间内完成支付。订单确认后，我们将尽快安排发货。
            </div>
          </div>
          
          <div style="padding: 16px; background: var(--bg-primary); border-radius: 8px;">
            <div style="font-weight: 600; margin-bottom: 8px;">知识产权</div>
            <div style="font-size: 14px; color: var(--text-secondary); line-height: 1.6;">
              网站所有内容受版权保护，未经授权不得复制、转载或用于商业用途。
            </div>
          </div>
          
          <div style="padding: 16px; background: var(--bg-primary); border-radius: 8px;">
            <div style="font-weight: 600; margin-bottom: 8px;">免责声明</div>
            <div style="font-size: 14px; color: var(--text-secondary); line-height: 1.6;">
              我们尽力确保信息准确，但不对因使用本网站信息而导致的任何损失承担责任。
            </div>
          </div>
        </div>
        
        <div style="margin-top: 16px; text-align: center;">
          <span style="font-size: 14px; color: var(--text-secondary);">最后更新：2024年1月</span>
        </div>
      </div>
    `;
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new TermsOfService();
});
