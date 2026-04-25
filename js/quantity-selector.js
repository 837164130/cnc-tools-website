// Quantity Selector
class QuantitySelector {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('[data-quantity]').forEach(container => {
      this.setupSelector(container);
    });
  }

  setupSelector(container) {
    const min = parseInt(container.dataset.min) || 1;
    const max = parseInt(container.dataset.max) || 999;
    const step = parseInt(container.dataset.step) || 1;

    container.innerHTML = `
      <div style="display: inline-flex; align-items: center; border: 2px solid var(--border); border-radius: 8px; overflow: hidden;">
        <button class="qty-decrease" style="width: 40px; height: 40px; background: var(--bg-secondary); border: none; cursor: pointer; font-size: 18px; display: flex; align-items: center; justify-content: center; transition: background 0.2s;">−</button>
        <input type="number" class="qty-input" value="${min}" min="${min}" max="${max}" step="${step}" style="width: 60px; height: 40px; border: none; text-align: center; font-size: 16px; font-weight: 600; -moz-appearance: textfield;" onwheel="return false;">
        <button class="qty-increase" style="width: 40px; height: 40px; background: var(--bg-secondary); border: none; cursor: pointer; font-size: 18px; display: flex; align-items: center; justify-content: center; transition: background 0.2s;">+</button>
      </div>
    `;

    const input = container.querySelector('.qty-input');
    const decreaseBtn = container.querySelector('.qty-decrease');
    const increaseBtn = container.querySelector('.qty-increase');

    const updateValue = (delta) => {
      let value = parseInt(input.value) || min;
      value += delta;
      value = Math.max(min, Math.min(max, value));
      input.value = value;
      input.dispatchEvent(new Event('change'));
    };

    decreaseBtn.addEventListener('click', () => updateValue(-step));
    increaseBtn.addEventListener('click', () => updateValue(step));

    input.addEventListener('change', () => {
      let value = parseInt(input.value) || min;
      value = Math.max(min, Math.min(max, value));
      input.value = value;
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        updateValue(step);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        updateValue(-step);
      }
    });

    // Hover effects
    decreaseBtn.addEventListener('mouseenter', () => {
      decreaseBtn.style.background = 'var(--bg-tertiary)';
    });
    decreaseBtn.addEventListener('mouseleave', () => {
      decreaseBtn.style.background = 'var(--bg-secondary)';
    });
    increaseBtn.addEventListener('mouseenter', () => {
      increaseBtn.style.background = 'var(--bg-tertiary)';
    });
    increaseBtn.addEventListener('mouseleave', () => {
      increaseBtn.style.background = 'var(--bg-secondary)';
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new QuantitySelector();
});
