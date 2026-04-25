// Quick View Modal
class QuickView {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('[data-quick-view]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.openQuickView(btn.dataset.quickView);
      });
    });
  }

  openQuickView(productId) {
    const modal = document.createElement('div');
    modal.className = 'quick-view-modal';
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      padding: 40px;
    `;

    modal.innerHTML = `
      <div style="background: var(--bg-primary); border-radius: 16px; max-width: 800px; width: 100%; max-height: 90vh; overflow-y: auto; position: relative;">
        <button class="close-quick-view" style="position: absolute; top: 16px; right: 16px; background: none; border: none; font-size: 24px; cursor: pointer; z-index: 10;">✕</button>
        <div class="quick-view-content" style="padding: 32px;">
          <div class="loading-spinner" style="text-align: center; padding: 40px;">加载中...</div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    // Close handlers
    modal.querySelector('.close-quick-view').addEventListener('click', () => this.closeModal(modal));
    modal.addEventListener('click', (e) => {
      if (e.target === modal) this.closeModal(modal);
    });

    // Load product data
    this.loadProductData(productId, modal);
  }

  async loadProductData(productId, modal) {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    const content = modal.querySelector('.quick-view-content');
    content.innerHTML = `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 32px;">
        <div class="product-image" style="background: var(--bg-secondary); border-radius: 12px; min-height: 300px; display: flex; align-items: center; justify-content: center;">
          <span style="font-size: 64px;">🔧</span>
        </div>
        <div class="product-info">
          <h2 style="margin-bottom: 16px;">产品 ${productId}</h2>
          <p style="color: var(--text-secondary); margin-bottom: 16px;">产品描述信息...</p>
          <div class="price" style="font-size: 24px; font-weight: 600; margin-bottom: 24px;">¥0.00</div>
          <button class="btn-primary" style="width: 100%;">查看详情</button>
        </div>
      </div>
    `;
  }

  closeModal(modal) {
    modal.remove();
    document.body.style.overflow = '';
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new QuickView();
});
