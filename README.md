多语言 A 上线说明（2025-09-21）

本次上线为站点 多语言 A 方案（四语）：English (en-US)、Español (es-419)、中文（简体，zh-Hans）、Français (Canada, fr-CA)。
覆盖页面：/p-feeding/index.html、/p-feeding/feeding.html、/p-feeding/feedback.html

访问与切换

语言由 ?lang=、localStorage、浏览器 navigator.language(s) 依次决定。

固定语言直达（示例）：

首页：

.../p-feeding/?lang=en-US

.../p-feeding/?lang=es-419

.../p-feeding/?lang=zh-Hans

.../p-feeding/?lang=fr-CA

计算器：.../p-feeding/feeding.html?lang=xx

反馈页：.../p-feeding/feedback.html?lang=xx

页内语言按钮使用 window.__setLang(lang)，会即时渲染并把语言写入本地存储。

前端实现

统一字典脚本：/p-feeding/i18n.js?v=20250920b（带版本号以防缓存）

自动应用到以下标记元素：

文本：[data-i18n]

占位符：[data-i18n-placeholder]

表单值：[data-i18n-value]

HTML 引用（三页已覆盖）：

<script src="/p-feeding/i18n.js?v=20250920b"></script>

文案字典（节选）

字典包含页面标题、主按钮、表单标签、提示说明等键值，例如：

title.index, h1.index, nav.feeding, nav.feedback

feeding.weight, feeding.unit, feeding.calc, footer.note.feeding

form.type, form.summary, form.details, btn.preview

完整键值见 i18n.js 内的 DICT。

开发/维护指南
1) 新增或修改文案

在 i18n.js 的 DICT[lang] 中增/改键值（四语都要维护）。

页面处加上相应 data-i18n / data-i18n-placeholder 等属性即可自动渲染。

2) 缓存控制

每次改动 i18n.js 后，务必同步更新三页中的版本号：

把 i18n.js?v=20250920b 递增为新值（如 20250920c）。

提交信息建议：
chore(i18n): bump cache-buster to 20250920c

3) 兼容性

语言优先顺序：?lang → localStorage(i18n.lang) → navigator.languages[0] || navigator.language。

未识别语言回退到 en-US。

验收清单（上线自检）

无痕窗口访问四个直达：en-US / es-419 / zh-Hans / fr-CA，标题、主按钮、表单与占位符均正确。

打开 DevTools → Network，勾选 Disable cache，确认三页均加载：

/p-feeding/i18n.js?v=20250920b   (200/304)


切换语言按钮即时生效，刷新后仍保持所选语言（校验 localStorage 中 i18n.lang）。

计算器与反馈页功能不受影响（计算结果/表单提交流程 OK）。

sitemap.xml 已更新 <lastmod>（如需对 SEO 及时生效）。

回滚与应急

仅页面文案异常：回退 i18n.js 到上一个版本号，并把三页的 ?v= 改回旧值。

若站点渲染异常：临时移除页面 <script src="/p-feeding/i18n.js?..."> 引用，恢复英文默认文案。

变更记录

2025-09-21：多语言 A（en-US / es-419 / zh-Hans / fr-CA）正式上线；安全初始化、navigator.languages 兼容、localStorage 键名统一为 i18n.lang；缓存破坏符版本 20250920b；更新 sitemap.xml.
