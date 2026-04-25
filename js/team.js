// Team Members Display
class TeamMembers {
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
    if (members.length === 0) {
      members.push(
        { name: '张工', role: '技术总监', desc: '20年数控刀具研发经验' },
        { name: '李工', role: '生产经理', desc: '精通精密制造工艺' },
        { name: '王工', role: '质量主管', desc: '严格把控产品质量' },
        { name: '陈工', role: '销售总监', desc: '深耕行业客户关系' }
      );
    }

    container.innerHTML = '<h3 style="margin-bottom: 24px;">核心团队</h3>';

    const grid = document.createElement('div');
    grid.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 20px;';

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
          margin: 0 auto 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 32px;
          font-weight: 700;
        ">${member.name[0]}</div>
        <div style="font-weight: 600; margin-bottom: 4px;">${member.name}</div>
        <div style="font-size: 14px; color: #0071e3; margin-bottom: 8px;">${member.role}</div>
        <div style="font-size: 14px; color: var(--text-secondary);">${member.desc}</div>
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
  new TeamMembers();
});
