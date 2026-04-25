// Floating Favorites Button
class FavoritesFloat {
  constructor() {
    this.init();
  }

  init() {
    this.favoritesCount = 0;
    this.createButton();
    this.updateCount();
  }

  createButton() {
    const btn = document.createElement('div');
    btn.className = 'favorites-float-btn';
    btn.style.cssText = `
      position: fixed;
      bottom: 170px;
      right: 24px;
      width: 56px;
      height: 56px;
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
      font-size: 24px;
    `;
    btn.innerHTML = `
      <span>❤️</span>
      <span class="favorites-badge" style="position: absolute; top: -4px; right: -4px; width: 24px; height: 24px; background: #ff3b30; color: white; border-radius: 50%; font-size: 12px; display: none; align-items: center; justify-content: center; font-weight: 700;">0</span>
    `;

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
      window.location.href = '#favorites';
    });

    document.body.appendChild(btn);
    this.badge = btn.querySelector('.favorites-badge');
  }

  updateCount() {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    this.favoritesCount = favorites.length;
    
    if (this.badge) {
      this.badge.textContent = this.favoritesCount;
      this.badge.style.display = this.favoritesCount > 0 ? 'flex' : 'none';
    }
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.favoritesFloat = new FavoritesFloat();
});
