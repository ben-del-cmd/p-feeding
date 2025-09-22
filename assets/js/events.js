/* /assets/js/events.js — 统一版 v20250922c */
/* 功能：
   - 自动识别页面并上报：visit_home / visit_feeding_page / visit_feedback_page
   - 统一绑定按钮点击：calc_click / feedback_open / feedback_click
   - 洗护结果页事件：wash_category_detected / wash_label_warning_view
   - 容错：Plausible 未加载、按钮/元素不存在时不报错
   - 同时暴露到 window.PS 便于非模块脚本调用
*/

'use strict';

/** 调试开关：需要时改为 true，可在控制台看到事件打印 */
const __DEBUG__ = false;

/** 安全触发 Plausible 事件 */
export function track(eventName, props = {}) {
  try {
    if (__DEBUG__) console.log('[PS.track]', eventName, props);
    if (window.plausible) window.plausible(eventName, { props });
  } catch (_) {
    /* no-op */
  }
}

/** 多选择器就近匹配（第一个匹配即用） */
function pick(selList = []) {
  for (const s of selList) {
    const el = document.querySelector(s);
    if (el) return el;
  }
  return null;
}

/** 页面类型判定（按路径名 + 数据属性双重兜底） */
function detectPage() {
  const p = (location.pathname || '').toLowerCase();
  const isHome = p === '/' || p.endsWith('/index.html') || !!document.querySelector('[data-page="home"]');
  const isFeed = p.endsWith('/feeding.html') || !!document.querySelector('[data-page="feeding"]');
  const isFeedback = p.endsWith('/feedback.html') || !!document.querySelector('[data-page="feedback"]');
  const isResult = p.includes('/result') || !!document.querySelector('[data-page="result"]');
  return { isHome, isFeed, isFeedback, isResult };
}

/** 基础访问事件（visit_*） */
function visitEvents() {
  const { isHome, isFeed, isFeedback } = detectPage();
  if (isHome) track('visit_home');
  if (isFeed) track('visit_feeding_page');
  if (isFeedback) track('visit_feedback_page');
}

/** 统一绑定点击事件（避免你改页面 DOM） */
function bindClicks() {
  // 计算按钮 → calc_click
  const calcBtn = pick([
    '#calcBtn', '.calc-btn', '[data-action="calculate"]', 'button[name="calculate"]'
  ]);
  calcBtn?.addEventListener('click', () => track('calc_click'), { passive: true });

  // 反馈打开 → feedback_open
  const feedbackOpen = pick([
    '#feedbackOpen', '.feedback-open', '[data-action="feedback-open"]'
  ]);
  feedbackOpen?.addEventListener('click', () => track('feedback_open'), { passive: true });

  // 反馈提交 → feedback_click
  const feedbackClick = pick([
    '#feedbackClick', '.feedback-click', '[data-action="feedback-click"]', 'form#fbForm button[type="submit"]'
  ]);
  feedbackClick?.addEventListener('click', () => track('feedback_click'), { passive: true });
}

/** 洗护：对外暴露的事件（结果页渲染逻辑中调用） */
export const WashEvents = {
  /** 监管类别：EPA / FDA / general / unknown */
  category: (c) => track('wash_category_detected', { category: String(c || 'unknown') }),
  /** 标签红线被查看 */
  warningView: () => track('wash_label_warning_view')
};

/** 同时挂到 window 以便非模块脚本调用（保险起见） */
window.PS = Object.assign(window.PS || {}, { track, WashEvents });

/** 启动：DOM 就绪后执行 */
document.addEventListener('DOMContentLoaded', () => {
  visitEvents();
  bindClicks();
});
