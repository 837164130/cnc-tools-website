// Product Tags
class ProductTags {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('[data-product-tags]').forEach(container => {
      this.setupTags(container);
    });
  }

  setupTags(container) {
    const tags = JSON.parse(container.dataset.productTags || '[]');
    if (tags.length === 0) return;

    container.innerHTML = `
      <div style="display: flex; flex-wrap: wrap; gap: 8px;">
        ${tags.map(tag => `
          <span class="product-tag" style="
            padding: 6px 14px;
            background: ${tag.color || 'var(--bg-secondary)'};
            color: ${tag.textColor || 'var(--text-primary)'};
            border-radius: 20px;
            font-size: 13px;
            font-weight: 600;
            cursor: pointer;
            transition: transform 0.2s, box-shadow 0.2s;
            display: inline-flex;
            align-items: center;
            gap: 6px;
          " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.1)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'">
            ${tag.icon || ''}
            ${tag.name}
          </span>
        `).join('')}
      </div>
    `;

    container.querySelectorAll('.product-tag').forEach(tag => {
      tag.addEventListener('click', () => {
        const tagName = tag.textContent.trim();
        window.location.href = `search.html?q=${encodeURIComponent(tagName)}`;
      });
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ProductTags();
});
