// Theme Switcher (Light/Dark Mode)
class ThemeSwitcher {
  constructor() {
    this.currentTheme = localStorage.getItem('cccnc-theme') || 'light';
    this.init();
  }

  init() {
    this.applyTheme(this.currentTheme);
    this.createToggleButton();
  }

  applyTheme(theme) {
    this.currentTheme = theme;
    localStorage.setItem('cccnc-theme', theme);

    if (theme === 'dark') {
      document.documentElement.style.setProperty('--bg', '#000000');
      document.documentElement.style.setProperty('--bg-secondary', '#1c1c1e');
      document.documentElement.style.setProperty('--text', '#ffffff');
      document.documentElement.style.setProperty('--text-secondary', '#98989d');
      document.documentElement.style.setProperty('--border', '#38383a');
    } else {
      document.documentElement.style.setProperty('--bg', '#ffffff');
      document.documentElement.style.setProperty('--bg-secondary', '#f5f5f7');
      document.documentElement.style.setProperty('--text', '#1d1d1f');
      document.documentElement.style.setProperty('--text-secondary', '#86868b');
      document.documentElement.style.setProperty('--border', '#d2d2d7');
    }
  }

  toggle() {
    const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.applyTheme(newTheme);
    this.updateButtonIcon();
  }

  createToggleButton() {
    const nav = document.querySelector('.nav');
    if (!nav) return;

    const toggleBtn = document.createElement('button');
    toggleBtn.id = 'themeToggle';
    toggleBtn.innerHTML = this.currentTheme === 'light' ? '🌙' : '☀️';
    toggleBtn.style.cssText = `
      background: none;
      border: none;
      font-size: 20px;
      cursor: pointer;
      padding: 8px;
      margin-left: 12px;
    `;

    toggleBtn.addEventListener('click', () => this.toggle());

    const langSwitcher = nav.querySelector('.lang-switcher');
    if (langSwitcher) {
      langSwitcher.insertAdjacentElement('afterend', toggleBtn);
    } else {
      nav.appendChild(toggleBtn);
    }

    this.toggleBtn = toggleBtn;
  }

  updateButtonIcon() {
    if (this.toggleBtn) {
      this.toggleBtn.innerHTML = this.currentTheme === 'light' ? '🌙' : '☀️';
    }
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.themeSwitcher = new ThemeSwitcher();
});
