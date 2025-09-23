<script>
// i18n.js — drop-in replacement (EN/ZH), supports data-i18n / data-i18n-placeholder
(function () {
  var DICT = {
    en: {
      "nav.home": "Home",
      "nav.calculator": "Calculator",
      "nav.transition7": "7-Day Switch",
      "nav.feedback": "Feedback",

      "home.hero.title": "Turn pet food labels into simple, actionable feeding.",
      "home.hero.subtitle": "Scan → unify terms → personalized portions → smooth transition → reorder.",
      "home.cta.open_calculator": "Open Calculator",
      "home.cta.view_transition_card": "View 7-Day Card",

      "legal.info_boundary": "Informational only. Not medical advice.",
      "legal.data_use": "We use anonymous analytics to improve features.",
      "footer.disclaimer": "For diet/medical questions, consult your veterinarian.",

      "feeding.title": "Feeding Calculator",
      "feeding.pet_type.label": "Pet",
      "feeding.pet_type.dog": "Dog",
      "feeding.pet_type.cat": "Cat",
      "feeding.weight.label": "Weight",
      "feeding.weight.placeholder": "Enter weight",
      "feeding.unit.label": "Unit",
      "feeding.unit.kg": "kg",
      "feeding.unit.lb": "lb",
      "feeding.activity.label": "Activity",
      "feeding.activity.resting": "Resting",
      "feeding.activity.normal": "Normal",
      "feeding.activity.active": "Active",
      "feeding.kcal_per_cup.label": "kcal per cup",
      "feeding.kcal_per_cup.placeholder": "e.g., 350",
      "feeding.grams_per_cup.label": "grams per cup",
      "feeding.grams_per_cup.placeholder": "e.g., 110",
      "feeding.formula.note": "RER = 70 × weight^0.75; MER = RER × activity.",
      "feeding.calculate": "Calculate",
      "feeding.result.title": "Result",
      "feeding.result.kcal": "Daily energy:",
      "feeding.result.cups": "Cups/day:",
      "feeding.result.grams": "Grams/day:",
      "feeding.result.tip": "Split into 2–3 meals. Adjust with weight trend.",
      "feeding.result.view_transition_card": "View 7-Day Transition Card",

      "transition.title": "7-Day Transition Card",
      "transition.day1.title": "Day 1", "transition.day1.txt": "75% current food / 25% new food",
      "transition.day2.title": "Day 2", "transition.day2.txt": "70% / 30%",
      "transition.day3.title": "Day 3", "transition.day3.txt": "60% / 40%",
      "transition.day4.title": "Day 4", "transition.day4.txt": "50% / 50%",
      "transition.day5.title": "Day 5", "transition.day5.txt": "40% / 60%",
      "transition.day6.title": "Day 6", "transition.day6.txt": "25% / 75%",
      "transition.day7.title": "Day 7", "transition.day7.txt": "0% / 100%",

      "feedback.title": "Send Feedback",
      "feedback.type.label": "Type",
      "feedback.type.bug": "Bug",
      "feedback.type.idea": "Idea",
      "feedback.type.other": "Other",
      "feedback.text.label": "Your message",
      "feedback.text.placeholder": "Tell us what happened...",
      "feedback.send": "Send",

      "404.title": "Page not found",
      "404.subtitle": "This page doesn't exist. Let's get you back.",
      "404.back_home": "Back to Home"
    },
    zh: {
      "nav.home": "首页",
      "nav.calculator": "喂食计算器",
      "nav.transition7": "7天换粮卡",
      "nav.feedback": "反馈",

      "home.hero.title": "把宠物食品标签变成可执行的喂食建议。",
      "home.hero.subtitle": "扫描→统一口径→个性化喂量→平滑换粮→补货闭环。",
      "home.cta.open_calculator": "打开计算器",
      "home.cta.view_transition_card": "查看7天换粮卡",

      "legal.info_boundary": "仅供信息参考；不构成医疗建议。",
      "legal.data_use": "我们使用匿名分析以改进功能。",
      "footer.disclaimer": "如涉及处方/疾病，请咨询兽医。",

      "feeding.title": "喂食计算器",
      "feeding.pet_type.label": "宠物",
      "feeding.pet_type.dog": "犬",
      "feeding.pet_type.cat": "猫",
      "feeding.weight.label": "体重",
      "feeding.weight.placeholder": "输入体重",
      "feeding.unit.label": "单位",
      "feeding.unit.kg": "千克",
      "feeding.unit.lb": "磅",
      "feeding.activity.label": "活动水平",
      "feeding.activity.resting": "静息",
      "feeding.activity.normal": "日常",
      "feeding.activity.active": "活跃",
      "feeding.kcal_per_cup.label": "每杯千卡",
      "feeding.kcal_per_cup.placeholder": "如：350",
      "feeding.grams_per_cup.label": "每杯克重",
      "feeding.grams_per_cup.placeholder": "如：110",
      "feeding.formula.note": "RER = 70 × 体重^0.75；MER = RER × 活动因子。",
      "feeding.calculate": "计算",
      "feeding.result.title": "结果",
      "feeding.result.kcal": "每日能量：",
      "feeding.result.cups": "杯/天：",
      "feeding.result.grams": "克/天：",
      "feeding.result.tip": "建议分2–3餐；随体重趋势调整。",
      "feeding.result.view_transition_card": "查看7天换粮卡",

      "transition.title": "7天换粮卡",
      "transition.day1.title": "第1天", "transition.day1.txt": "75% 旧粮 / 25% 新粮",
      "transition.day2.title": "第2天", "transition.day2.txt": "70% / 30%",
      "transition.day3.title": "第3天", "transition.day3.txt": "60% / 40%",
      "transition.day4.title": "第4天", "transition.day4.txt": "50% / 50%",
      "transition.day5.title": "第5天", "transition.day5.txt": "40% / 60%",
      "transition.day6.title": "第6天", "transition.day6.txt": "25% / 75%",
      "transition.day7.title": "第7天", "transition.day7.txt": "0% / 100%",

      "feedback.title": "反馈",
      "feedback.type.label": "类型",
      "feedback.type.bug": "问题",
      "feedback.type.idea": "想法",
      "feedback.type.other": "其他",
      "feedback.text.label": "你的留言",
      "feedback.text.placeholder": "描述问题或建议…",
      "feedback.send": "发送",

      "404.title": "页面未找到",
      "404.subtitle": "该页面不存在。我们带你返回。",
      "404.back_home": "返回首页"
    }
  };

  function getLang() {
    try {
      var u = new URL(location.href);
      return u.searchParams.get('lang') || localStorage.getItem('lang') || document.documentElement.getAttribute('lang') || 'en';
    } catch (e) { return 'en'; }
  }
  function setLang(lang, withReload) {
    try {
      localStorage.setItem('lang', lang);
      document.documentElement.setAttribute('lang', lang);
      var u = new URL(location.href);
      u.searchParams.set('lang', lang);
      if (withReload) location.href = u.toString();
      else history.replaceState(null, '', u.toString());
    } catch (e) {}
  }

  function t(key, lang) {
    var L = lang || getLang();
    if (DICT[L] && DICT[L][key] != null) return DICT[L][key];
    // fallback to EN if missing
    if (DICT.en && DICT.en[key] != null) return DICT.en[key];
    return key; // last resort
  }

  function applyI18n(root) {
    var lang = getLang();
    (root || document).querySelectorAll('[data-i18n]').forEach(function (el) {
      var k = el.getAttribute('data-i18n');
      if (!k) return;
      var val = t(k, lang);
      // keep existing HTML? Most are plain text; use textContent to avoid injecting HTML accidentally
      el.textContent = val;
    });
    (root || document).querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      var k = el.getAttribute('data-i18n-placeholder');
      if (!k) return;
      var val = t(k, lang);
      try { el.setAttribute('placeholder', val); } catch (e) {}
    });
  }

  function mountLangUI() {
    // Avoid duplicate controls
    if (document.querySelector('.ps-lang-select')) return;
    var host = document.getElementById('lang-slot') || document.querySelector('header nav') || document.body;
    var wrap = document.createElement('div');
    wrap.className = 'ps-lang-select';
    wrap.style.cssText = 'float:right;margin:8px 0 0 12px;';
    wrap.innerHTML = '<select aria-label="Language"><option value="en">English</option><option value="zh">中文</option></select>';
    host.parentNode.insertBefore(wrap, host.nextSibling || host);
    var sel = wrap.querySelector('select');
    try { sel.value = getLang(); } catch(e){}
    sel.addEventListener('change', function (e) {
      setLang(e.target.value, true); // reload so URL携带?lang，并确保跨页一致
    });
  }

  function preserveLangOnLinks() {
    var lang = getLang();
    document.querySelectorAll('a[href^="/"],a[href^="./"],a[href^="../"],a[href^="index"],a[href^="feeding"],a[href^="cards"],a[href^="feedback"]').forEach(function(a){
      var href = a.getAttribute('href');
      if (!href || href.startsWith('#') || /^https?:\/\//i.test(href)) return;
      var url = new URL(href, location.href);
      var sp = url.searchParams;
      if (!sp.get('lang')) sp.set('lang', lang);
      url.search = sp.toString();
      a.setAttribute('href', url.pathname + (url.search ? '?' + url.search : '') + url.hash);
    });
  }

  // public API
  window.ps = window.ps || {};
  window.ps.i18n = { t: t, apply: applyI18n, setLang: setLang, getLang: getLang };

  document.addEventListener('DOMContentLoaded', function () {
    applyI18n();
    preserveLangOnLinks();
    mountLangUI();
  });

  // allow manual refresh
  document.addEventListener('ps:i18n:refresh', function () {
    applyI18n();
    preserveLangOnLinks();
  });

})();
</script>
