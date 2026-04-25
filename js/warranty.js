// Warranty Information
class WarrantyInfo {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('[data-warranty]').forEach(container => {
      this.setupWarranty(container);
    });
  }

  setupWarranty(container) {
    const warranty = JSON.parse(container.dataset.warranty || '{}');

    container.innerHTML = `
      <div style="background: linear-gradient(135deg, var(--bg-secondary), var(--bg-tertiary)); border-radius: 16px; padding: 32px;">
        <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 24px;">
          <div style="width: 60px; height: 60px; background: var(--accent); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 28px;">
            🛡️
          </div>
          <div>
            <h3 style="margin: 0;">质量保证</h3>
            <p style="color: var(--text-secondary); margin: 4px 0 0;">${warranty.period || '12个月'}质保承诺</p>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 24px;">
          <div style="background: var(--bg-primary); border-radius: 12px; padding: 20px;">
            <div style="font-size: 32px; margin-bottom: 8px;">📅</div>
            <div style="font-weight: 600; margin-bottom: 4px;">质保期限</div>
            <div style="color: var(--text-secondary); font-size: 14px;">${warranty.period || '12个月'}</div>
          </div>
          <div style="background: var(--bg-primary); border-radius: 12px; padding: 20px;">
            <div style="font-size: 32px; margin-bottom: 8px;">🔄</div>
            <div style="font-weight: 600; margin-bottom: 4px;">退换政策</div>
            <div style="color: var(--text-secondary); font-size: 14px;">${warranty.returnPolicy || '7天无理由退换'}</div>
          </div>
          <div style="background: var(--bg-primary); border-radius: 12px; padding: 20px;">
            <div style="font-size: 32px; margin-bottom: 8px;">🔧</div>
            <div style="font-weight: 600; margin-bottom: 4px;">维修服务</div>
            <div style="color: var(--text-secondary); font-size: 14px;">${warranty.repairService || '终身免费维修'}</div>
          </div>
          <div style="background: var(--bg-primary); border-radius: 12px; padding: 20px;">
            <div style="font-size: 32px; margin-bottom: 8px;">📞</div>
            <div style="font-weight: 600; margin-bottom: 4px;">售后支持</div>
            <div style="color: var(--text-secondary); font-size: 14px;">${warranty.support || '24/7在线客服'}</div>
          </div>
        </div>

        <div style="background: var(--bg-primary); border-radius: 12px; padding: 20px;">
          <h4 style="margin-bottom: 12px;">质保条款</h4>
          <ul style="margin: 0; padding-left: 20px; color: var(--text-secondary); line-height: 2;">
            ${(warranty.terms || [
              '正常使用条件下，产品出现质量问题可免费更换',
              '人为损坏、不当使用不在质保范围内',
              '质保期内提供免费技术咨询服务',
              '产品终身享受成本价维修服务'
            ]).map(term => `<li>${term}</li>`).join('')}
          </ul>
        </div>
      </div>
    `;
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new WarrantyInfo();
});
