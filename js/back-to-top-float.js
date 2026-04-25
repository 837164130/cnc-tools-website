// Floating Back to Top Button
class BackToTopFloat {
  constructor() {
    this.init();
  }

  init() {
    this.createButton();
    this.attachEventListeners();
  }

  createButton() {
    const btn = document.createElement('div');
    btn.className = 'back-to-top-float';
    btn.style.cssText = `
      position: fixed;
      bottom: 240px;
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
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.3s, transform 0.3s, border-color 0.3s;
      font-size: 20px;
    `;
    btn.innerHTML = '↑';

    btn.addEventListener('mouseenter', () => {
      btn.style.borderColor = 'var(--accent)';
      btn.style.transform = 'translateY(0) scale(1.1)';
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.borderColor = 'var(--border)';
      btn.style.transform = 'translateY(0) scale(1)';
    });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    document.body.appendChild(btn);
    this.button = btn;
  }

  attachEventListeners() {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 500) {
        this.button.style.opacity = '1';
        this.button.style.transform = 'translateY(0)';
      } else {
        this.button.style.opacity = '0';
        this.button.style.transform = 'translateY(20px)';
      }
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new BackToTopFloat();
});
