# Pet A Plan — Label ➜ Actionable Feeding (SPA)

Turn pet food & grooming labels into **simple, reproducible, actionable** guidance.  
**Informational only. Not medical advice.**

- **Live:** https://ben-del-cmd.github.io/p-feeding/
- **Version:** `v1.2.3 • SPA`
- **SSOT:** 《宠物a计划总纲 — 统一版 V1.2》（Canvas · 单一权威文档）

---

## ✨ What’s inside (v1.2.3)
- **Single-file SPA**: `index.html` only（no build / no backend）
- **i18n**: EN (default) · zh · es · fr（URL `?lang=` 切换，localStorage 记忆）
- **Routes**: `#home` · `#calc` · `#switch` · `#feedback`
- **Feeding calculator**  
  - RER = `70 × weight(kg)^0.75`  
  - MER = `RER × factor` (1.0 / 1.6 / 2.0)  
  - Units: kg / lb · Outputs: **kcal/day · grams/day · cups/day**
- **7-Day switch card**（含复制按钮）
- **Feedback**: bug / idea / other + `mailto:` 草稿
- **404 compatibility**: `404.html` 将旧链接重定向到对应路由并保留 `?lang`

---

## 🚀 Quick start
**本地查看**：下载后直接双击 `index.html` 即可。  
**GitHub Pages 部署**：Settings → Pages → Source 选 *Deploy from a branch*；Branch `main`；Folder `/ (root)`。

### Configure feedback email
在 `index.html` 搜索并设置你的邮箱（留空也可用，收件人为空）：
```js
const FEEDBACK_EMAIL = "YOUR_EMAIL";
