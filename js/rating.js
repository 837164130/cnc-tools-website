// Star Rating System
class StarRating {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('[data-rating]').forEach(container => {
      this.createRating(container);
    });
  }

  createRating(container) {
    const maxStars = parseInt(container.dataset.rating) || 5;
    const currentRating = parseFloat(container.dataset.currentRating) || 0;
    const readonly = container.dataset.readonly === 'true';

    container.style.cssText = `
      display: inline-flex;
      gap: 4px;
      font-size: 24px;
    `;

    for (let i = 1; i <= maxStars; i++) {
      const star = document.createElement('span');
      star.textContent = '★';
      star.style.cssText = `
        color: ${i <= currentRating ? '#ffb800' : '#d1d1d6'};
        cursor: ${readonly ? 'default' : 'pointer'};
        transition: color 0.2s, transform 0.2s;
      `;

      if (!readonly) {
        star.addEventListener('mouseenter', () => this.highlightStars(container, i));
        star.addEventListener('mouseleave', () => this.resetStars(container, currentRating));
        star.addEventListener('click', () => this.setRating(container, i));
      }

      container.appendChild(star);
    }
  }

  highlightStars(container, rating) {
    const stars = container.querySelectorAll('span');
    stars.forEach((star, index) => {
      star.style.color = index < rating ? '#ffb800' : '#d1d1d6';
      star.style.transform = index < rating ? 'scale(1.2)' : 'scale(1)';
    });
  }

  resetStars(container, rating) {
    const stars = container.querySelectorAll('span');
    stars.forEach((star, index) => {
      star.style.color = index < rating ? '#ffb800' : '#d1d1d6';
      star.style.transform = 'scale(1)';
    });
  }

  setRating(container, rating) {
    container.dataset.currentRating = rating;
    this.resetStars(container, rating);

    // Dispatch custom event
    container.dispatchEvent(new CustomEvent('ratingChange', { detail: { rating } }));
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new StarRating();
});
