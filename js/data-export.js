// Data Export Functionality
class DataExport {
  constructor() {
    this.init();
  }

  init() {
    this.addExportButtons();
  }

  addExportButtons() {
    // Add export button to product detail pages
    const productSpecs = document.querySelector('.specs-table');
    if (productSpecs) {
      const exportBtn = document.createElement('button');
      exportBtn.className = 'export-btn';
      exportBtn.innerHTML = '📥 导出规格';
      exportBtn.style.cssText = `
        padding: 8px 16px;
        background: var(--bg-secondary);
        border: 1px solid var(--border);
        border-radius: 8px;
        cursor: pointer;
        font-size: 14px;
        margin-top: 16px;
        transition: all 0.3s;
      `;
      
      exportBtn.addEventListener('click', () => this.exportSpecs(productSpecs));
      productSpecs.parentNode.appendChild(exportBtn);
    }
  }

  exportSpecs(table) {
    const rows = table.querySelectorAll('tr');
    let csv = '规格,数值\n';
    
    rows.forEach(row => {
      const cells = row.querySelectorAll('td, th');
      if (cells.length >= 2) {
        const spec = cells[0].textContent.trim();
        const value = cells[1].textContent.trim();
        csv += `"${spec}","${value}"\n`;
      }
    });

    this.downloadFile(csv, 'product-specs.csv', 'text/csv');
    
    if (window.notifications) {
      window.notifications.show('规格表已导出', 'success');
    }
  }

  downloadFile(content, filename, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new DataExport();
});
