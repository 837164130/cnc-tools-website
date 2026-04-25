// Keyboard Navigation Enhancement
class KeyboardNavigation {
  constructor() {
    this.init();
  }

  init() {
    this.focusableElements = 'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])';
    this.attachEventListeners();
  }

  attachEventListeners() {
    document.addEventListener('keydown', (e) => {
      // Escape key handling
      if (e.key === 'Escape') {
        this.handleEscape();
      }

      // Arrow key navigation for grids
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        this.handleArrowKeys(e);
      }

      // Enter key for custom elements
      if (e.key === 'Enter') {
        this.handleEnter(e);
      }
    });

    // Focus trapping for modals
    document.querySelectorAll('[data-trap-focus]').forEach(modal => {
      this.trapFocus(modal);
    });
  }

  handleEscape() {
    // Close modals
    document.querySelectorAll('.modal.active').forEach(modal => {
      modal.classList.remove('active');
    });

    // Close mobile menu
    document.querySelector('.mobile-nav')?.classList.remove('active');

    // Close dropdowns
    document.querySelectorAll('.dropdown.active').forEach(dropdown => {
      dropdown.classList.remove('active');
    });
  }

  handleArrowKeys(e) {
    const focused = document.activeElement;
    const container = focused.closest('[data-arrow-nav]');
    
    if (!container) return;

    const items = Array.from(container.querySelectorAll(this.focusableElements));
    const currentIndex = items.indexOf(focused);
    
    if (currentIndex === -1) return;

    let nextIndex;
    const cols = parseInt(container.dataset.arrowNav) || 1;

    switch(e.key) {
      case 'ArrowRight':
        nextIndex = currentIndex + 1;
        break;
      case 'ArrowLeft':
        nextIndex = currentIndex - 1;
        break;
      case 'ArrowDown':
        nextIndex = currentIndex + cols;
        break;
      case 'ArrowUp':
        nextIndex = currentIndex - cols;
        break;
    }

    if (nextIndex >= 0 && nextIndex < items.length) {
      e.preventDefault();
      items[nextIndex].focus();
    }
  }

  handleEnter(e) {
    const focused = document.activeElement;
    
    // Handle custom elements that need Enter key
    if (focused.matches('[data-enter-action]')) {
      e.preventDefault();
      focused.click();
    }
  }

  trapFocus(element) {
    const focusable = element.querySelectorAll(this.focusableElements);
    const firstFocusable = focusable[0];
    const lastFocusable = focusable[focusable.length - 1];

    element.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey && document.activeElement === firstFocusable) {
        e.preventDefault();
        lastFocusable.focus();
      } else if (!e.shiftKey && document.activeElement === lastFocusable) {
        e.preventDefault();
        firstFocusable.focus();
      }
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new KeyboardNavigation();
});
