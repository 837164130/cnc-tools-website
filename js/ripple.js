// Ripple Effect for Buttons
class RippleEffect {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('.btn, button').forEach(btn => {
      btn.style.position = 'relative';
      btn.style.overflow = 'hidden';
      btn.addEventListener('click', (e) => this.createRipple(e, btn));
    });
  }

  createRipple(e, button) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.6);
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      animation: ripple-animation 0.6s ease-out;
      pointer-events: none;
    `;

    button.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  }
}

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple-animation {
    0% { transform: scale(0); opacity: 0.6; }
    100% { transform: scale(2); opacity: 0; }
  }
`;
document.head.appendChild(style);

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new RippleEffect();
});
