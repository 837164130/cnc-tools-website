// Language Switcher
class LanguageSwitcher {
  constructor() {
    this.currentLang = localStorage.getItem('cccnc-lang') || 'zh';
    this.translations = {};
    this.init();
  }

  async init() {
    await this.loadTranslations();
    this.applyLanguage(this.currentLang);
    this.attachEventListeners();
  }

  async loadTranslations() {
    // Basic translations
    this.translations = {
      zh: {
        'nav.home': '首页',
        'nav.endmills': '铣刀',
        'nav.drills': '钻头',
        'nav.taps': '丝锥',
        'nav.reamers': '铰刀',
        'nav.inserts': '刀片',
        'nav.toolholders': '刀柄',
        'nav.collets': '卡簧',
        'nav.arbors': '刀盘',
        'nav.search': '搜索',
        'nav.compare': '对比',
        'nav.calculator': '计算器',
        'nav.about': '关于',
        'nav.contact': '联系',
        'footer.products': '产品系列',
        'footer.support': '技术支持',
        'footer.about': '关于我们',
        'common.details': '了解详情',
        'common.inquiry': '立即询价',
        'common.specs': '技术参数',
        'common.drawing': '图纸',
        'common.price': '价格'
      },
      ru: {
        'nav.home': 'Главная',
        'nav.endmills': 'Фрезы',
        'nav.drills': 'Сверла',
        'nav.taps': 'Метчики',
        'nav.reamers': 'Развертки',
        'nav.inserts': 'Пластины',
        'nav.toolholders': 'Патроны',
        'nav.collets': 'Цанги',
        'nav.arbors': 'Оправки',
        'nav.search': 'Поиск',
        'nav.compare': 'Сравнить',
        'nav.calculator': 'Калькулятор',
        'nav.about': 'О нас',
        'nav.contact': 'Контакты',
        'footer.products': 'Продукция',
        'footer.support': 'Поддержка',
        'footer.about': 'О компании',
        'common.details': 'Подробнее',
        'common.inquiry': 'Запрос цены',
        'common.specs': 'Характеристики',
        'common.drawing': 'Чертеж',
        'common.price': 'Цена'
      },
      en: {
        'nav.home': 'Home',
        'nav.endmills': 'End Mills',
        'nav.drills': 'Drills',
        'nav.taps': 'Taps',
        'nav.reamers': 'Reamers',
        'nav.inserts': 'Inserts',
        'nav.toolholders': 'Tool Holders',
        'nav.collets': 'Collets',
        'nav.arbors': 'Arbors',
        'nav.search': 'Search',
        'nav.compare': 'Compare',
        'nav.calculator': 'Calculator',
        'nav.about': 'About',
        'nav.contact': 'Contact',
        'footer.products': 'Products',
        'footer.support': 'Support',
        'footer.about': 'About Us',
        'common.details': 'Details',
        'common.inquiry': 'Get Quote',
        'common.specs': 'Specifications',
        'common.drawing': 'Drawing',
        'common.price': 'Price'
      }
    };
  }

  applyLanguage(lang) {
    this.currentLang = lang;
    localStorage.setItem('cccnc-lang', lang);

    const translations = this.translations[lang];
    if (!translations) return;

    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (translations[key]) {
        el.textContent = translations[key];
      }
    });

    // Update HTML lang attribute
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : lang === 'ru' ? 'ru-RU' : 'en';

    // Update active state on language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
  }

  attachEventListeners() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.applyLanguage(btn.dataset.lang);
      });
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.languageSwitcher = new LanguageSwitcher();
});
