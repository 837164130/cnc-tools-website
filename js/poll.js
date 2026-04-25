// Product Poll / Voting
class ProductPoll {
  constructor() {
    this.init();
  }

  init() {
    this.displayPoll();
  }

  displayPoll() {
    const container = document.querySelector('[data-poll]');
    if (!container) return;

    const poll = JSON.parse(container.dataset.poll || '{}');

    container.innerHTML = `
      <div style="
        padding: 24px;
        background: var(--bg-secondary);
        border-radius: 12px;
      ">
        <h3 style="margin-bottom: 8px;">${poll.question || '您最喜欢哪个功能？'}</h3>
        <p style="margin-bottom: 20px; color: var(--text-secondary); font-size: 14px;">${poll.description || '参与投票，告诉我们您的想法'}</p>
        
        <div class="poll-options" style="display: grid; gap: 12px;">
          ${(poll.options || []).map((option, i) => `
            <button class="poll-option" data-index="${i}" style="
              width: 100%;
              padding: 16px;
              background: var(--bg-tertiary);
              border: 2px solid transparent;
              border-radius: 12px;
              cursor: pointer;
              text-align: left;
              font-size: 14px;
              transition: all 0.2s;
              position: relative;
              overflow: hidden;
            ">
              <div style="display: flex; justify-content: space-between; align-items: center; position: relative; z-index: 1;">
                <span>${option.text}</span>
                <span class="poll-percent" style="font-weight: 600; color: #0071e3; display: none;">${option.percent || 0}%</span>
              </div>
              <div class="poll-bar" style="
                position: absolute;
                left: 0;
                top: 0;
                bottom: 0;
                background: #0071e310;
                width: 0%;
                transition: width 0.5s ease;
              "></div>
            </button>
          `).join('')}
        </div>
        
        <div style="margin-top: 16px; font-size: 12px; color: var(--text-secondary); text-align: center;">
          已有 ${poll.totalVotes || 0} 人参与投票
        </div>
      </div>
    `;

    // Poll interaction
    container.querySelectorAll('.poll-option').forEach(btn => {
      btn.addEventListener('click', function() {
        const options = container.querySelectorAll('.poll-option');
        options.forEach(opt => {
          opt.disabled = true;
          opt.style.cursor = 'default';
          const percent = opt.querySelector('.poll-percent');
          const bar = opt.querySelector('.poll-bar');
          if (percent) percent.style.display = 'block';
          if (bar) {
            const p = parseInt(percent.textContent) || 0;
            setTimeout(() => { bar.style.width = p + '%'; }, 100);
          }
        });
        
        this.style.borderColor = '#0071e3';
        
        if (window.notifications) {
          window.notifications.show('投票成功！感谢您的参与', 'success');
        }
      });
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ProductPoll();
});
