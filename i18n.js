/* Pet Scan · i18n core (v=20250922Z) */
(function () {
  // ---- supported langs & labels ----
  const LABEL = { en: 'English', zh: '中文', es: 'Español', ja: '日本語', ko: '한국어', fr: 'Français' };
  const ORDER = ['en', 'zh', 'es', 'ja', 'ko', 'fr'];
  const DEFAULT = 'en';
  const LS_KEY = 'ps_lang';

  // ---- small helper ----
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const isAbs = (href) => /^(https?:)?\/\//i.test(href) || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('#');

  const norm = (x) => {
    if (!x) return DEFAULT;
    x = x.toLowerCase();
    // zh-CN/zh-Hans → zh, pt-BR → pt 等可在此扩展
    if (x.startsWith('zh')) return 'zh';
    return ORDER.includes(x) ? x : DEFAULT;
  };

  const urlGetLang = () => {
    try { return new URL(location.href).searchParams.get('lang'); } catch { return null; }
  };

  const urlSetLang = (lang) => {
    try {
      const u = new URL(location.href);
      u.searchParams.set('lang', lang);
      history.replaceState(null, '', u.pathname + u.search + u.hash);
    } catch {}
  };

  // ---- dictionaries（与页面 data-i18n 键一致；英文为兜底）----
  const D = {
    en: {
      nav: { home: 'Home', calc: 'Feeding Calculator', feedback: 'Feedback', card: '7-Day Transition' },
      home: {
        h1: 'Turn confusing labels → into actionable advice',
        p:  'Scan/enter pet food & wash-care info, unify terms (ME, GA, as-fed/DM), output feeding amount/transition card in seconds; source & timestamp shown. Informational, not medical.',
        c1: { title: '① Feeding Calculator', p: 'RER/MER → kcal/day → cups/grams; supports mixed feeding & treat ratio hints.', btn: 'Open Calculator' },
        c2: { title: '② 7-Day Transition',  p: '90/10 → 0/100 schedule; auto converts by energy density.', btn: 'View Card' },
        c3: { title: '③ Feedback',          p: 'Help us improve hit rate & explanation readability; affiliate clearly disclosed.', btn: 'Give Feedback' },
        note: 'Tracked: visit_home / visit_feeding_page / visit_feedback_page / feedback_open / calc_click / wash_*.',
        legal: '© Pet Scan · Informational advice (not medical)'
      },
      calc: {
        h1: 'Feeding Calculator',
        need: 'Daily energy need (kcal/day)',
        cupg: 'g per cup',
        dens: 'Energy density (kcal / 100 g)',
        btnCalc: 'Calculate',
        btnReset: 'Reset',
        btnPdf: 'Print / Save PDF',
        resG: 'Daily grams (g/day)',
        resC: 'Daily cups (cups/day)',
        tracked: 'Anonymous analytics enabled (Plausible) — to improve product only.'
      },
      fb: {
        h1: 'Feedback',
        p:  'Help us improve accuracy & readability. We won’t collect personal sensitive info before you submit.',
        type: 'Category', email: 'Email (optional)', title: 'Title', detail: 'Detail',
        submit: 'Submit'
      },
      card: {
        h1: '7-Day Transition Card',
        left: { title: 'Input', kcal: 'Daily meals (kcal/day)', cupg: 'g per cup', dens: 'Energy density (kcal / 100 g)', a:'Food A', b:'Food B',
                gen: 'Generate Card', pdf:'Print / Save PDF' },
        right: { title: 'Schedule' }
      }
    },
    zh: {
      nav: { home: '首页', calc: '喂食计算器', feedback: '反馈', card: '7天换粮卡' },
      home: {
        h1: '把难懂的标签 → 变成可执行建议',
        p:  '扫描/录入宠物食品与洗护信息，统一口径（ME、GA、as-fed/DM），秒出喂量/换粮卡；页面显式来源与时间戳。信息性建议，非医疗。',
        c1: { title: '① 喂食计算器', p: 'RER/MER → kcal/天 → 杯/克；支持混喂与零食占比提示。', btn: '打开计算器' },
        c2: { title: '② 7 天换粮卡',  p: '90/10 → 0/100 的过渡表，自动按能量密度换算。', btn: '查看换粮卡' },
        c3: { title: '③ 意见反馈',    p: '帮助我们提高命中率与解释易读性；导购披露保持中立。', btn: '去反馈' },
        note: '指标监测：visit_home / visit_feeding_page / visit_feedback_page / feedback_open / calc_click / wash_*。',
        legal: '© Pet Scan · 信息性建议（非医疗）'
      },
      calc: {
        h1: '喂食计算器',
        need: '每天用于正餐（kcal/天）',
        cupg: '克/杯（g per cup）',
        dens: '能量密度（kcal / 100 g）',
        btnCalc: '计算', btnReset: '重置', btnPdf: '打印/保存 PDF',
        resG: '每日克数（g/天）', resC: '每日杯数（cups/天）',
        tracked: '已启用匿名统计（Plausible），仅用于改进产品体验。'
      },
      fb: {
        h1: '意见反馈', p: '帮助我们提高命中率与解释易读性；导购披露保持中立。提交前不会收集个人敏感信息。',
        type: '类别', email: '联系邮箱（可选）', title:'标题', detail:'详细描述', submit:'提交'
      },
      card: {
        h1: '7 天换粮卡',
        left: { title:'输入参数', kcal:'每天用于正餐（kcal/天）', cupg:'克/杯（g per cup）', dens:'能量密度（kcal / 100 g）', a:'食物 A', b:'食物 B',
                gen:'生成换粮卡', pdf:'打印/保存 PDF' },
        right: { title:'7 日过渡表' }
      }
    },
    es: {
      nav:{home:'Inicio', calc:'Calculadora', feedback:'Comentarios', card:'Transición 7 días'},
      home:{
        h1:'Convierte etiquetas confusas → en consejo accionable',
        p:'Escanea/ingresa alimento y cuidado de lavado, unifica términos (ME, GA, as-fed/DM) y genera ración/tarjeta de transición en segundos; fuente y sello temporal visibles. Informativo, no médico.',
        c1:{title:'① Calculadora', p:'RER/MER → kcal/día → tazas/gramos; admite mezcla y snacks.', btn:'Abrir calculadora'},
        c2:{title:'② Transición 7 días', p:'Horario 90/10 → 0/100; convierte por densidad energética.', btn:'Ver tarjeta'},
        c3:{title:'③ Comentarios', p:'Ayúdanos a mejorar precisión y claridad.', btn:'Dejar comentario'},
        note:'Trazado: visit_home / visit_feeding_page / visit_feedback_page / feedback_open / calc_click / wash_*.',
        legal:'© Pet Scan · Consejos informativos (no médicos)'
      },
      calc:{ h1:'Calculadora', need:'Necesidad diaria (kcal/día)', cupg:'g por taza', dens:'Densidad energética (kcal / 100 g)',
             btnCalc:'Calcular', btnReset:'Reiniciar', btnPdf:'Imprimir/Guardar PDF',
             resG:'Gramos/día', resC:'Tazas/día', tracked:'Analítica anónima (Plausible) habilitada.' },
      fb:{ h1:'Comentarios', p:'Ayúdanos a mejorar. No recopilamos datos sensibles antes de enviar.',
           type:'Categoría', email:'Email (opcional)', title:'Título', detail:'Detalle', submit:'Enviar' },
      card:{ h1:'Tarjeta de transición 7 días', left:{title:'Entrada', kcal:'Comidas diarias (kcal/día)', cupg:'g por taza', dens:'Densidad (kcal/100 g)', a:'Alimento A', b:'Alimento B', gen:'Generar', pdf:'Imprimir/Guardar PDF'}, right:{title:'Calendario'} }
    },
    ja:{ nav:{home:'ホーム', calc:'給餌計算', feedback:'フィードバック', card:'7日切替'},
         home:{ h1:'難しい表示 → 実行可能な提案へ', p:'フード/洗浄情報を入力し、用語を統一。給餌量/切替カードを数秒で出力。情報提供であり医療ではありません。',
                c1:{title:'① 給餌計算', p:'RER/MER → kcal/日 → カップ/グラム。混合/おやつ対応。', btn:'計算を開く'},
                c2:{title:'② 7日切替', p:'90/10 → 0/100。エネルギー密度で自動換算。', btn:'カードを見る'},
                c3:{title:'③ フィードバック', p:'精度と読みやすさ向上にご協力ください。', btn:'送信'}, note:'トラッキング: visit_* など。', legal:'© Pet Scan · 情報提供（医療ではない）'},
         },
    ko:{ nav:{home:'홈', calc:'급여 계산기', feedback:'피드백', card:'7일 전환'},
         home:{ h1:'어려운 표기 → 실행 가능한 조언', p:'사료/세정 정보를 입력해 용어를 통일하고, 급여량/전환 카드를 몇 초 만에 출력합니다. 정보 제공용, 의료 아님.',
                c1:{title:'① 급여 계산기', p:'RER/MER → kcal/일 → 컵/그램. 혼합/간식 비율 힌트.', btn:'계산기 열기'},
                c2:{title:'② 7일 전환', p:'90/10 → 0/100 일정; 에너지 밀도 자동 변환.', btn:'카드 보기'},
                c3:{title:'③ 피드백', p:'정확도와 가독성 향상에 도움 주세요.', btn:'피드백'}, note:'추적: visit_* 등.', legal:'© Pet Scan · 정보 제공(의료 아님)'},
         },
    fr:{ nav:{home:'Accueil', calc:'Calculateur', feedback:'Retour', card:'Transition 7 jours'},
         home:{ h1:'Des étiquettes confuses → des conseils concrets', p:'Saisissez infos aliments/toilettage, unifiez les termes et obtenez ration/carte de transition en secondes. Informatif, non médical.',
                c1:{title:'① Calculateur', p:'RER/MER → kcal/jour → tasses/grammes; mélange et friandises.', btn:'Ouvrir'},
                c2:{title:'② Transition 7 jours', p:'90/10 → 0/100; conversion par densité énergétique.', btn:'Voir la carte'},
                c3:{title:'③ Retour', p:'Aidez-nous à améliorer précision et lisibilité.', btn:'Donner un avis'},
                note:'Suivi: visit_* etc.', legal:'© Pet Scan · Conseil informatif (non médical)'}
         }
  };

  // ---- state ----
  const S = { lang: DEFAULT };

  // ---- i18n apply ----
  const get = (obj, path) => path.split('.').reduce((o, k) => (o && o[k] != null ? o[k] : undefined), obj);
  const t = (key) => get(D[S.lang] || D[DEFAULT], key) ?? get(D[DEFAULT], key) ?? '';

  const applyI18n = () => {
    document.documentElement.lang = S.lang;
    $$('[data-i18n]').forEach(el => {
      const k = el.getAttribute('data-i18n');
      const v = t(k);
      if (v !== '') el.textContent = v;
    });
    // 更新语言按钮文字
    const btn = $('#langBtn');
    if (btn) btn.textContent = LABEL[S.lang] || S.lang;
    // 高亮菜单
    $$('#langMenu [data-lang]').forEach(b => b.classList.toggle('active', b.dataset.lang === S.lang));
  };

  // ---- rewrite internal links to keep ?lang= ----
  const rewriteLinks = () => {
    const u0 = new URL(location.href);
    $$('a[href]').forEach(a => {
      const raw = a.getAttribute('href');
      if (!raw || isAbs(raw)) return;
      const u = new URL(raw, u0);
      u.searchParams.set('lang', S.lang);
      a.setAttribute('href', u.pathname.replace(u.origin, '') + u.search + u.hash);
    });
  };

  // ---- dropdown UI (works even if只有一个按钮) ----
  const mountDropdown = () => {
    const btn = $('#langBtn');
    const menu = $('#langMenu');
    if (menu && !menu.dataset.built) {
      menu.innerHTML = ORDER.map(c => `<button type="button" data-lang="${c}">${LABEL[c]}</button>`).join('');
      menu.dataset.built = '1';
      menu.addEventListener('click', (e) => {
        const code = e.target && e.target.dataset ? e.target.dataset.lang : '';
        if (!code) return;
        setLang(code);
        menu.dataset.open = '';
        btn && btn.setAttribute('aria-expanded', 'false');
      });
      document.addEventListener('click', (e) => {
        if (!menu.contains(e.target) && e.target !== btn) menu.dataset.open = '';
      });
    }
    if (btn) {
      btn.onclick = () => {
        if (!menu) return;
        const open = menu.dataset.open === '1';
        menu.dataset.open = open ? '' : '1';
        btn.setAttribute('aria-expanded', String(!open));
      };
    }
  };

  // ---- set & init ----
  const persist = (l) => localStorage.setItem(LS_KEY, l);
  const setLang = (l) => {
    S.lang = norm(l);
    persist(S.lang);
    urlSetLang(S.lang);
    applyI18n();
    rewriteLinks();
  };

  const init = () => {
    const byUrl = norm(urlGetLang());
    const byLs  = norm(localStorage.getItem(LS_KEY));
    const byNav = norm((navigator.language || '').slice(0, 2));
    S.lang = byUrl || byLs || byNav || DEFAULT;
    urlSetLang(S.lang);         // 把语言写回 URL（保留其它参数）
    mountDropdown();            // 构建/绑定下拉
    applyI18n();                // 首次渲染
    rewriteLinks();             // 改写所有内链
  };

  document.addEventListener('DOMContentLoaded', init);

  // 暴露给页面备用（可选）
  window.PS_I18N = { setLang, t, get current() { return S.lang; } };
})();
