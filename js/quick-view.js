// Quick View Modal for Products
class QuickView {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('[data-quick-view]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const productId = btn.dataset.quickView;
        this.showQuickView(productId);
      });
    });
  }

  showQuickView(productId) {
    const modal = document.createElement('div');
    modal.className = 'quick-view-modal';
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      padding: 20px;
      opacity: 0;
      transition: opacity 0.3s;
    `;

    modal.innerHTML = `
      <div style="background: var(--bg-primary); border-radius: 16px; max-width: 800px; width: 100%; max-height: 90vh; overflow-y: auto; position: relative; transform: scale(0.9); transition: transform 0.3s;">
        <button class="close-modal" style="position: absolute; top: 16px; right: 16px; background: none; border: none; font-size: 24px; cursor: pointer; z-index: 10;">✕</button>
        <div class="quick-view-content" style="padding: 32px;">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 32px;">
            <div style="background: var(--bg-secondary); border-radius: 12px; aspect-ratio: 1; display: flex; align-items: center; justify-content: center;">
              <span style="font-size: 64px;">🔧</span>
            </div>
            <div>
              <h2 style="margin-bottom: 16px;">产品名称</h2>
              <p style="color: var(--text-secondary); margin-bottom: 16px;">产品描述...</p>
              <div style="font-size: 24px; font-weight: 700; color: var(--accent); margin-bottom: 24px;">¥0.00</div>
              <div style="display: flex; gap: 12px;">
                <a href="products/detail/${productId}.html" class="btn btn-primary">查看详情</a>
                <button class="btn btn-secondary" onclick="window.favorites?.toggle('${productId}')">收藏</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    requestAnimationFrame(() => {
      modal.style.opacity = '1';
      modal.querySelector('div > div').style.transform = 'scale(1)';
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.classList.contains('close-modal')) {
        this.closeModal(modal);
      }
    });
  }

  closeModal(modal) {
    modal.style.opacity = '0';
    modal.querySelector('div > div').style.transform = 'scale(0.9)';
    setTimeout(() => {
      modal.remove();
      document.body.style.overflow = '';
    }, 300);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new QuickView();
});
