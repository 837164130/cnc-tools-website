// Product Size Picker
class SizePicker {
  constructor() {
    this.init();
  }

  init() {
    this.displaySizePicker();
  }

  displaySizePicker() {
    const container = document.querySelector('[data-size-picker]');
    if (!container) return;

    const config = JSON.parse(container.dataset.sizePicker || '{}');

    container.innerHTML = `
      <div style="
        padding: 24px;
        background: var(--bg-secondary);
        border-radius: 12px;
      ">
        <h3 style="margin-bottom: 16px;">${config.title || '尺寸选择'}</h3>
        <p style="margin-bottom: 24px; color: var(--text-secondary);">${config.description || '选择适合您的尺寸'}</p>
        
        <div class="size-options" style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 24px;">
          ${(config.sizes || []).map((size, i) => `
            <button class="size-option" data-size="${size.value}" style="
              min-width: 60px;
              padding: 12px 20px;
              background: ${i === 0 ? '#0071e3' : 'var(--bg-tertiary)'};
              color: ${i === 0 ? 'white' : 'var(--text-primary)'};
              border: 2px solid ${i === 0 ? '#0071e3' : 'transparent'};
              border-radius: 8px;
              cursor: pointer;
              font-size: 14px;
              font-weight: 600;
              transition: all 0.2s;
            ">${size.label}</button>
          `).join('')}
        </div>
        
        <div class="size-info" style="
          padding: 16px;
          background: var(--bg-tertiary);
          border-radius: 8px;
          display: none;
        ">
          <div style="font-size: 14px; color: var(--text-secondary); margin-bottom: 4px;">选中尺寸信息</div>
          <div class="selected-size-details" style="font-size: 16px;"></div>
        </div>
      </div>
    `;

    // Size selection
    container.querySelectorAll('.size-option').forEach(btn => {
      btn.addEventListener('click', function() {
        // Reset all buttons
        container.querySelectorAll('.size-option').forEach(b => {
          b.style.background = 'var(--bg-tertiary)';
          b.style.color = 'var(--text-primary)';
          b.style.borderColor = 'transparent';
        });

        // Select this button
        this.style.background = '#0071e3';
        this.style.color = 'white';
        this.style.borderColor = '#0071e3';

        // Show size info
        const sizeInfo = container.querySelector('.size-info');
        const details = container.querySelector('.selected-size-details');
        
        const sizeValue = this.dataset.size;
        const sizeData = config.sizes?.find(s => s.value === sizeValue);
        
        if (sizeInfo && details && sizeData) {
          sizeInfo.style.display = 'block';
          details.innerHTML = `
            <strong>${sizeData.label}</strong>
            ${sizeData.dimensions ? `<br>尺寸: ${sizeData.dimensions}` : ''}
            ${sizeData.weight ? `<br>重量: ${sizeData.weight}` : ''}
            ${sizeData.price ? `<br>价格: ${sizeData.price}` : ''}
          `;
        }

        // Dispatch custom event
        container.dispatchEvent(new CustomEvent('sizeChange', {
          detail: { size: sizeValue }
        }));
      });

      btn.addEventListener('mouseenter', function() {
        if (this.style.backgroundColor !== 'rgb(0, 113, 227)') {
          this.style.background = 'var(--bg-primary)';
        }
      });

      btn.addEventListener('mouseleave', function() {
        if (this.style.backgroundColor !== 'rgb(0, 113, 227)') {
          this.style.background = 'var(--bg-tertiary)';
        }
      });
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new SizePicker();
});
