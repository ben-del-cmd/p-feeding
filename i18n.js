<script>
// /p-feeding/i18n.js  — drop-in i18n controller (default en, persist, propagate)

(function () {
  // ---- 1) 配置与工具 ---------------------------------------------------------
  const SUPPORTED = ['en','zh','ja','ko','es','fr'];
  const ALIAS = {
    // 常见地区码归一
    'en-us':'en','en-gb':'en','en':'en',
    'zh-cn':'zh','zh-hans':'zh','zh':'zh','zh-tw':'zh',
    'es-es':'es','es-la':'es','es':'es',
    'fr-fr':'fr','fr':'fr',
    'ja-jp':'ja','ja':'ja',
    'ko-kr':'ko','ko':'ko'
  };
  const STORE_KEY = 'ps_lang';

  // 你的字典对象（沿用现有命名），示例保留：如果页面里已有 window.I18N_DICT 就用它
  // 这里不强塞字典，避免与你之前的键冲突
  const DICT = (window.I18N_DICT || {});

  // 解析 URL 参数
  function getQueryLang() {
    const p = new URL(location.href).searchParams.get('lang');
    return p ? normalize(p) : null;
  }
  function normalize(code) {
    const k = String(code || '').toLowerCase();
    return ALIAS[k] || (SUPPORTED.includes(k) ? k : null);
  }

  // 本地存取
  function getSaved() { return normalize(localStorage.getItem(STORE_KEY)); }
  function save(lang) { try{ localStorage.setItem(STORE_KEY, lang); }catch(e){} }

  // 当前语言：优先 query > 本地 > 默认(en)
  let current = getQueryLang() || getSaved() || 'en';

  // 兜底：如果 query 和本地都是无效值，强制 en
  if (!SUPPORTED.includes(current)) current = 'en';
  save(current);

  // ---- 2) 链接传播：给站内所有链接加上 ?lang=xx ------------------------------
  function isExternal(href) {
    return /^(https?:)?\/\//i.test(href) || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:');
  }
  function rewriteInternalLinks(lang) {
    const as = document.querySelectorAll('a[href]');
    as.forEach(a => {
      const raw = a.getAttribute('href');
      if (!raw || raw.startsWith('#') || isExternal(raw) || a.hasAttribute('data-ignore-lang')) return;

      // 以当前页面为基准解析相对链接
      const u = new URL(raw, location.href);
      u.searchParams.set('lang', lang);
      a.setAttribute('href', u.pathname + u.search + u.hash);
    });
  }

  // ---- 3) 文案渲染：按 data-i18n 键替换文本（如果你已配好字典） -------------------
  function t(key) {
    const pack = DICT[current] || {};
    // 简易取值：支持 a.b.c
    return key.split('.').reduce((acc, k) => (acc && acc[k] != null ? acc[k] : null), pack);
  }
  function applyI18n() {
    // 把 data-i18n 的元素替换为目标语言
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const val = t(key);
      if (val == null) return; // 找不到就不动
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        if (el.placeholder !== undefined) el.placeholder = val;
      } else {
        el.innerText = val;
      }
    });
    // 同步 <html lang="...">
    document.documentElement.setAttribute('lang', current);
  }

  // ---- 4) 下拉控件：如果没放，自动注入；有的话接管 change 事件 -------------------
  function ensureDropdown() {
    // 先找页面现成的 select
    let sel = document.querySelector('select#langSelect');
    if (!sel) {
      // 自动插一个到导航右侧
      const nav = document.querySelector('header .nav, header nav, nav') || document.querySelector('header');
      if (nav) {
        sel = document.createElement('select');
        sel.id = 'langSelect';
        sel.style.cssText = 'margin-left:12px;padding:6px 10px;border-radius:12px;background:#111827;color:#e5e7eb;border:1px solid rgba(255,255,255,.15)';
        SUPPORTED.forEach(code => {
          const opt = document.createElement('option');
          opt.value = code;
          opt.textContent = {
            en:'English', zh:'中文', ja:'日本語', ko:'한국어', es:'Español', fr:'Français'
          }[code] || code.toUpperCase();
          sel.appendChild(opt);
        });
        nav.appendChild(sel);
      }
    }
    if (sel) {
      sel.value = current;
      sel.onchange = () => setLanguage(sel.value);
    }
  }

  // ---- 5) 设置语言：保存、渲染、改链接、更新地址栏 -----------------------------
  function setLanguage(lang) {
    const next = normalize(lang) || 'en';
    current = next;
    save(next);
    applyI18n();
    rewriteInternalLinks(next);

    // 可选：把地址栏也同步为 ?lang=xx（保持可分享性）
    const u = new URL(location.href);
    u.searchParams.set('lang', next);
    history.replaceState({}, '', u.pathname + u.search + u.hash);

    // 如果有选择器，同步显示值
    const sel = document.querySelector('select#langSelect');
    if (sel && sel.value !== next) sel.value = next;
  }

  // ---- 6) 入口：DOM 就绪后执行一次 -------------------------------------------
  document.addEventListener('DOMContentLoaded', () => {
    // 如果地址栏有 lang=xx，但和 localStorage 不同，以 URL 为准并存下
    const q = getQueryLang();
    if (q && q !== current) { current = q; save(q); }

    ensureDropdown();
    applyI18n();
    rewriteInternalLinks(current);
  });

  // 暴露几个方法（可选）
  window.i18n = {
    get: () => current,
    set: setLanguage,
    apply: applyI18n,
    rewriteLinks: rewriteInternalLinks
  };
})();
</script>
