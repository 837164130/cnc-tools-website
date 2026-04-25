// Investor Relations
class InvestorRelations {
  constructor() {
    this.init();
  }

  init() {
    this.displayInvestor();
  }

  displayInvestor() {
    const container = document.querySelector('[data-investor]');
    if (!container) return;

    container.innerHTML = `
      <div style="
        padding: 24px;
        background: var(--bg-secondary);
        border-radius: 12px;
      ">
        <h3 style="margin-bottom: 16px;">投资者关系</h3>
        
        <div style="display: grid; gap: 16px;">
          <div style="padding: 16px; background: var(--bg-primary); border-radius: 8px;">
            <div style="font-weight: 600; margin-bottom: 8px;">公司概况</div>
            <div style="font-size: 14px; color: var(--text-secondary); line-height: 1.6;">
              CCCNC数控刀具股份有限公司成立于2008年，2018年在深交所创业板上市（股票代码：300XXX），
              是国内领先的数控刀具制造商。
            </div>
          </div>
          
          <div style="padding: 16px; background: var(--bg-primary); border-radius: 8px;">
            <div style="font-weight: 600; margin-bottom: 8px;">财务数据</div>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;">
              <div style="text-align: center;">
                <div style="font-size: 20px; font-weight: 700; color: #0071e3;">5.2亿</div>
                <div style="font-size: 12px; color: var(--text-secondary);">年营收</div>
              </div>
              <div style="text-align: center;">
                <div style="font-size: 20px; font-weight: 700; color: #0071e3;">18%</div>
                <div style="font-size: 12px; color: var(--text-secondary);">净利润率</div>
              </div>
              <div style="text-align: center;">
                <div style="font-size: 20px; font-weight: 700; color: #0071e3;">25%</div>
                <div style="font-size: 12px; color: var(--text-secondary);">年增长率</div>
              </div>
            </div>
          </div>
          
          <div style="padding: 16px; background: var(--bg-primary); border-radius: 8px;">
            <div style="font-weight: 600; margin-bottom: 8px;">联系方式</div>
            <div style="font-size: 14px; color: var(--text-secondary);">
              投资者热线：400-888-9999转8<br>
              邮箱：ir@cccnc.com
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new InvestorRelations();
});
