#!/usr/bin/env node
/**
 * CNC Tools Website Product Page Builder
 * Generates product pages from JSON data
 */

const fs = require('fs');
const path = require('path');

// Read product data
const productsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/products-full.json'), 'utf8'));

// Template for product pages
function generateProductPage(category, subcategory) {
  const products = subcategory.products || [];
  
  // Generate product cards HTML
  const productCards = products.map(p => `
    <div class="product-detail-card" data-model="${p.model}">
      <div class="product-detail-image">
        <svg viewBox="0 0 200 100" class="tool-svg">
          ${generateToolSVG(p, category.id)}
        </svg>
        <div class="product-badge">${p.stock || '现货'}</div>
      </div>
      <div class="product-detail-info">
        <h3 class="product-detail-model">${p.model}</h3>
        <p class="product-detail-specs">
          ${p.diameter ? `直径: <strong>${p.diameter}</strong>` : ''}
          ${p.radius ? `球径: <strong>${p.radius}</strong>` : ''}
          ${p.cornerRadius ? `圆角: <strong>${p.cornerRadius}</strong>` : ''}
          ${p.flutes ? `刃数: <strong>${p.flutes}刃</strong>` : ''}
          ${p.length ? `刃长: <strong>${p.length}</strong>` : ''}
        </p>
        <div class="product-detail-meta">
          <span class="meta-tag">材质: ${p.material}</span>
          <span class="meta-tag">涂层: ${p.coating}</span>
          <span class="meta-tag">硬度: ${p.hardness}</span>
        </div>
        <p class="product-detail-application">${p.application}</p>
        <div class="product-detail-price">
          <span class="price-cny">${p.price}</span>
          <span class="price-usd">${p.priceUSD}</span>
        </div>
        <button class="inquiry-btn" onclick="openInquiry('${p.model}')">询盘</button>
      </div>
    </div>
  `).join('');

  // Generate specs table rows
  const tableRows = products.map(p => `
    <tr>
      <td><strong>${p.model}</strong></td>
      <td>${p.diameter || p.radius || '-'}</td>
      <td>${p.flutes || '-'}</td>
      <td>${p.length || '-'}</td>
      <td>${p.overallLength || '-'}</td>
      <td>${p.shankDiameter || '-'}</td>
      <td>${p.material}</td>
      <td>${p.coating}</td>
      <td>${p.hardness}</td>
      <td><span class="price-tag">${p.price}</span></td>
    </tr>
  `).join('');

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${subcategory.name} - ${category.name} - CCCNC</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../../css/enhanced.css">
    <style>
        :root {
            --primary: #0071e3;
            --text: #1d1d1f;
            --text-secondary: #86868b;
            --bg: #ffffff;
            --bg-secondary: #f5f5f7;
            --bg-dark: #000000;
            --border: #d2d2d7;
        }
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body { 
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; 
            color: var(--text); 
            line-height: 1.47059;
            font-weight: 400;
            letter-spacing: -0.022em;
            background: var(--bg);
        }
        
        /* Navigation */
        .nav-wrapper {
            position: fixed;
            top: 0; left: 0; right: 0;
            z-index: 9999;
            background: rgba(251, 251, 253, 0.8);
            backdrop-filter: saturate(180%) blur(20px);
            border-bottom: 1px solid rgba(0,0,0,0.05);
        }
        
        .nav {
            max-width: 1024px;
            margin: 0 auto;
            padding: 0 22px;
            height: 52px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        
        .nav-logo {
            font-size: 21px;
            font-weight: 700;
            color: var(--text);
            text-decoration: none;
        }
        
        .nav-links {
            display: flex;
            gap: 36px;
            align-items: center;
        }
        
        .nav-links a {
            font-size: 12px;
            color: var(--text);
            text-decoration: none;
            opacity: 0.8;
            transition: opacity 0.3s;
        }
        
        .nav-links a:hover { opacity: 1; }
        
        /* Page Header */
        .page-header {
            padding: 140px 0 60px;
            background: linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg) 100%);
            text-align: center;
        }
        
        .page-eyebrow {
            font-size: 17px;
            color: var(--primary);
            font-weight: 600;
            margin-bottom: 12px;
        }
        
        .page-title {
            font-size: 56px;
            font-weight: 700;
            line-height: 1.0625;
            letter-spacing: -0.021em;
            margin-bottom: 20px;
        }
        
        .page-desc {
            font-size: 21px;
            line-height: 1.381;
            color: var(--text-secondary);
            max-width: 600px;
            margin: 0 auto;
        }
        
        /* Breadcrumb */
        .breadcrumb {
            max-width: 1024px;
            margin: 0 auto;
            padding: 20px 22px;
            display: flex;
            gap: 8px;
            align-items: center;
            font-size: 14px;
            color: var(--text-secondary);
        }
        
        .breadcrumb a {
            color: var(--primary);
            text-decoration: none;
        }
        
        .breadcrumb a:hover { text-decoration: underline; }
        
        /* Section */
        .section {
            max-width: 1024px;
            margin: 0 auto;
            padding: 60px 22px;
        }
        
        .section-title {
            font-size: 32px;
            font-weight: 700;
            margin-bottom: 16px;
        }
        
        .section-desc {
            font-size: 17px;
            color: var(--text-secondary);
            margin-bottom: 40px;
            max-width: 600px;
        }
        
        /* Product Grid */
        .product-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 24px;
            margin-bottom: 60px;
        }
        
        .product-detail-card {
            background: var(--bg-secondary);
            border-radius: 20px;
            overflow: hidden;
            transition: transform 0.3s, box-shadow 0.3s;
        }
        
        .product-detail-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }
        
        .product-detail-image {
            height: 200px;
            background: linear-gradient(135deg, #e8e8ed 0%, #d2d2d7 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
        }
        
        .tool-svg {
            width: 160px;
            height: 80px;
        }
        
        .product-badge {
            position: absolute;
            top: 12px;
            right: 12px;
            background: var(--primary);
            color: white;
            padding: 4px 12px;
            border-radius: 12px;
            font-size: 12px;
            font-weight: 600;
        }
        
        .product-detail-info {
            padding: 24px;
        }
        
        .product-detail-model {
            font-size: 20px;
            font-weight: 700;
            margin-bottom: 8px;
        }
        
        .product-detail-specs {
            font-size: 14px;
            color: var(--text-secondary);
            margin-bottom: 12px;
            line-height: 1.6;
        }
        
        .product-detail-specs strong {
            color: var(--text);
        }
        
        .product-detail-meta {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-bottom: 12px;
        }
        
        .meta-tag {
            background: rgba(0,113,227,0.08);
            color: var(--primary);
            padding: 4px 10px;
            border-radius: 8px;
            font-size: 12px;
            font-weight: 500;
        }
        
        .product-detail-application {
            font-size: 14px;
            color: var(--text-secondary);
            margin-bottom: 16px;
        }
        
        .product-detail-price {
            display: flex;
            align-items: baseline;
            gap: 12px;
            margin-bottom: 16px;
        }
        
        .price-cny {
            font-size: 24px;
            font-weight: 700;
            color: var(--text);
        }
        
        .price-usd {
            font-size: 16px;
            color: var(--text-secondary);
        }
        
        .inquiry-btn {
            width: 100%;
            padding: 14px;
            background: var(--primary);
            color: white;
            border: none;
            border-radius: 12px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: background 0.3s;
        }
        
        .inquiry-btn:hover {
            background: #0077ed;
        }
        
        /* Specs Table */
        .specs-section {
            background: var(--bg-secondary);
            padding: 60px 0;
        }
        
        .specs-container {
            max-width: 1024px;
            margin: 0 auto;
            padding: 0 22px;
        }
        
        .specs-table-wrapper {
            overflow-x: auto;
            background: var(--bg);
            border-radius: 16px;
            padding: 24px;
        }
        
        .specs-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 14px;
        }
        
        .specs-table th {
            text-align: left;
            padding: 12px 16px;
            font-weight: 600;
            color: var(--text-secondary);
            border-bottom: 2px solid var(--border);
            white-space: nowrap;
        }
        
        .specs-table td {
            padding: 12px 16px;
            border-bottom: 1px solid var(--border);
        }
        
        .specs-table tr:hover td {
            background: rgba(0,113,227,0.03);
        }
        
        .price-tag {
            color: var(--primary);
            font-weight: 700;
        }
        
        /* Footer */
        .footer {
            background: var(--bg-secondary);
            padding: 40px 0;
            text-align: center;
            color: var(--text-secondary);
            font-size: 14px;
        }
        
        @media (max-width: 768px) {
            .page-title { font-size: 36px; }
            .product-grid { grid-template-columns: 1fr; }
        }
    </style>
