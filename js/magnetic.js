// Magnetic Effect for Buttons
class MagneticEffect {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('[data-magnetic]').forEach(btn => {
      this.setupMagnetic(btn);
    });
  }

  setupMagnetic(element) {
    element.style.transition = 'transform 0.3s';

    element.addEventListener('mousemove', (e) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      element.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });

    element.addEventListener('mouseleave', () => {
      element.style.transform = 'translate(0, 0)';
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Only on desktop
  if (!window.matchMedia('(pointer: coarse)').matches) {
    new MagneticEffect();
  }
});
