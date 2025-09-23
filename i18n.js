/* Pet Scan · i18n runtime + dictionary · v20250922x
   - Keeps language across pages via ?lang=xx + localStorage('ps_lang')
   - Rewrites internal links to carry ?lang
   - Applies translations to [data-i18n] elements
*/

/* ---------- Languages list & labels (dropdown) ---------- */
const PS_LANGS = {
  en: { label: 'English' },
  zh: { label: '中文' },
  ja: { label: '日本語' },
  ko: { label: '한국어' },
  es: { label: 'Español' },
  fr: { label: 'Français' },
};

/* ---------- Dictionary: keys -> { zh/en/ja/ko/es/fr } ---------- */
/* 覆盖了首页/计算器/反馈/7天换粮卡常用的 UI 词条。缺词时会按 en→zh 回退。 */
const PS_I18N = {

  /* ======= 通用导航 ======= */
  nav_home: {
    zh: '首页', en: 'Home', ja: 'ホーム', ko: '홈', es: 'Inicio', fr: 'Accueil',
  },
  nav_calc: {
    zh: '喂食计算器', en: 'Feeding Calculator', ja: '給与量計算', ko: '급여 계산기', es: 'Calculadora', fr: 'Calculateur',
  },
  nav_feedback: {
    zh: '反馈', en: 'Feedback', ja: 'フィードバック', ko: '피드백', es: 'Comentarios', fr: 'Retour',
  },
  nav_trans7: {
    zh: '7天换粮卡', en: '7-Day Transition', ja: '7日切替カード', ko: '7일 전환 카드', es: 'Transición 7 días', fr: 'Transition 7 jours',
  },

  /* ======= 首页 ======= */
  home_h1: {
    zh: '把难懂的标签 → 变成可执行建议',
    en: 'Turn confusing labels → into actionable advice',
    ja: '分かりにくいラベルを → 実行可能な提案へ',
    ko: '어려운 표기 → 실행 가능한 제안으로',
    es: 'Convierte etiquetas confusas → en consejos accionables',
    fr: 'Transformer des étiquettes déroutantes → en conseils concrets',
  },
  home_lead: {
    zh: '扫描/录入宠物食品与洗护信息，统一口径（ME、GA、as-fed/DM），秒出喂量/换粮卡；页面显式来源与时间戳。信息性建议，非医疗。',
    en: 'Scan/enter pet food & wash-care info, unify terms (ME, GA, as-fed/DM), output feeding amount/transition card in seconds; source & timestamp shown. Informational, not medical.',
    ja: 'ペットフードやケア情報を入力し、用語（ME・GA・as-fed/DM）を統一。数秒で給与量や切替カードを作成。出典とタイムスタンプを明示。参考情報であり医療ではありません。',
    ko: '사료/케어 정보를 입력하고 용어(ME, GA, as-fed/DM)를 통일합니다. 몇 초 만에 급여량·전환 카드를 생성합니다. 출처/타임스탬프 표시. 의료 조언이 아닙니다.',
    es: 'Introduce datos de alimento y cuidado, unifica términos (ME, GA, as-fed/DM) y genera ración/tarjeta de transición en segundos; se muestra fuente y fecha. Información, no médica.',
    fr: 'Saisissez les infos d’aliment/soin, unifiez les termes (ME, GA, as-fed/DM) et obtenez la ration/carte de transition en quelques secondes ; source et horodatage affichés. Informatif, non médical.',
  },

  home_card1_title: {
    zh: '① 喂食计算器', en: '① Feeding Calculator',
    ja: '① 給与量計算', ko: '① 급여 계산기', es: '① Calculadora', fr: '① Calculateur',
  },
  home_card1_desc: {
    zh: 'RER/MER → kcal/天 → 杯/克；支持混喂与零食占比提示。',
    en: 'RER/MER → kcal/day → cups/grams; supports mixed feeding & treat ratio hints.',
    ja: 'RER/MER → kcal/日 → カップ/グラム。混合給与やおやつ比率にも対応。',
    ko: 'RER/MER → kcal/일 → 컵/그램. 혼합 급여/간식 비율 힌트 지원.',
    es: 'RER/MER → kcal/día → tazas/gramos; admite mezcla y avisos de snacks.',
    fr: 'RER/MER → kcal/jour → tasses/grammes ; prise en charge des mélanges et rappels friandises.',
  },
  home_card1_action: {
    zh: '打开计算器', en: 'Open Calculator', ja: '計算機を開く', ko: '계산기 열기', es: 'Abrir calculadora', fr: 'Ouvrir le calculateur',
  },

  home_card2_title: {
    zh: '② 7 天换粮卡', en: '② 7-Day Transition',
    ja: '② 7日切替カード', ko: '② 7일 전환 카드', es: '② Transición 7 días', fr: '② Transition 7 jours',
  },
  home_card2_desc: {
    zh: '90/10 → 0/100 的过渡表，自动按能量密度换算。',
    en: '90/10 → 0/100 schedule; auto converts by energy density.',
    ja: '90/10 → 0/100 の切替表。エネルギー密度で自動換算。',
    ko: '90/10 → 0/100 전환표. 에너지 밀도로 자동 환산.',
    es: 'De 90/10 a 0/100; conversión automática por densidad energética.',
    fr: 'De 90/10 à 0/100 ; conversion automatique selon la densité énergétique.',
  },
  home_card2_action: {
    zh: '查看换粮卡', en: 'View Card', ja: 'カードを見る', ko: '카드 보기', es: 'Ver tarjeta', fr: 'Voir la carte',
  },

  home_card3_title: {
    zh: '③ 意见反馈', en: '③ Feedback',
    ja: '③ フィードバック', ko: '③ 피드백', es: '③ Comentarios', fr: '③ Retour',
  },
  home_card3_desc: {
    zh: '帮助我们提高命中率与解释易读性；导购披露保持中立。',
    en: 'Help us improve hit-rate & readability; disclosures stay neutral.',
    ja: '命中率や読みやすさ向上にご協力ください。開示は中立を維持します。',
    ko: '적중률/가독성 개선을 도와주세요. 고지는 중립을 유지합니다.',
    es: 'Ayúdanos a mejorar la precisión y la claridad; divulgaciones neutrales.',
    fr: 'Aidez-nous à améliorer la précision et la lisibilité ; divulgations neutres.',
  },
  home_card3_action: {
    zh: '去反馈', en: 'Give Feedback', ja: '意見を送る', ko: '피드백 보내기', es: 'Enviar comentarios', fr: 'Donner un retour',
  },

  /* ======= 计算器（feeding.html） ======= */
  feeding_h1: {
    zh: '喂食计算器', en: 'Feeding Calculator',
    ja: '給与量計算', ko: '급여 계산기', es: 'Calculadora de ración', fr: 'Calculateur de ration',
  },
  feeding_intro: {
    zh: '根据每日所需能量（kcal/天）与食物能量密度（kcal/100 g），自动换算每日克数与杯数；支持自定义“克/杯”。信息性建议，非医疗。',
    en: 'Based on daily energy (kcal/day) and food energy density (kcal/100 g), auto converts grams/day and cups/day; supports custom “g per cup”. Informational, not medical.',
    ja: '1日の必要エネルギー（kcal/日）と食品のエネルギー密度（kcal/100 g）から、1日あたりのグラム数/カップ数を自動計算。「g/カップ」の指定も可。参考情報であり医療ではありません。',
    ko: '일일 필요 에너지(kcal/일)와 사료 에너지 밀도(kcal/100 g)로 g/일, 컵/일을 자동 계산. “g/컵” 사용자 지정 지원. 의료 조언이 아닙니다.',
    es: 'A partir de kcal/día y kcal/100 g, calcula g/día y tazas/día; admite “g por taza”. Información, no médica.',
    fr: 'À partir des kcal/jour et kcal/100 g, calcule g/jour et tasses/jour ; “g par tasse” personnalisable. Informatif, non médical.',
  },
  feeding_label_daily_kcal: {
    zh: '每天用于正餐（kcal/天）', en: 'Daily energy for meals (kcal/day)',
    ja: '1日の正餐エネルギー（kcal/日）', ko: '하루 정식 에너지 (kcal/일)', es: 'Energía diaria para comidas (kcal/día)', fr: 'Énergie quotidienne pour repas (kcal/jour)',
  },
  feeding_ph_daily_kcal: {
    zh: '例如 600', en: 'e.g. 600', ja: '例：600', ko: '예: 600', es: 'p. ej. 600', fr: 'ex. 600',
  },
  feeding_label_g_per_cup: {
    zh: '克/杯（g per cup）', en: 'g per cup', ja: 'g/カップ', ko: 'g/컵', es: 'g por taza', fr: 'g par tasse',
  },
  feeding_label_energy_density: {
    zh: '能量密度（kcal / 100 g）', en: 'Energy density (kcal / 100 g)',
    ja: 'エネルギー密度（kcal / 100 g）', ko: '에너지 밀도 (kcal / 100 g)', es: 'Densidad energética (kcal / 100 g)', fr: 'Densité énergétique (kcal / 100 g)',
  },
  feeding_ph_energy_example: {
    zh: '例如 380', en: 'e.g. 380', ja: '例：380', ko: '예: 380', es: 'p. ej. 380', fr: 'ex. 380',
  },
  feeding_btn_calc: {
    zh: '计算', en: 'Calculate', ja: '計算', ko: '계산', es: 'Calcular', fr: 'Calculer',
  },
  feeding_btn_reset: {
    zh: '重置', en: 'Reset', ja: 'リセット', ko: '초기화', es: 'Restablecer', fr: 'Réinitialiser',
  },
  feeding_btn_print: {
    zh: '打印/保存 PDF', en: 'Print/Save PDF', ja: '印刷/保存 PDF', ko: '인쇄/저장 PDF', es: 'Imprimir/Guardar PDF', fr: 'Imprimer/Enregistrer PDF',
  },
  feeding_result_title: {
    zh: '结果', en: 'Results', ja: '結果', ko: '결과', es: 'Resultados', fr: 'Résultats',
  },
  feeding_result_gpd: {
    zh: '每日克数（g/天）', en: 'Grams per day (g/day)', ja: '1日あたり（g/日）', ko: 'g/일', es: 'Gramos por día (g/día)', fr: 'Grammes par jour (g/jour)',
  },
  feeding_result_cpd: {
    zh: '每日杯数（cups/天）', en: 'Cups per day (cups/day)', ja: 'カップ/日', ko: '컵/일', es: 'Tazas por día', fr: 'Tasses par jour',
  },
  feeding_note: {
    zh: '结果四舍五入到 1 位小数；如混喂或零食，请按比例再拆分。',
    en: 'Results rounded to 1 decimal; for mixed feeding or treats, split by ratio.',
    ja: '結果は小数1桁に丸めています。混合給与やおやつは比率で按分してください。',
    ko: '결과는 소수 1자리 반올림. 혼합 급여/간식은 비율로 나눠 주세요.',
    es: 'Resultados redondeados a 1 decimal; para mezcla o snacks, repartir por proporción.',
    fr: 'Résultats arrondis à 1 décimale ; pour mélanges ou friandises, répartir au prorata.',
  },

  /* ======= 反馈（feedback.html） ======= */
  feedback_h1: {
    zh: '意见反馈', en: 'Feedback', ja: 'フィードバック', ko: '피드백', es: 'Comentarios', fr: 'Retour',
  },
  feedback_intro: {
    zh: '帮助我们提高命中率与解释可读性；导购披露保持中立。提交前不会收集个人敏感信息。',
    en: 'Help us improve accuracy and readability; disclosures remain neutral. No sensitive personal data collected before submission.',
    ja: '命中率や可読性向上にご協力ください。開示は中立です。送信前に個人の機微情報は収集しません。',
    ko: '정확도/가독성 향상을 도와주세요. 고지는 중립을 유지합니다. 제출 전 민감 정보는 수집하지 않습니다.',
    es: 'Ayúdanos a mejorar precisión y claridad; divulgaciones neutrales. No se recopilan datos sensibles antes del envío.',
    fr: 'Aidez-nous à améliorer précision et lisibilité ; divulgations neutres. Aucune donnée sensible collectée avant l’envoi.',
  },
  feedback_form_title: {
    zh: '提交你的反馈', en: 'Submit your feedback', ja: 'ご意見の送信', ko: '피드백 보내기', es: 'Envía tus comentarios', fr: 'Envoyer votre retour',
  },
  feedback_field_category: {
    zh: '类别', en: 'Category', ja: 'カテゴリ', ko: '분류', es: 'Categoría', fr: 'Catégorie',
  },
  feedback_opt_bug: {
    zh: '问题/报错', en: 'Issue / Bug', ja: '不具合', ko: '문제/버그', es: 'Error / Incidencia', fr: 'Problème / Bug',
  },
  feedback_opt_idea: {
    zh: '建议/改进', en: 'Suggestion / Improvement', ja: '提案/改善', ko: '제안/개선', es: 'Sugerencia / Mejora', fr: 'Suggestion / Amélioration',
  },
  feedback_opt_content: {
    zh: '内容/解释', en: 'Content / Explanation', ja: '内容/説明', ko: '콘텐츠/설명', es: 'Contenido / Explicación', fr: 'Contenu / Explication',
  },
  feedback_opt_translation: {
    zh: '翻译', en: 'Translation', ja: '翻訳', ko: '번역', es: 'Traducción', fr: 'Traduction',
  },
  feedback_opt_other: {
    zh: '其它', en: 'Other', ja: 'その他', ko: '기타', es: 'Otro', fr: 'Autre',
  },
  feedback_field_email_opt: {
    zh: '联系邮箱（可选）', en: 'Contact email (optional)', ja: '連絡先メール（任意）', ko: '이메일(선택)', es: 'Correo de contacto (opcional)', fr: 'E-mail (facultatif)',
  },
  feedback_field_title: {
    zh: '标题', en: 'Title', ja: '件名', ko: '제목', es: 'Título', fr: 'Titre',
  },
  feedback_ph_title: {
    zh: '简要概述问题或建议', en: 'Briefly summarize the issue or idea', ja: '問題や提案の要約', ko: '이슈/제안을 간단히 요약', es: 'Resumen breve del problema o idea', fr: 'Résumé bref du problème ou de l’idée',
  },
  feedback_field_desc: {
    zh: '详细描述', en: 'Details', ja: '詳細', ko: '상세 설명', es: 'Detalles', fr: 'Détails',
  },
  feedback_ph_desc: {
    zh: '复现步骤、期望结果、相关产品/配方/截图链接等…',
    en: 'Steps to reproduce, expected result, related product/formula/links, screenshots…',
    ja: '再現手順、期待結果、関連製品/配合/リンク、スクリーンショットなど…',
    ko: '재현 단계, 기대 결과, 관련 제품/사료/링크, 스크린샷…',
    es: 'Pasos para reproducir, resultado esperado, producto/fórmula/enlaces relacionados, capturas…',
    fr: 'Étapes de reproduction, résultat attendu, produit/formule/liens, captures…',
  },
  feedback_btn_submit: {
    zh: '提交', en: 'Submit', ja: '送信', ko: '제출', es: 'Enviar', fr: 'Envoyer',
  },
  feedback_success: {
    zh: '已收到，感谢你的反馈！', en: 'Received, thank you for your feedback!',
    ja: '受け付けました。ご協力ありがとうございます！', ko: '접수되었습니다. 감사합니다!', es: '¡Recibido, gracias por tu comentario!', fr: 'Bien reçu, merci pour votre retour !',
  },

  /* ======= 7 天换粮卡（cards/transition-7.html） ======= */
  trans7_h1: {
    zh: '7 天换粮卡', en: '7-Day Transition Card',
    ja: '7日切替カード', ko: '7일 전환 카드', es: 'Tarjeta de transición 7 días', fr: 'Carte de transition 7 jours',
  },
  trans7_intro: {
    zh: '经典 90/10 → 0/100 过渡；按两种食品的能量密度与 g/杯自动换算出每日克数与杯数。信息性建议，非医疗。',
    en: 'Classic 90/10 → 0/100 schedule; converts grams & cups per day by each food’s energy density and g/cup. Informational, not medical.',
    ja: '90/10 → 0/100 のクラシック切替。各フードのエネルギー密度と g/カップから1日のグラム/カップを換算。参考情報であり医療ではありません。',
    ko: '고전적인 90/10 → 0/100 전환. 각 사료의 에너지 밀도와 g/컵으로 g/일·컵/일 계산. 의료 조언이 아닙니다.',
    es: 'Transición clásica 90/10 → 0/100; convierte gramos y tazas/día según densidad y g/taza. Información, no médica.',
    fr: 'Transition classique 90/10 → 0/100 ; conversion g/j et tasses/j selon densité et g/tasse. Informatif, non médical.',
  },
  trans7_input_daily_kcal: {
    zh: '目标热量（kcal/天）', en: 'Target energy (kcal/day)',
    ja: '目標エネルギー（kcal/日）', ko: '목표 열량 (kcal/일)', es: 'Energía objetivo (kcal/día)', fr: 'Énergie cible (kcal/jour)',
  },
  trans7_input_g_per_cup: {
    zh: '克/杯（g per cup）', en: 'g per cup', ja: 'g/カップ', ko: 'g/컵', es: 'g por taza', fr: 'g par tasse',
  },
  trans7_foodA: {
    zh: '食物 A', en: 'Food A', ja: 'フードA', ko: '사료 A', es: 'Alimento A', fr: 'Aliment A',
  },
  trans7_foodB: {
    zh: '食物 B', en: 'Food B', ja: 'フードB', ko: '사료 B', es: 'Alimento B', fr: 'Aliment B',
  },
  trans7_ph_energy: {
    zh: '例如 380', en: 'e.g. 380', ja: '例：380', ko: '예: 380', es: 'p. ej. 380', fr: 'ex. 380',
  },
  trans7_btn_generate: {
    zh: '生成换粮卡', en: 'Generate card', ja: 'カードを生成', ko: '카드 생성', es: 'Generar tarjeta', fr: 'Générer la carte',
  },
  trans7_btn_print: {
    zh: '打印/保存 PDF', en: 'Print/Save PDF', ja: '印刷/保存 PDF', ko: '인쇄/저장 PDF', es: 'Imprimir/Guardar PDF', fr: 'Imprimer/Enregistrer PDF',
  },
  trans7_table_title: {
    zh: '7 日过渡表', en: '7-day schedule', ja: '7日スケジュール', ko: '7일 일정', es: 'Calendario 7 días', fr: 'Calendrier 7 jours',
  },
  trans7_th_day: {
    zh: '天数', en: 'Day', ja: '日', ko: '일차', es: 'Día', fr: 'Jour',
  },
  trans7_th_ratio: {
    zh: '配比（旧/新）', en: 'Ratio (old/new)', ja: '比率（旧/新）', ko: '비율 (구/신)', es: 'Proporción (ant/nuevo)', fr: 'Proportion (ancien/nouveau)',
  },
  trans7_th_old: {
    zh: '旧粮（g/天）', en: 'Old (g/day)', ja: '旧フード（g/日）', ko: '구사료 (g/일)', es: 'Antiguo (g/día)', fr: 'Ancien (g/jour)',
  },
  trans7_th_new: {
    zh: '新粮（g/天）', en: 'New (g/day)', ja: '新フード（g/日）', ko: '신사료 (g/일)', es: 'Nuevo (g/día)', fr: 'Nouveau (g/jour)',
  },
  trans7_th_total: {
    zh: '总量（g/天）', en: 'Total (g/day)', ja: '合計（g/日）', ko: '합계 (g/일)', es: 'Total (g/día)', fr: 'Total (g/jour)',
  },
  trans7_note: {
    zh: '按假设热量换算，计算公式为 g = kcal ÷（ME/100）；ME 单位为 kcal/100 g。若有湿粮/零食，请分别按自定密度换算后按比例合计。',
    en: 'Calculated by energy: g = kcal ÷ (ME/100); ME in kcal/100 g. For wet food/treats, convert by their own density then add by ratio.',
    ja: 'エネルギー換算：g = kcal ÷ (ME/100)。ME は kcal/100 g。ウェットやおやつは各密度で換算後、比率で合算してください。',
    ko: '에너지 환산: g = kcal ÷ (ME/100). ME 단위는 kcal/100 g. 습식/간식은 각 밀도로 환산 후 비율로 합산.',
    es: 'Cálculo: g = kcal ÷ (ME/100); ME en kcal/100 g. Para húmedo/snacks, convierte con su densidad y suma por proporción.',
    fr: 'Calcul : g = kcal ÷ (ME/100) ; ME en kcal/100 g. Pour humide/friandises, convertir selon leur densité puis additionner au prorata.',
  },
};

