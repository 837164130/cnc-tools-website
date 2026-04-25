// Product After-Sales Service
class AfterSalesService {
  constructor() {
    this.init();
  }

  init() {
    this.displayAfterSalesService();
  }

  displayAfterSalesService() {
    const container = document.querySelector('[data-after-sales]');
    if (!container) return;

    const config = JSON.parse(container.dataset.afterSales || '{}');

    container.innerHTML = `
      <div style="
        padding: 24px;
        background: var(--bg-secondary);
        border-radius: 12px;
      ">
        <h3 style="margin-bottom: 16px;">${config.title || '售后服务'}</h3>
        <p style="margin-bottom: 24px; color: var(--text-secondary);">${config.description || '我们提供全面的售后保障'}</p>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px; margin-bottom: 24px;">
          ${(config.services || []).map(service => `
            <div style="
              padding: 20px;
              background: var(--bg-tertiary);
              border-radius: 12px;
              text-align: center;
              transition: transform 0.2s;
            " onmouseenter="this.style.transform='translateY(-4px)'" onmouseleave="this.style.transform=''">
              <div style="font-size: 40px; margin-bottom: 12px;">${service.icon || '🔧'}</div>
              <div style="font-weight: 600; margin-bottom: 8px;">${service.name}</div>
              <div style="font-size: 13px; color: var(--text-secondary); line-height: 1.5;">${service.description}</div>
            </div>
          `).join('')}
        </div>
        
        <div style="
          padding: 20px;
          background: var(--bg-tertiary);
          border-radius: 12px;
        ">
          <h4 style="margin-bottom: 16px;">服务流程</h4>
          <div style="display: flex; justify-content: space-between; align-items: center; position: relative;">
            <div style="position: absolute; top: 20px; left: 10%; right: 10%; height: 2px; background: var(--border); z-index: 0;"></div>
            
            ${(config.process || []).map((step, i) => `
              <div style="text-align: center; position: relative; z-index: 1; flex: 1;">
                <div style="
                  width: 40px;
                  height: 40px;
                  margin: 0 auto 8px;
                  background: ${i === 0 ? '#0071e3' : 'var(--bg-secondary)'};
                  color: ${i === 0 ? 'white' : 'var(--text-secondary)'};
                  border-radius: 50%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-weight: 600;
                  font-size: 14px;
                  border: 2px solid ${i === 0 ? '#0071e3' : 'var(--border)'};
                ">${i + 1}</div>
                <div style="font-size: 12px; color: var(--text-secondary);">${step}</div>
              </div>
            `).join('')}
          </div>
        </div>
        
        <div style="margin-top: 24px; text-align: center;">
          <a href="${config.contactLink || '#contact'}" style="
            display: inline-block;
            padding: 12px 32px;
            background: #0071e3;
            color: white;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
          ">联系售后</a>
        </div>
      </div>
    `;
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new AfterSalesService();
});
