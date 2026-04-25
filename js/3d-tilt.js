// 3D Tilt Effect for Cards
class TiltEffect {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('[data-tilt]').forEach(card => {
      this.setupTilt(card);
    });
  }

  setupTilt(card) {
    card.style.transformStyle = 'preserve-3d';
    card.style.transition = 'transform 0.3s';

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Only on desktop
  if (!window.matchMedia('(pointer: coarse)').matches) {
    new TiltEffect();
  }
});
