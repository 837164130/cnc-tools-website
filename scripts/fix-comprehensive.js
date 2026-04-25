const fs = require('fs');
const path = require('path');

// Comprehensive fix for all corrupted characters
const files = [
  'products/endmills.html',
  'products/drills.html',
  'products/taps.html',
  'products/reamers.html',
  'products/inserts.html',
  'products/tool-holders.html',
  'products/collets.html',
  'products/arbors.html',
];

// Read file and replace all corrupted patterns
const fixes = [
  // Description endings
  { pattern: /耐磨�\?\/p>/g, replacement: '耐磨</p>' },
  { pattern: /批量生�\?\/p>/g, replacement: '批量生产</p>' },
  { pattern: /适用�\?D/g, replacement: '适用于3D' },
  { pattern: /高硬度材�\?\/p>/g, replacement: '高硬度材料</p>' },
  { pattern: /平稳�\?\/p>/g, replacement: '平稳性</p>' },
  { pattern: /全规�\?\/p>/g, replacement: '全规格</p>' },
  { pattern: /多种类�\?\/p>/g, replacement: '多种类型</p>' },
  { pattern: /�\?\/p>/g, replacement: '</p>' },
  
  // Section titles
  { pattern: /特殊用途系�\?\/h2>/g, replacement: '特殊用途系列</h2>' },
  { pattern: /麻花钻系�\?\/h2>/g, replacement: '麻花钻系列</h2>' },
  { pattern: /内冷钻系�\?\/h2>/g, replacement: '内冷钻系列</h2>' },
  { pattern: /深孔钻系�\?\/h2>/g, replacement: '深孔钻系列</h2>' },
  { pattern: /中心钻系�\?\/h2>/g, replacement: '中心钻系列</h2>' },
  { pattern: /直槽丝锥系�\?\/h2>/g, replacement: '直槽丝锥系列</h2>' },
  { pattern: /螺旋丝锥系�\?\/h2>/g, replacement: '螺旋丝锥系列</h2>' },
  { pattern: /挤压丝锥系�\?\/h2>/g, replacement: '挤压丝锥系列</h2>' },
  { pattern: /机用铰刀系�\?\/h2>/g, replacement: '机用铰刀系列</h2>' },
  { pattern: /手用铰刀系�\?\/h2>/g, replacement: '手用铰刀系列</h2>' },
  { pattern: /可调铰刀系�\?\/h2>/g, replacement: '可调铰刀系列</h2>' },
  { pattern: /BT刀柄系�\?\/h2>/g, replacement: 'BT刀柄系列</h2>' },
  { pattern: /HSK刀柄系�\?\/h2>/g, replacement: 'HSK刀柄系列</h2>' },
  { pattern: /ER卡簧系�\?\/h2>/g, replacement: 'ER卡簧系列</h2>' },
  { pattern: /TG卡簧系�\?\/h2>/g, replacement: 'TG卡簧系列</h2>' },
  { pattern: /SK卡簧系�\?\/h2>/g, replacement: 'SK卡簧系列</h2>' },
  { pattern: /面铣刀盘系�\?\/h2>/g, replacement: '面铣刀盘系列</h2>' },
  { pattern: /侧铣刀盘系�\?\/h2>/g, replacement: '侧铣刀盘系列</h2>' },
  { pattern: /�\?\/h2>/g, replacement: '</h2>' },
  
  // Icons
  { pattern: /🛠�\?\/div>/g, replacement: '🛠️</div>' },
  { pattern: /�\?\/div>/g, replacement: '</div>' },
  
  // Generic: any remaining corrupted char before HTML tags
  { pattern: /�([^�\s<]{0,10}<)/g, replacement: '$1' },
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
    console.log(`Clean ${file}`);
  }
});

console.log('Done!');
