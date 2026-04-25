// Quick Preview on Hover
class QuickPreview {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('[data-quick-preview]').forEach(el => {
      this.setupPreview(el);
    });
  }

  setupPreview(element) {
    const preview = document.createElement('div');
    preview.className = 'quick-preview';
    preview.style.cssText = `
      position: fixed;
      background: var(--bg-primary);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 16px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.15);
      z-index: 1000;
      display: none;
      max-width: 300px;
      pointer-events: none;
    `;

    // Get preview content from data attribute or clone element
    const previewContent = element.dataset.quickPreview;
    if (previewContent) {
      preview.innerHTML = previewContent;
    } else {
      const clone = element.cloneNode(true);
      preview.appendChild(clone);
    }

    document.body.appendChild(preview);

    element.addEventListener('mouseenter', () => {
      preview.style.display = 'block';
    });

    element.addEventListener('mousemove', (e) => {
      preview.style.left = (e.clientX + 20) + 'px';
      preview.style.top = (e.clientY + 20) + 'px';
    });

    element.addEventListener('mouseleave', () => {
      preview.style.display = 'none';
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new QuickPreview();
});
