<script>
// /p-feeding/i18n.js  v20250922k  (drop-in, robust apply + legacy chip removal)
(function () {
  const STORE_KEY = 'ps_lang';
  const SUPPORTED = ['en','zh','ja','ko','es','fr'];   // 目前支持的语言
  const DEFAULT = 'en';                               // 默认英语优先
  const QS_KEY = 'lang';

  // ===== 词典（节选）：务必与页面 data-i18n key 一致 =====
  const DICT = {
    en: {
      nav.home: 'Home',
      nav.calc: 'Feeding Calculator',
      nav.feedback: 'Feedback',
      nav.transition7: '7-Day Transition',
      home.title: 'Turn confusing labels → into actionable advice',
      home.card1.title: 'Feeding Calculator',
      home.card1.btn: 'Open Calculator',
      home.card2.title: '7-Day Transition',
      home.card2.btn: 'View Card',
      home.card3.title: 'Feedback',
      home.card3.btn: 'Give Feedback',
      footer.note: 'Pet Scan · Informational advice (not medical)',
    },
    zh: {
      nav.home: '首页',
      nav.calc: '喂食计算器',
      nav.feedback: '反馈',
      nav.transition7: '7天换粮卡',
      home.title: '把难懂的标签 → 变成可执行建议',
      home.card1.title: '喂食计算器',
      home.card1.btn: '打开计算器',
      home.card2.title: '7 天换粮卡',
      home.card2.btn: '查看换粮卡',
      home.card3.title: '意见反馈',
      home.card3.btn: '去反馈',
      footer.note: '© Pet Scan · 信息性建议（非医疗）',
    },
    ja: { /* 先留空，后续补词条也可正常落回英文 */ },
    ko: { /* 同上 */ },
    es: { /* 同上 */ },
    fr: { /* 同上 */ },
  };

  // ===== 工具函数 =====
  const qs = (k) => new URLSearchParams(location.search).get(k);
  const setQS = (url, k, v) => {
    const u = new URL(url, location.origin);
    if (v) u.searchParams.set(k, v);
    return u.pathname + (u.search ? u.search : '') + u.hash;
  };
  const inList = (x, list) => list.includes(x);

  // 解析语言：URL > localStorage > navigator > 默认
  function resolveLang() {
    const fromUrl = qs(QS_KEY);
    if (inList(fromUrl, SUPPORTED)) return fromUrl;

    try {
      const store = localStorage.getItem(STORE_KEY);
      if (inList(store, SUPPORTED)) return store;
    } catch (e) {}

    const nav = (navigator.language || navigator.userLanguage || '').toLowerCase();
    const short = nav.split('-')[0];
    if (inList(short, SUPPORTED)) return short;
    return DEFAULT;
  }

  function setLang(lang, opts={propagate:true, persist:true}) {
    const final = inList(lang, SUPPORTED) ? lang : DEFAULT;

    // 持久化
    if (opts.persist) {
      try { localStorage.setItem(STORE_KEY, final); } catch(e){}
    }
    // 设置 <html lang="">
    document.documentElement.setAttribute('lang', final);

    // 应用翻译
    applyI18N(final);

    // 链接补参
    if (opts.propagate) {
      patchLinks(final);
      if (qs(QS_KEY) !== final) {
        history.replaceState(null, '', setQS(location.href, QS_KEY, final));
      }
    }

    // 同步下拉
    const sel = document.getElementById('langSelect');
    if (sel && sel.value !== final) sel.value = final;

    return final;
  }

  // 把 data-i18n / data-i18n-attr 应用到 DOM
  function applyI18N(lang) {
    const dict = DICT[lang] || DICT[DEFAULT] || {};
    const fallback = DICT[DEFAULT] || {};

    // 文本
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const val = dict[key] ?? fallback[key] ?? '';
      if (val) el.textContent = val;
    });

    // 属性
    document.querySelectorAll('[data-i18n-attr]').forEach(el => {
      const conf = el.getAttribute('data-i18n-attr'); // e.g. title:home.title|placeholder:form.hint
      conf.split('|').forEach(pair => {
        const [attr, key] = pair.split(':');
        const val = dict[key] ?? fallback[key] ?? '';
        if (attr && val) el.setAttribute(attr.trim(), val);
      });
    });

    // 移除旧的语言圆点按钮（legacy chip），避免双控件冲突
    document.querySelectorAll('[data-legacy-lang-chip]').forEach(el => el.remove());
  }

  // 给站内链接自动补上 ?lang=
  function patchLinks(lang) {
    const anchors = document.querySelectorAll('a[href]');
    anchors.forEach(a => {
      const href = a.getAttribute('href');
      // 只处理站内相对路径或本站绝对路径
      if (!href || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('#')) return;
      // 外链直接跳过
      try {
        const u = new URL(href, location.origin);
        if (u.origin !== location.origin) return;
        // 给 /p-feeding/ 站内页补参
        if (u.pathname.startsWith('/p-feeding/')) {
          a.setAttribute('href', setQS(u.href, QS_KEY, lang));
        }
      } catch(e){}
    });
  }

  // 下拉事件
  function bindSelect() {
    const sel = document.getElementById('langSelect');
    if (!sel) return;
    if (!SUPPORTED.includes(sel.value)) sel.value = resolveLang();
    sel.addEventListener('change', () => setLang(sel.value));
  }

  // 主流程：确保 DOM 就绪后执行；若已就绪，立即执行
  function boot() {
    const lang = resolveLang();
    setLang(lang, {propagate:true, persist:true});
    bindSelect();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }

  // 暴露调试 API
  window.PS_I18N = {
    get: () => (qs(QS_KEY) || localStorage.getItem(STORE_KEY) || document.documentElement.getAttribute('lang') || DEFAULT),
    set: (l) => setLang(l),
    dict: DICT,
    supported: SUPPORTED.slice(),
  };
})();
</script>
