/* i18n.js — 语言梯队 + 英文永远第一（默认/优先/兜底）+ 跨页保留 + 点击拦截修复坏链接 */
(function () {
  /* --- 语言梯队与顺序（英文第一）--- */
  // 按你之前的排序：Tier1 英文 → Tier2 中文 → Tier3 其它
  var TIER_ORDER = ['en', 'zh', 'ja', 'fr', 'es', 'de', 'ko', 'it', 'pt', 'ru'];

  // 实际展示的语言（此处默认全开；若要暂时只开中英，改成 ['en','zh'] 即可）
  var ENABLED_LANGS = TIER_ORDER.slice();

  // 下拉显示名称
  var LANG_LABELS = {
    en:'English', zh:'中文', ja:'日本語', fr:'Français', es:'Español',
    de:'Deutsch', ko:'한국어', it:'Italiano', pt:'Português', ru:'Русский'
  };

  /* --- 文案词典（其余语言会自动回退英文）--- */
  var DICT = {
    en: {
      "nav.home":"Home","nav.calculator":"Calculator","nav.transition7":"7-Day Switch","nav.feedback":"Feedback",
      "home.hero.title":"Turn pet food labels into simple, actionable feeding.",
      "home.hero.subtitle":"Scan → unify terms (ME, GA, as-fed/DM) → personalized portions → smooth transition → reorder.",
      "home.cta.open_calculator":"Open Calculator","home.cta.view_transition_card":"View 7-Day Card",
      "legal.info_boundary":"Informational only. Not medical advice.","legal.data_use":"We use anonymous analytics to improve features.",
      "footer.disclaimer":"For diet/medical questions, consult your veterinarian.",
      "feeding.title":"Feeding Calculator","feeding.pet_type.label":"Pet","feeding.pet_type.dog":"Dog","feeding.pet_type.cat":"Cat",
      "feeding.weight.label":"Weight","feeding.weight.placeholder":"Enter weight","feeding.unit.label":"Unit","feeding.unit.kg":"kg","feeding.unit.lb":"lb",
      "feeding.activity.label":"Activity","feeding.activity.resting":"Resting","feeding.activity.normal":"Normal","feeding.activity.active":"Active",
      "feeding.kcal_per_cup.label":"kcal per cup","feeding.kcal_per_cup.placeholder":"e.g., 350",
      "feeding.grams_per_cup.label":"grams per cup","feeding.grams_per_cup.placeholder":"e.g., 110",
      "feeding.formula.note":"RER = 70 × weight^0.75; MER = RER × activity.","feeding.calculate":"Calculate",
      "feeding.result.title":"Result","feeding.result.kcal":"Daily energy:","feeding.result.cups":"Cups/day:","feeding.result.grams":"Grams/day:",
      "feeding.result.tip":"Split into 2–3 meals. Adjust with weight trend.","feeding.result.view_transition_card":"View 7-Day Transition Card",
      "transition.title":"7-Day Transition Card",
      "transition.day1.title":"Day 1","transition.day1.txt":"75% current food / 25% new food",
      "transition.day2.title":"Day 2","transition.day2.txt":"70% / 30%","transition.day3.title":"Day 3","transition.day3.txt":"60% / 40%",
      "transition.day4.title":"Day 4","transition.day4.txt":"50% / 50%","transition.day5.title":"Day 5","transition.day5.txt":"40% / 60%",
      "transition.day6.title":"Day 6","transition.day6.txt":"25% / 75%","transition.day7.title":"Day 7","transition.day7.txt":"0% / 100%",
      "feedback.title":"Send Feedback","feedback.type.label":"Type","feedback.type.bug":"Bug","feedback.type.idea":"Idea","feedback.type.other":"Other",
      "feedback.text.label":"Your message","feedback.text.placeholder":"Tell us what happened...","feedback.send":"Send",
      "404.title":"Page not found","404.subtitle":"This page doesn't exist. Let's get you back.","404.back_home":"Back to Home"
    },
    zh: {
      "nav.home":"首页","nav.calculator":"喂食计算器","nav.transition7":"7天换粮卡","nav.feedback":"反馈",
      "home.hero.title":"把宠物食品标签变成可执行的喂食建议。","home.hero.subtitle":"扫描→统一口径→个性化喂量→平滑换粮→补货闭环。",
      "home.cta.open_calculator":"打开计算器","home.cta.view_transition_card":"查看7天换粮卡",
      "legal.info_boundary":"仅供信息参考；不构成医疗建议。","legal.data_use":"我们使用匿名分析以改进功能。",
      "footer.disclaimer":"如涉及处方/疾病，请咨询兽医。",
      "feeding.title":"喂食计算器","feeding.pet_type.label":"宠物","feeding.pet_type.dog":"犬","feeding.pet_type.cat":"猫",
      "feeding.weight.label":"体重","feeding.weight.placeholder":"输入体重","feeding.unit.label":"单位","feeding.unit.kg":"千克","feeding.unit.lb":"磅",
      "feeding.activity.label":"活动水平","feeding.activity.resting":"静息","feeding.activity.normal":"日常","feeding.activity.active":"活跃",
      "feeding.kcal_per_cup.label":"每杯千卡","feeding.kcal_per_cup.placeholder":"如：350",
      "feeding.grams_per_cup.label":"每杯克重","feeding.grams_per_cup.placeholder":"如：110",
      "feeding.formula.note":"RER = 70 × 体重^0.75；MER = RER × 活动因子。","feeding.calculate":"计算",
      "feeding.result.title":"结果","feeding.result.kcal":"每日能量：","feeding.result.cups":"杯/天：","feeding.result.grams":"克/天：",
      "feeding.result.tip":"建议分2–3餐；随体重趋势调整。","feeding.result.view_transition_card":"查看7天换粮卡",
      "transition.title":"7天换粮卡","transition.day1.title":"第1天","transition.day1.txt":"75% 旧粮 / 25% 新粮",
      "transition.day2.title":"第2天","transition.day2.txt":"70% / 30%","transition.day3.title":"第3天","transition.day3.txt":"60% / 40%",
      "transition.day4.title":"第4天","transition.day4.txt":"50% / 50%","transition.day5.title":"第5天","transition.day5.txt":"40% / 60%",
      "transition.day6.title":"第6天","transition.day6.txt":"25% / 75%","transition.day7.title":"第7天","transition.day7.txt":"0% / 100%",
      "feedback.title":"反馈","feedback.type.label":"类型","feedback.type.bug":"问题","feedback.type.idea":"想法","feedback.type.other":"其他",
      "feedback.text.label":"你的留言","feedback.text.placeholder":"描述问题或建议…","feedback.send":"发送",
      "404.title":"页面未找到","404.subtitle":"该页面不存在。我们带你返回。","404.back_home":"返回首页"
    }
  };

  /* ---------- 核心工具 ---------- */
  function normalizeLang(code){
    // 无论什么情况，英文是第一优先；非法/未启用直接归为 'en'
    if (!code || ENABLED_LANGS.indexOf(code) === -1) return 'en';
    return code;
  }
  function getLang(){
    try{
      var u = new URL(location.href);
      return normalizeLang(u.searchParams.get('lang') || localStorage.getItem('lang') || document.documentElement.getAttribute('lang'));
    }catch(e){ return 'en'; }
  }
  function setLang(l, reload){
    l = normalizeLang(l);
    try{
      localStorage.setItem('lang', l);
      document.documentElement.setAttribute('lang', l);
      var u = new URL(location.href);
      u.searchParams.set('lang', l);
      reload ? location.href = u.toString() : history.replaceState(null, '', u.toString());
    }catch(e){}
  }
  function t(k,l){
    l = normalizeLang(l || getLang());
    if (DICT[l] && DICT[l][k] != null) return DICT[l][k];
    if (DICT.en && DICT.en[k] != null) return DICT.en[k]; // 永远回退英文
    return k;
  }
  function apply(root){
    var l = getLang();
    (root||document).querySelectorAll('[data-i18n]').forEach(function(el){
      var k = el.getAttribute('data-i18n'); if(k) el.textContent = t(k,l);
    });
    (root||document).querySelectorAll('[data-i18n-placeholder]').forEach(function(el){
      var k = el.getAttribute('data-i18n-placeholder'); if(k) try{ el.setAttribute('placeholder', t(k,l)); }catch(e){}
    });
  }

  function normalizeURL(u, l){
    // 清理被错误拼接的编码问号
    if (/^\?%3F/i.test(u.search))   u.search='?'+u.search.replace(/^\?%3F/i,'');
    if (/^\?%253F/i.test(u.search)) u.search='?'+u.search.replace(/^\?%253F/i,'');
    // 去重并设置 lang（英文永远作为默认/兜底）
    u.searchParams.delete('lang');
    u.searchParams.set('lang', normalizeLang(l));
    return u.pathname + u.search + u.hash;
  }

  function rewriteAllLinks(){
    var l = getLang();
    document.querySelectorAll('a[href]').forEach(function(a){
      var h=a.getAttribute('href');
      if(!h || h.startsWith('#') || /^https?:\/\//i.test(h)) return;
      var u=new URL(h, location.href);
      a.setAttribute('href', normalizeURL(u, l));
    });
  }

  // ★ 关键：点击时兜底拦截，强制修复坏链接，彻底杜绝 404
  function captureNav(){
    document.addEventListener('click', function(ev){
      var a = ev.target && ev.target.closest && ev.target.closest('a[href]');
      if(!a) return;
      var h=a.getAttribute('href');
      if(!h || h.startsWith('#') || /^https?:\/\//i.test(h)) return;

      var u = new URL(h, location.href);
      var qs = u.searchParams.toString();
      var duplicatedLang = /(^|&)lang=/.test(qs) && (qs.match(/(^|&)lang=/g)||[]).length > 1;
      var badEncoded = /^\?%3F/i.test(u.search) || /^\?%253F/i.test(u.search);

      if (duplicatedLang || badEncoded) {
        ev.preventDefault();
        location.href = normalizeURL(u, getLang());
      }
    }, true);
  }

  function mountLangUI(){
    if(document.querySelector('.ps-lang-select')) return;
    var host=document.getElementById('lang-slot')||document.querySelector('header nav')||document.body;
    var wrap=document.createElement('div'); wrap.className='ps-lang-select';
    wrap.style.cssText='position:fixed;right:16px;top:16px;z-index:9999;';
    var sel=document.createElement('select'); sel.setAttribute('aria-label','Language');

    // 按梯队顺序生成（英文必在第一位）
    ENABLED_LANGS.forEach(function(code){
      var opt=document.createElement('option'); opt.value=code; opt.textContent=LANG_LABELS[code]||code; sel.appendChild(opt);
    });

    try{ sel.value=getLang(); }catch(e){}
    sel.addEventListener('change', function(e){ setLang(e.target.value, true); });

    wrap.appendChild(sel);
    host.parentNode.insertBefore(wrap, host.nextSibling||host);
  }

  // 对外
  window.ps = window.ps || {};
  ps.i18n = { t:t, apply:apply, setLang:setLang, getLang:getLang };

  // 启动：若 URL 没有 lang 或非法 → 立即写回英文优先
  (function ensureLang(){
    var u=new URL(location.href);
    var cur=normalizeLang(u.searchParams.get('lang')||localStorage.getItem('lang'));
    if (!u.searchParams.get('lang') || cur!==u.searchParams.get('lang')) {
      u.searchParams.set('lang', cur||'en');
      history.replaceState(null,'',u.toString());
    }
    document.documentElement.setAttribute('lang', cur||'en');
    localStorage.setItem('lang', cur||'en');
  })();

  document.addEventListener('DOMContentLoaded', function(){
    apply(); rewriteAllLinks(); captureNav(); mountLangUI();
  });
  document.addEventListener('ps:i18n:refresh', function(){
    apply(); rewriteAllLinks();
  });
})();
