/* Pet Scan · i18n (final-20250922)
   - 语言来源优先级：URL ?lang= → localStorage(ps_lang) → navigator → en
   - 切换后写入 localStorage，并给站内链接自动附带 ?lang=xx
   - 支持中/英/西/法/日/韩，可自行扩展
*/
(() => {
  'use strict';

  // 1) 语言清单（下拉顺序：英→中→西→法→日→韩）
  const LANGS = [
    { code: 'en', label: 'English' },
    { code: 'zh', label: '中文' },
    { code: 'es', label: 'Español' },
    { code: 'fr', label: 'Français' },
    { code: 'ja', label: '日本語' },
    { code: 'ko', label: '한국어' },
  ];

  // 2) 词典：按需补充（示例包含首页/计算器/反馈/换粮卡常用文案）
  const dict = {
    en: {
      'nav.home': 'Home',
      'nav.calc': 'Feeding Calculator',
      'nav.feedback': 'Feedback',
      'nav.card7': '7-Day Transition',
      'home.h1': 'Turn confusing labels → into actionable advice',
      'home.p.lead':
        'Scan/enter pet food & wash-care info, unify terms (ME, GA, as-fed/DM), output feeding amount/transition card in seconds; source & timestamp shown. Informational, not medical.',
      'home.open_calc': 'Open Calculator',
      'home.view_card': 'View Card',
      'home.give_feedback': 'Give Feedback',
      'card.title': '7-Day Transition',
      'card.inputs.title': 'Input',
      'card.inputs.daily': 'Daily main meal (kcal/day)',
      'card.inputs.g_per_cup': 'g per cup',
      'card.inputs.energy': 'Energy density (kcal / 100 g)',
      'card.inputs.foodA': 'Food A',
      'card.inputs.foodB': 'Food B',
      'card.gen_card': 'Generate Card',
      'card.save_pdf': 'Save as PDF',
      'card.table.title': '7-day schedule',
      'footer.notice': 'Informational advice (not medical)',
    },
    zh: {
      'nav.home': '首页',
      'nav.calc': '喂食计算器',
      'nav.feedback': '反馈',
      'nav.card7': '7天换粮卡',
      'home.h1': '把难懂的标签 → 变成可执行建议',
      'home.p.lead':
        '扫描/录入宠物食品与洗护信息，统一口径（ME、GA、as-fed/DM），秒出喂量/换粮卡；页面显式来源与时间戳。信息性建议，非医疗。',
      'home.open_calc': '打开计算器',
      'home.view_card': '查看换粮卡',
      'home.give_feedback': '去反馈',
      'card.title': '7天换粮卡',
      'card.inputs.title': '输入参数',
      'card.inputs.daily': '每天用于正餐（kcal/天）',
      'card.inputs.g_per_cup': '克/杯（g per cup）',
      'card.inputs.energy': '能量密度（kcal / 100 g）',
      'card.inputs.foodA': '食物 A',
      'card.inputs.foodB': '食物 B',
      'card.gen_card': '生成换粮卡',
      'card.save_pdf': '打印/保存 PDF',
      'card.table.title': '7 日过渡表',
      'footer.notice': '信息性建议（非医疗）',
    },
    es: {
      'nav.home': 'Inicio',
      'nav.calc': 'Calculadora',
      'nav.feedback': 'Comentarios',
      'nav.card7': 'Transición 7 días',
      'home.h1': 'Convierte etiquetas confusas → en consejos accionables',
      'home.p.lead':
        'Escanea/ingresa info de alimentos y cuidado, unifica términos (ME, GA, as-fed/DM) y genera ración/tarjeta de transición en segundos; fuente y sello de tiempo visibles. Informativo, no médico.',
      'home.open_calc': 'Abrir calculadora',
      'home.view_card': 'Ver tarjeta',
      'home.give_feedback': 'Enviar comentarios',
      'card.title': 'Transición de 7 días',
      'card.inputs.title': 'Parámetros',
      'card.inputs.daily': 'Comida diaria (kcal/día)',
      'card.inputs.g_per_cup': 'g por taza',
      'card.inputs.energy': 'Densidad energética (kcal / 100 g)',
      'card.inputs.foodA': 'Alimento A',
      'card.inputs.foodB': 'Alimento B',
      'card.gen_card': 'Generar tarjeta',
      'card.save_pdf': 'Guardar PDF',
      'card.table.title': 'Cronograma 7 días',
      'footer.notice': 'Consejo informativo (no médico)',
    },
    fr: {
      'nav.home': 'Accueil',
      'nav.calc': 'Calculateur',
      'nav.feedback': 'Retour',
      'nav.card7': 'Transition 7 jours',
      'home.h1': 'Transformer des étiquettes confuses → en conseils actionnables',
      'home.p.lead':
        'Scanner/saisir les infos, unifier les termes (ME, GA, as-fed/DM), générer des rations/cartes de transition en quelques secondes; source & horodatage affichés. Informel, non médical.',
      'home.open_calc': 'Ouvrir le calculateur',
      'home.view_card': 'Voir la carte',
      'home.give_feedback': 'Donner un avis',
      'card.title': 'Transition 7 jours',
      'card.inputs.title': 'Paramètres',
      'card.inputs.daily': 'Repas quotidien (kcal/jour)',
      'card.inputs.g_per_cup': 'g par tasse',
      'card.inputs.energy': 'Densité énergétique (kcal / 100 g)',
      'card.inputs.foodA': 'Aliment A',
      'card.inputs.foodB': 'Aliment B',
      'card.gen_card': 'Générer la carte',
      'card.save_pdf': 'Enregistrer en PDF',
      'card.table.title': 'Planning 7 jours',
      'footer.notice': 'Conseil informatif (non médical)',
    },
    ja: {
      'nav.home': 'ホーム',
      'nav.calc': '給餌計算機',
      'nav.feedback': 'フィードバック',
      'nav.card7': '7日切替カード',
      'home.h1': '分かりにくい表示 → 実行可能な助言へ',
      'home.p.lead':
        'ペットフード/洗浄情報を入力・用語統一（ME/GA/as-fed/DM）、秒で給餌量/切替カードを出力。情報提供であり医療ではありません。',
      'home.open_calc': '計算機を開く',
      'home.view_card': 'カードを見る',
      'home.give_feedback': '意見を送る',
      'card.title': '7日切替カード',
      'card.inputs.title': '入力',
      'card.inputs.daily': '1日の主食 (kcal/日)',
      'card.inputs.g_per_cup': 'g/カップ',
      'card.inputs.energy': 'エネルギー密度 (kcal / 100 g)',
      'card.inputs.foodA': 'フード A',
      'card.inputs.foodB': 'フード B',
      'card.gen_card': 'カード作成',
      'card.save_pdf': 'PDF 保存',
      'card.table.title': '7 日スケジュール',
      'footer.notice': '情報提供（医療ではありません）',
    },
    ko: {
      'nav.home': '홈',
      'nav.calc': '급여 계산기',
      'nav.feedback': '피드백',
      'nav.card7': '7일 전환 카드',
      'home.h1': '혼란스러운 라벨 → 실행 가능한 조언으로',
      'home.p.lead':
        '사료/세정 정보를 입력하고 용어를 통일(ME/GA/as-fed/DM)하여 몇 초 만에 급여량/전환 카드를 생성합니다. 출처와 타임스탬프 표시. 의료 조언 아님.',
      'home.open_calc': '계산기 열기',
      'home.view_card': '카드 보기',
      'home.give_feedback': '피드백 보내기',
      'card.title': '7일 전환 카드',
      'card.inputs.title': '입력',
      'card.inputs.daily': '일일 주식 (kcal/일)',
      'card.inputs.g_per_cup': 'g/컵',
      'card.inputs.energy': '에너지 밀도 (kcal / 100 g)',
      'card.inputs.foodA': '사료 A',
      'card.inputs.foodB': '사료 B',
      'card.gen_card': '카드 생성',
      'card.save_pdf': 'PDF 저장',
      'card.table.title': '7일 일정',
      'footer.notice': '정보 제공(의료 아님)',
    },
  };

  // 3) 工具：读写 URL lang、localStorage
  const q = (sel, el = document) => el.querySelector(sel);
  const qa = (sel, el = document) => Array.from(el.querySelectorAll(sel));

  const getUrlLang = () => {
    try {
      const u = new URL(location.href);
      const v = (u.searchParams.get('lang') || '').toLowerCase();
      return v && dict[v] ? v : null;
    } catch { return null; }
  };

  const getStoredLang = () => {
    try {
      const v = (localStorage.getItem('ps_lang') || '').toLowerCase();
      return v && dict[v] ? v : null;
    } catch { return null; }
  };

  const detectNavigatorLang = () => {
    const nav = (navigator.language || '').toLowerCase();
    for (const k of Object.keys(dict)) if (nav.startsWith(k)) return k;
    return 'en';
  };

  let currentLang =
    getUrlLang() || getStoredLang() || detectNavigatorLang() || 'en';

  const saveLang = (lang) => {
    currentLang = lang;
    try { localStorage.setItem('ps_lang', lang); } catch {}
    applyTranslations();
    rewriteInternalLinks();  // 确保所有站内链接都携带 ?lang
    updateLanguageDropdownLabel();
    // 同步 URL（不跳转，仅更换地址栏）
    try {
      const u = new URL(location.href);
      u.searchParams.set('lang', lang);
      history.replaceState(null, '', u.toString());
    } catch {}
  };

  // 4) 翻译渲染（data-i18n / data-i18n-attr）
  function applyTranslations() {
    const d = dict[currentLang] || {};
    // data-i18n → 文本
    qa('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (key && d[key]) el.textContent = d[key];
    });
    // data-i18n-attr="placeholder:title" + data-i18n="key"
    qa('[data-i18n-attr]').forEach(el => {
      const attrs = (el.getAttribute('data-i18n-attr') || '').split(',').map(s => s.trim()).filter(Boolean);
      const key = el.getAttribute('data-i18n');
      if (!key) return;
      const val = d[key]; if (!val) return;
      for (const a of attrs) el.setAttribute(a, val);
    });
  }

  // 5) 为站内链接追加/更新 ?lang=xx
  function rewriteInternalLinks() {
    const root = location.origin;
    // 只处理本站内且非文件下载/锚点的链接
    qa('a[href]').forEach(a => {
      const href = a.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
      // 绝对或相对都用 URL 处理
      let url;
      try { url = new URL(href, location.href); } catch { return; }
      if (url.origin !== location.origin) return; // 外链跳过
      url.searchParams.set('lang', currentLang);
      a.setAttribute('href', url.toString().replace(root, '')); // 压成相对，便于 GitHub Pages
    });
  }

  // 6) 注入语言下拉（如果页面已有，你也可以用你自己的下拉，只要触发 saveLang(lang) 即可）
  function ensureLanguageDropdown() {
    // 查找占位：有 data-lang-dropdown 的容器就插入到它里边；否则插到右上导航后面
    let host = q('[data-lang-dropdown]') || q('nav') || q('header');
    if (!host) host = document.body;
    // 如果已有 select，就同步它；否则创建一个
    let sel = q('#ps-lang-select', host);
    if (!sel) {
      sel = document.createElement('select');
      sel.id = 'ps-lang-select';
      sel.style.cssText = 'margin-left:8px;padding:6px 10px;border-radius:10px;background:#111827;color:#e5e7eb;border:1px solid rgba(255,255,255,.15)';
      host.appendChild(sel);
    }
    sel.innerHTML = LANGS.map(l => `<option value="${l.code}">${l.label}</option>`).join('');
    sel.value = currentLang;
    sel.onchange = () => saveLang(sel.value);
  }
  function updateLanguageDropdownLabel() {
    const sel = q('#ps-lang-select'); if (sel) sel.value = currentLang;
  }

  // 7) 启动：初次渲染 + 改写链接
  function init() {
    ensureLanguageDropdown();
    applyTranslations();
    rewriteInternalLinks();
  }

  // DOM 就绪
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // 暴露一个全局（方便你在别处主动切语言：window.PS_I18N.set('en')）
  window.PS_I18N = { set: saveLang, get: () => currentLang };
})();
