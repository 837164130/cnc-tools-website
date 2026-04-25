// Counter Animation
class CounterAnimation {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('[data-counter]').forEach(el => {
      this.observeCounter(el);
    });
  }

  observeCounter(element) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateCounter(element);
          observer.unobserve(element);
        }
      });
    }, { threshold: 0.5 });

    observer.observe(element);
  }

  animateCounter(element) {
    const target = parseInt(element.dataset.counter);
    const duration = parseInt(element.dataset.duration) || 2000;
    const start = 0;
    const startTime = performance.now();

    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(start + (target - start) * easeOut);
      
      element.textContent = current.toLocaleString();
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target.toLocaleString();
      }
    };

    requestAnimationFrame(updateCounter);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new CounterAnimation();
});
