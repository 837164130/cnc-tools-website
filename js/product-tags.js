// Product Tags
class ProductTags {
  constructor() {
    this.init();
  }

  init() {
    this.attachEventListeners();
    this.displayTags();
  }

  attachEventListeners() {
    document.querySelectorAll('[data-tag-input]').forEach(input => {
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          this.addTag(input);
        }
      });
    });
  }

  addTag(input) {
    const value = input.value.trim();
    if (!value) return;

    const container = input.closest('[data-tags]');
    if (!container) return;

    const tags = this.getTags(container);
    if (!tags.includes(value)) {
      tags.push(value);
      this.saveTags(container, tags);
      this.displayTags();
    }

    input.value = '';
  }

  removeTag(container, tagToRemove) {
    const tags = this.getTags(container).filter(tag => tag !== tagToRemove);
    this.saveTags(container, tags);
    this.displayTags();
  }

  getTags(container) {
    const productId = container.dataset.tags;
    return JSON.parse(localStorage.getItem(`tags_${productId}`) || '[]');
  }

  saveTags(container, tags) {
    const productId = container.dataset.tags;
    localStorage.setItem(`tags_${productId}`, JSON.stringify(tags));
  }

  displayTags() {
    document.querySelectorAll('[data-tags]').forEach(container => {
      const tags = this.getTags(container);
      const display = container.querySelector('.tags-display') || container;

      let html = '';
      tags.forEach(tag => {
        html += `
          <span style="
            display: inline-flex;
            align-items: center;
            gap: 4px;
            padding: 4px 12px;
            background: var(--bg-secondary);
            border-radius: 16px;
            font-size: 14px;
            margin: 4px;
          ">
            ${tag}
            <button class="remove-tag" data-tag="${tag}" style="
              background: none;
              border: none;
              cursor: pointer;
              padding: 0;
              font-size: 16px;
              line-height: 1;
            ">×</button>
          </span>
        `;
      });

      // Add input if editable
      const input = container.querySelector('[data-tag-input]');
      if (input) {
        html = `<div class="tags-list" style="display: flex; flex-wrap: wrap; gap: 4px; margin-bottom: 8px;">${html}</div>`;
      }

      if (input) {
        display.innerHTML = html;
        display.appendChild(input);
      } else {
        display.innerHTML = html;
      }

      // Attach remove handlers
      display.querySelectorAll('.remove-tag').forEach(btn => {
        btn.addEventListener('click', () => {
          this.removeTag(container, btn.dataset.tag);
        });
      });
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ProductTags();
});
