// Product Filter Functionality
class ProductFilter {
  constructor() {
    this.products = [];
    this.filters = {
      category: 'all',
      material: 'all',
      coating: 'all',
      diameter: 'all',
      priceRange: 'all'
    };
    this.init();
  }

  init() {
    this.attachEventListeners();
    this.loadProducts();
  }

  attachEventListeners() {
    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const filterType = e.target.dataset.filterType;
        const filterValue = e.target.dataset.filterValue;
        
        // Update active state
        document.querySelectorAll(`.filter-btn[data-filter-type="${filterType}"]`).forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        
        this.filters[filterType] = filterValue;
        this.applyFilters();
      });
    });

    // Sort select
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
      sortSelect.addEventListener('change', () => this.applyFilters());
    }
  }

  loadProducts() {
    // Get products from the page
    const productCards = document.querySelectorAll('.product-card');
    this.products = Array.from(productCards).map(card => ({
      element: card,
      name: card.querySelector('.product-name')?.textContent || '',
      category: card.dataset.category || '',
      material: card.dataset.material || '',
      coating: card.dataset.coating || '',
      diameter: card.dataset.diameter || '',
      price: parseFloat(card.dataset.price) || 0
    }));
  }

  applyFilters() {
    let filtered = [...this.products];

    // Apply category filter
    if (this.filters.category !== 'all') {
      filtered = filtered.filter(p => p.category === this.filters.category);
    }

    // Apply material filter
    if (this.filters.material !== 'all') {
      filtered = filtered.filter(p => p.material === this.filters.material);
    }

    // Apply coating filter
    if (this.filters.coating !== 'all') {
      filtered = filtered.filter(p => p.coating === this.filters.coating);
    }

    // Apply diameter filter
    if (this.filters.diameter !== 'all') {
      filtered = filtered.filter(p => p.diameter === this.filters.diameter);
    }

    // Apply price range filter
    if (this.filters.priceRange !== 'all') {
      const [min, max] = this.filters.priceRange.split('-').map(v => v === 'plus' ? Infinity : parseFloat(v));
      filtered = filtered.filter(p => p.price >= min && (max === Infinity || p.price <= max));
    }

    // Sort
    const sortValue = document.getElementById('sortSelect')?.value || 'default';
    switch (sortValue) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    // Update display
    this.products.forEach(p => p.element.style.display = 'none');
    filtered.forEach(p => p.element.style.display = '');

    // Update count
    const countEl = document.getElementById('productCount');
    if (countEl) {
      countEl.textContent = `显示 ${filtered.length} 款产品`;
    }
  }
}

// Initialize filter when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.product-grid')) {
    new ProductFilter();
  }
});
