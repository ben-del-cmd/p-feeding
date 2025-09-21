// /p-feeding/events.js
(function () {
  // 安全调用 plausible（不报错）
  function track(name, props) {
    try {
      if (typeof window.plausible === 'function') {
        window.plausible(name, props || undefined);
      }
    } catch (e) {}
  }

  function bindFeedbackClick() {
    // 两种选择器都兼容：a 链接、或手动加 data-event="feedback_click"
    var nodes = document.querySelectorAll(
      'a[href$="/p-feeding/feedback.html"], [data-event="feedback_click"]'
    );
    nodes.forEach(function (el) {
      // 避免重复绑定
      if (el.__pf_bound) return;
      el.__pf_bound = true;

      el.addEventListener('click', function () {
        track('feedback_click');
      });
    });
  }

  function maybeFireFeedbackOpen() {
    // 反馈页 <body data-page-feedback>
    if (document.body && document.body.hasAttribute('data-page-feedback')) {
      track('feedback_open');
    }
  }

  function init() {
    bindFeedbackClick();
    maybeFireFeedbackOpen();
  }

  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    init();
  } else {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  }
})();
