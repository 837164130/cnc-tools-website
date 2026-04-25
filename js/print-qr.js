// Print QR Code
class PrintQR {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('[data-print-qr]').forEach(btn => {
      btn.addEventListener('click', () => this.printQR());
    });
  }

  printQR() {
    const qrContainer = document.querySelector('[data-qr]');
    if (!qrContainer) return;

    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>打印二维码</title>
          <style>
            body { display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
            .qr-container { text-align: center; }
            img { max-width: 300px; }
            p { margin-top: 20px; font-size: 14px; color: #666; }
          </style>
        </head>
        <body>
          <div class="qr-container">
            ${qrContainer.innerHTML}
            <p>扫描二维码访问产品页面</p>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new PrintQR();
});
