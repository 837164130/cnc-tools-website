// Product Careers / Job Openings
class ProductCareers {
  constructor() {
    this.init();
  }

  init() {
    this.displayCareers();
  }

  displayCareers() {
    const container = document.querySelector('[data-careers]');
    if (!container) return;

    const jobs = JSON.parse(container.dataset.careers || '[]');
    if (jobs.length === 0) return;

    container.innerHTML = '<h3 style="margin-bottom: 24px;">加入我们</h3>';

    const grid = document.createElement('div');
    grid.style.cssText = 'display: grid; gap: 16px;';

    jobs.forEach(job => {
      const card = document.createElement('div');
      card.style.cssText = `
        padding: 24px;
        background: var(--bg-secondary);
        border-radius: 12px;
        transition: transform 0.2s, box-shadow 0.2s;
      `;

      card.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
          <div>
            <div style="font-weight: 600; font-size: 18px; margin-bottom: 4px;">${job.title}</div>
            <div style="font-size: 14px; color: var(--text-secondary);">${job.department || ''}</div>
          </div>
          <span style="
            padding: 4px 12px;
            background: ${job.type === '全职' ? '#34c759' : '#0071e3'};
            color: white;
            border-radius: 12px;
            font-size: 12px;
          ">${job.type || '全职'}</span>
        </div>
        
        <p style="margin: 0 0 16px; color: var(--text-secondary); font-size: 14px; line-height: 1.6;">${job.description}</p>
        
        <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 16px;">
          ${(job.requirements || []).map(req => `
            <span style="
              padding: 4px 12px;
              background: var(--bg-tertiary);
              border-radius: 12px;
              font-size: 12px;
              color: var(--text-secondary);
            ">${req}</span>
          `).join('')}
        </div>
        
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span style="font-size: 14px; color: var(--text-secondary);">💰 ${job.salary || '薪资面议'}</span>
          <button style="
            padding: 8px 20px;
            background: #0071e3;
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 14px;
          ">申请职位</button>
        </div>
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
  new ProductCareers();
});
