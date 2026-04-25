// Product Reviews
class ProductReviews {
  constructor() {
    this.init();
  }

  init() {
    this.attachEventListeners();
    this.displayReviews();
  }

  attachEventListeners() {
    const form = document.querySelector('[data-review-form]');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.submitReview(form);
      });
    }
  }

  submitReview(form) {
    const formData = new FormData(form);
    const review = {
      name: formData.get('name') || '匿名用户',
      rating: parseInt(formData.get('rating')) || 5,
      comment: formData.get('comment') || '',
      date: new Date().toLocaleDateString('zh-CN'),
      helpful: 0
    };

    // Save to localStorage (in production, this would be an API call)
    const productId = form.dataset.reviewForm;
    const key = `reviews_${productId}`;
    const reviews = JSON.parse(localStorage.getItem(key) || '[]');
    reviews.unshift(review);
    localStorage.setItem(key, JSON.stringify(reviews));

    // Reset form and refresh display
    form.reset();
    this.displayReviews();

    if (window.notifications) {
      window.notifications.show('评价提交成功', 'success');
    }
  }

  displayReviews() {
    const container = document.querySelector('[data-reviews]');
    if (!container) return;

    const productId = container.dataset.reviews;
    const key = `reviews_${productId}`;
    const reviews = JSON.parse(localStorage.getItem(key) || '[]');

    // Calculate average rating
    const avgRating = reviews.length > 0 
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : 0;

    let html = `
      <div class="reviews-summary" style="margin-bottom: 24px; padding: 16px; background: var(--bg-secondary); border-radius: 12px;">
        <div style="display: flex; align-items: center; gap: 16px;">
          <div style="font-size: 48px; font-weight: 700;">${avgRating}</div>
          <div>
            <div style="font-size: 24px; color: #ff9500;">${this.renderStars(avgRating)}</div>
            <div style="color: var(--text-secondary);">${reviews.length} 条评价</div>
          </div>
        </div>
      </div>
    `;

    if (reviews.length === 0) {
      html += '<p style="text-align: center; color: var(--text-secondary); padding: 32px;">暂无评价，成为第一个评价的人吧！</p>';
    } else {
      html += '<div class="reviews-list">';
      reviews.forEach(review => {
        html += `
          <div class="review-item" style="padding: 16px; border-bottom: 1px solid var(--border);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <div style="font-weight: 600;">${review.name}</div>
              <div style="color: var(--text-secondary); font-size: 14px;">${review.date}</div>
            </div>
            <div style="color: #ff9500; margin-bottom: 8px;">${this.renderStars(review.rating)}</div>
            <p style="margin: 0; line-height: 1.6;">${review.comment}</p>
          </div>
        `;
      });
      html += '</div>';
    }

    container.innerHTML = html;
  }

  renderStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
      stars += '★';
    }
    if (hasHalf) {
      stars += '½';
    }
    for (let i = fullStars + (hasHalf ? 1 : 0); i < 5; i++) {
      stars += '☆';
    }
    
    return stars;
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ProductReviews();
});
