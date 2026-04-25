// Product Tutorials / Step-by-Step Guides
class ProductTutorials {
  constructor() {
    this.init();
  }

  init() {
    this.displayTutorials();
  }

  displayTutorials() {
    const container = document.querySelector('[data-tutorials]');
    if (!container) return;

    const tutorials = JSON.parse(container.dataset.tutorials || '[]');
    if (tutorials.length === 0) return;

    container.innerHTML = '<h3 style="margin-bottom: 24px;">分步教程</h3>';

    const grid = document.createElement('div');
    grid.style.cssText = 'display: grid; gap: 20px;';

    tutorials.forEach((tutorial, index) => {
      const card = document.createElement('div');
      card.style.cssText = `
        padding: 24px;
        background: var(--bg-secondary);
        border-radius: 12px;
        transition: transform 0.2s, box-shadow 0.2s;
      `;

      card.innerHTML = `
        <div style="display: flex; gap: 16px; margin-bottom: 16px;">
          <div style="
            min-width: 48px;
            height: 48px;
            background: linear-gradient(135deg, #0071e3, #5856d6);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 20px;
            font-weight: 700;
          ">${index + 1}</div>
          <div>
            <h4 style="margin: 0 0 4px; font-size: 16px;">${tutorial.title}</h4>
            <div style="font-size: 12px; color: var(--text-secondary);">⏱ ${tutorial.duration || '5分钟'} · ${tutorial.difficulty || '初级'}</div>
          </div>
        </div>
        
        <p style="margin: 0 0 16px; color: var(--text-secondary); font-size: 14px; line-height: 1.6;">${tutorial.description}</p>
        
        <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 16px;">
          ${(tutorial.steps || []).map((step, i) => `
            <div style="
              display: flex;
              align-items: center;
              gap: 6px;
              padding: 6px 12px;
              background: var(--bg-tertiary);
              border-radius: 8px;
              font-size: 12px;
            ">
              <span style="color: #0071e3; font-weight: 600;">${i + 1}</span>
              <span>${step}</span>
            </div>
          `).join('')}
        </div>
        
        <button style="
          padding: 8px 20px;
          background: #0071e3;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 14px;
        ">开始学习</button>
      `;

      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-2px)';
        card.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)';
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.boxShadow = '';
      });

      grid.appendChild(card);
    });

    container.appendChild(grid);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ProductTutorials();
});
