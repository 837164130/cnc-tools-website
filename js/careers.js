// Careers / Job Openings
class Careers {
  constructor() {
    this.init();
  }

  init() {
    this.displayCareers();
  }

  displayCareers() {
    const container = document.querySelector('[data-careers]');
    if (!container) return;

    const jobs = [
      { title: '数控刀具研发工程师', dept: '研发部', location: '常州', type: '全职' },
      { title: '销售经理', dept: '销售部', location: '常州/上海', type: '全职' },
      { title: '质量检测员', dept: '品质部', location: '常州', type: '全职' },
      { title: '数控操作工', dept: '生产部', location: '常州', type: '全职' }
    ];

    container.innerHTML = '<h3 style="margin-bottom: 16px;">加入我们</h3>';

    const list = document.createElement('div');
    list.style.cssText = 'display: grid; gap: 12px;';

    jobs.forEach(job => {
      const card = document.createElement('div');
      card.style.cssText = `
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 16px;
        background: var(--bg-secondary);
        border-radius: 12px;
        transition: transform 0.2s, box-shadow 0.2s;
      `;

      card.innerHTML = `
        <div style="flex: 1;">
          <div style="font-weight: 600; margin-bottom: 4px;">${job.title}</div>
          <div style="font-size: 14px; color: var(--text-secondary);">
            ${job.dept} · ${job.location} · ${job.type}
          </div>
        </div>
        <button style="
          padding: 8px 20px;
          background: #0071e3;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
        ">申请</button>
      `;

      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateX(4px)';
        card.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.boxShadow = '';
      });

      list.appendChild(card);
    });

    container.appendChild(list);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new Careers();
});
