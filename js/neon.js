// Neon Glow Effect
class NeonEffect {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('[data-neon]').forEach(el => {
      this.applyNeon(el);
    });
  }

  applyNeon(element) {
    const color = element.dataset.neon || '#0071e3';
    
    element.style.textShadow = `
      0 0 5px ${color},
      0 0 10px ${color},
      0 0 20px ${color},
      0 0 40px ${color}
    `;
    element.style.transition = 'text-shadow 0.3s';

    element.addEventListener('mouseenter', () => {
      element.style.textShadow = `
        0 0 10px ${color},
        0 0 20px ${color},
        0 0 40px ${color},
        0 0 80px ${color}
      `;
    });

    element.addEventListener('mouseleave', () => {
      element.style.textShadow = `
        0 0 5px ${color},
        0 0 10px ${color},
        0 0 20px ${color},
        0 0 40px ${color}
      `;
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new NeonEffect();
});
