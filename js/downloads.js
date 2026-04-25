// Technical Documents Download
class DocumentDownloads {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('[data-downloads]').forEach(container => {
      this.setupDownloads(container);
    });
  }

  setupDownloads(container) {
    const documents = JSON.parse(container.dataset.downloads || '[]');
    if (documents.length === 0) return;

    container.innerHTML = `
      <h3 style="margin-bottom: 20px;">技术文档</h3>
      <div style="display: flex; flex-direction: column; gap: 12px;">
        ${documents.map(doc => `
          <div class="doc-item" style="display: flex; align-items: center; padding: 16px; background: var(--bg-secondary); border-radius: 12px; transition: background 0.2s; cursor: pointer;" onmouseover="this.style.background='var(--bg-tertiary)'" onmouseout="this.style.background='var(--bg-secondary)'">
            <div style="width: 48px; height: 48px; background: var(--accent); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-right: 16px; flex-shrink: 0;">
              <span style="font-size: 24px;">${this.getFileIcon(doc.type)}</span>
            </div>
            <div style="flex: 1; min-width: 0;">
              <div style="font-weight: 600; margin-bottom: 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${doc.name}</div>
              <div style="font-size: 12px; color: var(--text-secondary);">${doc.type.toUpperCase()} · ${doc.size}</div>
            </div>
            <button class="download-btn" data-url="${doc.url}" style="padding: 8px 16px; background: var(--accent); color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 14px; display: flex; align-items: center; gap: 6px; transition: opacity 0.2s;" onmouseover="this.style.opacity='0.9'" onmouseout="this.style.opacity='1'">
              <span>⬇️</span>
              <span>下载</span>
            </button>
          </div>
        `).join('')}
      </div>
    `;

    container.querySelectorAll('.download-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const url = btn.dataset.url;
        this.downloadFile(url);
      });
    });
  }

  getFileIcon(type) {
    const icons = {
      pdf: '📄',
      dwg: '📐',
      step: '🔧',
      zip: '📦',
      doc: '📝',
      xls: '📊'
    };
    return icons[type] || '📎';
  }

  downloadFile(url) {
    const link = document.createElement('a');
    link.href = url;
    link.download = url.split('/').pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    if (window.notifications) {
      window.notifications.show('文件下载已开始', 'success');
    }
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new DocumentDownloads();
});
