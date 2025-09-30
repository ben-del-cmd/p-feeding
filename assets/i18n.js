<script>
// /assets/i18n.js — SAFE & COMPLETE i18n (en/zh/es/fr)
// - 提供：window.I18N = { DICT, SUPPORTED, DEFAULT_LANG, getLang, t, apply, setLang }
// - 自动在 DOMContentLoaded 时翻译 data-i18n / data-i18n-placeholder
(() => {
  "use strict";

  const DICT = {
    en: {
      // nav
      "nav.home": "Home",
      "nav.calculator": "Calculator",
      "nav.transition7": "7-Day Switch",
      "nav.feedback": "Feedback",

      // common
      "common.back_home": "Back to Home",
      "legal.info_boundary": "Informational only. Not medical advice.",

      // home
      "home.hero.title": "Turn pet food labels into simple, actionable feeding.",
      "home.hero.subtitle": "Informational only. Not medical advice.",
      "home.cta.open_calculator": "Open Calculator",
      "home.cta.view_transition_card": "View 7-Day Card",
      "home.cta.feedback": "Feedback",

      // home cards
      "home.card.calculator.title": "Calculator",
      "home.card.calculator.desc": "RER = 70 × weight^0.75; MER = RER × activity.",
      "home.card.transition.title": "7-Day Transition Card",
      "home.card.transition.desc": "90/10 → 0/100",
      "home.card.feedback.title": "Feedback",
      "home.card.feedback.desc": "Anonymous analytics to improve features.",

      // calculator
      "calculator.title": "Feeding Calculator",
      "feeding.pet_type.label": "Pet",
      "feeding.pet_type.dog": "Dog",
      "feeding.pet_type.cat": "Cat",
      "feeding.weight.label": "Weight",
      "feeding.weight.placeholder": "Enter weight",
      "feeding.unit.label": "Unit",
      "feeding.unit.kg": "kg",
      "feeding.unit.lb": "lb",
      "feeding.activity.label": "Activity",
      "feeding.activity.resting": "Resting",
      "feeding.activity.normal": "Normal",
      "feeding.activity.active": "Active",
      "feeding.kcal_per_cup.label": "kcal per cup",
      "feeding.grams_per_cup.label": "grams per cup",
      "feeding.calculate": "Calculate",
      "result.title": "Result",

      // transition 7
      "transition.title": "7-Day Transition Card",
      "transition.day1": "Day 1",
      "transition.day2": "Day 2",
      "transition.day3": "Day 3",
      "transition.day4": "Day 4",
      "transition.day5": "Day 5",
      "transition.day6": "Day 6",
      "transition.day7": "Day 7",

      // feedback
      "feedback.title": "Feedback",
      "feedback.body":
        "We use anonymous analytics to improve features. Informational only. Not medical advice.",
      "feedback.email": "Send Email",
      "feedback.back": "Back to Home"
    },

    zh: {
      // nav
      "nav.home": "首页",
      "nav.calculator": "喂食计算器",
      "nav.transition7": "7天换粮",
      "nav.feedback": "反馈",

      // common
      "common.back_home": "返回首页",
      "legal.info_boundary": "仅供信息参考；不构成医疗建议。",

      // home
      "home.hero.title": "把宠物粮食标签变成简单、可执行的喂食建议。",
      "home.hero.subtitle": "仅供信息参考，并非医疗建议。",
      "home.cta.open_calculator": "打开计算器",
      "home.cta.view_transition_card": "查看 7 天卡片",
      "home.cta.feedback": "反馈",

      // home cards
      "home.card.calculator.title": "计算器",
      "home.card.calculator.desc": "RER = 70 × 体重^0.75；MER = RER × 活动因子。",
      "home.card.transition.title": "7天换粮卡",
      "home.card.transition.desc": "90/10 → 0/100",
      "home.card.feedback.title": "反馈",
      "home.card.feedback.desc": "使用匿名统计以改进功能。",

      // calculator
      "calculator.title": "喂食计算器",
      "feeding.pet_type.label": "宠物",
      "feeding.pet_type.dog": "狗",
      "feeding.pet_type.cat": "猫",
      "feeding.weight.label": "体重",
      "feeding.weight.placeholder": "输入体重",
      "feeding.unit.label": "单位",
      "feeding.unit.kg": "千克",
      "feeding.unit.lb": "磅",
      "feeding.activity.label": "活动水平",
      "feeding.activity.resting": "静息",
      "feeding.activity.normal": "日常",
      "feeding.activity.active": "活跃",
      "feeding.kcal_per_cup.label": "每杯千卡",
      "feeding.grams_per_cup.label": "每杯克数",
      "feeding.calculate": "计算",
      "result.title": "结果",

      // transition 7
      "transition.title": "7天换粮卡",
      "transition.day1": "第1天",
      "transition.day2": "第2天",
      "transition.day3": "第3天",
      "transition.day4": "第4天",
      "transition.day5": "第5天",
      "transition.day6": "第6天",
      "transition.day7": "第7天",

      // feedback
      "feedback.title": "反馈",
      "feedback.body": "我们使用匿名统计改进功能。仅供信息参考，并非医疗建议。",
      "feedback.email": "发送邮件",
      "feedback.back": "返回首页"
    },

    es: {
      // nav
      "nav.home": "Inicio",
      "nav.calculator": "Calculadora",
      "nav.transition7": "Cambio 7 días",
      "nav.feedback": "Comentarios",

      // common
      "common.back_home": "Volver al inicio",
      "legal.info_boundary": "Solo informativo. No es consejo médico.",

      // home
      "home.hero.title":
        "Convierte etiquetas de comida en una guía de alimentación simple y accionable.",
      "home.hero.subtitle": "Solo informativo. No es consejo médico.",
      "home.cta.open_calculator": "Abrir calculadora",
      "home.cta.view_transition_card": "Ver tarjeta de 7 días",
      "home.cta.feedback": "Comentarios",

      // home cards
      "home.card.calculator.title": "Calculadora",
      "home.card.calculator.desc":
        "RER = 70 × peso^0.75; MER = RER × actividad.",
      "home.card.transition.title": "Tarjeta de transición de 7 días",
      "home.card.transition.desc": "90/10 → 0/100",
      "home.card.feedback.title": "Comentarios",
      "home.card.feedback.desc":
        "Analítica anónima para mejorar funciones.",

      // calculator
      "calculator.title": "Calculadora de alimentación",
      "feeding.pet_type.label": "Mascota",
      "feeding.pet_type.dog": "Perro",
      "feeding.pet_type.cat": "Gato",
      "feeding.weight.label": "Peso",
      "feeding.weight.placeholder": "Ingresa peso",
      "feeding.unit.label": "Unidad",
      "feeding.unit.kg": "kg",
      "feeding.unit.lb": "lb",
      "feeding.activity.label": "Actividad",
      "feeding.activity.resting": "Reposo",
      "feeding.activity.normal": "Normal",
      "feeding.activity.active": "Activo",
      "feeding.kcal_per_cup.label": "kcal por taza",
      "feeding.grams_per_cup.label": "gramos por taza",
      "feeding.calculate": "Calcular",
      "result.title": "Resultado",

      // transition 7
      "transition.title": "Tarjeta de transición 7 días",
      "transition.day1": "Día 1",
      "transition.day2": "Día 2",
      "transition.day3": "Día 3",
      "transition.day4": "Día 4",
      "transition.day5": "Día 5",
      "transition.day6": "Día 6",
      "transition.day7": "Día 7",

      // feedback
      "feedback.title": "Comentarios",
      "feedback.body":
        "Usamos analítica anónima para mejorar. Solo informativo.",
      "feedback.email": "Enviar email",
      "feedback.back": "Volver al inicio"
    },

    fr: {
      // nav
      "nav.home": "Accueil",
      "nav.calculator": "Calculateur",
      "nav.transition7": "Transition 7 jours",
      "nav.feedback": "Retour",

      // common
      "common.back_home": "Retour accueil",
      "legal.info_boundary": "À titre informatif. Pas un avis médical.",

      // home
      "home.hero.title":
        "Transformez les étiquettes en consignes simples et actionnables.",
      "home.hero.subtitle": "À titre informatif. Pas un avis médical.",
      "home.cta.open_calculator": "Ouvrir le calculateur",
      "home.cta.view_transition_card": "Voir la carte 7 jours",
      "home.cta.feedback": "Retour",

      // home cards
      "home.card.calculator.title": "Calculateur",
      "home.card.calculator.desc":
        "RER = 70 × poids^0,75 ; MER = RER × activité.",
      "home.card.transition.title": "Carte de transition 7 jours",
      "home.card.transition.desc": "90/10 → 0/100",
      "home.card.feedback.title": "Retour",
      "home.card.feedback.desc":
        "Analytique anonyme pour améliorer les fonctions.",

      // calculator
      "calculator.title": "Calculateur d’alimentation",
      "feeding.pet_type.label": "Animal",
      "feeding.pet_type.dog": "Chien",
      "feeding.pet_type.cat": "Chat",
      "feeding.weight.label": "Poids",
      "feeding.weight.placeholder": "Saisir le poids",
      "feeding.unit.label": "Unité",
      "feeding.unit.kg": "kg",
      "feeding.unit.lb": "lb",
      "feeding.activity.label": "Activité",
      "feeding.activity.resting": "Repos",
      "feeding.activity.normal": "Normal",
      "feeding.activity.active": "Actif",
      "feeding.kcal_per_cup.label": "kcal par tasse",
      "feeding.grams_per_cup.label": "grammes par tasse",
      "feeding.calculate": "Calculer",
      "result.title": "Résultat",

      // transition 7
      "transition.title": "Carte de transition 7 jours",
      "transition.day1": "Jour 1",
      "transition.day2": "Jour 2",
      "transition.day3": "Jour 3",
      "transition.day4": "Jour 4",
      "transition.day5": "Jour 5",
      "transition.day6": "Jour 6",
      "transition.day7": "Jour 7",

      // feedback
      "feedback.title": "Retour",
      "feedback.body":
        "Nous utilisons des statistiques anonymes pour améliorer. Informations uniquement.",
      "feedback.email": "Envoyer un email",
      "feedback.back": "Retour accueil"
    }
  };

  const SUPPORTED = ["en", "zh", "es", "fr"];
  const DEFAULT_LANG = "en";

  function getLang() {
    const url = new URL(location.href);
    const q = url.searchParams.get("lang");
    if (q && SUPPORTED.includes(q)) return q;

    const mem = localStorage.getItem("lang");
    if (mem && SUPPORTED.includes(mem)) return mem;

    const nav = (navigator.language || "en").slice(0, 2).toLowerCase();
    return SUPPORTED.includes(nav) ? nav : DEFAULT_LANG;
  }

  function t(key, lang = getLang()) {
    const table = DICT[lang] || {};
    if (Object.prototype.hasOwnProperty.call(table, key)) return table[key];
    return null; // 不覆盖已有文本
  }

  function apply(lang = getLang()) {
    // textContent
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const val = t(key, lang);
      if (val != null) el.textContent = val;
    });
    // placeholder
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      const val = t(key, lang);
      if (val != null) el.setAttribute("placeholder", val);
    });
    // 同步下拉（如果存在）
    const sel = document.getElementById("langSelect");
    if (sel && sel.value !== lang) sel.value = lang;

    try { localStorage.setItem("lang", lang); } catch {}
  }

  function setLang(lang) {
    if (!SUPPORTED.includes(lang)) return;
    const url = new URL(location.href);
    url.searchParams.set("lang", lang);
    history.replaceState({}, "", url);
    apply(lang);
  }

  // export
  window.I18N = { DICT, SUPPORTED, DEFAULT_LANG, getLang, t, apply, setLang };

  // auto apply
  document.addEventListener("DOMContentLoaded", () => apply(getLang()));
})();
</script>
