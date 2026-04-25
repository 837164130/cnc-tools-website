// Page Loader with Progress Bar
class PageLoader {
  constructor() {
    this.init();
  }

  init() {
    this.createLoader();
    this.trackProgress();
  }

  createLoader() {
    const loader = document.createElement('div');
    loader.id = 'pageLoader';
    loader.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: var(--bg, #ffffff);
      z-index: 99999;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      transition: opacity 0.5s ease, visibility 0.5s ease;
    `;

    loader.innerHTML = `
      <div style="font-size: 32px; font-weight: 700; margin-bottom: 20px; color: var(--text, #1d1d1f);">CCCNC</div>
      <div style="width: 200px; height: 4px; background: var(--bg-secondary, #f5f5f7); border-radius: 2px; overflow: hidden;">
        <div id="loaderProgress" style="width: 0%; height: 100%; background: var(--primary, #0071e3); border-radius: 2px; transition: width 0.3s ease;"></div>
      </div>
      <div id="loaderText" style="margin-top: 12px; font-size: 14px; color: var(--text-secondary, #86868b);">加载中...</div>
    `;

    document.body.appendChild(loader);
    this.loader = loader;
    this.progress = document.getElementById('loaderProgress');
    this.text = document.getElementById('loaderText');
  }

  trackProgress() {
    let loaded = 0;
    const total = document.images.length;

    if (total === 0) {
      this.complete();
      return;
    }

    const updateProgress = () => {
      loaded++;
      const percent = (loaded / total) * 100;
      this.progress.style.width = percent + '%';
      this.text.textContent = `加载中... ${Math.round(percent)}%`;

      if (loaded >= total) {
        this.complete();
      }
    };

    Array.from(document.images).forEach(img => {
      if (img.complete) {
        updateProgress();
      } else {
        img.addEventListener('load', updateProgress);
        img.addEventListener('error', updateProgress);
      }
    });

    // Fallback: hide loader after 3 seconds
    setTimeout(() => this.complete(), 3000);
  }

  complete() {
    this.progress.style.width = '100%';
    this.text.textContent = '完成';

    setTimeout(() => {
      this.loader.style.opacity = '0';
      this.loader.style.visibility = 'hidden';
      setTimeout(() => {
        this.loader.remove();
      }, 500);
    }, 300);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new PageLoader();
});
