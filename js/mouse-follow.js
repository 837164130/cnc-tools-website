// Mouse Follow Effect
class MouseFollow {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('[data-mouse-follow]').forEach(el => {
      this.setupMouseFollow(el);
    });
  }

  setupMouseFollow(element) {
    const follower = document.createElement('div');
    follower.style.cssText = `
      position: fixed;
      width: 20px;
      height: 20px;
      background: rgba(0, 113, 227, 0.3);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      transition: transform 0.1s ease-out;
      mix-blend-mode: difference;
    `;
    document.body.appendChild(follower);

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    const animate = () => {
      followerX += (mouseX - followerX) * 0.1;
      followerY += (mouseY - followerY) * 0.1;
      
      follower.style.transform = `translate(${followerX - 10}px, ${followerY - 10}px)`;
      requestAnimationFrame(animate);
    };

    animate();
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new MouseFollow();
});
