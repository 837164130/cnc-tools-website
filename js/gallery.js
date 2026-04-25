// Product Thumbnail Gallery
class ThumbnailGallery {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('[data-gallery]').forEach(el => {
      this.setupGallery(el);
    });
  }

  setupGallery(element) {
    const images = JSON.parse(element.dataset.gallery || '[]');
    if (images.length === 0) return;

    let currentIndex = 0;

    // Create main image container
    const mainContainer = document.createElement('div');
    mainContainer.className = 'gallery-main';
    mainContainer.style.cssText = `
      position: relative;
      width: 100%;
      height: 400px;
      background: var(--bg-secondary);
      border-radius: 12px;
      overflow: hidden;
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
    `;

    const mainImg = document.createElement('img');
    mainImg.src = images[0];
    mainImg.style.cssText = `
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
      transition: opacity 0.3s;
    `;
    mainContainer.appendChild(mainImg);

    // Navigation arrows
    if (images.length > 1) {
      const prevBtn = document.createElement('button');
      prevBtn.innerHTML = '‹';
      prevBtn.style.cssText = `
        position: absolute;
        left: 16px;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(0,0,0,0.5);
        color: white;
        border: none;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        font-size: 24px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
      `;

      const nextBtn = document.createElement('button');
      nextBtn.innerHTML = '›';
      nextBtn.style.cssText = prevBtn.style.cssText.replace('left: 16px', 'right: 16px');

      mainContainer.appendChild(prevBtn);
      mainContainer.appendChild(nextBtn);

      prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        this.updateMainImage(mainImg, images[currentIndex]);
        this.updateThumbnails(thumbnails, currentIndex);
      });

      nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length;
        this.updateMainImage(mainImg, images[currentIndex]);
        this.updateThumbnails(thumbnails, currentIndex);
      });
    }

    element.appendChild(mainContainer);

    // Create thumbnail strip
    if (images.length > 1) {
      const thumbnailContainer = document.createElement('div');
      thumbnailContainer.style.cssText = `
        display: flex;
        gap: 8px;
        overflow-x: auto;
        padding: 4px;
      `;

      const thumbnails = [];

      images.forEach((src, index) => {
        const thumb = document.createElement('div');
        thumb.style.cssText = `
          min-width: 80px;
          height: 80px;
          background: var(--bg-secondary);
          border-radius: 8px;
          overflow: hidden;
          cursor: pointer;
          border: 2px solid ${index === 0 ? '#0071e3' : 'transparent'};
          transition: border-color 0.2s;
        `;

        const thumbImg = document.createElement('img');
        thumbImg.src = src;
        thumbImg.style.cssText = `
          width: 100%;
          height: 100%;
          object-fit: cover;
        `;

        thumb.appendChild(thumbImg);
        thumbnailContainer.appendChild(thumb);
        thumbnails.push(thumb);

        thumb.addEventListener('click', () => {
          currentIndex = index;
          this.updateMainImage(mainImg, src);
          this.updateThumbnails(thumbnails, currentIndex);
        });
      });

      element.appendChild(thumbnailContainer);
    }
  }

  updateMainImage(img, src) {
    img.style.opacity = '0';
    setTimeout(() => {
      img.src = src;
      img.style.opacity = '1';
    }, 150);
  }

  updateThumbnails(thumbnails, activeIndex) {
    thumbnails.forEach((thumb, index) => {
      thumb.style.borderColor = index === activeIndex ? '#0071e3' : 'transparent';
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ThumbnailGallery();
});
