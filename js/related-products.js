// Related Products
class RelatedProducts {
  constructor() {
    this.init();
  }

  init() {
    const container = document.querySelector('[data-related-products]');
    if (!container) return;

    const category = container.dataset.relatedProducts;
    this.loadRelatedProducts(container, category);
  }

  loadRelatedProducts(container, category) {
    // In a real app, this would fetch from an API
    const relatedProducts = this.getMockRelatedProducts(category);

    container.innerHTML = `
      <h3 style="margin-bottom: 24px;">相关产品</h3>
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 24px;">
        ${relatedProducts.map(product => `
          <a href="${product.url}" style="text-decoration: none; color: inherit;">
            <div style="background: var(--bg-secondary); border-radius: 16px; overflow: hidden; transition: transform 0.3s, box-shadow 0.3s;" onmouseover="this.style.transform='translateY(-8px)'; this.style.boxShadow='0 12px 24px rgba(0,0,0,0.15)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'">
              <div style="aspect-ratio: 4/3; background: var(--bg-tertiary); display: flex; align-items: center; justify-content: center;">
                <span style="font-size: 48px;">${product.icon}</span>
              </div>
              <div style="padding: 20px;">
                <div style="font-weight: 600; margin-bottom: 8px;">${product.name}</div>
                <div style="color: var(--text-secondary); font-size: 14px; margin-bottom: 12px;">${product.description}</div>
                <div style="font-weight: 700; color: var(--accent);">${product.price}</div>
              </div>
            </div>
          </a>
        `).join('')}
      </div>
    `;
  }

  getMockRelatedProducts(category) {
    const products = {
      'endmills': [
        { name: '球头铣刀', description: '适用于3D曲面加工', price: '¥180起', icon: '🔧', url: 'products/detail/ball-endmills.html' },
        { name: '圆角铣刀', description: 'R角设计，延长刀具寿命', price: '¥200起', icon: '⚙️', url: 'products/detail/corner-radius.html' },
        { name: '粗皮铣刀', description: '高效粗加工专用', price: '¥220起', icon: '🔩', url: 'products/detail/roughing.html' }
      ],
      'drills': [
        { name: '中心钻', description: '精确定位，高效钻孔', price: '¥80起', icon: '📍', url: 'products/detail/center-drills.html' },
        { name: '内冷钻', description: '内冷设计，深孔加工', price: '¥350起', icon: '💧', url: 'products/detail/internal-coolant.html' }
      ],
      'taps': [
        { name: '挤压丝锥', description: '无屑加工，高精度', price: '¥120起', icon: '🔩', url: 'products/detail/forming-taps.html' }
      ]
    };

    return products[category] || products['endmills'];
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new RelatedProducts();
});
