// Product API Documentation
class ProductApiDocs {
  constructor() {
    this.init();
  }

  init() {
    this.displayApiDocs();
  }

  displayApiDocs() {
    const container = document.querySelector('[data-api-docs]');
    if (!container) return;

    const endpoints = JSON.parse(container.dataset.apiDocs || '[]');
    if (endpoints.length === 0) return;

    container.innerHTML = '<h3 style="margin-bottom: 24px;">API 文档</h3>';

    const grid = document.createElement('div');
    grid.style.cssText = 'display: grid; gap: 16px;';

    endpoints.forEach(endpoint => {
      const card = document.createElement('div');
      card.style.cssText = `
        padding: 20px;
        background: var(--bg-secondary);
        border-radius: 12px;
        font-family: monospace;
      `;

      const methodColors = {
        'GET': '#34c759',
        'POST': '#0071e3',
        'PUT': '#ff9500',
        'DELETE': '#ff3b30'
      };

      card.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
          <span style="
            padding: 4px 8px;
            background: ${methodColors[endpoint.method] || '#0071e3'};
            color: white;
            border-radius: 4px;
            font-size: 12px;
            font-weight: 600;
          ">${endpoint.method || 'GET'}</span>
          <code style="font-size: 14px; color: var(--text-primary);">${endpoint.path}</code>
        </div>
        <p style="margin: 0 0 12px; color: var(--text-secondary); font-family: system-ui; font-size: 14px;">${endpoint.description}</p>
        
        ${endpoint.params ? `
          <div style="margin-bottom: 12px;">
            <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 4px; font-family: system-ui;">参数：</div>
            <div style="padding: 12px; background: var(--bg-tertiary); border-radius: 8px;">
              ${endpoint.params.map(param => `
                <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                  <code style="font-size: 12px;">${param.name}</code>
                  <span style="font-size: 12px; color: var(--text-secondary); font-family: system-ui;">${param.type} ${param.required ? '*' : ''}</span>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}
        
        ${endpoint.example ? `
          <div>
            <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 4px; font-family: system-ui;">示例响应：</div>
            <pre style="
              margin: 0;
              padding: 12px;
              background: var(--bg-tertiary);
              border-radius: 8px;
              font-size: 12px;
              overflow-x: auto;
            "><code>${JSON.stringify(endpoint.example, null, 2)}</code></pre>
          </div>
        ` : ''}
      `;

      grid.appendChild(card);
    });

    container.appendChild(grid);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ProductApiDocs();
});
