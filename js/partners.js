// Partners / Brand Logos
class Partners {
  constructor() {
    this.init();
  }

  init() {
    this.displayPartners();
  }

  displayPartners() {
    const container = document.querySelector('[data-partners]');
    if (!container) return;

    const partners = JSON.parse(container.dataset.partners || '[]');
    if (partners.length === 0) {
      // Default partners for CNC industry
      partners.push(
        { name: 'DMG MORI', type: '机床制造商' },
        { name: 'Mazak', type: '机床制造商' },
        { name: 'Haas', type: '机床制造商' },
        { name: 'GF Machining', type: '精密加工' },
        { name: 'Sandvik', type: '刀具合作伙伴' },
        { name: 'Kennametal', type: '刀具合作伙伴' },
        { name: 'Mitsubishi', type: '刀具合作伙伴' },
        { name: 'OSG', type: '刀具合作伙伴' }
      );
    }

    container.innerHTML = '<h3 style="margin-bottom: 24px;">合作伙伴</h3>';

    const grid = document.createElement('div');
    grid.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 20px;';

    partners.forEach(partner => {
      const card = document.createElement('div');
      card.style.cssText = `
        padding: 24px;
        background: var(--bg-secondary);
        border-radius: 12px;
        text-align: center;
        transition: transform 0.2s, box-shadow 0.2s;
        cursor: pointer;
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
          font-size: 24px;
          font-weight: 700;
        ">${partner.name[0]}</div>
        <div style="font-weight: 600; margin-bottom: 4px;">${partner.name}</div>
        <div style="font-size: 14px; color: var(--text-secondary);">${partner.type}</div>
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
  new Partners();
});
