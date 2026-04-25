const fs = require('fs');
const path = require('path');

// Add feature highlights to product detail pages
const detailDir = path.join(__dirname, '../products/detail');
const files = fs.readdirSync(detailDir).filter(f => f.endsWith('.html'));

const featuresSection = `
    <!-- Features Section -->
    <section class="section" style="background: linear-gradient(135deg, #f5f5f7 0%, #ffffff 100%);">
        <div class="section">
            <h2 class="section-title">产品特点</h2>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 24px; margin-top: 40px;">
                <div style="background: white; padding: 30px; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.05);">
                    <div style="font-size: 40px; margin-bottom: 16px;">⚡</div>
                    <h3 style="font-size: 18px; font-weight: 600; margin-bottom: 8px;">高效加工</h3>
                    <p style="color: #86868b; font-size: 14px;">优化的槽型设计，提高切削效率，降低加工成本</p>
                </div>
                <div style="background: white; padding: 30px; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.05);">
                    <div style="font-size: 40px; margin-bottom: 16px;">🎯</div>
                    <h3 style="font-size: 18px; font-weight: 600; margin-bottom: 8px;">高精度</h3>
                    <p style="color: #86868b; font-size: 14px;">精密制造工艺，确保尺寸精度和表面质量</p>
                </div>
                <div style="background: white; padding: 30px; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.05);">
                    <div style="font-size: 40px; margin-bottom: 16px;">🛡️</div>
                    <h3 style="font-size: 18px; font-weight: 600; margin-bottom: 8px;">长寿命</h3>
                    <p style="color: #86868b; font-size: 14px;">优质硬质合金基材，先进涂层技术，延长刀具寿命</p>
                </div>
                <div style="background: white; padding: 30px; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.05);">
                    <div style="font-size: 40px; margin-bottom: 16px;">🔧</div>
                    <h3 style="font-size: 18px; font-weight: 600; margin-bottom: 8px;">可定制</h3>
                    <p style="color: #86868b; font-size: 14px;">支持非标定制，满足特殊加工需求</p>
                </div>
            </div>
        </div>
    </section>
`;

files.forEach(file => {
  const filePath = path.join(detailDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  if (!content.includes('product-features')) {
    content = content.replace(
      '<!-- Technical Drawing Section -->',
      featuresSection + '    <!-- Technical Drawing Section -->'
    );
    
    fs.writeFileSync(filePath, content);
    console.log(`Added features: ${file}`);
  } else {
    console.log(`Already has features: ${file}`);
  }
});

console.log('All pages updated with features!');
