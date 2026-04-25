// Minimum Order Quantity Display
class MOQDisplay {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('[data-moq]').forEach(el => {
      this.displayMOQ(el);
    });
  }

  displayMOQ(element) {
    const moq = parseInt(element.dataset.moq) || 1;
    const unit = element.dataset.unit || '件';
    const priceBreaks = JSON.parse(element.dataset.priceBreaks || '[]');

    let html = `
      <div style="background: var(--bg-secondary); border-radius: 12px; padding: 20px;">
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
          <div style="width: 40px; height: 40px; background: var(--accent); border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 20px;">
            📊
          </div>
          <div>
            <div style="font-weight: 600;">最小起订量</div>
            <div style="font-size: 24px; font-weight: 700; color: var(--accent);">${moq}${unit}</div>
          </div>
        </div>
    `;

    if (priceBreaks.length > 0) {
      html += `
        <div style="border-top: 1px solid var(--border); padding-top: 16px;">
          <div style="font-size: 14px; font-weight: 600; margin-bottom: 12px;">量价优惠</div>
          <div style="display: flex; flex-direction: column; gap: 8px;">
      `;

      priceBreaks.forEach((breakItem, index) => {
        const isBest = index === priceBreaks.length - 1;
        html += `
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 12px; background: ${isBest ? 'rgba(0, 113, 227, 0.1)' : 'var(--bg-primary)'}; border-radius: 8px; border: ${isBest ? '1px solid var(--accent)' : '1px solid transparent'};">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-size: 14px;">${breakItem.quantity}${unit}以上</span>
              ${isBest ? '<span style="padding: 2px 8px; background: var(--accent); color: white; border-radius: 10px; font-size: 11px;">最优</span>' : ''}
            </div>
            <div style="font-weight: 700; color: ${isBest ? 'var(--accent)' : 'inherit'};">¥${breakItem.price}/${unit}</div>
          </div>
        `;
      });

      html += `
          </div>
        </div>
      `;
    }

    html += `</div>`;
    element.innerHTML = html;
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new MOQDisplay();
});
