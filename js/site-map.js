// Site Map / Navigation Helper
class SiteMap {
  constructor() {
    this.init();
  }

  init() {
    this.displaySiteMap();
  }

  displaySiteMap() {
    const container = document.querySelector('[data-site-map]');
    if (!container) return;

    const sections = [
      {
        title: '产品中心',
        links: [
          { name: '铣刀系列', url: 'products/endmills.html' },
          { name: '钻头系列', url: 'products/drills.html' },
          { name: '车刀系列', url: 'products/turning-tools.html' },
          { name: '刀柄系列', url: 'products/tool-holders.html' },
          { name: '卡簧系列', url: 'products/collets.html' },
          { name: '刀盘系列', url: 'products/arbors.html' },
          { name: '丝锥系列', url: 'products/taps.html' },
          { name: '测量工具', url: 'products/measuring-tools.html' }
        ]
      },
      {
        title: '服务支持',
        links: [
          { name: '技术文档', url: '#' },
          { name: '视频教程', url: '#' },
          { name: '常见问题', url: '#' },
          { name: '售后服务', url: '#' },
          { name: '联系我们', url: 'contact.html' }
        ]
      },
      {
        title: '关于我们',
        links: [
          { name: '公司介绍', url: 'about.html' },
          { name: '发展历程', url: '#' },
          { name: '资质证书', url: '#' },
          { name: '合作伙伴', url: '#' },
          { name: '团队介绍', url: '#' }
        ]
      }
    ];

    container.innerHTML = '<h3 style="margin-bottom: 24px;">网站地图</h3>';

    const grid = document.createElement('div');
    grid.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 24px;';

    sections.forEach(section => {
      const column = document.createElement('div');
      
      let linksHtml = section.links.map(link => `
        <li style="margin-bottom: 8px;">
          <a href="${link.url}" style="
            color: var(--text-secondary);
            text-decoration: none;
            font-size: 14px;
            transition: color 0.2s;
          " onmouseover="this.style.color='#0071e3'" onmouseout="this.style.color='var(--text-secondary)'">${link.name}</a>
        </li>
      `).join('');

      column.innerHTML = `
        <h4 style="margin-bottom: 12px; font-size: 16px;">${section.title}</h4>
        <ul style="list-style: none; padding: 0; margin: 0;">${linksHtml}</ul>
      `;

      grid.appendChild(column);
    });

    container.appendChild(grid);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new SiteMap();
});
