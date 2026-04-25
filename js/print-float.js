// Floating Print Button
class PrintFloat {
  constructor() {
    this.init();
  }

  init() {
    this.createButton();
  }

  createButton() {
    const btn = document.createElement('div');
    btn.className = 'print-float-btn';
    btn.style.cssText = `
      position: fixed;
      bottom: 380px;
      right: 24px;
      width: 48px;
      height: 48px;
      background: var(--bg-primary);
      border: 2px solid var(--border);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 4px 16px rgba(0,0,0,0.1);
      z-index: 999;
      transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s;
      font-size: 20px;
    `;
    btn.innerHTML = '🖨️';

    btn.addEventListener('mouseenter', () => {
      btn.style.transform = 'scale(1.1)';
      btn.style.boxShadow = '0 6px 24px rgba(0,0,0,0.2)';
      btn.style.borderColor = 'var(--accent)';
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'scale(1)';
      btn.style.boxShadow = '0 4px 16px rgba(0,0,0,0.1)';
      btn.style.borderColor = 'var(--border)';
    });

    btn.addEventListener('click', () => {
      window.print();
    });

    document.body.appendChild(btn);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new PrintFloat();
});
