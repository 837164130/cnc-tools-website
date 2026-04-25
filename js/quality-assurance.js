// Quality Assurance System
class QualityAssurance {
  constructor() {
    this.init();
  }

  init() {
    this.displayQA();
  }

  displayQA() {
    const container = document.querySelector('[data-quality-assurance]');
    if (!container) return;

    const processes = [
      { step: '01', title: '原材料检验', desc: '对每批次硬质合金棒料进行化学成分和物理性能检测' },
      { step: '02', title: '过程检验', desc: '关键工序100%全检，确保加工精度' },
      { step: '03', title: '成品检验', desc: '尺寸、外观、性能全面检测' },
      { step: '04', title: '出货检验', desc: '最终复核，确保产品完好无损' }
    ];

    container.innerHTML = '<h3 style="margin-bottom: 24px;">质量保证</h3>';

    const timeline = document.createElement('div');
    timeline.style.cssText = 'position: relative; padding-left: 40px;';

    // Vertical line
    const line = document.createElement('div');
    line.style.cssText = `
      position: absolute;
      left: 15px;
      top: 0;
      bottom: 0;
      width: 2px;
      background: linear-gradient(to bottom, #0071e3, #34c759);
    `;
    timeline.appendChild(line);

    processes.forEach((process, index) => {
      const item = document.createElement('div');
      item.style.cssText = `
        position: relative;
        padding-bottom: 24px;
      `;

      item.innerHTML = `
        <div style="
          position: absolute;
          left: -33px;
          top: 0;
          width: 32px;
          height: 32px;
          background: linear-gradient(135deg, #0071e3, #5856d6);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 12px;
          font-weight: 700;
        ">${process.step}</div>
        <div style="
          padding: 16px;
          background: var(--bg-secondary);
          border-radius: 12px;
        ">
          <h4 style="margin-bottom: 8px;">${process.title}</h4>
          <p style="font-size: 14px; color: var(--text-secondary); line-height: 1.6; margin: 0;">${process.desc}</p>
        </div>
      `;

      timeline.appendChild(item);
    });

    container.appendChild(timeline);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new QualityAssurance();
});
