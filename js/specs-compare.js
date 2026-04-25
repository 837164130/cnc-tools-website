// Specifications Comparison
class SpecsCompare {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('[data-specs-compare]').forEach(btn => {
      btn.addEventListener('click', () => this.showComparison());
    });
  }

  showComparison() {
    const modal = document.createElement('div');
    modal.className = 'specs-compare-modal';
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      padding: 20px;
      opacity: 0;
      transition: opacity 0.3s;
    `;

    modal.innerHTML = `
      <div style="background: var(--bg-primary); border-radius: 16px; max-width: 900px; width: 100%; max-height: 90vh; overflow-y: auto; position: relative;">
        <button class="close-modal" style="position: absolute; top: 16px; right: 16px; background: none; border: none; font-size: 24px; cursor: pointer; z-index: 10;">✕</button>
        <div style="padding: 32px;">
          <h2 style="margin-bottom: 24px;">规格对比</h2>
          <div style="overflow-x: auto;">
            <table style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr>
                  <th style="text-align: left; padding: 12px; border-bottom: 2px solid var(--border);">规格</th>
                  <th style="text-align: left; padding: 12px; border-bottom: 2px solid var(--border);">本产品</th>
                  <th style="text-align: left; padding: 12px; border-bottom: 2px solid var(--border);">竞品A</th>
                  <th style="text-align: left; padding: 12px; border-bottom: 2px solid var(--border);">竞品B</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style="padding: 12px; border-bottom: 1px solid var(--border);">材质</td>
                  <td style="padding: 12px; border-bottom: 1px solid var(--border); color: var(--accent); font-weight: 600;">钨钢</td>
                  <td style="padding: 12px; border-bottom: 1px solid var(--border);">高速钢</td>
                  <td style="padding: 12px; border-bottom: 1px solid var(--border);">硬质合金</td>
                </tr>
                <tr>
                  <td style="padding: 12px; border-bottom: 1px solid var(--border);">涂层</td>
                  <td style="padding: 12px; border-bottom: 1px solid var(--border); color: var(--accent); font-weight: 600;">TiAlN</td>
                  <td style="padding: 12px; border-bottom: 1px solid var(--border);">TiN</td>
                  <td style="padding: 12px; border-bottom: 1px solid var(--border);">TiAlN</td>
                </tr>
                <tr>
                  <td style="padding: 12px; border-bottom: 1px solid var(--border);">硬度</td>
                  <td style="padding: 12px; border-bottom: 1px solid var(--border); color: var(--accent); font-weight: 600;">HRC 65</td>
                  <td style="padding: 12px; border-bottom: 1px solid var(--border);">HRC 62</td>
                  <td style="padding: 12px; border-bottom: 1px solid var(--border);">HRC 64</td>
                </tr>
                <tr>
                  <td style="padding: 12px; border-bottom: 1px solid var(--border);">价格</td>
                  <td style="padding: 12px; border-bottom: 1px solid var(--border); color: var(--accent); font-weight: 600;">¥150</td>
                  <td style="padding: 12px; border-bottom: 1px solid var(--border);">¥120</td>
                  <td style="padding: 12px; border-bottom: 1px solid var(--border);">¥180</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    requestAnimationFrame(() => {
      modal.style.opacity = '1';
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.classList.contains('close-modal')) {
        this.closeModal(modal);
      }
    });
  }

  closeModal(modal) {
    modal.style.opacity = '0';
    setTimeout(() => {
      modal.remove();
      document.body.style.overflow = '';
    }, 300);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new SpecsCompare();
});
