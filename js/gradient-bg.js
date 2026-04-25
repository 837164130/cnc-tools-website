// Animated Gradient Background
class GradientBackground {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('[data-gradient-bg]').forEach(el => {
      this.createGradient(el);
    });
  }

  createGradient(element) {
    const colors = element.dataset.gradientBg.split(',');
    let currentIndex = 0;

    element.style.background = `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`;
    element.style.backgroundSize = '400% 400%';
    element.style.animation = 'gradient-shift 15s ease infinite';

    // Add gradient animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes gradient-shift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
    `;
    document.head.appendChild(style);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new GradientBackground();
});
