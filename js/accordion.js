// Accordion Component
class Accordion {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('.accordion').forEach(accordion => {
      this.setupAccordion(accordion);
    });
  }

  setupAccordion(accordion) {
    const items = accordion.querySelectorAll('.accordion-item');

    items.forEach(item => {
      const header = item.querySelector('.accordion-header');
      const content = item.querySelector('.accordion-content');

      if (header && content) {
        header.addEventListener('click', () => {
          const isOpen = item.classList.contains('open');

          // Close all items
          items.forEach(i => {
            i.classList.remove('open');
            const c = i.querySelector('.accordion-content');
            if (c) c.style.maxHeight = null;
          });

          // Open current if it was closed
          if (!isOpen) {
            item.classList.add('open');
            content.style.maxHeight = content.scrollHeight + 'px';
          }
        });
      }
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new Accordion();
});
