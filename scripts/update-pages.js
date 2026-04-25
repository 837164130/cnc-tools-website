const fs = require('fs');
const path = require('path');

const updates = [
  {
    file: 'tool-holders.html',
    title: '刀柄刀杆 - CCCNC',
    eyebrow: 'Tool Holders & Arbors',
    name: '刀柄刀杆',
    desc: 'BT/HSK标准刀柄，ER弹簧夹头、液压刀柄、热缩刀柄，适用于各种加工中心',
    icon: '🛠️',
    categoryId: 'tool-holders'
  },
  {
    file: 'collets.html',
    title: '卡簧夹头 - CCCNC',
    eyebrow: 'Collets',
    name: '卡簧夹头',
    desc: 'ER16/ER20/ER32/ER40弹簧夹头，高精度夹持，适用于各种刀柄和夹具',
    icon: '🔩',
    categoryId: 'collets'
  },
  {
    file: 'arbors.html',
    title: '刀盘刀杆 - CCCNC',
    eyebrow: 'Arbors & Cutter Heads',
    name: '刀盘刀杆',
    desc: '面铣刀盘、立铣刀杆、T型槽铣刀，适用于各种铣削加工',
    icon: '⚙️',
    categoryId: 'arbors'
  }
];

const productsDir = path.join(__dirname, '../products');

updates.forEach(update => {
  const filePath = path.join(productsDir, update.file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace title
  content = content.replace(/硬质合金铣刀 - CCCNC/, update.title);
  
  // Replace eyebrow
  content = content.replace(/End Mills/, update.eyebrow);
  
  // Replace name
  content = content.replace(/硬质合金铣刀/, update.name);
  
  // Replace description
  content = content.replace(/全系列立铣刀，包括平底、球头、圆鼻、粗皮等多种类型/, update.desc);
  
  // Replace icon
  content = content.replace(/🔧/, update.icon);
  
  // Replace category links
  content = content.replace(/href="\.\.\/endmills\.html"/g, `href="../${update.categoryId}.html"`);
  content = content.replace(/href="endmills\.html"/g, `href="${update.categoryId}.html"`);
  
  fs.writeFileSync(filePath, content);
  console.log(`Updated: ${update.file}`);
});

console.log('All pages updated!');
