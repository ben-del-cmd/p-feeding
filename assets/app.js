// assets/app.js
// 统一站内链接 + 语言保留/切换；防止路径/参数错误（??%3F、重复 /p-feeding/）

(() => {
  // 自动识别仓库根（如 /p-feeding/），本地或根域下则为 /
  const segs = location.pathname.split('/').filter(Boolean);
  const ROOT = (segs.length && !segs[0].includes('.')) ? `/${segs[0]}/` : '/';

  // 当前相对路径（相对 ROOT）
  const CURRENT = (() => {
    let rel = location.pathname.startsWith(ROOT)
      ? location.pathname.slice(ROOT.length)
      : location.pathname.replace(/^\//, '');
    if (!rel || rel.endsWith('/')) rel += 'index.html';
    return rel;
  })();

  // 支持的页面（大小写不敏感）
  const ALLOWED = new Set([
    'index.html',
    'feeding.html',
    'cards/transition-7.html',
    'feedback.html',
  ]);

  const getLang = () =>
    new URLSearchParams(location.search).get('lang') || 'en';

  // 生成规范的站内 URL（自动保留/设置 lang；无多余 ? 或重复目录）
  const makeUrl = (page, lang) => {
    page = (page || 'index.html').replace(/^\/+/, '');
    const url = new URL(ROOT + page, location.origin);
    const qs = new URLSearchParams(location.search);
    qs.set('lang', lang || getLang());
    url.search = qs.toString();          // url.search 自带 '?'
    return url.pathname + url.search;    // 不再手动拼接 '?'
  };

  // 统一给导航/按钮赋链接
  const wireNav = () => {
    document.querySelectorAll('[data-page]').forEach(a => {
      a.setAttribute('href', makeUrl(a.getAttribute('data-page')));
    });
    document.querySelectorAll('[data-go]').forEach(btn => {
      btn.addEventListener('click', e => {
        e.preventDefault();
        location.assign(makeUrl(btn.getAttribute('data-go')));
      });
    });
  };

  // 语言下拉（English 第一）
  const LANG_OPTIONS = [
    ['en', 'English'],
    ['es', 'Español'],
    ['zh', '中文'],
    ['fr', 'Français'],
  ];

  const mountLang = () => {
    const sel = document.getElementById('lang-select');
    if (!sel) return;
    sel.innerHTML = LANG_OPTIONS
      .map(([v, t]) => `<option value="${v}">${t}</option>`)
      .join('');
    sel.value = getLang();
    sel.addEventListener('change', () => {
      location.assign(makeUrl(CURRENT, sel.value));
    });
  };

  // 执行
  mountLang();
  wireNav();

  // 安全兜底：避免异常路径落到 404
  if (!ALLOWED.has(CURRENT.toLowerCase())) {
    location.replace(makeUrl('index.html'));
  }
})();
