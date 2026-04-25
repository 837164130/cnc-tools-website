// Keyboard Shortcuts
class KeyboardShortcuts {
  constructor() {
    this.init();
  }

  init() {
    this.attachEventListeners();
  }

  attachEventListeners() {
    document.addEventListener('keydown', (e) => {
      // Ignore if user is typing in an input
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') {
        return;
      }

      // / or Ctrl+K: Focus search
      if (e.key === '/' || (e.ctrlKey && e.key === 'k')) {
        e.preventDefault();
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
          searchInput.focus();
        } else {
          window.location.href = '/search.html';
        }
      }

      // Escape: Close modals and menus
      if (e.key === 'Escape') {
        document.querySelectorAll('.quick-view-modal, .share-modal, .mobile-menu-panel').forEach(modal => {
          modal.remove();
        });
      }

      // Ctrl+/: Show shortcuts help
      if (e.ctrlKey && e.key === '?') {
        e.preventDefault();
        this.showShortcutsHelp();
      }

      // T: Toggle theme
      if (e.key === 't' || e.key === 'T') {
        if (window.themeSwitcher) {
          window.themeSwitcher.toggle();
        }
      }

      // H: Go home
      if (e.key === 'h' || e.key === 'H') {
        window.location.href = '/';
      }

      // C: Go to contact
      if (e.key === 'c' || e.key === 'C') {
        window.location.href = '/contact.html';
      }
    });
  }

  showShortcutsHelp() {
    const modal = document.createElement('div');
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      padding: 20px;
    `;

    modal.innerHTML = `
      <div style="background: white; border-radius: 24px; padding: 40px; max-width: 500px; width: 100%; position: relative;">
        <button onclick="this.closest('div').parentElement.remove()" style="position: absolute; top: 20px; right: 20px; background: none; border: none; font-size: 24px; cursor: pointer;">✕</button>
        <h2 style="font-size: 24px; font-weight: 700; margin-bottom: 24px;">键盘快捷键</h2>
        <div style="display: grid; gap: 16px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span>搜索</span>
            <kbd style="background: #f5f5f7; padding: 4px 12px; border-radius: 8px; font-family: inherit;">/</kbd>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span>切换主题</span>
            <kbd style="background: #f5f5f7; padding: 4px 12px; border-radius: 8px; font-family: inherit;">T</kbd>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span>首页</span>
            <kbd style="background: #f5f5f7; padding: 4px 12px; border-radius: 8px; font-family: inherit;">H</kbd>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span>联系我们</span>
            <kbd style="background: #f5f5f7; padding: 4px 12px; border-radius: 8px; font-family: inherit;">C</kbd>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span>关闭弹窗</span>
            <kbd style="background: #f5f5f7; padding: 4px 12px; border-radius: 8px; font-family: inherit;">Esc</kbd>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span>快捷键帮助</span>
            <kbd style="background: #f5f5f7; padding: 4px 12px; border-radius: 8px; font-family: inherit;">Ctrl + ?</kbd>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.remove();
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new KeyboardShortcuts();
});
