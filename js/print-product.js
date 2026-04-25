// Print Product
class PrintProduct {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('[data-print-product]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.printProduct(btn.dataset.printProduct);
      });
    });
  }

  printProduct(productId) {
    // Create a print-friendly version
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const product = this.getProductInfo(productId);

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>${product.name} - 产品详情</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 40px; color: #333; }
          h1 { font-size: 24px; margin-bottom: 16px; }
          .product-image { max-width: 300px; margin-bottom: 24px; }
          .specs { width: 100%; border-collapse: collapse; margin: 24px 0; }
          .specs th, .specs td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
          .specs th { background: #f5f5f5; font-weight: 600; }
          .price { font-size: 20px; color: #0071e3; font-weight: 600; margin: 16px 0; }
          .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
          @media print {
            body { margin: 20px; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <h1>${product.name}</h1>
        <div class="product-image">🔧</div>
        <div class="price">${product.price}</div>
        <p>${product.description}</p>
        
        <h2>规格参数</h2>
        <table class="specs">
          ${Object.entries(product.specs).map(([key, value]) => `
            <tr>
              <th>${key}</th>
              <td>${value}</td>
            </tr>
          `).join('')}
        </table>

        <div class="footer">
          <p>打印时间: ${new Date().toLocaleString('zh-CN')}</p>
          <p>来源: ${window.location.origin}</p>
        </div>

        <button class="no-print" onclick="window.print()" style="
          position: fixed;
          bottom: 20px;
          right: 20px;
          padding: 12px 24px;
          background: #0071e3;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 16px;
        ">打印</button>
      </body>
      </html>
    `);

    printWindow.document.close();
  }

  getProductInfo(productId) {
    // In production, this would fetch from an API
    return {
      name: document.querySelector('h1')?.textContent || 'Product',
      price: document.querySelector('.price')?.textContent || '¥0.00',
      description: document.querySelector('[data-product-description]')?.textContent || '',
      specs: {
        '材质': '硬质合金',
        '涂层': 'TiAlN',
        '刃数': '4',
        '柄径': '6mm',
        '刃长': '15mm',
        '总长': '50mm'
      }
    };
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new PrintProduct();
});
