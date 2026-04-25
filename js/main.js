// Main JavaScript for CCCNC Website
// Combines all enhancements

// Initialize all features when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Initialize mobile navigation
  if (typeof MobileNav !== 'undefined') {
    new MobileNav();
  }

  // Initialize search
  if (typeof ProductSearch !== 'undefined') {
    new ProductSearch();
  }

  // Initialize product filters
  if (typeof ProductFilter !== 'undefined') {
    new ProductFilter();
  }

  // Initialize product enhancements
  if (typeof ProductEnhancements !== 'undefined') {
    new ProductEnhancements();
  }

  // Initialize image loader
  if (typeof ImageLoader !== 'undefined') {
    new ImageLoader();
  }

  // Initialize scroll animations
  if (typeof ScrollAnimations !== 'undefined') {
    new ScrollAnimations();
  }

  // Initialize breadcrumb
  if (typeof Breadcrumb !== 'undefined') {
    new Breadcrumb();
  }

  // Initialize back to top
  if (typeof BackToTop !== 'undefined') {
    new BackToTop();
  }

  // Initialize product recommendations
  if (typeof ProductRecommendations !== 'undefined') {
    window.productRecommendations = new ProductRecommendations();
  }
});

// Utility functions
window.utils = {
  // Format price
  formatPrice: (price) => {
    return new Intl.NumberFormat('zh-CN', {
      style: 'currency',
      currency: 'CNY'
    }).format(price);
  },

  // Debounce function
  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Throttle function
  throttle: (func, limit) => {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
};
