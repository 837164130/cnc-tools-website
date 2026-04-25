// Performance Optimizations
class PerformanceOptimizer {
  constructor() {
    this.init();
  }

  init() {
    this.optimizeImages();
    this.deferNonCriticalCSS();
    this.prefetchLinks();
    this.addServiceWorker();
  }

  optimizeImages() {
    // Add loading="lazy" to images below the fold
    document.querySelectorAll('img:not([loading])').forEach((img, index) => {
      if (index > 5) {
        img.loading = 'lazy';
      }
    });

    // Add decoding="async" to all images
    document.querySelectorAll('img:not([decoding])').forEach(img => {
      img.decoding = 'async';
    });
  }

  deferNonCriticalCSS() {
    // Find non-critical stylesheets and load them asynchronously
    document.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
      if (!link.classList.contains('critical')) {
        link.media = 'print';
        link.onload = () => {
          link.media = 'all';
        };
      }
    });
  }

  prefetchLinks() {
    // Prefetch links on hover
    let prefetchTimer;
    document.querySelectorAll('a[href^="/"]').forEach(link => {
      link.addEventListener('mouseenter', () => {
        prefetchTimer = setTimeout(() => {
          const prefetch = document.createElement('link');
          prefetch.rel = 'prefetch';
          prefetch.href = link.href;
          document.head.appendChild(prefetch);
        }, 100);
      });

      link.addEventListener('mouseleave', () => {
        clearTimeout(prefetchTimer);
      });
    });
  }

  addServiceWorker() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(() => {
          // Service worker registration failed, continue without it
        });
      });
    }
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new PerformanceOptimizer();
});
