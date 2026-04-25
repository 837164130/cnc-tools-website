// Product Packing List
class PackingList {
  constructor() {
    this.init();
  }

  init() {
    this.displayPackingList();
  }

  displayPackingList() {
    const container = document.querySelector('[data-packing]');
    if (!container) return;

    const items = JSON.parse(container.dataset.packing || '[]');
    if (items.length === 0) return;

    container.innerHTML = '<h3 style="margin-bottom: 16px;">包装清单</h3>';

    const list = document.createElement('div');
    list.style.cssText = `
      padding: 20px;
      background: var(--bg-secondary);
      border-radius: 12px;
    `;

    let html = '<div style="display: grid; gap: 8px;">';
    
    items.forEach(item => {
      html += `
        <div style="
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 0;
          border-bottom: 1px solid var(--border);
        ">
          <div style="
            width: 24px;
            height: 24px;
            background: #0071e3;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 12px;
            font-weight: 600;
            flex-shrink: 0;
          ">✓</div>
          <div style="flex: 1;">${item.name}</div>
          ${item.quantity ? `<div style="color: var(--text-secondary); font-size: 14px;">x${item.quantity}</div>` : ''}
        </div>
      `;
    });

    html += '</div>';
    list.innerHTML = html;
    container.appendChild(list);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new PackingList();
});
