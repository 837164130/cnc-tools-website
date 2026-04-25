// Product Survey / Feedback Form
class ProductSurvey {
  constructor() {
    this.init();
  }

  init() {
    this.displaySurvey();
  }

  displaySurvey() {
    const container = document.querySelector('[data-survey]');
    if (!container) return;

    const survey = JSON.parse(container.dataset.survey || '{}');

    container.innerHTML = `
      <div style="
        padding: 24px;
        background: var(--bg-secondary);
        border-radius: 12px;
      ">
        <h3 style="margin-bottom: 8px;">${survey.title || '产品调查'}</h3>
        <p style="margin-bottom: 24px; color: var(--text-secondary);">${survey.description || '您的反馈对我们很重要'}</p>
        
        <form class="survey-form">
          ${(survey.questions || []).map((q, i) => `
            <div style="margin-bottom: 20px;">
              <label style="display: block; margin-bottom: 8px; font-weight: 600;">${i + 1}. ${q.text}</label>
              
              ${q.type === 'rating' ? `
                <div style="display: flex; gap: 8px;">
                  ${[1, 2, 3, 4, 5].map(star => `
                    <label style="cursor: pointer; font-size: 24px; color: var(--text-secondary); transition: color 0.2s;">
                      <input type="radio" name="q${i}" value="${star}" style="display: none;">
                      <span class="star">★</span>
                    </label>
                  `).join('')}
                </div>
              ` : q.type === 'choice' ? `
                <div style="display: grid; gap: 8px;">
                  ${(q.options || []).map(opt => `
                    <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; padding: 8px; background: var(--bg-tertiary); border-radius: 8px;">
                      <input type="${q.multiple ? 'checkbox' : 'radio'}" name="q${i}" value="${opt}">
                      <span>${opt}</span>
                    </label>
                  `).join('')}
                </div>
              ` : `
                <textarea name="q${i}" rows="3" placeholder="请输入您的回答..." style="
                  width: 100%;
                  padding: 12px;
                  border: 1px solid var(--border);
                  border-radius: 8px;
                  resize: vertical;
                "></textarea>
              `}
            </div>
          `).join('')}
          
          <button type="submit" style="
            width: 100%;
            padding: 14px;
            background: #0071e3;
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 16px;
            font-weight: 600;
          ">提交调查</button>
        </form>
      </div>
    `;

    // Star rating interaction
    container.querySelectorAll('.star').forEach(star => {
      star.addEventListener('mouseenter', function() {
        this.style.color = '#ff9500';
        let prev = this.parentElement.previousElementSibling;
        while (prev) {
          prev.querySelector('.star').style.color = '#ff9500';
          prev = prev.previousElementSibling;
        }
      });
      star.addEventListener('mouseleave', function() {
        container.querySelectorAll('.star').forEach(s => s.style.color = 'var(--text-secondary)');
        container.querySelectorAll('input[type="radio"]:checked').forEach(checked => {
          const star = checked.parentElement.querySelector('.star');
          if (star) star.style.color = '#ff9500';
          let prev = checked.parentElement.previousElementSibling;
          while (prev) {
            const s = prev.querySelector('.star');
            if (s) s.style.color = '#ff9500';
            prev = prev.previousElementSibling;
          }
        });
      });
    });

    // Form submission
    container.querySelector('.survey-form').addEventListener('submit', (e) => {
      e.preventDefault();
      if (window.notifications) {
        window.notifications.show('感谢您的参与！调查已提交', 'success');
      }
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ProductSurvey();
});
