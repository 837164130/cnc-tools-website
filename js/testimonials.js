// Product Testimonials
class ProductTestimonials {
  constructor() {
    this.init();
  }

  init() {
    this.displayTestimonials();
  }

  displayTestimonials() {
    const container = document.querySelector('[data-testimonials]');
    if (!container) return;

    const testimonials = JSON.parse(container.dataset.testimonials || '[]');
    if (testimonials.length === 0) return;

    container.innerHTML = '<h3 style="margin-bottom: 24px;">客户评价</h3>';

    const grid = document.createElement('div');
    grid.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 16px;';

    testimonials.forEach(t => {
      const card = document.createElement('div');
      card.style.cssText = `
        padding: 20px;
        background: var(--bg-secondary);
        border-radius: 12px;
      `;

      // Stars
      const stars = '★'.repeat(t.rating || 5) + '☆'.repeat(5 - (t.rating || 5));

      card.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
          <div style="
            width: 48px;
            height: 48px;
            background: linear-gradient(135deg, #0071e3, #5856d6);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 20px;
            font-weight: 600;
          ">${t.name ? t.name[0] : 'U'}</div>
          <div>
            <div style="font-weight: 600;">${t.name || '匿名用户'}</div>
            <div style="color: #ff9500; font-size: 14px;">${stars}</div>
          </div>
        </div>
        <p style="margin: 0 0 12px; line-height: 1.6; color: var(--text-primary);">"${t.comment}"</p>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span style="font-size: 12px; color: var(--text-secondary);">${t.date || ''}</span>
          ${t.verified ? '<span style="font-size: 12px; color: #34c759;">✓ 已验证购买</span>' : ''}
        </div>
      `;

      grid.appendChild(card);
    });

    container.appendChild(grid);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ProductTestimonials();
});
