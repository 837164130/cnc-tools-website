// Product Image Magnifier
class ImageMagnifier {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('[data-magnifier]').forEach(el => {
      this.setupMagnifier(el);
    });
  }

  setupMagnifier(element) {
    const zoomLevel = parseInt(element.dataset.magnifier) || 2;
    
    element.style.position = 'relative';
    element.style.cursor = 'crosshair';
    element.style.overflow = 'hidden';

    // Create zoom lens
    const lens = document.createElement('div');
    lens.style.cssText = `
      position: absolute;
      width: 100px;
      height: 100px;
      border: 2px solid #0071e3;
      border-radius: 50%;
      pointer-events: none;
      display: none;
      box-shadow: 0 0 0 9999px rgba(0,0,0,0.1);
      z-index: 10;
    `;
    element.appendChild(lens);

    // Create zoom result
    const result = document.createElement('div');
    result.style.cssText = `
      position: absolute;
      top: 0;
      left: calc(100% + 16px);
      width: 300px;
      height: 300px;
      border: 1px solid var(--border);
      border-radius: 12px;
      background-repeat: no-repeat;
      display: none;
      z-index: 100;
      background-color: white;
    `;
    element.appendChild(result);

    const img = element.querySelector('img');
    if (!img) return;

    element.addEventListener('mouseenter', () => {
      lens.style.display = 'block';
      result.style.display = 'block';
      result.style.backgroundImage = `url('${img.src}')`;
      result.style.backgroundSize = `${img.width * zoomLevel}px ${img.height * zoomLevel}px`;
    });

    element.addEventListener('mouseleave', () => {
      lens.style.display = 'none';
      result.style.display = 'none';
    });

    element.addEventListener('mousemove', (e) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Position lens
      let lensX = x - 50;
      let lensY = y - 50;

      // Keep lens within bounds
      lensX = Math.max(0, Math.min(lensX, rect.width - 100));
      lensY = Math.max(0, Math.min(lensY, rect.height - 100));

      lens.style.left = lensX + 'px';
      lens.style.top = lensY + 'px';

      // Calculate background position for result
      const bgX = (lensX / rect.width) * 100;
      const bgY = (lensY / rect.height) * 100;

      result.style.backgroundPosition = `${bgX}% ${bgY}%`;
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ImageMagnifier();
});
