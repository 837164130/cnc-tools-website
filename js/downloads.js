// Product Downloads
class ProductDownloads {
  constructor() {
    this.init();
  }

  init() {
    this.attachEventListeners();
    this.displayDownloads();
  }

  attachEventListeners() {
    document.querySelectorAll('[data-download]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.downloadFile(btn.dataset.download, btn.dataset.filename);
      });
    });
  }

  async downloadFile(url, filename) {
    try {
      // Show loading state
      if (window.notifications) {
        window.notifications.show('正在下载...', 'info');
      }

      const response = await fetch(url);
      const blob = await response.blob();
      
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = filename || 'download';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);

      if (window.notifications) {
        window.notifications.show('下载完成', 'success');
      }
    } catch (error) {
      if (window.notifications) {
        window.notifications.show('下载失败', 'error');
      }
    }
  }

  displayDownloads() {
    const container = document.querySelector('[data-downloads]');
    if (!container) return;

    const downloads = JSON.parse(container.dataset.downloads || '[]');
    if (downloads.length === 0) return;

    let html = '<h3 style="margin-bottom: 16px;">下载资料</h3>';
    html += '<div class="downloads-list">';

    downloads.forEach(file => {
      html += `
        <div style="
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px;
          background: var(--bg-secondary);
          border-radius: 8px;
          margin-bottom: 8px;
        ">
          <div style="display: flex; align-items: center; gap: 12px;">
            <span style="font-size: 24px;">📄</span>
            <div>
              <div style="font-weight: 600;">${file.name}</div>
              <div style="font-size: 12px; color: var(--text-secondary);">${file.size} • ${file.type}</div>
            </div>
          </div>
          <button data-download="${file.url}" data-filename="${file.name}" style="
            padding: 8px 16px;
            background: var(--bg-tertiary);
            border: 1px solid var(--border);
            border-radius: 8px;
            cursor: pointer;
            font-size: 14px;
          ">下载</button>
        </div>
      `;
    });

    html += '</div>';
    container.innerHTML = html;

    // Re-attach event listeners for new buttons
    container.querySelectorAll('[data-download]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.downloadFile(btn.dataset.download, btn.dataset.filename);
      });
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ProductDownloads();
});
