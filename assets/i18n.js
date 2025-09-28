/* /assets/i18n.js  —— SAFE & COMPLETE CORE DICTIONARY
   - Includes essential keys for Home + Nav (en/zh/es/fr)
   - Never blanks text: only updates when translation exists
   - Keeps ?lang= in URL and syncs #langSelect value
*/
(() => {
  const DICT = {
    en: {
      // nav
      'nav.home': 'Home',
      'nav.calculator': 'Calculator',
      'nav.transition7': '7-Day Switch',
      'nav.feedback': 'Feedback',

      // home hero
      'home.hero.title': 'Turn pet food labels into simple, actionable feeding.',
      'home.hero.subtitle': 'Informational only. Not medical advice.',

      // home CTA
      'home.cta.open_calculator': 'Open Calculator',
      'home.cta.view_transition_card': 'View 7-Day Card',
      'home.cta.feedback': 'Feedback',

      // home cards
      'home.card.calculator.title': 'Calculator',
      'home.card.calculator.desc': 'RER = 70 × weight^0.75; MER = RER × activity.',
      'home.card.transition.title': '7-Day Transition Card',
      'home.card.transition.desc': '90/10 → 0/100',
      'home.card.feedback.title': 'Feedback',
      'home.card.feedback.desc': 'Anonymous analytics to improve features.',
    },
    zh: {
      'nav.home': '首页',
      'nav.calculator': '喂食计算器',
      'nav.transition7': '7天换粮',
      'nav.feedback': '反馈',

      'home.hero.title': '把宠物粮食标签变成简单、可执行的喂食建议。',
      'home.hero.subtitle': '仅供信息参考，并非医疗建议。',

      'home.cta.open_calculator': '打开计算器',
      'home.cta.view_transition_card': '查看 7 天卡片',
      'home.cta.feedback': '反馈',

      'home.card.calculator.title': '计算器',
      'home.card.calculator.desc': 'RER = 70 × 体重^0.75；MER = RER × 活动因子。',
      'home.card.transition.title': '7天换粮卡',
      'home.card.transition.desc': '90/10 → 0/100',
      'home.card.feedback.title': '反馈',
      'home.card.feedback.desc': '使用匿名统计以改进功能。',
    },
    es: {
      'nav.home': 'Inicio',
      'nav.calculator': 'Calculadora',
      'nav.transition7': 'Cambio 7 días',
      'nav.feedback': 'Comentarios',

      'home.hero.title': 'Convierte etiquetas de comida en una guía de alimentación simple y accionable.',
      'home.hero.subtitle': 'Solo informativo. No es un consejo médico.',

      'home.cta.open_calculator': 'Abrir calculadora',
      'home.cta.view_transition_card': 'Ver tarjeta de 7 días',
      'home.cta.feedback': 'Comentarios',

      'home.card.calculator.title': 'Calculadora',
      'home.card.calculator.desc': 'RER = 70 × peso^0.75; MER = RER × actividad.',
      'home.card.transition.title': 'Tarjeta de transición de 7 días',
      'home.card.transition.desc': '90/10 → 0/100',
      'home.card.feedback.title': 'Comentarios',
      'home.card.feedback.desc': 'Analítica anónima para mejorar funciones.',
    },
    fr: {
      'nav.home': 'Accueil',
      'nav.calculator': 'Calculatrice',
      'nav.transition7': 'Transition 7 jours',
      'nav.feedback': 'Retour',

      'home.hero.title': 'Transformez les étiquettes en conseils d’alimentation simples et actionnables.',
      'home.hero.subtitle': 'À titre informatif uniquement. Pas un avis médical.',

      'home.cta.open_calculator': 'Ouvrir la calculatrice',
      'home.cta.view_transition_card': 'Voir la carte 7 jours',
      'home.cta.feedback': 'Retour',

      'home.card.calculator.title': 'Calculatrice',
      'home.card.calculator.desc': 'RER = 70 × poids^0,75 ; MER = RER × activité.',
      'home.card.transition.title': 'Carte de transition 7 jours',
      'home.card.transition.desc': '90/10 → 0/100',
      'home.card.feedback.title': 'Retour',
      'home.card.feedback.desc': 'Analytique anonyme pour améliorer les fonctions.',
    },
  };

  const SUPPORTED = ['en', 'zh', 'es', 'fr'];
  const DEFAULT_LANG = 'en';

  function getLang() {
    const url = new URL(location.href);
    const q = url.searchParams.get('lang');
    if (q && SUPPORTED.includes(q)) return q;

    // localStorage fallback
    const mem = localStorage.getItem('lang');
    if (mem && SUPPORTED.includes(mem)) return mem;

    // navigator fallback
    const nav = (navigator.language || 'en').slice(0, 2).toLowerCase();
    return SUPPORTED.includes(nav) ? nav : DEFAULT_LANG;
  }

  function t(key, lang = getLang()) {
    const table = DICT[lang] || {};
    if (Object.prototype.hasOwnProperty.call(table, key)) {
      return table[key];
    }
    // if missing, DO NOT blank existing text
    return null;
  }

  function apply(lang = getLang()) {
    // translate text nodes
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      const val = t(key, lang);
      if (val !== null && val !== undefined) {
        el.textContent = val;
      }
    });
    // translate placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const key = el.getAttribute('data-i18n-placeholder');
      const val = t(key, lang);
      if (val !== null && val !== undefined) {
        el.setAttribute('placeholder', val);
      }
    });

    // sync <select id="langSelect">
    const sel = document.getElementById('langSelect');
    if (sel && sel.value !== lang) sel.value = lang;

    // persist
    try { localStorage.setItem('lang', lang); } catch {}
  }

  function setLang(lang) {
    if (!SUPPORTED.includes(lang)) return;
    const url = new URL(location.href);
    url.searchParams.set('lang', lang);
    history.replaceState({}, '', url); // keep on same page
    apply(lang);
  }

  // expose
  window.I18N = { DICT, SUPPORTED, DEFAULT_LANG, getLang, t, apply, setLang };

  // auto-apply on DOM ready (does nothing harmful if keys missing)
  document.addEventListener('DOMContentLoaded', () => apply(getLang()));
})();
