// Brand Story Display
class BrandStory {
  constructor() {
    this.init();
  }

  init() {
    this.displayStory();
  }

  displayStory() {
    const container = document.querySelector('[data-brand-story]');
    if (!container) return;

    container.innerHTML = `
      <div style="
        padding: 32px;
        background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
        border-radius: 16px;
        color: white;
      ">
        <h3 style="margin-bottom: 16px; font-size: 24px;">品牌故事</h3>
        
        <div style="display: grid; gap: 16px; line-height: 1.8;">
          <p>
            CCCNC 数控刀具成立于2008年，专注于高端数控刀具的研发与制造。
            十余年来，我们始终坚持"精度至上，品质为本"的理念，为全球制造业提供优质的切削解决方案。
          </p>
          <p>
            从最初的小型加工厂，到如今拥有50000平方米现代化厂房的行业领军企业，
            我们始终不忘初心，致力于推动中国数控刀具行业的发展。
          </p>
          <p>
            我们的产品广泛应用于航空航天、汽车制造、模具加工、医疗器械等领域，
            赢得了国内外客户的广泛认可与信赖。
          </p>
        </div>
        
        <div style="margin-top: 24px; display: flex; gap: 24px;">
          <div style="text-align: center;">
            <div style="font-size: 32px; font-weight: 700; color: #0071e3;">16+</div>
            <div style="font-size: 14px; opacity: 0.8;">年行业经验</div>
          </div>
          <div style="text-align: center;">
            <div style="font-size: 32px; font-weight: 700; color: #0071e3;">1000+</div>
            <div style="font-size: 14px; opacity: 0.8;">服务客户</div>
          </div>
          <div style="text-align: center;">
            <div style="font-size: 32px; font-weight: 700; color: #0071e3;">30+</div>
            <div style="font-size: 14px; opacity: 0.8;">出口国家</div>
          </div>
        </div>
      </div>
    `;
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new BrandStory();
});
