// Share Functionality
class ShareFeature {
  constructor() {
    this.init();
  }

  init() {
    this.createShareButtons();
  }

  createShareButtons() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
      const shareBtn = document.createElement('button');
      shareBtn.className = 'share-btn';
      shareBtn.innerHTML = '🔗';
      shareBtn.style.cssText = `
        position: absolute;
        top: 12px;
        right: 100px;
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

      card.style.position = 'relative';
      card.appendChild(shareBtn);

      shareBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.showShareModal(card);
      });
    });
  }

  showShareModal(card) {
    const name = card.querySelector('.product-name')?.textContent || '';
    const url = window.location.href;

    const modal = document.createElement('div');
    modal.className = 'share-modal';
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
      <div style="background: white; border-radius: 24px; padding: 40px; max-width: 400px; width: 100%; text-align: center; position: relative;">
        <button onclick="this.closest('.share-modal').remove()" style="position: absolute; top: 20px; right: 20px; background: none; border: none; font-size: 24px; cursor: pointer;">✕</button>
        <h3 style="font-size: 20px; font-weight: 700; margin-bottom: 16px;">分享产品</h3>
        <p style="color: #86868b; margin-bottom: 24px;">${name}</p>
        <div style="display: flex; gap: 12px; justify-content: center; margin-bottom: 24px;">
          <button onclick="window.open('https://wa.me/?text=${encodeURIComponent(name + ' ' + url)}', '_blank')" style="width: 48px; height: 48px; border-radius: 50%; background: #25D366; color: white; border: none; font-size: 24px; cursor: pointer;">📱</button>
          <button onclick="window.open('https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(name)}', '_blank')" style="width: 48px; height: 48px; border-radius: 50%; background: #0088cc; color: white; border: none; font-size: 24px; cursor: pointer;">✈️</button>
          <button onclick="window.open('mailto:?subject=${encodeURIComponent(name)}&body=${encodeURIComponent(url)}', '_blank')" style="width: 48px; height: 48px; border-radius: 50%; background: #EA4335; color: white; border: none; font-size: 24px; cursor: pointer;">📧</button>
        </div>
        <div style="background: #f5f5f7; padding: 12px; border-radius: 12px; display: flex; align-items: center; gap: 8px;">
          <input type="text" value="${url}" readonly style="flex: 1; border: none; background: none; font-size: 14px; outline: none;">
          <button onclick="navigator.clipboard.writeText('${url}'); this.textContent='已复制!'; setTimeout(() => this.textContent='复制', 2000);" style="padding: 8px 16px; background: var(--primary, #0071e3); color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 14px;">复制</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.remove();
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ShareFeature();
});
