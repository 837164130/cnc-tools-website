// Scroll Animations
class ScrollAnimations {
  constructor() {
    this.init();
  }

  init() {
    this.observeElements();
  }

  observeElements() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    // Observe product cards
    document.querySelectorAll('.product-card').forEach((el, index) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
      el.classList.add('scroll-animate');
      observer.observe(el);
    });

    // Observe section titles
    document.querySelectorAll('.section-title').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      el.classList.add('scroll-animate');
      observer.observe(el);
    });

    // Observe stat cards
    document.querySelectorAll('.stat-card').forEach((el, index) => {
      el.style.opacity = '0';
      el.style.transform = 'scale(0.9)';
      el.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
      el.classList.add('scroll-animate');
      observer.observe(el);
    });
  }
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
  .scroll-animate.animate-in {
    opacity: 1 !important;
    transform: translateY(0) scale(1) !important;
  }
`;
document.head.appendChild(style);

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ScrollAnimations();
});
