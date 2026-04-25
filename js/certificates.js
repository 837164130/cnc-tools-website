// Certificates & Awards Display
class Certificates {
  constructor() {
    this.init();
  }

  init() {
    this.displayCertificates();
  }

  displayCertificates() {
    const container = document.querySelector('[data-certificates]');
    if (!container) return;

    const certs = JSON.parse(container.dataset.certificates || '[]');
    if (certs.length === 0) {
      // Default certificates
      certs.push(
        { name: 'ISO 9001', type: '质量管理体系认证', year: '2023' },
        { name: 'ISO 14001', type: '环境管理体系认证', year: '2023' },
        { name: 'CE认证', type: '欧盟产品安全认证', year: '2022' },
        { name: '高新技术企业', type: '国家认定', year: '2022' },
        { name: 'AAA级信用企业', type: '信用评级', year: '2023' },
        { name: '专精特新企业', type: '政府认定', year: '2023' }
      );
    }

    container.innerHTML = '<h3 style="margin-bottom: 24px;">资质证书</h3>';

    const grid = document.createElement('div');
    grid.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 16px;';

    certs.forEach(cert => {
      const card = document.createElement('div');
      card.style.cssText = `
        padding: 20px;
        background: var(--bg-secondary);
        border-radius: 12px;
        text-align: center;
        transition: transform 0.2s, box-shadow 0.2s;
        cursor: pointer;
        border: 2px solid transparent;
      `;

      card.innerHTML = `
        <div style="
          width: 64px;
          height: 64px;
          background: linear-gradient(135deg, #0071e3, #5856d6);
          border-radius: 50%;
          margin: 0 auto 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 28px;
        ">🏆</div>
        <div style="font-weight: 600; margin-bottom: 4px;">${cert.name}</div>
        <div style="font-size: 14px; color: var(--text-secondary); margin-bottom: 8px;">${cert.type}</div>
        <div style="font-size: 12px; color: var(--text-tertiary);">${cert.year}年获得</div>
      `;

      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-4px)';
        card.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)';
        card.style.borderColor = '#0071e3';
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.boxShadow = '';
        card.style.borderColor = 'transparent';
      });

      grid.appendChild(card);
    });

    container.appendChild(grid);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new Certificates();
});
