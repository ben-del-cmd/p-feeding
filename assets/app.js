// assets/app.js — 统一修正站内链接 + 保留/切换语言 + 防止“??%3F”与 404
(() => {
  // 识别项目根（如 /p-feeding/）
  const ROOT = (() => {
    const m = location.pathname.match(/^\/[^/]+\//);
    return m ? m[0] : '/';
  })();

  const getLang = () =>
    new URLSearchParams(location.search).get('lang') || 'en';

  // 允许的站内页面（文件名大小写不敏感）
  const ALLOWED = new Set([
    'index.html',
    'feeding.html',
    'feedback.html',
    'cards/transition-7.html',
  ]);

  // 把任意写法的站内链接 → 规范化为“项目内 + 带 lang”
  function normalizeHref(href) {
    if (!href) href = '';
    // 外链/锚点/电话/邮件放过
    if (/^(https?:|\/\/|mailto:|tel:|#)/i.test(href)) return href;

    // 去掉开头的 /，避免跑到域名根
    let s = href.replace(/^\/+/, '');
    let [path = '', q = ''] = s.split('?');

    // 目录或空路径 → index.html
    if (!path || path.endsWith('/')) path += 'index.html';

    // 容错：把 feeding / feedback / index 规范到 .html
    if (!ALLOWED.has(path.toLowerCase())) {
      if (/^feeding(\.html)?$/i.test(path)) path = 'feeding.html';
      else if (/^feedback(\.html)?$/i.test(path)) path = 'feedback.html';
      else if (/^index(\.html)?$/i.test(path)) path = 'index.html';
      else if (/^cards\/transition-7(\.html)?$/i.test(path))
        path = 'cards/transition-7.html';
    }

    // 重组查询串，强制只有一个 lang
    const sp = new URLSearchParams(q);
    sp.delete('lang');
    sp.set('lang', getLang());

    return ROOT + path + '?' + sp.toString();
  }

  // 批量重写页面中的 <a>
  function rewriteAllAnchors() {
    document.querySelectorAll('a[href]').forEach(a => {
      const fixed = normalizeHref(a.getAttribute('href') || '');
      a.setAttribute('href', fixed);
    });
  }

  // 捕获点击，兜住后续动态插入的链接
  function hookAnchorClicks() {
    document.addEventListener(
      'click',
      e => {
        const a = e.target.closest('a[href]');
        if (!a) return;
        const raw = a.getAttribute('href') || '';
        if (/^(https?:|\/\/|mailto:|tel:|#)/i.test(raw)) return;
        e.preventDefault();
        e.stopImmediatePropagation();
        location.href = normalizeHref(raw);
      },
      true
    ); // capture
  }

  // 当前相对路径（用于换语言后停留当前页）
  function currentRel() {
    let rel = location.pathname.slice(ROOT.length);
    if (!rel || rel.endsWith('/')) rel = 'index.html';
    return rel;
  }

  // 语言下拉：自动填充/默认选中/切换仅换 lang
  function setupLangSelect() {
    let sel = document.getElementById('lang');
    if (!sel) {
      sel = document.createElement('select');
      sel.id = 'lang';
      sel.style.position = 'fixed';
      sel.style.top = '16px';
      sel.style.right = '16px';
      sel.style.zIndex = '9999';
      document.body.appendChild(sel);
    }

    const LANGS = [
      ['en', 'English'],
      ['es', 'Español'],
      ['zh', '中文'],
      ['fr', 'Français'],
    ];

    if (!sel.options.length) {
      sel.innerHTML = LANGS.map(([v, t]) => `<option value="${v}">${t}</option>`).join('');
    }

    const cur = getLang();
    sel.value = LANGS.some(([v]) => v === cur) ? cur : 'en';

    sel.addEventListener(
      'change',
      ev => {
        ev.preventDefault();
        ev.stopImmediatePropagation();
        const next = sel.value;
        const rel = currentRel();
        const sp = new URLSearchParams(location.search);
        sp.set('lang', next);
        location.href = ROOT + rel + '?' + sp.toString();
      },
      true
    );
  }

  document.addEventListener('DOMContentLoaded', () => {
    setupLangSelect();
    rewriteAllAnchors();
    hookAnchorClicks();

    // 如果你的 i18n 库需要通知语言，在此回调
    try {
      if (window.I18N && typeof window.I18N.setLang === 'function') {
        window.I18N.setLang(getLang());
      }
    } catch {}
  });
})();
