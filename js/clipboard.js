// Clipboard Copy Functionality
class ClipboardCopy {
  constructor() {
    this.init();
  }

  init() {
    this.addCopyButtons();
  }

  addCopyButtons() {
    document.querySelectorAll('[data-copy]').forEach(el => {
      const copyBtn = document.createElement('button');
      copyBtn.className = 'copy-btn';
      copyBtn.innerHTML = '📋';
      copyBtn.style.cssText = `
        background: none;
        border: none;
        cursor: pointer;
        font-size: 16px;
        padding: 4px;
        margin-left: 8px;
        opacity: 0.6;
        transition: opacity 0.2s;
      `;
      
      copyBtn.addEventListener('mouseenter', () => copyBtn.style.opacity = '1');
      copyBtn.addEventListener('mouseleave', () => copyBtn.style.opacity = '0.6');
      copyBtn.addEventListener('click', () => this.copy(el.dataset.copy, copyBtn));
      
      el.appendChild(copyBtn);
    });
  }

  async copy(text, button) {
    try {
      await navigator.clipboard.writeText(text);
      button.innerHTML = '✅';
      setTimeout(() => {
        button.innerHTML = '📋';
      }, 2000);
      
      if (window.notifications) {
        window.notifications.show('已复制到剪贴板', 'success');
      }
    } catch (err) {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      
      button.innerHTML = '✅';
      setTimeout(() => {
        button.innerHTML = '📋';
      }, 2000);
    }
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ClipboardCopy();
});
