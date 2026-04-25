// Skeleton Loading Effect
class SkeletonLoader {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('[data-skeleton]').forEach(el => {
      this.showSkeleton(el);
    });
  }

  showSkeleton(element) {
    const count = parseInt(element.dataset.skeleton) || 3;
    
    for (let i = 0; i < count; i++) {
      const skeleton = document.createElement('div');
      skeleton.className = 'skeleton-item';
      skeleton.style.cssText = `
        background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
        background-size: 200% 100%;
        animation: skeleton-loading 1.5s infinite;
        border-radius: 8px;
        height: ${element.dataset.height || '200px'};
        margin-bottom: 16px;
      `;
      element.appendChild(skeleton);
    }

    // Add skeleton animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes skeleton-loading {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }
    `;
    document.head.appendChild(style);
  }

  hideSkeleton(element) {
    element.querySelectorAll('.skeleton-item').forEach(el => el.remove());
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new SkeletonLoader();
});
