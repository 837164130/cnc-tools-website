// Company Timeline / History
class CompanyTimeline {
  constructor() {
    this.init();
  }

  init() {
    this.displayTimeline();
  }

  displayTimeline() {
    const container = document.querySelector('[data-timeline]');
    if (!container) return;

    const events = JSON.parse(container.dataset.timeline || '[]');
    if (events.length === 0) {
      events.push(
        { year: '2008', title: '公司成立', desc: 'CCCNC数控刀具有限公司正式成立' },
        { year: '2010', title: '产品扩展', desc: '推出硬质合金铣刀系列产品' },
        { year: '2012', title: '技术突破', desc: '获得多项国家专利技术' },
        { year: '2015', title: '市场拓展', desc: '产品出口至欧美等30多个国家' },
        { year: '2018', title: '智能制造', desc: '引进德国先进生产线' },
        { year: '2020', title: '数字化转型', desc: '上线电商平台，实现线上线下融合' },
        { year: '2023', title: '品牌升级', desc: '全新品牌形象，服务全球客户' }
      );
    }

    container.innerHTML = '<h3 style="margin-bottom: 24px;">发展历程</h3>';

    const timeline = document.createElement('div');
    timeline.style.cssText = 'position: relative; padding-left: 32px;';

    // Timeline line
    const line = document.createElement('div');
    line.style.cssText = `
      position: absolute;
      left: 8px;
      top: 0;
      bottom: 0;
      width: 2px;
      background: linear-gradient(to bottom, #0071e3, #5856d6);
    `;
    timeline.appendChild(line);

    events.forEach((event, index) => {
      const item = document.createElement('div');
      item.style.cssText = `
        position: relative;
        padding-bottom: 24px;
        opacity: 0;
        transform: translateX(-20px);
        animation: slideIn 0.5s ease forwards;
        animation-delay: ${index * 0.1}s;
      `;

      item.innerHTML = `
        <div style="
          position: absolute;
          left: -28px;
          top: 4px;
          width: 16px;
          height: 16px;
          background: #0071e3;
          border-radius: 50%;
          border: 3px solid var(--bg-primary);
          box-shadow: 0 0 0 3px #0071e3;
        "></div>
        <div style="
          padding: 16px;
          background: var(--bg-secondary);
          border-radius: 12px;
          transition: transform 0.2s, box-shadow 0.2s;
        " class="timeline-item">
          <div style="font-size: 14px; color: #0071e3; font-weight: 600; margin-bottom: 4px;">${event.year}</div>
          <div style="font-weight: 600; margin-bottom: 4px;">${event.title}</div>
          <div style="font-size: 14px; color: var(--text-secondary);">${event.desc}</div>
        </div>
      `;

      const card = item.querySelector('.timeline-item');
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateX(8px)';
        card.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.boxShadow = '';
      });

      timeline.appendChild(item);
    });

    // Add animation keyframes
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideIn {
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
    `;
    document.head.appendChild(style);

    container.appendChild(timeline);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new CompanyTimeline();
});
