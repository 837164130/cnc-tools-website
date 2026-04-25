// 3D Card Tilt Effect
class Card3D {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('[data-3d-card]').forEach(card => {
      this.setup3DCard(card);
    });
  }

  setup3DCard(card) {
    card.style.transformStyle = 'preserve-3d';
    card.style.perspective = '1000px';
    
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
  new Card3D();
});
