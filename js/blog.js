// Product Blog Posts
class ProductBlog {
  constructor() {
    this.init();
  }

  init() {
    this.displayBlog();
  }

  displayBlog() {
    const container = document.querySelector('[data-blog]');
    if (!container) return;

    const posts = JSON.parse(container.dataset.blog || '[]');
    if (posts.length === 0) return;

    container.innerHTML = '<h3 style="margin-bottom: 24px;">技术博客</h3>';

    const grid = document.createElement('div');
    grid.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 16px;';

    posts.forEach(post => {
      const card = document.createElement('a');
      card.href = post.url || '#';
      card.style.cssText = `
        display: block;
        padding: 24px;
        background: var(--bg-secondary);
        border-radius: 12px;
        text-decoration: none;
        color: inherit;
        transition: transform 0.2s, box-shadow 0.2s;
      `;

      card.innerHTML = `
        <div style="display: flex; gap: 12px; margin-bottom: 12px;">
          <span style="
            padding: 4px 10px;
            background: var(--bg-tertiary);
            border-radius: 12px;
            font-size: 12px;
            color: var(--text-secondary);
          ">${post.category || '技术'}</span>
          <span style="font-size: 12px; color: var(--text-secondary);">${post.date || ''}</span>
        </div>
        <h4 style="margin: 0 0 8px; font-size: 16px; line-height: 1.4;">${post.title}</h4>
        <p style="margin: 0; color: var(--text-secondary); font-size: 14px; line-height: 1.6; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;">${post.summary || ''}</p>
        <div style="margin-top: 12px; font-size: 14px; color: #0071e3;">阅读更多 →</div>
      `;

      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-4px)';
        card.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)';
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.boxShadow = '';
      });

      grid.appendChild(card);
    });

    container.appendChild(grid);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ProductBlog();
});
