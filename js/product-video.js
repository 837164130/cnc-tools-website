// Product Video
class ProductVideo {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('[data-product-video]').forEach(el => {
      this.setupVideo(el);
    });
  }

  setupVideo(element) {
    const videoUrl = element.dataset.productVideo;
    const thumbnail = element.querySelector('img');

    element.style.cursor = 'pointer';
    element.style.position = 'relative';

    // Add play button overlay
    const playBtn = document.createElement('div');
    playBtn.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 64px;
      height: 64px;
      background: rgba(0,0,0,0.7);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 24px;
      transition: transform 0.2s;
    `;
    playBtn.innerHTML = '▶';
    element.appendChild(playBtn);

    element.addEventListener('mouseenter', () => {
      playBtn.style.transform = 'translate(-50%, -50%) scale(1.1)';
    });

    element.addEventListener('mouseleave', () => {
      playBtn.style.transform = 'translate(-50%, -50%) scale(1)';
    });

    element.addEventListener('click', () => {
      this.openVideoModal(videoUrl);
    });
  }

  openVideoModal(videoUrl) {
    const modal = document.createElement('div');
    modal.className = 'video-modal';
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.9);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      padding: 40px;
    `;

    modal.innerHTML = `
      <div style="position: relative; width: 100%; max-width: 900px; aspect-ratio: 16/9;">
        <button class="close-video-modal" style="position: absolute; top: -40px; right: 0; background: none; border: none; color: white; font-size: 24px; cursor: pointer;">✕</button>
        <iframe 
          src="${videoUrl}" 
          style="width: 100%; height: 100%; border: none; border-radius: 12px;"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen>
        </iframe>
      </div>
    `;

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    modal.querySelector('.close-video-modal').addEventListener('click', () => {
      modal.remove();
      document.body.style.overflow = '';
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.remove();
        document.body.style.overflow = '';
      }
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ProductVideo();
});
