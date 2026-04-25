// Batch Actions
class BatchActions {
  constructor() {
    this.init();
  }

  init() {
    this.setupBatchSelection();
    this.setupBatchActions();
  }

  setupBatchSelection() {
    document.querySelectorAll('[data-batch-select]').forEach(container => {
      const checkboxes = container.querySelectorAll('[data-batch-item]');
      const selectAll = container.querySelector('[data-select-all]');

      if (selectAll) {
        selectAll.addEventListener('change', () => {
          checkboxes.forEach(cb => {
            cb.checked = selectAll.checked;
          });
          this.updateBatchActions(container);
        });
      }

      checkboxes.forEach(cb => {
        cb.addEventListener('change', () => {
          this.updateBatchActions(container);
        });
      });
    });
  }

  setupBatchActions() {
    document.querySelectorAll('[data-batch-action]').forEach(btn => {
      btn.addEventListener('click', () => {
        const action = btn.dataset.batchAction;
        const selected = document.querySelectorAll('[data-batch-item]:checked');
        
        selected.forEach(item => {
          const card = item.closest('.product-card');
          if (card) {
            this.performAction(action, card);
          }
        });
      });
    });
  }

  updateBatchActions(container) {
    const selected = container.querySelectorAll('[data-batch-item]:checked');
    const batchBar = document.querySelector('.batch-actions-bar');
    
    if (batchBar) {
      batchBar.style.display = selected.length > 0 ? 'flex' : 'none';
      const countEl = batchBar.querySelector('.selected-count');
      if (countEl) {
        countEl.textContent = selected.length;
      }
    }
  }

  performAction(action, card) {
    switch(action) {
      case 'compare':
        card.classList.toggle('in-compare');
        break;
      case 'favorite':
        card.classList.toggle('in-favorites');
        break;
      case 'delete':
        card.remove();
        break;
    }
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new BatchActions();
});
