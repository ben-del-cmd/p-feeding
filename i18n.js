/* i18n.js — four languages (en-US, es-419, zh-Hans, fr-CA)
 * Usage in HTML: <script src="/p-feeding/i18n.js?v=20250920b"></script>
 * - Auto-pick by ?lang / localStorage(i18n.lang) / navigator.languages[0] / navigator.language
 * - Apply to: [data-i18n], [data-i18n-placeholder], [data-i18n-value]
 * - Exposes: window.__setLang(lang), window.__i18n_get()
 */

(function () {
  // ---------------------------
  // Dictionaries
  // ---------------------------
  const DICT = {
    'en-US': {
      // index
      'title.index': 'Pet Feeding Tools',
      'h1.index': 'Pet Feeding Tools',
      'desc.index': 'Simple, handy tools: feeding calculator, feedback, and more.',
      'nav.feeding': 'Feeding Calculator',
      'nav.feedback': 'Feedback',
      'search.label': 'Site Search',
      'search.placeholder': 'Type a keyword…',
      'search.btn': 'Search',
      'footer.note': 'Anonymous analytics (Plausible) is enabled to improve the product.',
      // feeding
      'title.feeding': 'Feeding Calculator',
      'h1.feeding': 'Feeding Calculator',
      'feeding.weight': 'Weight',
      'feeding.unit': 'Unit',
      'feeding.kg': 'Kilogram (kg)',
      'feeding.lb': 'Pound (lb)',
      'feeding.activity': 'Activity',
      'feeding.low': 'Low',
      'feeding.mid': 'Medium',
      'feeding.high': 'High',
      'feeding.calc': 'Calculate',
      'feeding.result': 'Result',
      'feeding.kcal.day': 'kcal/day',
      'feeding.cup.day': 'cup/day',
      'feeding.g.day': 'g/day',
      'nav.home': 'Home',
      'footer.note.feeding': 'Note: For reference only. Consult your vet.',
      // feedback
      'title.feedback': 'Feedback',
      'h1.feedback': 'Feedback',
      'form.type': 'Type',
      'form.type.bug': 'Bug',
      'form.type.feature': 'Feature Request',
      'form.summary': 'Summary',
      'form.summary.ph': 'One-line summary…',
      'form.details': 'Details',
      'form.details.ph': 'Steps to reproduce, expected result, screenshots/device info…',
      'btn.preview': 'Preview Draft',
      'footer.note.feedback': 'You will be redirected to GitHub to review and submit.'
    },

    'es-419': {
      // index
      'title.index': 'Herramientas de Alimentación para Mascotas',
      'h1.index': 'Herramientas de Alimentación',
      'desc.index': 'Herramientas sencillas: calculadora de ración, sugerencias y más.',
      'nav.feeding': 'Calculadora de Ración',
      'nav.feedback': 'Sugerencias',
      'search.label': 'Búsqueda en el sitio',
      'search.placeholder': 'Escribe una palabra clave…',
      'search.btn': 'Buscar',
      'footer.note': 'Analítica anónima (Plausible) activada para mejorar el producto.',
      // feeding
      'title.feeding': 'Calculadora de Ración',
      'h1.feeding': 'Calculadora de Ración',
      'feeding.weight': 'Peso',
      'feeding.unit': 'Unidad',
      'feeding.kg': 'Kilogramo (kg)',
      'feeding.lb': 'Libra (lb)',
      'feeding.activity': 'Actividad',
      'feeding.low': 'Baja',
      'feeding.mid': 'Media',
      'feeding.high': 'Alta',
      'feeding.calc': 'Calcular',
      'feeding.result': 'Resultado',
      'feeding.kcal.day': 'kcal/día',
      'feeding.cup.day': 'taza/día',
      'feeding.g.day': 'g/día',
      'nav.home': 'Inicio',
      'footer.note.feeding': 'Nota: Solo referencia. Consulte a su veterinario.',
      // feedback
      'title.feedback': 'Sugerencias',
      'h1.feedback': 'Sugerencias',
      'form.type': 'Tipo',
      'form.type.bug': 'Error / Bug',
      'form.type.feature': 'Solicitud de función',
      'form.summary': 'Resumen',
      'form.summary.ph': 'Resumen en una línea…',
      'form.details': 'Detalles',
      'form.details.ph': 'Pasos para reproducir, resultado esperado, capturas/dispositivo…',
      'btn.preview': 'Vista previa',
      'footer.note.feedback': 'Serás redirigido a GitHub para revisar y enviar.'
    },

    'zh-Hans': {
      // index
      'title.index': '宠物喂食工具集｜Pet Feeding Tools',
      'h1.index': '宠物喂食工具集',
      'desc.index': '简洁好用的宠物喂食小工具：喂食计算器、反馈入口与更多实验功能。',
      'nav.feeding': '喂食计算器',
      'nav.feedback': '问题与建议',
      'search.label': '站内搜索',
      'search.placeholder': '输入关键词…',
      'search.btn': '搜索',
      'footer.note': '本页启用匿名统计（Plausible），仅用于改进产品体验。',
      // feeding
      'title.feeding': '喂食计算器｜Feeding Calculator',
      'h1.feeding': '喂食计算器',
      'feeding.weight': '体重',
      'feeding.unit': '单位',
      'feeding.kg': '千克(kg)',
      'feeding.lb': '磅(lb)',
      'feeding.activity': '活动水平',
      'feeding.low': '低',
      'feeding.mid': '中',
      'feeding.high': '高',
      'feeding.calc': '计算',
      'feeding.result': '结果',
      'feeding.kcal.day': '千卡/天',
      'feeding.cup.day': '杯/天',
      'feeding.g.day': '克/天',
      'nav.home': '返回主页',
      'footer.note.feeding': '提示：结果仅供参考，请结合兽医建议。',
      // feedback
      'title.feedback': '问题与建议｜Feedback',
      'h1.feedback': '问题与建议',
      'form.type': '类型',
      'form.type.bug': '缺陷 / Bug',
      'form.type.feature': '功能建议',
      'form.summary': '概要',
      'form.summary.ph': '一句话描述…',
      'form.details': '详细描述',
      'form.details.ph': '可复现步骤、期望结果、截图/设备信息等…',
      'btn.preview': '预览草稿',
      'footer.note.feedback': '提交将跳转到 GitHub，新窗口中可再次确认后发布。'
    },

    'fr-CA': {
      // index
      'title.index': 'Outils d’alimentation pour animaux',
      'h1.index': 'Outils d’alimentation',
      'desc.index': 'Des outils simples : calculateur de ration, retours et plus.',
      'nav.feeding': 'Calculateur de ration',
      'nav.feedback': 'Retours',
      'search.label': 'Recherche du site',
      'search.placeholder': 'Saisir un mot-clé…',
      'search.btn': 'Rechercher',
      'footer.note': 'Analytique anonyme (Plausible) activée pour améliorer le produit.',
      // feeding
      'title.feeding': 'Calculateur de ration',
      'h1.feeding': 'Calculateur de ration',
      'feeding.weight': 'Poids',
      'feeding.unit': 'Unité',
      'feeding.kg': 'Kilogramme (kg)',
      'feeding.lb': 'Livre (lb)',
      'feeding.activity': 'Niveau d’activité',
      'feeding.low': 'Faible',
      'feeding.mid': 'Moyen',
      'feeding.high': 'Élevé',
      'feeding.calc': 'Calculer',
      'feeding.result': 'Résultat',
      'feeding.kcal.day': 'kcal/jour',
      'feeding.cup.day': 'tasse/jour',
      'feeding.g.day': 'g/jour',
      'nav.home': 'Accueil',
      'footer.note.feeding': 'Remarque : à titre indicatif. Consultez votre vétérinaire.',
      // feedback
      'title.feedback': 'Retours',
      'h1.feedback': 'Retours',
      'form.type': 'Type',
      'form.type.bug': 'Bug',
      'form.type.feature': 'Demande de fonctionnalité',
      'form.summary': 'Résumé',
      'form.summary.ph': 'Résumé en une ligne…',
      'form.details': 'Détails',
      'form.details.ph': 'Étapes de reproduction, résultat attendu, captures/appareil…',
      'btn.preview': 'Aperçu du brouillon',
      'footer.note.feedback': 'Redirection vers GitHub pour vérifier et soumettre.'
    }
  };

  // ---------------------------
  // Helpers
  // ---------------------------
  const STORAGE_KEY = 'i18n.lang';

  function normalizeLang(code) {
    if (!code) return 'en-US';
    const c = String(code).toLowerCase();
    if (c.startsWith('es')) return 'es-419';
    if (c.startsWith('zh')) return 'zh-Hans';
    if (c.startsWith('fr')) return 'fr-CA';
    return 'en-US';
  }

  function pickLang() {
    const url = new URL(location.href);
    const q = url.searchParams.get('lang');
    if (q) return normalizeLang(q);
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return normalizeLang(saved);
    const nav = (navigator.languages && navigator.languages[0]) || navigator.language || navigator.userLanguage || 'en-US';
    return normalizeLang(nav);
  }

  function dictFor(lang) {
    return DICT[lang] || DICT['en-US'];
  }

  function applyI18n(lang) {
    const d = dictFor(lang);
    document.documentElement.setAttribute('lang', lang);

    // text nodes
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (d[key]) {
        el.textContent = d[key];
        if (el.tagName === 'TITLE') document.title = d[key];
      }
    });

    // placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (d[key]) el.setAttribute('placeholder', d[key]);
    });

    // values (for option/select)
    document.querySelectorAll('[data-i18n-value]').forEach((el) => {
      const key = el.getAttribute('data-i18n-value');
      if (d[key]) el.value = d[key];
    });

    // best effort: if page has any [data-i18n^="title."]
    const titleEl = document.querySelector('[data-i18n^="title."]');
    if (titleEl) {
      const key = titleEl.getAttribute('data-i18n');
      if (d[key]) document.title = d[key];
    }
  }

  function setLang(lang) {
    const L = normalizeLang(lang);
    localStorage.setItem(STORAGE_KEY, L);
    try { window.plausible && window.plausible('Lang', { props: { lang: L } }); } catch (e) {}
    applyI18n(L);
    const url = new URL(location.href);
    url.searchParams.set('lang', L);
    history.replaceState(null, '', url.toString());
  }

  // ---------------------------
  // Safe Init (runs even if script tag forgets "defer")
  // ---------------------------
  function init() {
    const L = pickLang();
    applyI18n(L);
    // expose
    window.__setLang = setLang;
    window.__i18n_get = function () {
      return { lang: document.documentElement.getAttribute('lang') || L, DICT };
    };
  }

  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    init();
  } else {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  }
})();
