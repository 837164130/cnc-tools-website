// FAQ Accordion
class FAQAccordion {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('[data-faq]').forEach(container => {
      this.setupFAQ(container);
    });
  }

  setupFAQ(container) {
    const faqs = JSON.parse(container.dataset.faq || '[]');
    if (faqs.length === 0) return;

    container.innerHTML = `
      <h3 style="margin-bottom: 24px;">常见问题</h3>
      <div class="faq-list" style="display: flex; flex-direction: column; gap: 12px;">
        ${faqs.map((faq, index) => `
          <div class="faq-item" style="border: 1px solid var(--border); border-radius: 12px; overflow: hidden;">
            <button class="faq-question" style="width: 100%; padding: 20px; background: var(--bg-secondary); border: none; text-align: left; cursor: pointer; display: flex; justify-content: space-between; align-items: center; font-size: 16px; font-weight: 600; transition: background 0.2s;" data-index="${index}">
              <span>${faq.question}</span>
              <span class="faq-icon" style="transition: transform 0.3s;">▼</span>
            </button>
            <div class="faq-answer" style="max-height: 0; overflow: hidden; transition: max-height 0.3s;">
              <div style="padding: 0 20px 20px; color: var(--text-secondary); line-height: 1.8;">
                ${faq.answer}
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    container.querySelectorAll('.faq-question').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.parentElement;
        const answer = item.querySelector('.faq-answer');
        const icon = btn.querySelector('.faq-icon');
        const isOpen = answer.style.maxHeight !== '0px' && answer.style.maxHeight !== '';

        // Close all others
        container.querySelectorAll('.faq-answer').forEach(a => {
          a.style.maxHeight = '0px';
        });
        container.querySelectorAll('.faq-icon').forEach(i => {
          i.style.transform = 'rotate(0deg)';
        });

        if (!isOpen) {
          answer.style.maxHeight = answer.scrollHeight + 'px';
          icon.style.transform = 'rotate(180deg)';
        }
      });
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new FAQAccordion();
});
