// Product Roadmap
class ProductRoadmap {
  constructor() {
    this.init();
  }

  init() {
    this.displayRoadmap();
  }

  displayRoadmap() {
    const container = document.querySelector('[data-roadmap]');
    if (!container) return;

    const phases = JSON.parse(container.dataset.roadmap || '[]');
    if (phases.length === 0) return;

    container.innerHTML = '<h3 style="margin-bottom: 24px;">产品路线图</h3>';

    const timeline = document.createElement('div');
    timeline.style.cssText = 'position: relative; padding-left: 24px;';

    phases.forEach((phase, index) => {
      const item = document.createElement('div');
      item.style.cssText = `
        position: relative;
        padding-bottom: 32px;
        padding-left: 32px;
        border-left: 2px solid ${phase.completed ? '#34c759' : 'var(--border)'};
      `;

      item.innerHTML = `
        <div style="
          position: absolute;
          left: -10px;
          top: 0;
          width: 18px;
          height: 18px;
          background: ${phase.completed ? '#34c759' : 'var(--bg-primary)'};
          border: 3px solid ${phase.completed ? '#34c759' : 'var(--border)'};
          border-radius: 50%;
        "></div>
        
        <div style="
          padding: 20px;
          background: var(--bg-secondary);
          border-radius: 12px;
        ">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <div>
              <div style="font-weight: 600; font-size: 16px;">${phase.name}</div>
              <div style="font-size: 14px; color: var(--text-secondary);">${phase.timeline}</div>
            </div>
            ${phase.completed ? 
              '<span style="padding: 4px 12px; background: #34c75920; color: #34c759; border-radius: 12px; font-size: 12px;">✓ 已完成</span>' :
              '<span style="padding: 4px 12px; background: #0071e320; color: #0071e3; border-radius: 12px; font-size: 12px;">进行中</span>'
            }
          </div>
          
          <p style="margin: 0 0 16px; color: var(--text-secondary); font-size: 14px;">${phase.description}</p>
          
          <div style="display: grid; gap: 8px;">
            ${(phase.features || []).map(feature => `
              <div style="display: flex; align-items: center; gap: 8px;">
                <span style="color: ${feature.completed ? '#34c759' : 'var(--text-secondary)'};">${feature.completed ? '✓' : '○'}</span>
                <span style="font-size: 14px; ${feature.completed ? '' : 'color: var(--text-secondary)'}">${feature.name}</span>
              </div>
            `).join('')}
          </div>
        </div>
      `;

      timeline.appendChild(item);
    });

    container.appendChild(timeline);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ProductRoadmap();
});
