// Product Video Tutorials
class VideoTutorials {
  constructor() {
    this.init();
  }

  init() {
    this.displayTutorials();
  }

  displayTutorials() {
    const container = document.querySelector('[data-video-tutorials]');
    if (!container) return;

    const videos = JSON.parse(container.dataset.videoTutorials || '[]');
    if (videos.length === 0) return;

    container.innerHTML = '<h3 style="margin-bottom: 16px;">视频教程</h3>';

    const grid = document.createElement('div');
    grid.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px;';

    videos.forEach(video => {
      const card = document.createElement('div');
      card.style.cssText = `
        background: var(--bg-secondary);
        border-radius: 12px;
        overflow: hidden;
        cursor: pointer;
        transition: transform 0.2s, box-shadow 0.2s;
      `;

      card.innerHTML = `
        <div style="position: relative; padding-bottom: 56.25%; background: #000;">
          <div style="
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
          ">
            <div style="
              width: 60px;
              height: 60px;
              background: rgba(255,255,255,0.2);
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              backdrop-filter: blur(10px);
            ">
              <div style="width: 0; height: 0; border-left: 20px solid white; border-top: 12px solid transparent; border-bottom: 12px solid transparent; margin-left: 4px;"></div>
            </div>
          </div>
          ${video.duration ? `
            <