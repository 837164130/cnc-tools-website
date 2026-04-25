// Advanced Product Filter
class AdvancedProductFilter {
  constructor() {
    this.init();
  }

  init() {
    this.displayAdvancedFilter();
  }

  displayAdvancedFilter() {
    const container = document.querySelector('[data-advanced-filter]');
    if (!container) return;

    const config = JSON.parse(container.dataset.advancedFilter || '{}');

    container.innerHTML = `
      <div style="
        padding: 24px;
        background: var(--bg-secondary);
        border-radius: 12px;
      ">
        <h3 style="margin-bottom: 16px;">${config.title || '高级筛选'}</h3>
        
        <div class="filter-groups" style="display: grid; gap: 20px; margin-bottom: 24px;">
          ${(config.filters || []).map((filter, i) => `
            <div>
              <label style="display: block; margin-bottom: 8px; font-weight: 600; font-size: 14px;">${filter.name}</label>
              <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                ${(filter.options || []).map((opt, j) => `
                  <button class="filter-option" data-group="${i}" data-value="${opt.value}" style="
                    padding: 6px 14px;
                    background: var(--bg-tertiary);
                    border: 1px solid var(--border);
                    border-radius: 20px;
                    cursor: pointer;
                    font-size: 13px;
                    transition: all 0.2s;
                  ">${opt.label}</button>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>
        
        <div style="display: flex; gap: 12px;">
          <button class="apply-filter" style="
            padding: 10px 24px;
            background: #0071e3;
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 600;
          ">应用筛选</button>
          <button class="reset-filter" style="
            padding: 10px 24px;
            background: var(--bg-tertiary);
            color: var(--text-primary);
            border: 1px solid var(--border);
            border-radius: 8px;
            cursor: pointer;
            font-size: 14px;
          ">重置</button>
        </div>
        
        <div class="filter-results" style="margin-top: 24px; display: none;">
          <div style="font-size: 14px; color: var(--text-secondary); margin-bottom: 12px;">
            找到 <span class="result-count" style="font-weight: 600; color: #0071e3;">0</span> 个产品
          </div>
          <div class="result-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px;">
            <!-- Results will be inserted here -->
          </div>
        </div>
      </div>
    `;

    // Filter option selection
    container.querySelectorAll('.filter-option').forEach(btn => {
      btn.addEventListener('click', function() {
        const group = this.dataset.group;
        const isMulti = config.filters?.[group]?.multi;
        
        if (!isMulti) {
          container.querySelectorAll(`.filter-option[data-group="${group}"]`).forEach(b => {
            b.style.background = 'var(--bg-tertiary)';
            b.style.color = 'var(--text-primary)';
            b.style.borderColor = 'var(--border)';
          });
        }
        
        if (this.style.backgroundColor === 'rgb(0, 113, 227)') {
          this.style.background = 'var(--bg-tertiary)';
          this.style.color = 'var(--text-primary)';
          this.style.borderColor = 'var(--border)';
        } else {
          this.style.background = '#0071e3';
          this.style.color = 'white';
          this.style.borderColor = '#0071e3';
        }
      });
    });

    // Apply filter
    const applyBtn = container.querySelector('.apply-filter');
    const resultsDiv = container.querySelector('.filter-results');
    const resultCount = container.querySelector('.result-count');
    const resultGrid = container.querySelector('.result-grid');

    if (applyBtn) {
      applyBtn.addEventListener('click', () => {
        const selectedFilters = {};
        container.querySelectorAll('.filter-option').forEach(btn => {
          if (btn.style.backgroundColor === 'rgb(0, 113, 227)') {
            const group = btn.dataset.group;
            if (!selectedFilters[group]) selectedFilters[group] = [];
            selectedFilters[group].push(btn.dataset.value);
          }
        });

        // Simulate filtering
        const mockResults = this.generateMockResults();
        
        resultCount.textContent = mockResults.length;
        resultGrid.innerHTML = mockResults.map(product => `
          <div style="
            padding: 16px;
            background: var(--bg-tertiary);
            border-radius: 12px;
            text-align: center;
            transition: transform 0.2s;
          " onmouseenter="this.style.transform='translateY(-4px)'" onmouseleave="this.style.transform=''">
            <div style="font-size: 40px; margin-bottom: 8px;">${product.icon || '📦'}</div>
            <div style="font-weight: 600; margin-bottom: 4px;">${product.name}</div>
            <div style="font-size: 14px; color: #0071e3; font-weight: 600;">${product.price}</div>
          </div>
        `).join('');

        resultsDiv.style.display = 'block';
      });
    }

    // Reset filter
    const resetBtn = container.querySelector('.reset-filter');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        container.querySelectorAll('.filter-option').forEach(btn => {
          btn.style.background = 'var(--bg-tertiary)';
          btn.style.color = 'var(--text-primary)';
          btn.style.borderColor = 'var(--border)';
        });
        resultsDiv.style.display = 'none';
      });
    }
  }

  generateMockResults() {
    return [
      { name: '硬质合金立铣刀', price: '¥128', icon: '🔧' },
      { name: '高速钢钻头', price: '¥89', icon: '🔩' },
      { name: '陶瓷刀片', price: '¥256', icon: '⚙️' },
      { name: 'BT40刀柄', price: '¥450', icon: '🔨' }
    ];
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new AdvancedProductFilter();
});
