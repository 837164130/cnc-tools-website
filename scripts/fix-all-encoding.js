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

// Generic replacement: replace any single corrupted char before specific HTML tags
const genericFixes = [
  { pattern: /刀�([^<]*)/g, replacement: '刀片$1' },
  { pattern: /�0°/g, replacement: '形80°' },
  { pattern: /�5°/g, replacement: '形55°' },
  { pattern: /�0°/g, replacement: '形60°' },
  { pattern: /粗加�([^<]*)/g, replacement: '粗加工$1' },
  { pattern: /精加�([^<]*)/g, replacement: '精加工$1' },
  { pattern: /不锈钢�([^<]*)/g, replacement: '不锈钢$1' },
  { pattern: /半精�([^<]*)/g, replacement: '半精$1' },
  { pattern: /通用�([^<]*)/g, replacement: '通用$1' },
  { pattern: /特殊用途�([^<]*)/g, replacement: '特殊用途$1' },
  { pattern: /�([^�\s]{0,5}<)/g, replacement: '片$1' },
];

files.forEach(file => {
  const filePath = path.join(__dirname, '..', file);
  if (!fs.existsSync(filePath)) {
    console.log(`Skipping ${file} - not found`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  genericFixes.forEach(({ pattern, replacement }) => {
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
