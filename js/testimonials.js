// Customer Testimonials
class Testimonials {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('[data-testimonials]').forEach(container => {
      this.setupTestimonials(container);
    });
  }

  setupTestimonials(container) {
    const testimonials = JSON.parse(container.dataset.testimonials || '[]');
    if (testimonials.length === 0) return;

    let currentIndex = 0;

    container.innerHTML = `
      <h3 style="margin-bottom: 24px;">客户评价</h3>
      <div class="testimonials-slider" style="position: relative; overflow: hidden;">
        <div class="testimonials-track" style="display: flex; transition: transform 0.5s;">
          ${testimonials.map(t => `
            <div class="testimonial-slide" style="min-width: 100%; padding: 0 12px;">
              <div style="background: var(--bg-secondary); border-radius: 16px; padding: 32px;">
                <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 20px;">
                  <div style="width: 60px; height: 60px; border-radius: 50%; background: linear-gradient(135deg, var(--accent), #5856d6); display: flex; align-items: center; justify-content: center; color: white; font-size: 24px; font-weight: 600;">
                    ${t.name.charAt(0)}
                  </div>
                  <div>
                    <div style="font-weight: 600;">${t.name}</div>
                    <div style="font-size: 14px; color: var(--text-secondary);">${t.company}</div>
                    <div style="color: #ffb800; margin-top: 4px;">${'★'.repeat(t.rating)}${'☆'.repeat(5 - t.rating)}</div>
                  </div>
                </div>
                <p style="line-height: 1.8; color: var(--text-secondary); font-style: italic;">"${t.content}"</p>
                <div style="margin-top: 16px; font-size: 12px; color: var(--text-secondary);">${t.date}</div>
              </div>
            </div>
          `).join('')}
        </div>
        
        <button class="testimonial-prev" style="position: absolute; left: 0; top: 50%; transform: translateY(-50%); width: 40px; height: 40px; background: var(--bg-primary); border: 1px solid var(--border); border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 18px; z-index: 10;">‹</button>
        <button class="testimonial-next" style="position: absolute; right: 0; top: 50%; transform: translateY(-50%); width: 40px; height: 40px; background: var(--bg-primary); border: 1px solid var(--border); border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 18px; z-index: 10;">›</button>
        
        <div style="display: flex; justify-content: center; gap: 8px; margin-top: 20px;">
          ${testimonials.map((_, i) => `
            <button class="testimonial-dot" data-index="${i}" style="width: 10px; height: 10px; border-radius: 50%; border: none; background: ${i === 0 ? 'var(--accent)' : 'var(--border)'}; cursor: pointer; transition: background 0.3s;"></button>
          `).join('')}
        </div>
      </div>
    `;

    const track = container.querySelector('.testimonials-track');
    const prevBtn = container.querySelector('.testimonial-prev');
    const nextBtn = container.querySelector('.testimonial-next');
    const dots = container.querySelectorAll('.testimonial-dot');

    const goToSlide = (index) => {
      currentIndex = index;
      if (currentIndex < 0) currentIndex = testimonials.length - 1;
      if (currentIndex >= testimonials.length) currentIndex = 0;
      
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      
      dots.forEach((dot, i) => {
        dot.style.background = i === currentIndex ? 'var(--accent)' : 'var(--border)';
      });
    };

    prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
    nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => goToSlide(index));
    });

    // Auto-play
    setInterval(() => goToSlide(currentIndex + 1), 5000);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new Testimonials();
});
