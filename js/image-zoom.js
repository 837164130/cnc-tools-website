// Image Zoom / Lightbox
class ImageZoom {
  constructor() {
    this.init();
  }

  init() {
    this.createLightbox();
    this.attachEventListeners();
  }

  createLightbox() {
    this.lightbox = document.createElement('div');
    this.lightbox.className = 'image-lightbox';
    this.lightbox.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.9);
      display: none;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      padding: 40px;
      opacity: 0;
      transition: opacity 0.3s;
      cursor: zoom-out;
    `;

    this.lightbox.innerHTML = `
      <img src="" alt="" style="max-width: 100%; max-height: 90vh; object-fit: contain; border-radius: 12px;">
      <button class="lightbox-close" style="position: absolute; top: 20px; right: 20px; background: none; border: none; color: white; font-size: 32px; cursor: pointer; width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; border-radius: 50%; transition: background 0.2s;">✕</button>
    `;

    document.body.appendChild(this.lightbox);

    // Close on click
    this.lightbox.addEventListener('click', (e) => {
      if (e.target === this.lightbox || e.target.classList.contains('lightbox-close')) {
        this.close();
      }
    });

    // Close on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.close();
      }
    });
  }

  attachEventListeners() {
    document.querySelectorAll('[data-zoom]').forEach(img => {
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', () => this.open(img.src, img.alt));
    });
  }

  open(src, alt) {
    const img = this.lightbox.querySelector('img');
    img.src = src;
    img.alt = alt;
    
    this.lightbox.style.display = 'flex';
    requestAnimationFrame(() => {
      this.lightbox.style.opacity = '1';
    });
    
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.lightbox.style.opacity = '0';
    setTimeout(() => {
      this.lightbox.style.display = 'none';
      document.body.style.overflow = '';
    }, 300);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ImageZoom();
});
