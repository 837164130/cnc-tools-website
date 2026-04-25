// Social Share Count
class SocialShare {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('[data-share]').forEach(btn => {
      this.setupShare(btn);
    });
  }

  setupShare(button) {
    const platform = button.dataset.share;
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);

    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      whatsapp: `https://wa.me/?text=${title}%20${url}`,
      telegram: `https://t.me/share/url?url=${url}&text=${title}`,
      email: `mailto:?subject=${title}&body=${url}`
    };

    button.addEventListener('click', () => {
      const shareUrl = shareUrls[platform];
      if (shareUrl) {
        if (platform === 'email') {
          window.location.href = shareUrl;
        } else {
          window.open(shareUrl, '_blank', 'width=600,height=400');
        }
        this.incrementCount(button);
      }
    });
  }

  incrementCount(button) {
    const countEl = button.querySelector('.share-count');
    if (countEl) {
      let count = parseInt(countEl.textContent) || 0;
      countEl.textContent = count + 1;
    }
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new SocialShare();
});
