// Audio Feedback for Interactions
class AudioFeedback {
  constructor() {
    this.init();
  }

  init() {
    this.createAudioContext();
    this.attachEventListeners();
  }

  createAudioContext() {
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }

  playTone(frequency, duration, type = 'sine') {
    if (!this.audioContext) return;
    
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = type;
    
    gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
    
    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration);
  }

  attachEventListeners() {
    // Hover sound
    document.querySelectorAll('[data-sound-hover]').forEach(el => {
      el.addEventListener('mouseenter', () => {
        this.playTone(800, 0.1);
      });
    });

    // Click sound
    document.querySelectorAll('[data-sound-click]').forEach(el => {
      el.addEventListener('click', () => {
        this.playTone(1200, 0.15);
      });
    });

    // Success sound
    document.querySelectorAll('[data-sound-success]').forEach(el => {
      el.addEventListener('click', () => {
        this.playTone(1500, 0.1);
        setTimeout(() => this.playTone(2000, 0.2), 100);
      });
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new AudioFeedback();
});
