// Drag and Drop Sorting
class DragSort {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('[data-sortable]').forEach(container => {
      this.setupSortable(container);
    });
  }

  setupSortable(container) {
    let draggedItem = null;

    container.querySelectorAll('[data-sortable-item]').forEach(item => {
      item.draggable = true;
      item.style.cursor = 'move';

      item.addEventListener('dragstart', (e) => {
        draggedItem = item;
        item.style.opacity = '0.5';
        e.dataTransfer.effectAllowed = 'move';
      });

      item.addEventListener('dragend', () => {
        item.style.opacity = '1';
        draggedItem = null;
      });

      item.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';

        if (draggedItem && draggedItem !== item) {
          const rect = item.getBoundingClientRect();
          const midY = rect.top + rect.height / 2;

          if (e.clientY < midY) {
            container.insertBefore(draggedItem, item);
          } else {
            container.insertBefore(draggedItem, item.nextSibling);
          }
        }
      });
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new DragSort();
});
