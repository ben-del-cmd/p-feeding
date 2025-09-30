/* assets/app.js — route-safe links + lang persistence + i18n apply */
(() => {
  'use strict';

  // ---- project root (e.g. "/p-feeding/") ----
  const ROOT = (() => {
    const m = location.pathname.match(/^\/[^/]+\//);
    return m ? m[0] : '/';
  })();

  // ---- allowed in-site pages (case-insensitive) ----
  const ALLOWED = new Set([
    'index.html',
    'feeding.html',
    'feedback.html',
    'cards/transition-7.html',
  ]);

  const isInSite = (href) => {
    try {
      const u = new URL(href, location.origin);
      if (!u.pathname.startsWith(ROOT)) return false;
      const name = u.pathname.slice(ROOT.length).toLowerCase();
      return ALLOWED.has(name);
    } catch { return false; }
  };

  const getLang = () => (window.I18N && I18N.getLang ? I18N.getLang() : 'en');
  const setLang = (lang) => {
    if (window.I18N && I18N.setLang) I18N.setLang(lang);
    // 同步所有内链的 ?lang
    syncLinks(lang);
  };

  function syncLinks(lang = getLang()) {
    document.querySelectorAll('a[href]').forEach(a => {
      const href = a.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('mailto:')) return;
      if (!isInSite(href)) return;

      const u = new URL(href, location.origin);
      u.searchParams.set('lang', lang);
      a.setAttribute('href', u.pathname + u.search);
    });
  }

  function buildLangSelect(sel) {
    if (!sel || !window.I18N || !I18N.LANGS) return;
    const langNow = getLang();
    // 清空 & 重建
    sel.innerHTML = '';
    for (const [code, label] of Object.entries(I18N.LANGS)) {
      const opt = document.createElement('option');
      opt.value = code;
      opt.textContent = label;
      sel.appendChild(opt);
    }
    sel.value = langNow;
    sel.addEventListener('change', () => setLang(sel.value));
  }

  // ---- boot ----
  document.addEventListener('DOMContentLoaded', () => {
    // i18n 应用
    if (window.I18N && I18N.apply) I18N.apply(getLang());
    // 语言选择器
    buildLangSelect(document.getElementById('langSelect'));
    // 同步内链参数
    syncLinks(getLang());
  });
})();
