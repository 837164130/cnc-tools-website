// Product Comparison
class ProductCompare {
  constructor() {
    this.products = JSON.parse(localStorage.getItem('compare') || '[]');
    this.maxCompare = 4;
    this.init();
  }

  init() {
    this.attachEventListeners();
    this.updateCompareButton();
  }

  attachEventListeners() {
    document.querySelectorAll('[data-compare]').forEach(btn => {
      btn.addEventListener('click', () => {
        const productId = btn.dataset.compare;
        if (this.isInCompare(productId)) {
          this.removeFromCompare(productId);
          btn.classList.remove('active');
        } else {
          if (this.products.length >= this.maxCompare) {
            if (window.notifications) {
              window.notifications.show(`最多只能对比 ${this.maxCompare} 个产品`, 'error');
            }
            return;
          }
          this.addToCompare(productId);
          btn.classList.add('active');
        }
      });
    });
  }

  addToCompare(productId) {
    if (!this.isInCompare(productId)) {
      this.products.push(productId);
      this.save();
      this.updateCompareButton();
      
      if (window.notifications) {
        window.notifications.show('已添加到对比', 'success');
      }
    }
  }

  removeFromCompare(productId) {
    this.products = this.products.filter(id => id !== productId);
    this.save();
    this.updateCompareButton();
  }

  isInCompare(productId) {
    return this.products.includes(productId);
  }

  updateCompareButton() {
    document.querySelectorAll('.compare-count').forEach(el => {
      el.textContent = this.products.length;
      el.style.display = this.products.length > 0 ? 'inline' : 'none';
    });

    // Update button states
    document.querySelectorAll('[data-compare]').forEach(btn => {
      if (this.isInCompare(btn.dataset.compare)) {
        btn.classList.add('active');
        btn.textContent = '已加入对比';
      } else {
        btn.classList.remove('active');
        btn.textContent = '加入对比';
      }
    });
  }

  save() {
    localStorage.setItem('compare', JSON.stringify(this.products));
  }

  clear() {
    this.products = [];
    this.save();
    this.updateCompareButton();
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.productCompare = new ProductCompare();
});
