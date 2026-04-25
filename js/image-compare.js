// Image Before/After Comparison
class ImageCompare {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('[data-image-compare]').forEach(container => {
      this.setupComparison(container);
    });
  }

  setupComparison(container) {
    const beforeSrc = container.dataset.before;
    const afterSrc = container.dataset.after;

    container.style.cssText = `
      position: relative;
      width: 100%;
      aspect-ratio: 16/9;
      overflow: hidden;
      border-radius: 12px;
      cursor: col-resize;
    `;

    container.innerHTML = `
      <div class="compare-after" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: var(--bg-tertiary); display: flex; align-items: center; justify-content: center;">
        <span style="font-size: 48px;">${afterSrc || '✨'}</span>
      </div>
      <div class="compare-before" style="position: absolute; top: 0; left: 0; width: 50%; height: 100%; overflow: hidden; background: var(--bg-secondary); display: flex; align-items: center; justify-content: center;">
        <span style="font-size: 48px;">${beforeSrc || '🔧'}</span>
      </div>
      <div class="compare-slider" style="position: absolute; top: 0; left: 50%; width: 4px; height: 100%; background: white; cursor: col-resize; box-shadow: 0 0 10px rgba(0,0,0,0.3); transform: translateX(-50%);">
        <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 40px; height: 40px; background: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 8px rgba(0,0,0,0.2); font-size: 16px;">↔</div>
      </div>
      <div style="position: absolute; top: 12px; left: 12px; padding: 4px 12px; background: rgba(0,0,0,0.6); color: white; border-radius: 4px; font-size: 12px;">Before</div>
      <div style="position: absolute; top: 12px; right: 12px; padding: 4px 12px; background: rgba(0,0,0,0.6); color: white; border-radius: 4px; font-size: 12px;">After</div>
    `;

    const beforeLayer = container.querySelector('.compare-before');
    const slider = container.querySelector('.compare-slider');
    let isDragging = false;

    const updatePosition = (x) => {
      const rect = container.getBoundingClientRect();
      let percentage = ((x - rect.left) / rect.width) * 100;
      percentage = Math.max(0, Math.min(100, percentage));

      beforeLayer.style.width = percentage + '%';
      slider.style.left = percentage + '%';
    };

    container.addEventListener('mousedown', (e) => {
      isDragging = true;
      updatePosition(e.clientX);
    });

    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      updatePosition(e.clientX);
    });

    document.addEventListener('mouseup', () => {
      isDragging = false;
    });

    // Touch support
    container.addEventListener('touchstart', (e) => {
      isDragging = true;
      updatePosition(e.touches[0].clientX);
    });

    container.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      e.preventDefault();
      updatePosition(e.touches[0].clientX);
    });

    container.addEventListener('touchend', () => {
      isDragging = false;
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ImageCompare();
});
