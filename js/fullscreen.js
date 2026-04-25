// Fullscreen View
class FullscreenView {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('[data-fullscreen]').forEach(el => {
      this.setupFullscreen(el);
    });
  }

  setupFullscreen(element) {
    const btn = document.createElement('button');
    btn.className = 'fullscreen-btn';
    btn.innerHTML = '⛶';
    btn.style.cssText = `
      position: absolute;
      top: 12px;
      right: 12px;
      width: 40px;
      height: 40px;
      background: rgba(0,0,0,0.5);
      border: none;
      border-radius: 8px;
      color: white;
      font-size: 18px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.3s;
      z-index: 10;
    `;

    element.style.position = 'relative';
    element.appendChild(btn);

    element.addEventListener('mouseenter', () => {
      btn.style.opacity = '1';
    });

    element.addEventListener('mouseleave', () => {
      btn.style.opacity = '0';
    });

    btn.addEventListener('click', () => {
      this.toggleFullscreen(element);
    });
  }

  toggleFullscreen(element) {
    if (!document.fullscreenElement) {
      element.requestFullscreen().catch(err => {
        console.error('Error attempting to enable fullscreen:', err);
      });
    } else {
      document.exitFullscreen();
    }
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new FullscreenView();
});
