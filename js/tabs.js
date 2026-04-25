// Tabs Component
class Tabs {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('.tabs').forEach(tabsContainer => {
      this.setupTabs(tabsContainer);
    });
  }

  setupTabs(container) {
    const tabButtons = container.querySelectorAll('.tab-btn');
    const tabPanels = container.querySelectorAll('.tab-panel');

    tabButtons.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        // Remove active from all
        tabButtons.forEach(b => b.classList.remove('active'));
        tabPanels.forEach(p => p.classList.remove('active'));

        // Add active to current
        btn.classList.add('active');
        if (tabPanels[index]) {
          tabPanels[index].classList.add('active');
        }
      });
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new Tabs();
});
