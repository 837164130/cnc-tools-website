// Floating Compare Button
class CompareFloat {
  constructor() {
    this.init();
  }

  init() {
    this.compareCount = 0;
    this.createButton();
    this.updateCount();
  }

  createButton() {
    const btn = document.createElement('div');
    btn.className = 'compare-float-btn';
    btn.style.cssText = `
      position: fixed;
      bottom: 100px;
      right: 24px;
      width: 56px;
      height: 56px;
      background: var(--accent);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 4px 16px rgba(0,0,0,0.2);
      z-index: 999;
      transition: transform 0.3s, box-shadow 0.3s;
      font-size: 24px;
    `;
    btn.innerHTML = `
      <span>⚖️</span>
      <span class="compare-badge" style="position: absolute; top: -4px; right: -4px; width: 24px; height: 24px; background: #ff3b30; color: white; border-radius: 50%; font-size: 12px; display: flex; align-items: center; justify-content: center; font-weight: 700;">0</span>
    `;

    btn.addEventListener('mouseenter', () => {
      btn.style.transform = 'scale(1.1)';
      btn.style.boxShadow = '0 6px 24px rgba(0,0,0,0.3)';
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'scale(1)';
      btn.style.boxShadow = '0 4px 16px rgba(0,0,0,0.2)';
    });

    btn.addEventListener('click', () => {
      window.location.href = 'compare.html';
    });

    document.body.appendChild(btn);
    this.badge = btn.querySelector('.compare-badge');
  }

  updateCount() {
    const compareList = JSON.parse(localStorage.getItem('compareList') || '[]');
    this.compareCount = compareList.length;
    
    if (this.badge) {
      this.badge.textContent = this.compareCount;
      this.badge.style.display = this.compareCount > 0 ? 'flex' : 'none';
    }
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.compareFloat = new CompareFloat();
});
