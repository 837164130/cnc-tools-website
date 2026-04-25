// Floating Share Button
class ShareFloat {
  constructor() {
    this.init();
  }

  init() {
    this.createButton();
  }

  createButton() {
    const btn = document.createElement('div');
    btn.className = 'share-float-btn';
    btn.style.cssText = `
      position: fixed;
      bottom: 310px;
      right: 24px;
      width: 48px;
      height: 48px;
      background: var(--bg-primary);
      border: 2px solid var(--border);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 4px 16px rgba(0,0,0,0.1);
      z-index: 999;
      transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s;
      font-size: 20px;
    `;
    btn.innerHTML = '🔗';

    btn.addEventListener('mouseenter', () => {
      btn.style.transform = 'scale(1.1)';
      btn.style.boxShadow = '0 6px 24px rgba(0,0,0,0.2)';
      btn.style.borderColor = 'var(--accent)';
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'scale(1)';
      btn.style.boxShadow = '0 4px 16px rgba(0,0,0,0.1)';
      btn.style.borderColor = 'var(--border)';
    });

    btn.addEventListener('click', () => {
      this.sharePage();
    });

    document.body.appendChild(btn);
  }

  sharePage() {
    if (navigator.share) {
      navigator.share({
        title: document.title,
        url: window.location.href
      }).catch(() => {
        this.fallbackShare();
      });
    } else {
      this.fallbackShare();
    }
  }

  fallbackShare() {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);

    const modal = document.createElement('div');
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
      <div style="background: var(--bg-primary); border-radius: 16px; padding: 32px; max-width: 400px; width: 100%;">
        <h3 style="margin-bottom: 20px;">分享页面</h3>
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 24px;">
          <a href="https://www.facebook.com/sharer/sharer.php?u=${url}" target="_blank" style="text-align: center; text-decoration: none; color: inherit;">
            <div style="width: 48px; height: 48px; background: #1877f2; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 8px; font-size: 24px;">📘</div>
            <div style="font-size: 12px;">Facebook</div>
          </a>
          <a href="https://twitter.com/intent/tweet?url=${url}&text=${title}" target="_blank" style="text-align: center; text-decoration: none; color: inherit;">
            <div style="width: 48px; height: 48px; background: #1da1f2; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 8px; font-size: 24px;">🐦</div>
            <div style="font-size: 12px;">Twitter</div>
          </a>
          <a href="https://wa.me/?text=${title}%20${url}" target="_blank" style="text-align: center; text-decoration: none; color: inherit;">
            <div style="width: 48px; height: 48px; background: #25d366; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 8px; font-size: 24px;">💬</div>
            <div style="font-size: 12px;">WhatsApp</div>
          </a>
          <a href="mailto:?subject=${title}&body=${url}" style="text-align: center; text-decoration: none; color: inherit;">
            <div style="width: 48px; height: 48px; background: #ea4335; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 8px; font-size: 24px;">📧</div>
            <div style="font-size: 12px;">邮件</div>
          </a>
        </div>
        <div style="display: flex; gap: 8px;">
          <input type="text" value="${window.location.href}" readonly style="flex: 1; padding: 12px; border: 2px solid var(--border); border-radius: 8px; background: var(--bg-secondary); font-size: 14px;">
          <button class="copy-link-btn" style="padding: 12px 20px; background: var(--accent); color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600;">复制</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.remove();
      }
    });

    const copyBtn = modal.querySelector('.copy-link-btn');
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(window.location.href).then(() => {
        copyBtn.textContent = '已复制';
        setTimeout(() => {
          copyBtn.textContent = '复制';
        }, 2000);
      });
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ShareFloat();
});