/* ---------- Runtime (same behavior across all pages) ---------- */
const PS_STORE_KEY = 'ps_lang';

function ps_normLang(lang) {
  lang = String(lang || '').trim().toLowerCase();
  if (lang.includes('-')) lang = lang.split('-')[0];
  return PS_LANGS[lang] ? lang : 'en';
}
function ps_qsGet(name, url) {
  const u = new URL(url || location.href);
  return u.searchParams.get(name);
}
function ps_getInitialLang() {
  const fromUrl = ps_qsGet('lang'); if (fromUrl) return ps_normLang(fromUrl);
  try { const s = localStorage.getItem(PS_STORE_KEY); if (s) return ps_normLang(s); } catch {}
  const nav = (navigator.language || (navigator.languages && navigator.languages[0]) || 'en');
  return ps_normLang(nav);
}
function ps_setUrlLang(lang) {
  const u = new URL(location.href);
  u.searchParams.set('lang', lang);
  history.replaceState(null, '', u.toString());
}
function ps_isInternal(href) {
  if (!href) return false;
  if (href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('#')) return false;
  try { const u = new URL(href, location.origin); return u.origin === location.origin; } catch { return false; }
}
function ps_rewriteLinks(lang) {
  document.querySelectorAll('a[href]').forEach(a => {
    const href = a.getAttribute('href');
    if (!ps_isInternal(href)) return;
    const u = new URL(href, location.origin);
    u.searchParams.set('lang', lang);
    a.href = u.pathname + (u.search ? '?' + u.searchParams.toString() : '') + (u.hash || '');
  });
}
function ps_applyTexts(lang) {
  const order = [lang, 'en', 'zh'];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const dict = PS_I18N[key] || {};
    for (const L of order) {
      const txt = dict[L];
      if (typeof txt === 'string') { el.textContent = txt; return; }
    }
  });
}
function ps_syncLangControl(lang) {
  const sel = document.getElementById('langSelect') || document.getElementById('lang');
  if (!sel) return;
  if (sel.tagName === 'SELECT') {
    if (!sel.dataset.built) {
      sel.innerHTML = '';
      const order = ['en','zh','ja','ko','es','fr'];
      order.forEach(code => {
        if (!PS_LANGS[code]) return;
        const opt = document.createElement('option');
        opt.value = code;
        opt.textContent = PS_LANGS[code].label;
        sel.appendChild(opt);
      });
      sel.dataset.built = '1';
    }
    sel.value = lang;
  } else {
    sel.textContent = PS_LANGS[lang]?.label || lang.toUpperCase();
  }
}

