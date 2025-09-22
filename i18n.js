/* i18n.js · 简易多语言（zh-CN / en）v20250922d */
(function () {
  'use strict';

  const STORE_KEY = 'ps_lang';
  const fallback = 'zh-CN';
  const supported = ['zh-CN', 'en'];

  const dict = {
    'zh-CN': {
      brand: 'Pet Scan',
      nav_feeding: '喂食计算器',
      nav_feedback: '反馈',
      nav_transition: '7天换粮卡',
      hero_title: '把难懂的标签 → 变成可执行建议',
      hero_lead:
        '扫描/录入宠物食品与洗护信息，统一口径（ME、GA、as-fed/DM），秒出喂量/换粮卡；页面显式来源与时间戳。信息性建议，非医疗。',
      card1_title: '① 喂食计算器',
      card1_desc: 'RER/MER → kcal/天 → 杯/克；支持混喂与零食占比提示。',
      card1_btn: '打开计算器',
      card2_title: '② 7 天换粮卡',
      card2_desc: '90/10 → 0/100 的过渡表，自动按能量密度换算。',
      card2_btn: '查看换粮卡',
      card3_title: '③ 意见反馈',
      card3_desc: '帮助我们提高命中率与解释易读性；导购披露保持中立。',
      card3_btn: '去反馈',
      metrics_hint:
        '指标监测：visit_home / visit_feeding_page / visit_feedback_page / feedback_open / calc_click / wash_*。',
      footer_line1:
        '信息性提示：本工具基于公开信息与通用标准（如 AAFCO/NRC）给出参考建议，不构成医疗或诊断意见。涉及疾病/处方需求请咨询持证兽医。',
      footer_line2:
        '数据可能因配方/包装更新而变化；页面已标注来源/时间戳/版本以供核验。',
      footer_line3: '如含推广链接，可能获得佣金（已披露）；这不影响信息的中立性。',
      switch_label: '中/EN',
    },
    en: {
      brand: 'Pet Scan',
      nav_feeding: 'Feeding Calculator',
      nav_feedback: 'Feedback',
      nav_transition: '7-day Transition',
      hero_title: 'Turn confusing labels → actionable advice',
      hero_lead:
        'Scan/input pet food & wash-care info, unify ME/GA/as-fed/DM, get portions & transition card in seconds; sources & timestamps shown. Informational, not medical.',
      card1_title: '① Feeding Calculator',
      card1_desc: 'RER/MER → kcal/day → cups/grams; supports mixed feeding & treats ratio tips.',
      card1_btn: 'Open Calculator',
      card2_title: '② 7-day Transition',
      card2_desc: '90/10 → 0/100 schedule; auto converts by energy density.',
      card2_btn: 'View Transition Card',
      card3_title: '③ Feedback',
      card3_desc: 'Help improve hit rate & explainability; affiliate disclosure remains neutral.',
      card3_btn: 'Give Feedback',
      metrics_hint:
        'Tracked: visit_home / visit_feeding_page / visit_feedback_page / feedback_open / calc_click / wash_*.',
      footer_line1:
        'Notice: This tool provides informational suggestions based on public standards (e.g., AAFCO/NRC) and is not medical advice.',
      footer_line2:
        'Formulas/packaging may change; pages show sources, timestamps and versions.',
      footer_line3: 'Affiliate links may appear (disclosed) without affecting neutrality.',
      switch_label: '中/EN',
    },
  };

  function getLang() {
    const saved = localStorage.getItem(STORE_KEY);
    if (saved && supported.includes(saved)) return saved;
    const nav = (navigator.language || '').toLowerCase();
    if (nav.startsWith('zh')) return 'zh-CN';
    return 'en';
  }

  function t(key) {
    const lang = window.__PS_LANG__ || fallback;
    return (dict[lang] && dict[lang][key]) || (dict[fallback] && dict[fallback][key]) || key;
  }

  function apply() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const attr = el.getAttribute('data-i18n-attr');
      const value = t(key);
      if (attr) el.setAttribute(attr, value);
      else el.textContent = value;
    });
    const btn = document.getElementById('langToggle');
    if (btn) btn.textContent = t('switch_label');
    document.title = 'Pet Scan · ' + (window.__PS_LANG__ === 'en' ? 'Informational advice' : '信息性建议（非医疗）');
  }

  function setLang(lang) {
    if (!supported.includes(lang)) lang = fallback;
    window.__PS_LANG__ = lang;
    localStorage.setItem(STORE_KEY, lang);
    apply();
  }

  // expose
  window.__PS_LANG__ = getLang();
  window.PS_I18N = { setLang, apply, t };

  // init
  document.addEventListener('DOMContentLoaded', apply);
})();
