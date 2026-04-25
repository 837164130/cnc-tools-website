const fs = require('fs');
const path = require('path');

const productsDir = path.join(__dirname, '../products');
const files = fs.readdirSync(productsDir).filter(f => f.endsWith('.html') && !f.includes('detail'));

// Map of product pages to their detail subcategories
const detailLinks = {
  'endmills.html': [
    { from: '平底铣刀 EM-4F', to: './detail/flat-endmills.html' },
    { from: '球头铣刀', to: './detail/ball-endmills.html' },
    { from: '圆鼻铣刀', to: './detail/corner-radius.html' },
    { from: '粗皮铣刀', to: './detail/roughing.html' }
  ],
  'drills.html': [
    { from: '麻花钻', to: './detail/twist-drills.html' },
    { from: '中心钻', to: './detail/center-drills.html' },
    { from: '内冷钻', to: './detail/internal-coolant.html' }
  ],
  'taps.html': [
    { from: '机用丝锥', to: './detail/machine-taps.html' },
    { from: '挤压丝锥', to: './detail/forming-taps.html' }
  ],
  'reamers.html': [
    { from: '直柄铰刀', to: './detail/straight-reamers.html' },
    { from: '可调铰刀', to: './detail/adjustable-reamers.html' }
  ],
  'inserts.html': [
    { from: '车削刀片', to: './detail/turning-inserts.html' },
    { from: '铣削刀片', to: './detail/milling-inserts.html' }
  ],
  'tool-holders.html': [
    { from: 'BT刀柄', to: './detail/bt-holders.html' },
    { from: 'HSK刀柄', to: './detail/hsk-holders.html' }
  ],
  'collets.html': [
    { from: 'ER弹簧夹头', to: './detail/er-collets.html' }
  ],
  'arbors.html': [
    { from: '面铣刀盘', to: './detail/face-mills.html' },
    { from: '立铣刀杆', to: './detail/end-mill-holders.html' }
  ]
};

files.forEach(file => {
  const filePath = path.join(productsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  const links = detailLinks[file];
  if (links) {
    links.forEach(link => {
      // Replace href="#" for matching product names
      const regex = new RegExp(`(<a href="#[^"]*"[^>]*>[^<]*${link.from}[^<]*<\\/a>)`, 'g');
      content = content.replace(regex, (match) => {
        return match.replace('href="#"', `href="${link.to}"`);
      });
    });
    
    fs.writeFileSync(filePath, content);
    console.log(`Updated links: ${file}`);
  }
});

console.log('All links updated!');
