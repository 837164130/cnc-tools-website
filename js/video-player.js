// Custom Video Player
class VideoPlayer {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('[data-video]').forEach(container => {
      this.setupPlayer(container);
    });
  }

  setupPlayer(container) {
    const videoUrl = container.dataset.video;
    const poster = container.dataset.poster || '';

    container.innerHTML = `
      <div style="position: relative; width: 100%; aspect-ratio: 16/9; background: #000; border-radius: 12px; overflow: hidden;">
        <video 
          src="${videoUrl}" 
          poster="${poster}"
          style="width: 100%; height: 100%; object-fit: cover;"
          preload="metadata"
        ></video>
        <div class="video-controls" style="position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(transparent, rgba(0,0,0,0.7)); padding: 20px; display: flex; align-items: center; gap: 16px; opacity: 0; transition: opacity 0.3s;">
          <button class="play-btn" style="background: none; border: none; color: white; font-size: 24px; cursor: pointer; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;">▶️</button>
          <div class="progress-bar" style="flex: 1; height: 4px; background: rgba(255,255,255,0.3); border-radius: 2px; cursor: pointer;">
            <div class="progress" style="height: 100%; background: var(--accent); border-radius: 2px; width: 0%; transition: width 0.1s;"></div>
          </div>
          <span class="time" style="color: white; font-size: 14px; font-variant-numeric: tabular-nums;">0:00 / 0:00</span>
          <button class="fullscreen-btn" style="background: none; border: none; color: white; font-size: 20px; cursor: pointer;">⛶</button>
        </div>
        <div class="play-overlay" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 80px; height: 80px; background: rgba(0,0,0,0.7); border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: transform 0.3s;">
          <span style="font-size: 32px; color: white; margin-left: 4px;">▶</span>
        </div>
      </div>
    `;

    const video = container.querySelector('video');
    const controls = container.querySelector('.video-controls');
    const playBtn = container.querySelector('.play-btn');
    const playOverlay = container.querySelector('.play-overlay');
    const progressBar = container.querySelector('.progress-bar');
    const progress = container.querySelector('.progress');
    const timeDisplay = container.querySelector('.time');
    const fullscreenBtn = container.querySelector('.fullscreen-btn');

    // Show controls on hover
    container.addEventListener('mouseenter', () => {
      controls.style.opacity = '1';
    });
    container.addEventListener('mouseleave', () => {
      if (!video.paused) {
        controls.style.opacity = '0';
      }
    });

    // Play/Pause
    const togglePlay = () => {
      if (video.paused) {
        video.play();
        playBtn.textContent = '⏸️';
        playOverlay.style.opacity = '0';
        playOverlay.style.pointerEvents = 'none';
      } else {
        video.pause();
        playBtn.textContent = '▶️';
        playOverlay.style.opacity = '1';
        playOverlay.style.pointerEvents = 'auto';
      }
    };

    playBtn.addEventListener('click', togglePlay);
    playOverlay.addEventListener('click', togglePlay);
    video.addEventListener('click', togglePlay);

    // Progress
    video.addEventListener('timeupdate', () => {
      const percent = (video.currentTime / video.duration) * 100;
      progress.style.width = percent + '%';
      timeDisplay.textContent = `${this.formatTime(video.currentTime)} / ${this.formatTime(video.duration)}`;
    });

    progressBar.addEventListener('click', (e) => {
      const rect = progressBar.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      video.currentTime = percent * video.duration;
    });

    // Fullscreen
    fullscreenBtn.addEventListener('click', () => {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        container.requestFullscreen();
      }
    });
  }

  formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new VideoPlayer();
});
