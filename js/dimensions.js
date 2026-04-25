// Product Dimensions Diagram
class DimensionsDiagram {
  constructor() {
    this.init();
  }

  init() {
    this.displayDimensions();
  }

  displayDimensions() {
    const container = document.querySelector('[data-dimensions]');
    if (!container) return;

    const dimensions = JSON.parse(container.dataset.dimensions || '{}');
    if (Object.keys(dimensions).length === 0) return;

    container.innerHTML = '<h3 style="margin-bottom: 16px;">尺寸图</h3>';

    const wrapper = document.createElement('div');
    wrapper.style.cssText = `
      padding: 24px;
      background: var(--bg-secondary);
      border-radius: 12px;
      text-align: center;
    `;

    // Create SVG diagram
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 400 200');
    svg.style.cssText = 'width: 100%; max-width: 600px; height: auto;';

    // Draw a simple tool shape based on dimensions
    const totalLength = parseFloat(dimensions['总长']) || 50;
    const fluteLength = parseFloat(dimensions['刃长']) || 15;
    const shankDia = parseFloat(dimensions['柄径']) || 6;

    const scale = 300 / totalLength;
    const startX = 50;
    const centerY = 100;
    const shankWidth = shankDia * scale;
    const fluteWidth = (shankDia * 0.8) * scale;

    // Shank
    const shank = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    shank.setAttribute('x', startX);
    shank.setAttribute('y', centerY - shankWidth / 2);
    shank.setAttribute('width', (totalLength - fluteLength) * scale);
    shank.setAttribute('height', shankWidth);
    shank.setAttribute('fill', '#8e8e93');
    shank.setAttribute('rx', '2');
    svg.appendChild(shank);

    // Flute
    const flute = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    flute.setAttribute('x', startX + (totalLength - fluteLength) * scale);
    flute.setAttribute('y', centerY - fluteWidth / 2);
    flute.setAttribute('width', fluteLength * scale);
    flute.setAttribute('height', fluteWidth);
    flute.setAttribute('fill', '#0071e3');
    flute.setAttribute('rx', '2');
    svg.appendChild(flute);

    // Dimension lines
    const addDimension = (x1, y1, x2, y2, label, offset = 20) => {
      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      
      // Line
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', x1);
      line.setAttribute('y1', y1);
      line.setAttribute('x2', x2);
      line.setAttribute('y2', y2);
      line.setAttribute('stroke', '#666');
      line.setAttribute('stroke-width', '1');
      g.appendChild(line);

      // Text
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', (x1 + x2) / 2);
      text.setAttribute('y', y1 - offset);
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('fill', '#333');
      text.setAttribute('font-size', '12');
      text.textContent = label;
      g.appendChild(text);

      svg.appendChild(g);
    };

    // Total length dimension
    addDimension(startX, centerY - shankWidth / 2 - 10, startX + totalLength * scale, centerY - shankWidth / 2 - 10, `总长: ${dimensions['总长'] || '50mm'}`);

    // Flute length dimension
    addDimension(startX + (totalLength - fluteLength) * scale, centerY + shankWidth / 2 + 10, startX + totalLength * scale, centerY + shankWidth / 2 + 10, `刃长: ${dimensions['刃长'] || '15mm'}`, -30);

    wrapper.appendChild(svg);

    // Dimensions table
    const table = document.createElement('table');
    table.style.cssText = `
      width: 100%;
      max-width: 400px;
      margin: 16px auto 0;
      border-collapse: collapse;
      font-size: 14px;
    `;

    let tableHtml = '';
    Object.entries(dimensions).forEach(([key, value]) => {
      tableHtml += `
        <tr style="border-bottom: 1px solid var(--border);">
          <td style="padding: 8px; text-align: left; color: var(--text-secondary);">${key}</td>
          <td style="padding: 8px; text-align: right; font-weight: 600;">${value}</td>
        </tr>
      `;
    });

    table.innerHTML = tableHtml;
    wrapper.appendChild(table);

    container.appendChild(wrapper);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new DimensionsDiagram();
});
