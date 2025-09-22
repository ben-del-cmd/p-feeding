/* /assets/js/events.js — 统一版 v20250922d
 * 功能：
 * - 自动修正“绝对路径”链接：把 <a href="/xxx"> 改成 "/{repo}/xxx"
 * - 自动上报页面级事件：visit_home / visit_feeding_page / visit_feedback_page
 * - 点击事件：calc_click / feedback_open / feedback_click
 * - 安全：Plausible 未加载时不报错；DEBUG 可在控制台查看
 */
'use strict';

const __DEBUG__ = false;

/* ---------- 公共：Plausible 安全封装 ---------- */
window.plausible = window.plausible || function () {
  (window.plausible.q = window.plausible.q || []).push(arguments);
};
function track(eventName, props = {}) {
  try {
    if (__DEBUG__) console.log('[track]', eventName, props);
    window.plausible && window.plausible(eventName, Object.keys(props).length ? { props } : undefined);
  } catch (_) {}
}

/* ---------- 计算项目根（支持 GitHub Pages 项目站） ---------- */
function getBase() {
  // 例如：/p-feeding/xxx.html  => base = "/p-feeding/"
  //       /                   => base = "/"
  const seg = (location.pathname || '/').split('/').filter(Boolean);
  return seg.length ? `/${seg[0]}/` : '/';
}
const BASE = getBase();

/* ---------- 链接修正：把以 "/" 开头且属于本站的链接改到项目根下 ---------- */
function rewriteAbsoluteLinks() {
  const as = document.querySelectorAll('a[href^="/"]');
  as.forEach(a => {
    try {
      const href = a.getAttribute('href') || '';
      // 绝对 URL（含协议）的直接跳过；非本站域名也跳过
      if (/^https?:\/\//i.test(href)) return;
      // 已经是正确的项目前缀，跳过
      if (href.startsWith(BASE)) return;
      // 404 页面返回按钮等也走这里
      a.setAttribute('href', BASE + href.replace(/^\//, ''));
      if (__DEBUG__) console.log('[rewrite]', href, '=>', a.getAttribute('href'));
    } catch (_) {}
  });
}

/* ---------- 页面级事件 ---------- */
function autoPageEvent() {
  const page = (document.querySelector('[data-page]') || {}).dataset?.page;
  if (!page) return;

  if (page === 'home') track('visit_home');
  if (page === 'feeding') track('visit_feeding_page');
  if (page === 'feedback') track('visit_feedback_page');
}

/* ---------- 点击事件绑定（按 ID 绑定；不存在则跳过） ---------- */
function bindClicks() {
  const byId = id => document.getElementById(id);

  // 计算器按钮
  const calcBtn = byId('calcBtn');
  if (calcBtn) {
    calcBtn.addEventListener('click', () => track('calc_click', { page: 'feeding' }), { passive: true });
  }

  // 反馈入口按钮
  const fbOpen = byId('feedbackOpen');
  if (fbOpen) {
    fbOpen.addEventListener('click', () => track('feedback_open'), { passive: true });
  }

  // 反馈提交按钮（如果有的话）
  const fbSubmit = byId('feedbackSubmit');
  if (fbSubmit) {
    fbSubmit.addEventListener('click', () => track('feedback_click'), { passive: true });
  }
}

/* ---------- 启动 ---------- */
window.addEventListener('DOMContentLoaded', () => {
  rewriteAbsoluteLinks();  // 先把链接修正，避免点击后 404
  bindClicks();
  autoPageEvent();
});
