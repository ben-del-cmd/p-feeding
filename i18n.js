<!-- 放在仓库根：/i18n.js -->
<script>
// Minimal i18n helper for p-feeding
(function (w, d) {
  const LANGS = [
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' },
    { code: 'zh', label: '中文' },
    { code: 'fr', label: 'Français' },
  ];

  const i18n = {
    getLang() {
      const p = new URLSearchParams(location.search);
      const lang = (p.get('lang') || '').toLowerCase();
      const ok = LANGS.some(l => l.code === lang);
      return ok ? lang : 'en';
    },
    setLang(newLang) {
      const url = new URL(location.href);
      url.searchParams.set('lang', newLang);
      location.href = url.toString();
    },
    // 给所有站内链接追加/合并 ?lang
    applyLangToLinks() {
      const lang = this.getLang();
      const anchors = d.querySelectorAll('a[href]');
      anchors.forEach(a => {
        const href = a.getAttribute('href');
        if (!href) return;

        // 忽略外链 & 锚点 & 协议式链接
        if (/^https?:\/\//i.test(href) || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;

        // 构造相对 URL，合并 lang
        const url = new URL(href, location.origin);
        // 保持相对路径（不把相对路径转绝对写回去）
        const rel = href;

        const u = new URL(rel, location.href);
        // 仅对本仓库内页面处理
        const sameOrigin = u.origin === location.origin;
        if (!sameOrigin) return;

        const params = new URLSearchParams(u.search);
        params.set('lang', lang);
        // 不重新拼 ?，让浏览器去做
        const out = u.pathname + '?' + params.toString() + (u.hash || '');
        a.setAttribute('href', out);
      });
    },
    // 填充右上角语言选择
    mountSelect() {
      // 允许 select id="lang" 或 data-role="lang"
      const sel = d.querySelector('select#lang, select[data-role="lang"]');
      if (!sel) return;

      sel.innerHTML = ''; // 清空再填
      LANGS.forEach(({ code, label }) => {
        const opt = d.createElement('option');
        opt.value = code;
        opt.textContent = label;
        sel.appendChild(opt);
      });

      // 选中当前
      sel.value = this.getLang();

      // 变化时切换
      sel.addEventListener('change', () => this.setLang(sel.value));
    },
    init() {
      this.mountSelect();
      this.applyLangToLinks();
    }
  };

  w.ps = w.ps || {};
  w.ps.i18n = i18n;

  // DOM 就绪后自动跑
  if (d.readyState === 'loading') {
    d.addEventListener('DOMContentLoaded', () => i18n.init());
  } else {
    i18n.init();
  }
})(window, document);
</script>
