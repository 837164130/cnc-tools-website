// Modal System
class ModalSystem {
  constructor() {
    this.modals = new Map();
    this.init();
  }

  init() {
    this.createOverlay();
    this.attachEventListeners();
  }

  createOverlay() {
    this.overlay = document.createElement('div');
    this.overlay.className = 'modal-overlay';
    this.overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.5);
      display: none;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      padding: 20px;
      opacity: 0;
      transition: opacity 0.3s;
    `;
    document.body.appendChild(this.overlay);

    this.overlay.addEventListener('click', (e) => {
      if (e.target === this.overlay) {
        this.closeAll();
      }
    });
  }

  attachEventListeners() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeAll();
      }
    });
  }

  open(content, options = {}) {
    const modal = document.createElement('div');
    modal.className = 'modal-content';
    modal.style.cssText = `
      background: white;
      border-radius: 24px;
      padding: 40px;
      max-width: ${options.maxWidth || '600px'};
      width: 100%;
      max-height: 90vh;
      overflow-y: auto;
      position: relative;
      transform: scale(0.9);
      transition: transform 0.3s;
    `;

    modal.innerHTML = `
      <button class="modal-close" style="position: absolute; top: 20px; right: 20px; background: none; border: none; font-size: 24px; cursor: pointer; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; border-radius: 50%; transition: background 0.2s;">✕</button>
      ${content}
    `;

    modal.querySelector('.modal-close').addEventListener('click', () => {
      this.close(modal);
    });

    this.overlay.innerHTML = '';
    this.overlay.appendChild(modal);
    this.overlay.style.display = 'flex';
    
    requestAnimationFrame(() => {
      this.overlay.style.opacity = '1';
      modal.style.transform = 'scale(1)';
    });

    this.modals.set(modal, options);
    document.body.style.overflow = 'hidden';

    return modal;
  }

  close(modal) {
    modal.style.transform = 'scale(0.9)';
    this.overlay.style.opacity = '0';
    
    setTimeout(() => {
      this.overlay.style.display = 'none';
      this.modals.delete(modal);
      if (this.modals.size === 0) {
        document.body.style.overflow = '';
      }
    }, 300);
  }

  closeAll() {
    this.modals.forEach((options, modal) => {
      this.close(modal);
    });
  }
}

// Initialize globally
window.modalSystem = new ModalSystem();
