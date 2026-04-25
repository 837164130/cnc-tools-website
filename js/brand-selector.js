// Product Brand Selector
class BrandSelector {
  constructor() {
    this.init();
  }

  init() {
    this.displayBrandSelector();
  }

  displayBrandSelector() {
    const container = document.querySelector('[data-brand-selector]');
    if (!container) return;

    const config = JSON.parse(container.dataset.brandSelector || '{}');

    container.innerHTML = `
      <div style="
        padding: 24px;
        background: var(--bg-secondary);
        border-radius: 12px;
      ">
        <h3 style="margin-bottom: 16px;">${config.title || '品牌选择'}</h3>
        <p style="margin-bottom: 24px; color: var(--text-secondary);">${config.description || '选择您信赖的品牌'}</p>
        
        <div class="brand-options" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 12px; margin-bottom: 24px;">
          ${(config.brands || []).map((brand, i) => `
            <div class="brand-option" data-brand="${brand.value}" style="
              padding: 20px;
              background: ${i === 0 ? '#0071e310' : 'var(--bg-tertiary)'};
              border: 2px solid ${i === 0 ? '#0071e3' : 'transparent'};
              border-radius: 12px;
              cursor: pointer;
              text-align: center;
              transition: all 0.2s;
            ">
              <div style="
                width: 60px;
                height: 60px;
                margin: 0 auto 12px;
                background: white;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 24px;
                font-weight: 700;
                color: #0071e3;
              ">${brand.logo || brand.name.charAt(0)}</div>
              <div style="font-weight: 600; margin-bottom: 4px;">${brand.name}</div>
              <div style="font-size: 12px; color: var(--text-secondary);">${brand.country || ''}</div>
              ${brand.rating ? `
                <div style="margin-top: 8px; font-size: 14px; color: #ff9500;">
                  ${'★'.repeat(Math.floor(brand.rating))}${'☆'.repeat(5 - Math.floor(brand.rating))}
                  <span style="color: var(--text-secondary); margin-left: 4px;">${brand.rating}</span>
                </div>
              ` : ''}
            </div>
          `).join('')}
        </div>
        
        <div class="brand-details" style="
          padding: 20px;
          background: var(--bg-tertiary);
          border-radius: 12px;
          display: none;
        ">
          <div style="font-size: 14px; color: var(--text-secondary); margin-bottom: 8px;">品牌详情</div>
          <div class="brand-info" style="font-size: 16px;"></div>
        </div>
      </div>
    `;

    // Brand selection
    container.querySelectorAll('.brand-option').forEach(option => {
      option.addEventListener('click', function() {
        // Reset all options
        container.querySelectorAll('.brand-option').forEach(o => {
          o.style.background = 'var(--bg-tertiary)';
          o.style.borderColor = 'transparent';
        });

        // Select this option
        this.style.background = '#0071e310';
        this.style.borderColor = '#0071e3';

        // Show brand details
        const details = container.querySelector('.brand-details');
        const info = container.querySelector('.brand-info');
        
        const brandValue = this.dataset.brand;
        const brandData = config.brands?.find(b => b.value === brandValue);
        
        if (details && info && brandData) {
          details.style.display = 'block';
          info.innerHTML = `
            <strong style="font-size: 18px; display: block; margin-bottom: 12px;">${brandData.name}</strong>
            ${brandData.description ? `<div style="margin-bottom: 12px; line-height: 1.6;">${brandData.description}</div>` : ''}
            ${brandData.founded ? `<div style="margin-bottom: 8px;">创立: ${brandData.founded}</div>` : ''}
            ${brandData.headquarters ? `<div style="margin-bottom: 8px;">总部: ${brandData.headquarters}</div>` : ''}
            ${brandData.specialty ? `<div style="margin-bottom: 8px;">专长: ${brandData.specialty}</div>` : ''}
            ${brandData.website ? `<a href="${brandData.website}" target="_blank" style="color: #0071e3; text-decoration: none;">访问官网 →</a>` : ''}
          `;
        }

        // Dispatch custom event
        container.dispatchEvent(new CustomEvent('brandChange', {
          detail: { brand: brandValue }
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
  new BrandSelector();
});
