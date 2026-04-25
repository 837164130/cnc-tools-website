// Pagination
class Pagination {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('[data-pagination]').forEach(container => {
      this.setupPagination(container);
    });
  }

  setupPagination(container) {
    const itemsPerPage = parseInt(container.dataset.pagination) || 10;
    const items = container.querySelectorAll('.pagination-item');
    const totalPages = Math.ceil(items.length / itemsPerPage);
    
    if (totalPages <= 1) return;

    let currentPage = 1;

    // Create pagination controls
    const controls = document.createElement('div');
    controls.className = 'pagination-controls';
    controls.style.cssText = `
      display: flex;
      justify-content: center;
      gap: 8px;
      margin-top: 32px;
    `;

    const updatePagination = () => {
      // Hide all items
      items.forEach((item, index) => {
        item.style.display = (index >= (currentPage - 1) * itemsPerPage && 
                             index < currentPage * itemsPerPage) ? '' : 'none';
      });

      // Update buttons
      controls.innerHTML = '';

      // Previous button
      const prevBtn = document.createElement('button');
      prevBtn.textContent = '←';
      prevBtn.disabled = currentPage === 1;
      prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
          currentPage--;
          updatePagination();
        }
      });
      controls.appendChild(prevBtn);

      // Page buttons
      for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.textContent = i;
        pageBtn.className = i === currentPage ? 'active' : '';
        pageBtn.addEventListener('click', () => {
          currentPage = i;
          updatePagination();
        });
        controls.appendChild(pageBtn);
      }

      // Next button
      const nextBtn = document.createElement('button');
      nextBtn.textContent = '→';
      nextBtn.disabled = currentPage === totalPages;
      nextBtn.addEventListener('click', () => {
        if (currentPage < totalPages) {
          currentPage++;
          updatePagination();
        }
      });
      controls.appendChild(nextBtn);
    };

    container.appendChild(controls);
    updatePagination();
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new Pagination();
});
