// Typewriter Effect
class Typewriter {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('[data-typewriter]').forEach(el => {
      this.setupTypewriter(el);
    });
  }

  setupTypewriter(element) {
    const text = element.dataset.typewriter;
    const speed = parseInt(element.dataset.speed) || 100;
    const delay = parseInt(element.dataset.delay) || 0;
    
    element.textContent = '';
    element.style.borderRight = '2px solid currentColor';
    element.style.animation = 'blink 1s step-end infinite';
    
    setTimeout(() => {
      this.typeText(element, text, speed);
    }, delay);
  }

  typeText(element, text, speed, index = 0) {
    if (index < text.length) {
      element.textContent += text.charAt(index);
      setTimeout(() => this.typeText(element, text, speed, index + 1), speed);
    } else {
      element.style.borderRight = 'none';
      element.style.animation = 'none';
    }
  }
}

// Add blink animation
const style = document.createElement('style');
style.textContent = `
  @keyframes blink {
    50% { border-color: transparent; }
  }
`;
document.head.appendChild(style);

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new Typewriter();
});
