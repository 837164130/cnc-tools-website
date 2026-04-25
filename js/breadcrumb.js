// Breadcrumb Navigation
class Breadcrumb {
  constructor() {
    this.init();
  }

  init() {
    this.generateBreadcrumb();
  }

  generateBreadcrumb() {
    const path = window.location.pathname;
    const parts = path.split('/').filter(p => p);
    
    if (parts.length === 0) return;

    const breadcrumbContainer = document.createElement('nav');
    breadcrumbContainer.className = 'breadcrumb';
    breadcrumbContainer.style.cssText = `
      max-width: 1024px;
      margin: 0 auto;
      padding: 20px 22px;
      display: flex;
      gap: 8px;
      align-items: center;
      font-size: 14px;
      color: var(--text-secondary);
    `;

    // Home link
    breadcrumbContainer.innerHTML = `<a href="/" style="color: var(--primary); text-decoration: none;">首页</a>`;

    // Build path
    let currentPath = '';
    parts.forEach((part, index) => {
      currentPath += `/${part}`;
      const isLast = index === parts.length - 1;
      const name = this.getPageName(part);

      breadcrumbContainer.innerHTML += `
        <span style="color: var(--border);">/</span>
        ${isLast 
          ? `<span style="color: var(--text);">${name}</span>`
          : `<a href="${currentPath}" style="color: var(--primary); text-decoration: none;">${name}</a>`
        }
      `;
    });

    // Insert after nav
    const nav = document.querySelector('.nav-wrapper');
    if (nav) {
      nav.insertAdjacentElement('afterend', breadcrumbContainer);
    }
  }

  getPageName(part) {
    const names = {
      'products': '产品',
      'detail': '详情',
      'endmills': '铣刀',
      'drills': '钻头',
      'taps': '丝锥',
      'reamers': '铰刀',
      'inserts': '刀片',
      'tool-holders': '刀柄',
      'collets': '卡簧',
      'arbors': '刀盘',
      'flat-endmills': '平底铣刀',
      'ball-endmills': '球头铣刀',
      'corner-radius': '圆鼻铣刀',
      'roughing': '粗皮铣刀',
      'twist-drills': '麻花钻',
      'center-drills': '中心钻',
      'internal-coolant': '内冷钻',
      'machine-taps': '机用丝锥',
      'forming-taps': '挤压丝锥',
      'straight-reamers': '直柄铰刀',
      'adjustable-reamers': '可调铰刀',
      'turning-inserts': '车刀片',
      'milling-inserts': '铣刀片',
      'bt-holders': 'BT刀柄',
      'hsk-holders': 'HSK刀柄',
      'er-collets': 'ER夹头',
      'face-mills': '面铣刀盘',
      'end-mill-holders': '立铣刀杆',
      'search': '搜索',
      'compare': '对比',
      'about': '关于',
      'contact': '联系',
      'calculator': '计算器'
    };
    return names[part] || part;
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new Breadcrumb();
});
