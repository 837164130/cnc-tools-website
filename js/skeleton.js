// Skeleton Loading Effect
class SkeletonLoader {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('[data-skeleton]').forEach(el => {
      this.createSkeleton(el);
    });
  }

  createSkeleton(element) {
    const skeleton = document.createElement('div');
    skeleton.className = 'skeleton-loader';
    skeleton.style.cssText = `
      background: linear-gradient(90deg, var(--bg-secondary) 25%, var(--bg-tertiary) 50%, var(--bg-secondary) 75%);
      background-size: 200% 100%;
      animation: skeleton-loading 1.5s infinite;
      border-radius: 8px;
      width: 100%;
      height: ${element.dataset.skeleton || '200px'};
    `;

    element.appendChild(skeleton);

    // Remove skeleton when content loads
    const observer = new MutationObserver(() => {
      if (element.children.length > 1) {
        skeleton.remove();
        observer.disconnect();
      }
    });

    observer.observe(element, { childList: true });
  }
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

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new SkeletonLoader();
});
