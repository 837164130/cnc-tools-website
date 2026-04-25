// Lazy Image Loader with Placeholder
class ImageLoader {
  constructor() {
    this.init();
  }

  init() {
    this.createPlaceholders();
    this.lazyLoadImages();
  }

  createPlaceholders() {
    document.querySelectorAll('[data-src]').forEach(img => {
      // Add loading state
      img.style.opacity = '0';
      img.style.transition = 'opacity 0.3s';
      
      // Create placeholder
      const placeholder = document.createElement('div');
      placeholder.className = 'image-placeholder';
      placeholder.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
        background-size: 200% 100%;
        animation: shimmer 1.5s infinite;
      `;
      
      img.parentElement.style.position = 'relative';
      img.parentElement.appendChild(placeholder);
      
      // Store reference
      img.dataset.placeholder = 'true';
    });
  }

  lazyLoadImages() {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          this.loadImage(img);
          observer.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.01
    });

    document.querySelectorAll('[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }

  loadImage(img) {
    const src = img.dataset.src;
    if (!src) return;

    const tempImg = new Image();
    tempImg.onload = () => {
      img.src = src;
      img.style.opacity = '1';
      
      // Remove placeholder
      const placeholder = img.parentElement.querySelector('.image-placeholder');
      if (placeholder) {
        placeholder.remove();
      }
    };
    tempImg.onerror = () => {
      // Show error state
      img.style.opacity = '1';
      img.style.background = '#f5f5f7';
      img.style.display = 'flex';
      img.style.alignItems = 'center';
      img.style.justifyContent = 'center';
      img.innerHTML = '<span style="font-size: 48px;">🔧</span>';
      
      const placeholder = img.parentElement.querySelector('.image-placeholder');
      if (placeholder) {
        placeholder.remove();
      }
    };
    tempImg.src = src;
  }
}

// Add shimmer animation
const style = document.createElement('style');
style.textContent = `
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
`;
document.head.appendChild(style);

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ImageLoader();
});
