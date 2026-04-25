// Related Products
class RelatedProducts {
  constructor() {
    this.init();
  }

  init() {
    this.displayRelatedProducts();
  }

  displayRelatedProducts() {
    const container = document.querySelector('[data-related-products]');
    if (!container) return;

    const currentCategory = container.dataset.relatedProducts;
    const products = this.getProductsByCategory(currentCategory);

    if (products.length === 0) return;

    container.innerHTML = '<h3 style="margin-bottom: 16px;">相关产品</h3>';
    
    const grid = document.createElement('div');
    grid.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px;';

    products.slice(0, 4).forEach(product => {
      const card = document.createElement('a');
      card.href = product.url;
      card.style.cssText = `
        display: block;
        padding: 16px;
        background: var(--bg-secondary);
        border-radius: 12px;
        text-decoration: none;
        color: inherit;
        transition: transform 0.2s, box-shadow 0.2s;
      `;
      card.innerHTML = `
        <div style="width: 100%; height: 120px; background: var(--bg-tertiary); border-radius: 8px; margin-bottom: 12px; display: flex; align-items: center; justify-content: center;">
          ${product.image ? `<img src="${product.image}" alt="" style="max-width: 100%; max-height: 100%; object-fit: cover;">` : '🔧'}
        </div>
        <div style="font-weight: 600; margin-bottom: 4px;">${product.name}</div>
        <div style="color: var(--text-secondary); font-size: 14px;">${product.price}</div>
      `;
      
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-4px)';
        card.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)';
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.boxShadow = '';
      });

      grid.appendChild(card);
    });

    container.appendChild(grid);
  }

  getProductsByCategory(category) {
    // This would typically fetch from an API
    // For now, return mock data
    return [
      { name: '相关产品 1', price: '¥100', url: '#', image: '' },
      { name: '相关产品 2', price: '¥200', url: '#', image: '' },
      { name: '相关产品 3', price: '¥300', url: '#', image: '' },
      { name: '相关产品 4', price: '¥400', url: '#', image: '' }
    ];
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new RelatedProducts();
});
