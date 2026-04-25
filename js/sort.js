// Sort Products
class ProductSort {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('[data-sort]').forEach(select => {
      this.setupSort(select);
    });
  }

  setupSort(select) {
    select.addEventListener('change', () => {
      const container = document.querySelector(select.dataset.sort);
      if (!container) return;

      const items = Array.from(container.children);
      const sortBy = select.value;

      items.sort((a, b) => {
        switch(sortBy) {
          case 'price-asc':
            return this.getPrice(a) - this.getPrice(b);
          case 'price-desc':
            return this.getPrice(b) - this.getPrice(a);
          case 'name-asc':
            return this.getName(a).localeCompare(this.getName(b));
          case 'name-desc':
            return this.getName(b).localeCompare(this.getName(a));
          default:
            return 0;
        }
      });

      items.forEach(item => container.appendChild(item));
    });
  }

  getPrice(element) {
    const priceEl = element.querySelector('.price');
    return priceEl ? parseFloat(priceEl.dataset.price) || 0 : 0;
  }

  getName(element) {
    const nameEl = element.querySelector('.product-name, h3, h4');
    return nameEl ? nameEl.textContent : '';
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ProductSort();
});
