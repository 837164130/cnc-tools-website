// Blur Load Effect for Images
class BlurLoad {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('[data-blur-load]').forEach(img => {
      this.setupBlurLoad(img);
    });
  }

  setupBlurLoad(img) {
    const wrapper = document.createElement('div');
    wrapper.style.cssText = `
      position: relative;
      overflow: hidden;
      background: var(--bg-secondary);
    `;
    
    img.parentNode.insertBefore(wrapper, img);
    wrapper.appendChild(img);

    img.style.cssText = `
      opacity: 0;
      transition: opacity 0.5s;
      width: 100%;
      height: auto;
      display: block;
    `;

    const blurImg = document.createElement('img');
    blurImg.src = img.dataset.blurLoad || img.src;
    blurImg.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: blur(20px);
      transform: scale(1.1);
      transition: opacity 0.5s;
    `;
    wrapper.insertBefore(blurImg, img);

    img.addEventListener('load', () => {
      img.style.opacity = '1';
      blurImg.style.opacity = '0';
    });

    if (img.complete) {
      img.style.opacity = '1';
      blurImg.style.opacity = '0';
    }
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new BlurLoad();
});
