// Notifications System
class Notifications {
  constructor() {
    this.container = null;
    this.init();
  }

  init() {
    this.createContainer();
  }

  createContainer() {
    this.container = document.createElement('div');
    this.container.id = 'notifications-container';
    this.container.style.cssText = `
      position: fixed;
      top: 80px;
      right: 20px;
      z-index: 10000;
      display: flex;
      flex-direction: column;
      gap: 12px;
      max-width: 400px;
    `;
    document.body.appendChild(this.container);
  }

  show(message, type = 'info', duration = 3000) {
    const notification = document.createElement('div');
    notification.style.cssText = `
      background: ${this.getBackgroundColor(type)};
      color: white;
      padding: 16px 24px;
      border-radius: 16px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.15);
      font-size: 15px;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 12px;
      transform: translateX(100%);
      transition: transform 0.3s ease;
      cursor: pointer;
    `;

    const icon = this.getIcon(type);
    notification.innerHTML = `${icon} <span>${message}</span>`;

    this.container.appendChild(notification);

    // Animate in
    requestAnimationFrame(() => {
      notification.style.transform = 'translateX(0)';
    });

    // Auto remove
    const removeTimeout = setTimeout(() => {
      this.remove(notification);
    }, duration);

    // Click to dismiss
    notification.addEventListener('click', () => {
      clearTimeout(removeTimeout);
      this.remove(notification);
    });
  }

  remove(notification) {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      notification.remove();
    }, 300);
  }

  getBackgroundColor(type) {
    const colors = {
      success: '#34c759',
      error: '#ff3b30',
      warning: '#ff9500',
      info: '#0071e3'
    };
    return colors[type] || colors.info;
  }

  getIcon(type) {
    const icons = {
      success: '✅',
      error: '❌',
      warning: '⚠️',
      info: 'ℹ️'
    };
    return icons[type] || icons.info;
  }
}

// Initialize globally
window.notifications = new Notifications();
