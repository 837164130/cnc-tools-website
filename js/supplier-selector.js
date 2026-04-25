// Product Supplier Selector
class SupplierSelector {
  constructor() {
    this.init();
  }

  init() {
    this.displaySupplierSelector();
  }

  displaySupplierSelector() {
    const container = document.querySelector('[data-supplier-selector]');
    if (!container) return;

    const config = JSON.parse(container.dataset.supplierSelector || '{}');

    container.innerHTML = `
      <div style="
        padding: 24px;
        background: var(--bg-secondary);
        border-radius: 12px;
      ">
        <h3 style="margin-bottom: 16px;">${config.title || '供应商选择'}</h3>
        <p style="margin-bottom: 24px; color: var(--text-secondary);">${config.description || '选择可靠的供应商'}</p>
        
        <div class="supplier-options" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 12px; margin-bottom: 24px;">
          ${(config.suppliers || []).map((supplier, i) => `
            <div class="supplier-option" data-supplier="${supplier.value}" style="
              padding: 20px;
              background: ${i === 0 ? '#0071e310' : 'var(--bg-tertiary)'};
              border: 2px solid ${i === 0 ? '#0071e3' : 'transparent'};
              border-radius: 12px;
              cursor: pointer;
              transition: all 0.2s;
            ">
              <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                <div style="
                  width: 48px;
                  height: 48px;
                  background: white;
                  border-radius: 8px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-size: 20px;
                  font-weight: 700;
                  color: #0071e3;
                ">${supplier.logo || supplier.name.charAt(0)}</div>
                <div>
                  <div style="font-weight: 600;">${supplier.name}</div>
                  <div style="font-size: 12px; color: var(--text-secondary);">${supplier.location || ''}</div>
                </div>
              </div>
              
              ${supplier.rating ? `
                <div style="display: flex; align-items: center; gap: 4px; margin-bottom: 8px;">
                  <span style="color: #ff9500;">${'★'.repeat(Math.floor(supplier.rating))}</span>
                  <span style="font-size: 12px; color: var(--text-secondary);">${supplier.rating} / 5</span>
                </div>
              ` : ''}
              
              ${supplier.tags ? `
                <div style="display: flex; gap: 4px; flex-wrap: wrap;">
                  ${supplier.tags.map(tag => `
                    <span style="
                      padding: 2px 8px;
                      background: var(--bg-secondary);
                      border-radius: 4px;
                      font-size: 11px;
                      color: var(--text-secondary);
                    ">${tag}</span>
                  `).join('')}
                </div>
              ` : ''}
            </div>
          `).join('')}
        </div>
        
        <div class="supplier-details" style="
          padding: 20px;
          background: var(--bg-tertiary);
          border-radius: 12px;
          display: none;
        ">
          <div style="font-size: 14px; color: var(--text-secondary); margin-bottom: 8px;">供应商详情</div>
          <div class="supplier-info" style="font-size: 16px;"></div>
        </div>
      </div>
    `;

    // Supplier selection
    container.querySelectorAll('.supplier-option').forEach(option => {
      option.addEventListener('click', function() {
        // Reset all options
        container.querySelectorAll('.supplier-option').forEach(o => {
          o.style.background = 'var(--bg-tertiary)';
          o.style.borderColor = 'transparent';
        });

        // Select this option
        this.style.background = '#0071e310';
        this.style.borderColor = '#0071e3';

        // Show supplier details
        const details = container.querySelector('.supplier-details');
        const info = container.querySelector('.supplier-info');
        
        const supplierValue = this.dataset.supplier;
        const supplierData = config.suppliers?.find(s => s.value === supplierValue);
        
        if (details && info && supplierData) {
          details.style.display = 'block';
          info.innerHTML = `
            <strong style="font-size: 18px; display: block; margin-bottom: 12px;">${supplierData.name}</strong>
            ${supplierData.description ? `<div style="margin-bottom: 12px; line-height: 1.6;">${supplierData.description}</div>` : ''}
            ${supplierData.address ? `<div style="margin-bottom: 8px;">📍 ${supplierData.address}</div>` : ''}
            ${supplierData.phone ? `<div style="margin-bottom: 8px;">📞 ${supplierData.phone}</div>` : ''}
            ${supplierData.email ? `<div style="margin-bottom: 8px;">✉️ ${supplierData.email}</div>` : ''}
            ${supplierData.leadTime ? `<div style="margin-bottom: 8px;">⏱️ 交货期: ${supplierData.leadTime}</div>` : ''}
            ${supplierData.moq ? `<div style="margin-bottom: 8px;">📦 最小订单: ${supplierData.moq}</div>` : ''}
          `;
        }

        // Dispatch custom event
        container.dispatchEvent(new CustomEvent('supplierChange', {
          detail: { supplier: supplierValue }
        }));
      });

      option.addEventListener('mouseenter', function() {
        if (this.style.borderColor !== 'rgb(0, 113, 227)') {
          this.style.transform = 'translateY(-2px)';
          this.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
        }
      });

      option.addEventListener('mouseleave', function() {
        this.style.transform = '';
        this.style.boxShadow = '';
      });
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new SupplierSelector();
});
