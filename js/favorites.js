// Favorites/Wishlist System
class Favorites {
  constructor() {
    this.items = JSON.parse(localStorage.getItem('cccnc-favorites') || '[]');
    this.init();
  }

  init() {
    this.createFavoritesPage();
    this.updateButtons();
  }

  toggle(productId, productData = {}) {
    const index = this.items.findIndex(item => item.id === productId);
    
    if (index > -1) {
      this.items.splice(index, 1);
      this.showNotification('已从收藏中移除', 'info');
    } else {
      this.items.push({
        id: productId,
        ...productData,
        addedAt: new Date().toISOString()
      });
      this.showNotification('已添加到收藏', 'success');
    }

    this.save();
    this.updateButtons();
  }

  save() {
    localStorage.setItem('cccnc-favorites', JSON.stringify(this.items));
  }

  isFavorite(productId) {
    return this.items.some(item => item.id === productId);
  }

  updateButtons() {
    document.querySelectorAll('[data-favorite]').forEach(btn => {
      const productId = btn.dataset.favorite;
      const isFav = this.isFavorite(productId);
      btn.innerHTML = isFav ? '❤️' : '🤍';
      btn.classList.toggle('active', isFav);
    });
  }

  showNotification(message, type) {
    if (window.notifications) {
      window.notifications.show(message, type);
    }
  }

  createFavoritesPage() {
    // Add favorites link to nav if it doesn't exist
    const nav = document.querySelector('.nav-links');
    if (nav && !document.querySelector('[href="/favorites.html"]')) {
      const favoritesLink = document.createElement('a');
      favoritesLink.href = '/favorites.html';
      favoritesLink.innerHTML = `收藏 (${this.items.length})`;
      favoritesLink.style.cssText = 'font-size: 12px; color: var(--text); text-decoration: none; opacity: 0.8;';
      nav.appendChild(favoritesLink);
    }
  }

  getItems() {
    return this.items;
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.favorites = new Favorites();
});
