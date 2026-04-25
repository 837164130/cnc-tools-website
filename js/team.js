// Product Team
class ProductTeam {
  constructor() {
    this.init();
  }

  init() {
    this.displayTeam();
  }

  displayTeam() {
    const container = document.querySelector('[data-team]');
    if (!container) return;

    const members = JSON.parse(container.dataset.team || '[]');
    if (members.length === 0) return;

    container.innerHTML = '<h3 style="margin-bottom: 24px;">技术团队</h3>';

    const grid = document.createElement('div');
    grid.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px;';

    members.forEach(member => {
      const card = document.createElement('div');
      card.style.cssText = `
        padding: 24px;
        background: var(--bg-secondary);
        border-radius: 12px;
        text-align: center;
        transition: transform 0.2s, box-shadow 0.2s;
      `;

      card.innerHTML = `
        <div style="
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #0071e3, #5856d6);
          border-radius: 50%;
          margin: 0 auto 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 32px;
          font-weight: 600;
        ">${member.name ? member.name[0] : 'U'}</div>
        <div style="font-weight: 600; margin-bottom: 4px;">${member.name}</div>
        <div style="font-size: 14px; color: var(--text-secondary); margin-bottom: 8px;">${member.role}</div>
        <div style="font-size: 12px; color: var(--text-secondary);">${member.bio || ''}</div>
      `;

      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-4px)';
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
  new ProductTeam();
});
