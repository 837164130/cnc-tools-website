// Share Product
class ShareProduct {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('[data-share-product]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.shareProduct(btn.dataset.shareProduct);
      });
    });
  }

  async shareProduct(productId) {
    const product = this.getProductInfo(productId);
    const shareData = {
      title: product.name,
      text: product.description,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        this.showShareModal(product);
      }
    } else {
      this.showShareModal(product);
    }
  }

  showShareModal(product) {
    const modal = document.createElement('div');
    modal.className = 'share-modal';
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

    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(product.name);

    modal.innerHTML = `
      <div style="background: var(--bg-primary); border-radius: 16px; max-width: 400px; width: 100%; padding: 32px; position: relative;">
        <button class="close-share-modal" style="position: absolute; top: 16px; right: 16px; background: none; border: none; font-size: 24px; cursor: pointer;">✕</button>
        <h3 style="margin-bottom: 24px;">分享产品</h3>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
          <a href="https://wa.me/?text=${text}%20${url}" target="_blank" style="text-align: center; text-decoration: none; color: inherit;">
            <div style="width: 48px; height: 48px; background: #25d366; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 8px; color: white; font-size: 24px;">📱</div>
            <div style="font-size: 12px;">WhatsApp</div>
          </a>
          <a href="https://t.me/share/url?url=${url}&text=${text}" target="_blank" style="text-align: center; text-decoration: none; color: inherit;">
            <div style="width: 48px; height: 48px; background: #0088cc; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 8px; color: white; font-size: 24px;">✈️</div>
            <div style="font-size: 12px;">Telegram</div>
          </a>
          <a href="mailto:?subject=${text}&body=${url}" style="text-align: center; text-decoration: none; color: inherit;">
            <div style="width: 48px; height: 48px; background: #ea4335; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 8px; color: white; font-size: 24px;">✉️</div>
            <div style="font-size: 12px;">邮件</div>
          </a>
        </div>
        <div style="margin-top: 24px; padding: 12px; background: var(--bg-secondary); border-radius: 8px; display: flex; gap: 8px;">
          <input type="text" value="${window.location.href}" readonly style="flex: 1; border: none; background: transparent; font-size: 14px;">
          <button class="copy-link" style="background: #0071e3; color: white; border: none; padding: 8px 16px; border-radius: 8px; cursor: pointer; font-size: 14px;">复制</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    modal.querySelector('.close-share-modal').addEventListener('click', () => {
      modal.remove();
      document.body.style.overflow = '';
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.remove();
        document.body.style.overflow = '';
      }
    });

    modal.querySelector('.copy-link').addEventListener('click', () => {
      navigator.clipboard.writeText(window.location.href);
      if (window.notifications) {
        window.notifications.show('链接已复制', 'success');
      }
    });
  }

  getProductInfo(productId) {
    // In production, this would fetch from an API
    return {
      name: document.querySelector('h1')?.textContent || 'Product',
      description: document.querySelector('meta[name="description"]')?.content || ''
    };
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ShareProduct();
});
