// /p-feeding/i18n.js
(function () {
  const allowed = ["en", "es", "zh", "fr"];
  const norm = (l) => {
    l = (l || "").toLowerCase().split("-")[0];
    return allowed.includes(l) ? l : "en";
  };

  // 1) 把历史上遗留的 ?? / %3Flang= 清理成标准 ?lang= 形式（不刷新）
  function sanitizeUrlOnce() {
    let href = location.href;
    const before = href;
    // 把 ?? 压成 ?
    href = href.replace(/\?\?+/g, "?");
    // 把路径里被编码进来的 %3Flang= 移到查询串
    href = href.replace(/%3Flang=/gi, "lang=");
    // 避免把 ?lang= 误拼在 path 里：index.html?lang=xx 再接相对链接时会当作基址的一部分
    // 我们只需要保证当前地址形如 ...index.html?lang=xx（或无查询）
    // 如果修正了就替换，不导航
    if (href !== before) history.replaceState(null, "", href);
  }

  function getLang() {
    const u = new URL(location.href);
    return norm(
      u.searchParams.get("lang") ||
        localStorage.getItem("ps.lang") ||
        navigator.language ||
        "en"
    );
  }

  function setLang(lang, { navigate = true } = {}) {
    lang = norm(lang);
    localStorage.setItem("ps.lang", lang);
    const u = new URL(location.href);
    u.searchParams.set("lang", lang);
    const fixed = u.toString().replace(/\?\?+/g, "?");
    if (navigate) location.href = fixed;
    return lang;
  }

  // 2) 只给**站内**超链接统一追加 lang（用 base=origin+pathname，绝不继承当前查询串，避免 ??）
  function applyToLinks(root = document) {
    const lang = getLang();
    root.querySelectorAll("a[href]").forEach((a) => {
      const href = a.getAttribute("href");
      if (!href || /^(https?:|mailto:|tel:|#)/i.test(href)) return;
      const base = location.origin + location.pathname; // 不带现有查询串
      const u = new URL(href, base);
      u.searchParams.set("lang", lang);
      // 只写回路径+查询，保持简洁
      a.setAttribute("href", u.pathname + (u.search || ""));
    });
  }

  function initSelector() {
    const sel = document.getElementById("ps-lang-select");
    if (!sel) return;
    sel.value = getLang();
    sel.onchange = () => setLang(sel.value);
  }

  function init() {
    sanitizeUrlOnce();
    initSelector();
    applyToLinks(document);
  }

  // 导出少量 API
  window.psI18n = { getLang, setLang, applyToLinks, allowed };

  document.addEventListener("DOMContentLoaded", init);
})();
