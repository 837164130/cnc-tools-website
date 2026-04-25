// Product Gift Cards
class ProductGiftCards {
  constructor() {
    this.init();
  }

  init() {
    this.displayGiftCards();
  }

  displayGiftCards() {
    const container = document.querySelector('[data-gift-cards]');
    if (!container) return;

    const cards = JSON.parse(container.dataset.giftCards || '[]');
    if (cards.length === 0) return;

    container.innerHTML = '<h3 style="margin-bottom: 24px;">礼品卡</h3>';

    const grid = document.createElement('div');
    grid.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 16px;';

    cards.forEach(card => {
      const el = document.createElement('div');
      el.style.cssText = `
        padding: 24px;
        background: linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%);
        border-radius: 16px;
        text-align: center;
        border: 1px solid var(--border);
        transition: transform 0.2s, box-shadow 0.2s;
        cursor: pointer;
      `;

      el.innerHTML = `
        <div style="font-size: 48px; margin-bottom: 12px;">${card.icon || '🎁'}</div>
        <div style="font-size: 28px; font-weight: 700; color: #0071e3; margin-bottom: 4px;">${card.value}</div>
        <div style="font-size: 14px; color: var(--text-secondary); margin-bottom: 16px;">${card.name}</div>
        <button style="
          width: 100%;
          padding: 10px;
          background: #0071e3;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
        ">购买</button>
      `;

      el.addEventListener('mouseenter', () => {
        el.style.transform = 'translateY(-4px)';
        el.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)';
      });

      el.addEventListener('mouseleave', () => {
        el.style.transform = '';
        el.style.boxShadow = '';
      });

      grid.appendChild(el);
    });

    container.appendChild(grid);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ProductGiftCards();
});
