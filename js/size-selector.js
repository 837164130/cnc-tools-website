// Product Size Selector
class SizeSelector {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('[data-size-selector]').forEach(container => {
      this.setupSelector(container);
    });
  }

  setupSelector(container) {
    const sizes = JSON.parse(container.dataset.sizes || '[]');
    if (sizes.length === 0) return;

    container.innerHTML = `
      <div style="margin-bottom: 16px;">
        <label style="display: block; font-weight: 600; margin-bottom: 12px;">选择规格</label>
        <div style="display: flex; flex-wrap: wrap; gap: 12px;">
          ${sizes.map((size, index) => `
            <button 
              class="size-option" 
              data-size="${size.value}"
              data-price="${size.price}"
              style="
                padding: 12px 20px;
                border: 2px solid var(--border);
                border-radius: 8px;
                background: var(--bg-primary);
                cursor: pointer;
                transition: all 0.3s;
                font-size: 14px;
              "
            >
              <div style="font-weight: 600;">${size.label}</div>
              <div style="font-size: 12px; color: var(--text-secondary); margin-top: 4px;">${size.price}</div>
            </button>
          `).join('')}
        </div>
      </div>
      <div class="selected-size-info" style="padding: 16px; background: var(--bg-secondary); border-radius: 8px; display: none;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <div style="font-weight: 600; margin-bottom: 4px;">已选择: <span class="selected-size-label"></span></div>
            <div style="color: var(--text-secondary); font-size: 14px;">价格: <span class="selected-size-price" style="color: var(--accent); font-weight: 700; font-size: 18px;"></span></div>
          </div>
          <button class="btn btn-primary inquiry-btn" style="padding: 12px 24px;">立即询价</button>
        </div>
      </div>
    `;

    const buttons = container.querySelectorAll('.size-option');
    const infoPanel = container.querySelector('.selected-size-info');
    const labelSpan = container.querySelector('.selected-size-label');
    const priceSpan = container.querySelector('.selected-size-price');
    const inquiryBtn = container.querySelector('.inquiry-btn');

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => {
          b.style.borderColor = 'var(--border)';
          b.style.background = 'var(--bg-primary)';
          b.style.color = '';
        });

        btn.style.borderColor = 'var(--accent)';
        btn.style.background = 'var(--accent)';
        btn.style.color = 'white';

        const size = btn.dataset.size;
        const price = btn.dataset.price;

        labelSpan.textContent = size;
        priceSpan.textContent = price;
        infoPanel.style.display = 'block';
        infoPanel.style.animation = 'fadeInUp 0.3s';

        inquiryBtn.onclick = () => {
          window.location.href = `contact.html?product=${encodeURIComponent(size)}&price=${encodeURIComponent(price)}`;
        };
      });
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new SizeSelector();
});
