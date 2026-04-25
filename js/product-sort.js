// Product Sort
class ProductSort {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('[data-product-sort]').forEach(container => {
      this.setupSort(container);
    });
  }

  setupSort(container) {
    const options = [
      { value: 'default', label: '默认排序' },
      { value: 'price-asc', label: '价格从低到高' },
      { value: 'price-desc', label: '价格从高到低' },
      { value: 'name-asc', label: '名称 A-Z' },
      { value: 'name-desc', label: '名称 Z-A' },
      { value: 'newest', label: '最新上架' },
      { value: 'popular', label: '最受欢迎' }
    ];

    container.innerHTML = `
      <div style="display: flex; align-items: center; gap: 12px;">
        <span style="font-size: 14px; color: var(--text-secondary); white-space: nowrap;">排序方式:</span>
        <select class="sort-select" style="
          padding: 10px 16px;
          border: 2px solid var(--border);
          border-radius: 8px;
          background: var(--bg-primary);
          font-size: 14px;
          cursor: pointer;
          outline: none;
          transition: border-color 0.2s;
        ">
          ${options.map(opt => `
            <option value="${opt.value}">${opt.label}</option>
          `).join('')}
        </select>
      </div>
    `;

    const select = container.querySelector('.sort-select');

    select.addEventListener('focus', () => {
      select.style.borderColor = 'var(--accent)';
    });

    select.addEventListener('blur', () => {
      select.style.borderColor = 'var(--border)';
    });

    select.addEventListener('change', () => {
      const sortValue = select.value;
      this.sortProducts(sortValue);
    });
  }

  sortProducts(sortValue) {
    const productsContainer = document.querySelector('[data-products]');
    if (!productsContainer) return;

    const products = Array.from(productsContainer.children);

    products.sort((a, b) => {
      switch (sortValue) {
        case 'price-asc':
          return this.getPrice(a) - this.getPrice(b);
        case 'price-desc':
          return this.getPrice(b) - this.getPrice(a);
        case 'name-asc':
          return this.getName(a).localeCompare(this.getName(b));
        case 'name-desc':
          return this.getName(b).localeCompare(this.getName(a));
        case 'newest':
          return this.getDate(b) - this.getDate(a);
        case 'popular':
          return this.getPopularity(b) - this.getPopularity(a);
        default:
          return 0;
      }
    });

    products.forEach(product => {
      productsContainer.appendChild(product);
    });

    // Animate reordering
    products.forEach((product, index) => {
      product.style.animation = 'none';
      setTimeout(() => {
        product.style.animation = 'fadeInUp 0.3s';
      }, index * 50);
    });
  }

  getPrice(element) {
    const priceEl = element.querySelector('[data-price]');
    return priceEl ? parseFloat(priceEl.dataset.price) || 0 : 0;
  }

  getName(element) {
    const nameEl = element.querySelector('[data-name]');
    return nameEl ? nameEl.dataset.name || '' : '';
  }

  getDate(element) {
    const dateEl = element.querySelector('[data-date]');
    return dateEl ? new Date(dateEl.dataset.date).getTime() || 0 : 0;
  }

  getPopularity(element) {
    const popEl = element.querySelector('[data-popularity]');
    return popEl ? parseInt(popEl.dataset.popularity) || 0 : 0;
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ProductSort();
});
