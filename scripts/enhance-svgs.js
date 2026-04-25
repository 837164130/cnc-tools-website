const fs = require('fs');
const path = require('path');

const detailDir = path.join(__dirname, '../products/detail');
const files = fs.readdirSync(detailDir).filter(f => f.endsWith('.html'));

// Enhanced SVG drawings for each product type
const svgDrawings = {
  'flat-endmills': `<svg viewBox="0 0 400 200" class="tool-svg" style="width: 200px; height: 100px;">
    <!-- Tool body -->
    <rect x="50" y="85" width="300" height="30" fill="url(#metalGradient)" rx="2"/>
    <!-- Cutting edges -->
    <line x1="340" y1="85" x2="340" y2="115" stroke="#333" stroke-width="2"/>
    <line x1="350" y1="85" x2="350" y2="115" stroke="#333" stroke-width="2"/>
    <line x1="360" y1="85" x2="360" y2="115" stroke="#333" stroke-width="2"/>
    <line x1="370" y1="85" x2="370" y2="115" stroke="#333" stroke-width="2"/>
    <!-- Shank -->
    <rect x="50" y="88" width="100" height="24" fill="url(#shankGradient)" rx="1"/>
    <!-- Dimensions -->
    <line x1="50" y1="75" x2="350" y2="75" stroke="#666" stroke-width="1" stroke-dasharray="4"/>
    <text x="200" y="70" text-anchor="middle" fill="#666" font-size="11">L - 总长</text>
    <line x1="50" y1="130" x2="150" y2="130" stroke="#666" stroke-width="1" stroke-dasharray="4"/>
    <text x="100" y="145" text-anchor="middle" fill="#666" font-size="11">l - 刃长</text>
    <text x="100" y="105" text-anchor="middle" fill="#fff" font-size="10" font-weight="bold">D - 柄径</text>
    <text x="300" y="105" text-anchor="middle" fill="#fff" font-size="10" font-weight="bold">d - 刃径</text>
    <!-- Arrows -->
    <polygon points="50,78 50,72 45,75" fill="#666"/>
    <polygon points="350,78 350,72 355,75" fill="#666"/>
    <defs>
      <linearGradient id="metalGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#c0c0c0"/>
        <stop offset="50%" style="stop-color:#e8e8e8"/>
        <stop offset="100%" style="stop-color:#a0a0a0"/>
      </linearGradient>
      <linearGradient id="shankGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#b0b0b0"/>
        <stop offset="50%" style="stop-color:#d0d0d0"/>
        <stop offset="100%" style="stop-color:#909090"/>
      </linearGradient>
    </defs>
  </svg>`,
  
  'ball-endmills': `<svg viewBox="0 0 400 200" class="tool-svg" style="width: 200px; height: 100px;">
    <!-- Tool body -->
    <rect x="50" y="85" width="280" height="30" fill="url(#metalGradient)" rx="2"/>
    <!-- Ball end -->
    <circle cx="350" cy="100" r="20" fill="url(#ballGradient)"/>
    <path d="M 330 100 Q 350 80 370 100" fill="none" stroke="#333" stroke-width="1.5"/>
    <path d="M 330 100 Q 350 120 370 100" fill="none" stroke="#333" stroke-width="1.5"/>
    <!-- Shank -->
    <rect x="50" y="88" width="100" height="24" fill="url(#shankGradient)" rx="1"/>
    <!-- Dimensions -->
    <line x1="50" y1="75" x2="350" y2="75" stroke="#666" stroke-width="1" stroke-dasharray="4"/>
    <text x="200" y="70" text-anchor="middle" fill="#666" font-size="11">L - 总长</text>
    <text x="100" y="105" text-anchor="middle" fill="#fff" font-size="10" font-weight="bold">D - 柄径</text>
    <text x="300" y="105" text-anchor="middle" fill="#fff" font-size="10" font-weight="bold">R - 球径</text>
    <defs>
      <linearGradient id="metalGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#c0c0c0"/>
        <stop offset="50%" style="stop-color:#e8e8e8"/>
        <stop offset="100%" style="stop-color:#a0a0a0"/>
      </linearGradient>
      <linearGradient id="ballGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#d0d0d0"/>
        <stop offset="50%" style="stop-color:#f0f0f0"/>
        <stop offset="100%" style="stop-color:#b0b0b0"/>
      </linearGradient>
      <linearGradient id="shankGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#b0b0b0"/>
        <stop offset="50%" style="stop-color:#d0d0d0"/>
        <stop offset="100%" style="stop-color:#909090"/>
      </linearGradient>
    </defs>
  </svg>`,
  
  'corner-radius': `<svg viewBox="0 0 400 200" class="tool-svg" style="width: 200px; height: 100px;">
    <!-- Tool body -->
    <rect x="50" y="85" width="290" height="30" fill="url(#metalGradient)" rx="2"/>
    <!-- Corner radius -->
    <path d="M 330 115 Q 350 115 350 95 L 350 85 L 340 85 L 340 105 Q 340 115 330 115" fill="url(#cornerGradient)"/>
    <line x1="340" y1="85" x2="340" y2="115" stroke="#333" stroke-width="2"/>
    <line x1="350" y1="85" x2="350" y2="95" stroke="#333" stroke-width="2"/>
    <!-- Shank -->
    <rect x="50" y="88" width="100" height="24" fill="url(#shankGradient)" rx="1"/>
    <!-- Radius indicator -->
    <path d="M 340 105 Q 350 105 350 95" fill="none" stroke="#ff6b6b" stroke-width="1.5" stroke-dasharray="3"/>
    <text x="360" y="100" fill="#ff6b6b" font-size="10">r</text>
    <!-- Dimensions -->
    <line x1="50" y1="75" x2="350" y2="75" stroke="#666" stroke-width="1" stroke-dasharray="4"/>
    <text x="200" y="70" text-anchor="middle" fill="#666" font-size="11">L - 总长</text>
    <text x="100" y="105" text-anchor="middle" fill="#fff" font-size="10" font-weight="bold">D - 柄径</text>
    <text x="300" y="105" text-anchor="middle" fill="#fff" font-size="10" font-weight="bold">d - 刃径</text>
    <defs>
      <linearGradient id="metalGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#c0c0c0"/>
        <stop offset="50%" style="stop-color:#e8e8e8"/>
        <stop offset="100%" style="stop-color:#a0a0a0"/>
      </linearGradient>
      <linearGradient id="cornerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#d8d8d8"/>
        <stop offset="100%" style="stop-color:#b8b8b8"/>
      </linearGradient>
      <linearGradient id="shankGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#b0b0b0"/>
        <stop offset="50%" style="stop-color:#d0d0d0"/>
        <stop offset="100%" style="stop-color:#909090"/>
      </linearGradient>
    </defs>
  </svg>`,
  
  'roughing': `<svg viewBox="0 0 400 200" class="tool-svg" style="width: 200px; height: 100px;">
    <!-- Tool body with roughing pattern -->
    <rect x="50" y="85" width="300" height="30" fill="url(#metalGradient)" rx="2"/>
    <!-- Roughing teeth -->
    <path d="M 200 85 L 205 80 L 210 85 L 215 80 L 220 85 L 225 80 L 230 85 L 235 80 L 240 85 L 245 80 L 250 85 L 255 80 L 260 85 L 265 80 L 270 85 L 275 80 L 280 85 L 285 80 L 290 85 L 295 80 L 300 85 L 305 80 L 310 85 L 315 80 L 320 85 L 325 80 L 330 85 L 335 80 L 340 85 L 345 80 L 350 85" fill="none" stroke="#333" stroke-width="1.5"/>
    <path d="M 200 115 L 205 120 L 210 115 L 215 120 L 220 115 L 225 120 L 230 115 L 235 120 L 240 115 L 245 120 L 250 115 L 255 120 L 260 115 L 265 120 L 270 115 L 275 120 L 280 115 L 285 120 L 290 115 L 295 120 L 300 115 L 305 120 L 310 115 L 315 120 L 320 115 L 325 120 L 330 115 L 335 120 L 340 115 L 345 120 L 350 115" fill="none" stroke="#333" stroke-width="1.5"/>
    <!-- Shank -->
    <rect x="50" y="88" width="100" height="24" fill="url(#shankGradient)" rx="1"/>
    <!-- Dimensions -->
    <line x1="50" y1="75" x2="350" y2="75" stroke="#666" stroke-width="1" stroke-dasharray="4"/>
    <text x="200" y="70" text-anchor="middle" fill="#666" font-size="11">L - 总长</text>
    <text x="100" y="105" text-anchor="middle" fill="#fff" font-size="10" font-weight="bold">D - 柄径</text>
    <text x="280" y="105" text-anchor="middle" fill="#fff" font-size="10" font-weight="bold">粗皮刃</text>
    <defs>
      <linearGradient id="metalGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#c0c0c0"/>
        <stop offset="50%" style="stop-color:#e8e8e8"/>
        <stop offset="100%" style="stop-color:#a0a0a0"/>
      </linearGradient>
      <linearGradient id="shankGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#b0b0b0"/>
        <stop offset="50%" style="stop-color:#d0d0d0"/>
        <stop offset="100%" style="stop-color:#909090"/>
      </linearGradient>
    </defs>
  </svg>`,
  
  'twist-drills': `<svg viewBox="0 0 400 200" class="tool-svg" style="width: 200px; height: 100px;">
    <!-- Drill body -->
    <rect x="50" y="88" width="300" height="24" fill="url(#metalGradient)" rx="2"/>
    <!-- Drill point -->
    <polygon points="350,88 380,100 350,112" fill="url(#pointGradient)"/>
    <!-- Flutes -->
    <line x1="100" y1="88" x2="340" y2="88" stroke="#333" stroke-width="1"/>
    <line x1="100" y1="112" x2="340" y2="112" stroke="#333" stroke-width="1"/>
    <path d="M 150 88 Q 200 100 250 88" fill="none" stroke="#555" stroke-width="1" stroke-dasharray="2"/>
    <path d="M 150 112 Q 200 100 250 112" fill="none" stroke="#555" stroke-width="1" stroke-dasharray="2"/>
    <!-- Shank -->
    <rect x="50" y="90" width="80" height="20" fill="url(#shankGradient)" rx="1"/>
    <!-- Dimensions -->
    <line x1="50" y1="78" x2="350" y2="78" stroke="#666" stroke-width="1" stroke-dasharray="4"/>
    <text x="200" y="73" text-anchor="middle" fill="#666" font-size="11">L - 总长</text>
    <text x="90" y="102" text-anchor="middle" fill="#fff" font-size="10" font-weight="bold">D - 柄径</text>
    <text x="300" y="102" text-anchor="middle" fill="#fff" font-size="10" font-weight="bold">d - 刃径</text>
    <text x="365" y="102" text-anchor="middle" fill="#666" font-size="10">118°</text>
    <defs>
      <linearGradient id="metalGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#c0c0c0"/>
        <stop offset="50%" style="stop-color:#e8e8e8"/>
        <stop offset="100%" style="stop-color:#a0a0a0"/>
      </linearGradient>
      <linearGradient id="pointGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#d0d0d0"/>
        <stop offset="100%" style="stop-color:#a0a0a0"/>
      </linearGradient>
      <linearGradient id="shankGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#b0b0b0"/>
        <stop offset="50%" style="stop-color:#d0d0d0"/>
        <stop offset="100%" style="stop-color:#909090"/>
      </linearGradient>
    </defs>
  </svg>`,
  
  'center-drills': `<svg viewBox="0 0 400 200" class="tool-svg" style="width: 200px; height: 100px;">
    <!-- Center drill body -->
    <rect x="50" y="88" width="280" height="24" fill="url(#metalGradient)" rx="2"/>
    <!-- Center drill point (60 degree) -->
    <polygon points="330,88 360,100 330,112" fill="url(#pointGradient)"/>
    <!-- Pilot -->
    <rect x="310" y="94" width="20" height="12" fill="url(#pilotGradient)" rx="1"/>
    <!-- Shank -->
    <rect x="50" y="90" width="100" height="20" fill="url(#shankGradient)" rx="1"/>
    <!-- Dimensions -->
    <line x1="50" y1="78" x2="330" y2="78" stroke="#666" stroke-width="1" stroke-dasharray="4"/>
    <text x="190" y="73" text-anchor="middle" fill="#666" font-size="11">L - 总长</text>
    <text x="100" y="102" text-anchor="middle" fill="#fff" font-size="10" font-weight="bold">D - 柄径</text>
    <text x="280" y="102" text-anchor="middle" fill="#fff" font-size="10" font-weight="bold">d - 导向径</text>
    <text x="345" y="102" text-anchor="middle" fill="#666" font-size="10">60°</text>
    <defs>
      <linearGradient id="metalGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#c0c0c0"/>
        <stop offset="50%" style="stop-color:#e8e8e8"/>
        <stop offset="100%" style="stop-color:#a0a0a0"/>
      </linearGradient>
      <linearGradient id="pointGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#d0d0d0"/>
        <stop offset="100%" style="stop-color:#a0a0a0"/>
      </linearGradient>
      <linearGradient id="pilotGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#b8b8b8"/>
        <stop offset="100%" style="stop-color:#989898"/>
      </linearGradient>
      <linearGradient id="shankGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#b0b0b0"/>
        <stop offset="50%" style="stop-color:#d0d0d0"/>
        <stop offset="100%" style="stop-color:#909090"/>
      </linearGradient>
    </defs>
  </svg>`,
  
  'internal-coolant': `<svg viewBox="0 0 400 200" class="tool-svg" style="width: 200px; height: 100px;">
    <!-- Drill body with coolant holes -->
    <rect x="50" y="88" width="300" height="24" fill="url(#metalGradient)" rx="2"/>
    <!-- Coolant holes -->
    <circle cx="150" cy="96" r="3" fill="#4dabf7"/>
    <circle cx="200" cy="96" r="3" fill="#4dabf7"/>
    <circle cx="250" cy="96" r="3" fill="#4dabf7"/>
    <circle cx="300" cy="96" r="3" fill="#4dabf7"/>
    <!-- Drill point -->
    <polygon points="350,88 380,100 350,112" fill="url(#pointGradient)"/>
    <!-- Flutes -->
    <line x1="100" y1="88" x2="340" y2="88" stroke="#333" stroke-width="1"/>
    <line x1="100" y1="112" x2="340" y2="112" stroke="#333" stroke-width="1"/>
    <!-- Shank -->
    <rect x="50" y="90" width="80" height="20" fill="url(#shankGradient)" rx="1"/>
    <!-- Coolant label -->
    <text x="200" y="80" text-anchor="middle" fill="#4dabf7" font-size="10" font-weight="bold">内冷孔</text>
    <!-- Dimensions -->
    <text x="90" y="102" text-anchor="middle" fill="#fff" font-size="10" font-weight="bold">D - 柄径</text>
    <text x="300" y="102" text-anchor="middle" fill="#fff" font-size="10" font-weight="bold">d - 刃径</text>
    <defs>
      <linearGradient id="metalGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#c0c0c0"/>
        <stop offset="50%" style="stop-color:#e8e8e8"/>
        <stop offset="100%" style="stop-color:#a0a0a0"/>
      </linearGradient>
      <linearGradient id="pointGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#d0d0d0"/>
        <stop offset="100%" style="stop-color:#a0a0a0"/>
      </linearGradient>
      <linearGradient id="shankGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#b0b0b0"/>
        <stop offset="50%" style="stop-color:#d0d0d0"/>
        <stop offset="100%" style="stop-color:#909090"/>
      </linearGradient>
    </defs>
  </svg>`,
  
  'machine-taps': `<svg viewBox="0 0 400 200" class="tool-svg" style="width: 200px; height: 100px;">
    <!-- Tap body -->
    <rect x="50" y="88" width="300" height="24" fill="url(#metalGradient)" rx="2"/>
    <!-- Threads -->
    <line x1="200" y1="88" x2="200" y2="112" stroke="#333" stroke-width="1"/>
    <line x1="210" y1="88" x2="210" y2="112" stroke="#333" stroke-width="1"/>
    <line x1="220" y1="88" x2="220" y2="112" stroke="#333" stroke-width="1"/>
    <line x1="230" y1="88" x2="230" y2="112" stroke="#333" stroke-width="1"/>
    <line x1="240" y1="88" x2="240" y2="112" stroke="#333" stroke-width="1"/>
    <line x1="250" y1="88" x2="250" y2="112" stroke="#333" stroke-width="1"/>
    <line x1="260" y1="88" x2="260" y2="112" stroke="#333" stroke-width="1"/>
    <line x1="270" y1="88" x2="270" y2="112" stroke="#333" stroke-width="1"/>
    <line x1="280" y1="88" x2="280" y2="112" stroke="#333" stroke-width="1"/>
    <line x1="290" y1="88" x2="290" y2="112" stroke="#333" stroke-width="1"/>
    <line x1="300" y1="88" x2="300" y2="112" stroke="#333" stroke-width="1"/>
    <line x1="310" y1="88" x2="310" y2="112" stroke="#333" stroke-width="1"/>
    <line x1="320" y1="88" x2="320" y2="112" stroke="#333" stroke-width="1"/>
    <line x1="330" y1="88" x2="330" y2="112" stroke="#333" stroke-width="1"/>
    <line x1="340" y1="88" x2="340" y2="112" stroke="#333" stroke-width="1"/>
    <!-- Chamfer -->
    <polygon points="340,88 350,94 350,106 340,112" fill="url(#chamferGradient)"/>
    <!-- Shank -->
    <rect x="50" y="90" width="100" height="20" fill="url(#shankGradient)" rx="1"/>
    <!-- Square -->
    <rect x="50" y="92" width="20" height="16" fill="#999" rx="1"/>
    <!-- Dimensions -->
    <line x1="50" y1="78" x2="350" y2="78" stroke="#666" stroke-width="1" stroke-dasharray="4"/>
    <text x="200" y="73" text-anchor="middle" fill="#666" font-size="11">L - 总长</text>
    <text x="100" y="102" text-anchor="middle" fill="#fff" font-size="10" font-weight="bold">D - 柄径</text>
    <text x="270" y="102" text-anchor="middle" fill="#fff" font-size="10" font-weight="bold">螺纹段</text>
    <defs>
      <linearGradient id="metalGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#c0c0c0"/>
        <stop offset="50%" style="stop-color:#e8e8e8"/>
        <stop offset="100%" style="stop-color:#a0a0a0"/>
      </linearGradient>
      <linearGradient id="chamferGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#d0d0d0"/>
        <stop offset="100%" style="stop-color:#b0b0b0"/>
      </linearGradient>
      <linearGradient id="shankGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#b0b0b0"/>
        <stop offset="50%" style="stop-color:#d0d0d0"/>
        <stop offset="100%" style="stop-color:#909090"/>
      </linearGradient>
    </defs>
  </svg>`,
  
  'forming-taps': `<svg viewBox="0 0 400 200" class="tool-svg" style="width: 200px; height: 100px;">
    <!-- Forming tap body -->
    <rect x="50" y="88" width="300" height="24" fill="url(#metalGradient)" rx="2"/>
    <!-- Forming threads (no flutes) -->
    <line x1="200" y1="88" x2="200" y2="112" stroke="#555" stroke-width="1.5"/>
    <line x1="210" y1="88" x2="210" y2="112" stroke="#555" stroke-width="1.5"/>
    <line x1="220" y1="88" x2="220" y2="112" stroke="#555" stroke-width="1.5"/>
    <line x1="230" y1="88" x2="230" y2="112" stroke="#555" stroke-width="1.5"/>
    <line x1="240" y1="88" x2="240" y2="112" stroke="#555" stroke-width="1.5"/>
    <line x1="250" y1="88" x2="250" y2="112" stroke="#555" stroke-width="1.5"/>
    <line x1="260" y1="88" x2="260" y2="112" stroke="#555" stroke-width="1.5"/>
    <line x1="270" y1="88" x2="270" y2="112" stroke="#555" stroke-width="1.5"/>
    <line x1="280" y1="88" x2="280" y2="112" stroke="#555" stroke-width="1.5"/>
    <line x1="290" y1="88" x2="290" y2="112" stroke="#555" stroke-width="1.5"/>
    <line x1="300" y1="88" x2="300" y2="112" stroke="#555" stroke-width="1.5"/>
    <line x1="310" y1="88" x2="310" y2="112" stroke="#555" stroke-width="1.5"/>
    <line x1="320" y1="88" x2="320" y2="112" stroke="#555" stroke-width="1.5"/>
    <line x1="330" y1="88" x2="330" y2="112" stroke="#555" stroke-width="1.5"/>
    <line x1="340" y1="88" x2="340" y2="112" stroke="#555" stroke-width="1.5"/>
    <!-- Longer chamfer -->
    <polygon points="340,88 350,94 350,106 340,112" fill="url(#chamferGradient)"/>
    <!-- Shank -->
    <rect x="50" y="90" width="100" height="20" fill="url(#shankGradient)" rx="1"/>
    <!-- Square -->
    <rect x="50" y="92" width="20" height="16" fill="#999" rx="1"/>
    <!-- Oil grooves -->
    <path d="M 200 100 Q 220 95 240 100 Q 260 105 280 100 Q 300 95 320 100" fill="none" stroke="#4dabf7" stroke-width="1" stroke-dasharray="3"/>
    <!-- Dimensions -->
    <line x1="50" y1="78" x2="350" y2="78" stroke="#666" stroke-width="1" stroke-dasharray="4"/>
    <text x="200" y="73" text-anchor="middle" fill="#666" font-size="11">L - 总长</text>
    <text x="100" y="102" text-anchor="middle" fill="#fff" font-size="10" font-weight="bold">D - 柄径</text>
    <text x="270" y="102" text-anchor="middle" fill="#fff" font-size="10" font-weight="bold">挤压螺纹</text>
    <text x="250" y="80" text-anchor="middle" fill="#4dabf7" font-size="9">油槽</text>
    <defs>
      <linearGradient id="metalGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#c0c0c0"/>
        <stop offset="50%" style="stop-color:#e8e8e8"/>
        <stop offset="100%" style="stop-color:#a0a0a0"/>
      </linearGradient>
      <linearGradient id="chamferGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#d0d0d0"/>
        <stop offset="100%" style="stop-color:#b0b0b0"/>
      </linearGradient>
      <linearGradient id="shankGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#b0b0b0"/>
        <stop offset="50%" style="stop-color:#d0d0d0"/>
        <stop offset="100%" style="stop-color:#909090"/>
      </linearGradient>
    </defs>
  </svg>`,
  
  'straight-reamers': `<svg viewBox="0 0 400 200" class="tool-svg" style="width: 200px; height: 100px;">
    <!-- Reamer body -->
    <rect x="50" y="88" width="300" height="24" fill="url(#metalGradient)" rx="2"/>
    <!-- Reamer flutes -->
    <line x1="150" y1="88" x2="150" y2="112" stroke="#333" stroke-width="1.5"/>
    <line x1="170" y1="88" x2="170" y2="112" stroke="#333" stroke-width="1.5"/>
    <line x1="190" y1="88" x2="190" y2="112" stroke="#333" stroke-width="1.5"/>
    <line x1="210" y1="88" x2="210" y2="112" stroke="#333" stroke-width="1.5"/>
    <line x1="230" y1="88" x2="230" y2="112" stroke="#333" stroke-width="1.5"/>
    <line x1="250" y1="88" x2="250" y2="112" stroke="#333" stroke-width="1.5"/>
    <line x1="270" y1="88" x2="270" y2="112" stroke="#333" stroke-width="1.5"/>
    <line x1="290" y1="88" x2="290" y2="112" stroke="#333" stroke-width="1.5"/>
    <line x1="310" y1="88" x2="310" y2="112" stroke="#333" stroke-width="1.5"/>
    <line x1="330" y1="88" x2="330" y2="112" stroke="#333" stroke-width="1.5"/>
    <!-- Taper end -->
    <polygon points="330,88 350,94 350,106 330,112" fill="url(#taperGradient)"/>
    <!-- Shank -->
    <rect x="50" y="90" width="100" height="20" fill="url(#shankGradient)" rx="1"/>
    <!-- Dimensions -->
    <line x1="50" y1="78" x2="350" y2="78" stroke="#666" stroke-width="1" stroke-dasharray="4"/>
    <text x="200" y="73" text-anchor="middle" fill="#666" font-size="11">L - 总长</text>
    <text x="100" y="102" text-anchor="middle" fill="#fff" font-size="10" font-weight="bold">D - 柄径</text>
    <text x="280" y="102" text-anchor="middle" fill="#fff" font-size="10" font-weight="bold">铰削段</text>
    <text x="340" y="102" text-anchor="middle" fill="#666" font-size="10">锥度</text>
    <defs>
      <linearGradient id="metalGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#c0c0c0"/>
        <stop offset="50%" style="stop-color:#e8e8e8"/>
        <stop offset="100%" style="stop-color:#a0a0a0"/>
      </linearGradient>
      <linearGradient id="taperGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#d0d0d0"/>
        <stop offset="100%" style="stop-color:#b0b0b0"/>
      </linearGradient>
      <linearGradient id="shankGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#b0b0b0"/>
        <stop offset="50%" style="stop-color:#d0d0d0"/>
        <stop offset="100%" style="stop-color:#909090"/>
      </linearGradient>
    </defs>
  </svg>`,
  
  'adjustable-reamers': `<svg viewBox="0 0 400 200" class="tool-svg" style="width: 200px; height: 100px;">
    <!-- Adjustable reamer body -->
    <rect x="50" y="88" width="300" height="24" fill="url(#metalGradient)" rx="2"/>
    <!-- Adjustment nut -->
    <rect x="280" y="84" width="30" height="32" fill="url(#nutGradient)" rx="2"/>
    <line x1="285" y1="84" x2="285" y2="116" stroke="#666" stroke-width="1"/>
    <line x1="290" y1="84" x2="290" y2="116" stroke="#666" stroke-width="1"/>
    <line x1="295" y1="84" x2="295" y2="116" stroke="#666" stroke-width="1"/>
    <line x1="300" y1="84" x2="300" y2="116" stroke="#666" stroke-width="1"/>
    <line x1="305" y1="84" x2="305" y2="116" stroke="#666" stroke-width="1"/>
    <!-- Blades -->
    <rect x="310" y="86" width="40" height="8" fill="url(#bladeGradient)" rx="1"/>
    <rect x="310" y="106" width="40" height="8" fill="url(#bladeGradient)" rx="1"/>
    <!-- Shank -->
    <rect x="50" y="90" width="100" height="20" fill="url(#shankGradient)" rx="1"/>
    <!-- Dimensions -->
    <line x1="50" y1="78" x2="350" y2="78" stroke="#666" stroke-width="1" stroke-dasharray="4"/>
    <text x="200" y="73" text-anchor="middle" fill="#666" font-size="11">L - 总长</text>
    <text x="100" y="102" text-anchor="middle" fill="#fff" font-size="10" font-weight="bold">D - 柄径</text>
    <text x="295" y="82" text-anchor="middle" fill="#666" font-size="9">调节螺母</text>
    <text x="330" y="102" text-anchor="middle" fill="#fff" font-size="9">刀片</text>
    <defs>
      <linearGradient id="metalGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#c0c0c0"/>
        <stop offset="50%" style="stop-color:#e8e8e8"/>
        <stop offset="100%" style="stop-color:#a0a0a0"/>
      </linearGradient>
      <linearGradient id="nutGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#d0d0d0"/>
        <stop offset="50%" style="stop-color:#f0f0f0"/>
        <stop offset="100%" style="stop-color:#b0b0b0"/>
      </linearGradient>
      <linearGradient id="bladeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#e8e8e8"/>
        <stop offset="100%" style="stop-color:#c0c0c0"/>
      </linearGradient>
      <linearGradient id="shankGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#b0b0b0"/>
        <stop offset="50%" style="stop-color:#d0d0d0"/>
        <stop offset="100%" style="stop-color:#909090"/>
      </linearGradient>
    </defs>
  </svg>`,
  
  'turning-inserts': `<svg viewBox="0 0 400 200" class="tool-svg" style="width: 200px; height: 100px;">
    <!-- Turning insert (CNMG) -->
    <polygon points="150,60 250,60 280,100 250,140 150,140 120,100" fill="url(#insertGradient)" stroke="#666" stroke-width="2"/>
    <!-- Hole -->
    <circle cx="200" cy="100" r="15" fill="#333" stroke="#666" stroke-width="1"/>
    <!-- Cutting edges -->
    <line x1="150" y1="60" x2="250" y2="60" stroke="#ff6b6b" stroke-width="3"/>
    <line x1="250" y1="60" x2="280" y2="100" stroke="#ff6b6b" stroke-width="3"/>
    <line x1="280" y1="100" x2="250" y2="140" stroke="#ff6b6b" stroke-width="3"/>
    <line x1="250" y1="140" x2="150" y2="140" stroke="#ff6b6b" stroke-width="3"/>
    <line x1="150" y1="140" x2="120" y2="100" stroke="#ff6b6b" stroke-width="3"/>
    <line x1="120" y1="100" x2="150" y2="60" stroke="#ff6b6b" stroke-width="3"/>
    <!-- Dimensions -->
    <text x="200" y="55" text-anchor="middle" fill="#666" font-size="11">IC - 内切圆</text>
    <text x="200" y="155" text-anchor="middle" fill="#666" font-size="11">S - 厚度</text>
    <text x="100" y="100" text-anchor="middle" fill="#666" font-size="11" transform="rotate(-60 100 100)">d - 孔径</text>
    <text x="295" y="100" text-anchor="middle" fill="#ff6b6b" font-size="10" font-weight="bold">切削刃</text>
    <defs>
      <linearGradient id="insertGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#d4a574"/>
        <stop offset="50%" style="stop-color:#c49464"/>
        <stop offset="100%" style="stop-color:#a47444"/>
      </linearGradient>
    </defs>
  </svg>`,
  
  'milling-inserts': `<svg viewBox="0 0 400 200" class="tool-svg" style="width: 200px; height: 100px;">
    <!-- Milling insert (APKT) -->
    <polygon points="150,70 250,70 280,130 220,130 220,100 180,100 180,130 120,130" fill="url(#insertGradient)" stroke="#666" stroke-width="2"/>
    <!-- Hole -->
    <circle cx="200" cy="85" r="8" fill="#333" stroke="#666" stroke-width="1"/>
    <!-- Cutting edges -->
    <line x1="150" y1="70" x2="250" y2="70" stroke="#ff6b6b" stroke-width="3"/>
    <line x1="250" y1="70" x2="280" y2="130" stroke="#ff6b6b" stroke-width="3"/>
    <!-- Dimensions -->
    <text x="200" y="65" text-anchor="middle" fill="#666" font-size="11">L - 长度</text>
    <text x="200" y="145" text-anchor="middle" fill="#666" font-size="11">W - 宽度</text>
    <text x="300" y="100" text-anchor="middle" fill="#ff6b6b" font-size="10" font-weight="bold">切削刃</text>
    <defs>
      <linearGradient id="insertGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#d4a574"/>
        <stop offset="50%" style="stop-color:#c49464"/>
        <stop offset="100%" style="stop-color:#a47444"/>
      </linearGradient>
    </defs>
  </svg>`,
  
  'bt-holders': `<svg viewBox="0 0 400 200" class="tool-svg" style="width: 200px; height: 100px;">
    <!-- BT Holder body -->
    <rect x="50" y="80" width="100" height="40" fill="url(#holderGradient)" rx="2"/>
    <!-- Taper -->
    <polygon points="150,80 250,85 250,115 150,120" fill="url(#taperGradient)"/>
    <!-- Flange -->
    <rect x="240" y="70" width="20" height="60" fill="url(#flangeGradient)" rx="2"/>
    <!-- Collet area -->
    <rect x="260" y="88" width="80" height="24" fill="url(#colletGradient)" rx="2"/>
    <!-- Pull stud hole -->
    <circle cx="100" cy="100" r="12" fill="#333"/>
    <!-- Dimensions -->
    <text x="100" y="75" text-anchor="middle" fill="#666" font-size="10">BT30/40/50</text>
    <text x="200" y="75" text-anchor="middle" fill="#666" font-size="10">锥度 7:24</text>
    <text x="300" y="85" text-anchor="middle" fill="#666" font-size="10">ER16/20/32</text>
    <text x="300" y="120" text-anchor="middle" fill="#666" font-size="10">夹持范围</text>
    <defs>
      <linearGradient id="holderGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#c0c0c0"/>
        <stop offset="50%" style="stop-color:#e0e0e0"/>
        <stop offset="100%" style="stop-color:#a0a0a0"/>
      </linearGradient>
      <linearGradient id="taperGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#b0b0b0"/>
        <stop offset="100%" style="stop-color:#d0d0d0"/>
      </linearGradient>
      <linearGradient id="flangeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#d0d0d0"/>
        <stop offset="50%" style="stop-color:#f0f0f0"/>
        <stop offset="100%" style="stop-color:#b0b0b0"/>
      </linearGradient>
      <linearGradient id="colletGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#a0a0a0"/>
        <stop offset="50%" style="stop-color:#c0c0c0"/>
        <stop offset="100%" style="stop-color:#808080"/>
      </linearGradient>
    </defs>
  </svg>`,
  
  'hsk-holders': `<svg viewBox="0 0 400 200" class="tool-svg" style="width: 200px; height: 100px;">
    <!-- HSK Holder body -->
    <rect x="50" y="80" width="80" height="40" fill="url(#holderGradient)" rx="2"/>
    <!-- HSK Taper (1:10) -->
    <polygon points="130,78 220,88 220,112 130,122" fill="url(#taperGradient)"/>
    <!-- Clamping area -->
    <rect x="220" y="85" width="40" height="30" fill="url(#clampGradient)" rx="2"/>
    <!-- Collet -->
    <rect x="260" y="88" width="80" height="24" fill="url(#colletGradient)" rx="2"/>
    <!-- Dimensions -->
    <text x="90" y="75" text-anchor="middle" fill="#666" font-size="10">HSK63A/100A</text>
    <text x="175" y="75" text-anchor="middle" fill="#666" font-size="10">锥度 1:10</text>
    <text x="300" y="85" text-anchor="middle" fill="#666" font-size="10">ER32/40</text>
    <text x="300" y="120" text-anchor="middle" fill="#666" font-size="10">双面接触</text>
    <defs>
      <linearGradient id="holderGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#c0c0c0"/>
        <stop offset="50%" style="stop-color:#e0e0e0"/>
        <stop offset="100%" style="stop-color:#a0a0a0"/>
      </linearGradient>
      <linearGradient id="taperGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#b0b0b0"/>
        <stop offset="100%" style="stop-color:#d0d0d0"/>
      </linearGradient>
      <linearGradient id="clampGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#d0d0d0"/>
        <stop offset="50%" style="stop-color:#f0f0f0"/>
        <stop offset="100%" style="stop-color:#b0b0b0"/>
      </linearGradient>
      <linearGradient id="colletGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#a0a0a0"/>
        <stop offset="50%" style="stop-color:#c0c0c0"/>
        <stop offset="100%" style="stop-color:#808080"/>
      </linearGradient>
    </defs>
  </svg>`,
  
  'er-collets': `<svg viewBox="0 0 400 200" class="tool-svg" style="width: 200px; height: 100px;">
    <!-- ER Collet body -->
    <rect x="100" y="85" width="200" height="30" fill="url(#colletGradient)" rx="3"/>
    <!-- Slots -->
    <line x1="150" y1="85" x2="150" y2="115" stroke="#333" stroke-width="2"/>
    <line x1="200" y1="85" x2="200" y2="115" stroke="#333" stroke-width="2"/>
    <line x1="250" y1="85" x2="250" y2="115" stroke="#333" stroke-width="2"/>
    <!-- Taper end -->
    <polygon points="100,85 80,92 80,108 100,115" fill="url(#taperGradient)"/>
    <!-- Nut end -->
    <rect x="300" y="80" width="30" height="40" fill="url(#nutGradient)" rx="2"/>
    <line x1="305" y1="80" x2="305" y2="120" stroke="#666" stroke-width="1"/>
    <line x1="310" y1="80" x2="310" y2="120" stroke="#666" stroke-width="1"/>
    <line x1="315" y1="80" x2="315" y2="120" stroke="#666" stroke-width="1"/>
    <line x1="320" y1="80" x2="320" y2="120" stroke="#666" stroke-width="1"/>
    <line x1="325" y1="80" x2="325" y2="120" stroke="#666" stroke-width="1"/>
    <!-- Dimensions -->
    <text x="200" y="80" text-anchor="middle" fill="#666" font-size="11">ER16/20/32/40</text>
    <text x="200" y="130" text-anchor="middle" fill="#666" font-size="11">夹持范围: 1-26mm</text>
    <text x="90" y="100" text-anchor="middle" fill="#666" font-size="9">锥度 8°</text>
    <text x="315" y="75" text-anchor="middle" fill="#666" font-size="9">螺母</text>
    <defs>
      <linearGradient id="colletGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#c0c0c0"/>
        <stop offset="50%" style="stop-color:#e0e0e0"/>
        <stop offset="100%" style="stop-color:#a0a0a0"/>
      </linearGradient>
      <linearGradient id="taperGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#b0b0b0"/>
        <stop offset="100%" style="stop-color:#d0d0d0"/>
      </linearGradient>
      <linearGradient id="nutGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#d0d0d0"/>
        <stop offset="50%" style="stop-color:#f0f0f0"/>
        <stop offset="100%" style="stop-color:#b0b0b0"/>
      </linearGradient>
    </defs>
  </svg>`,
  
  'face-mills': `<svg viewBox="0 0 400 200" class="tool-svg" style="width: 200px; height: 100px;">
    <!-- Face mill body -->
    <ellipse cx="200" cy="100" rx="120" ry="40" fill="url(#millGradient)" stroke="#666" stroke-width="2"/>
    <!-- Center hole -->
    <circle cx="200" cy="100" r="25" fill="#333" stroke="#666" stroke-width="2"/>
    <!-- Insert pockets -->
    <rect x="160" y="55" width="20" height="15" fill="url(#insertGradient)" rx="2" transform="rotate(-30 170 62)"/>
    <rect x="220" y="55" width="20" height="15" fill="url(#insertGradient)" rx="2" transform="rotate(30 230 62)"/>
    <rect x="250" y="85" width="20" height="15" fill="url(#insertGradient)" rx="2" transform="rotate(80 260 92)"/>
    <rect x="240" y="120" width="20" height="15" fill="url(#insertGradient)" rx="2" transform="rotate(140 250 127)"/>
    <rect x="140" y="120" width="20" height="15" fill="url(#insertGradient)" rx="2" transform="rotate(-140 150 127)"/>
    <rect x="130" y="85" width="20" height="15" fill="url(#insertGradient)" rx="2" transform="rotate(-80 140 92)"/>
    <!-- Arbor hole -->
    <circle cx="200" cy="100" r="15" fill="#555"/>
    <!-- Dimensions -->
    <text x="200" y="45" text-anchor="middle" fill="#666" font-size="11">D - 直径 50-100mm</text>
    <text x="200" y="155" text-anchor="middle" fill="#666" font-size="11">6齿设计</text>
    <text x="320" y="100" text-anchor="middle" fill="#ff6b6b" font-size="10" font-weight="bold">刀片位</text>
    <defs>
      <linearGradient id="millGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#c0c0c0"/>
        <stop offset="50%" style="stop-color:#e0e0e0"/>
        <stop offset="100%" style="stop-color:#a0a0a0"/>
      </linearGradient>
      <linearGradient id="insertGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#d4a574"/>
        <stop offset="50%" style="stop-color:#c49464"/>
        <stop offset="100%" style="stop-color:#a47444"/>
      </linearGradient>
    </defs>
  </svg>`,
  
  'end-mill-holders': `<svg viewBox="0 0 400 200" class="tool-svg" style="width: 200px; height: 100px;">
    <!-- End mill holder body -->
    <rect x="50" y="85" width="120" height="30" fill="url(#holderGradient)" rx="2"/>
    <!-- Taper -->
    <polygon points="170,82 250,88 250,112 170,118" fill="url(#taperGradient)"/>
    <!-- Flange -->
    <rect x="240" y="75" width="15" height="50" fill="url(#flangeGradient)" rx="2"/>
    <!-- Collet/Holder end -->
    <rect x="255" y="88" width="60" height="24" fill="url(#colletGradient)" rx="2"/>
    <!-- Screw -->
    <circle cx="280" cy="100" r="8" fill="#333"/>
    <!-- Dimensions -->
    <text x="110" y="80" text-anchor="middle" fill="#666" font-size="10">莫氏锥柄</text>
    <text x="210" y="80" text-anchor="middle" fill="#666" font-size="10">7:24锥度</text>
    <text x="285" y="85" text-anchor="middle" fill="#666" font-size="10">侧固式</text>
    <text x="285" y="122" text-anchor="middle" fill="#666" font-size="10">夹持20-32mm</text>
    <defs>
      <linearGradient id="holderGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#c0c0c0"/>
        <stop offset="50%" style="stop-color:#e0e0e0"/>
        <stop offset="100%" style="stop-color:#a0a0a0"/>
      </linearGradient>
      <linearGradient id="taperGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#b0b0b0"/>
        <stop offset="100%" style="stop-color:#d0d0d0"/>
      </linearGradient>
      <linearGradient id="flangeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#d0d0d0"/>
        <stop offset="50%" style="stop-color:#f0f0f0"/>
        <stop offset="100%" style="stop-color:#b0b0b0"/>
      </linearGradient>
      <linearGradient id="colletGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#a0a0a0"/>
        <stop offset="50%" style="stop-color:#c0c0c0"/>
        <stop offset="100%" style="stop-color:#808080"/>
      </linearGradient>
    </defs>
  </svg>`
};

