const fs = require('fs');
const path = require('path');

// Fix remaining corrupted characters in HTML files
const files = [
  'products/endmills.html',
  'products/drills.html',
  'products/taps.html',
  'products/reamers.html',
  'products/inserts.html',
  'products/tool-holders.html',
  'products/collets.html',
  'products/arbors.html',
  'contact.html'
];

const fixes = [
  // Fix remaining corrupted characters
  { pattern: /特殊刀中<\/button>/g, replacement: '特殊刀片</button>' },
  { pattern: /粗加🔧<\/span>/g, replacement: '粗加工</span>' },
  { pattern: /菱�0°�\/h2>/g, replacement: '菱形80°</h2>' },
  { pattern: /CNMG粗加工刀�CNMG-ROUGH<\/h3>/g, replacement: 'CNMG粗加工刀片 CNMG-ROUGH</h3>' },
  { pattern: /适合钢件粗车<\/p>/g, replacement: '适合钢件粗车</p>' },
  { pattern: /桃�0°�\/h2>/g, replacement: '桃形80°</h2>' },
  { pattern: /WNMG精加工刀�WNMG-FINISH<\/h3>/g, replacement: 'WNMG精加工刀片 WNMG-FINISH</h3>' },
  { pattern: /三角�0°�\/h2>/g, replacement: '三角形60°</h2>' },
  { pattern: /TNMG通用刀�TNMG-UNI<\/h3>/g, replacement: 'TNMG通用刀片 TNMG-UNI</h3>' },
  { pattern: /菱形�5°�\/h2>/g, replacement: '菱形55°</h2>' },
  { pattern: /DNMG半精加工刀�DNMG-SEMI<\/h3>/g, replacement: 'DNMG半精加工刀片 DNMG-SEMI</h3>' },
  { pattern: /�\/span>\s*<span data-i18n="nav.catalog">目录<\/span>/g, replacement: '📋</span>\n                        <span data-i18n="nav.catalog">目录</span>' },
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
    console.log(`No additional issues in ${file}`);
  }
});

console.log('Done!');
