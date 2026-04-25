// Product Specifications Table
class SpecsTable {
  constructor() {
    this.init();
  }

  init() {
    this.displaySpecs();
  }

  displaySpecs() {
    const container = document.querySelector('[data-specs-table]');
    if (!container) return;

    const specs = JSON.parse(container.dataset.specsTable || '{}');
    if (Object.keys(specs).length === 0) return;

    container.innerHTML = '<h3 style="margin-bottom: 16px;">技术规格</h3>';

    const table = document.createElement('table');
    table.style.cssText = `
      width: 100%;
      border-collapse: collapse;
      background: var(--bg-secondary);
      border-radius: 12px;
      overflow: hidden;
    `;

    let html = '';
    Object.entries(specs).forEach(([key, value], index) => {
      html += `
        <tr style="
          border-bottom: 1px solid var(--border);
          ${index % 2 === 0 ? 'background: var(--bg-primary);' : ''}
        ">
          <td style="
            padding: 12px 16px;
            font-weight: 600;
            width: 40%;
            color: var(--text-secondary);
          ">${key}</td>
          <td style="padding: 12px 16px;">${value}</td>
        </tr>
      `;
    });

    table.innerHTML = html;
    container.appendChild(table);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new SpecsTable();
});
