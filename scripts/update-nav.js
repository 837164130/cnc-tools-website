const fs = require('fs');
const path = require('path');

const productsDir = path.join(__dirname, '../products');
const files = fs.readdirSync(productsDir).filter(f => f.endsWith('.html'));

const newNavLinks = `                    <a href="./endmills.html" data-i18n="nav.endmills">铣刀</a>
                    <a href="./drills.html" data-i18n="nav.drills">钻头</a>
                    <a href="./taps.html" data-i18n="nav.taps">丝锥</a>
                    <a href="./reamers.html" data-i18n="nav.reamers">铰刀</a>
                    <a href="./inserts.html" data-i18n="nav.inserts">刀片</a>
                    <a href="./tool-holders.html" data-i18n="nav.toolholders">刀柄</a>
                    <a href="./collets.html" data-i18n="nav.collets">卡簧</a>
                    <a href="./arbors.html" data-i18n="nav.arbors">刀盘</a>`;

files.forEach(file => {
  const filePath = path.join(productsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Check if already has new nav items
  if (!content.includes('tool-holders.html')) {
    // Replace old nav with new nav
    content = content.replace(
      /                    <a href="\.\/endmills\.html" data-i18n="nav\.endmills">铣刀<\/a>\n                    <a href="\.\/drills\.html" data-i18n="nav\.drills">钻头<\/a>\n                    <a href="\.\/taps\.html" data-i18n="nav\.taps">丝锥<\/a>\n                    <a href="\.\/reamers\.html" data-i18n="nav\.reamers">铰刀<\/a>\n                    <a href="\.\/inserts\.html" data-i18n="nav\.inserts">刀片<\/a>/,
      newNavLinks
    );
    
    fs.writeFileSync(filePath, content);
    console.log(`Updated nav: ${file}`);
  } else {
    console.log(`Already updated: ${file}`);
  }
});

console.log('All product pages updated!');
