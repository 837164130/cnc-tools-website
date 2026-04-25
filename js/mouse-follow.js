// Mouse Follow Effect
class MouseFollow {
  constructor() {
    this.init();
  }

  init() {
    this.cursor = document.createElement('div');
    this.cursor.className = 'mouse-follower';
    this.cursor.style.cssText = `
      position: fixed;
      width: 20px;
      height: 20px;
      border: 2px solid var(--accent);
      border-radius: 50%;
      pointer-events: none;
      z-index: 99999;
      transition: transform 0.1s, opacity 0.3s;
      opacity: 0;
    `;
    document.body.appendChild(this.cursor);

    this.dot = document.createElement('div');
    this.dot.className = 'mouse-dot';
    this.dot.style.cssText = `
      position: fixed;
      width: 6px;
      height: 6px;
      background: var(--accent);
      border-radius: 50%;
      pointer-events: none;
      z-index: 99999;
      transition: transform 0.05s;
      opacity: 0;
    `;
    document.body.appendChild(this.dot);

    this.mouseX = 0;
    this.mouseY = 0;
    this.cursorX = 0;
    this.cursorY = 0;

    document.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
      this.cursor.style.opacity = '1';
      this.dot.style.opacity = '1';
    });

    document.addEventListener('mouseleave', () => {
      this.cursor.style.opacity = '0';
      this.dot.style.opacity = '0';
    });

    this.animate();
  }

  animate() {
    this.cursorX += (this.mouseX - this.cursorX) * 0.1;
    this.cursorY += (this.mouseY - this.cursorY) * 0.1;

    this.cursor.style.transform = `translate(${this.cursorX - 10}px, ${this.cursorY - 10}px)`;
    this.dot.style.transform = `translate(${this.mouseX - 3}px, ${this.mouseY - 3}px)`;

    requestAnimationFrame(() => this.animate());
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Only on desktop
  if (!window.matchMedia('(pointer: coarse)').matches) {
    new MouseFollow();
  }
});
