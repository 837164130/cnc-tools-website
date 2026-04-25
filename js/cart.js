// Shopping Cart
class ShoppingCart {
  constructor() {
    this.items = JSON.parse(localStorage.getItem('cart') || '[]');
    this.init();
  }

  init() {
    this.updateCartCount();
    this.attachEventListeners();
  }

  attachEventListeners() {
    document.querySelectorAll('[data-add-to-cart]').forEach(btn => {
      btn.addEventListener('click', () => {
        const product = {
          id: btn.dataset.addToCart,
          name: btn.dataset.productName || 'Product',
          price: parseFloat(btn.dataset.price) || 0,
          quantity: 1
        };
        this.addItem(product);
      });
    });
  }

  addItem(product) {
    const existing = this.items.find(item => item.id === product.id);
    if (existing) {
      existing.quantity++;
    } else {
      this.items.push(product);
    }
    this.save();
    this.updateCartCount();
    
    if (window.notifications) {
      window.notifications.show('已添加到购物车', 'success');
    }
  }

  removeItem(productId) {
    this.items = this.items.filter(item => item.id !== productId);
    this.save();
    this.updateCartCount();
  }

  updateQuantity(productId, quantity) {
    const item = this.items.find(item => item.id === productId);
    if (item) {
      item.quantity = quantity;
      if (quantity <= 0) {
        this.removeItem(productId);
      } else {
        this.save();
        this.updateCartCount();
      }
    }
  }

  getTotal() {
    return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  getCount() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  updateCartCount() {
    document.querySelectorAll('.cart-count').forEach(el => {
      el.textContent = this.getCount();
      el.style.display = this.getCount() > 0 ? 'inline' : 'none';
    });
  }

  save() {
    localStorage.setItem('cart', JSON.stringify(this.items));
  }

  clear() {
    this.items = [];
    this.save();
    this.updateCartCount();
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.cart = new ShoppingCart();
});