</head>
<body>
    <div class="nav-wrapper">
        <nav class="nav">
            <a href="../../index.html" class="nav-logo">CCCNC</a>
            <div class="nav-links">
                <a href="../../index.html">首页</a>
                <a href="../endmills.html">铣刀</a>
                <a href="../drills.html">钻头</a>
                <a href="../taps.html">丝锥</a>
                <a href="../reamers.html">铰刀</a>
                <a href="../inserts.html">刀片</a>
                <a href="../../contact.html">联系</a>
            </div>
        </nav>
    </div>
    
    <header class="page-header">
        <span class="page-eyebrow">${category.name}</span>
        <h1 class="page-title">${subcategory.name}</h1>
        <p class="page-desc">${subcategory.description}</p>
    </header>
    
    <div class="breadcrumb">
        <a href="../../index.html">首页</a>
        <span>/</span>
        <a href="../${category.id}.html">${category.name}</a>
        <span>/</span>
        <span>${subcategory.name}</span>
    </div>
    
    <section class="section">
        <h2 class="section-title">产品系列</h2>
        <p class="section-desc">${subcategory.specs ? `规格范围: ${Object.values(subcategory.specs).join(' | ')}` : '全系列产品，满足各种加工需求'}</p>
        <div class="product-grid">
            ${productCards}
        </div>
    </section>
    
    <section class="specs-section">
        <div class="specs-container">
            <h2 class="section-title">技术参数</h2>
            <div class="specs-table-wrapper">
                <table class="specs-table">
                    <thead>
                        <tr>
                            <th>型号</th>
                            <th>直径/球径</th>
                            <th>刃数</th>
                            <th>刃长</th>
                            <th>总长</th>
                            <th>柄径</th>
                            <th>材质</th>
                            <th>涂层</th>
                            <th>加工硬度</th>
                            <th>价格</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${tableRows}
                    </tbody>
                </table>
            </div>
        </div>
    </section>
    
    <footer class="footer">
        <p>© 2025 CCCNC. All rights reserved. 专业硬质合金刀具制造商</p>
    </footer>
    
    <script>
        function openInquiry(model) {
            window.location.href = '../../contact.html?product=' + encodeURIComponent(model);
        }
    </script>
