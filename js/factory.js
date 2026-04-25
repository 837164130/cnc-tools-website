// Factory Strength Display
class FactoryStrength {
  constructor() {
    this.init();
  }

  init() {
    this.displayFactory();
  }

  displayFactory() {
    const container = document.querySelector('[data-factory]');
    if (!container) return;

    const stats = JSON.parse(container.dataset.factory || '[]');
    if (stats.length === 0) {
      stats.push(
        { label: '厂房面积', value: '50,000', unit: '㎡' },
        { label: '员工人数', value: '500', unit: '人' },
        { label: '年产能', value: '1000', unit: '万件' },
        { label: '数控设备', value: '200', unit: '台' },
        { label: '检测设备', value: '50', unit: '台' },
        { label: '研发团队', value: '80', unit: '人' }
      );
    }

    container.innerHTML = '<h3 style="margin-bottom: 24px;">工厂实力</h3>';

    const grid = document.createElement('div');
    grid.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 16px;';

    stats.forEach(stat => {
      const card = document.createElement('div');
      card.style.cssText = `
        padding: 24px;
        background: var(--bg-secondary);
        border-radius: 12px;
        text-align: center;
        transition: transform 0.2s;
      `;

      card.innerHTML = `
        <div style="font-size: 32px; font-weight: 700; color: #0071e3; margin-bottom: 8px;">${stat.value}<span style="font-size: 16px;">${stat.unit}</span></div>
        <div style="font-size: 14px; color: var(--text-secondary);">${stat.label}</div>
      `;

      card.addEventListener('mouseenter', () => {
        card.style.transform = 'scale(1.05)';
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });

      grid.appendChild(card);
    });

    container.appendChild(grid);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new FactoryStrength();
});