// Default SVG for products without specific drawing
const defaultSvg = `<svg viewBox="0 0 400 200" class="tool-svg" style="width: 200px; height: 100px;">
  <rect x="50" y="85" width="300" height="30" fill="url(#metalGradient)" rx="2"/>
  <rect x="50" y="88" width="100" height="24" fill="url(#shankGradient)" rx="1"/>
  <line x1="50" y1="75" x2="350" y2="75" stroke="#666" stroke-width="1" stroke-dasharray="4"/>
  <text x="200" y="70" text-anchor="middle" fill="#666" font-size="11">L - 总长</text>
  <text x="100" y="105" text-anchor="middle" fill="#fff" font-size="10" font-weight="bold">D - 柄径</text>
  <text x="280" y="105" text-anchor="middle" fill="#fff" font-size="10" font-weight="bold">工作段</text>
  <defs>
    <linearGradient id="metalGradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#c0c0c0"/>
      <stop offset="50%" style="stop-color:#e8e8e8"/>
      <stop offset="100%" style="stop-color:#a0a0a0"/>
    </linearGradient>
    <linearGradient id="shankGradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#b0b0b0"/>
      <stop offset="50%" style="stop-color:#d0d0d0"/>
      <stop offset="100%" style="stop-color:#909090"/>
    </linearGradient>
  </defs>
</svg>`;

files.forEach(file => {
  const filePath = path.join(detailDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  const baseName = path.basename(file, '.html');
  const newSvg = svgDrawings[baseName] || defaultSvg;
  
  // Replace existing SVG with enhanced one
  const svgRegex = /<svg[^>]*class="tool-svg"[^>]*>[\s\S]*?<\/svg>/;
  if (svgRegex.test(content)) {
    content = content.replace(svgRegex, newSvg);
    console.log(`Updated SVG: ${file}`);
  } else {
    console.log(`No SVG found: ${file}`);
  }
  
  fs.writeFileSync(filePath, content);
});

console.log('All SVG drawings enhanced!');