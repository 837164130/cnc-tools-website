// Enhanced Specifications Table
class SpecsTable {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('[data-specs-table]').forEach(container => {
      this.setupTable(container);
    });
  }

  setupTable(container) {
    const specs = JSON.parse(container.dataset.specsTable || '[]');
    if (specs.length === 0) return;

    container.innerHTML = `
      <div style="overflow-x: auto;">
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <thead>
            <tr style="background: var(--bg-secondary);">
              <th style="padding: 14px 16px; text-align: left; font-weight: 600; border-bottom: 2px solid var(--border); white-space: nowrap;">参数</th>
              <th style="padding: 14px 16px; text-align: left; font-weight: 600; border-bottom: 2px solid var(--border); white-space: nowrap;">数值</th>
              <th style="padding: 14px 16px; text-align: left; font-weight: 600; border-bottom: 2px solid var(--border); white-space: nowrap;">说明</th>
            </tr>
          </thead>
          <tbody>
            ${specs.map((spec, index) => `
              <tr style="background: ${index % 2 === 0 ? 'var(--bg-primary)' : 'var(--bg-secondary)'}; transition: background 0.2s;" onmouseover="this.style.background='var(--bg-tertiary)'" onmouseout="this.style.background='${index % 2 === 0 ? 'var(--bg-primary)' : 'var(--bg-secondary)'}'">
                <td style="padding: 12px 16px; border-bottom: 1px solid var(--border); font-weight: 600; white-space: nowrap;">${spec.name}</td>
                <td style="padding: 12px 16px; border-bottom: 1px solid var(--border); color: var(--accent); font-weight: 600;">${spec.value}</td>
                <td style="padding: 12px 16px; border-bottom: 1px solid var(--border); color: var(--text-secondary); font-size: 13px;">${spec.description || '-'}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
      <div style="margin-top: 16px; display: flex; gap: 12px;">
        <button class="export-specs-btn" style="padding: 10px 20px; background: var(--bg-secondary); border: 1px solid var(--border); border-radius: 8px; cursor: pointer; font-size: 14px; display: flex; align-items: center; gap: 8px; transition: all 0.2s;" onmouseover="this.style.borderColor='var(--accent)'" onmouseout="this.style.borderColor='var(--border)'">
          <span>📥</span>
          <span>导出规格</span>
        </button>
        <button class="print-specs-btn" style="padding: 10px 20px; background: var(--bg-secondary); border: 1px solid var(--border); border-radius: 8px; cursor: pointer; font-size: 14px; display: flex; align-items: center; gap: 8px; transition: all 0.2s;" onmouseover="this.style.borderColor='var(--accent)'" onmouseout="this.style.borderColor='var(--border)'">
          <span>🖨️</span>
          <span>打印规格</span>
        </button>
      </div>
    `;

    const exportBtn = container.querySelector('.export-specs-btn');
    const printBtn = container.querySelector('.print-specs-btn');

    exportBtn.addEventListener('click', () => {
      this.exportSpecs(specs);
    });

    printBtn.addEventListener('click', () => {
      window.print();
    });
  }

  exportSpecs(specs) {
    let csv = '参数,数值,说明\n';
    specs.forEach(spec => {
      csv += `"${spec.name}","${spec.value}","${spec.description || ''}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'product-specs.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    if (window.notifications) {
      window.notifications.show('规格表已导出', 'success');
    }
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new SpecsTable();
});
