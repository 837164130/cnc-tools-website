// Product Coating Picker
class CoatingPicker {
  constructor() {
    this.init();
  }

  init() {
    this.displayCoatingPicker();
  }

  displayCoatingPicker() {
    const container = document.querySelector('[data-coating-picker]');
    if (!container) return;

    const config = JSON.parse(container.dataset.coatingPicker || '{}');

    container.innerHTML = `
      <div style="
        padding: 24px;
        background: var(--bg-secondary);
        border-radius: 12px;
      ">
        <h3 style="margin-bottom: 16px;">${config.title || '涂层选择'}</h3>
        <p style="margin-bottom: 24px; color: var(--text-secondary);">${config.description || '选择适合加工需求的涂层'}</p>
        
        <div class="coating-options" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 12px; margin-bottom: 24px;">
          ${(config.coatings || []).map((coating, i) => `
            <div class="coating-option" data-coating="${coating.value}" style="
              padding: 16px;
              background: ${i === 0 ? '#0071e310' : 'var(--bg-tertiary)'};
              border: 2px solid ${i === 0 ? '#0071e3' : 'transparent'};
              border-radius: 12px;
              cursor: pointer;
              transition: all 0.2s;
            ">
              <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
                <div style="
                  width: 24px;
                  height: 24px;
                  border-radius: 50%;
                  background: ${coating.color || '#ccc'};
                  border: 2px solid white;
                  box-shadow: 0 0 0 1px var(--border);
                "></div>
                <div style="font-weight: 600;">${coating.name}</div>
              </div>
              <div style="font-size: 12px; color: var(--text-secondary); line-height: 1.5;">
                ${coating.description || ''}
              </div>
              ${coating.properties ? `
                <div style="margin-top: 8px; display: flex; gap: 4px; flex-wrap: wrap;">
                  ${coating.properties.map(prop => `
                    <span style="
                      padding: 2px 8px;
                      background: var(--bg-secondary);
                      border-radius: 4px;
                      font-size: 11px;
                      color: var(--text-secondary);
                    ">${prop}</span>
                  `).join('')}
                </div>
              ` : ''}
            </div>
          `).join('')}
        </div>
        
        <div class="coating-details" style="
          padding: 20px;
          background: var(--bg-tertiary);
          border-radius: 12px;
          display: none;
        ">
          <div style="font-size: 14px; color: var(--text-secondary); margin-bottom: 8px;">涂层特性</div>
          <div class="coating-info" style="font-size: 16px;"></div>
        </div>
      </div>
    `;

    // Coating selection
    container.querySelectorAll('.coating-option').forEach(option => {
      option.addEventListener('click', function() {
        // Reset all options
        container.querySelectorAll('.coating-option').forEach(o => {
          o.style.background = 'var(--bg-tertiary)';
          o.style.borderColor = 'transparent';
        });

        // Select this option
        this.style.background = '#0071e310';
        this.style.borderColor = '#0071e3';

        // Show coating details
        const details = container.querySelector('.coating-details');
        const info = container.querySelector('.coating-info');
        
        const coatingValue = this.dataset.coating;
        const coatingData = config.coatings?.find(c => c.value === coatingValue);
        
        if (details && info && coatingData) {
          details.style.display = 'block';
          info.innerHTML = `
            <strong style="font-size: 18px; display: block; margin-bottom: 12px;">${coatingData.name}</strong>
            ${coatingData.hardness ? `<div style="margin-bottom: 8px;">硬度: ${coatingData.hardness}</div>` : ''}
            ${coatingData.thickness ? `<div style="margin-bottom: 8px;">厚度: ${coatingData.thickness}</div>` : ''}
            ${coatingData.temperature ? `<div style="margin-bottom: 8px;">耐温: ${coatingData.temperature}</div>` : ''}
            ${coatingData.friction ? `<div style="margin-bottom: 8px;">摩擦系数: ${coatingData.friction}</div>` : ''}
            ${coatingData.applications ? `<div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid var(--border);">适用: ${coatingData.applications}</div>` : ''}
          `;
        }

        // Dispatch custom event
        container.dispatchEvent(new CustomEvent('coatingChange', {
          detail: { coating: coatingValue }
        }));
      });

      option.addEventListener('mouseenter', function() {
        if (this.style.borderColor !== 'rgb(0, 113, 227)') {
          this.style.transform = 'translateY(-2px)';
          this.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
        }
      });

      option.addEventListener('mouseleave', function() {
        this.style.transform = '';
        this.style.boxShadow = '';
      });
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new CoatingPicker();
});
