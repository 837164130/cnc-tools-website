// Parallax Scrolling Effect
class ParallaxEffect {
  constructor() {
    this.init();
  }

  init() {
    this.elements = document.querySelectorAll('[data-parallax]');
    if (this.elements.length === 0) return;

    this.attachEventListeners();
  }

  attachEventListeners() {
    window.addEventListener('scroll', () => this.updateParallax());
    window.addEventListener('resize', () => this.updateParallax());
  }

  updateParallax() {
    const scrollY = window.pageYOffset;

    this.elements.forEach(el => {
      const speed = parseFloat(el.dataset.parallax) || 0.5;
      const rect = el.getBoundingClientRect();
      const elementTop = rect.top + scrollY;
      const offset = (scrollY - elementTop) * speed;
      
      el.style.transform = `translateY(${offset}px)`;
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ParallaxEffect();
});
