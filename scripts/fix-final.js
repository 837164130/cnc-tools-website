const fs = require('fs');
const path = require('path');

const files = [
  'products/drills.html',
  'products/inserts.html',
  'products/taps.html',
];

const fixes = [
  { pattern: /3D内冷�\?DR-COOL-3D<\/h3>/g, replacement: '3D内冷钻 DR-COOL-3D</h3>' },
  { pattern: /5D内冷深孔�\?DR-COOL-5D<\/h3>/g, replacement: '5D内冷深孔钻 DR-COOL-5D</h3>' },
  { pattern: /12D深孔�\?DR-DEEP-12D<\/h3>/g, replacement: '12D深孔钻 DR-DEEP-12D</h3>' },
  { pattern: /60°中心�\?DR-CENTER-60<\/h3>/g, replacement: '60°中心钻 DR-CENTER-60</h3>' },
  { pattern: /90°定点�\?DR-SPOT-90<\/h3>/g, replacement: '90°定点钻 DR-SPOT-90</h3>' },
  { pattern: /�\?\.1-3mm/g, replacement: '直径0.1-3mm' },
  { pattern: /车刀片系�\?- CCCNC<\/title>/g, replacement: '车刀片系列 - CCCNC</title>' },
  { pattern: /车刀片系�\?\/h1>/g, replacement: '车刀片系列</h1>' },
  { pattern: /丝锥与螺纹工�\?- CCCNC<\/title>/g, replacement: '丝锥与螺纹工具 - CCCNC</title>' },
  { pattern: /丝锥与螺纹工�\?\/h1>/g, replacement: '丝锥与螺纹工具</h1>' },
  { pattern: /公制螺旋槽丝�\?TP-M-SPIRAL<\/h3>/g, replacement: '公制螺旋槽丝锥 TP-M-SPIRAL</h3>' },
  { pattern: /英制螺旋槽丝�\?TP-UNF-SPIRAL<\/h3>/g, replacement: '英制螺旋槽丝锥 TP-UNF-SPIRAL</h3>' },
  { pattern: /不锈钢挤压丝�\?TP-SS-FORM<\/h3>/g, replacement: '不锈钢挤压丝锥 TP-SS-FORM</h3>' },
  { pattern: /35°螺旋槽丝�\?TP-M-SPIRAL-35<\/h3>/g, replacement: '35°螺旋槽丝锥 TP-M-SPIRAL-35</h3>' },
  { pattern: /45°螺旋槽丝�\?TP-M-SPIRAL-45<\/h3>/g, replacement: '45°螺旋槽丝锥 TP-M-SPIRAL-45</h3>' },
];

files.forEach(file => {
  const filePath = path.join(__dirname, '..', file);
  if (!fs.existsSync(filePath)) return;

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
