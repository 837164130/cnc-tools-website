// Text Scramble Effect
class TextScramble {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('[data-scramble]').forEach(el => {
      this.setupScramble(el);
    });
  }

  setupScramble(element) {
    const originalText = element.textContent;
    const chars = '!<>-_\\/[]{}—=+*^?#________';
    
    element.addEventListener('mouseenter', () => {
      this.scramble(element, originalText, chars);
    });
  }

  scramble(element, finalText, chars) {
    let iteration = 0;
    const interval = setInterval(() => {
      element.textContent = finalText
        .split('')
        .map((char, index) => {
          if (index < iteration) {
            return finalText[index];
          }
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join('');

      if (iteration >= finalText.length) {
        clearInterval(interval);
      }

      iteration += 1 / 3;
    }, 30);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new TextScramble();
});
