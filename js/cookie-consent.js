// Cookie Consent Banner
class CookieConsent {
  constructor() {
    this.consentKey = 'cccnc-cookie-consent';
    this.init();
  }

  init() {
    if (this.hasConsent()) return;
    this.showBanner();
  }

  hasConsent() {
    return localStorage.getItem(this.consentKey) !== null;
  }

  showBanner() {
    const banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.style.cssText = `
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(0,0,0,0.9);
      color: white;
      padding: 20px;
      z-index: 10000;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 20px;
      flex-wrap: wrap;
    `;

    banner.innerHTML = `
      <span style="font-size: 14px;">我们使用 Cookie 来改善您的浏览体验</span>
      <div style="display: flex; gap: 12px;">
        <button class="cookie-accept" style="padding: 8px 20px; background: #0071e3; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600;">接受</button>
        <button class="cookie-decline" style="padding: 8px 20px; background: transparent; color: white; border: 1px solid rgba(255,255,255,0.3); border-radius: 8px; cursor: pointer;">拒绝</button>
      </div>
    `;

    document.body.appendChild(banner);

    banner.querySelector('.cookie-accept').addEventListener('click', () => {
      this.setConsent(true);
      banner.remove();
    });

    banner.querySelector('.cookie-decline').addEventListener('click', () => {
      this.setConsent(false);
      banner.remove();
    });
  }

  setConsent(accepted) {
    localStorage.setItem(this.consentKey, JSON.stringify({
      accepted,
      date: new Date().toISOString()
    }));
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new CookieConsent();
});
