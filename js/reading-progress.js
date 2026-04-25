// Reading Progress Bar
class ReadingProgress {
  constructor() {
    this.init();
  }

  init() {
    this.createProgressBar();
    this.attachEventListeners();
  }

  createProgressBar() {
    this.progressBar = document.createElement('div');
    this.progressBar.className = 'reading-progress';
    this.progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 0%;
      height: 3px;
      background: linear-gradient(90deg, #0071e3, #5856d6);
      z-index: 10001;
      transition: width 0.1s;
    `;
    document.body.appendChild(this.progressBar);
  }

  attachEventListeners() {
    window.addEventListener('scroll', () => this.updateProgress());
    window.addEventListener('resize', () => this.updateProgress());
  }

  updateProgress() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    
    this.progressBar.style.width = progress + '%';
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ReadingProgress();
});
