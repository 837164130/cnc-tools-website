// Customization Service
class CustomizationService {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('[data-customization]').forEach(container => {
      this.setupCustomization(container);
    });
  }

  setupCustomization(container) {
    const services = JSON.parse(container.dataset.customization || '[]');
    if (services.length === 0) return;

    container.innerHTML = `
      <div style="background: linear-gradient(135deg, var(--accent), #5856d6); border-radius: 16px; padding: 32px; color: white;">
        <h3 style="margin-bottom: 8px; color: white;">定制服务</h3>
        <p style="margin-bottom: 24px; opacity: 0.9;">根据您的特殊需求，我们提供专业的刀具定制服务</p>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 24px;">
          ${services.map(service => `
            <div style="background: rgba(255,255,255,0.15); border-radius: 12px; padding: 20px; backdrop-filter: blur(10px);">
              <div style="font-size: 32px; margin-bottom: 12px;">${service.icon}</div>
              <div style="font-weight: 600; margin-bottom: 8px;">${service.name}</div>
              <div style="font-size: 14px; opacity: 0.9; line-height: 1.6;">${service.description}</div>
            </div>
          `).join('')}
        </div>

        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
          <a href="contact.html?type=custom" class="btn" style="background: white; color: var(--accent); padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; display: inline-flex; align-items: center; gap: 8px;">
            <span>📋</span>
            <span>提交定制需求</span>
          </a>
          <button class="btn" style="background: rgba(255,255,255,0.2); color: white; padding: 12px 24px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.3); cursor: pointer; font-weight: 600;" onclick="window.open('tel:400-888-8888')">
            <span>📞</span>
            <span>咨询客服</span>
          </button>
        </div>
      </div>
    `;
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new CustomizationService();
});
