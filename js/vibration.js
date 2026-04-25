// Vibration Feedback
class VibrationFeedback {
  constructor() {
    this.init();
  }

  init() {
    this.attachEventListeners();
  }

  vibrate(pattern) {
    if ('vibrate' in navigator) {
      navigator.vibrate(pattern);
    }
  }

  attachEventListeners() {
    // Click vibration
    document.querySelectorAll('[data-vibrate-click]').forEach(el => {
      el.addEventListener('click', () => {
        this.vibrate(50);
      });
    });

    // Success vibration
    document.querySelectorAll('[data-vibrate-success]').forEach(el => {
      el.addEventListener('click', () => {
        this.vibrate([50, 100, 50]);
      });
    });

    // Error vibration
    document.querySelectorAll('[data-vibrate-error]').forEach(el => {
      el.addEventListener('click', () => {
        this.vibrate([100, 50, 100]);
      });
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new VibrationFeedback();
});
