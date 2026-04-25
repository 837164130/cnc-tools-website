// Product Search Functionality
class ProductSearch {
  constructor() {
    this.searchIndex = [];
    this.init();
  }

  async init() {
    await this.buildIndex();
    this.attachEventListeners();
  }

  async buildIndex() {
    // Product data for search
    this.searchIndex = [
      // End Mills
      { name: '2刃平底铣刀', model: 'EM-2F', category: 'endmills', url: '/products/detail/flat-endmills.html', keywords: ['铣刀', '平底', '2刃', '通用'] },
      { name: '3刃平底铣刀', model: 'EM-3F', category: 'endmills', url: '/products/detail/flat-endmills.html', keywords: ['铣刀', '平底', '3刃', '铝用'] },
      { name: '4刃平底铣刀', model: 'EM-4F', category: 'endmills', url: '/products/detail/flat-endmills.html', keywords: ['铣刀', '平底', '4刃', '钢用'] },
      { name: '2刃球头铣刀', model: 'BM-2F', category: 'endmills', url: '/products/detail/ball-endmills.html', keywords: ['铣刀', '球头', '2刃', '3D'] },
      { name: '4刃球头铣刀', model: 'BM-4F', category: 'endmills', url: '/products/detail/ball-endmills.html', keywords: ['铣刀', '球头', '4刃', '精加工'] },
      { name: '4刃圆鼻铣刀', model: 'CRM-4F', category: 'endmills', url: '/products/detail/corner-radius.html', keywords: ['铣刀', '圆鼻', '4刃', 'R角'] },
      { name: '6刃圆鼻铣刀', model: 'CRM-6F', category: 'endmills', url: '/products/detail/corner-radius.html', keywords: ['铣刀', '圆鼻', '6刃', '精加工'] },
      { name: '3刃粗皮铣刀', model: 'RM-3F', category: 'endmills', url: '/products/detail/roughing.html', keywords: ['铣刀', '粗皮', '3刃', '开粗'] },
      { name: '4刃粗皮铣刀', model: 'RM-4F', category: 'endmills', url: '/products/detail/roughing.html', keywords: ['铣刀', '粗皮', '4刃', '重切削'] },
      
      // Drills
      { name: '3D麻花钻', model: 'TD-3D', category: 'drills', url: '/products/detail/twist-drills.html', keywords: ['钻头', '麻花钻', '3D', '通用'] },
      { name: '5D深孔钻', model: 'TD-5D', category: 'drills', url: '/products/detail/twist-drills.html', keywords: ['钻头', '深孔', '5D', '深孔加工'] },
      { name: '8D超深孔钻', model: 'TD-8D', category: 'drills', url: '/products/detail/twist-drills.html', keywords: ['钻头', '超深孔', '8D', '深孔加工'] },
      { name: '60度中心钻', model: 'CD-60', category: 'drills', url: '/products/detail/center-drills.html', keywords: ['钻头', '中心钻', '60度', '定位'] },
      { name: '90度中心钻', model: 'CD-90', category: 'drills', url: '/products/detail/center-drills.html', keywords: ['钻头', '中心钻', '90度', '倒角'] },
      { name: '3D内冷钻', model: 'ICD-3D', category: 'drills', url: '/products/detail/internal-coolant.html', keywords: ['钻头', '内冷', '3D', '深孔'] },
      { name: '5D内冷钻', model: 'ICD-5D', category: 'drills', url: '/products/detail/internal-coolant.html', keywords: ['钻头', '内冷', '5D', '深孔'] },
      
      // Taps
      { name: '公制机用丝锥', model: 'MT-M', category: 'taps', url: '/products/detail/machine-taps.html', keywords: ['丝锥', '机用', '公制', '螺纹'] },
      { name: 'UNC机用丝锥', model: 'MT-UNC', category: 'taps', url: '/products/detail/machine-taps.html', keywords: ['丝锥', '机用', 'UNC', '美制'] },
      { name: 'UNF机用丝锥', model: 'MT-UNF', category: 'taps', url: '/products/detail/machine-taps.html', keywords: ['丝锥', '机用', 'UNF', '美制细牙'] },
      { name: '公制挤压丝锥', model: 'FT-M', category: 'taps', url: '/products/detail/forming-taps.html', keywords: ['丝锥', '挤压', '公制', '无屑'] },
      { name: 'UNC挤压丝锥', model: 'FT-UNC', category: 'taps', url: '/products/detail/forming-taps.html', keywords: ['丝锥', '挤压', 'UNC', '无屑'] },
      
      // Reamers
      { name: 'H7直柄铰刀', model: 'SR-H7', category: 'reamers', url: '/products/detail/straight-reamers.html', keywords: ['铰刀', '直柄', 'H7', '精加工'] },
      { name: 'H8直柄铰刀', model: 'SR-H8', category: 'reamers', url: '/products/detail/straight-reamers.html', keywords: ['铰刀', '直柄', 'H8', '精加工'] },
      { name: '6mm可调铰刀', model: 'AR-6', category: 'reamers', url: '/products/detail/adjustable-reamers.html', keywords: ['铰刀', '可调', '6mm', '范围加工'] },
      { name: '10mm可调铰刀', model: 'AR-10', category: 'reamers', url: '/products/detail/adjustable-reamers.html', keywords: ['铰刀', '可调', '10mm', '范围加工'] },
      { name: '20mm可调铰刀', model: 'AR-20', category: 'reamers', url: '/products/detail/adjustable-reamers.html', keywords: ['铰刀', '可调', '20mm', '范围加工'] },
      
      // Inserts
      { name: 'CNMG车刀片', model: 'CNMG', category: 'inserts', url: '/products/detail/turning-inserts.html', keywords: ['刀片', '车削', 'CNMG', '菱形'] },
      { name: 'WNMG车刀片', model: 'WNMG', category: 'inserts', url: '/products/detail/turning-inserts.html', keywords: ['刀片', '车削', 'WNMG', '六边形'] },
      { name: 'TNMG车刀片', model: 'TNMG', category: 'inserts', url: '/products/detail/turning-inserts.html', keywords: ['刀片', '车削', 'TNMG', '三角形'] },
      { name: 'DNMG车刀片', model: 'DNMG', category: 'inserts', url: '/products/detail/turning-inserts.html', keywords: ['刀片', '车削', 'DNMG', '菱形'] },
      { name: 'APKT铣刀片', model: 'APKT', category: 'inserts', url: '/products/detail/milling-inserts.html', keywords: ['刀片', '铣削', 'APKT', '方形'] },
      { name: 'RPMT圆刀片', model: 'RPMT', category: 'inserts', url: '/products/detail/milling-inserts.html', keywords: ['刀片', '铣削', 'RPMT', '圆形'] },
      { name: 'SPMT方刀片', model: 'SPMT', category: 'inserts', url: '/products/detail/milling-inserts.html', keywords: ['刀片', '铣削', 'SPMT', '方形'] },
      
      // Tool Holders
      { name: 'BT30-ER16刀柄', model: 'BT30-ER16', category: 'tool-holders', url: '/products/detail/bt-holders.html', keywords: ['刀柄', 'BT30', 'ER16', '弹簧夹头'] },
      { name: 'BT40-ER32刀柄', model: 'BT40-ER32', category: 'tool-holders', url: '/products/detail/bt-holders.html', keywords: ['刀柄', 'BT40', 'ER32', '弹簧夹头'] },
      { name: 'BT50-ER40刀柄', model: 'BT50-ER40', category: 'tool-holders', url: '/products/detail/bt-holders.html', keywords: ['刀柄', 'BT50', 'ER40', '弹簧夹头'] },
      { name: 'BT40侧固刀柄', model: 'BT40-SF', category: 'tool-holders', url: '/products/detail/bt-holders.html', keywords: ['刀柄', 'BT40', '侧固', '强力'] },
      { name: 'BT40液压刀柄', model: 'BT40-HY', category: 'tool-holders', url: '/products/detail/bt-holders.html', keywords: ['刀柄', 'BT40', '液压', '高精度'] },
      { name: 'HSK63A-ER32刀柄', model: 'HSK63A-ER32', category: 'tool-holders', url: '/products/detail/hsk-holders.html', keywords: ['刀柄', 'HSK63A', 'ER32', '高速'] },
      { name: 'HSK100A-ER40刀柄', model: 'HSK100A-ER40', category: 'tool-holders', url: '/products/detail/hsk-holders.html', keywords: ['刀柄', 'HSK100A', 'ER40', '高速'] },
      
      // Collets
      { name: 'ER16弹簧夹头', model: 'ER16', category: 'collets', url: '/products/detail/er-collets.html', keywords: ['夹头', 'ER16', '弹簧', '1-10mm'] },
      { name: 'ER20弹簧夹头', model: 'ER20', category: 'collets', url: '/products/detail/er-collets.html', keywords: ['夹头', 'ER20', '弹簧', '1-13mm'] },
      { name: 'ER32弹簧夹头', model: 'ER32', category: 'collets', url: '/products/detail/er-collets.html', keywords: ['夹头', 'ER32', '弹簧', '2-20mm'] },
      { name: 'ER40弹簧夹头', model: 'ER40', category: 'collets', url: '/products/detail/er-collets.html', keywords: ['夹头', 'ER40', '弹簧', '3-26mm'] },
      
      // Arbors
      { name: '50mm面铣刀盘', model: 'FM50', category: 'arbors', url: '/products/detail/face-mills.html', keywords: ['刀盘', '面铣', '50mm', '平面加工'] },
      { name: '63mm面铣刀盘', model: 'FM63', category: 'arbors', url: '/products/detail/face-mills.html', keywords: ['刀盘', '面铣', '63mm', '平面加工'] },
      { name: '80mm面铣刀盘', model: 'FM80', category: 'arbors', url: '/products/detail/face-mills.html', keywords: ['刀盘', '面铣', '80mm', '平面加工'] },
      { name: '100mm面铣刀盘', model: 'FM100', category: 'arbors', url: '/products/detail/face-mills.html', keywords: ['刀盘', '面铣', '100mm', '平面加工'] },
      { name: '20mm立铣刀杆', model: 'EMH20', category: 'arbors', url: '/products/detail/end-mill-holders.html', keywords: ['刀杆', '立铣', '20mm', '侧固式'] },
      { name: '25mm立铣刀杆', model: 'EMH25', category: 'arbors', url: '/products/detail/end-mill-holders.html', keywords: ['刀杆', '立铣', '25mm', '侧固式'] },
      { name: '32mm立铣刀杆', model: 'EMH32', category: 'arbors', url: '/products/detail/end-mill-holders.html', keywords: ['刀杆', '立铣', '32mm', '侧固式'] }
    ];
  }

  attachEventListeners() {
    // Search input
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    
    if (!searchInput || !searchResults) return;

    let debounceTimer;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        this.performSearch(e.target.value);
      }, 300);
    });

    // Close search when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.search-container')) {
        searchResults.style.display = 'none';
      }
    });
  }

  performSearch(query) {
    const searchResults = document.getElementById('searchResults');
    
    if (!query || query.length < 2) {
      searchResults.style.display = 'none';
      return;
    }

    const results = this.searchIndex.filter(item => {
      const searchText = `${item.name} ${item.model} ${item.keywords.join(' ')}`.toLowerCase();
      return searchText.includes(query.toLowerCase());
    }).slice(0, 10);

    if (results.length === 0) {
      searchResults.innerHTML = '<div class="search-no-results">未找到相关产品</div>';
      searchResults.style.display = 'block';
      return;
    }

    searchResults.innerHTML = results.map(item => `
      <a href="${item.url}" class="search-result-item">
        <div class="search-result-name">${item.name}</div>
        <div class="search-result-model">${item.model}</div>
      </a>
    `).join('');
    
    searchResults.style.display = 'block';
  }
}

// Initialize search when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ProductSearch();
});
