// Glitch Effect
class GlitchEffect {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('[data-glitch]').forEach(el => {
      this.applyGlitch(el);
    });
  }

  applyGlitch(element) {
    const originalText = element.textContent;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    
    element.addEventListener('mouseenter', () => {
      let iterations = 0;
      const interval = setInterval(() => {
        element.textContent = originalText
          .split('')
          .map((char, index) => {
            if (index < iterations) {
              return originalText[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('');

        if (iterations >= originalText.length) {
          clearInterval(interval);
        }
        iterations += 1 / 3;
      }, 30);
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new GlitchEffect();
});
