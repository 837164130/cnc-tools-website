// Product Certifications
class Certifications {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('[data-certifications]').forEach(container => {
      this.setupCertifications(container);
    });
  }

  setupCertifications(container) {
    const certs = JSON.parse(container.dataset.certifications || '[]');
    if (certs.length === 0) return;

    container.innerHTML = `
      <h3 style="margin-bottom: 24px;">产品认证</h3>
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 20px;">
        ${certs.map(cert => `
          <div class="cert-card" style="background: var(--bg-secondary); border-radius: 16px; padding: 24px; text-align: center; transition: transform 0.3s, box-shadow 0.3s; cursor: pointer;" onmouseover="this.style.transform='translateY(-4px)'; this.style.boxShadow='0 8px 24px rgba(0,0,0,0.1)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'">
            <div style="width: 80px; height: 80px; margin: 0 auto 16px; background: linear-gradient(135deg, var(--accent), #5856d6); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 36px;">
              ${cert.icon}
            </div>
            <h4 style="margin-bottom: 8px; font-size: 16px;">${cert.name}</h4>
            <p style="font-size: 14px; color: var(--text-secondary); margin-bottom: 12px;">${cert.description}</p>
            <div style="font-size: 12px; color: var(--accent); font-weight: 600;">${cert.standard}</div>
          </div>
        `).join('')}
      </div>
    `;

    container.querySelectorAll('.cert-card').forEach(card => {
      card.addEventListener('click', () => {
        this.showCertDetail(card.querySelector('h4').textContent);
      });
    });
  }

  showCertDetail(certName) {
    const modal = document.createElement('div');
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      padding: 20px;
      opacity: 0;
      transition: opacity 0.3s;
    `;

    modal.innerHTML = `
      <div style="background: var(--bg-primary); border-radius: 16px; max-width: 500px; width: 100%; padding: 32px; position: relative;">
        <button class="close-modal" style="position: absolute; top: 16px; right: 16px; background: none; border: none; font-size: 24px; cursor: pointer;">✕</button>
        <div style="text-align: center;">
          <div style="width: 100px; height: 100px; margin: 0 auto 20px; background: linear-gradient(135deg, var(--accent), #5856d6); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 48px;">
            📜
          </div>
          <h2 style="margin-bottom: 16px;">${certName}</h2>
          <p style="color: var(--text-secondary); line-height: 1.8; margin-bottom: 24px;">
            该产品已通过${certName}认证，符合国际标准要求。
            认证确保产品质量、安全性和性能达到行业领先水平。
          </p>
          <div style="background: var(--bg-secondary); border-radius: 12px; padding: 20px; margin-bottom: 24px;">
            <div style="font-size: 14px; color: var(--text-secondary); margin-bottom: 8px;">认证编号</div>
            <div style="font-family: monospace; font-size: 18px; font-weight: 600;">CERT-${Math.random().toString(36).substr(2, 9).toUpperCase()}</div>
          </div>
          <button class="btn btn-primary" style="width: 100%;">下载证书</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    requestAnimationFrame(() => {
      modal.style.opacity = '1';
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.classList.contains('close-modal')) {
        modal.style.opacity = '0';
        setTimeout(() => {
          modal.remove();
          document.body.style.overflow = '';
        }, 300);
      }
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new Certifications();
});
