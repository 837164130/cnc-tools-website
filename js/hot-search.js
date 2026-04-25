// Hot Search Keywords
class HotSearch {
  constructor() {
    this.init();
  }

  init() {
    this.displayHotSearch();
  }

  displayHotSearch() {
    const container = document.querySelector('[data-hot-search]');
    if (!container) return;

    const keywords = [
      '硬质合金铣刀',
      '数控刀片',
      '钻头',
      '丝锥',
      '刀柄',
      '卡簧',
      '车刀',
      '测量工具'
    ];

    container.innerHTML = '<h3 style="margin-bottom: 16px;">热门搜索</h3>';

    const tags = document.createElement('div');
    tags.style.cssText = 'display: flex; flex-wrap: wrap; gap: 8px;';

    keywords.forEach(keyword => {
      const tag = document.createElement('a');
      tag.href = `search.html?q=${encodeURIComponent(keyword)}`;
      tag.style.cssText = `
        padding: 8px 16px;
        background: var(--bg-secondary);
        border-radius: 20px;
        text-decoration: none;
        color: var(--text-primary);
        font-size: 14px;
        transition: all 0.2s;
        border: 1px solid var(--border);
      `;

      tag.textContent = keyword;

      tag.addEventListener('mouseenter', () => {
        tag.style.background = '#0071e3';
        tag.style.color = 'white';
        tag.style.borderColor = '#0071e3';
      });

      tag.addEventListener('mouseleave', () => {
        tag.style.background = '';
        tag.style.color = '';
        tag.style.borderColor = '';
      });

      tags.appendChild(tag);
    });

    container.appendChild(tags);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new HotSearch();
});
