// Product Image Gallery
class ProductGallery {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('[data-product-gallery]').forEach(container => {
      this.setupGallery(container);
    });
  }

  setupGallery(container) {
    const images = JSON.parse(container.dataset.productGallery || '[]');
    if (images.length === 0) return;

    let currentIndex = 0;

    container.innerHTML = `
      <div style="position: relative;">
        <div class="gallery-main" style="position: relative; width: 100%; aspect-ratio: 4/3; background: var(--bg-secondary); border-radius: 16px; overflow: hidden; cursor: zoom-in;">
          <img src="${images[0]}" alt="" style="width: 100%; height: 100%; object-fit: contain; transition: opacity 0.3s;">
          <button class="gallery-prev" style="position: absolute; left: 16px; top: 50%; transform: translateY(-50%); width: 44px; height: 44px; background: rgba(0,0,0,0.5); border: none; border-radius: 50%; color: white; font-size: 20px; cursor: pointer; display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.3s;">‹</button>
          <button class="gallery-next" style="position: absolute; right: 16px; top: 50%; transform: translateY(-50%); width: 44px; height: 44px; background: rgba(0,0,0,0.5); border: none; border-radius: 50%; color: white; font-size: 20px; cursor: pointer; display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.3s;">›</button>
          <div style="position: absolute; bottom: 16px; right: 16px; padding: 6px 12px; background: rgba(0,0,0,0.6); color: white; border-radius: 20px; font-size: 13px;">
            <span class="gallery-current">1</span> / <span class="gallery-total">${images.length}</span>
          </div>
        </div>
        
        <div class="gallery-thumbs" style="display: flex; gap: 12px; margin-top: 16px; overflow-x: auto; padding-bottom: 8px;">
          ${images.map((img, index) => `
            <div class="gallery-thumb" data-index="${index}" style="flex-shrink: 0; width: 80px; height: 80px; border-radius: 10px; overflow: hidden; cursor: pointer; border: 3px solid ${index === 0 ? 'var(--accent)' : 'transparent'}; transition: border-color 0.3s; opacity: ${index === 0 ? '1' : '0.6'};">
              <img src="${img}" alt="" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
          `).join('')}
        </div>
      </div>
    `;

    const mainImg = container.querySelector('.gallery-main img');
    const prevBtn = container.querySelector('.gallery-prev');
    const nextBtn = container.querySelector('.gallery-next');
    const currentEl = container.querySelector('.gallery-current');
    const thumbs = container.querySelectorAll('.gallery-thumb');
    const mainContainer = container.querySelector('.gallery-main');

    const updateGallery = (index) => {
      currentIndex = index;
      mainImg.style.opacity = '0';
      
      setTimeout(() => {
        mainImg.src = images[index];
        mainImg.style.opacity = '1';
      }, 150);

      currentEl.textContent = index + 1;

      thumbs.forEach((thumb, i) => {
        thumb.style.borderColor = i === index ? 'var(--accent)' : 'transparent';
        thumb.style.opacity = i === index ? '1' : '0.6';
      });
    };

    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      updateGallery(currentIndex > 0 ? currentIndex - 1 : images.length - 1);
    });

    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      updateGallery(currentIndex < images.length - 1 ? currentIndex + 1 : 0);
    });

    thumbs.forEach(thumb => {
      thumb.addEventListener('click', () => {
        updateGallery(parseInt(thumb.dataset.index));
      });
    });

    mainContainer.addEventListener('mouseenter', () => {
      prevBtn.style.opacity = '1';
      nextBtn.style.opacity = '1';
    });

    mainContainer.addEventListener('mouseleave', () => {
      prevBtn.style.opacity = '0';
      nextBtn.style.opacity = '0';
    });

    mainContainer.addEventListener('click', () => {
      this.openLightbox(images, currentIndex);
    });
  }

  openLightbox(images, startIndex) {
    let currentIndex = startIndex;

    const modal = document.createElement('div');
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.95);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      padding: 40px;
    `;

    modal.innerHTML = `
      <button class="lightbox-close" style="position: absolute; top: 20px; right: 20px; background: none; border: none; color: white; font-size: 32px; cursor: pointer; z-index: 10;">✕</button>
      <button class="lightbox-prev" style="position: absolute; left: 20px; top: 50%; transform: translateY(-50%); background: none; border: none; color: white; font-size: 48px; cursor: pointer;">‹</button>
      <button class="lightbox-next" style="position: absolute; right: 20px; top: 50%; transform: translateY(-50%); background: none; border: none; color: white; font-size: 48px; cursor: pointer;">›</button>
      <img src="${images[currentIndex]}" style="max-width: 100%; max-height: 90vh; object-fit: contain;">
      <div style="position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%); color: white; font-size: 14px;">
        ${currentIndex + 1} / ${images.length}
      </div>
    `;

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    const img = modal.querySelector('img');
    const counter = modal.querySelector('div:last-child');

    const updateImage = () => {
      img.src = images[currentIndex];
      counter.textContent = `${currentIndex + 1} / ${images.length}`;
    };

    modal.querySelector('.lightbox-prev').addEventListener('click', () => {
      currentIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
      updateImage();
    });

    modal.querySelector('.lightbox-next').addEventListener('click', () => {
      currentIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
      updateImage();
    });

    modal.querySelector('.lightbox-close').addEventListener('click', () => {
      modal.remove();
      document.body.style.overflow = '';
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.remove();
        document.body.style.overflow = '';
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        modal.remove();
        document.body.style.overflow = '';
      }
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ProductGallery();
});
