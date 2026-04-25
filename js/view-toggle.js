// Product View Toggle (Grid/List)
class ViewToggle {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('[data-view-toggle]').forEach(container => {
      this.setupToggle(container);
    });
  }

  setupToggle(container) {
    const targetSelector = container.dataset.viewToggle;
    const target = document.querySelector(targetSelector);
    if (!target) return;

    container.innerHTML = `
      <div style="display: flex; gap: 8px; background: var(--bg-secondary); padding: 4px; border-radius: 10px;">
        <button class="view-grid active" style="
          padding: 8px 12px;
          background: var(--bg-primary);
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 18px;
          transition: all 0.2s;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        ">⊞</button>
        <button class="view-list" style="
          padding: 8px 12px;
          background: transparent;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 18px;
          transition: all 0.2s;
          opacity: 0.6;
        ">☰</button>
      </div>
    `;

    const gridBtn = container.querySelector('.view-grid');
    const listBtn = container.querySelector('.view-list');

    gridBtn.addEventListener('click', () => {
      this.setGridView(gridBtn, listBtn, target);
    });

    listBtn.addEventListener('click', () => {
      this.setListView(gridBtn, listBtn, target);
    });
  }

  setGridView(gridBtn, listBtn, target) {
    gridBtn.style.background = 'var(--bg-primary)';
    gridBtn.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
    gridBtn.style.opacity = '1';

    listBtn.style.background = 'transparent';
    listBtn.style.boxShadow = 'none';
    listBtn.style.opacity = '0.6';

    target.style.display = 'grid';
    target.style.gridTemplateColumns = 'repeat(auto-fill, minmax(280px, 1fr))';

    target.querySelectorAll('.product-card').forEach(card => {
      card.style.flexDirection = 'column';
    });
  }

  setListView(gridBtn, listBtn, target) {
    listBtn.style.background = 'var(--bg-primary)';
    listBtn.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
    listBtn.style.opacity = '1';

    gridBtn.style.background = 'transparent';
    gridBtn.style.boxShadow = 'none';
    gridBtn.style.opacity = '0.6';

    target.style.display = 'flex';
    target.style.flexDirection = 'column';

    target.querySelectorAll('.product-card').forEach(card => {
      card.style.flexDirection = 'row';
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ViewToggle();
});
