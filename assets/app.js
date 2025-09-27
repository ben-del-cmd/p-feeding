// assets/app.js
// 统一页内导航 + 语言保留 + 路径规范化（无“??%3F”/嵌套路径）

(() => {
  const PROJECT = 'p-feeding';
  const segs = location.pathname.split('/').filter(Boolean);
  const idx = segs.indexOf(PROJECT);
  const ROOT = idx >= 0 ? '/' + segs.slice(0, idx + 1).join('/') + '/' : '/';

  const PAGES = new Set([
    'index.html',
    'feeding.html',
    'cards/transition-7.html',
    'feedback.html',
  ]);

  const LANGS = ['en', 'es', 'zh', 'fr'];
  const DEF_LANG = 'en';

  function getLang() {
    const sp = new URLSearchParams(location.search);
    const lang = (sp.get('lang') || DEF_LANG).toLowerCase();
    return LANGS.includes(lang) ? lang : DEF_LANG;
  }
  let CURRENT_LANG = getLang();

  // 对所有内部链接（干净路径）自动追加 ?lang
  function rewriteInternalLinks() {
    const anchors = document.querySelectorAll('a[href]');
    anchors.forEach((a) => {
      try {
        const u = new URL(a.getAttribute('href'), location.origin);
        // 只处理指向本项目根下、且目标是允许页面
        if (u.origin === location.origin && u.pathname.startsWith(ROOT)) {
          // 获取相对 ROOT 的路径
          const rel = u.pathname.slice(ROOT.length);
          // 允许页面：形如 "cards/transition-7.html" 或 "index.html"
          if (PAGES.has(rel)) {
            u.searchParams.set('lang', CURRENT_LANG);
            a.href = u.pathname + '?' + u.searchParams.toString();
          }
        }
      } catch (_) {
        // 忽略无效链接
      }
    });
  }

  // 语言下拉：同步当前值 & 变更时刷新当前页
  function setupLangSelect() {
    const sel = document.getElementById('lang-select');
    if (!sel) return;

    // 如果页面里没写选项，这里补齐（值固定 en/es/zh/fr）
    if (!sel.options.length) {
      const labels = {
        en: 'English',
        es: 'Español',
        zh: '中文',
        fr: 'Français',
      };
      LANGS.forEach((l) => {
        const opt = document.createElement('option');
        opt.value = l;
        opt.textContent = labels[l] || l;
        sel.appendChild(opt);
      });
    }

    // 设置当前选中
    sel.value = CURRENT_LANG;

    // 变更语言：保持路径不变，只替换 lang
    sel.addEventListener('change', () => {
      const newLang = sel.value;
      if (!LANGS.includes(newLang)) return;
      CURRENT_LANG = newLang;

      const u = new URL(location.href);
      u.searchParams.set('lang', CURRENT_LANG);
      location.href = u.pathname + '?' + u.searchParams.toString();
    });
  }

  // i18n：把 data-i18n / data-i18n-placeholder 生效
  function applyI18n() {
    if (!window.I18N || !window.I18N.t) return;
    const t = window.I18N.t;

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const k = el.getAttribute('data-i18n');
      const text = t(k, CURRENT_LANG);
      if (text != null) el.textContent = text;
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const k = el.getAttribute('data-i18n-placeholder');
      const text = t(k, CURRENT_LANG);
      if (text != null) el.setAttribute('placeholder', text);
    });
  }

  // 对当前页的“返回首页”等按钮进行路径规范化（可选，已有 rewriteInternalLinks 基本够用）
  function ensureKeyButtons() {
    const map = {
      '#to-home': 'index.html',
      '#to-calc': 'feeding.html',
      '#to-card': 'cards/transition-7.html',
      '#to-feedback': 'feedback.html',
    };
    Object.entries(map).forEach(([sel, page]) => {
      const btn = document.querySelector(sel);
      if (btn && btn.tagName === 'A') {
        const u = new URL(ROOT + page, location.origin);
        u.searchParams.set('lang', CURRENT_LANG);
        btn.href = u.pathname + '?' + u.searchParams.toString();
      }
    });
  }

  // 对外导出（便于页面脚本需要语言）
  window.appGetLang = () => CURRENT_LANG;
  window.appGetRoot = () => ROOT;

  // 启动
  document.addEventListener('DOMContentLoaded', () => {
    setupLangSelect();
    applyI18n();
    rewriteInternalLinks();
    ensureKeyButtons();
  });
})();
