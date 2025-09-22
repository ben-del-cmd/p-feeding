/* i18n.js · Pet Scan i18n v20250922i
 * 变更：将原“轮回切换”按钮升级为“下拉菜单式选择”，无需改 HTML。
 * 语言排序（从上到下）：en, es, zh-CN, fr, ja, ko
 * 已适配：index / feeding / feedback / 404（data-i18n & 占位符 attr）
 */

(function () {
  const VER = "v20250922i";

  // —— 配置 —— //
  const STORE = "ps_lang";
  const ORDER = ["en", "es", "zh-CN", "fr", "ja", "ko"];     // 下拉菜单显示顺序
  const LABEL = {
    "zh-CN": "中文",
    en: "English",
    es: "Español",
    fr: "Français",
    ja: "日本語",
    ko: "한국어",
  };

  // 词典（与 v20250922h 一致；如需增改文案只在这里维护）
  const dict = {
    "zh-CN": {
      nav_home: "首页", nav_feeding: "喂食计算器", nav_feedback: "反馈", nav_card7: "7天换粮卡",
      footer_hint: "信息性建议（非医疗）",
      home_title: "把难懂的标签 → 变成可执行建议",
      home_lead: "扫描/录入宠物食品与洗护信息，统一口径（ME、GA、as-fed/DM），秒出喂量/换粮卡；页面显式来源与时间戳。信息性建议，非医疗。",
      home_card1_title: "① 喂食计算器", home_card1_desc: "RER/MER → kcal/天 → 杯/克；支持混喂与零食占比提示。", home_card1_btn: "打开计算器",
      home_card2_title: "② 7 天换粮卡", home_card2_desc: "90/10 → 0/100 的过渡表，自动按能量密度换算。", home_card2_btn: "查看换粮卡",
      home_card3_title: "③ 意见反馈", home_card3_desc: "帮助我们提高命中率与解释易读性；导购披露保持中立。", home_card3_btn: "去反馈",
      home_metrics_hint: "指标监测：visit_home / visit_feeding_page / visit_feedback_page / feedback_open / calc_click / wash_*。",
      feeding_title: "喂食计算器", feeding_lead: "根据 RER/MER 计算日需能量与喂量，支持混喂与零食占比提示（信息性建议，非医疗）。",
      feeding_btn_calc: "计算", feeding_btn_reset: "重置", feeding_result_title: "结果",
      feeding_notice: "本页仅提供信息性建议；涉及处方/疾病请咨询兽医。",
      feeding_block_basic: "基本信息", feeding_species: "物种", feeding_species_dog: "犬", feeding_species_cat: "猫",
      feeding_weight: "体重", feeding_unit_kg: "kg", feeding_unit_lb: "lb",
      feeding_factor: "活动/状况因子（MER）", feeding_treats: "零食占比（% 能量）",
      feeding_food_title: "食品能量密度 & 杯换算",
      feeding_kcal100a: "食物 A：kcal / 100 g", feeding_kcal100b: "（可选）食物 B：kcal / 100 g",
      feeding_gpercup: "克/杯（g per cup）", feeding_mixA: "混喂比例（A 的 %）",
      feeding_results_title2: "建议喂量（按克/杯）",
      feeding_tbl_item: "项", feeding_tbl_ga: "A（或单粮）", feeding_tbl_gb: "（可选）B", feeding_tbl_total: "合计",
      feeding_tbl_g_per_day: "克/天", feeding_tbl_cup_per_day: "杯/天",
      feeding_hint_formula: "口径：RER=70×BW^0.75；MER=RER×因子；零食从 MER 扣减。",
      fb_title: "意见反馈", fb_lead: "帮助我们提升命中率与解释易读性；导购披露保持中立。信息性建议，非医疗。",
      fb_form_title: "填写信息", fb_cat: "类别",
      fb_opt_hit: "命中", fb_opt_mismatch: "识别错误/不一致", fb_opt_ux: "可用性问题", fb_opt_suggest: "功能建议", fb_opt_other: "其他",
      fb_allow_contact: "是否允许联系你（可选）", fb_allow_no: "否", fb_allow_yes: "是",
      fb_brand: "品牌（可选）", fb_brand_ph: "例如：Brand A",
      fb_product: "产品/口味（可选）", fb_product_ph: "例如：Adult Chicken",
      fb_link: "相关链接/图片（可选）", fb_link_ph: "SKU/页面/图片链接",
      fb_desc: "详细描述（必填）", fb_desc_ph: "请尽量描述可复现的步骤或具体内容…", fb_desc_count_unit: "字",
      fb_send: "发邮件", fb_copy: "复制反馈文本", fb_back: "返回首页",
      fb_copy_ok: "已复制到剪贴板 ✅", fb_copy_fail: "复制失败，请手动选择文本复制",
      fb_right_title: "说明",
      fb_right_hit: "命中：识别正确、建议可用；欢迎补充你认为有价值的说明。",
      fb_right_mis: "识别错误/不一致：请尽量提供商品图、包装 GA、成分表或营养声明、能量密度等。",
      fb_right_ux: "可用性问题：例如页面加载、动线、名词理解、交互卡顿等。",
      fb_right_sug: "功能建议：比如混喂/周报/家庭协作/SDK 等优先级诉求。",
      fb_right_safety: "安全与边界：不提供医疗建议；涉及处方/疾病请咨询兽医。",
      fb_right_neutral: "中立性：广告与中立信息强隔离；如含推广链接，会显式披露。",
      fb_meta_prefix: "数据与中立披露已启用；时间戳 ",
      notfound_title: "Pet Scan", notfound_h1: "404 — 页面不存在",
      notfound_note: "已启用匿名分析（Plausible），用于改进产品体验。", notfound_home: "回首页",
    },

    en: {
      nav_home: "Home", nav_feeding: "Feeding Calculator", nav_feedback: "Feedback", nav_card7: "7-Day Transition",
      footer_hint: "Informational advice (not medical)",
      home_title: "Turn confusing labels → into actionable advice",
      home_lead: "Scan/enter pet food & wash-care info, unify terms (ME, GA, as-fed/DM), output feeding amount/transition card in seconds; source & timestamp shown. Informational, not medical.",
      home_card1_title: "① Feeding Calculator",
      home_card1_desc: "RER/MER → kcal/day → cups/grams; supports mixed feeding & treat ratio hints.",
      home_card1_btn: "Open Calculator",
      home_card2_title: "② 7-Day Transition",
      home_card2_desc: "90/10 → 0/100 schedule; auto converts by energy density.",
      home_card2_btn: "View Card",
      home_card3_title: "③ Feedback",
      home_card3_desc: "Help improve hit rate & explanation readability; affiliate clearly disclosed.",
      home_card3_btn: "Give Feedback",
      home_metrics_hint: "Tracked: visit_home / visit_feeding_page / visit_feedback_page / feedback_open / calc_click / wash_*.",
      feeding_title: "Feeding Calculator", feeding_lead: "Calculate daily energy & feeding amount based on RER/MER; supports mixed feeding & treat ratio hints (informational, not medical).",
      feeding_btn_calc: "Calculate", feeding_btn_reset: "Reset", feeding_result_title: "Result",
      feeding_notice: "Informational only; consult a veterinarian for medical/prescription needs.",
      feeding_block_basic: "Basics", feeding_species: "Species", feeding_species_dog: "Dog", feeding_species_cat: "Cat",
      feeding_weight: "Weight", feeding_unit_kg: "kg", feeding_unit_lb: "lb",
      feeding_factor: "MER factor", feeding_treats: "Treats share (% energy)",
      feeding_food_title: "Food energy density & cup conversion",
      feeding_kcal100a: "Food A: kcal / 100 g", feeding_kcal100b: "(Optional) Food B: kcal / 100 g",
      feeding_gpercup: "g per cup", feeding_mixA: "Mix ratio (A, %)",
      feeding_results_title2: "Suggested feeding (g/cup per day)",
      feeding_tbl_item: "Item", feeding_tbl_ga: "A (or single)", feeding_tbl_gb: "(Optional) B", feeding_tbl_total: "Total",
      feeding_tbl_g_per_day: "g/day", feeding_tbl_cup_per_day: "cup/day",
      feeding_hint_formula: "Method: RER=70×BW^0.75; MER=RER×factor; treats deducted from MER.",
      fb_title: "Feedback", fb_lead: "Help us improve hit rate and readability; affiliate disclosure remains neutral. Informational, not medical.",
      fb_form_title: "Fill in details", fb_cat: "Category",
      fb_opt_hit: "Hit", fb_opt_mismatch: "Mismatch/Inconsistency", fb_opt_ux: "Usability", fb_opt_suggest: "Feature Suggestion", fb_opt_other: "Other",
      fb_allow_contact: "Allow contact (optional)", fb_allow_no: "No", fb_allow_yes: "Yes",
      fb_brand: "Brand (optional)", fb_brand_ph: "e.g., Brand A",
      fb_product: "Product/Flavor (optional)", fb_product_ph: "e.g., Adult Chicken",
      fb_link: "Related links/images (optional)", fb_link_ph: "SKU/page/image link",
      fb_desc: "Detailed description (required)", fb_desc_ph: "Describe reproducible steps or specific details as much as possible…", fb_desc_count_unit: "chars",
      fb_send: "Send Email", fb_copy: "Copy Text", fb_back: "Back to Home",
      fb_copy_ok: "Copied to clipboard ✅", fb_copy_fail: "Copy failed, select text manually",
      fb_right_title: "Notes",
      fb_right_hit: "Hit: correct recognition & useful advice; valuable additions welcome.",
      fb_right_mis: "Mismatch: please provide pack GA, ingredients/nutrition claim, energy density, or clear product images if possible.",
      fb_right_ux: "Usability: loading, navigation, terminology understanding, latency, etc.",
      fb_right_sug: "Feature requests: mixed feeding/weekly report/family collaboration/SDK.",
      fb_right_safety: "Safety & boundary: no medical advice; consult a licensed vet.",
      fb_right_neutral: "Neutrality: strict separation between ads and content; affiliate always disclosed.",
      fb_meta_prefix: "Disclosure enabled; timestamp ",
      notfound_title: "Pet Scan", notfound_h1: "404 — Page not found",
      notfound_note: "Anonymous analytics (Plausible) helps us improve the product.", notfound_home: "Home",
    },

    es: {
      nav_home: "Inicio", nav_feeding: "Calculadora de ración", nav_feedback: "Comentarios", nav_card7: "Transición 7 días",
      footer_hint: "Consejo informativo (no médico)",
      home_title: "Etiquetas confusas → consejos accionables",
      home_lead: "Introduce info de alimento/cuidado; unificamos ME, GA y as-fed/DM. Ración y tabla de transición en segundos. Fuente y sello de tiempo visibles. No es consejo médico.",
      home_card1_title: "① Calculadora de ración",
      home_card1_desc: "RER/MER → kcal/día → tazas/gramos; admite mezcla y % de premios.",
      home_card1_btn: "Abrir calculadora",
      home_card2_title: "② Transición 7 días",
      home_card2_desc: "De 90/10 a 0/100; conversión automática por densidad energética.",
      home_card2_btn: "Ver tabla",
      home_card3_title: "③ Comentarios",
      home_card3_desc: "Ayúdanos a mejorar la tasa de acierto y la claridad; afiliación divulgada.",
      home_card3_btn: "Dar feedback",
      home_metrics_hint: "Métricas: visit_home / visit_feeding_page / visit_feedback_page / feedback_open / calc_click / wash_*.",
      feeding_title: "Calculadora de ración", feeding_lead: "Calcula energía diaria y ración con RER/MER; admite mezcla y % de premios (informativo, no médico).",
      feeding_btn_calc: "Calcular", feeding_btn_reset: "Restablecer", feeding_result_title: "Resultado",
      feeding_notice: "Solo informativo; para temas médicos/prescripción, consulta a un veterinario.",
      feeding_block_basic: "Básicos", feeding_species: "Especie", feeding_species_dog: "Perro", feeding_species_cat: "Gato",
      feeding_weight: "Peso", feeding_unit_kg: "kg", feeding_unit_lb: "lb",
      feeding_factor: "Factor MER", feeding_treats: "Porción de premios (% energía)",
      feeding_food_title: "Densidad energética & conversión a tazas",
      feeding_kcal100a: "Alimento A: kcal / 100 g", feeding_kcal100b: "(Opcional) Alimento B: kcal / 100 g",
      feeding_gpercup: "g por taza", feeding_mixA: "Proporción (A, %)",
      feeding_results_title2: "Ración sugerida (g/taza por día)",
      feeding_tbl_item: "Ítem", feeding_tbl_ga: "A (o único)", feeding_tbl_gb: "(Opcional) B", feeding_tbl_total: "Total",
      feeding_tbl_g_per_day: "g/día", feeding_tbl_cup_per_day: "taza/día",
      feeding_hint_formula: "Método: RER=70×BW^0.75; MER=RER×factor; premios descontados del MER.",
      fb_title: "Comentarios", fb_lead: "Ayúdanos a mejorar la tasa de acierto y la legibilidad; la afiliación no afecta la neutralidad. No es consejo médico.",
      fb_form_title: "Rellenar datos", fb_cat: "Categoría",
      fb_opt_hit: "Acierto", fb_opt_mismatch: "Inconsistencia", fb_opt_ux: "Usabilidad", fb_opt_suggest: "Sugerencia", fb_opt_other: "Otro",
      fb_allow_contact: "Permitir contacto (opcional)", fb_allow_no: "No", fb_allow_yes: "Sí",
      fb_brand: "Marca (opcional)", fb_brand_ph: "p. ej., Brand A",
      fb_product: "Producto/Sabor (opcional)", fb_product_ph: "p. ej., Adult Chicken",
      fb_link: "Enlaces/imágenes (opcional)", fb_link_ph: "Enlace de SKU/página/imagen",
      fb_desc: "Descripción detallada (requerida)", fb_desc_ph: "Describe pasos reproducibles o detalles específicos…", fb_desc_count_unit: "car.",
      fb_send: "Enviar correo", fb_copy: "Copiar texto", fb_back: "Volver al inicio",
      fb_copy_ok: "Copiado al portapapeles ✅", fb_copy_fail: "Error al copiar; selecciona manualmente",
      fb_right_title: "Notas",
      fb_right_hit: "Acierto: reconocimiento correcto y consejo útil; añadidos bienvenidos.",
      fb_right_mis: "Inconsistencia: aporta GA del envase, ingredientes/alegaciones, densidad energética o imágenes claras.",
      fb_right_ux: "Usabilidad: carga, navegación, términos, latencias, etc.",
      fb_right_sug: "Sugerencias: mezcla/informe semanal/colaboración familiar/SDK.",
      fb_right_safety: "Seguridad: no es consejo médico; consulta a un veterinario.",
      fb_right_neutral: "Neutralidad: separación estricta anuncios/contenido; afiliación divulgada.",
      fb_meta_prefix: "Divulgación activada; marca de tiempo ",
      notfound_title: "Pet Scan", notfound_h1: "404 — Página no encontrada",
      notfound_note: "La analítica anónima (Plausible) nos ayuda a mejorar el producto.", notfound_home: "Inicio",
    },

    fr: {
      nav_home: "Accueil", nav_feeding: "Calculateur de ration", nav_feedback: "Commentaires", nav_card7: "Transition 7 jours",
      footer_hint: "Conseils informatifs (non médicaux)",
      home_title: "Étiquettes complexes → conseils actionnables",
      home_lead: "Saisissez des infos d’alimentation/soin ; unification ME, GA, as-fed/DM. Ration & carte de transition en quelques secondes. Source et horodatage affichés. Pas un avis médical.",
      home_card1_title: "① Calculateur de ration",
      home_card1_desc: "RER/MER → kcal/jour → tasses/grammes ; prise en charge du mélange et du % friandises.",
      home_card1_btn: "Ouvrir le calculateur",
      home_card2_title: "② Transition 7 jours",
      home_card2_desc: "De 90/10 à 0/100 ; conversion automatique selon la densité énergétique.",
      home_card2_btn: "Voir la carte",
      home_card3_title: "③ Commentaires",
      home_card3_desc: "Aidez-nous à améliorer l’exactitude et la lisibilité ; affiliation divulguée.",
      home_card3_btn: "Donner un avis",
      home_metrics_hint: "Mesures : visit_home / visit_feeding_page / visit_feedback_page / feedback_open / calc_click / wash_*.",
      feeding_title: "Calculateur de ration", feeding_lead: "Calcule l’énergie quotidienne et la ration selon RER/MER ; mélange et % friandises pris en charge (informatif, non médical).",
      feeding_btn_calc: "Calculer", feeding_btn_reset: "Réinitialiser", feeding_result_title: "Résultat",
      feeding_notice: "Informations uniquement ; consultez un vétérinaire pour l’avis médical/ordonnance.",
      feeding_block_basic: "Informations de base", feeding_species: "Espèce", feeding_species_dog: "Chien", feeding_species_cat: "Chat",
      feeding_weight: "Poids", feeding_unit_kg: "kg", feeding_unit_lb: "lb",
      feeding_factor: "Facteur MER", feeding_treats: "Part friandises (% énergie)",
      feeding_food_title: "Densité énergétique & conversion en tasses",
      feeding_kcal100a: "Aliment A : kcal / 100 g", feeding_kcal100b: "(Optionnel) Aliment B : kcal / 100 g",
      feeding_gpercup: "g par tasse", feeding_mixA: "Ratio (A, %)",
      feeding_results_title2: "Ration suggérée (g/tasse par jour)",
      feeding_tbl_item: "Élément", feeding_tbl_ga: "A (ou unique)", feeding_tbl_gb: "(Optionnel) B", feeding_tbl_total: "Total",
      feeding_tbl_g_per_day: "g/jour", feeding_tbl_cup_per_day: "tasse/jour",
      feeding_hint_formula: "Méthode : RER=70×BW^0.75 ; MER=RER×facteur ; friandises déduites du MER.",
      fb_title: "Commentaires", fb_lead: "Aidez-nous à améliorer l’exactitude et la lisibilité ; l’affiliation n’affecte pas la neutralité. Conseils non médicaux.",
      fb_form_title: "Remplir les informations", fb_cat: "Catégorie",
      fb_opt_hit: "Exact", fb_opt_mismatch: "Incohérence", fb_opt_ux: "Utilisabilité", fb_opt_suggest: "Suggestion", fb_opt_other: "Autre",
      fb_allow_contact: "Autoriser le contact (facultatif)", fb_allow_no: "Non", fb_allow_yes: "Oui",
      fb_brand: "Marque (facultatif)", fb_brand_ph: "ex. : Brand A",
      fb_product: "Produit/Saveur (facultatif)", fb_product_ph: "ex. : Adult Chicken",
      fb_link: "Liens/images liés (facultatif)", fb_link_ph: "Lien SKU/page/image",
      fb_desc: "Description détaillée (requise)", fb_desc_ph: "Décrivez les étapes reproductibles ou les détails spécifiques…", fb_desc_count_unit: "car.",
      fb_send: "Envoyer un e-mail", fb_copy: "Copier le texte", fb_back: "Retour à l’accueil",
      fb_copy_ok: "Copié dans le presse-papiers ✅", fb_copy_fail: "Échec de la copie, sélection manuelle",
      fb_right_title: "Notes",
      fb_right_hit: "Exact : reconnaissance correcte et conseil utile ; ajouts bienvenus.",
      fb_right_mis: "Incohérence : fournir GA emballage, ingrédients/allégations, densité énergétique ou images claires.",
      fb_right_ux: "Utilisabilité : chargement, navigation, terminologie, latences, etc.",
      fb_right_sug: "Suggestions : mélange/rapport hebdo/collaboration familiale/SDK.",
      fb_right_safety: "Sécurité : aucun conseil médical ; consultez un vétérinaire.",
      fb_right_neutral: "Neutralité : séparation stricte pub/contenu ; affiliation divulguée.",
      fb_meta_prefix: "Divulgation activée ; horodatage ",
      notfound_title: "Pet Scan", notfound_h1: "404 — Page introuvable",
      notfound_note: "L’analytique anonyme (Plausible) nous aide à améliorer le produit.", notfound_home: "Accueil",
    },

    ja: {
      nav_home: "ホーム", nav_feeding: "給餌計算機", nav_feedback: "フィードバック", nav_card7: "7日間切替",
      footer_hint: "参考情報（医療助言ではありません）",
      home_title: "読みづらいラベル → 実行可能な提案に",
      home_lead: "ペットフード／洗浄ケア情報を入力し、ME・GA・as-fed/DM を統一。給餌量や切替表を即時提示。出典とタイムスタンプを明示。医療助言ではありません。",
      home_card1_title: "① 給餌計算機",
      home_card1_desc: "RER/MER → kcal/日 → カップ/グラム。混合給餌・おやつ比率に対応。",
      home_card1_btn: "計算機を開く",
      home_card2_title: "② 7日間切替",
      home_card2_desc: "90/10 → 0/100。エネルギー密度で自動換算。",
      home_card2_btn: "切替表を見る",
      home_card3_title: "③ フィードバック",
      home_card3_desc: "命中率と説明の読みやすさ向上にご協力ください。アフィリエイトは明示します。",
      home_card3_btn: "意見を送る",
      home_metrics_hint: "計測：visit_home / visit_feeding_page / visit_feedback_page / feedback_open / calc_click / wash_*。",
      feeding_title: "給餌計算機", feeding_lead: "RER/MER に基づき日必要エネルギーと給餌量を算出（参考情報・医療ではない）。",
      feeding_btn_calc: "計算", feeding_btn_reset: "リセット", feeding_result_title: "結果",
      feeding_notice: "本ページは参考情報のみ。処方や疾患は獣医にご相談ください。",
      feeding_block_basic: "基本情報", feeding_species: "種別", feeding_species_dog: "犬", feeding_species_cat: "猫",
      feeding_weight: "体重", feeding_unit_kg: "kg", feeding_unit_lb: "lb",
      feeding_factor: "MER 係数", feeding_treats: "おやつ比率（% エネルギー）",
      feeding_food_title: "食品エネルギー密度 & カップ換算",
      feeding_kcal100a: "フードA：kcal / 100 g", feeding_kcal100b: "（任意）フードB：kcal / 100 g",
      feeding_gpercup: "g / カップ", feeding_mixA: "混合比率（A, %）",
      feeding_results_title2: "推奨給餌量（g/カップ/日）",
      feeding_tbl_item: "項目", feeding_tbl_ga: "A（単一でも可）", feeding_tbl_gb: "（任意）B", feeding_tbl_total: "合計",
      feeding_tbl_g_per_day: "g/日", feeding_tbl_cup_per_day: "カップ/日",
      feeding_hint_formula: "方法：RER=70×BW^0.75；MER=RER×係数；おやつ分は MER から控除。",
      fb_title: "フィードバック", fb_lead: "命中率と説明の読みやすさ向上にご協力ください。医療助言ではありません。",
      fb_form_title: "入力", fb_cat: "カテゴリ",
      fb_opt_hit: "命中", fb_opt_mismatch: "不一致", fb_opt_ux: "使い勝手", fb_opt_suggest: "機能提案", fb_opt_other: "その他",
      fb_allow_contact: "連絡可（任意）", fb_allow_no: "いいえ", fb_allow_yes: "はい",
      fb_brand: "ブランド（任意）", fb_brand_ph: "例：Brand A",
      fb_product: "製品/フレーバー（任意）", fb_product_ph: "例：Adult Chicken",
      fb_link: "関連リンク/画像（任意）", fb_link_ph: "SKU/ページ/画像リンク",
      fb_desc: "詳細（必須）", fb_desc_ph: "再現手順や具体的な内容をできるだけ記述してください…", fb_desc_count_unit: "文字",
      fb_send: "メール送信", fb_copy: "テキストをコピー", fb_back: "ホームへ戻る",
      fb_copy_ok: "クリップボードにコピーしました ✅", fb_copy_fail: "コピー失敗。手動で選択してください。",
      fb_right_title: "注意事項",
      fb_right_hit: "命中：認識が正しく、提案が有用。追記事項歓迎。",
      fb_right_mis: "不一致：パッケージGA・原材料/栄養表示・エネルギー密度・製品画像等をご提供ください。",
      fb_right_ux: "使い勝手：読み込み、導線、用語理解、遅延など。",
      fb_right_sug: "機能要望：混合給餌/週次レポート/家族共有/SDK。",
      fb_right_safety: "安全と境界：医療助言は行いません。処方/疾患は獣医へ。",
      fb_right_neutral: "中立性：広告と中立情報を厳密に分離。アフィリエイトは常に開示。",
      fb_meta_prefix: "開示済み；タイムスタンプ ",
      notfound_title: "Pet Scan", notfound_h1: "404 — ページが見つかりません",
      notfound_note: "匿名分析（Plausible）でプロダクト改善に役立てます。", notfound_home: "ホーム",
    },

    ko: {
      nav_home: "홈", nav_feeding: "급여 계산기", nav_feedback: "피드백", nav_card7: "7일 전환표",
      footer_hint: "정보 제공(의료 아님)",
      home_title: "어려운 라벨 → 실행 가능한 조언으로",
      home_lead: "사료/세정 정보를 입력하고 ME·GA·as-fed/DM 기준을 통일. 급여량/전환표를 즉시 제공. 출처/타임스탬프 명시. 의료 조언이 아닙니다.",
      home_card1_title: "① 급여 계산기",
      home_card1_desc: "RER/MER → kcal/일 → 컵/그램; 혼합 급여·간식 비율 지원.",
      home_card1_btn: "계산기 열기",
      home_card2_title: "② 7일 전환",
      home_card2_desc: "90/10 → 0/100; 에너지 밀도로 자동 환산.",
      home_card2_btn: "전환표 보기",
      home_card3_title: "③ 피드백",
      home_card3_desc: "적중률과 설명 가독성 향상에 도움 주세요. 제휴는 명확히 고지합니다.",
      home_card3_btn: "피드백 보내기",
      home_metrics_hint: "측정: visit_home / visit_feeding_page / visit_feedback_page / feedback_open / calc_click / wash_*.",
      feeding_title: "급여 계산기", feeding_lead: "RER/MER 기반 일일 필요 에너지·급여량 계산. 혼합 급여/간식 비율 지원(정보용, 의료 아님).",
      feeding_btn_calc: "계산", feeding_btn_reset: "초기화", feeding_result_title: "결과",
      feeding_notice: "본 페이지는 정보 제공용입니다. 처방/질환은 수의사 상담.",
      feeding_block_basic: "기본 정보", feeding_species: "종", feeding_species_dog: "개", feeding_species_cat: "고양이",
      feeding_weight: "체중", feeding_unit_kg: "kg", feeding_unit_lb: "lb",
      feeding_factor: "MER 계수", feeding_treats: "간식 비율(% 에너지)",
      feeding_food_title: "사료 에너지 밀도 & 컵 환산",
      feeding_kcal100a: "사료 A: kcal / 100 g", feeding_kcal100b: "(선택) 사료 B: kcal / 100 g",
      feeding_gpercup: "g / 컵", feeding_mixA: "혼합 비율(A, %)",
      feeding_results_title2: "권장 급여량(g/컵·일)",
      feeding_tbl_item: "항목", feeding_tbl_ga: "A(단일 가능)", feeding_tbl_gb: "(선택) B", feeding_tbl_total: "합계",
      feeding_tbl_g_per_day: "g/일", feeding_tbl_cup_per_day: "컵/일",
      feeding_hint_formula: "방법: RER=70×BW^0.75; MER=RER×계수; 간식은 MER에서 차감.",
      fb_title: "피드백", fb_lead: "적중률과 가독성 향상에 도움 부탁드립니다. 의료 조언이 아닙니다.",
      fb_form_title: "정보 입력", fb_cat: "분류",
      fb_opt_hit: "적중", fb_opt_mismatch: "불일치", fb_opt_ux: "사용성", fb_opt_suggest: "기능 제안", fb_opt_other: "기타",
      fb_allow_contact: "연락 허용(선택)", fb_allow_no: "아니오", fb_allow_yes: "예",
      fb_brand: "브랜드(선택)", fb_brand_ph: "예: Brand A",
      fb_product: "제품/맛(선택)", fb_product_ph: "예: Adult Chicken",
      fb_link: "관련 링크/이미지(선택)", fb_link_ph: "SKU/페이지/이미지 링크",
      fb_desc: "상세 설명(필수)", fb_desc_ph: "재현 가능한 절차나 구체 내용을 적어 주세요…", fb_desc_count_unit: "자",
      fb_send: "이메일 보내기", fb_copy: "텍스트 복사", fb_back: "홈으로",
      fb_copy_ok: "클립보드에 복사 완료 ✅", fb_copy_fail: "복사 실패, 직접 선택해 주세요",
      fb_right_title: "안내",
      fb_right_hit: "적중: 인식이 정확하고 조언이 유용. 보충 환영.",
      fb_right_mis: "불일치: 포장 GA·성분/영양 표시·에너지 밀도·제품 이미지 등 제공.",
      fb_right_ux: "사용성: 로딩, 동선, 용어 이해, 지연 등.",
      fb_right_sug: "기능 제안: 혼합 급여/주간 리포트/가족 공유/SDK.",
      fb_right_safety: "안전·경계: 의료 조언 미제공. 처방/질환은 수의사 상담.",
      fb_right_neutral: "중립성: 광고와 정보 분리. 제휴는 항상 고지.",
      fb_meta_prefix: "공개 완료; 타임스탬프 ",
      notfound_title: "Pet Scan", notfound_h1: "404 — 페이지를 찾을 수 없음",
      notfound_note: "익명 분석(Plausible)은 제품 개선에 사용됩니다.", notfound_home: "홈",
    },
  };

  // —— 核心 API —— //
  function getDefaultLang() {
    const saved = localStorage.getItem(STORE);
    if (saved && dict[saved]) return saved;

    // 默认回落：英文优先
    const nav = (navigator.language || "en").toLowerCase();
    if (nav.startsWith("en")) return "en";
    if (nav.startsWith("es")) return "es";
    if (nav.startsWith("zh")) return "zh-CN";
    if (nav.startsWith("fr")) return "fr";
    if (nav.startsWith("ja")) return "ja";
    if (nav.startsWith("ko")) return "ko";
    return "en";
  }

  function t(key) {
    const lang = window.__PS_LANG__ || getDefaultLang();
    return (dict[lang] && dict[lang][key]) || dict["zh-CN"][key] || key;
  }

  function setLang(lang) {
    if (!dict[lang]) lang = "en";
    localStorage.setItem(STORE, lang);
    document.documentElement.lang = lang;
    window.__PS_LANG__ = lang;
    applyAll();
    // 埋点
    try { window.plausible && window.plausible("i18n_lang_change", { props: { lang } }); } catch(e){}
  }

  // —— DOM 应用（data-i18n）—— //
  function applyI18nToDom() {
    document.querySelectorAll("[data-i18n]").forEach(function(el){
      const key = el.getAttribute("data-i18n");
      const attr = el.getAttribute("data-i18n-attr");
      const val = t(key);
      if (!attr) {
        if (el.firstElementChild) {
          el.childNodes.forEach(n=>{ if(n.nodeType===3){ n.nodeValue = val; } });
        } else {
          el.textContent = val;
        }
      } else {
        el.setAttribute(attr, val);
      }
    });

    // footer 合成（如存在）
    const footer = document.querySelector("footer .i18n-footer");
    if (footer) {
      footer.innerHTML =
        '© <span class="mono">Pet Scan</span> · <span class="muted">' +
        t("footer_hint") + "</span>";
    }

    // Document title 追加提示
    document.title = document.title.replace(/\s·\s.*/,'') + " · " + t("footer_hint");
  }

  // —— 语言下拉：把 #langToggle 替换为菜单 —— //
  function ensureLangDropdown() {
    const oldBtn = document.getElementById("langToggle");
    if (!oldBtn) return;

    // 注入样式（仅一次）
    if (!document.getElementById("ps-lang-style")) {
      const css = `
      .ps-lang{position:relative;display:inline-block;margin-left:16px}
      .ps-lang__btn{padding:6px 10px;border-radius:10px;border:1px solid rgba(255,255,255,.15);background:transparent;color:#cbd5e1;cursor:pointer}
      .ps-lang__list{position:absolute;right:0;top:calc(100% + 6px);min-width:160px;background:#0f172a;border:1px solid rgba(255,255,255,.15);border-radius:12px;padding:6px;display:none;z-index:999}
      .ps-lang__list[aria-expanded="true"]{display:block}
      .ps-lang__item{display:flex;gap:8px;align-items:center;width:100%;padding:8px 10px;border-radius:8px;background:transparent;color:#e5e7eb;border:0;text-align:left;cursor:pointer}
      .ps-lang__item:hover,.ps-lang__item[aria-current="true"]{background:#1f2937}
      .ps-lang__kbd{margin-left:auto;opacity:.5;font-size:12px}
      `;
      const st = document.createElement("style");
      st.id = "ps-lang-style"; st.textContent = css;
      document.head.appendChild(st);
    }

    const cur = window.__PS_LANG__ || getDefaultLang();

    const wrap = document.createElement("div");
    wrap.className = "ps-lang";
    wrap.innerHTML = `
      <button type="button" class="ps-lang__btn" id="psLangBtn" aria-haspopup="listbox" aria-expanded="false">${LABEL[cur]||"English"}</button>
      <div class="ps-lang__list" id="psLangList" role="listbox" aria-expanded="false"></div>
    `;

    oldBtn.replaceWith(wrap);

    // 渲染选项
    const list = wrap.querySelector("#psLangList");
    list.innerHTML = ORDER.map(code => {
      const active = (code === cur);
      return `<button type="button" class="ps-lang__item" role="option" data-lang="${code}" aria-current="${active ? "true" : "false"}">
        <span>${LABEL[code]||code}</span>
        ${active ? '<span class="ps-lang__kbd">✓</span>' : ''}
      </button>`;
    }).join("");

    // 交互
    const btn = wrap.querySelector("#psLangBtn");
    const open = () => { btn.setAttribute("aria-expanded","true"); list.setAttribute("aria-expanded","true"); };
    const close = () => { btn.setAttribute("aria-expanded","false"); list.setAttribute("aria-expanded","false"); };
    btn.addEventListener("click", (e)=> {
      const expanded = btn.getAttribute("aria-expanded") === "true";
      expanded ? close() : open();
    });
    document.addEventListener("click", (e)=> {
      if (!wrap.contains(e.target)) close();
    });
    document.addEventListener("keydown", (e)=> {
      if (e.key === "Escape") close();
    });

    list.querySelectorAll(".ps-lang__item").forEach(item=>{
      item.addEventListener("click", ()=>{
        const code = item.getAttribute("data-lang");
        close();
        setLang(code);
        // 更新菜单显示
        btn.textContent = LABEL[code] || code;
      });
    });
  }

  function applyAll() {
    applyI18nToDom();
    // 重渲染下拉中的对勾
    const list = document.getElementById("psLangList");
    const btn  = document.getElementById("psLangBtn");
    const cur = window.__PS_LANG__ || getDefaultLang();
    if (btn) btn.textContent = LABEL[cur] || cur;
    if (list) {
      list.querySelectorAll(".ps-lang__item").forEach(el=>{
        const on = el.getAttribute("data-lang") === cur;
        el.setAttribute("aria-current", on ? "true" : "false");
        const mark = el.querySelector(".ps-lang__kbd");
        if (on && !mark) el.insertAdjacentHTML("beforeend", '<span class="ps-lang__kbd">✓</span>');
        if (!on && mark) mark.remove();
      });
    }
  }

  // —— 导出 —— //
  window.PS_I18N = { setLang, t, ver: VER, dict };

  document.addEventListener("DOMContentLoaded", function(){
    const saved = localStorage.getItem(STORE);
    const lang = (saved && dict[saved]) ? saved : getDefaultLang();
    document.documentElement.lang = lang;
    window.__PS_LANG__ = lang;

    // 构建下拉
    ensureLangDropdown();

    // 首次应用
    applyAll();
  });
})();
