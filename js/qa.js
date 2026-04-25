// Product Q&A
class ProductQA {
  constructor() {
    this.init();
  }

  init() {
    this.attachEventListeners();
    this.displayQA();
  }

  attachEventListeners() {
    const form = document.querySelector('[data-qa-form]');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.submitQuestion(form);
      });
    }
  }

  submitQuestion(form) {
    const formData = new FormData(form);
    const question = {
      name: formData.get('name') || '匿名用户',
      question: formData.get('question') || '',
      date: new Date().toLocaleDateString('zh-CN'),
      answers: []
    };

    const productId = form.dataset.qaForm;
    const key = `qa_${productId}`;
    const qa = JSON.parse(localStorage.getItem(key) || '[]');
    qa.unshift(question);
    localStorage.setItem(key, JSON.stringify(qa));

    form.reset();
    this.displayQA();

    if (window.notifications) {
      window.notifications.show('问题提交成功', 'success');
    }
  }

  displayQA() {
    const container = document.querySelector('[data-qa]');
    if (!container) return;

    const productId = container.dataset.qa;
    const key = `qa_${productId}`;
    const qa = JSON.parse(localStorage.getItem(key) || '[]');

    let html = '<h3 style="margin-bottom: 16px;">产品问答</h3>';

    if (qa.length === 0) {
      html += '<p style="text-align: center; color: var(--text-secondary); padding: 32px;">暂无问答，成为第一个提问的人吧！</p>';
    } else {
      html += '<div class="qa-list">';
      qa.forEach((item, index) => {
        html += `
          <div class="qa-item" style="padding: 16px; border-bottom: 1px solid var(--border);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <div style="font-weight: 600;">${item.name}</div>
              <div style="color: var(--text-secondary); font-size: 14px;">${item.date}</div>
            </div>
            <div style="margin-bottom: 12px;">
              <span style="color: #0071e3; font-weight: 600;">Q:</span> ${item.question}
            </div>
            ${item.answers.length > 0 ? `
              <div style="padding: 12px; background: var(--bg-secondary); border-radius: 8px; margin-top: 8px;">
                ${item.answers.map(ans => `
                  <div style="margin-bottom: 8px;">
                    <span style="color: #34c759; font-weight: 600;">A:</span> ${ans.answer}
                    <div style="font-size: 12px; color: var(--text-secondary); margin-top: 4px;">— ${ans.name}, ${ans.date}</div>
                  </div>
                `).join('')}
              </div>
            ` : ''}
          </div>
        `;
      });
      html += '</div>';
    }

    container.innerHTML = html;
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ProductQA();
});
