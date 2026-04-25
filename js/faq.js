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

    const faqs = [
      { q: '如何选择合适的刀具涂层？', a: '根据加工材料选择：TiN适用于一般钢材，TiAlN适合高速加工，DLC适合有色金属。具体可咨询我们的技术团队。' },
      { q: '刀具的正常使用寿命是多少？', a: '取决于加工材料、切削参数和工况。一般情况下，硬质合金铣刀加工钢材可达2-4小时，具体请参考产品说明书。' },
      { q: '可以定制非标刀具吗？', a: '可以。我们提供定制服务，请提供图纸或样品，技术团队将在24小时内给出方案和报价。' },
      { q: '如何正确存储刀具？', a: '存放于干燥环境，避免碰撞，涂层刀具不宜长期暴露于潮湿环境。建议使用原装包装盒存放。' },
      { q: '批量采购有优惠吗？', a: '有的。单次订单满1000元享95折，满5000元享9折，满10000元享85折。具体请联系销售。' }
    ];

    container.innerHTML = '<h3 style="margin-bottom: 16px;">常见问题</h3>';

    const list = document.createElement('div');
    list.style.cssText = 'display: grid; gap: 8px;';

    faqs.forEach((faq, index) => {
      const item = document.createElement('div');
      item.style.cssText = `
        background: var(--bg-secondary);
        border-radius: 12px;
        overflow: hidden;
      `;

      item.innerHTML = `
        <button class="faq-question" style="
          width: 100%;
          padding: 16px 20px;
          background: none;
          border: none;
          text-align: left;
          cursor: pointer;
          font-size: 16px;
          font-weight: 600;
          display: flex;
          justify-content: space-between;
          align-items: center;
        ">
          <span>${faq.q}</span>
          <span class="faq-icon" style="transition: transform 0.3s;">▼</span>
        </button>
        <div class="faq-answer" style="
          padding: 0 20px;
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s, padding 0.3s;
        ">
          <p style="padding-bottom: 16px; color: var(--text-secondary); line-height: 1.6;">${faq.a}</p>
        </div>
      `;

      const question = item.querySelector('.faq-question');
      const answer = item.querySelector('.faq-answer');
      const icon = item.querySelector('.faq-icon');

      question.addEventListener('click', () => {
        const isOpen = answer.style.maxHeight !== '0px' && answer.style.maxHeight !== '';
        
        // Close all others
        document.querySelectorAll('.faq-answer').forEach(a => {
          a.style.maxHeight = '0px';
          a.style.paddingTop = '0';
          a.style.paddingBottom = '0';
        });
        document.querySelectorAll('.faq-icon').forEach(i => {
          i.style.transform = 'rotate(0deg)';
        });

        if (!isOpen) {
          answer.style.maxHeight = answer.scrollHeight + 'px';
          answer.style.paddingTop = '0';
          answer.style.paddingBottom = '16px';
          icon.style.transform = 'rotate(180deg)';
        }
      });

      list.appendChild(item);
    });

    container.appendChild(list);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ProductFAQ();
});
