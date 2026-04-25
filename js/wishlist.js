// Wishlist / Favorites
class Wishlist {
  constructor() {
    this.items = JSON.parse(localStorage.getItem('wishlist') || '[]');
    this.init();
  }

  init() {
    this.attachEventListeners();
    this.updateWishlistButton();
  }

  attachEventListeners() {
    document.querySelectorAll('[data-wishlist]').forEach(btn => {
      btn.addEventListener('click', () => {
        const productId = btn.dataset.wishlist;
        if (this.isInWishlist(productId)) {
          this.removeFromWishlist(productId);
          btn.classList.remove('active');
          btn.innerHTML = '♡';
        } else {
          this.addToWishlist(productId);
          btn.classList.add('active');
          btn.innerHTML = '♥';
        }
      });
    });
  }

  addToWishlist(productId) {
    if (!this.isInWishlist(productId)) {
      this.items.push(productId);
      this.save();
      this.updateWishlistButton();
      
      if (window.notifications) {
        window.notifications.show('已添加到收藏', 'success');
      }
    }
  }

  removeFromWishlist(productId) {
    this.items = this.items.filter(id => id !== productId);
    this.save();
    this.updateWishlistButton();
    
    if (window.notifications) {
      window.notifications.show('已从收藏移除', 'info');
    }
  }

  isInWishlist(productId) {
    return this.items.includes(productId);
  }

  updateWishlistButton() {
    document.querySelectorAll('.wishlist-count').forEach(el => {
      el.textContent = this.items.length;
      el.style.display = this.items.length > 0 ? 'inline' : 'none';
    });

    // Update button states
    document.querySelectorAll('[data-wishlist]').forEach(btn => {
      if (this.isInWishlist(btn.dataset.wishlist)) {
        btn.classList.add('active');
        btn.innerHTML = '♥';
      } else {
        btn.classList.remove('active');
        btn.innerHTML = '♡';
      }
    });
  }

  save() {
    localStorage.setItem('wishlist', JSON.stringify(this.items));
  }

  clear() {
    this.items = [];
    this.save();
    this.updateWishlistButton();
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.wishlist = new Wishlist();
});
