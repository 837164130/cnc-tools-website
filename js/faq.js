// Product FAQ Accordion
class ProductFAQ {
  constructor() {
    this.init();
  }

  init() {
    this.displayFAQ();
  }

  displayFAQ() {
    const container = document.querySelector('[data-faq]');
    if (!container) return;

    const faqs = JSON.parse(container.dataset.faq || '[]');
    if (faqs.length === 0) return;

    container.innerHTML = '<h3 style="margin-bottom: 24px;">常见问题</h3>';

    const accordion = document.createElement('div');
    accordion.style.cssText = 'display: grid; gap: 12px;';

    faqs.forEach((faq, index) => {
      const item = document.createElement('div');
      item.style.cssText = `
        background: var(--bg-secondary);
        border-radius: 12px;
        overflow: hidden;
      `;

      const header = document.createElement('button');
      header.style.cssText = `
        width: 100%;
        padding: 16px 20px;
        background: none;
        border: none;
        text-align: left;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 16px;
        font-weight: 600;
      `;
      header.innerHTML = `
        <span>${faq.question}</span>
        <span class="faq-icon" style="transition: transform 0.3s;">▼</span>
      `;

      const content = document.createElement('div');
      content.style.cssText = `
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.3s ease-out;
      `;
      content.innerHTML = `
        <div style="padding: 0 20px 16px; color: var(--text-secondary); line-height: 1.6;">
          ${faq.answer}
        </div>
      `;

      header.addEventListener('click', () => {
        const isOpen = content.style.maxHeight !== '0px' && content.style.maxHeight !== '';
        
        // Close all others
        accordion.querySelectorAll('[style*="max-height"]').forEach(el => {
          el.style.maxHeight = '0px';
        });
        accordion.querySelectorAll('.faq-icon').forEach(icon => {
          icon.style.transform = 'rotate(0deg)';
        });

        if (!isOpen) {
          content.style.maxHeight = content.scrollHeight + 'px';
          header.querySelector('.faq-icon').style.transform = 'rotate(180deg)';
        }
      });

      item.appendChild(header);
      item.appendChild(content);
      accordion.appendChild(item);
    });

    container.appendChild(accordion);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ProductFAQ();
});
