// Batch Actions for Product Lists
class BatchActions {
  constructor() {
    this.init();
  }

  init() {
    this.container = document.querySelector('[data-batch-actions]');
    if (!this.container) return;

    this.selectedItems = new Set();
    this.setupCheckboxes();
    this.setupBatchToolbar();
  }

  setupCheckboxes() {
    this.container.querySelectorAll('[data-batch-item]').forEach(item => {
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.style.cssText = `
        position: absolute;
        top: 12px;
        left: 12px;
        width: 20px;
        height: 20px;
        cursor: pointer;
        z-index: 10;
      `;

      checkbox.addEventListener('change', (e) => {
        if (e.target.checked) {
          this.selectedItems.add(item);
          item.style.boxShadow = '0 0 0 2px var(--accent)';
        } else {
          this.selectedItems.delete(item);
          item.style.boxShadow = '';
        }
        this.updateToolbar();
      });

      item.style.position = 'relative';
      item.appendChild(checkbox);
    });
  }

  setupBatchToolbar() {
    const toolbar = document.createElement('div');
    toolbar.className = 'batch-toolbar';
    toolbar.style.cssText = `
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%) translateY(100px);
      background: var(--bg-primary);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 12px 24px;
      display: flex;
      gap: 16px;
      align-items: center;
      box-shadow: 0 4px 20px rgba(0,0,0,0.15);
      z-index: 1000;
      transition: transform 0.3s;
    `;

    toolbar.innerHTML = `
      <span class="batch-count" style="font-weight: 600;">已选择 0 项</span>
      <button class="batch-compare" style="padding: 8px 16px; background: var(--accent); color: white; border: none; border-radius: 8px; cursor: pointer;">对比</button>
      <button class="batch-inquiry" style="padding: 8px 16px; background: var(--accent); color: white; border: none; border-radius: 8px; cursor: pointer;">批量询价</button>
      <button class="batch-clear" style="padding: 8px 16px; background: transparent; border: 1px solid var(--border); border-radius: 8px; cursor: pointer;">清除</button>
    `;

    document.body.appendChild(toolbar);
    this.toolbar = toolbar;

    toolbar.querySelector('.batch-compare').addEventListener('click', () => this.compareSelected());
    toolbar.querySelector('.batch-inquiry').addEventListener('click', () => this.inquirySelected());
    toolbar.querySelector('.batch-clear').addEventListener('click', () => this.clearSelection());
  }

  updateToolbar() {
    const count = this.selectedItems.size;
    const countEl = this.toolbar.querySelector('.batch-count');
    countEl.textContent = `已选择 ${count} 项`;

    if (count > 0) {
      this.toolbar.style.transform = 'translateX(-50%) translateY(0)';
    } else {
      this.toolbar.style.transform = 'translateX(-50%) translateY(100px)';
    }
  }

  compareSelected() {
    const ids = Array.from(this.selectedItems).map(item => item.dataset.productId);
    window.location.href = `compare.html?products=${ids.join(',')}`;
  }

  inquirySelected() {
    const names = Array.from(this.selectedItems).map(item => {
      return item.querySelector('.product-name')?.textContent || '';
    }).filter(n => n);

    window.location.href = `contact.html?products=${encodeURIComponent(names.join(', '))}`;
  }

  clearSelection() {
    this.selectedItems.forEach(item => {
      const checkbox = item.querySelector('input[type="checkbox"]');
      if (checkbox) checkbox.checked = false;
      item.style.boxShadow = '';
    });
    this.selectedItems.clear();
    this.updateToolbar();
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new BatchActions();
});
