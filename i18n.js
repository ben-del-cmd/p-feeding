/* i18n.js · Pet Scan unified i18n · v20250922e
 * - Pages: home / feeding / feedback  (detect via <main data-page="...">)
 * - No HTML change required: we target existing IDs/selectors.
 * - Persist lang in localStorage('ps_lang'); default follows navigator.
 */

(function () {
  const VER = "v20250922e";

  // -----------------------------
  // 1) Dictionaries
  // -----------------------------
  const dict = {
    "zh-CN": {
      // Common / Nav
      nav_home: "首页",
      nav_feeding: "喂食计算器",
      nav_card7: "7天换粮卡",
      lang_toggle: "中/EN",
      footer_hint: "信息性建议（非医疗）",

      // HOME (index.html)
      home_title: "把难懂的标签 → 变成可执行建议",
      home_lead:
        "扫描/录入宠物食品与洗护信息，统一口径（ME、GA、as-fed/DM），秒出喂量/换粮卡；页面显式来源与时间戳。信息性建议，非医疗。",
      home_card1_title: "① 喂食计算器",
      home_card1_desc: "RER/MER → kcal/天 → 杯/克；支持混喂与零食占比提示。",
      home_card1_btn: "打开计算器",
      home_card2_title: "② 7 天换粮卡",
      home_card2_desc: "90/10 → 0/100 的过渡表，自动按能量密度换算。",
      home_card2_btn: "查看换粮卡",
      home_card3_title: "③ 意见反馈",
      home_card3_desc: "帮助我们提高命中率与解释易读性；导购披露保持中立。",
      home_card3_btn: "去反馈",
      home_metrics_hint:
        "指标监测：visit_home / visit_feeding_page / visit_feedback_page / feedback_open / calc_click / wash_*。",

      // FEEDING (feeding.html) — minimal hooks
      feeding_title: "喂食计算器",
      feeding_lead:
        "根据 RER/MER 计算日需能量与喂量，支持混喂与零食占比提示（信息性建议，非医疗）。",
      feeding_btn_calc: "计算",
      feeding_btn_reset: "重置",
      feeding_result_title: "结果",
      feeding_notice:
        "本页仅提供信息性建议；涉及处方/疾病请咨询兽医。",

      // FEEDBACK (feedback.html)
      fb_title: "意见反馈",
      fb_lead:
        "帮助我们提升命中率与解释易读性；导购披露保持中立。信息性建议，非医疗。",
      fb_form_title: "填写信息",
      fb_cat: "类别",
      fb_allow_contact: "是否允许联系你（可选）",
      fb_allow_no: "否",
      fb_allow_yes: "是",
      fb_brand: "品牌（可选）",
      fb_brand_ph: "例如：Brand A",
      fb_product: "产品/口味（可选）",
      fb_product_ph: "例如：Adult Chicken",
      fb_link: "相关链接/图片（可选）",
      fb_link_ph: "SKU/页面/图片链接",
      fb_desc: "详细描述（必填）",
      fb_desc_ph: "请尽量描述可复现的步骤或具体内容…",
      fb_desc_cnt_suffix: "字",
      fb_send: "发邮件",
      fb_copy: "复制反馈文本",
      fb_back: "返回首页",
      fb_copy_ok: "已复制到剪贴板 ✅",
      fb_copy_fail: "复制失败，请手动选择文本复制",
      fb_note:
        "我们默认会在匿名聚合层面使用反馈数据，只用于改善产品体验；若勾选允许联系，可能在必要时向你追问细节（不做营销）。",

      fb_right_title: "说明",
      fb_right_hit: "命中：识别正确、建议可用；欢迎补充你认为有价值的说明。",
      fb_right_mis:
        "识别错误/不一致：请尽量提供商品图、包装 GA、成分表或营养声明、能量密度等。",
      fb_right_ux: "可用性问题：例如页面加载、动线、名词理解、交互卡顿等。",
      fb_right_sug:
        "功能建议：比如混喂/周报/家庭协作/SDK 等优先级诉求。",
      fb_right_safety:
        "安全与边界：不提供医疗建议；涉及处方/疾病请咨询兽医。",
      fb_right_neutral:
        "中立性：广告与中立信息强隔离；如含推广链接，会显式披露。",
      fb_meta_prefix: "数据与中立披露已启用；时间戳 ",

      // Feedback categories (select options)
      fb_opt_hit: "命中",
      fb_opt_mismatch: "识别错误/不一致",
      fb_opt_ux: "可用性问题",
      fb_opt_suggest: "功能建议",
      fb_opt_other: "其他",
    },

    en: {
      // Common / Nav
      nav_home: "Home",
      nav_feeding: "Feeding Calculator",
      nav_card7: "7-Day Transition",
      lang_toggle: "EN/中",
      footer_hint: "Informational advice (not medical)",

      // HOME (index.html)
      home_title:
        "Turn confusing labels → into actionable advice",
      home_lead:
        "Scan/enter pet food & wash-care info, unify terms (ME, GA, as-fed/DM), output feeding amount/transition card in seconds; source & timestamp shown. Informational advice, not medical.",
      home_card1_title: "① Feeding Calculator",
      home_card1_desc:
        "RER/MER → kcal/day → cups/grams; supports mixed feeding & treat ratio hints.",
      home_card1_btn: "Open Calculator",
      home_card2_title: "② 7-Day Transition",
      home_card2_desc:
        "90/10 → 0/100 schedule, auto converts by energy density.",
      home_card2_btn: "View Card",
      home_card3_title: "③ Feedback",
      home_card3_desc:
        "Help improve hit rate & explanation readability; affiliate clearly disclosed.",
      home_card3_btn: "Give Feedback",
      home_metrics_hint:
        "Metrics: visit_home / visit_feeding_page / visit_feedback_page / feedback_open / calc_click / wash_*.",

      // FEEDING
      feeding_title: "Feeding Calculator",
      feeding_lead:
        "Calculate daily energy & feeding amount based on RER/MER; supports mixed feeding & treat ratio hints (informational, not medical).",
      feeding_btn_calc: "Calculate",
      feeding_btn_reset: "Reset",
      feeding_result_title: "Result",
      feeding_notice:
        "Informational advice only; consult a veterinarian for medical/ prescription needs.",

      // FEEDBACK
      fb_title: "Feedback",
      fb_lead:
        "Help us improve hit rate and explanation readability; affiliate disclosure remains neutral. Informational advice, not medical.",
      fb_form_title: "Fill in Details",
      fb_cat: "Category",
      fb_allow_contact: "Allow us to contact you (optional)",
      fb_allow_no: "No",
      fb_allow_yes: "Yes",
      fb_brand: "Brand (optional)",
      fb_brand_ph: "e.g., Brand A",
      fb_product: "Product/Flavor (optional)",
      fb_product_ph: "e.g., Adult Chicken",
      fb_link: "Related links/images (optional)",
      fb_link_ph: "SKU/page/image link",
      fb_desc: "Detailed description (required)",
      fb_desc_ph:
        "Describe reproducible steps or specifics as much as possible…",
      fb_desc_cnt_suffix: "chars",
      fb_send: "Send Email",
      fb_copy: "Copy Feedback Text",
      fb_back: "Back to Home",
      fb_copy_ok: "Copied to clipboard ✅",
      fb_copy_fail: "Copy failed, please select text manually",
      fb_note:
        "We use feedback at an anonymous aggregate level solely to improve the product. If contact is allowed, we may reach out for details (no marketing).",

      fb_right_title: "Notes",
      fb_right_hit:
        "Hit: correct recognition & useful advice; feel free to add valuable notes.",
      fb_right_mis:
        "Mismatch/Inconsistency: please provide pack GA, ingredient list or nutrition claim, energy density, or clear product images if possible.",
      fb_right_ux:
        "Usability: e.g., loading, navigation, terminology understanding, interaction lag, etc.",
      fb_right_sug:
        "Feature requests: e.g., mixed feeding/weekly report/family collaboration/SDK priority.",
      fb_right_safety:
        "Safety & boundary: no medical advice; consult a licensed vet for prescriptions/conditions.",
      fb_right_neutral:
        "Neutrality: strict separation between ads and content; affiliate is always disclosed.",
      fb_meta_prefix: "Disclosure enabled; timestamp ",

      // Feedback categories
      fb_opt_hit: "Hit",
      fb_opt_mismatch: "Mismatch/Inconsistency",
      fb_opt_ux: "Usability",
      fb_opt_suggest: "Feature Suggestion",
      fb_opt_other: "Other",
    },
  };

  // -----------------------------
  // 2) Lang state helpers
  // -----------------------------
  function getDefaultLang() {
    const saved = localStorage.getItem("ps_lang");
    if (saved && dict[saved]) return saved;
    const nav = (navigator.language || "zh-CN").toLowerCase();
    return nav.startsWith("zh") ? "zh-CN" : "en";
  }
  function setLang(lang) {
    if (!dict[lang]) lang = "zh-CN";
    localStorage.setItem("ps_lang", lang);
    document.documentElement.lang = lang;
    window.__PS_LANG__ = lang;
    applyAll();
    // 可选：统计语言切换
    try {
      window.plausible &&
        window.plausible("i18n_lang_change", { props: { lang } });
    } catch (e) {}
  }
  function t(key) {
    const lang = window.__PS_LANG__ || getDefaultLang();
    return (dict[lang] && dict[lang][key]) || (dict["zh-CN"][key] || key);
  }

  // -----------------------------
  // 3) DOM appliers per page
  // -----------------------------
  function applyNavCommon() {
    const homeA = document.querySelector('header .nav a[href="./"]');
    const feedA = document.querySelector('header .nav a[href="feeding.html"]');
    const cardA = document.querySelector(
      'header .nav a[href^="cards/transition-7.html"]'
    );
    const langBtn = document.getElementById("langToggle");

    if (homeA) homeA.textContent = t("nav_home");
    if (feedA) feedA.textContent = t("nav_feeding");
    if (cardA) cardA.textContent = t("nav_card7");
    if (langBtn) langBtn.textContent = t("lang_toggle");

    // 页脚提示（若存在）
    const footer = document.querySelector("footer");
    if (footer) {
      footer.innerHTML = `© <span class="mono">Pet Scan</span> · <span class="muted">${t(
        "footer_hint"
      )}</span>`;
    }
    document.title = document.title.replace(/\s·\s.*/,'') + ' · ' + t("footer_hint");
  }

  function applyHome() {
    const main = document.querySelector('main[data-page="home"]');
    if (!main) return;
    applyNavCommon();

    const h1 = main.querySelector("h1");
    const lead = main.querySelector(".lead");
    if (h1) h1.textContent = t("home_title");
    if (lead) lead.textContent = t("home_lead");

    // 三张卡片
    const cards = main.querySelectorAll(".grid .card");
    if (cards[0]) {
      const t0 = cards[0].querySelector("h3");
      const p0 = cards[0].querySelector("p");
      const a0 = cards[0].querySelector("a.btn");
      if (t0) t0.textContent = t("home_card1_title");
      if (p0) p0.textContent = t("home_card1_desc");
      if (a0) a0.textContent = t("home_card1_btn");
    }
    if (cards[1]) {
      const t1 = cards[1].querySelector("h3");
      const p1 = cards[1].querySelector("p");
      const a1 = cards[1].querySelector("a.btn");
      if (t1) t1.textContent = t("home_card2_title");
      if (p1) p1.textContent = t("home_card2_desc");
      if (a1) a1.textContent = t("home_card2_btn");
    }
    if (cards[2]) {
      const t2 = cards[2].querySelector("h3");
      const p2 = cards[2].querySelector("p");
      const a2 = cards[2].querySelector("a.btn");
      if (t2) t2.textContent = t("home_card3_title");
      if (p2) p2.textContent = t("home_card3_desc");
      if (a2) a2.textContent = t("home_card3_btn");
    }

    // 指标行（如存在）
    const metrics = main.querySelector(".muted");
    if (metrics && /visit_home/.test(metrics.textContent || "")) {
      metrics.textContent = t("home_metrics_hint");
    }
  }

  function applyFeeding() {
    const main = document.querySelector('main[data-page="feeding"]');
    if (!main) return;
    applyNavCommon();

    const h1 = main.querySelector("h1");
    const lead = main.querySelector(".lead");
    if (h1) h1.textContent = t("feeding_title");
    if (lead) lead.textContent = t("feeding_lead");

    // 常见按钮（若存在）
    const calcBtn = main.querySelector("#calcBtn, button[data-role='calc']");
    const resetBtn = main.querySelector("#resetBtn, button[data-role='reset']");
    if (calcBtn) calcBtn.textContent = t("feeding_btn_calc");
    if (resetBtn) resetBtn.textContent = t("feeding_btn_reset");

    const resultTitle = main.querySelector(".result-title");
    if (resultTitle) resultTitle.textContent = t("feeding_result_title");

    const notice = main.querySelector(".notice,.note");
    if (notice) notice.textContent = t("feeding_notice");
  }

  function applyFeedback() {
    const main = document.querySelector('main[data-page="feedback"]');
    if (!main) return;
    applyNavCommon();

    // 标题 & 引导
    const h1 = main.querySelector("h1");
    const lead = main.querySelector(".lead");
    if (h1) h1.textContent = t("fb_title");
    if (lead) lead.textContent = t("fb_lead");

    // 左侧卡片标题
    const leftCardTitle = main.querySelector('.card h3');
    if (leftCardTitle) leftCardTitle.textContent = t("fb_form_title");

    // 表单标签 & 选项
    const $ = (sel) => document.querySelector(sel);

    const labCat = main.querySelector('label[for="cat"]') || main.querySelectorAll("label")[0];
    if (labCat) labCat.textContent = t("fb_cat");

    const labAllow = main.querySelector('label[for="contact"]') || main.querySelectorAll("label")[1];
    if (labAllow) labAllow.textContent = t("fb_allow_contact");
    const contactSel = $("#contact");
    if (contactSel) {
      const opts = contactSel.options;
      if (opts && opts.length >= 2) {
        opts[0].text = t("fb_allow_no");
        opts[1].text = t("fb_allow_yes");
      }
    }

    const labBrand = main.querySelector('label[for="brand"]');
    if (labBrand) labBrand.textContent = t("fb_brand");
    const brand = $("#brand");
    if (brand) brand.placeholder = t("fb_brand_ph");

    const labProd = main.querySelector('label[for="product"]');
    if (labProd) labProd.textContent = t("fb_product");
    const product = $("#product");
    if (product) product.placeholder = t("fb_product_ph");

    const labLink = main.querySelector('label[for="link"]');
    if (labLink) labLink.textContent = t("fb_link");
    const link = $("#link");
    if (link) link.placeholder = t("fb_link_ph");

    const labDesc = main.querySelector('label[for="desc"]');
    if (labDesc) labDesc.textContent = t("fb_desc");
    const desc = $("#desc");
    if (desc) desc.placeholder = t("fb_desc_ph");

    // 字数单位（如果你希望展示“字/chars”）
    const counterWrap = main.querySelector(".muted");
    if (counterWrap && counterWrap.querySelector && counterWrap.querySelector("#counter")) {
      const unitNode = counterWrap.querySelector("span.unit");
      if (unitNode) unitNode.textContent = t("fb_desc_cnt_suffix");
      // 如果没有 unit 节点就忽略，不强加
    }

    // 类别选项
    const catSel = $("#cat");
    if (catSel && catSel.options && catSel.options.length >= 5) {
      catSel.options[0].text = t("fb_opt_hit");
      catSel.options[1].text = t("fb_opt_mismatch");
      catSel.options[2].text = t("fb_opt_ux");
      catSel.options[3].text = t("fb_opt_suggest");
      catSel.options[4].text = t("fb_opt_other");
    }

    // 按钮
    const sendBtn = $("#sendBtn");
    const copyBtn = $("#copyBtn");
    const backHome = $("#backHome");
    if (sendBtn) sendBtn.textContent = t("fb_send");
    if (copyBtn) copyBtn.textContent = t("fb_copy");
    if (backHome) backHome.textContent = t("fb_back");

    // 复制反馈的提示词 —— 注：真正显示由页面逻辑控制，这里仅提供文案映射
    window.__PS_FB_COPY_OK__ = t("fb_copy_ok");
    window.__PS_FB_COPY_FAIL__ = t("fb_copy_fail");

    // 右侧说明卡片
    const rightCards = main.querySelectorAll(".grid .card");
    // 约定：右侧是第二张卡
    const right = rightCards[1] || null;
    if (right) {
      const title = right.querySelector("h3");
      if (title) title.textContent = t("fb_right_title");
      const lis = right.querySelectorAll("ul li");
      if (lis[0]) lis[0].textContent = t("fb_right_hit");
      if (lis[1]) lis[1].textContent = t("fb_right_mis");
      if (lis[2]) lis[2].textContent = t("fb_right_ux");
      if (lis[3]) lis[3].textContent = t("fb_right_sug");

      const notes = right.querySelectorAll(".note > div, .note div");
      if (notes[0]) notes[0].textContent = t("fb_right_safety");
      if (notes[1]) notes[1].textContent = t("fb_right_neutral");

      const metaLine = document.getElementById("metaLine");
      if (metaLine) {
        const ts = new Date()
          .toISOString()
          .replace("T", " ")
          .replace("Z", " UTC");
        metaLine.textContent = `${t("fb_meta_prefix")}${ts}；版本 ${VER}。`;
      }
    }
  }

  function applyAll() {
    applyNavCommon();
    applyHome();
    applyFeeding();
    applyFeedback();
  }

  // -----------------------------
  // 4) Bootstrap
  // -----------------------------
  window.PS_I18N = {
    setLang,
    t,
    dict,
    ver: VER,
  };

  document.addEventListener("DOMContentLoaded", function () {
    const lang = getDefaultLang();
    document.documentElement.lang = lang;
    window.__PS_LANG__ = lang;
    applyAll();
  });
})();
