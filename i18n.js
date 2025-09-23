<script>
/* Pet Scan · i18n runtime v20250922p
   - Keeps language across pages via ?lang=xx and localStorage('ps_lang')
   - Rewrites internal links to carry ?lang
   - Applies translations to [data-i18n] elements
*/

/* ===== 1) Languages & dictionary (keep your existing dictionary) ===== */
const PS_LANGS = {
  en: { label: 'English' },
  zh: { label: '中文' },
  ja: { label: '日本語' },
  ko: { label: '한국어' },
  es: { label: 'Español' },
  fr: { label: 'Français' },
};
/* 词典：沿用你之前版本（为了便于覆盖，这里只放结构；请保留你已填好的所有键值） */
const PS_I18N = window.PS_I18N || {
  /* 示例：
  title: { zh:'宠物喂食工具集', en:'Pet Feeding Tools', ja:'…', ko:'…', es:'…', fr:'…' },
  nav_home: { zh:'首页', en:'Home', … },
  … 其它键 …
  */
};

/* ===== 2) Helpers ===== */
const PS_STORE_KEY = 'ps_lang';

function ps_normLang(lang) {
  lang = String(lang || '').trim().toLowerCase();
  if (lang.includes('-')) lang = lang.split('-')[0];
  return PS_LANGS[lang] ? lang : 'en';
}

function ps_qsGet(name, url) {
  const u = new URL(url || location.href);
  return u.searchParams.get(name);
}

function ps_getInitialLang() {
  // 1) URL ?lang
  const fromUrl = ps_qsGet('lang');
  if (fromUrl) return ps_normLang(fromUrl);
  // 2) localStorage
  try {
    const fromStore = localStorage.getItem(PS_STORE_KEY);
    if (fromStore) return ps_normLang(fromStore);
  } catch {}
  // 3) navigator
  const nav = (navigator.language || (navigator.languages && navigator.languages[0]) || 'en');
  return ps_normLang(nav);
}

function ps_setUrlLang(lang) {
  const u = new URL(location.href);
  u.searchParams.set('lang', lang);
  history.replaceState(null, '', u.toString());
}

function ps_isInternal(href) {
  if (!href) return false;
  if (href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('#')) return false;
  try {
    const u = new URL(href, location.origin);
    return u.origin === location.origin;
  } catch { return false; }
}

/** 在页面上重写所有站内链接，附带 ?lang=xx */
function ps_rewriteLinks(lang) {
  document.querySelectorAll('a[href]').forEach(a => {
    const href = a.getAttribute('href');
    if (!ps_isInternal(href)) return;
    const u = new URL(href, location.origin);
    u.searchParams.set('lang', lang);
    a.href = u.pathname + (u.search ? '?' + u.searchParams.toString() : '') + (u.hash || '');
  });
}

/** 应用翻译到 [data-i18n] 元素 */
function ps_applyTexts(lang) {
  const fallbackOrder = [lang, 'en', 'zh']; // 缺词回退顺序
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const dict = PS_I18N[key] || {};
    for (const tryLang of fallbackOrder) {
      const txt = dict[tryLang];
      if (typeof txt === 'string') { el.textContent = txt; return; }
    }
  });
}

/** 同步右上角下拉/按钮的显示 */
function ps_syncLangControl(lang) {
  const sel = document.getElementById('langSelect') || document.getElementById('lang');
  if (!sel) return;

  // 如果是 <select>，重建选项并选中当前
  if (sel.tagName === 'SELECT') {
    if (!sel.dataset.built) {
      sel.innerHTML = '';
      // 排序：English 优先，其次 zh/ja/ko/es/fr（可按需调整）
      const order = ['en','zh','ja','ko','es','fr'];
      order.forEach(code => {
        if (!PS_LANGS[code]) return;
        const opt = document.createElement('option');
        opt.value = code;
        opt.textContent = PS_LANGS[code].label;
        sel.appendChild(opt);
      });
      sel.dataset.built = '1';
    }
    sel.value = lang;
  } else {
    // 非 select：显示当前语言名（按钮/伪下拉）
    sel.textContent = PS_LANGS[lang]?.label || lang.toUpperCase();
  }
}

/* ===== 3) Public: initI18n({ page }) ===== */
function initI18n({ page = '' } = {}) {
  const lang = ps_getInitialLang();

  // 保存 & 写回 URL
  try { localStorage.setItem(PS_STORE_KEY, lang); } catch {}
  ps_setUrlLang(lang);

  // 应用文案
  ps_applyTexts(lang);

  // 同步右上角控件
  ps_syncLangControl(lang);

  // 重写站内链接，保证跨页保持语言
  ps_rewriteLinks(lang);

  // 绑定语言切换
  const sel = document.getElementById('langSelect') || document.getElementById('lang');
  if (sel) {
    const handler = (ev) => {
      const newLang = ps_normLang(sel.value || sel.getAttribute('data-value') || sel.textContent);
      try { localStorage.setItem(PS_STORE_KEY, newLang); } catch {}
      ps_setUrlLang(newLang);
      ps_applyTexts(newLang);
      ps_syncLangControl(newLang);
      ps_rewriteLinks(newLang);
    };
    // select 用 change；按钮型可以也绑 click（即使是 select 也没关系）
    sel.addEventListener('change', handler);
    sel.addEventListener('click', handler);
  }

  // 保险：拦截点击，若发现站内链接未带 ?lang，则临时补上（极端情况下仍能保持）
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href]');
    if (!a) return;
    if (!ps_isInternal(a.getAttribute('href'))) return;
    const u = new URL(a.href, location.origin);
    if (!u.searchParams.get('lang')) {
      u.searchParams.set('lang', lang);
      a.href = u.toString();
    }
  });

  // 你可用来上报当前页面的 visit_* 事件（可选）
  try { if (window.track) {
    const map = { home:'visit_home', feeding:'visit_feeding_page', feedback:'visit_feedback_page', trans7:'visit_transition7_page' };
    if (map[page]) window.track(map[page]);
  }} catch {}
}

// 暴露到全局
window.initI18n = initI18n;
</script>
