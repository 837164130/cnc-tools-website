// Product Technical Support
class TechSupport {
  constructor() {
    this.init();
  }

  init() {
    this.displayTechSupport();
  }

  displayTechSupport() {
    const container = document.querySelector('[data-tech-support]');
    if (!container) return;

    const config = JSON.parse(container.dataset.techSupport || '{}');

    container.innerHTML = `
      <div style="
        padding: 24px;
        background: var(--bg-secondary);
        border-radius: 12px;
      ">
        <h3 style="margin-bottom: 16px;">${config.title || '技术支持'}</h3>
        <p style="margin-bottom: 24px; color: var(--text-secondary);">${config.description || '专业技术团队为您提供支持'}</p>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 16px; margin-bottom: 24px;">
          ${(config.channels || []).map(channel => `
            <a href="${channel.link || '#'}" style="
              padding: 20px;
              background: var(--bg-tertiary);
              border-radius: 12px;
              text-decoration: none;
              color: inherit;
              display: flex;
              align-items: center;
              gap: 16px;
              transition: transform 0.2s, box-shadow 0.2s;
            " onmouseenter="this.style.transform='translateY(-4px)';this.style.boxShadow='0 8px 24px rgba(0,0,0,0.1)'" onmouseleave="this.style.transform='';this.style.boxShadow=''">
              <div style="font-size: 32px;">${channel.icon || '💬'}</div>
              <div>
                <div style="font-weight: 600; margin-bottom: 4px;">${channel.name}</div>
                <div style="font-size: 13px; color: var(--text-secondary);">${channel.description}</div>
              </div>
            </a>
          `).join('')}
        </div>
        
        <div style="
          padding: 20px;
          background: linear-gradient(135deg, #0071e3 0%, #5856d6 100%);
          border-radius: 12px;
          color: white;
          text-align: center;
        ">
          <div style="font-size: 18px; font-weight: 600; margin-bottom: 8px;">需要紧急技术支持？</div>
          <div style="font-size: 14px; opacity: 0.9; margin-bottom: 16px;">我们的技术专家 7×24 小时在线为您服务</div>
          <a href="tel:${config.hotline || '400-888-8888'}" style="
            display: inline-block;
            padding: 12px 32px;
            background: white;
            color: #0071e3;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
          ">📞 ${config.hotline || '400-888-8888'}</a>
        </div>
      </div>
    `;
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new TechSupport();
});
