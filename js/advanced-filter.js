// Advanced Product Filter
class AdvancedFilter {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('[data-advanced-filter]').forEach(container => {
      this.setupFilter(container);
    });
  }

  setupFilter(container) {
    const filters = JSON.parse(container.dataset.advancedFilter || '[]');
    if (filters.length === 0) return;

    container.innerHTML = `
      <div style="background: var(--bg-secondary); border-radius: 16px; padding: 24px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
          <h3 style="margin: 0;">高级筛选</h3>
          <button class="reset-filters" style="padding: 8px 16px; background: transparent; border: 1px solid var(--border); border-radius: 8px; cursor: pointer; font-size: 14px; transition: all 0.2s;">重置筛选</button>
        </div>
        
        <div style="display: flex; flex-direction: column; gap: 20px;">
          ${filters.map(filter => `
            <div class="filter-group">
              <label style="display: block; margin-bottom: 10px; font-weight: 600; font-size: 14px;">${filter.name}</label>
              <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                ${filter.options.map(option => `
                  <button class="filter-option" data-filter="${filter.key}" data-value="${option.value}" style="
                    padding: 8px 16px;
                    background: var(--bg-primary);
                    border: 2px solid var(--border);
                    border-radius: 20px;
                    cursor: pointer;
                    font-size: 13px;
                    transition: all 0.2s;
                  ">${option.label}</button>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>
        
        <div class="filter-results" style="margin-top: 20px; padding-top: 20px; border-top: 1px solid var(--border); display: none;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span class="results-count" style="font-size: 14px; color: var(--text-secondary);"></span>
            <button class="apply-filters" style="padding: 10px 24px; background: var(--accent); color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; transition: opacity 0.2s;">应用筛选</button>
          </div>
        </div>
      </div>
    `;

    const options = container.querySelectorAll('.filter-option');
    const resetBtn = container.querySelector('.reset-filters');
    const applyBtn = container.querySelector('.apply-filters');
    const resultsDiv = container.querySelector('.filter-results');
    const resultsCount = container.querySelector('.results-count');

    let activeFilters = {};

    options.forEach(option => {
      option.addEventListener('click', () => {
        const filterKey = option.dataset.filter;
        const filterValue = option.dataset.value;

        if (option.classList.contains('active')) {
          option.classList.remove('active');
          option.style.background = 'var(--bg-primary)';
          option.style.borderColor = 'var(--border)';
          option.style.color = 'inherit';
          delete activeFilters[filterKey];
        } else {
          // Remove active from other options in same group
          container.querySelectorAll(`[data-filter="${filterKey}"]`).forEach(opt => {
            opt.classList.remove('active');
            opt.style.background = 'var(--bg-primary)';
            opt.style.borderColor = 'var(--border)';
            opt.style.color = 'inherit';
          });

          option.classList.add('active');
          option.style.background = 'var(--accent)';
          option.style.borderColor = 'var(--accent)';
          option.style.color = 'white';
          activeFilters[filterKey] = filterValue;
        }

        this.updateResults();
      });
    });

    resetBtn.addEventListener('click', () => {
      activeFilters = {};
      options.forEach(option => {
        option.classList.remove('active');
        option.style.background = 'var(--bg-primary)';
        option.style.borderColor = 'var(--border)';
        option.style.color = 'inherit';
      });
      resultsDiv.style.display = 'none';
    });

    applyBtn.addEventListener('click', () => {
      const params = new URLSearchParams(activeFilters);
      window.location.href = `search.html?${params.toString()}`;
    });

    const updateResults = () => {
      const count = Object.keys(activeFilters).length;
      if (count > 0) {
        resultsDiv.style.display = 'block';
        resultsCount.textContent = `已选择 ${count} 个筛选条件`;
      } else {
        resultsDiv.style.display = 'none';
      }
    };

    this.updateResults = updateResults;
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new AdvancedFilter();
});
