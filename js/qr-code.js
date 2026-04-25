// QR Code Generator for Product Pages
class QRCodeGenerator {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('[data-qr]').forEach(el => {
      this.generateQR(el);
    });
  }

  generateQR(element) {
    const url = element.dataset.qr || window.location.href;
    const size = parseInt(element.dataset.qrSize) || 128;

    // Using QRCode.js API
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(url)}`;

    const img = document.createElement('img');
    img.src = qrUrl;
    img.alt = 'QR Code';
    img.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    `;

    element.appendChild(img);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new QRCodeGenerator();
});
