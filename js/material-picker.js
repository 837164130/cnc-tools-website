// Product Material Picker
class MaterialPicker {
  constructor() {
    this.init();
  }

  init() {
    this.displayMaterialPicker();
  }

  displayMaterialPicker() {
    const container = document.querySelector('[data-material-picker]');
    if (!container) return;

    const config = JSON.parse(container.dataset.materialPicker || '{}');

    container.innerHTML = `
      <div style="
        padding: 24px;
        background: var(--bg-secondary);
        border-radius: 12px;
      ">
        <h3 style="margin-bottom: 16px;">${config.title || '材料选择'}</h3>
        <p style="margin-bottom: 24px; color: var(--text-secondary);">${config.description || '选择适合加工的材料'}</p>
        
        <div class="material-options" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 12px; margin-bottom: 24px;">
          ${(config.materials || []).map((material, i) => `
            <div class="material-option" data-material="${material.value}" style="
              padding: 16px;
              background: ${i === 0 ? '#0071e310' : 'var(--bg-tertiary)'};
              border: 2px solid ${i === 0 ? '#0071e3' : 'transparent'};
              border-radius: 12px;
              cursor: pointer;
              text-align: center;
              transition: all 0.2s;
            ">
              <div style="font-size: 32px; margin-bottom: 8px;">${material.icon || '🔧'}</div>
              <div style="font-weight: 600; font-size: 14px; margin-bottom: 4px;">${material.name}</div>
              <div style="font-size: 12px; color: var(--text-secondary);">${material.description || ''}</div>
            </div>
          `).join('')}
        </div>
        
        <div class="material-details" style="
          padding: 20px;
          background: var(--bg-tertiary);
          border-radius: 12px;
          display: none;
        ">
          <div style="font-size: 14px; color: var(--text-secondary); margin-bottom: 8px;">材料特性</div>
          <div class="material-info" style="font-size: 16px;"></div>
        </div>
      </div>
    `;

    // Material selection
    container.querySelectorAll('.material-option').forEach(option => {
      option.addEventListener('click', function() {
        // Reset all options
        container.querySelectorAll('.material-option').forEach(o => {
          o.style.background = 'var(--bg-tertiary)';
          o.style.borderColor = 'transparent';
        });

        // Select this option
        this.style.background = '#0071e310';
        this.style.borderColor = '#0071e3';

        // Show material details
        const details = container.querySelector('.material-details');
        const info = container.querySelector('.material-info');
        
        const materialValue = this.dataset.material;
        const materialData = config.materials?.find(m => m.value === materialValue);
        
        if (details && info && materialData) {
          details.style.display = 'block';
          info.innerHTML = `
            <strong style="font-size: 18px;">${materialData.name}</strong>
            ${materialData.hardness ? `<br><br>硬度: ${materialData.hardness}` : ''}
            ${materialData.density ? `<br>密度: ${materialData.density}` : ''}
            ${materialData.meltingPoint ? `<br>熔点: ${materialData.meltingPoint}` : ''}
            ${materialData.applications ? `<br><br>适用: ${materialData.applications}` : ''}
          `;
        }

        // Dispatch custom event
        container.dispatchEvent(new CustomEvent('materialChange', {
          detail: { material: materialValue }
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
  new MaterialPicker();
});
