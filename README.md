# Pet A Plan — Label ➜ Actionable Feeding (SPA)

把宠物食品/洗护标签，转成**清晰、可复用、可解释**的喂养建议。  
Turn pet food & grooming labels into **simple, reproducible, actionable** guidance.  
**Informational only. Not medical advice.**

- **Live:** https://ben-del-cmd.github.io/p-feeding/
- **Version:** `v1.2.3 • SPA`
- **SSOT（唯一权威文档）**： 《宠物a计划总纲 — 统一版 V1.2》（Canvas）

---

## ✨ Features
- **Single-file SPA**：仅 `index.html`（无构建/无后端）
- **i18n**：EN（默认）/ zh / es / fr  
  通过 `?lang=zh|es|fr` 切换，并由 `localStorage` 记忆
- **Hash 路由**：`#home` · `#calc` · `#switch` · `#feedback`
- **Feeding Calculator**
  - RER = `70 × weight(kg)^0.75`
  - MER = `RER × factor`（Resting=1.0 / Normal=1.6 / Active=2.0）
  - 单位：kg / lb；输出：**kcal/day、grams/day、cups/day**（依赖 kcal/g 与 g/cup）
- **7-Day Switch Card**：7天换粮表 + 一键复制
- **Feedback**：分类（bug/idea/other）+ `mailto:` 预填草稿
- **404 兼容**：`404.html` 将历史链接重定向到对应路由，并保留 `?lang`

---

## 🚀 Quick start
**本地查看**：下载或克隆后，直接双击 `index.html` 即可（无需服务器）。  

**GitHub Pages 部署**：  
Settings → Pages →  
- **Source**: *Deploy from a branch*  
- **Branch**: `main`  
- **Folder**: `/ (root)`  

访问：`https://<your-username>.github.io/<repo>/`

---

## 📮 Feedback email（可选）
在 `index.html` 搜索并设置你的邮箱（留空也可用，按钮会打开空收件人）：
```js
const FEEDBACK_EMAIL = "YOUR_EMAIL";
