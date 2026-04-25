// Recently Viewed Products
class RecentlyViewed {
  constructor() {
    this.maxItems = 10;
    this.items = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
    this.init();
  }

  init() {
    this.trackCurrentPage();
    this.displayRecentlyViewed();
  }

  trackCurrentPage() {
    const productId = document.querySelector('[data-product-id]')?.dataset.productId;
    if (!productId) return;

    const product = {
      id: productId,
      name: document.querySelector('h1')?.textContent || 'Product',
      url: window.location.href,
      image: document.querySelector('[data-product-image]')?.dataset.productImage || '',
      timestamp: Date.now()
    };

    // Remove if already exists
    this.items = this.items.filter(item => item.id !== productId);
    
    // Add to beginning
    this.items.unshift(product);
    
    // Limit to max items
    if (this.items.length > this.maxItems) {
      this.items = this.items.slice(0, this.maxItems);
    }

    this.save();
  }

  displayRecentlyViewed() {
    const container = document.querySelector('[data-recently-viewed]');
    if (!container || this.items.length === 0) return;

    container.innerHTML = '<h3 style="margin-bottom: 16px;">最近浏览</h3>';
    
    const grid = document.createElement('div');
    grid.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 16px;';

    this.items.slice(0, 4).forEach(item => {
      const card = document.createElement('a');
      card.href = item.url;
      card.style.cssText = `
        display: block;
        padding: 12px;
        background: var(--bg-secondary);
        border-radius: 8px;
        text-decoration: none;
        color: inherit;
        transition: transform 0.2s;
      `;
      card.innerHTML = `
        <div style="width: 100%; height: 100px; background: var(--bg-tertiary); border-radius: 4px; margin-bottom: 8px; display: flex; align-items: center; justify-content: center;">
          ${item.image ? `<img src="${item.image}" alt="" style="max-width: 100%; max-height: 100%; object-fit: cover;">` : '🔧'}
        </div>
        <div style="font-size: 14px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${item.name}</div>
      `;
      grid.appendChild(card);
    });

    container.appendChild(grid);
  }

  save() {
    localStorage.setItem('recentlyViewed', JSON.stringify(this.items));
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new RecentlyViewed();
});
