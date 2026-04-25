// Back to Top Button
class BackToTop {
  constructor() {
    this.init();
  }

  init() {
    this.createButton();
    this.attachEventListeners();
  }

  createButton() {
    const button = document.createElement('button');
    button.id = 'backToTop';
    button.innerHTML = '↑';
    button.style.cssText = `
      position: fixed;
      bottom: 30px;
      right: 30px;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: var(--primary, #0071e3);
      color: white;
      border: none;
      font-size: 20px;
      cursor: pointer;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
      box-shadow: 0 4px 12px rgba(0,113,227,0.3);
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
    `;

    document.body.appendChild(button);
    this.button = button;
  }

  attachEventListeners() {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        this.button.style.opacity = '1';
        this.button.style.visibility = 'visible';
      } else {
        this.button.style.opacity = '0';
        this.button.style.visibility = 'hidden';
      }
    });

    this.button.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    // Hover effect
    this.button.addEventListener('mouseenter', () => {
      this.button.style.transform = 'translateY(-4px)';
      this.button.style.boxShadow = '0 8px 24px rgba(0,113,227,0.4)';
    });

    this.button.addEventListener('mouseleave', () => {
      this.button.style.transform = 'translateY(0)';
      this.button.style.boxShadow = '0 4px 12px rgba(0,113,227,0.3)';
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new BackToTop();
});
