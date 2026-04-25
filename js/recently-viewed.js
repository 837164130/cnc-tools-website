// Recently Viewed Products
class RecentlyViewed {
  constructor() {
    this.storageKey = 'recentlyViewed';
    this.maxItems = 10;
    this.init();
  }

  init() {
    this.trackCurrentPage();
    this.displayRecentlyViewed();
  }

  trackCurrentPage() {
    const productId = document.body.dataset.productId;
    if (!productId) return;

    const product = {
      id: productId,
      name: document.querySelector('h1')?.textContent || '',
      url: window.location.href,
      image: document.querySelector('[data-product-image]')?.src || '',
      timestamp: Date.now()
    };

    let items = this.getItems();
    items = items.filter(item => item.id !== productId);
    items.unshift(product);
    items = items.slice(0, this.maxItems);

    localStorage.setItem(this.storageKey, JSON.stringify(items));
  }

  getItems() {
    try {
      return JSON.parse(localStorage.getItem(this.storageKey)) || [];
    } catch {
      return [];
    }
  }

  displayRecentlyViewed() {
    const container = document.querySelector('[data-recently-viewed]');
    if (!container) return;

    const items = this.getItems();
    if (items.length === 0) {
      container.style.display = 'none';
      return;
    }

    container.innerHTML = `
      <h3 style="margin-bottom: 16px;">最近浏览</h3>
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px;">
        ${items.map(item => `
          <a href="${item.url}" style="text-decoration: none; color: inherit;">
            <div style="background: var(--bg-secondary); border-radius: 12px; overflow: hidden; transition: transform 0.3s;" onmouseover="this.style.transform='translateY(-4px)'" onmouseout="this.style.transform='translateY(0)'">
              <div style="aspect-ratio: 1; background: var(--bg-tertiary); display: flex; align-items: center; justify-content: center;">
                ${item.image ? `<img src="${item.image}" alt="" style="width: 100%; height: 100%; object-fit: cover;">` : '<span style="font-size: 48px;">🔧</span>'}
              </div>
              <div style="padding: 12px;">
                <div style="font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${item.name}</div>
              </div>
            </div>
          </a>
        `).join('')}
      </div>
    `;
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new RecentlyViewed();
});
