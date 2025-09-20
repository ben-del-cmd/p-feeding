# p-feeding · 宠物A计划（轻量工具集）

对外主站：<https://ben-del-cmd.github.io/p-feeding/>

## 当前页面
- `/` → 工具索引（含搜索）
- `/feeding.html` → 喂食计算器（简版）
- `/feedback.html` → 反馈页（跳转到 GitHub Issues 草稿）
- `/sitemap.xml`、`/robots.txt`、`/404.html`

## 发布与约定
- GitHub Pages 托管；静态文件加 `?v=YYYYMMDD` 防缓存（如 `cover.png?v=20250919`）
- 新增页面需同步：`index.html` 索引、`sitemap.xml`、必要时 `robots.txt`
- `feeding.html` 中保留配置位：`KCAL_PER_CUP`、`GRAMS_PER_CUP`
- 统计：Plausible（可移除 `<script defer ...>` 即停用）

## 本地/线上排错
- 强刷或无痕；仓库 → Settings → Pages 查看部署状态
- 浏览器扩展可能干扰 `sitemap.xml` 的可视展示（抓取不受影响），以「查看源文件/命令行」为准

## 授权
MIT（或按你的偏好替换）
