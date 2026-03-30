# 文章管理说明

## 📝 如何添加新文章

### 1. 创建 Markdown 文件

在 `articles/` 目录下创建新的 `.md` 文件，文件名格式：`article-{id}.md`

例如：`article-4.md`

### 2. 编写文章内容

每篇文章必须包含 **Front Matter**（元数据）和**正文内容**：

```markdown
---
id: article-4
title: 你的文章标题
author: 作者名字
date: 2026-03-20
categories: 分类1, 分类2
tags: 标签1, 标签2, 标签3
excerpt: 文章摘要，会显示在列表页
---

这里开始写正文内容，支持完整的 Markdown 语法。

## 二级标题

段落内容...

### 三级标题

- 列表项 1
- 列表项 2

**粗体文字** 和 *斜体文字*

> 引用块

\`\`\`javascript
// 代码块
console.log('Hello World');
\`\`\`
```

### 3. 更新文章索引

编辑 `articles.js` 文件，在 `articlesList` 数组中添加新文章的 ID：

```javascript
const articlesList = [
    'article-1',
    'article-2',
    'article-3',
    'article-4'  // 新增
];
```

### 4. 完成！

刷新页面即可看到新文章。

## 📋 Front Matter 字段说明

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `id` | 字符串 | ✅ | 文章唯一标识，与文件名一致 |
| `title` | 字符串 | ✅ | 文章标题 |
| `author` | 字符串 | ✅ | 作者名字 |
| `date` | 日期 | ✅ | 发布日期，格式：YYYY-MM-DD |
| `categories` | 字符串 | ✅ | 分类，多个用逗号分隔 |
| `tags` | 字符串 | ❌ | 标签，多个用逗号分隔 |
| `excerpt` | 字符串 | ✅ | 文章摘要 |

## 🎨 Markdown 支持

支持标准 Markdown 语法：

- **标题**：`# H1` 到 `###### H6`
- **粗体**：`**文字**` 或 `__文字__`
- **斜体**：`*文字*` 或 `_文字_`
- **链接**：`[文字](URL)`
- **图片**：`![描述](路径)`
- **列表**：`-` 或 `1.`
- **引用**：`> 引用内容`
- **代码**：`` `行内代码` `` 或 ` ```语言 ` 代码块
- **表格**：支持 GFM 表格语法

## 🖼️ 图片使用

图片放在 `img/` 目录下，在 Markdown 中引用：

```markdown
![图片描述](img/your-image.jpg)
```

## 🔄 工作流程

```
1. 创建 article-X.md
   ↓
2. 编写 Front Matter + 正文
   ↓
3. 更新 articles.js 索引
   ↓
4. 刷新页面查看效果
```

## ⚡ 优势

- ✅ **简单直观**：直接编辑 Markdown 文件
- ✅ **版本控制**：所有文章都是文本文件，易于 Git 管理
- ✅ **无需数据库**：纯静态文件，可部署到任何静态托管服务
- ✅ **快速预览**：本地打开即可预览
- ✅ **易于备份**：复制整个 articles 目录即可

## 🚀 部署

本项目是纯静态网站，可以部署到：

- GitHub Pages
- Netlify
- Vercel
- 任何支持静态文件的服务器

只需上传整个 `blog/` 目录即可。

## 📌 注意事项

1. **文件名与 ID 一致**：`article-4.md` 的 Front Matter 中 `id` 必须是 `article-4`
2. **日期格式**：必须是 `YYYY-MM-DD` 格式
3. **Front Matter 格式**：必须用 `---` 包裹，且在文件最开头
4. **逗号分隔**：categories 和 tags 用英文逗号 `,` 分隔
5. **本地测试**：需要通过 HTTP 服务器访问（不能直接双击打开 HTML），因为需要 fetch 加载 Markdown 文件

## 🛠️ 本地开发

使用任意 HTTP 服务器，例如：

```bash
# Python 3
python -m http.server 8000

# Node.js (需要安装 http-server)
npx http-server

# PHP
php -S localhost:8000
```

然后访问 `http://localhost:8000`
