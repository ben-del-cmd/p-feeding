/* /p-feeding/i18n.js — drop-in. No <script> wrapper. */
(() => {
  'use strict';

  // -------------------- Config --------------------
  const SUPPORTED = ['en', 'zh', 'ja', 'ko', 'es', 'fr'];
  const DEFAULT_LANG = 'en';           // 英语优先
  const LS_KEY = 'ps_lang';

  // -------------------- Dictionary --------------------
  // 说明：
  // 1) 兼容“旧键名” (nav.calc / home.card1.* / calc.*)
  // 2) 同时覆盖你页面里“新键名” (nav.feeding / nav.card / brand.name / home.calc.* / home.card.* / home.fb.* / feeding.* / footer.*)
  // 3) ja/ko/es/fr 先回退到中文，后续需要时再逐步补翻译
  const dict = {
    en: {
      /* ---------- Brand ---------- */
      'brand.name': 'Pet Scan',

      /* ---------- Nav (new) ---------- */
      'nav.home': 'Home',
      'nav.feeding': 'Feeding Calculator',
      'nav.feedback': 'Feedback',
      'nav.card': '7-Day Transition',

      /* ---------- Nav (old, 仍被其它页面使用) ---------- */
      'nav.calc': 'Feeding Calculator',
      'nav.transition': '7-Day Transition',

      /* ---------- Language labels ---------- */
      'lang.en': 'English',
      'lang.zh': '中文',
      'lang.ja': '日本語',
      'lang.ko': '한국어',
      'lang.es': 'Español',
      'lang.fr': 'Français',

      /* ---------- Home (new keys) ---------- */
      'home.h1': 'Turn confusing labels — into actionable advice',
      'home.lead':
        'Scan/enter pet food & wash-care info, unify terms (ME, GA, as-fed/DM), output feeding amount/transition card in seconds; source & timestamp shown. Informational, not medical.',

      // card 1: Calculator
      'home.calc.title': '① Feeding Calculator',
      'home.calc.desc':
        'RER/MER → kcal/day → cups/grams; supports mixed feeding & treat ratio hints.',
      'home.calc.btn': 'Open Calculator',

      // card 2: 7-day card
      'home.card.title': '② 7-Day Transition',
      'home.card.desc':
        '90/10 → 0/100 schedule; auto converts by energy density.',
      'home.card.btn': 'View Card',

      // card 3: Feedback
      'home.fb.title': '③ Feedback',
      'home.fb.desc':
        'Help us improve hit rate & explanation readability; affiliate clearly disclosed.',
      'home.fb.btn': 'Give Feedback',

      'home.tracked':
        'Tracked: visit_home / visit_feeding_page / visit_feedback_page / feedback_open / calc_click / wash_*.',

      /* ---------- Footer notice (new keys) ---------- */
      'footer.noticeTitle': 'Informational notice (not medical)',
      'footer.noticeBody':
        'Data may change with formula/pack updates; pages show source, timestamp and version to verify.',

      /* ---------- Calculator page (new keys feeding.*) ---------- */
      'feeding.metaTitle': 'Feeding Calculator · Pet Scan',
      'feeding.h1': 'Feeding Calculator',
      'feeding.lead':
        'Based on daily energy need (kcal/day) & food energy density (kcal/100 g), auto converts grams/cups; supports custom g per cup. Informational, not medical.',
      'feeding.inputs.title': 'Inputs',
      'feeding.inputs.kcalDay': 'Daily energy for main meals (kcal/day)',
      'feeding.inputs.gPerCup': 'g per cup',
      'feeding.inputs.energy': 'Energy density (kcal/100 g)',
      'feeding.actions.calc': 'Calculate',
      'feeding.actions.reset': 'Reset',
      'feeding.actions.print': 'Print / Save PDF',
      'feeding.results.title': 'Results',
      'feeding.results.grams': 'Grams per day (g/day)',
      'feeding.results.cups': 'Cups per day (cups/day)',
      'feeding.results.note':
        'Results keep 1 decimal place. For mixed feeding or treats, please split by ratio.',
      'feeding.tips':
        'Tip: Use the calculator first to get the MER intake, then convert here.',
      'feeding.tracked':
        'Events: visit_feeding_page / calc_click.',

      // 占位符
      'feeding.ph.kcal': 'e.g. 600',
      'feeding.ph.energy': 'e.g. 380',

      /* ---------- 7-day card page (已有就保持) ---------- */
      't7.title': '7-Day Transition',
      't7.lead':
        'Classic 90/10 → 0/100 schedule; type the two energy densities, auto converts grams/cups per day.',
      't7.input.daily': 'Daily for main meals (kcal/day)',
      't7.input.cupg': 'g per cup',
      't7.input.a': 'Food A',
      't7.input.b': 'Food B',
      't7.placeholder.cupg': 'e.g. 110',
      't7.placeholder.a': 'e.g. 380',
      't7.placeholder.b': 'e.g. 320',
      't7.btn.gen': 'Generate Card',
      't7.btn.print': 'Print / Save PDF',
      't7.table.title': '7-Day Schedule',
      't7.th.day': 'Day',
      't7.th.mix': 'Ratio (old/new)',
      't7.th.old': 'Old (g/day)',
      't7.th.new': 'New (g/day)',
      't7.th.total': 'Total (g/day)',
      't7.note':
        'Auto converts by energy density, unit is kcal/100 g (ME/100). If mixing/treats exist, please split ratios separately.',

      /* ---------- Feedback page (已有就保持) ---------- */
      'fb.title': 'Feedback',
      'fb.lead':
        'Help us improve hit rate & explanation readability. Affiliate disclosures stay neutral. We don’t collect personal sensitive info.',
      'fb.form.title': 'Submit your feedback',
      'fb.form.category': 'Category',
      'fb.form.cat.issue': 'Issue / Bug',
      'fb.form.cat.improve': 'Improvement',
      'fb.form.cat.other': 'Other',
      'fb.form.email': 'Contact email (optional)',
      'fb.form.subject': 'Subject',
      'fb.form.subject.ph': 'Briefly describe the issue/idea',
      'fb.form.detail': 'Detail',
      'fb.form.detail.ph':
        'Steps to reproduce, expected result, related products/formulas/links/screenshots…',
      'fb.form.submit': 'Submit',

      /* ---------- Old calculator keys (向后兼容) ---------- */
      'calc.title': 'Feeding Calculator',
      'calc.lead':
        'Based on daily energy need (kcal/day) & food energy density (kcal/100 g), auto converts grams/cups; supports custom g per cup.',
      'calc.input.daily': 'Daily energy for main meals (kcal/day)',
      'calc.input.cupg': 'g per cup',
      'calc.input.density': 'Energy density (kcal/100 g)',
      'calc.placeholder.daily': 'e.g. 600',
      'calc.placeholder.density': 'e.g. 380',
      'calc.btn.calc': 'Calculate',
      'calc.btn.reset': 'Reset',
      'calc.btn.print': 'Print / Save PDF',
      'calc.result.title': 'Results',
      'calc.result.gpd': 'Grams per day (g/day)',
      'calc.result.cpd': 'Cups per day (cups/day)',
      'calc.result.hint':
        'Results keep 1 decimal place. For mixed feeding or treats, please split by ratio.',

      /* ---------- Old home keys (向后兼容) ---------- */
      'home.card1.title': '① Feeding Calculator',
      'home.card1.desc':
        'RER/MER → kcal/day → cups/grams; supports mixed feeding & treat ratio hints.',
      'home.card1.btn': 'Open Calculator',
      'home.card2.title': '② 7-Day Transition',
      'home.card2.desc':
        '90/10 → 0/100 schedule; auto converts by energy density.',
      'home.card2.btn': 'View Card',
      'home.card3.title': '③ Feedback',
      'home.card3.desc':
        'Help us improve hit rate & explanation readability; affiliate clearly disclosed.',
      'home.card3.btn': 'Give Feedback',

      /* ---------- Generic ---------- */
      'common.lang': 'Language'
    },

    zh: {
      'brand.name': 'Pet Scan',

      // Nav（新旧都给）
      'nav.home': '首页',
      'nav.feeding': '喂食计算器',
      'nav.feedback': '反馈',
      'nav.card': '7天换粮卡',
      'nav.calc': '喂食计算器',
      'nav.transition': '7天换粮卡',

      // 语种显示
      'lang.en': 'English',
      'lang.zh': '中文',
      'lang.ja': '日本語',
      'lang.ko': '한국어',
      'lang.es': 'Español',
      'lang.fr': 'Français',

      // 首页（新键）
      'home.h1': '把难懂的标签 → 变成可执行建议',
      'home.lead':
        '扫描/录入宠物食品与洗护信息，统一口径（ME、GA、as-fed/DM），秒出喂量/换粮卡；页面显式来源与时间戳。信息性建议，非医疗。',
      'home.calc.title': '① 喂食计算器',
      'home.calc.desc': 'RER/MER → kcal/天 → 杯/克；支持混喂与零食占比提示。',
      'home.calc.btn': '打开计算器',
      'home.card.title': '② 7 天换粮卡',
      'home.card.desc': '90/10 → 0/100 的过渡表，自动按能量密度换算。',
      'home.card.btn': '查看换粮卡',
      'home.fb.title': '③ 意见反馈',
      'home.fb.desc': '帮助我们提高命中率与解释易读性；导购披露保持中立。',
      'home.fb.btn': '去反馈',
      'home.tracked':
        '指标/事件：visit_home / visit_feeding_page / visit_feedback_page / feedback_open / calc_click / wash_*。',

      // 页脚提示（新键）
      'footer.noticeTitle': '信息性提示（非医疗）',
      'footer.noticeBody':
        '数据可能因配方/包装更新而变化；页面已标注来源/时间戳/版本以供核验。',

      // 计算器页（新键 feeding.*）
      'feeding.metaTitle': '喂食计算器 · Pet Scan',
      'feeding.h1': '喂食计算器',
      'feeding.lead':
        '根据每日所需能量（kcal/天）与食物能量密度（kcal/100 g），自动换算每日克数与杯数；支持自定义“克/杯”。信息性建议，非医疗。',
      'feeding.inputs.title': '输入参数',
      'feeding.inputs.kcalDay': '每天用于正餐（kcal/天）',
      'feeding.inputs.gPerCup': '克/杯（g per cup）',
      'feeding.inputs.energy': '能量密度（kcal/100 g）',
      'feeding.actions.calc': '计算',
      'feeding.actions.reset': '重置',
      'feeding.actions.print': '打印/保存 PDF',
      'feeding.results.title': '结果',
      'feeding.results.grams': '每日克数（g/天）',
      'feeding.results.cups': '每日杯数（cups/天）',
      'feeding.results.note':
        '结果保留一位小数；如混喂或零食，请按比例拆分。',
      'feeding.tips': '建议先在首页“计算器”得到 MER 正餐能量，再回此页换算。',
      'feeding.tracked': '事件：visit_feeding_page / calc_click。',

      'feeding.ph.kcal': '例如 600',
      'feeding.ph.energy': '例如 380',

      // 7 天换粮卡（保持）
      't7.title': '7 天换粮卡',
      't7.lead': '经典 90/10 → 0/100 过渡；按两种食品的能量密度 g/杯自动换算每天克数与杯数。',
      't7.input.daily': '每天用于正餐（kcal/天）',
      't7.input.cupg': '克/杯（g per cup）',
      't7.input.a': '食物 A',
      't7.input.b': '食物 B',
      't7.placeholder.cupg': '例如 110',
      't7.placeholder.a': '例如 380',
      't7.placeholder.b': '例如 320',
      't7.btn.gen': '生成换粮卡',
      't7.btn.print': '打印/保存 PDF',
      't7.table.title': '7 日过渡表',
      't7.th.day': '天数',
      't7.th.mix': '配比（旧/新）',
      't7.th.old': '旧粮（g/天）',
      't7.th.new': '新粮（g/天）',
      't7.th.total': '总量（g/天）',
      't7.note':
        '按能量密度换算，计量公式为 kcal ÷（ME/100）；如含混喂/零食，请分别按自定义配比换算。',

      // 反馈页（保持）
      'fb.title': '意见反馈',
      'fb.lead':
        '帮助我们提高命中率与解释易读性；导购披露保持中立。提交前不会收集个人敏感信息。',
      'fb.form.title': '提交你的反馈',
      'fb.form.category': '类别',
      'fb.form.cat.issue': '问题/报错',
      'fb.form.cat.improve': '改进建议',
      'fb.form.cat.other': '其他',
      'fb.form.email': '联系邮箱（可选）',
      'fb.form.subject': '标题',
      'fb.form.subject.ph': '简要概述问题或建议',
      'fb.form.detail': '详细描述',
      'fb.form.detail.ph':
        '复现步骤、期望结果、相关产品/配方/截图/链接等…',
      'fb.form.submit': '提交',

      // 旧 home 键（向后兼容）
      'home.card1.title': '① 喂食计算器',
      'home.card1.desc': 'RER/MER → kcal/天 → 杯/克；支持混喂与零食占比提示。',
      'home.card1.btn': '打开计算器',
      'home.card2.title': '② 7 天换粮卡',
      'home.card2.desc': '90/10 → 0/100 的过渡表，自动按能量密度换算。',
      'home.card2.btn': '查看换粮卡',
      'home.card3.title': '③ 意见反馈',
      'home.card3.desc': '帮助我们提高命中率与解释易读性；导购披露保持中立。',
      'home.card3.btn': '去反馈',

      // 旧 calc.* 键（向后兼容）
      'calc.title': '喂食计算器',
      'calc.lead':
        '根据每日所需能量（kcal/天）与食物能量密度（kcal/100 g），自动换算每日克数与杯数；支持自定义“克/杯”。',
      'calc.input.daily': '每天用于正餐（kcal/天）',
      'calc.input.cupg': '克/杯（g per cup）',
      'calc.input.density': '能量密度（kcal/100 g）',
      'calc.placeholder.daily': '例如 600',
      'calc.placeholder.density': '例如 380',
      'calc.btn.calc': '计算',
      'calc.btn.reset': '重置',
      'calc.btn.print': '打印/保存 PDF',
      'calc.result.title': '结果',
      'calc.result.gpd': '每日克数（g/天）',
      'calc.result.cpd': '每日杯数（cups/天）',
      'calc.result.hint': '结果保留一位小数；如混喂或零食，请按比例拆分。',

      'common.lang': '语言'
    },

    ja: {}, ko: {}, es: {}, fr: {}
  };

  // 其它语言默认回退中文
  ['ja','ko','es','fr'].forEach(k => { dict[k] = Object.assign({}, dict.zh, dict[k] || {}); });

  // -------------------- Helpers --------------------
  const getUrlLang = () => {
    const m = location.search.match(/[?&]lang=([a-z\-]+)/i);
    return m ? m[1].toLowerCase() : null;
  };
  const getStoredLang = () => localStorage.getItem(LS_KEY);
  const getNavigatorLang = () => (navigator.language || '').slice(0,2).toLowerCase();
  const normalize = (lang) => {
    if (!lang) return null;
    const base = lang.toLowerCase().split('-')[0];
    return SUPPORTED.includes(lang) ? lang : (SUPPORTED.includes(base) ? base : null);
  };

  const resolveInitialLang = () =>
    normalize(getUrlLang()) ||
    normalize(getStoredLang()) ||
    normalize(getNavigatorLang()) ||
    DEFAULT_LANG;

  let currentLang = resolveInitialLang();

  // 记录缺失键，方便排错
  const missing = new Set();

  const translate = (key, lang) => {
    const pack = dict[lang] || dict[DEFAULT_LANG];
    if (key in pack) return pack[key];
    // 二级回退：英文 -> 中文
    if (key in dict.en) return dict.en[key];
    if (key in dict.zh) return dict.zh[key];
    missing.add(key);
    return key; // 显示键本身，方便定位
  };

  // -------------------- Apply --------------------
  const applyOne = (el, lang) => {
    if (el.dataset.i18n) el.textContent = translate(el.dataset.i18n, lang);
    if (el.dataset.i18nHtml) el.innerHTML = translate(el.dataset.i18nHtml, lang);
    if (el.dataset.i18nPlaceholder) el.setAttribute('placeholder', translate(el.dataset.i18nPlaceholder, lang));
    if (el.tagName === 'OPTION' && el.dataset.i18nOption) el.textContent = translate(el.dataset.i18nOption, lang);
  };

  const applyAll = (lang) => {
    document
      .querySelectorAll('[data-i18n],[data-i18n-html],[data-i18n-placeholder],[data-i18n-option]')
      .forEach(el => applyOne(el, lang));
    updateLangUI(lang);
    rewriteInternalLinks(lang);

    // 首次渲染后，在控制台提示缺失键，便于一次补齐
    if (missing.size) {
      // 只打印一次，避免噪音
      if (!applyAll._reported) {
        applyAll._reported = true;
        console.warn('[i18n] Missing keys:', Array.from(missing).sort());
      }
    }
  };

  // -------------------- UI & Routing --------------------
  const updateLangUI = (lang) => {
    const btn = document.getElementById('lang-btn');
    if (btn) btn.textContent = translate('lang.' + lang, lang);

    const sel = document.getElementById('lang-select');
    if (sel && sel.value !== lang) sel.value = lang;
  };

  const setLang = (lang) => {
    const L = normalize(lang) || DEFAULT_LANG;
    if (L === currentLang) return;
    currentLang = L;
    localStorage.setItem(LS_KEY, L);

    // 把语言写回 URL（不刷新）
    const url = new URL(location.href);
    url.searchParams.set('lang', L);
    history.replaceState(null, '', url.pathname + url.search + url.hash);

    applyAll(L);
  };

  // 顶部切换控件：按钮兜底轮换 / select 选择 / 自定义菜单 data-lang
  const bindLangControls = () => {
    const btn = document.getElementById('lang-btn');
    const sel = document.getElementById('lang-select');
    const menu = document.getElementById('lang-menu');

    if (btn) {
      btn.addEventListener('click', () => {
        if (sel || menu) return; // 有下拉菜单就不轮换
        const idx = SUPPORTED.indexOf(currentLang);
        setLang(SUPPORTED[(idx + 1) % SUPPORTED.length]);
      });
    }
    if (sel) sel.addEventListener('change', e => setLang(e.target.value));
    if (menu) {
      menu.addEventListener('click', (e) => {
        const node = e.target.closest('[data-lang]');
        if (node) setLang(node.getAttribute('data-lang'));
      });
    }

    // 浏览器前进/后退
    window.addEventListener('popstate', () => {
      const backLang = normalize(getUrlLang()) || currentLang;
      applyAll(backLang);
    });
  };

  // 给站内链接自动带上 ?lang=xx
  const rewriteInternalLinks = (lang) => {
    const host = location.host;
    document.querySelectorAll('a[href]:not([data-no-lang])').forEach(a => {
      try {
        const u = new URL(a.getAttribute('href'), location.href);
        if (u.host === host) {
          u.searchParams.set('lang', lang);
          a.setAttribute('href', u.pathname + (u.search || '') + (u.hash || ''));
        }
      } catch (_) {}
    });
  };

  // -------------------- Boot --------------------
  document.addEventListener('DOMContentLoaded', () => {
    // 首次进入也把 lang 写进 URL，保证跳转携带
    const url = new URL(location.href);
    if (!url.searchParams.get('lang')) {
      url.searchParams.set('lang', currentLang);
      history.replaceState(null, '', url.pathname + url.search + url.hash);
    }

    bindLangControls();
    applyAll(currentLang);

    // 监听后续动态节点
    const mo = new MutationObserver(() => applyAll(currentLang));
    mo.observe(document.body, { childList: true, subtree: true });

    // 暴露一个简单的自检
    window.__i18n = {
      get lang() { return currentLang; },
      setLang,
      missing: () => Array.from(missing).sort()
    };
  });
})();
