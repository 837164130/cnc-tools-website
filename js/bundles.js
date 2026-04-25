// Product Bundles
class ProductBundles {
  constructor() {
    this.init();
  }

  init() {
    this.displayBundles();
  }

  displayBundles() {
    const container = document.querySelector('[data-bundles]');
    if (!container) return;

    const bundles = JSON.parse(container.dataset.bundles || '[]');
    if (bundles.length === 0) return;

    container.innerHTML = '<h3 style="margin-bottom: 16px;">优惠套装</h3>';

    bundles.forEach(bundle => {
      const bundleEl = document.createElement('div');
      bundleEl.style.cssText = `
        padding: 24px;
        background: var(--bg-secondary);
        border-radius: 12px;
        margin-bottom: 16px;
        border: 2px solid var(--border);
      `;

      let itemsHtml = '';
      bundle.items.forEach((item, index) => {
        itemsHtml += `
          <div style="display: flex; align-items: center; gap: 12px; ${index > 0 ? 'margin-top: 12px;' : ''}">
            <div style="width: 60px; height: 60px; background: var(--bg-tertiary); border-radius: 8px; display: flex; align-items: center; justify-content: center;">
              ${item.image ? `<img src="${item.image}" alt="" style="max-width: 100%; max-height: 100%; object-fit: cover;">` : '🔧'}
            </div>
            <div style="flex: 1;">
              <div style="font-weight: 600;">${item.name}</div>
              <div style="color: var(--text-secondary); font-size: 14px;">${item.price}</div>
            </div>
            ${index < bundle.items.length - 1 ? '<div style="color: var(--text-secondary);">+</div>' : ''}
          </div>
        `;
      });

      bundleEl.innerHTML = `
        <div style="font-weight: 600; font-size: 18px; margin-bottom: 16px;">${bundle.name}</div>
        <div style="margin-bottom: 16px;">${itemsHtml}</div>
        <div style="
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 16px;
          border-top: 1px solid var(--border);
        ">
          <div>
            <div style="text-decoration: line-through; color: var(--text-secondary); font-size: 14px;">${bundle.originalPrice}</div>
            <div style="font-size: 20px; font-weight: 600; color: #0071e3;">${bundle.bundlePrice}</div>
          </div>
          <div style="text-align: right;">
            <div style="background: #ff3b30; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px; margin-bottom: 4px;">省 ${bundle.savings}</div>
            <button style="
              padding: 8px 24px;
              background: #0071e3;
              color: white;
              border: none;
              border-radius: 8px;
              cursor: pointer;
              font-size: 14px;
            ">购买套装</button>
          </div>
        </div>
      `;

      container.appendChild(bundleEl);
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ProductBundles();
});
