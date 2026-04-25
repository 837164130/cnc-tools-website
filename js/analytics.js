// Analytics Tracking
class Analytics {
  constructor() {
    this.init();
  }

  init() {
    this.trackPageView();
    this.trackEvents();
  }

  trackPageView() {
    const data = {
      type: 'pageview',
      url: window.location.href,
      title: document.title,
      timestamp: new Date().toISOString(),
      referrer: document.referrer
    };
    this.send(data);
  }

  trackEvents() {
    // Track product clicks
    document.querySelectorAll('.product-card a, .product-link').forEach(link => {
      link.addEventListener('click', (e) => {
        this.track('product_click', {
          product: link.closest('.product-card')?.querySelector('.product-name')?.textContent,
          url: link.href
        });
      });
    });

    // Track search
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
      searchInput.addEventListener('change', (e) => {
        if (e.target.value) {
          this.track('search', { query: e.target.value });
        }
      });
    }

    // Track contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', () => {
        this.track('contact_submit', {
          product: contactForm.querySelector('[name="product"]')?.value
        });
      });
    }

    // Track calculator usage
    const calculateBtn = document.querySelector('.calculate-btn');
    if (calculateBtn) {
      calculateBtn.addEventListener('click', () => {
        this.track('calculator_use', {
          material: document.getElementById('material')?.value
        });
      });
    }
  }

  track(event, data = {}) {
    const payload = {
      type: 'event',
      event,
      data,
      timestamp: new Date().toISOString(),
      url: window.location.href
    };
    this.send(payload);
  }

  send(data) {
    // Send to analytics endpoint or store locally
    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/analytics', JSON.stringify(data));
    }
    
    // Also log to console for debugging
    console.log('[Analytics]', data);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.analytics = new Analytics();
});
