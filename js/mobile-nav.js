// Mobile Navigation
class MobileNav {
  constructor() {
    this.init();
  }

  init() {
    this.createMobileMenu();
    this.attachEventListeners();
  }

  createMobileMenu() {
    // Check if mobile menu already exists
    if (document.querySelector('.mobile-menu-btn')) return;

    const nav = document.querySelector('.nav');
    if (!nav) return;

    // Create mobile menu button
    const menuBtn = document.createElement('button');
    menuBtn.className = 'mobile-menu-btn';
    menuBtn.innerHTML = '☰';
    menuBtn.style.cssText = `
      display: none;
      background: none;
      border: none;
      font-size: 24px;
      cursor: pointer;
      padding: 8px;
    `;

    // Create mobile menu overlay
    const overlay = document.createElement('div');
    overlay.className = 'mobile-menu-overlay';
    overlay.style.cssText = `
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.5);
      z-index: 9998;
    `;

    // Create mobile menu panel
    const panel = document.createElement('div');
    panel.className = 'mobile-menu-panel';
    panel.style.cssText = `
      display: none;
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      width: 280px;
      background: white;
      z-index: 9999;
      padding: 80px 24px 24px;
      box-shadow: -4px 0 24px rgba(0,0,0,0.1);
      transform: translateX(100%);
      transition: transform 0.3s ease;
    `;

    // Clone nav links to mobile menu
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
      const mobileLinks = navLinks.cloneNode(true);
      mobileLinks.style.cssText = `
        display: flex;
        flex-direction: column;
        gap: 16px;
      `;
      mobileLinks.querySelectorAll('a').forEach(link => {
        link.style.cssText = `
          font-size: 16px;
          padding: 12px 0;
          border-bottom: 1px solid #eee;
          display: block;
        `;
      });
      panel.appendChild(mobileLinks);
    }

    // Close button
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '✕';
    closeBtn.style.cssText = `
      position: absolute;
      top: 20px;
      right: 20px;
      background: none;
      border: none;
      font-size: 24px;
      cursor: pointer;
    `;
    closeBtn.addEventListener('click', () => this.closeMenu());
    panel.appendChild(closeBtn);

    // Add to DOM
    nav.appendChild(menuBtn);
    document.body.appendChild(overlay);
    document.body.appendChild(panel);

    // Store references
    this.menuBtn = menuBtn;
    this.overlay = overlay;
    this.panel = panel;

    // Add media query for mobile
    const style = document.createElement('style');
    style.textContent = `
      @media (max-width: 768px) {
        .mobile-menu-btn { display: block !important; }
        .nav-links { display: none !important; }
      }
    `;
    document.head.appendChild(style);
  }

  attachEventListeners() {
    if (this.menuBtn) {
      this.menuBtn.addEventListener('click', () => this.openMenu());
    }
    if (this.overlay) {
      this.overlay.addEventListener('click', () => this.closeMenu());
    }
  }

  openMenu() {
    this.overlay.style.display = 'block';
    this.panel.style.display = 'block';
    setTimeout(() => {
      this.panel.style.transform = 'translateX(0)';
    }, 10);
    document.body.style.overflow = 'hidden';
  }

  closeMenu() {
    this.panel.style.transform = 'translateX(100%)';
    setTimeout(() => {
      this.overlay.style.display = 'none';
      this.panel.style.display = 'none';
    }, 300);
    document.body.style.overflow = '';
  }
}

// Initialize mobile nav when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new MobileNav();
});
