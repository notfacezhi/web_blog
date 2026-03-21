# MilkDown Markdown 编辑器

一个功能强大的在线 Markdown 编辑器，基于 MilkDown Crepe 构建。

## ✨ 特性

- 🎨 **所见即所得编辑** - 直观的编辑体验
- 🚀 **快速启动** - 开箱即用的完整功能
- 🌈 **美观主题** - 内置 Frame 主题
- 📱 **响应式设计** - 适配各种屏幕尺寸
- 🔧 **高度可定制** - 支持插件扩展
- 💾 **实时预览** - 即时查看渲染效果

## 🛠️ 技术栈

- **MilkDown Crepe** - 核心编辑器框架
- **TypeScript** - 类型安全
- **Vite** - 快速构建工具

## 📦 安装和运行

### 1. 安装依赖

```bash
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

编辑器将在 `http://localhost:3000` 启动。

### 3. 构建生产版本

```bash
npm run build
```

构建产物将在 `dist` 目录中。

### 4. 预览生产版本

```bash
npm run preview
```

## 🎯 使用方法

### 基本使用

1. 在编辑器中直接输入 Markdown 语法
2. 输入 `/` 打开快捷命令菜单
3. 使用工具栏进行格式化
4. 实时查看渲染效果

### 快捷键

- `Ctrl/Cmd + B` - 粗体
- `Ctrl/Cmd + I` - 斜体
- `Ctrl/Cmd + E` - 行内代码
- `Ctrl/Cmd + Shift + B` - 引用块
- `Ctrl/Cmd + Shift + 8` - 无序列表
- `Ctrl/Cmd + Shift + 7` - 有序列表

### 浏览器控制台命令

打开浏览器控制台，可以使用以下命令：

```javascript
// 获取当前 Markdown 内容
getMarkdown()

// 设置新的 Markdown 内容
setMarkdown("# 新标题\n\n新内容")

// 获取 HTML 内容
getHTML()

// 设置只读模式
setReadonly(true)

// 取消只读模式
setReadonly(false)
```

## 📝 支持的 Markdown 语法

- ✅ 标题 (h1-h6)
- ✅ 粗体、斜体、删除线
- ✅ 无序列表、有序列表
- ✅ 代码块（支持语法高亮）
- ✅ 引用块
- ✅ 表格
- ✅ 链接、图片
- ✅ 分割线
- ✅ 任务列表

## 🎨 主题定制

编辑器使用 Frame 主题，你可以通过修改 CSS 变量来自定义样式：

```css
:root {
  --crepe-color-primary: #your-color;
  --crepe-color-background: #your-background;
  /* 更多变量... */
}
```

## 🔧 配置和扩展

### 添加新功能

编辑器配置在 `src/main.ts` 文件中：

```typescript
const crepe = new Crepe({
  root: "#app",
  defaultValue: "你的初始内容",
  // 更多配置选项...
});
```

### 启用/禁用功能

```typescript
const crepe = new Crepe({
  root: "#app",
  features: {
    [Crepe.Feature.Table]: false,    // 禁用表格
    [Crepe.Feature.CodeMirror]: false, // 禁用代码高亮
  },
});
```

## 🚀 部署

### 部署到静态服务器

1. 构建项目：`npm run build`
2. 将 `dist` 目录内容部署到你的服务器

### 部署示例

- **Nginx**: 将 `dist` 目录指向网站根目录
- **Vercel**: 直接连接 Git 仓库自动部署
- **Netlify**: 拖拽 `dist` 目录到部署界面

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📧 联系方式

如有问题，请提交 Issue。

---

**享受高效的 Markdown 编辑体验！** ✨
