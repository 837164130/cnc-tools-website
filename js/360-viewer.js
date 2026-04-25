// 360 Degree Product Viewer
class Viewer360 {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('[data-360-viewer]').forEach(container => {
      this.setupViewer(container);
    });
  }

  setupViewer(container) {
    const images = JSON.parse(container.dataset.images || '[]');
    if (images.length === 0) return;

    let currentIndex = 0;
    let isDragging = false;
    let startX = 0;
    let currentX = 0;

    container.style.cssText = `
      position: relative;
      width: 100%;
      aspect-ratio: 1;
      background: var(--bg-secondary);
      border-radius: 12px;
      overflow: hidden;
      cursor: grab;
      user-select: none;
    `;

    const img = document.createElement('img');
    img.src = images[0];
    img.style.cssText = `
      width: 100%;
      height: 100%;
      object-fit: contain;
      pointer-events: none;
    `;
    container.appendChild(img);

    const hint = document.createElement('div');
    hint.textContent = '拖动旋转';
    hint.style.cssText = `
      position: absolute;
      bottom: 16px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(0,0,0,0.6);
      color: white;
      padding: 8px 16px;
      border-radius: 20px;
      font-size: 14px;
      pointer-events: none;
      transition: opacity 0.3s;
    `;
    container.appendChild(hint);

    const updateImage = () => {
      const index = Math.abs(currentIndex) % images.length;
      img.src = images[index];
    };

    container.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.clientX;
      container.style.cursor = 'grabbing';
      hint.style.opacity = '0';
    });

    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - startX;
      if (Math.abs(deltaX) > 10) {
        currentIndex += deltaX > 0 ? 1 : -1;
        startX = e.clientX;
        updateImage();
      }
    });

    document.addEventListener('mouseup', () => {
      isDragging = false;
      container.style.cursor = 'grab';
    });

    // Touch support
    container.addEventListener('touchstart', (e) => {
      isDragging = true;
      startX = e.touches[0].clientX;
      hint.style.opacity = '0';
    });

    container.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const deltaX = e.touches[0].clientX - startX;
      if (Math.abs(deltaX) > 10) {
        currentIndex += deltaX > 0 ? 1 : -1;
        startX = e.touches[0].clientX;
        updateImage();
      }
    });

    container.addEventListener('touchend', () => {
      isDragging = false;
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new Viewer360();
});
