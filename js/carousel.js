// Carousel/Slider Component
class Carousel {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('.carousel').forEach(carousel => {
      this.setupCarousel(carousel);
    });
  }

  setupCarousel(carousel) {
    const track = carousel.querySelector('.carousel-track');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    const dots = carousel.querySelectorAll('.carousel-dot');
    
    if (!track || slides.length === 0) return;

    let currentIndex = 0;

    const goToSlide = (index) => {
      if (index < 0) index = slides.length - 1;
      if (index >= slides.length) index = 0;
      
      currentIndex = index;
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      
      // Update dots
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });
    };

    if (prevBtn) {
      prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));
    }

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => goToSlide(index));
    });

    // Auto-play
    let autoPlayInterval;
    const startAutoPlay = () => {
      autoPlayInterval = setInterval(() => goToSlide(currentIndex + 1), 5000);
    };
    
    const stopAutoPlay = () => {
      clearInterval(autoPlayInterval);
    };

    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);
    
    startAutoPlay();
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new Carousel();
});
