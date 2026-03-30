# 博客系统使用说明

## 🏗️ 架构说明

本项目采用 **前后端分离** 架构：

```
┌─────────────────────────────────────┐
│  前端 (端口 3000)                    │
│  ├─ HTML/CSS/JavaScript              │
│  ├─ 静态文件服务                     │
│  └─ 调用后端 API                     │
└─────────────────────────────────────┘
              ↓ HTTP 请求
┌─────────────────────────────────────┐
│  后端 (端口 8091)                    │
│  ├─ FastAPI                          │
│  ├─ 提供 RESTful API                 │
│  └─ 自动扫描文章目录                 │
└─────────────────────────────────────┘
```

## 🚀 快速开始

### 1. 安装依赖

```bash
pip install -r requirements.txt
```

### 2. 启动服务（需要启动两个服务）

#### 方式一：分别启动（推荐）

**终端 1 - 启动后端 API:**
```bash
# Windows
start.bat

# Linux/Mac
./start.sh

# 或直接运行
python server.py
```

**终端 2 - 启动前端:**
```bash
# Windows
start-frontend.bat

# Linux/Mac
./start-frontend.sh

# 或直接运行
python -m http.server 3000
```

#### 方式二：后端开发模式
```bash
uvicorn server:app --reload
```

### 3. 访问博客

- **前端页面**: `http://localhost:3000` ⭐
- **后端 API**: `http://localhost:8091`
- **API 文档**: `http://localhost:8091/docs`

## 📝 添加新文章

### 超简单！只需 2 步：

#### 步骤 1：创建 Markdown 文件

在 `articles/` 目录下创建 `.md` 文件，例如 `article-4.md`：

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
```

#### 步骤 2：刷新页面

就这么简单！**无需修改任何代码**，Python 服务会自动扫描 `articles/` 目录。

## 🎨 添加图片

1. 将图片放到 `img/` 目录
2. 在 Markdown 中引用：

```markdown
![图片描述](img/your-image.jpg)
```

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

## 🔄 工作流程

```
1. 创建 article-X.md 到 articles/ 目录
   ↓
2. 编写 Front Matter + 正文
   ↓
3. 刷新浏览器
   ↓
4. 完成！文章自动显示
```

## 🌐 部署到服务器（前后端分离）

### 架构方案

```
用户浏览器
    ↓
Nginx (80/443)
    ├─ / → 前端静态文件 (blog/)
    └─ /api → 后端 API (localhost:8091)
```

### Nginx 配置示例

```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    # 前端静态文件
    location / {
        root /path/to/blog;
        index index.html;
        try_files $uri $uri/ /index.html;
    }
    
    # 后端 API 代理
    location /api {
        proxy_pass http://localhost:8091;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    # API 文档
    location /docs {
        proxy_pass http://localhost:8091;
    }
    
    location /openapi.json {
        proxy_pass http://localhost:8091;
    }
}
```

### 后端生产环境运行

**使用 Gunicorn (推荐):**

```bash
pip install gunicorn
gunicorn server:app -w 4 -k uvicorn.workers.UvicornWorker --bind 127.0.0.1:8091
```

### 前端配置

修改 `config.js` 中的 API 地址：

```javascript
const API_CONFIG = {
    baseURL: 'https://your-domain.com',  // 生产环境地址
    // ...
};
```

### 后台运行

**使用 systemd (推荐):**

创建 `/etc/systemd/system/blog.service`：

```ini
[Unit]
Description=Blog FastAPI Service
After=network.target

[Service]
Type=simple
User=your-user
WorkingDirectory=/path/to/blog
ExecStart=/usr/bin/python3 /path/to/blog/server.py
Restart=always
RestartSec=3

[Install]
WantedBy=multi-user.target
```

启动服务：
```bash
sudo systemctl start blog
sudo systemctl enable blog
sudo systemctl status blog
```

**使用 Supervisor:**

```ini
[program:blog]
command=/usr/bin/python3 /path/to/blog/server.py
directory=/path/to/blog
autostart=true
autorestart=true
stderr_logfile=/var/log/blog.err.log
stdout_logfile=/var/log/blog.out.log
```

## 📦 项目结构

```
blog/
├── 后端 (Backend)
│   ├── server.py              # FastAPI 后端服务 ⭐
│   ├── requirements.txt       # Python 依赖
│   ├── start.bat/sh           # 后端启动脚本
│   └── articles/              # 文章目录（Markdown 文件）
│       ├── article-1.md
│       ├── article-2.md
│       └── README.md
│
├── 前端 (Frontend)
│   ├── index.html             # 首页
│   ├── article.html           # 文章详情页
│   ├── config.js              # API 配置 ⭐
│   ├── articles.js            # 文章加载逻辑
│   ├── script.js              # 业务逻辑
│   ├── archive.js             # 列表页逻辑
│   ├── style.css              # 样式文件
│   ├── start-frontend.bat/sh  # 前端启动脚本
│   ├── img/                   # 图片目录
│   └── fonts/                 # 字体文件
│
└── README.md                  # 项目文档
```

## 🎯 核心特性

- ✅ **前后端分离**：清晰的架构，易于扩展和部署
- ✅ **零配置**：添加文章无需修改代码
- ✅ **自动扫描**：FastAPI 自动发现新文章
- ✅ **RESTful API**：标准化的 API 接口
- ✅ **API 文档**：自动生成 Swagger 文档
- ✅ **Markdown 支持**：完整的 Markdown 语法
- ✅ **响应式设计**：支持移动端
- ✅ **极简风格**：黑白配色，专注内容

## 🛠️ API 接口

FastAPI 服务提供以下 API：

- `GET /api/articles` - 获取所有文章 ID 列表
- `GET /api/article/{id}` - 获取指定文章的 Markdown 内容
- `GET /docs` - Swagger API 交互式文档 ⭐
- `GET /redoc` - ReDoc API 文档

**API 文档示例：**

访问 `http://localhost:8000/docs` 可以直接在浏览器中测试所有 API！

## 📌 注意事项

1. **文件名与 ID 一致**：`article-4.md` 的 Front Matter 中 `id` 必须是 `article-4`
2. **日期格式**：必须是 `YYYY-MM-DD` 格式
3. **Front Matter 格式**：必须用 `---` 包裹，且在文件最开头
4. **Python 版本**：需要 Python 3.6+

## 🐛 常见问题

### Q: 新文章不显示？
A: 刷新浏览器，清除缓存（Ctrl+F5）

### Q: 图片不显示？
A: 检查图片路径是否正确，相对于 HTML 文件的位置

### Q: 修改端口？
A: 编辑 `server.py`，修改 `run_server(8000)` 中的端口号

## 💡 提示

- 使用 VS Code 等编辑器编写 Markdown，支持实时预览
- 图片建议压缩后再上传，提升加载速度
- 定期备份 `articles/` 目录

---

**现在开始写作吧！** 🎉
