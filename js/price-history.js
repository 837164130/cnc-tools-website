// Product Price History
class PriceHistory {
  constructor() {
    this.init();
  }

  init() {
    this.displayPriceHistory();
  }

  displayPriceHistory() {
    const container = document.querySelector('[data-price-history]');
    if (!container) return;

    const history = JSON.parse(container.dataset.priceHistory || '[]');
    if (history.length === 0) return;

    container.innerHTML = '<h3 style="margin-bottom: 16px;">价格趋势</h3>';

    const chartContainer = document.createElement('div');
    chartContainer.style.cssText = `
      padding: 24px;
      background: var(--bg-secondary);
      border-radius: 12px;
    `;

    // Find min and max for scaling
    const prices = history.map(h => h.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const range = maxPrice - minPrice || 1;

    // Create simple line chart using SVG
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 400 150');
    svg.style.cssText = 'width: 100%; height: auto;';

    // Draw grid lines
    for (let i = 0; i <= 4; i++) {
      const y = 130 - (i * 30);
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', '40');
      line.setAttribute('y1', y);
      line.setAttribute('x2', '380');
      line.setAttribute('y2', y);
      line.setAttribute('stroke', '#e0e0e0');
      line.setAttribute('stroke-width', '1');
      svg.appendChild(line);

      // Y-axis labels
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', '35');
      text.setAttribute('y', y + 4);
      text.setAttribute('text-anchor', 'end');
      text.setAttribute('font-size', '10');
      text.setAttribute('fill', '#999');
      text.textContent = `¥${Math.round(minPrice + (range * i / 4))}`;
      svg.appendChild(text);
    }

    // Draw line
    const points = history.map((h, index) => {
      const x = 40 + (index / (history.length - 1)) * 340;
      const y = 130 - ((h.price - minPrice) / range) * 120;
      return `${x},${y}`;
    }).join(' ');

    const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    polyline.setAttribute('points', points);
    polyline.setAttribute('fill', 'none');
    polyline.setAttribute('stroke', '#0071e3');
    polyline.setAttribute('stroke-width', '2');
    svg.appendChild(polyline);

    // Draw data points
    history.forEach((h, index) => {
      const x = 40 + (index / (history.length - 1)) * 340;
      const y = 130 - ((h.price - minPrice) / range) * 120;

      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', x);
      circle.setAttribute('cy', y);
      circle.setAttribute('r', '4');
      circle.setAttribute('fill', '#0071e3');
      circle.setAttribute('stroke', 'white');
      circle.setAttribute('stroke-width', '2');
      svg.appendChild(circle);

      // X-axis labels
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', x);
      text.setAttribute('y', '145');
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('font-size', '10');
      text.setAttribute('fill', '#999');
      text.textContent = h.date;
      svg.appendChild(text);
    });

    chartContainer.appendChild(svg);

    // Current price highlight
    const currentPrice = history[history.length - 1].price;
    const priceEl = document.createElement('div');
    priceEl.style.cssText = `
      margin-top: 16px;
      padding: 12px;
      background: var(--bg-primary);
      border-radius: 8px;
      text-align: center;
    `;
    priceEl.innerHTML = `
      <div style="font-size: 12px; color: var(--text-secondary);">当前价格</div>
      <div style="font-size: 24px; font-weight: 700; color: #0071e3;">¥${currentPrice}</div>
    `;
    chartContainer.appendChild(priceEl);

    container.appendChild(chartContainer);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new PriceHistory();
});
