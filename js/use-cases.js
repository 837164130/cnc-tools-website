// Use Cases / Applications Showcase
class UseCases {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('[data-use-cases]').forEach(container => {
      this.setupUseCases(container);
    });
  }

  setupUseCases(container) {
    const cases = JSON.parse(container.dataset.useCases || '[]');
    if (cases.length === 0) return;

    container.innerHTML = `
      <h3 style="margin-bottom: 24px;">应用案例</h3>
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 24px;">
        ${cases.map((useCase, index) => `
          <div class="use-case-card" style="background: var(--bg-secondary); border-radius: 16px; overflow: hidden; cursor: pointer; transition: transform 0.3s, box-shadow 0.3s;" data-index="${index}">
            <div style="aspect-ratio: 16/10; background: linear-gradient(135deg, var(--bg-tertiary), var(--bg-secondary)); display: flex; align-items: center; justify-content: center;">
              <span style="font-size: 48px;">${useCase.icon}</span>
            </div>
            <div style="padding: 20px;">
              <h4 style="margin-bottom: 8px;">${useCase.title}</h4>
              <p style="color: var(--text-secondary); font-size: 14px; line-height: 1.6;">${useCase.description}</p>
              <div style="margin-top: 12px; display: flex; gap: 8px; flex-wrap: wrap;">
                ${useCase.tags.map(tag => `
                  <span style="padding: 4px 12px; background: var(--accent); color: white; border-radius: 20px; font-size: 12px;">${tag}</span>
                `).join('')}
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    container.querySelectorAll('.use-case-card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px)';
        card.style.boxShadow = '0 12px 24px rgba(0,0,0,0.15)';
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = 'none';
      });

      card.addEventListener('click', () => {
        const index = parseInt(card.dataset.index);
        this.showDetail(cases[index]);
      });
    });
  }

  showDetail(useCase) {
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
      <div style="background: var(--bg-primary); border-radius: 16px; max-width: 600px; width: 100%; max-height: 90vh; overflow-y: auto; position: relative;">
        <button class="close-modal" style="position: absolute; top: 16px; right: 16px; background: none; border: none; font-size: 24px; cursor: pointer; z-index: 10;">✕</button>
        <div style="padding: 32px;">
          <div style="font-size: 64px; margin-bottom: 16px;">${useCase.icon}</div>
          <h2 style="margin-bottom: 16px;">${useCase.title}</h2>
          <p style="color: var(--text-secondary); line-height: 1.8; margin-bottom: 24px;">${useCase.fullDescription || useCase.description}</p>
          
          <div style="margin-bottom: 24px;">
            <h4 style="margin-bottom: 12px;">技术参数</h4>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
              ${Object.entries(useCase.specs || {}).map(([key, value]) => `
                <div style="padding: 12px; background: var(--bg-secondary); border-radius: 8px;">
                  <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 4px;">${key}</div>
                  <div style="font-weight: 600;">${value}</div>
                </div>
              `).join('')}
            </div>
          </div>

          <div style="display: flex; gap: 12px; flex-wrap: wrap;">
            ${useCase.tags.map(tag => `
              <span style="padding: 6px 16px; background: var(--accent); color: white; border-radius: 20px; font-size: 14px;">${tag}</span>
            `).join('')}
          </div>
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
  new UseCases();
});
