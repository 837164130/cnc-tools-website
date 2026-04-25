// Specifications Comparison
class SpecsCompare {
  constructor() {
    this.init();
  }

  init() {
    this.attachEventListeners();
  }

  attachEventListeners() {
    document.querySelectorAll('[data-specs-compare]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.showSpecsComparison(btn.dataset.specsCompare);
      });
    });
  }

  showSpecsComparison(productId) {
    const modal = document.createElement('div');
    modal.className = 'specs-compare-modal';
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      padding: 40px;
    `;

    // Get product specs (in production, this would fetch from API)
    const specs = this.getProductSpecs(productId);

    modal.innerHTML = `
      <div style="background: var(--bg-primary); border-radius: 16px; max-width: 600px; width: 100%; max-height: 90vh; overflow-y: auto; position: relative;">
        <button class="close-specs-modal" style="position: absolute; top: 16px; right: 16px; background: none; border: none; font-size: 24px; cursor: pointer;">✕</button>
        <div style="padding: 32px;">
          <h2 style="margin-bottom: 24px;">规格参数</h2>
          <table style="width: 100%; border-collapse: collapse;">
            ${Object.entries(specs).map(([key, value]) => `
              <tr style="border-bottom: 1px solid var(--border);">
                <td style="padding: 12px; font-weight: 600; width: 40%;">${key}</td>
                <td style="padding: 12px;">${value}</td>
              </tr>
            `).join('')}
          </table>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    modal.querySelector('.close-specs-modal').addEventListener('click', () => {
      modal.remove();
      document.body.style.overflow = '';
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.remove();
        document.body.style.overflow = '';
      }
    });
  }

  getProductSpecs(productId) {
    // Mock data - in production, this would come from an API
    return {
      '材质': '硬质合金',
      '涂层': 'TiAlN',
      '刃数': '4',
      '柄径': '6mm',
      '刃长': '15mm',
      '总长': '50mm',
      '螺旋角': '35°',
      '适用材料': '钢、不锈钢、铸铁',
      '最高转速': '15000 RPM'
    };
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new SpecsCompare();
});
