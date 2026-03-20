# Markdown文章系统使用说明

## 📖 概述

本博客系统使用Markdown格式存储和渲染文章内容,支持从本地JavaScript对象存储到数据库的平滑迁移。

## 🎯 核心特性

- ✅ **Markdown渲染**: 使用marked.js将Markdown转换为HTML
- ✅ **本地存储**: 文章数据存储在`articles.js`中
- ✅ **易于迁移**: 数据结构设计便于后期迁移到数据库
- ✅ **动态加载**: 通过URL参数加载不同文章
- ✅ **自动目录**: 自动从H2标题生成文章目录

## 📁 文件结构

```
blog/
├── index.html          # 主页面
├── style.css           # 样式文件
├── script.js           # 主要JavaScript逻辑
├── articles.js         # 文章数据存储
└── fonts/              # 字体文件夹
    └── NanoFullSong-Regular.ttf
```

## 📝 添加新文章

### 1. 在articles.js中添加文章数据

```javascript
const articlesData = {
    'article-1': {
        id: 'article-1',
        title: '文章标题',
        author: '作者名',
        date: '2026-03-12',  // YYYY-MM-DD格式
        categories: ['分类1', '分类2'],
        content: `这里是Markdown格式的文章内容

## 一级标题

这是正文段落。

- 列表项1
- 列表项2

> 引用文本

**加粗文本** 和 *斜体文本*
`
    },
    'article-2': {
        // 新文章数据...
    }
};
```

### 2. Markdown语法支持

支持标准Markdown语法:

- **标题**: `## 标题` (H2-H6)
- **加粗**: `**文本**`
- **斜体**: `*文本*`
- **链接**: `[链接文本](URL)`
- **列表**: `- 项目` 或 `1. 项目`
- **引用**: `> 引用文本`
- **代码**: \`行内代码\` 或 \`\`\`代码块\`\`\`

### 3. 访问文章

通过URL参数访问不同文章:

```
index.html              # 默认显示article-1
index.html?id=article-2 # 显示article-2
```

## 🔄 迁移到数据库

当需要迁移到数据库时,只需修改`articles.js`中的函数:

### 当前实现(本地存储)

```javascript
function getArticle(articleId) {
    return articlesData[articleId];
}
```

### 迁移后实现(数据库API)

```javascript
async function getArticle(articleId) {
    const response = await fetch(`/api/articles/${articleId}`);
    return await response.json();
}
```

### 数据库表结构建议

```sql
CREATE TABLE articles (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    author VARCHAR(100) NOT NULL,
    date DATE NOT NULL,
    categories JSON,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## 🎨 样式定制

文章内容使用宋体字体渲染,在`style.css`中定义:

```css
.article-content {
    font-family: var(--font-article);
}
```

## 🔧 配置marked.js

在`script.js`中可以配置Markdown渲染选项:

```javascript
marked.setOptions({
    breaks: true,        // 支持换行
    gfm: true,          // GitHub风格Markdown
    headerIds: true,    // 自动生成标题ID
    mangle: false       // 不混淆邮箱地址
});
```

## 📊 数据结构说明

### 文章对象结构

```javascript
{
    id: 'article-1',              // 唯一标识符
    title: '文章标题',            // 文章标题
    author: '作者名',             // 作者
    date: '2026-03-12',          // 发布日期(YYYY-MM-DD)
    categories: ['分类1', '分类2'], // 分类数组
    content: 'Markdown内容'       // Markdown格式的正文
}
```

## 🚀 扩展功能建议

### 1. 文章列表页

创建`list.html`显示所有文章:

```javascript
const articles = getAllArticles();
articles.forEach(article => {
    // 渲染文章卡片
});
```

### 2. 搜索功能

```javascript
function searchArticles(keyword) {
    return getAllArticles().filter(article => 
        article.title.includes(keyword) || 
        article.content.includes(keyword)
    );
}
```

### 3. 标签系统

在文章对象中添加`tags`字段:

```javascript
{
    tags: ['标签1', '标签2'],
    // ...其他字段
}
```

## 💡 最佳实践

1. **文章ID命名**: 使用有意义的ID,如`content-strategy-2026-03`
2. **日期格式**: 统一使用ISO格式`YYYY-MM-DD`
3. **图片处理**: 建议将图片放在`images/`文件夹,在Markdown中使用相对路径
4. **代码高亮**: 可以集成`highlight.js`实现代码语法高亮
5. **SEO优化**: 动态更新`<title>`和meta标签

## 🐛 常见问题

### Q: 文章不显示?
A: 检查浏览器控制台是否有错误,确认文章ID正确

### Q: Markdown没有正确渲染?
A: 确认marked.js已正确加载,检查网络请求

### Q: 中文字体不显示?
A: 确认`fonts/NanoFullSong-Regular.ttf`文件存在

## 📞 技术支持

如有问题,请检查:
1. 浏览器控制台错误信息
2. 文章数据格式是否正确
3. JavaScript文件加载顺序(articles.js → script.js)