</body>
</html>`;
}

// Generate SVG for tools
function generateToolSVG(product, categoryId) {
  if (categoryId === 'endmills') {
    if (product.radius) {
      // Ball nose
      return `<rect x="10" y="45" width="120" height="10" fill="#666" rx="2"/>
        <path d="M130 50 Q150 30 150 50 Q150 70 130 50" fill="#888" stroke="#666" stroke-width="2"/>
        <rect x="150" y="40" width="40" height="20" fill="#444" rx="3"/>`;
    } else if (product.cornerRadius) {
      // Corner radius
      return `<rect x="10" y="45" width="120" height="10" fill="#666" rx="2"/>
        <rect x="130" y="35" width="20" height="30" fill="#888" rx="5"/>
        <rect x="150" y="40" width="40" height="20" fill="#444" rx="3"/>`;
    } else {
      // Flat
      return `<rect x="10" y="45" width="140" height="10" fill="#666" rx="2"/>
        <rect x="150" y="40" width="40" height="20" fill="#444" rx="3"/>`;
    }
  }
  return `<rect x="20" y="45" width="140" height="10" fill="#666" rx="2"/>
    <rect x="160" y="40" width="30" height="20" fill="#444" rx="3"/>`;
}

// Generate all product pages
function buildAll() {
  const baseDir = path.join(__dirname, '../products/detail');
  
  // Create directory if not exists
  if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir, { recursive: true });
  }
  
  let generatedCount = 0;
  
  productsData.categories.forEach(category => {
    if (category.subcategories) {
      category.subcategories.forEach(sub => {
        const html = generateProductPage(category, sub);
        const filePath = path.join(baseDir, `${sub.id}.html`);
        fs.writeFileSync(filePath, html);
        generatedCount++;
        console.log(`Generated: ${sub.id}.html`);
      });
    }
  });
  
  console.log(`\nTotal pages generated: ${generatedCount}`);
}

// Run
buildAll();
