// Form Validation
class FormValidation {
  constructor() {
    this.init();
  }

  init() {
    this.attachValidators();
  }

  attachValidators() {
    document.querySelectorAll('form[data-validate]').forEach(form => {
      form.addEventListener('submit', (e) => {
        if (!this.validateForm(form)) {
          e.preventDefault();
        }
      });

      form.querySelectorAll('input, textarea, select').forEach(field => {
        field.addEventListener('blur', () => this.validateField(field));
        field.addEventListener('input', () => this.clearError(field));
      });
    });
  }

  validateForm(form) {
    let isValid = true;
    form.querySelectorAll('input, textarea, select').forEach(field => {
      if (!this.validateField(field)) {
        isValid = false;
      }
    });
    return isValid;
  }

  validateField(field) {
    const value = field.value.trim();
    const rules = this.getRules(field);
    let isValid = true;
    let errorMessage = '';

    if (rules.required && !value) {
      isValid = false;
      errorMessage = '此字段为必填项';
    } else if (rules.email && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        isValid = false;
        errorMessage = '请输入有效的邮箱地址';
      }
    } else if (rules.phone && value) {
      const phoneRegex = /^[\d\s\-+()]{7,20}$/;
      if (!phoneRegex.test(value)) {
        isValid = false;
        errorMessage = '请输入有效的电话号码';
      }
    } else if (rules.minLength && value.length < rules.minLength) {
      isValid = false;
      errorMessage = `最少需要 ${rules.minLength} 个字符`;
    } else if (rules.maxLength && value.length > rules.maxLength) {
      isValid = false;
      errorMessage = `最多允许 ${rules.maxLength} 个字符`;
    }

    if (!isValid) {
      this.showError(field, errorMessage);
    } else {
      this.clearError(field);
    }

    return isValid;
  }

  getRules(field) {
    return {
      required: field.hasAttribute('required'),
      email: field.type === 'email',
      phone: field.dataset.validate === 'phone',
      minLength: parseInt(field.dataset.minLength) || null,
      maxLength: parseInt(field.dataset.maxLength) || null
    };
  }

  showError(field, message) {
    this.clearError(field);
    
    field.style.borderColor = '#ff3b30';
    
    const error = document.createElement('span');
    error.className = 'field-error';
    error.textContent = message;
    error.style.cssText = `
      color: #ff3b30;
      font-size: 12px;
      margin-top: 4px;
      display: block;
    `;
    
    field.parentNode.appendChild(error);
  }

  clearError(field) {
    field.style.borderColor = '';
    const error = field.parentNode.querySelector('.field-error');
    if (error) {
      error.remove();
    }
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new FormValidation();
});
