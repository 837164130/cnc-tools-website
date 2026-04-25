// Comments System
class CommentsSystem {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('[data-comments]').forEach(container => {
      this.setupComments(container);
    });
  }

  setupComments(container) {
    const form = container.querySelector('.comment-form');
    const list = container.querySelector('.comments-list');

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.addComment(form, list);
      });
    }
  }

  addComment(form, list) {
    const textarea = form.querySelector('textarea');
    const name = form.querySelector('input[name="name"]');
    const content = textarea.value.trim();
    const author = name ? name.value.trim() : '匿名用户';

    if (!content) return;

    const comment = document.createElement('div');
    comment.className = 'comment';
    comment.style.cssText = `
      padding: 16px;
      border-bottom: 1px solid var(--border);
      animation: fadeInUp 0.3s;
    `;

    const date = new Date().toLocaleDateString('zh-CN');

    comment.innerHTML = `
      <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
        <div style="width: 40px; height: 40px; border-radius: 50%; background: var(--accent); display: flex; align-items: center; justify-content: center; color: white; font-weight: 600;">
          ${author.charAt(0).toUpperCase()}
        </div>
        <div>
          <div style="font-weight: 600;">${author}</div>
          <div style="font-size: 12px; color: var(--text-secondary);">${date}</div>
        </div>
      </div>
      <div style="line-height: 1.6;">${content}</div>
    `;

    list.insertBefore(comment, list.firstChild);
    textarea.value = '';

    if (window.notifications) {
      window.notifications.show('评论已发布', 'success');
    }
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new CommentsSystem();
});
