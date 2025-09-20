# 贡献指南 · p-feeding（宠物A计划）

感谢参与！本仓库为纯静态站（GitHub Pages）。目标：**可用性 > 稳定性 > 可维护性 > 扩展性**。

---

## 1. 如何提交修改
- 小改动：在 GitHub 网页端 **Edit** 对应文件，直接提交到 `main`。
- 较大改动：建议新建分支 + Pull Request（PR）。
- 提交信息规范（推荐）：
  - `feat(x): ...` 新功能
  - `fix(x): ...` 修复
  - `chore(x): ...` 杂项（如 sitemap/robots/配置）
  - `docs(x): ...` 文档（README/CONTRIBUTING/Wiki）

---

## 2. 新增/修改页面的检查清单（必看）
> 适用：新增工具页或大幅修改现有页面。

- [ ] **索引**：在 `index.html` 增加/更新入口链接与搜索关键词（`data-keywords`）
- [ ] **收录**：更新 `sitemap.xml`（新增 `<url>`，`<lastmod>` 改为当天）
- [ ] **屏蔽（可选）**：不希望被收录的页面，在 `robots.txt` 添加 `Disallow: /xxx.html`
- [ ] **封面图缓存**：新图请带版本参数（如 `cover.png?v=YYYYMMDD`）
- [ ] **安全基线**（Phase 1，必须在每个页面 `<head>` 中存在）：
  ```html
  <meta name="theme-color" content="#0b0c0f">
  <meta name="referrer" content="strict-origin-when-cross-origin">
  <meta http-equiv="Content-Security-Policy"
        content="default-src 'self';
                 img-src 'self' https: data:;
                 script-src 'self' https://plausible.io 'unsafe-inline';
                 style-src 'self' 'unsafe-inline';
                 connect-src https://plausible.io;
                 form-action 'self' https://github.com mailto:;
                 base-uri 'none';
                 frame-ancestors 'self';">
