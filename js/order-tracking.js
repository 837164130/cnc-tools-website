// Product Order Tracking
class OrderTracking {
  constructor() {
    this.init();
  }

  init() {
    this.displayOrderTracking();
  }

  displayOrderTracking() {
    const container = document.querySelector('[data-order-tracking]');
    if (!container) return;

    const config = JSON.parse(container.dataset.orderTracking || '{}');

    container.innerHTML = `
      <div style="
        padding: 24px;
        background: var(--bg-secondary);
        border-radius: 12px;
      ">
        <h3 style="margin-bottom: 16px;">${config.title || '订单跟踪'}</h3>
        <p style="margin-bottom: 24px; color: var(--text-secondary);">${config.description || '输入订单号查询物流状态'}</p>
        
        <div style="display: flex; gap: 12px; margin-bottom: 24px;">
          <input type="text" class="order-input" placeholder="输入订单号" style="
            flex: 1;
            padding: 12px;
            border: 1px solid var(--border);
            border-radius: 8px;
            font-size: 16px;
            background: var(--bg-primary);
            color: var(--text-primary);
          ">
          <button class="track-button" style="
            padding: 12px 24px;
            background: #0071e3;
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 16px;
            font-weight: 600;
          ">查询</button>
        </div>
        
        <div class="tracking-result" style="display: none;">
          <div style="
            padding: 20px;
            background: var(--bg-tertiary);
            border-radius: 12px;
          ">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
              <div>
                <div style="font-size: 14px; color: var(--text-secondary);">订单号</div>
                <div class="order-number" style="font-size: 18px; font-weight: 600;"></div>
              </div>
              <div class="order-status" style="
                padding: 4px 12px;
                background: #34c759;
                color: white;
                border-radius: 12px;
                font-size: 12px;
                font-weight: 600;
              "></div>
            </div>
            
            <div class="tracking-timeline" style="display: grid; gap: 16px;">
              <!-- Timeline items will be inserted here -->
            </div>
          </div>
        </div>
      </div>
    `;

    const trackBtn = container.querySelector('.track-button');
    const orderInput = container.querySelector('.order-input');
    const resultDiv = container.querySelector('.tracking-result');
    const orderNumberEl = container.querySelector('.order-number');
    const orderStatusEl = container.querySelector('.order-status');
    const timelineEl = container.querySelector('.tracking-timeline');

    if (trackBtn) {
      trackBtn.addEventListener('click', () => {
        const orderNumber = orderInput.value.trim();
        if (!orderNumber) {
          if (window.notifications) {
            window.notifications.show('请输入订单号', 'error');
          }
          return;
        }

        // Simulate tracking data
        const trackingData = this.generateTrackingData(orderNumber);
        
        orderNumberEl.textContent = orderNumber;
        orderStatusEl.textContent = trackingData.status;
        orderStatusEl.style.background = trackingData.statusColor;
        
        timelineEl.innerHTML = trackingData.events.map((event, i) => `
          <div style="display: flex; gap: 16px;">
            <div style="display: flex; flex-direction: column; align-items: center;">
              <div style="
                width: 12px;
                height: 12px;
                border-radius: 50%;
                background: ${i === 0 ? '#0071e3' : 'var(--border)'};
                border: 2px solid ${i === 0 ? '#0071e3' : 'var(--border)'};
              "></div>
              ${i < trackingData.events.length - 1 ? '<div style="width: 2px; height: 40px; background: var(--border);"></div>' : ''}
            </div>
            <div style="flex: 1; padding-bottom: 16px;">
              <div style="font-weight: 600; margin-bottom: 4px;">${event.title}</div>
              <div style="font-size: 13px; color: var(--text-secondary); margin-bottom: 4px;">${event.description}</div>
              <div style="font-size: 12px; color: var(--text-secondary);">${event.time}</div>
            </div>
          </div>
        `).join('');

        resultDiv.style.display = 'block';
      });
    }
  }

  generateTrackingData(orderNumber) {
    const statuses = [
      { text: '已发货', color: '#0071e3' },
      { text: '运输中', color: '#ff9500' },
      { text: '已签收', color: '#34c759' },
      { text: '派送中', color: '#5856d6' }
    ];
    
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    
    return {
      status: status.text,
      statusColor: status.color,
      events: [
        {
          title: '订单已创建',
          description: '订单已成功提交，等待处理',
          time: '2026-04-20 10:30'
        },
        {
          title: '订单已确认',
          description: '商家已确认订单，准备发货',
          time: '2026-04-20 14:15'
        },
        {
          title: '商品已出库',
          description: '商品已从仓库发出',
          time: '2026-04-21 09:00'
        },
        {
          title: '运输中',
          description: '包裹正在运往目的地',
          time: '2026-04-21 16:30'
        }
      ]
    };
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new OrderTracking();
});
