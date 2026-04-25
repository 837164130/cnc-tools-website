// 360 Degree Product View
class View360 {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('[data-360-view]').forEach(el => {
      this.setup360View(el);
    });
  }

  setup360View(element) {
    const images = JSON.parse(element.dataset.view360 || '[]');
    if (images.length === 0) return;

    let currentIndex = 0;
    let isDragging = false;
    let startX = 0;
    let currentX = 0;

    element.style.cursor = 'grab';
    element.style.position = 'relative';
    element.style.overflow = 'hidden';

    // Create image container
    const imgContainer = document.createElement('div');
    imgContainer.style.cssText = `
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    `;

    const img = document.createElement('img');
    img.src = images[0];
    img.style.cssText = `
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
      user-select: none;
      -webkit-user-drag: none;
    `;

    imgContainer.appendChild(img);
    element.appendChild(imgContainer);

    // Add drag instructions
    const instructions = document.createElement('div');
    instructions.style.cssText = `
      position: absolute;
      bottom: 16px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(0,0,0,0.7);
      color: white;
      padding: 8px 16px;
      border-radius: 20px;
      font-size: 12px;
      pointer-events: none;
      opacity: 0.8;
    `;
    instructions.textContent = '拖动旋转';
    element.appendChild(instructions);

    // Mouse events
    element.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.clientX;
      element.style.cursor = 'grabbing';
      instructions.style.opacity = '0';
    });

    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;

      const deltaX = e.clientX - startX;
      if (Math.abs(deltaX) > 10) {
        const direction = deltaX > 0 ? 1 : -1;
        currentIndex = (currentIndex + direction + images.length) % images.length;
        img.src = images[currentIndex];
        startX = e.clientX;
      }
    });

    document.addEventListener('mouseup', () => {
      isDragging = false;
      element.style.cursor = 'grab';
    });

    // Touch events
    element.addEventListener('touchstart', (e) => {
      isDragging = true;
      startX = e.touches[0].clientX;
      instructions.style.opacity = '0';
    });

    element.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      e.preventDefault();

      const deltaX = e.touches[0].clientX - startX;
      if (Math.abs(deltaX) > 10) {
        const direction = deltaX > 0 ? 1 : -1;
        currentIndex = (currentIndex + direction + images.length) % images.length;
        img.src = images[currentIndex];
        startX = e.touches[0].clientX;
      }
    });

    element.addEventListener('touchend', () => {
      isDragging = false;
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new View360();
});
