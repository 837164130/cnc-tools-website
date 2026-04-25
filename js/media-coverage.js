// Media Coverage Display
class MediaCoverage {
  constructor() {
    this.init();
  }

  init() {
    this.displayMedia();
  }

  displayMedia() {
    const container = document.querySelector('[data-media-coverage]');
    if (!container) return;

    const articles = [
      { title: 'CCCNC：国产数控刀具的崛起之路', source: '中国工业报', date: '2024-01-10' },
      { title: '高端制造背后的"隐形冠军"', source: '经济日报', date: '2023-12-15' },
      { title: '数控刀具行业技术突破', source: '科技日报', date: '2023-11-20' },
      { title: '从跟跑到领跑：中国刀具品牌出海记', source: '21世纪经济报道', date: '2023-10-08' }
    ];

    container.innerHTML = '<h3 style="margin-bottom: 16px;">媒体报道</h3>';

    const list = document.createElement('div');
    list.style.cssText = 'display: grid; gap: 12px;';

    articles.forEach(article => {
      const card = document.createElement('a');
      card.href = '#';
      card.style.cssText = `
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 16px;
        background: var(--bg-secondary);
        border-radius: 12px;
        text-decoration: none;
        color: inherit;
        transition: transform 0.2s, box-shadow 0.2s;
      `;

      card.innerHTML = `
        <div style="font-size: 24px;">📰</div>
        <div style="flex: 1;">
          <div style="font-weight: 600; margin-bottom: 4px;">${article.title}</div>
          <div style="font-size: 14px; color: var(--text-secondary);">
            ${article.source} · ${article.date}
          </div>
        </div>
        <div style="color: #0071e3; font-size: 14px;">阅读 →</div>
      `;

      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateX(4px)';
        card.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.boxShadow = '';
      });

      list.appendChild(card);
    });

    container.appendChild(list);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new MediaCoverage();
});
