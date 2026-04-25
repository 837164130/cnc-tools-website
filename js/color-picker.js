// Product Color Picker
class ColorPicker {
  constructor() {
    this.init();
  }

  init() {
    this.displayColorPicker();
  }

  displayColorPicker() {
    const container = document.querySelector('[data-color-picker]');
    if (!container) return;

    const config = JSON.parse(container.dataset.colorPicker || '{}');

    container.innerHTML = `
      <div style="
        padding: 24px;
        background: var(--bg-secondary);
        border-radius: 12px;
      ">
        <h3 style="margin-bottom: 16px;">${config.title || '颜色选择'}</h3>
        <p style="margin-bottom: 24px; color: var(--text-secondary);">${config.description || '选择您喜欢的颜色'}</p>
        
        <div class="color-options" style="display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 24px;">
          ${(config.colors || []).map((color, i) => `
            <button class="color-option" data-color="${color.value}" style="
              width: 48px;
              height: 48px;
              border-radius: 50%;
              background: ${color.hex};
              border: 3px solid ${i === 0 ? '#0071e3' : 'transparent'};
              cursor: pointer;
              position: relative;
              transition: transform 0.2s, box-shadow 0.2s;
            " title="${color.name}">
              ${i === 0 ? '<span style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: white; font-size: 16px;">✓</span>' : ''}
            </button>
          `).join('')}
        </div>
        
        <div class="color-preview" style="
          padding: 20px;
          background: var(--bg-tertiary);
          border-radius: 12px;
          text-align: center;
        ">
          <div style="font-size: 14px; color: var(--text-secondary); margin-bottom: 8px;">已选颜色</div>
          <div class="selected-color-name" style="font-size: 18px; font-weight: 600;">${config.colors?.[0]?.name || '默认'}</div>
          <div class="selected-color-value" style="font-size: 14px; color: var(--text-secondary); margin-top: 4px;">${config.colors?.[0]?.value || ''}</div>
        </div>
      </div>
    `;

    // Color selection
    container.querySelectorAll('.color-option').forEach(btn => {
      btn.addEventListener('click', function() {
        // Reset all buttons
        container.querySelectorAll('.color-option').forEach(b => {
          b.style.borderColor = 'transparent';
          b.innerHTML = '';
        });

        // Select this button
        this.style.borderColor = '#0071e3';
        this.innerHTML = '<span style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: white; font-size: 16px;">✓</span>';

        // Update preview
        const colorName = this.title;
        const colorValue = this.dataset.color;
        
        const nameEl = container.querySelector('.selected-color-name');
        const valueEl = container.querySelector('.selected-color-value');
        
        if (nameEl) nameEl.textContent = colorName;
        if (valueEl) valueEl.textContent = colorValue;

        // Dispatch custom event
        container.dispatchEvent(new CustomEvent('colorChange', {
          detail: { color: colorValue, name: colorName }
        }));
      });

      btn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
      });

      btn.addEventListener('mouseleave', function() {
        this.style.transform = '';
        this.style.boxShadow = '';
      });
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ColorPicker();
});
