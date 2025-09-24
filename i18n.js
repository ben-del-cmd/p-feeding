<!-- /i18n.js -->
<script>
/* Pet Scan i18n & link-preserver (single source of truth)
   - Forces one and only one ?lang=<xx>
   - Keeps links relative & clean (no ?? or %3F)
   - Small, framework-free
*/
(function () {
  const DEFAULT_LANG = 'en';
  // 当前按你的要求：英文、中文、西语、法语；可随时扩展
  const LABELS = [
    ['en','English'],
    ['es','Español'],
    ['zh','中文'],
    ['fr','Français'],
  ];
  const SUPPORTED = LABELS.map(([v])=>v);

  // 解析当前语言（URL → localStorage → 默认）
  const curUrl = new URL(location.href);
  let lang = curUrl.searchParams.get('lang');
  if (!lang || !SUPPORTED.includes(lang)) {
    const saved = localStorage.getItem('ps.lang');
    lang = (saved && SUPPORTED.includes(saved)) ? saved : DEFAULT_LANG;
  }
  // 把 lang 写回 URL（如果没有）
  if (!curUrl.searchParams.get('lang')) {
    curUrl.searchParams.set('lang', lang);
    history.replaceState(null, '', curUrl);
  }
  localStorage.setItem('ps.lang', lang);

  // 语言下拉（短款）
  const sel = document.querySelector('[data-role="lang-select"]');
  if (sel) {
    sel.innerHTML = LABELS.map(([v,t]) =>
      `<option value="${v}">${t}</option>`).join('');
    sel.value = lang;
    sel.addEventListener('change', e => {
      const next = e.target.value;
      localStorage.setItem('ps.lang', next);
      const u = new URL(location.href);
      u.searchParams.set('lang', next);
      rewriteLinks(next);
      location.href = u; // 直接跳到新语言
    });
  }

  // 只改站内链接：追加/更新 ?lang=，不产生 ?? 或 %3F
  function rewriteLinks(currentLang) {
    document.querySelectorAll('a[href]').forEach(a => {
      const h = a.getAttribute('href');
      if (!h || h.startsWith('#') || h.startsWith('mailto:') || h.startsWith('tel:')
          || /^https?:\/\//i.test(h)) return;
      const u = new URL(h, location.origin);
      u.searchParams.set('lang', currentLang);
      // 只写相对路径 + 查询 + hash，避免绝对地址
      a.setAttribute('href', `${u.pathname}${u.search}${u.hash}`);
    });
  }
  rewriteLinks(lang);

  // 暴露少量方法，便于 Console 自检
  window.psI18n = {
    getLang: () => lang,
    setLang: (v) => { if (sel) { sel.value=v; sel.dispatchEvent(new Event('change')); } },
    rewrite: rewriteLinks
  };
})();
</script>
