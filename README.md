Pet Feeding Tools (/p-feeding)
<!-- Badges -->






简洁好用的宠物喂食小工具集合：喂食计算器、问题与建议等。
托管在 GitHub Pages：https://ben-del-cmd.github.io/p-feeding/

多语言（四语）：en-US / es-419 / zh-Hans / fr-CA

纯静态、零依赖、轻量安全（严格元信息、基础 CSP、Referrer Policy）

集成 Plausible Analytics（隐私友好）

目录结构
/p-feeding
  ├─ index.html         # 首页（多语切换、站内导航）
  ├─ feeding.html       # 喂食计算器
  ├─ feedback.html      # 反馈页（跳转 GitHub 新 issue）
  ├─ i18n.js            # 字典与 i18n 运行时（四语）
  ├─ robots.txt
  ├─ sitemap.xml
  └─ 404.html
/.github
  └─ workflows
     └─ link-check.yml  # Lychee 链接体检

在线地址

首页：https://ben-del-cmd.github.io/p-feeding/

喂食计算器：https://ben-del-cmd.github.io/p-feeding/feeding.html

问题与建议：https://ben-del-cmd.github.io/p-feeding/feedback.html

所有页面支持 ?lang= 固定语言：en-US / es-419 / zh-Hans / fr-CA
例：/p-feeding/?lang=zh-Hans、/feeding.html?lang=es-419

多语言（i18n A 方案）

入口：/p-feeding/i18n.js?v=20250920b

选择优先级：?lang → localStorage → navigator.languages[0] || navigator.language

标注方式：

文本节点：data-i18n="key"

占位符：data-i18n-placeholder="key"

value：data-i18n-value="key"

手动切换：调用 window.__setLang('xx')（页面按钮已接）

新增/改文案：编辑 i18n.js 中 DICT 的相应语言键值即可。

缓存破坏（Cache-Buster）

三页统一引用带版本参数的字典脚本，避免旧缓存：

<script src="/p-feeding/i18n.js?v=20250920b" defer></script>


发布新版本时，将三页中的 ?v= 一起提升，如：20250920c。
提交信息建议：

chore(i18n): bump cache-buster to 20250920c


验证：DevTools → Network 勾 Disable cache，刷新应看到 /p-feeding/i18n.js?v=20250920b（或新版本）被加载。

站点统计（Plausible）

已在三页 <head> 中集成：

<script defer data-domain="ben-del-cmd.github.io" src="https://plausible.io/js/script.js"></script>


已埋自定义事件：

feedback_click：点击“Feedback / 问题与建议”（首页 & 计算器页）

feedback_preview_click（可选）：反馈页“预览草稿”

触发方式（安全写法）：
onclick="try{plausible('event_name')}catch(e){}"

可选推荐（Plausible 设置）：

启用 Outbound links、File downloads、404 pages 自动统计

Realtime 观测当前访客与页面路径

在 Goals 中登记上面两个事件（见文末图文教程）

SEO 基础

每页：<title>（随 i18n 更新）、<meta name="description">、Open Graph、canonical

sitemap.xml：列出首页/计算器/反馈页（如启用 B 方案多副本，再扩展多语言条目）

robots.txt：允许抓取，必要时对不需收录的页 Disallow: 声明

CI / 质量

Link Check：.github/workflows/link-check.yml（Lychee）

忽略表：.lycheeignore

提交规范：README.md / CONTRIBUTING.md

安全联络：/.well-known/security.txt

本地开发与验证

纯静态：可直接 GitHub 网页编辑 → Commit → 自动发布。

本地预览：可用任意静态 server（如 python -m http.server）。

快速自检：

DevTools → Network 勾 Disable cache

刷新确认 i18n.js?v=... 与 plausible.io/js/script.js 均加载

点击首页/计算器的 Feedback，在 Network 看到 https://plausible.io/api/event（202/200）

提交信息（建议模版）

i18n 升级：chore(i18n): bump cache-buster to 20250920b

SEO/sitemap：chore(seo): update sitemap lastmod to 2025-09-21

事件埋点：feat(analytics): track feedback_click (+ preview)

文档：docs(ops): record i18n A (4 langs) baseline

隐私

使用 Plausible（默认无 Cookie，不收集个人可识别信息），仅用于改进体验。

官方说明：https://plausible.io/privacy-focused-web-analytics

FAQ

Q1：切换语言没生效？
清缓存或 DevTools 勾 Disable cache，确认 i18n.js?v=... 版本一致；再试 ?lang= 强制语言。

Q2：Plausible 没数据/看不到脚本？
可能被浏览器扩展拦截，先禁用拦截器或用隐身窗口测试；确认 <head> 存在脚本标签且 data-domain="ben-del-cmd.github.io"。

Q3：再加新语言？
编辑 i18n.js → DICT 中新增语言键值；如需自动识别，在 normalizeLang() 补规则；三页统一 ?v= 升级。

变更记录（摘要）

2025-09-21

多语言 A（四语）上线

统一 cache-buster（v=20250920b）

Plausible 集成 + 基础自定义事件

SEO 基础标签 & sitemap/robots

Link Check 工作流

许可

MIT License © 2025 ben-del-cmd

Plausible：如何创建 Goals（自定义事件）

前端已埋两类事件：

feedback_click（首页/计算器页的“问题与建议”按钮）

feedback_preview_click（反馈页“预览草稿”按钮，可选）

将它们登记为 Goals：

步骤 1：进入 Goals

登录 plausible.io

选择站点 ben-del-cmd.github.io → 顶部 Settings → 左侧 Goals

如尚未建目录，请在仓库创建 docs/img/，见下方“截图文件放哪里”。

步骤 2：添加 Goal（Custom event）

点击 Add goal

Goal type 选择 Custom event

Event name 填写：feedback_click（与前端一致）

Add goal 保存

同法可再新增一条：feedback_preview_click（可选）

步骤 3：验证

打开网站 → 点击对应按钮触发事件

Plausible 仪表盘 → Realtime 或 Goals 应显示事件/转化

截图文件放哪里（目录约定）

请把步骤截图放到仓库 docs/img/ 目录下，例如：

/docs/img/plausible-goals-step1.png
/docs/img/plausible-goals-step2.png
/docs/img/plausible-goals-step3.png


在 README 中用：

![Step 1 - Open Goals](./docs/img/plausible-goals-step1.png)


现在没有截图也没关系，保留以上占位，后续上传 PNG 即可自动显示。

常见问题（Goals）

事件没出现？
检查是否加载 https://plausible.io/js/script.js，以及是否被广告拦截器屏蔽；事件名需与前端完全一致。

还需要开启 Custom properties 吗？
当前不需要。后续如做 A/B 或主题维度，再启用并在前端传 props:{...}。

提交信息（推荐）：

docs(readme): add badges + Plausible goals how-to with screenshot slots
