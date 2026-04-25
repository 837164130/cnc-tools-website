const fs = require('fs');
const path = require('path');

// Fix corrupted characters in HTML files
const files = [
  'products/endmills.html',
  'products/drills.html',
  'products/taps.html',
  'products/reamers.html',
  'products/inserts.html',
  'products/tool-holders.html',
  'products/collets.html',
  'products/arbors.html',
  'index.html',
  'about.html',
  'contact.html',
  'search.html',
  'compare.html',
  'calculator.html'
];

const fixes = [
  // Fix corrupted HTML tags
  { pattern: /�\?\/span>/g, replacement: '🔧</span>' },
  { pattern: /�\?\/button>/g, replacement: '中</button>' },
  { pattern: /刀�\?\/a>/g, replacement: '刀片</a>' },
  { pattern: /特殊刀�\?\/button>/g, replacement: '特殊刀片</button>' },
  { pattern: /不锈钢系�\?\/button>/g, replacement: '不锈钢系列</button>' },
  { pattern: /通用�\?/g, replacement: '通用' },
  { pattern: /4�\?\/span>/g, replacement: '4刃</span>' },
  { pattern: /3�\?\/span>/g, replacement: '3刃</span>' },
  { pattern: /2�\?\/span>/g, replacement: '2刃</span>' },
  { pattern: /6�\?\/span>/g, replacement: '6刃</span>' },
  { pattern: /35°螺旋�\?\/span>/g, replacement: '35°螺旋角</span>' },
  { pattern: /38°螺旋�\?\/span>/g, replacement: '38°螺旋角</span>' },
  { pattern: /30°螺旋�\?\/span>/g, replacement: '30°螺旋角</span>' },
  { pattern: /45°螺旋�\?\/span>/g, replacement: '45°螺旋角</span>' },
  { pattern: /40°螺旋�\?\/span>/g, replacement: '40°螺旋角</span>' },
  { pattern: /粗加�\?\/span>/g, replacement: '粗加工</span>' },
  { pattern: /无涂�\?\/span>/g, replacement: '无涂层</span>' },
  { pattern: /了解详情 �\?\/a>/g, replacement: '了解详情 →</a>' },
  { pattern: /侧铣和槽铣加�\?\/p>/g, replacement: '侧铣和槽铣加工</p>' },
  { pattern: /适合重切�\?\/p>/g, replacement: '适合重切削</p>' },
  { pattern: /耐磨性优�\?\/p>/g, replacement: '耐磨性优异</p>' },
  { pattern: /无毛�\?\/p>/g, replacement: '无毛刺</p>' },
  { pattern: /大批量铝件加�\?\/p>/g, replacement: '大批量铝件加工</p>' },
  { pattern: /不锈钢专用系�\?\/h2>/g, replacement: '不锈钢专用系列</h2>' },
  { pattern: /�\?\/span>\n                        <span data-i18n="nav.catalog">目录<\/span>/g, replacement: '📋</span>\n                        <span data-i18n="nav.catalog">目录</span>' },
];

files.forEach(file => {
  const filePath = path.join(__dirname, '..', file);
  if (!fs.existsSync(filePath)) {
    console.log(`Skipping ${file} - not found`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  fixes.forEach(({ pattern, replacement }) => {
    if (pattern.test(content)) {
      content = content.replace(pattern, replacement);
      modified = true;
    }
  });

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed ${file}`);
  } else {
    console.log(`No issues found in ${file}`);
  }
});

console.log('Done!');
