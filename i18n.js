/* /p-feeding/i18n.js — drop-in. No <script> wrapper. */
(() => {
  'use strict';

  // -------------------- Config --------------------
  const SUPPORTED = ['en', 'zh', 'ja', 'ko', 'es', 'fr'];
  const DEFAULT_LANG = 'en';              // 英语优先
  const LS_KEY = 'ps_lang';

  // -------------------- Dictionary --------------------
  // 兼容两套键名：旧(home.card1.* / nav.calc) 和 新(home.calc.* / nav.feeding)
  const dict = {
    en: {
      // ---------- nav ----------
      'nav.home': 'Home',
      'nav.calc': 'Feeding Calculator',
      'nav.transition': '7-Day Transition',
      'nav.feedback': 'Feedback',
      // 新命名兼容
      'nav.feeding': 'Feeding Calculator',
      'nav.card': '7-Day Transition',

      // ---------- language names ----------
      'lang.en': 'English', 'lang.zh': '中文', 'lang.ja': '日本語', 'lang.ko': '한국어', 'lang.es': 'Español', 'lang.fr': 'Français',

      // ---------- index ----------
      'home.h1': 'Turn confusing labels — into actionable advice',
      'home.lead': 'Scan/enter pet food & wash-care info, unify terms (ME, GA, as-fed/DM), output feeding amount/transition card in seconds; source & timestamp shown. Informational, not medical.',
      'home.footer.note': 'Informational advice (not medical). Data may change with formula/pack updates; source/time/version are shown on pages.',
      // 卡片（旧）
      'home.card1.title': '① Feeding Calculator',
      'home.card1.desc': 'RER/MER → kcal/day → cups/grams; supports mixed feeding & treat ratio hints.',
      'home.card1.btn': 'Open Calculator',
      'home.card2.title': '② 7-Day Transition',
      'home.card2.desc': '90/10 → 0/100 schedule; auto converts by energy density.',
      'home.card2.btn': 'View Card',
      'home.card3.title': '③ Feedback',
      'home.card3.desc': 'Help us improve hit rate & explanation readability; affiliate clearly disclosed.',
      'home.card3.btn': 'Give Feedback',
      // 卡片（新）
      'home.calc.title': '① Feeding Calculator',
      'home.calc.desc': 'RER/MER → kcal/day → cups/grams; supports mixed feeding & treat ratio hints.',
      'home.calc.btn': 'Open Calculator',
      'home.card.title': '② 7-Day Transition',
      'home.card.desc': '90/10 → 0/100 schedule; auto converts by energy density.',
      'home.card.btn': 'View Card',
      'home.fb.title': '③ Feedback',
      'home.fb.desc': 'Help us improve hit rate & explanation readability; affiliate clearly disclosed.',
      'home.fb.btn': 'Give Feedback',
      'home.tracked': 'Tracked: visit_home / visit_feeding_page / visit_feedback_page / feedback_open / calc_click / wash_*.',

      // ---------- feeding (calculator) ----------
      'calc.title': 'Feeding Calculator',
      'calc.lead': 'Based on daily energy need (kcal/day) & food energy density (kcal/100 g), auto converts grams/cups; supports custom g per cup. Informational, not medical.',
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
      'calc.result.hint': 'Results keep 1 decimal place. For mixed feeding or treats, please split by ratio.',
      // 新键名（feeding.*）
      'feeding.h1': 'Feeding Calculator',
      'feeding.lead': 'Based on daily energy need (kcal/day) & food energy density (kcal/100 g), auto converts grams/cups; supports custom g per cup. Informational, not medical.',
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
      'feeding.results.note': 'Results keep 1 decimal place. For mixed feeding or treats, please split by ratio.',
      'feeding.tips': 'Tip: Run calculator to get MER for meals first, then come back.',

      // ---------- feedback ----------
      'fb.title': 'Feedback',
      'fb.lead': 'Help us improve hit rate & explanation readability. Affiliate disclosures stay neutral. We don’t collect personal sensitive info.',
      'fb.form.title': 'Submit your feedback',
      'fb.form.category': 'Category',
      'fb.form.cat.issue': 'Issue / Bug',
      'fb.form.cat.improve': 'Improvement',
      'fb.form.cat.other': 'Other',
      'fb.form.email': 'Contact email (optional)',
      'fb.form.subject': 'Subject',
      'fb.form.subject.ph': 'Briefly describe the issue/idea',
      'fb.form.detail': 'Detail',
      'fb.form.detail.ph': 'Steps to reproduce, expected result, related products/formulas/links/screenshots…',
      'fb.form.submit': 'Submit',

      // ---------- 7-day card ----------
      't7.title': '7-Day Transition',
      't7.lead': 'Classic 90/10 → 0/100 schedule; type the two energy densities, auto converts grams/cups per day.',
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
      't7.note': 'Auto converts by energy density, unit is kcal/100 g (ME/100). If mixing/treats exist, please split ratios separately.',

      // ---------- generic ----------
      'common.lang': 'Language',
      'brand.name': 'Pet Scan'
    },

    zh: {
      // nav（含新旧）
      'nav.home': '首页', 'nav.calc': '喂食计算器', 'nav.transition': '7天换粮卡', 'nav.feedback': '反馈',
      'nav.feeding': '喂食计算器', 'nav.card': '7天换粮卡',
      // 语言
      'lang.en': 'English', 'lang.zh': '中文', 'lang.ja': '日本語', 'lang.ko': '한국어', 'lang.es': 'Español', 'lang.fr': 'Français',
      // 首页
      'home.h1': '把难懂的标签 → 变成可执行建议',
      'home.lead': '扫描/录入宠物食品与洗护信息，统一口径（ME、GA、as-fed/DM），秒出喂量/换粮卡；页面显式来源与时间戳。信息性建议，非医疗。',
      'home.footer.note': '信息性提示：数据可能因配方/包装更新而变化；页面已标注来源/时间戳/版本以供核验。',
      'home.card1.title': '① 喂食计算器','home.card1.desc': 'RER/MER → kcal/天 → 杯/克；支持混喂与零食占比提示。','home.card1.btn': '打开计算器',
      'home.card2.title': '② 7 天换粮卡','home.card2.desc': '90/10 → 0/100 的过渡表，自动按能量密度换算。','home.card2.btn': '查看换粮卡',
      'home.card3.title': '③ 意见反馈','home.card3.desc': '帮助我们提高命中率与解释易读性；导购披露保持中立。','home.card3.btn': '去反馈',
      // 新命名
      'home.calc.title': '① 喂食计算器','home.calc.desc': 'RER/MER → kcal/天 → 杯/克；支持混喂与零食占比提示。','home.calc.btn': '打开计算器',
      'home.card.title': '② 7 天换粮卡','home.card.desc': '90/10 → 0/100 的过渡表，自动按能量密度换算。','home.card.btn': '查看换粮卡',
      'home.fb.title': '③ 意见反馈','home.fb.desc': '帮助我们提高命中率与解释易读性；导购披露保持中立。','home.fb.btn': '去反馈',
      'home.tracked': '指标监测：visit_home / visit_feeding_page / visit_feedback_page / feedback_open / calc_click / wash_*。',
      // 计算器
      'calc.title': '喂食计算器',
      'calc.lead': '根据每日所需能量（kcal/天）与食物能量密度（kcal/100 g），自动换算每日克数与杯数；支持自定义“克/杯”。信息性建议，非医疗。',
      'calc.input.daily': '每天用于正餐（kcal/天）','calc.input.cupg': '克/杯（g per cup）','calc.input.density': '能量密度（kcal/100 g）',
      'calc.placeholder.daily': '例如 600','calc.placeholder.density': '例如 380',
      'calc.btn.calc': '计算','calc.btn.reset': '重置','calc.btn.print': '打印/保存 PDF',
      'calc.result.title': '结果','calc.result.gpd': '每日克数（g/天）','calc.result.cpd': '每日杯数（cups/天）',
      'calc.result.hint': '结果保留一位小数；如混喂或零食，请按比例拆分。',
      // 新键名（feeding.*）
      'feeding.h1': '喂食计算器','feeding.lead': '根据每日所需能量与能量密度自动换算克数/杯数；支持自定义克/杯。信息性建议，非医疗。',
      'feeding.inputs.title': '输入参数','feeding.inputs.kcalDay': '每天用于正餐（kcal/天）','feeding.inputs.gPerCup': '克/杯（g per cup）','feeding.inputs.energy': '能量密度（kcal/100 g）',
      'feeding.actions.calc': '计算','feeding.actions.reset': '重置','feeding.actions.print': '打印/保存 PDF',
      'feeding.results.title': '结果','feeding.results.grams': '每日克数（g/天）','feeding.results.cups': '每日杯数（cups/天）','feeding.results.note': '结果保留一位小数；如混喂或零食，请按比例拆分。',
      'feeding.tips': '建议先在首页“计算器”得到 MER 正餐能量，再回此页换算。',
      // 反馈
      'fb.title': '意见反馈','fb.lead': '帮助我们提高命中率与解释易读性；导购披露保持中立。提交前不会收集个人敏感信息。',
      'fb.form.title': '提交你的反馈','fb.form.category': '类别','fb.form.cat.issue': '问题/报错','fb.form.cat.improve': '改进建议','fb.form.cat.other': '其他',
      'fb.form.email': '联系邮箱（可选）','fb.form.subject': '标题','fb.form.subject.ph': '简要概述问题或建议','fb.form.detail': '详细描述','fb.form.detail.ph': '复现步骤、期望结果、相关产品/配方/截图/链接等…','fb.form.submit': '提交',
      // 7天卡
      't7.title': '7 天换粮卡','t7.lead': '经典 90/10 → 0/100 过渡；按两种食品的能量密度 g/杯自动换算每天克数与杯数。',
      't7.input.daily': '每天用于正餐（kcal/天）','t7.input.cupg': '克/杯（g per cup）','t7.input.a': '食物 A','t7.input.b': '食物 B',
      't7.placeholder.cupg': '例如 110','t7.placeholder.a': '例如 380','t7.placeholder.b': '例如 320',
      't7.btn.gen': '生成换粮卡','t7.btn.print': '打印/保存 PDF',
      't7.table.title': '7 日过渡表','t7.th.day': '天数','t7.th.mix': '配比（旧/新）','t7.th.old': '旧粮（g/天）','t7.th.new': '新粮（g/天）','t7.th.total': '总量（g/天）',
      't7.note': '按能量密度换算，计量公式为 kcal ÷（ME/100）；如含混喂/零食，请分别按自定义配比换算。',
      // generic
      'common.lang': '语言','brand.name': 'Pet Scan'
    },

    // 其它语言先用中文兜底，后续再补翻译
    ja: {}, ko: {}, es: {}, fr: {}
  };
  ['ja','ko','es','fr'].forEach(k => { dict[k] = Object.assign({}, dict.zh, dict[k] || {}); });

  // -------------------- Helpers --------------------
  const getUrlLang = () => {
    const m = location.search.match(/[?&]lang=([a-z-]+)/i);
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

  const t = (key, lang) => {
    const pack = dict[lang] || {};
    return (pack[key] ?? dict.en[key] ?? dict.zh[key] ?? key);
  };

  // -------------------- Apply translations --------------------
  const applyOne = (el, lang) => {
    if (el.dataset.i18n) el.textContent = t(el.dataset.i18n, lang);
    if (el.dataset.i18nHtml) el.innerHTML = t(el.dataset.i18nHtml, lang);
    if (el.dataset.i18nPlaceholder) el.setAttribute('placeholder', t(el.dataset.i18nPlaceholder, lang));
    if (el.tagName === 'OPTION' && el.dataset.i18nOption) el.textContent = t(el.dataset.i18nOption, lang);
  };

  // 自动模式：当元素没有 data-i18n，且文本/placeholder 本身就是键名时也替换
  const AUTO_SELECTORS = 'h1,h2,h3,h4,small,span,em,strong,button,a,li,dt,dd,label,th,td,p,div';
  const applyAutoByInnerText = (lang) => {
    const seen = new Set();
    document.querySelectorAll(AUTO_SELECTORS).forEach(el => {
      if (el.children.length) return;                    // 仅处理纯文本节点
      if (el.hasAttribute('data-i18n') || el.hasAttribute('data-i18n-html')) return;
      const txt = (el.textContent || '').trim();
      if (!txt || txt.length > 120) return;              // 避免误伤长段落
      if (seen.has(el)) return;
      const translated = t(txt, lang);
      if (translated !== txt) {
        el.textContent = translated;
        seen.add(el);
      }
    });

    // placeholder = 键名 的情况
    document.querySelectorAll('input[placeholder],textarea[placeholder]').forEach(el => {
      const ph = el.getAttribute('placeholder');
      if (!ph) return;
      const translated = t(ph, lang);
      if (translated !== ph) el.setAttribute('placeholder', translated);
    });

    // 文档标题如果就是键名
    if (document.title) {
      const newTitle = t(document.title, lang);
      if (newTitle !== document.title) document.title = newTitle;
    }
  };

  const applyAll = (lang) => {
    document
      .querySelectorAll('[data-i18n],[data-i18n-html],[data-i18n-placeholder],[data-i18n-option]')
      .forEach(el => applyOne(el, lang));

    applyAutoByInnerText(lang);  // 兼容“把键名写成文本”的页面
    updateLangUI(lang);
    rewriteInternalLinks(lang);
  };

  // -------------------- Language UI --------------------
  const updateLangUI = (lang) => {
    const btn = document.getElementById('lang-btn');
    if (btn) btn.textContent = t('lang.' + lang, lang);
    const sel = document.getElementById('lang-select');
    if (sel && sel.value !== lang) sel.value = lang;
  };

  const setLang = (lang) => {
    const L = normalize(lang) || DEFAULT_LANG;
    if (L === currentLang) return;
    currentLang = L;
    localStorage.setItem(LS_KEY, L);

    const url = new URL(location.href);
    url.searchParams.set('lang', L);
    history.replaceState(null, '', url.pathname + url.search + url.hash);

    applyAll(L);
  };

  const bindLangControls = () => {
    const btn = document.getElementById('lang-btn');
    const sel = document.getElementById('lang-select');
    const menu = document.getElementById('lang-menu'); // 自定义下拉（每个选项写 data-lang="xx"）

    if (btn) {
      btn.addEventListener('click', () => {
        if (sel || menu) return; // 如果有下拉，就不做轮换
        const idx = SUPPORTED.indexOf(currentLang);
        const next = SUPPORTED[(idx + 1) % SUPPORTED.length];
        setLang(next);
      });
    }
    if (sel) sel.addEventListener('change', e => setLang(e.target.value));
    if (menu) menu.addEventListener('click', e => {
      const node = e.target.closest('[data-lang]');
      if (node) setLang(node.getAttribute('data-lang'));
    });

    window.addEventListener('popstate', () => {
      const backLang = normalize(getUrlLang()) || currentLang;
      applyAll(backLang);
    });
  };

  // -------------------- Link rewriting --------------------
  const rewriteInternalLinks = (lang) => {
    const baseHost = location.host;
    document.querySelectorAll('a[href]:not([data-no-lang])').forEach(a => {
      try {
        const u = new URL(a.getAttribute('href'), location.href);
        if (u.host === baseHost) {
          u.searchParams.set('lang', lang);
          a.setAttribute('href', u.pathname + (u.search || '') + (u.hash || ''));
        }
      } catch (_) {}
    });
  };

  // -------------------- Boot --------------------
  document.addEventListener('DOMContentLoaded', () => {
    // 首次进入也显式带上 ?lang=
    const url = new URL(location.href);
    if (!url.searchParams.get('lang')) {
      url.searchParams.set('lang', currentLang);
      history.replaceState(null, '', url.pathname + url.search + url.hash);
    }

    bindLangControls();
    applyAll(currentLang);

    // 监听后续插入节点
    const mo = new MutationObserver(() => applyAll(currentLang));
    mo.observe(document.body, { childList: true, subtree: true });
  });
})();
