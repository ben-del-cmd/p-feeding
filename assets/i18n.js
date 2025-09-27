/* /assets/i18n.js
 * 只负责提供语言清单和文案字典；页面与 app.js 通过 window.I18N 读取。
 * 已自检：无 <script> 标签、立即执行、只导出 I18N，兼容我们现有页面键名。
 */
(() => {
  "use strict";

  // 显示在语言下拉里的名称
  const LANGS = {
    en: "English",
    es: "Español",
    zh: "中文",
    fr: "Français",
  };

  // 文案字典 —— 键名需与页面 / app.js 使用的一致
  const DICTS = {
    en: {
      // 顶部导航
      "nav.home": "Home",
      "nav.calculator": "Calculator",
      "nav.transition7": "7-Day Switch",
      "nav.feedback": "Feedback",

      // 首页
      "home.hero.title": "Turn pet food labels into simple, actionable feeding.",
      "home.hero.subtitle": "Informational only. Not medical advice.",
      "home.cta.open_calculator": "Open Calculator",
      "home.cta.view_transition_card": "View 7-Day Card",
      "legal.info_boundary": "Informational only. Not medical advice.",

      // 计算器
      "calculator.title": "Feeding Calculator",
      "feeding.pet_type.label": "Pet",
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
      "feeding.back_home": "Back to Home",
      "result.title": "Result",

      // 7天卡片
      "transition.title": "7-Day Transition Card",
      "transition.day1": "Day 1",
      "transition.day2": "Day 2",
      "transition.day3": "Day 3",
      "transition.day4": "Day 4",
      "transition.day5": "Day 5",
      "transition.day6": "Day 6",
      "transition.day7": "Day 7",

      // 反馈
      "feedback.title": "Feedback",
      "feedback.body":
        "We use anonymous analytics to improve features. Informational only. Not medical advice.",
      "feedback.email": "Send Email",
      "feedback.back": "Back to Home",
    },

    zh: {
      // 顶部导航
      "nav.home": "首页",
      "nav.calculator": "喂食计算器",
      "nav.transition7": "7天换粮",
      "nav.feedback": "反馈",

      // 首页
      "home.hero.title": "把宠粮标签转成简单、可执行的喂食方案。",
      "home.hero.subtitle": "仅供信息参考；不构成医疗建议。",
      "home.cta.open_calculator": "打开计算器",
      "home.cta.view_transition_card": "查看 7 天卡片",
      "legal.info_boundary": "仅供信息参考；不构成医疗建议。",

      // 计算器
      "calculator.title": "喂食计算器",
      "feeding.pet_type.label": "宠物",
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
      "feeding.back_home": "返回首页",
      "result.title": "结果",

      // 7天卡片
      "transition.title": "7天换粮卡",
      "transition.day1": "第1天",
      "transition.day2": "第2天",
      "transition.day3": "第3天",
      "transition.day4": "第4天",
      "transition.day5": "第5天",
      "transition.day6": "第6天",
      "transition.day7": "第7天",

      // 反馈
      "feedback.title": "反馈",
      "feedback.body":
        "我们使用匿名统计改进功能。仅供信息参考，并非医疗建议。",
      "feedback.email": "发送邮件",
      "feedback.back": "返回首页",
    },

    es: {
      // Navegación
      "nav.home": "Inicio",
      "nav.calculator": "Calculadora",
      "nav.transition7": "Cambio 7 días",
      "nav.feedback": "Comentarios",

      // Inicio
      "home.hero.title":
        "Convierte las etiquetas en una guía simple y accionable.",
      "home.hero.subtitle": "Solo informativo. No es consejo médico.",
      "home.cta.open_calculator": "Abrir calculadora",
      "home.cta.view_transition_card": "Ver tarjeta 7 días",
      "legal.info_boundary": "Solo informativo. No es consejo médico.",

      // Calculadora
      "calculator.title": "Calculadora de alimentación",
      "feeding.pet_type.label": "Mascota",
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
      "feeding.back_home": "Volver al inicio",
      "result.title": "Resultado",

      // Tarjeta 7 días
      "transition.title": "Tarjeta de transición 7 días",
      "transition.day1": "Día 1",
      "transition.day2": "Día 2",
      "transition.day3": "Día 3",
      "transition.day4": "Día 4",
      "transition.day5": "Día 5",
      "transition.day6": "Día 6",
      "transition.day7": "Día 7",

      // Feedback
      "feedback.title": "Comentarios",
      "feedback.body":
        "Usamos analítica anónima para mejorar. Solo informativo.",
      "feedback.email": "Enviar email",
      "feedback.back": "Volver al inicio",
    },

    fr: {
      // Navigation
      "nav.home": "Accueil",
      "nav.calculator": "Calculateur",
      "nav.transition7": "Transition 7 jours",
      "nav.feedback": "Retour",

      // Accueil
      "home.hero.title":
        "Transformez les étiquettes en consignes simples et actionnables.",
      "home.hero.subtitle": "À titre informatif. Pas un avis médical.",
      "home.cta.open_calculator": "Ouvrir le calculateur",
      "home.cta.view_transition_card": "Voir la carte 7 jours",
      "legal.info_boundary":
        "À titre informatif. Pas un avis médical.",

      // Calculateur
      "calculator.title": "Calculateur d’alimentation",
      "feeding.pet_type.label": "Animal",
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
      "feeding.back_home": "Retour accueil",
      "result.title": "Résultat",

      // Carte 7 jours
      "transition.title": "Carte de transition 7 jours",
      "transition.day1": "Jour 1",
      "transition.day2": "Jour 2",
      "transition.day3": "Jour 3",
      "transition.day4": "Jour 4",
      "transition.day5": "Jour 5",
      "transition.day6": "Jour 6",
      "transition.day7": "Jour 7",

      // Retour
      "feedback.title": "Retour",
      "feedback.body":
        "Nous utilisons des statistiques anonymes pour améliorer. Informations uniquement.",
      "feedback.email": "Envoyer un email",
      "feedback.back": "Retour accueil",
    },
  };

  // 导出给 app.js / 页面使用
  window.I18N = { LANGS, DICTS };
})();