function initI18n({ page = '' } = {}) {
  const lang = ps_getInitialLang();
  try { localStorage.setItem(PS_STORE_KEY, lang); } catch {}
  ps_setUrlLang(lang);
  ps_applyTexts(lang);
  ps_syncLangControl(lang);
  ps_rewriteLinks(lang);

  const sel = document.getElementById('langSelect') || document.getElementById('lang');
  if (sel) {
    const handler = () => {
      const newLang = ps_normLang(sel.value || sel.getAttribute('data-value') || sel.textContent);
      try { localStorage.setItem(PS_STORE_KEY, newLang); } catch {}
      ps_setUrlLang(newLang);
      ps_applyTexts(newLang);
      ps_syncLangControl(newLang);
      ps_rewriteLinks(newLang);
    };
    sel.addEventListener('change', handler);
    sel.addEventListener('click', handler);
  }

  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href]');
    if (!a) return;
    if (!ps_isInternal(a.getAttribute('href'))) return;
    const u = new URL(a.href, location.origin);
    const curr = ps_qsGet('lang') || lang;
    if (!u.searchParams.get('lang')) {
      u.searchParams.set('lang', curr);
      a.href = u.toString();
    }
  });

  try {
    if (window.track) {
      const map = { home:'visit_home', feeding:'visit_feeding_page', feedback:'visit_feedback_page', trans7:'visit_transition7_page' };
      if (map[page]) window.track(map[page]);
    }
  } catch {}
}

window.initI18n = initI18n;
