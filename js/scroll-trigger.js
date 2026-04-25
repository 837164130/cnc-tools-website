// Scroll Trigger Animations
class ScrollTrigger {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('[data-scroll-trigger]').forEach(el => {
      this.observeElement(el);
    });
  }

  observeElement(element) {
    const animation = element.dataset.scrollTrigger;
    const delay = parseInt(element.dataset.scrollDelay) || 0;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            element.classList.add(animation);
          }, delay);
          observer.unobserve(element);
        }
      });
    }, { threshold: 0.1 });

    observer.observe(element);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ScrollTrigger();
});
