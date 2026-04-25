const fs = require('fs');
const path = require('path');

const detailDir = path.join(__dirname, '../products/detail');
const files = fs.readdirSync(detailDir).filter(f => f.endsWith('.html'));

// Add technical drawing section and more details to each page
files.forEach(file => {
  const filePath = path.join(detailDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Check if already enhanced
  if (!content.includes('technical-drawing')) {
    // Add technical drawing section before footer
    const drawingSection = `
    <!-- Technical Drawing Section -->
    <section class="section" style="background: var(--bg-secondary);">
        <div class="section">
            <h2 class="section-title">技术图纸</h2>
            <p class="section-desc">标准尺寸图纸，可根据客户需求定制</p>
            <div style="background: var(--bg); border-radius: 20px; padding: 40px; text-align: center;">
                <svg viewBox="0 0 400 200" style="max-width: 100%; height: auto;">
                    <rect x="50" y="80" width="300" height="40" fill="none" stroke="#666" stroke-width="2"/>
                    <line x1="50" y1="70" x2="50" y2="130" stroke="#666" stroke-width="1"/>
                    <line x1="350" y1="70" x2="350" y2="130" stroke="#666" stroke-width="1"/>
                    <text x="200" y="60" text-anchor="middle" fill="#666" font-size="12">D</text>
                    <text x="200" y="155" text-anchor="middle" fill="#666" font-size="12">L</text>
                    <line x1="30" y1="100" x2="50" y2="100" stroke="#666" stroke-width="1"/>
                    <line x1="350" y1="100" x2="370" y2="100" stroke="#666" stroke-width="1"/>
                    <text x="20" y="105" text-anchor="end" fill="#666" font-size="10">柄径</text>
                    <text x="380" y="105" text-anchor="start" fill="#666" font-size="10">刃径</text>
                </svg>
                <p style="margin-top: 20px; color: var(--text-secondary); font-size: 14px;">
                    * 图纸仅供参考，实际尺寸以产品规格表为准<br>
                    * 可定制特殊尺寸和涂层
                </p>
            </div>
        </div>
    </section>
`;
    
    content = content.replace(
      '<footer class="footer">',
      drawingSection + '    <footer class="footer">'
    );
    
    fs.writeFileSync(filePath, content);
    console.log(`Enhanced: ${file}`);
  } else {
    console.log(`Already enhanced: ${file}`);
  }
});

console.log('All detail pages enhanced!');
