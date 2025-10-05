# DOC_SYNC_INDEX

Purpose: Keep a human-readable change index for our **single-file SPA** (`index.html`) so anyone can quickly understand what changed, why, and how to verify. This file is docs-only; it does **not** affect the app.

## How to update
- Add a new dated entry at the top (YYYY-MM-DD).
- Briefly note **What / Why / Affected areas / Verify steps**.
- Link to the PR when available.

---

## 2025-10-05 — H-patch + custom/cups
**PR:** #14, #15, #16  
**What**
- Calc: add **Species** (Dog/Cat) with defaults  
  - Dog Normal = **1.6**; Cat Normal = **1.3**; labels show numeric factors.
- Add inline info tip (RER/MER); add **Basis & Notes** (EN/zh).
- Density inputs (optional): `kcal/100g`, `kcal/cup`, `grams/cup` → precise g/day & cups/day; show **(est.)** when using typical density.
- Add **custom MER factor** (guarded 0.8–6.0) with “懂则改，不懂别动” copy.
- 7-Day: caution bolded; keep gradual plan.

**Why**
- Improve trust & explainability; keep informational boundary; enable precision without forcing inputs.

**Affected areas**
- `#calc` UI/logic (factors, custom factor, density)
- i18n (en/zh/es/fr)
- Nav layout polish

**Verify**
1. Default language = English（可通过 `?lang=xx` 或下拉切换 / localStorage 记忆）  
2. Species 切换：Dog=1.6 / Cat=1.3；标签显示数值；自定义因子启用时单选框取消选中  
3. 未填密度时显示 g/day（估算密度时标记“(est.)”），无 grams/cup 则 Cups 显示 `—`  
4. Basis & Notes 折叠块内容、7-Day 提示正常  
5. 路由：`#home #calc #switch #feedback` 正常

---

## 2025-10-01 — v1.2.3 baseline
**What**
- Initial single-file SPA skeleton, feeding calc (RER/MER) 基本版，7-Day 切换卡，简易 i18n。

**Verify**
- RER = `70 × kg^0.75`; MER = `RER × factor`；路由正常。
