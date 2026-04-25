// Product Page Enhancements
class ProductEnhancements {
  constructor() {
    this.init();
  }

  init() {
    this.addQuickView();
    this.addWishlistButtons();
    this.addCompareButtons();
    this.addQuantitySelector();
  }

  // Quick view modal
  addQuickView() {
    document.querySelectorAll('.product-card').forEach(card => {
      const quickViewBtn = document.createElement('button');
      quickViewBtn.className = 'quick-view-btn';
      quickViewBtn.innerHTML = '👁️ 快速查看';
      quickViewBtn.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0,113,227,0.9);
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 20px;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s;
        font-size: 14px;
        z-index: 10;
      `;
      
      card.style.position = 'relative';
      card.appendChild(quickViewBtn);
      
      card.addEventListener('mouseenter', () => {
        quickViewBtn.style.opacity = '1';
      });
      card.addEventListener('mouseleave', () => {
        quickViewBtn.style.opacity = '0';
      });
      
      quickViewBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.showQuickView(card);
      });
    });
  }

  showQuickView(card) {
    const name = card.querySelector('.product-name')?.textContent || '';
    const desc = card.querySelector('.product-desc')?.textContent || '';
    const specs = card.querySelector('.product-specs')?.innerHTML || '';
    
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
    `;
    
    modal.innerHTML = `
      <div style="background: white; border-radius: 24px; padding: 40px; max-width: 600px; width: 100%; max-height: 80vh; overflow-y: auto; position: relative;">
        <button onclick="this.closest('.quick-view-modal').remove()" style="position: absolute; top: 20px; right: 20px; background: none; border: none; font-size: 24px; cursor: pointer;">✕</button>
        <h2 style="font-size: 24px; font-weight: 700; margin-bottom: 16px;">${name}</h2>
        <p style="color: #86868b; margin-bottom: 24px;">${desc}</p>
        <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 24px;">${specs}</div>
        <div style="display: flex; gap: 12px;">
          <a href="${card.querySelector('a')?.href || '#'}" style="flex: 1; padding: 12px; background: var(--primary); color: white; text-align: center; border-radius: 12px; text-decoration: none; font-weight: 600;">查看详情</a>
          <a href="/contact.html" style="flex: 1; padding: 12px; background: var(--bg-secondary); color: var(--text); text-align: center; border-radius: 12px; text-decoration: none; font-weight: 600;">获取报价</a>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.remove();
    });
  }

  // Wishlist buttons
  addWishlistButtons() {
    document.querySelectorAll('.product-card').forEach(card => {
      const wishlistBtn = document.createElement('button');
      wishlistBtn.className = 'wishlist-btn';
      wishlistBtn.innerHTML = '🤍';
      wishlistBtn.style.cssText = `
        position: absolute;
        top: 12px;
        right: 12px;
        background: white;
        border: none;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        cursor: pointer;
        font-size: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        z-index: 10;
      `;
      
      card.style.position = 'relative';
      card.appendChild(wishlistBtn);
      
      wishlistBtn.addEventListener('click', (e) => {
        e.preventDefault();
        wishlistBtn.innerHTML = wishlistBtn.innerHTML === '🤍' ? '❤️' : '🤍';
      });
    });
  }

  // Compare buttons
  addCompareButtons() {
    document.querySelectorAll('.product-card').forEach(card => {
      const compareBtn = document.createElement('button');
      compareBtn.className = 'compare-btn';
      compareBtn.innerHTML = '⚖️';
      compareBtn.style.cssText = `
        position: absolute;
        top: 12px;
        right: 56px;
        background: white;
        border: none;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        cursor: pointer;
        font-size: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        z-index: 10;
      `;
      
      card.appendChild(compareBtn);
      
      compareBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = '/compare.html';
      });
    });
  }

  // Quantity selector for product detail pages
  addQuantitySelector() {
    const quantityContainer = document.querySelector('.quantity-selector');
    if (!quantityContainer) return;

    const decreaseBtn = quantityContainer.querySelector('.decrease');
    const increaseBtn = quantityContainer.querySelector('.increase');
    const input = quantityContainer.querySelector('input');

    if (decreaseBtn) {
      decreaseBtn.addEventListener('click', () => {
        const current = parseInt(input.value) || 1;
        if (current > 1) input.value = current - 1;
      });
    }

    if (increaseBtn) {
      increaseBtn.addEventListener('click', () => {
        const current = parseInt(input.value) || 1;
        input.value = current + 1;
      });
    }
  }
}

// Initialize enhancements when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ProductEnhancements();
});
