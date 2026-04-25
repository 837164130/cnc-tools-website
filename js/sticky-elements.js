// Sticky Elements
class StickyElements {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('[data-sticky]').forEach(el => {
      this.makeSticky(el);
    });
  }

  makeSticky(element) {
    const offset = parseInt(element.dataset.sticky) || 0;
    const originalTop = element.getBoundingClientRect().top + window.pageYOffset;

    window.addEventListener('scroll', () => {
      if (window.pageYOffset > originalTop - offset) {
        element.style.position = 'fixed';
        element.style.top = offset + 'px';
        element.style.width = element.parentElement.offsetWidth + 'px';
      } else {
        element.style.position = '';
        element.style.top = '';
        element.style.width = '';
      }
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new StickyElements();
});
