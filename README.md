Pet Feeding Tools (/p-feeding)

简洁好用的宠物喂食小工具集合：喂食计算器、问题与建议等。
站点托管在 GitHub Pages：https://ben-del-cmd.github.io/p-feeding/

多语言（四语）：en-US / es-419 / zh-Hans / fr-CA

零依赖、纯静态文件，无构建流程

隐私友好的站点统计：Plausible Analytics

目录结构
/p-feeding
  ├─ index.html         # 首页（多语切换、站内导航）
  ├─ feeding.html       # 喂食计算器
  ├─ feedback.html      # 反馈页（点击跳 GitHub 新 issue）
  ├─ i18n.js            # 站内字典与 i18n 运行时
  ├─ robots.txt
  └─ sitemap.xml

在线访问

首页
https://ben-del-cmd.github.io/p-feeding/

喂食计算器
https://ben-del-cmd.github.io/p-feeding/feeding.html

问题与建议
https://ben-del-cmd.github.io/p-feeding/feedback.html

所有页面均支持 ?lang= 强制语言，例如：

...?lang=en-US

...?lang=es-419

...?lang=zh-Hans

...?lang=fr-CA

多语言（i18n）

语言优先级：?lang 参数 → localStorage → navigator.languages[0] / navigator.language

页面上的可翻译文案均通过 data-i18n / data-i18n-placeholder / data-i18n-value 自动替换。

手动切换语言：页面底部语言按钮 → 调用 window.__setLang(lang)。

想新增/修改文案：直接编辑 i18n.js 里的 DICT 对象的对应语言块即可。

缓存更新（Cache-Buster）

为避免浏览器缓存旧脚本，所有 HTML 通过版本参数引用 i18n：

<script src="/p-feeding/i18n.js?v=20250920b" defer></script>


如需发布新字典，建议统一将三页中的版本号一起提升（例如从 20250920b → 20250920c），并提交：

chore(i18n): bump cache-buster to 20250920c

验证是否生效

打开页面 → DevTools → Network

勾选 Disable cache

刷新页面，确认有请求 /p-feeding/i18n.js?v=... 且参数为新版本。

站点统计（Plausible）

已集成官方脚本（隐私友好）：

<script defer data-domain="ben-del-cmd.github.io" src="https://plausible.io/js/script.js"></script>

自定义事件（已埋点）

feedback_click
触发位置：

首页 顶部「Feedback / 问题与建议」按钮

喂食计算器 页顶部「Feedback / 问题与建议」按钮

feedback_preview_click（可选）
触发位置：

反馈页的「预览草稿」按钮（将跳转到 GitHub 新 Issue 页面）

事件触发均为内联的安全调用：
onclick="try{plausible('event_name')}catch(e){}"

在 Plausible 后台添加 Goals

打开你的站点仪表盘 → Settings → Goals

Add goal → 类型选择 Custom event

分别创建：

feedback_click

（可选）feedback_preview_click

添加后即可在 Dashboard 的 Goals 模块中看到转化指标。

SEO / 头部信息

三页均已内置基础 SEO：

<title>（用 data-i18n 动态覆盖）

<meta name="description">

Open Graph：og:type / og:title / og:description / og:url

link rel="canonical"

如需进一步增强（OG 图片、Twitter Card、结构化数据等），可直接在各页面 <head> 内补充。

提交信息（Commit Message）建议

i18n 更新（含版本参数）
chore(i18n): bump cache-buster to 20250920b

SEO / 站点地图
chore(seo): update sitemap lastmod to 2025-09-21

文档/记录
docs(ops): record i18n A (4 langs) baseline

本地开发与验证

这是一个纯静态站，不需要构建；直接在 GitHub 网页 Edit → Commit 即可上线。

如需本地预览，任意静态 HTTP 服务都可，比如 VS Code Live Server / python -m http.server 等。

验证 i18n & 缓存：

DevTools → Network 勾Disable cache

刷新，检查 i18n.js?v=... 版本是否匹配

验证 Plausible：

打开首页或计算器页

点击「Feedback」按钮

在 Plausible 仪表盘实时面板查看事件（或等数据累计）

隐私与数据

站点使用 Plausible Analytics 进行匿名化统计：不使用 Cookie，不收集个人身份信息，用于改善产品体验。

详见：https://plausible.io/privacy-focused-web-analytics

常见问题（FAQ）

Q: 页面上还是旧语言？
A: 先清缓存或使用 DevTools 勾选 Disable cache 刷新；确认 i18n.js?v=... 的版本参数已统一升级。

Q: Plausible 没看到事件？
A:

先在后台添加对应 Custom event 的 Goal（名称需与页面触发名一致）；

确认网络中已成功加载 https://plausible.io/js/script.js；

第一次可能有少量延迟。

Q: 想增加第 5 种语言？
A: 直接在 i18n.js 的 DICT 添加新语言块，并在 normalizeLang() 里加规则（或在页面增加手动切换按钮）。更新后记得统一提升版本参数 ?v=。

变更记录（Changelog 摘要）

2025-09-21

i18n A：四语言首轮上线

Safe init（即使未 defer 加载也安全）

统一的缓存破坏参数 ?v=20250920b

Plausible 集成 + 自定义事件 feedback_click / feedback_preview_click

基础 SEO/OG、站点地图 sitemap.xml 与 robots.txt

许可

MIT License © 2025 ben-del-cmd

如果你后续要扩展更多工具（例如体脂估算、营养占比、喂食计划表导出），保持当前的 “纯静态 + i18n + Plausible 事件” 结构即可，改动成本很低。需要模板我可以再补。
