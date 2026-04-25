// Product Configurator
class ProductConfigurator {
  constructor() {
    this.init();
  }

  init() {
    this.displayConfigurator();
  }

  displayConfigurator() {
    const container = document.querySelector('[data-configurator]');
    if (!container) return;

    const config = JSON.parse(container.dataset.configurator || '{}');

    container.innerHTML = `
      <div style="
        padding: 24px;
        background: var(--bg-secondary);
        border-radius: 12px;
      ">
        <h3 style="margin-bottom: 16px;">${config.title || '产品配置器'}</h3>
        <p style="margin-bottom: 24px; color: var(--text-secondary);">${config.description || '自定义您的产品配置'}</p>
        
        <div class="config-options" style="display: grid; gap: 20px; margin-bottom: 24px;">
          ${(config.options || []).map((option, i) => `
            <div>
              <label style="display: block; margin-bottom: 8px; font-weight: 600;">${option.name}</label>
              <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                ${(option.values || []).map((value, j) => `
                  <button class="config-option" data-group="${i}" data-value="${value}" style="
                    padding: 8px 16px;
                    background: ${j === 0 ? '#0071e3' : 'var(--bg-tertiary)'};
                    color: ${j === 0 ? 'white' : 'var(--text-primary)'};
                    border: 2px solid ${j === 0 ? '#0071e3' : 'transparent'};
                    border-radius: 8px;
                    cursor: pointer;
                    font-size: 14px;
                    transition: all 0.2s;
                  ">${value}</button>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>
        
        <div style="
          padding: 20px;
          background: var(--bg-tertiary);
          border-radius: 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        ">
          <div>
            <div style="font-size: 14px; color: var(--text-secondary);">配置总价</div>
            <div class="config-price" style="font-size: 28px; font-weight: 700; color: #0071e3;">${config.basePrice || '¥0'}</div>
          </div>
          <button style="
            padding: 12px 32px;
            background: #0071e3;
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 16px;
            font-weight: 600;
          ">确认配置</button>
        </div>
      </div>
    `;

    // Option selection
    container.querySelectorAll('.config-option').forEach(btn => {
      btn.addEventListener('click', function() {
        const group = this.dataset.group;
        container.querySelectorAll(`.config-option[data-group="${group}"]`).forEach(b => {
          b.style.background = 'var(--bg-tertiary)';
          b.style.color = 'var(--text-primary)';
          b.style.borderColor = 'transparent';
        });
        this.style.background = '#0071e3';
        this.style.color = 'white';
        this.style.borderColor = '#0071e3';
      });
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ProductConfigurator();
});
