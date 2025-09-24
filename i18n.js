/*! Pet Scan i18n — en/es/zh/fr | default=fallback=en */
(function (win, doc) {
  'use strict';

  // ---- 可配置：支持语言与显示名（顺序即下拉显示顺序） ----
  var SUPPORTED = ['en', 'es', 'zh', 'fr'];
  var NAMES = { en: 'English', es: 'Español', zh: '中文', fr: 'Français' };
  var DEFAULT_LANG = 'en';

  // ---- 取/存语言（始终英文优先）----
  function getLang() {
    try {
      var u = new URL(location.href);
      var qp = (u.searchParams.get('lang') || '').toLowerCase();
      var ls = (localStorage.getItem('lang') || '').toLowerCase();
      var lang = qp || ls || DEFAULT_LANG;
      if (SUPPORTED.indexOf(lang) === -1) lang = DEFAULT_LANG;
      return lang;
    } catch (e) { return DEFAULT_LANG; }
  }
  function setLang(lang, options) {
    if (SUPPORTED.indexOf(lang) === -1) lang = DEFAULT_LANG;
    try {
      var u = new URL(location.href);
      u.searchParams.set('lang', lang);
      // 去除错误的 ?%3F / ?%253F 前缀
      if (/^\?%3F/i.test(u.search)) u.search = '?' + u.search.replace(/^\?%3F/i, '');
      if (/^\?%253F/i.test(u.search)) u.search = '?' + u.search.replace(/^\?%253F/i, '');
      history.replaceState(null, '', u.toString());
      localStorage.setItem('lang', lang);
      doc.documentElement.lang = lang;
      applyI18N(lang);
      rewriteLinks(lang);
      if (!options || !options.silent) {
        try { if (win.plausible) plausible('i18n_change', { props: { lang: lang } }); } catch (e) {}
      }
    } catch (e) {}
  }

  // ---- 读取字典（外部可在 window.I18N_DICT 注入），回退英文 ----
  var DICT = win.I18N_DICT || {};
  function t(key, lang) {
    lang = lang || getLang();
    var k = key || '';
    try {
      var d = (DICT[lang] && DICT[lang][k]) ||
              (DICT[DEFAULT_LANG] && DICT[DEFAULT_LANG][k]) ||
              null;
      return (d == null) ? k : d;
    } catch (e) { return k; }
  }

  // ---- 应用翻译：text / placeholder ----
  function applyI18N(lang) {
    lang = lang || getLang();
    // 文本
    var nodes = doc.querySelectorAll('[data-i18n]');
    nodes.forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (!key) return;
      var text = t(key, lang);
      if (el.firstElementChild) {
        // 仅替换纯文本节点，保留内部结构
        el.childNodes.forEach(function (n) {
          if (n.nodeType === 3) n.nodeValue = text;
        });
      } else {
        el.textContent = text;
      }
    });
    // placeholder
    var ph = doc.querySelectorAll('[data-i18n-placeholder]');
    ph.forEach(function (el) {
      var key = el.getAttribute('data-i18n-placeholder');
      if (!key) return;
      el.setAttribute('placeholder', t(key, lang));
    });

    // 同步下拉
    var sel = doc.getElementById('ps-lang-select');
    if (sel && sel.value !== lang) sel.value = lang;
  }

  // ---- 语言下拉：插入 header/#lang-slot ----
  function mountLangSelect() {
    if (doc.getElementById('ps-lang-select')) return;
    var slot = doc.getElementById('lang-slot') || doc.querySelector('header') || doc.body;
    var wrap = doc.createElement('div');
    wrap.style.marginLeft = 'auto';

    var sel = doc.createElement('select');
    sel.id = 'ps-lang-select';
    sel.setAttribute('aria-label', 'Language');
    sel.style.appearance = 'none';
    sel.style.background = 'rgba(255,255,255,.04)';
    sel.style.color = 'inherit';
    sel.style.border = '1px solid rgba(255,255,255,.10)';
    sel.style.borderRadius = '12px';
    sel.style.padding = '10px 36px 10px 12px';
    sel.style.backdropFilter = 'blur(8px)';
    sel.style.minWidth = '120px';

    SUPPORTED.forEach(function (code) {
      var opt = doc.createElement('option');
      opt.value = code;
      opt.textContent = NAMES[code] || code;
      sel.appendChild(opt);
    });

    sel.addEventListener('change', function () { setLang(sel.value); });
    wrap.appendChild(sel);
    slot.appendChild(wrap);
  }

  // ---- 链接重写：保留 lang，去重去 %3F（站内相对链接）----
  function normalizeUrl(u, lang) {
    if (/^\?%3F/i.test(u.search)) u.search = '?' + u.search.replace(/^\?%3F/i, '');
    if (/^\?%253F/i.test(u.search)) u.search = '?' + u.search.replace(/^\?%253F/i, '');
    u.searchParams.delete('lang');
    u.searchParams.set('lang', lang || getLang());
    return u.pathname + u.search + u.hash;
  }
  function rewriteLinks(lang) {
    lang = lang || getLang();
    var links = doc.querySelectorAll('a[href]');
    links.forEach(function (a) {
      var h = a.getAttribute('href');
      if (!h || h.startsWith('#') || /^https?:\/\//i.test(h)) return;
      try {
        var u = new URL(h, location.href);
        a.setAttribute('href', normalizeUrl(u, lang));
      } catch (e) {}
    });
  }

  // ---- 初始化 ----
  function init() {
    mountLangSelect();
    setLang(getLang(), { silent: true });
    applyI18N(getLang());
    rewriteLinks(getLang());

    // 浏览器前进后退时，保持语言同步
    win.addEventListener('popstate', function () {
      setLang(getLang(), { silent: true });
    });
  }

  // 暴露少量调试 API
  win.ps = win.ps || {};
  win.ps.i18n = { setLang: setLang, getLang: getLang, apply: applyI18N, rewrite: rewriteLinks, SUPPORTED: SUPPORTED };

  if (doc.readyState === 'loading') {
    doc.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})(window, document);
