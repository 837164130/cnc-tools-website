// Tooltip System
class TooltipSystem {
  constructor() {
    this.init();
  }

  init() {
    this.createTooltipElement();
    this.attachEventListeners();
  }

  createTooltipElement() {
    this.tooltip = document.createElement('div');
    this.tooltip.className = 'custom-tooltip';
    this.tooltip.style.cssText = `
      position: fixed;
      background: rgba(0,0,0,0.8);
      color: white;
      padding: 8px 12px;
      border-radius: 8px;
      font-size: 13px;
      pointer-events: none;
      z-index: 10000;
      opacity: 0;
      transition: opacity 0.2s;
      max-width: 250px;
      line-height: 1.4;
    `;
    document.body.appendChild(this.tooltip);
  }

  attachEventListeners() {
    document.querySelectorAll('[data-tooltip]').forEach(el => {
      el.addEventListener('mouseenter', (e) => this.show(e, el.dataset.tooltip));
      el.addEventListener('mouseleave', () => this.hide());
      el.addEventListener('mousemove', (e) => this.move(e));
    });
  }

  show(e, text) {
    this.tooltip.textContent = text;
    this.tooltip.style.opacity = '1';
    this.move(e);
  }

  hide() {
    this.tooltip.style.opacity = '0';
  }

  move(e) {
    const x = e.clientX + 10;
    const y = e.clientY + 10;
    
    // Prevent tooltip from going off screen
    const rect = this.tooltip.getBoundingClientRect();
    const maxX = window.innerWidth - rect.width - 10;
    const maxY = window.innerHeight - rect.height - 10;
    
    this.tooltip.style.left = Math.min(x, maxX) + 'px';
    this.tooltip.style.top = Math.min(y, maxY) + 'px';
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new TooltipSystem();
});
