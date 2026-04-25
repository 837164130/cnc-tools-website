// R&D Center Display
class RDCenter {
  constructor() {
    this.init();
  }

  init() {
    this.displayRDCenter();
  }

  displayRDCenter() {
    const container = document.querySelector('[data-rd-center]');
    if (!container) return;

    container.innerHTML = `
      <div style="
        padding: 32px;
        background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
        border-radius: 16px;
        color: white;
      ">
        <h3 style="margin-bottom: 16px; font-size: 24px;">研发中心</h3>
        
        <div style="display: grid; gap: 16px; line-height: 1.8;">
          <p>
            CCCNC 研发中心成立于2010年，占地面积5000平方米，
            拥有80余名研发工程师，其中博士5人，硕士30人。
          </p>
          <p>
            中心配备国际先进的研发设备，包括五轴数控工具磨床、
            涂层设备、材料分析仪器等，年研发投入占销售额的8%以上。
          </p>
        </div>
        
        <div style="margin-top: 24px; display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 16px;">
          <div style="text-align: center; padding: 16px; background: rgba(255,255,255,0.1); border-radius: 12px;">
            <div style="font-size: 28px; font-weight: 700; color: #0071e3;">80+</div>
            <div style="font-size: 14px; opacity: 0.8;">研发人员</div>
          </div>
          <div style="text-align: center; padding: 16px; background: rgba(255,255,255,0.1); border-radius: 12px;">
            <div style="font-size: 28px; font-weight: 700; color: #0071e3;">50+</div>
            <div style="font-size: 14px; opacity: 0.8;">专利技术</div>
          </div>
          <div style="text-align: center; padding: 16px; background: rgba(255,255,255,0.1); border-radius: 12px;">
            <div style="font-size: 28px; font-weight: 700; color: #0071e3;">200+</div>
            <div style="font-size: 14px; opacity: 0.8;">研发项目</div>
          </div>
          <div style="text-align: center; padding: 16px; background: rgba(255,255,255,0.1); border-radius: 12px;">
            <div style="font-size: 28px; font-weight: 700; color: #0071e3;">8%</div>
            <div style="font-size: 14px; opacity: 0.8;">研发投入</div>
          </div>
        </div>
      </div>
    `;
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new RDCenter();
});
