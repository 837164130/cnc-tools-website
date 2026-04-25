// Text Gradient Animation
class TextGradient {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('[data-text-gradient]').forEach(el => {
      this.applyGradient(el);
    });
  }

  applyGradient(element) {
    element.style.background = 'linear-gradient(90deg, #0071e3, #5856d6, #af52de, #0071e3)';
    element.style.backgroundSize = '300% 100%';
    element.style.webkitBackgroundClip = 'text';
    element.style.webkitTextFillColor = 'transparent';
    element.style.animation = 'gradient-shift 3s linear infinite';
  }
}

// Add gradient animation
const style = document.createElement('style');
style.textContent = `
  @keyframes gradient-shift {
    0% { background-position: 0% 50%; }
    100% { background-position: 300% 50%; }
  }
`;
document.head.appendChild(style);

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new TextGradient();
});
