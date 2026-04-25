// Countdown Timer for Promotions
class CountdownTimer {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('[data-countdown]').forEach(el => {
      const targetDate = new Date(el.dataset.countdown);
      this.startTimer(el, targetDate);
    });
  }

  startTimer(element, targetDate) {
    const updateTimer = () => {
      const now = new Date();
      const diff = targetDate - now;

      if (diff <= 0) {
        element.textContent = '已结束';
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      element.textContent = `${days}天 ${hours}时 ${minutes}分 ${seconds}秒`;
    };

    updateTimer();
    setInterval(updateTimer, 1000);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new CountdownTimer();
});
