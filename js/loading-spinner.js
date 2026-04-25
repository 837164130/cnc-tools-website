// Loading Spinner for async operations
class LoadingSpinner {
  constructor() {
    this.spinner = null;
    this.init();
  }

  init() {
    this.createSpinner();
  }

  createSpinner() {
    this.spinner = document.createElement('div');
    this.spinner.className = 'loading-spinner';
    this.spinner.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(255,255,255,0.8);
      display: none;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      backdrop-filter: blur(4px);
    `;

    this.spinner.innerHTML = `
      <div style="text-align: center;">
        <div style="width: 48px; height: 48px; border: 4px solid #f5f5f7; border-top-color: #0071e3; border-radius: 50%; animation: spin 0.8s linear infinite; margin: 0 auto 16px;"></div>
        <p style="color: #86868b; font-size: 14px;">加载中...</p>
      </div>
    `;

    // Add spin animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);

    document.body.appendChild(this.spinner);
  }

  show() {
    this.spinner.style.display = 'flex';
  }

  hide() {
    this.spinner.style.display = 'none';
  }
}

// Initialize globally
window.loadingSpinner = new LoadingSpinner();
