// Product Configuration Wizard
class ProductWizard {
  constructor() {
    this.init();
  }

  init() {
    this.displayWizard();
  }

  displayWizard() {
    const container = document.querySelector('[data-product-wizard]');
    if (!container) return;

    const config = JSON.parse(container.dataset.productWizard || '{}');

    container.innerHTML = `
      <div style="
        padding: 24px;
        background: var(--bg-secondary);
        border-radius: 12px;
      ">
        <h3 style="margin-bottom: 16px;">${config.title || '产品配置向导'}</h3>
        <p style="margin-bottom: 24px; color: var(--text-secondary);">${config.description || '一步步配置您需要的产品'}</p>
        
        <div class="wizard-progress" style="display: flex; margin-bottom: 24px;">
          ${(config.steps || []).map((step, i) => `
            <div style="flex: 1; display: flex; align-items: center;">
              <div class="wizard-step" data-step="${i}" style="
                width: 32px;
                height: 32px;
                border-radius: 50%;
                background: ${i === 0 ? '#0071e3' : 'var(--bg-tertiary)'};
                color: ${i === 0 ? 'white' : 'var(--text-secondary)'};
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: 600;
                font-size: 14px;
                border: 2px solid ${i === 0 ? '#0071e3' : 'var(--border)'};
              ">${i + 1}</div>
              ${i < (config.steps || []).length - 1 ? `<div class="wizard-connector" data-connector="${i}" style="flex: 1; height: 2px; background: var(--border); margin: 0 8px;"></div>` : ''}
            </div>
          `).join('')}
        </div>
        
        <div class="wizard-content">
          ${(config.steps || []).map((step, i) => `
            <div class="wizard-step-content" data-step="${i}" style="${i > 0 ? 'display: none;' : ''}">
              <div style="font-weight: 600; font-size: 18px; margin-bottom: 16px;">${step.title}</div>
              <div style="color: var(--text-secondary); margin-bottom: 24px;">${step.description}</div>
              
              <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 12px;">
                ${(step.options || []).map((opt, j) => `
                  <div class="wizard-option" data-step="${i}" data-value="${opt.value}" style="
                    padding: 16px;
                    background: var(--bg-tertiary);
                    border: 2px solid transparent;
                    border-radius: 12px;
                    cursor: pointer;
                    text-align: center;
                    transition: all 0.2s;
                  ">
                    <div style="font-size: 32px; margin-bottom: 8px;">${opt.icon || '✓'}</div>
                    <div style="font-weight: 600; font-size: 14px;">${opt.label}</div>
                    ${opt.description ? `<div style="font-size: 12px; color: var(--text-secondary); margin-top: 4px;">${opt.description}</div>` : ''}
                  </div>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>
        
        <div class="wizard-summary" style="display: none; margin-top: 24px;">
          <div style="
            padding: 20px;
            background: linear-gradient(135deg, #0071e3 0%, #5856d6 100%);
            border-radius: 12px;
            color: white;
          ">
            <div style="font-size: 18px; font-weight: 600; margin-bottom: 12px;">配置完成！</div>
            <div class="summary-content" style="margin-bottom: 16px;"></div>
            <button class="wizard-restart" style="
              padding: 10px 24px;
              background: white;
              color: #0071e3;
              border: none;
              border-radius: 8px;
              cursor: pointer;
              font-weight: 600;
            ">重新配置</button>
          </div>
        </div>
      </div>
    `;

    let currentStep = 0;
    const selections = {};
    const totalSteps = (config.steps || []).length;

    // Option selection
    container.querySelectorAll('.wizard-option').forEach(option => {
      option.addEventListener('click', function() {
        const step = parseInt(this.dataset.step);
        selections[step] = this.dataset.value;

        // Highlight selected
        container.querySelectorAll(`.wizard-option[data-step="${step}"]`).forEach(o => {
          o.style.background = 'var(--bg-tertiary)';
          o.style.borderColor = 'transparent';
        });
        this.style.background = '#0071e310';
        this.style.borderColor = '#0071e3';

        // Move to next step after delay
        setTimeout(() => {
          if (step < totalSteps - 1) {
            this.nextStep(step);
          } else {
            this.showSummary(selections, config);
          }
        }, 400);
      });
    });

    // Restart button
    const restartBtn = container.querySelector('.wizard-restart');
    if (restartBtn) {
      restartBtn.addEventListener('click', () => {
        currentStep = 0;
        Object.keys(selections).forEach(key => delete selections[key]);
        
        container.querySelectorAll('.wizard-step-content').forEach((content, i) => {
          content.style.display = i === 0 ? 'block' : 'none';
        });
        
        container.querySelectorAll('.wizard-step').forEach((step, i) => {
          step.style.background = i === 0 ? '#0071e3' : 'var(--bg-tertiary)';
          step.style.color = i === 0 ? 'white' : 'var(--text-secondary)';
          step.style.borderColor = i === 0 ? '#0071e3' : 'var(--border)';
        });
        
        container.querySelectorAll('.wizard-connector').forEach(conn => {
          conn.style.background = 'var(--border)';
        });
        
        container.querySelectorAll('.wizard-option').forEach(opt => {
          opt.style.background = 'var(--bg-tertiary)';
          opt.style.borderColor = 'transparent';
        });
        
        container.querySelector('.wizard-summary').style.display = 'none';
      });
    }
  }

  nextStep(currentStep) {
    const container = document.querySelector('[data-product-wizard]');
    
    // Hide current step
    container.querySelector(`.wizard-step-content[data-step="${currentStep}"]`).style.display = 'none';
    
    // Show next step
    container.querySelector(`.wizard-step-content[data-step="${currentStep + 1}"]`).style.display = 'block';
    
    // Update progress
    const nextStepEl = container.querySelector(`.wizard-step[data-step="${currentStep + 1}"]`);
    if (nextStepEl) {
      nextStepEl.style.background = '#0071e3';
      nextStepEl.style.color = 'white';
      nextStepEl.style.borderColor = '#0071e3';
    }
    
    const connector = container.querySelector(`.wizard-connector[data-connector="${currentStep}"]`);
    if (connector) {
      connector.style.background = '#0071e3';
    }
  }

  showSummary(selections, config) {
    const container = document.querySelector('[data-product-wizard]');
    const summaryDiv = container.querySelector('.wizard-summary');
    const summaryContent = container.querySelector('.summary-content');
    
    let summaryHTML = '<div style="display: grid; gap: 8px;">';
    
    Object.entries(selections).forEach(([step, value]) => {
      const stepConfig = config.steps[parseInt(step)];
      const option = stepConfig.options.find(o => o.value === value);
      summaryHTML += `
        <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.2);">
          <span style="opacity: 0.8;">${stepConfig.title}</span>
          <span style="font-weight: 600;">${option?.label || value}</span>
        </div>
      `;
    });
    
    summaryHTML += '</div>';
    summaryContent.innerHTML = summaryHTML;
    
    // Hide all step contents
    container.querySelectorAll('.wizard-step-content').forEach(content => {
      content.style.display = 'none';
    });
    
    summaryDiv.style.display = 'block';
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ProductWizard();
});
