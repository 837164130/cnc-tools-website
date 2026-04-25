// Warehouse & Logistics
class WarehouseLogistics {
  constructor() {
    this.init();
  }

  init() {
    this.displayLogistics();
  }

  displayLogistics() {
    const container = document.querySelector('[data-logistics]');
    if (!container) return;

    container.innerHTML = `
      <div style="
        padding: 24px;
        background: var(--bg-secondary);
        border-radius: 12px;
      ">
        <h3 style="margin-bottom: 16px;">仓储物流</h3>
        
        <div style="display: grid; gap: 16px;">
          <div style="display: flex; align-items: center; gap: 16px;">
            <div style="font-size: 32px;">🏭</div>
            <div>
              <div style="font-weight: 600;">智能仓储</div>
              <div style="color: var(--text-secondary); font-size: 14px;">10000平方米现代化仓库，智能分拣系统</div>
            </div>
          </div>
          
          <div style="display: flex; align-items: center; gap: 16px;">
            <div style="font-size: 32px;">📦</div>
            <div>
              <div style="font-weight: 600;">库存管理</div>
              <div style="color: var(--text-secondary); font-size: 14px;">ERP系统实时管理，常备库存5000+SKU</div>
            </div>
          </div>
          
          <div style="display: flex; align-items: center; gap: 16px;">
            <div style="font-size: 32px;">🚚</div>
            <div>
              <div style="font-weight: 600;">物流配送</div>
              <div style="color: var(--text-secondary); font-size: 14px;">与顺丰、京东物流合作，全国48小时达</div>
            </div>
          </div>
          
          <div style="display: flex; align-items: center; gap: 16px;">
            <div style="font-size: 32px;">🌐</div>
            <div>
              <div style="font-weight: 600;">国际物流</div>
              <div style="color: var(--text-secondary); font-size: 14px;">支持海运、空运，覆盖全球30+国家</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new WarehouseLogistics();
});
