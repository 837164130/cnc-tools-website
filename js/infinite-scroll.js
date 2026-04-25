// Infinite Scroll
class InfiniteScroll {
  constructor() {
    this.init();
  }

  init() {
    this.container = document.querySelector('[data-infinite-scroll]');
    if (!this.container) return;

    this.page = 1;
    this.loading = false;
    this.hasMore = true;

    this.attachEventListeners();
  }

  attachEventListeners() {
    window.addEventListener('scroll', () => {
      if (this.loading || !this.hasMore) return;

      const scrollBottom = window.innerHeight + window.pageYOffset;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollBottom >= documentHeight - 1000) {
        this.loadMore();
      }
    });
  }

  async loadMore() {
    this.loading = true;
    this.showLoader();

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Add more content
      const newItems = this.generateItems();
      if (newItems.length === 0) {
        this.hasMore = false;
      } else {
        newItems.forEach(item => this.container.appendChild(item));
        this.page++;
      }
    } catch (error) {
      console.error('Error loading more items:', error);
    } finally {
      this.loading = false;
      this.hideLoader();
    }
  }

  generateItems() {
    // Override this method to generate actual items
    return [];
  }

  showLoader() {
    let loader = document.querySelector('.infinite-scroll-loader');
    if (!loader) {
      loader = document.createElement('div');
      loader.className = 'infinite-scroll-loader';
      loader.style.cssText = `
        text-align: center;
        padding: 20px;
        color: var(--text-secondary);
      `;
      loader.textContent = '加载中...';
      this.container.parentNode.appendChild(loader);
    }
    loader.style.display = 'block';
  }

  hideLoader() {
    const loader = document.querySelector('.infinite-scroll-loader');
    if (loader) {
      loader.style.display = 'none';
    }
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new InfiniteScroll();
});
