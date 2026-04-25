// Product Usage Guide
class UsageGuide {
  constructor() {
    this.init();
  }

  init() {
    this.displayGuide();
  }

  displayGuide() {
    const container = document.querySelector('[data-usage-guide]');
    if (!container) return;

    const steps = JSON.parse(container.dataset.usageGuide || '[]');
    if (steps.length === 0) return;

    container.innerHTML = '<h3 style="margin-bottom: 24px;">使用指南</h3>';

    const timeline = document.createElement('div');
    timeline.style.cssText = 'position: relative; padding-left: 32px;';

    // Add vertical line
    const line = document.createElement('div');
    line.style.cssText = `
      position: absolute;
      left: 11px;
      top: 0;
      bottom: 0;
      width: 2px;
      background: var(--border);
    `;
    timeline.appendChild(line);

    steps.forEach((step, index) => {
      const stepEl = document.createElement('div');
      stepEl.style.cssText = 'position: relative; margin-bottom: 24px;';

      stepEl.innerHTML = `
        <div style="
          position: absolute;
          left: -32px;
          top: 0;
          width: 24px;
          height: 24px;
          background: #0071e3;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 12px;
          font-weight: 600;
        ">${index + 1}</div>
        <div style="padding: 16px; background: var(--bg-secondary); border-radius: 12px;">
          <h4 style="margin: 0 0 8px; font-size: 16px;">${step.title}</h4>
          <p style="margin: 0; color: var(--text-secondary); line-height: 1.6;">${step.description}</p>
          ${step.image ? `
            <div style="margin-top: 12px; border-radius: 8px; overflow: hidden;">
              <img src="${step.image}" alt="${step.title}" style="width: 100%; max-height: 200px; object-fit: cover;">
            </div>
          ` : ''}
          ${step.tip ? `
            <div style="
              margin-top: 12px;
              padding: 12px;
              background: rgba(0, 113, 227, 0.1);
              border-radius: 8px;
              border-left: 3px solid #0071e3;
            ">
              <div style="font-size: 12px; color: #0071e3; font-weight: 600; margin-bottom: 4px;">💡 提示</div>
              <div style="font-size: 14px;">${step.tip}</div>
            </div>
          ` : ''}
        </div>
      `;

      timeline.appendChild(stepEl);
    });

    container.appendChild(timeline);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new UsageGuide();
});
