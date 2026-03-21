# MilkDown 项目运行方式详解

## 🚀 运行流程总览

```
用户操作 → 浏览器 → Vite 服务器 → TypeScript 代码 → MilkDown 编辑器
```

## 📋 详细运行步骤

### 1. **启动阶段**

```bash
# 1. 安装依赖
npm install
↓
# 下载 216 个包 (node_modules/)
↓
# MilkDown 核心包
# - @milkdown/crepe
# - @milkdown/theme-nord
# - 相关依赖...
```

### 2. **开发服务器启动**

```bash
npm run dev
↓
# Vite 启动开发服务器
↓
# 监听文件变化
↓
# 在 http://localhost:3000 运行
```

### 3. **页面加载流程**

```html
<!-- index.html -->
<html>
  <head>
    <title>MilkDown 编辑器</title>
  </head>
  <body>
    <div id="app"></div>  <!-- 编辑器容器 -->
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

### 4. **JavaScript 执行流程**

```typescript
// main.ts 执行步骤：

// 第1步：导入依赖
import { Crepe } from "@milkdown/crepe";
import "@milkdown/crepe/theme/common/style.css";
import "@milkdown/crepe/theme/frame.css";

// 第2步：创建编辑器实例
const crepe = new Crepe({
  root: "#app",              // 挂载到 DOM 元素
  defaultValue: "初始内容",    // 默认文本
});

// 第3步：初始化编辑器
crepe.create();
↓
// MilkDown 内部执行：
// 1. 创建 ProseMirror 编辑器实例
// 2. 配置 Markdown 解析器
// 3. 初始化插件系统
// 4. 渲染编辑器界面
// 5. 绑定事件监听器
```

## 🔄 实时运行机制

### **开发模式热更新**

```
你修改代码
    ↓
Vite 检测到文件变化
    ↓
快速重新编译 (毫秒级)
    ↓
浏览器自动刷新
    ↓
看到最新效果
```

### **编辑器运行时**

```typescript
// 用户输入时的处理流程：

用户输入 "# 标题"
    ↓
键盘事件触发
    ↓
ProseMirror 处理输入
    ↓
转换为 Markdown AST
    ↓
更新编辑器显示
    ↓
触发监听器
    ↓
保存状态到内部数据结构
```

## 🎯 核心技术运行机制

### **1. Vite 开发服务器**

```javascript
// vite.config.ts
export default defineConfig({
  server: {
    port: 3000,        // 监听端口
    open: true         // 自动打开浏览器
  },
  build: {
    outDir: 'dist',    // 构建输出目录
    sourcemap: true    // 生成源码映射
  }
})
```

**工作原理：**
- 启动本地 HTTP 服务器
- 实时编译 TypeScript
- 支持热模块替换 (HMR)
- 提供开发工具支持

### **2. TypeScript 编译**

```typescript
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",           // 编译目标
    "module": "ESNext",           // 模块系统
    "moduleResolution": "bundler", // 模块解析
    "jsx": "preserve"             // JSX 处理
  }
}
```

**编译流程：**
```
main.ts (TypeScript)
    ↓
类型检查
    ↓
转译为 JavaScript
    ↓
浏览器可执行代码
```

### **3. MilkDown 运行时**

```typescript
// 编辑器生命周期：

1. 初始化阶段 (crepe.create())
   ├── 创建 DOM 结构
   ├── 初始化 ProseMirror
   ├── 配置插件系统
   └── 绑定事件监听

2. 运行阶段 (用户交互)
   ├── 接收用户输入
   ├── 处理键盘/鼠标事件
   ├── 更新编辑器状态
   ├── 触发相应的监听器
   └── 维护撤销/重做历史

3. 销毁阶段 (crepe.destroy())
   ├── 清理事件监听
   ├── 释放内存资源
   └── 移除 DOM 元素
```

## 🌐 网络请求流程

### **开发模式**

```
浏览器访问: http://localhost:3000
    ↓
Vite 服务器接收请求
    ↓
┌────────────────────────────────┐
│ 请求处理流程                    │
├────────────────────────────────┤
│ 1. index.html                  │
│    → 返回 HTML 页面             │
│                                 │
│ 2. /src/main.ts                │
│    → 编译 TypeScript            │
│    → 返回 JavaScript            │
│                                 │
│ 3. /node_modules/...           │
│    → 解析模块导入               │
│    → 返回依赖包                 │
│                                 │
│ 4. *.css                       │
│    → 注入到页面                 │
└────────────────────────────────┘
```

### **生产模式**

```bash
npm run build
    ↓
# 构建流程：
1. TypeScript 编译
2. 代码压缩优化
3. 模块打包合并
4. 生成静态文件
    ↓
dist/
├── index.html          # 入口页面
├── assets/
│   ├── index-xxx.js   # 打包后的 JS
│   └── index-xxx.css  # 打包后的 CSS
└── ...

# 然后可以部署到任何静态服务器
```

## 💾 数据处理流程

### **Markdown 转换流程**

```typescript
// 用户输入 → 显示 → 保存

用户输入: "# 标题\n\n内容"
    ↓
[解析阶段]
Remark 解析器
    ↓
Markdown AST
    ↓
[转换阶段]
ProseMirror Schema
    ↓
ProseMirror Document
    ↓
[显示阶段]
渲染到 DOM
    ↓
用户看到的富文本

// 同时支持反向转换：
用户选择获取 Markdown
    ↓
[序列化阶段]
ProseMirror Document
    ↓
Markdown AST
    ↓
Remark 序列化器
    ↓
"# 标题\n\n内容" (纯文本)
```

## 🔧 开发调试流程

### **1. 查看日志**

```typescript
// 在代码中添加日志
console.log("编辑器初始化...");

// 浏览器控制台查看
F12 → Console 标签
```

### **2. 调试代码**

```typescript
// 设置断点
crepe.create().then(() => {
  debugger; // 代码会在这里暂停
  console.log("编辑器已创建");
});
```

### **3. 测试命令**

```javascript
// 在浏览器控制台测试
getMarkdown()           // 获取内容
setMarkdown("新内容")   // 设置内容
getHTML()              // 获取 HTML
```

## 🚦 常见运行问题

### **问题1：端口被占用**
```bash
Error: Port 3000 is already in use

# 解决方法1：修改端口
vite.config.ts: port: 3001

# 解决方法2：关闭占用端口的程序
netstat -ano | findstr :3000
taskkill /PID <进程ID> /F
```

### **问题2：依赖安装失败**
```bash
Error: Cannot find module '@milkdown/crepe'

# 解决方法：
rm -rf node_modules package-lock.json
npm install
```

### **问题3：编译错误**
```bash
TypeScript error: Cannot find module

# 解决方法：
# 检查导入路径是否正确
# 检查 tsconfig.json 配置
# 重启开发服务器
```

## 📊 性能优化

### **开发模式优化**
- ⚡ Vite 的快速热更新
- 📦 按需编译，只编译修改的文件
- 🔧 浏览器缓存策略

### **生产模式优化**
- 🗜️ 代码压缩混淆
- 📦 模块打包合并
- 🌐 CDN 部署支持

## 🎯 总结

**运行方式核心要点：**

1. **本地开发**: Vite 提供开发服务器，支持热更新
2. **编译流程**: TypeScript → JavaScript → 浏览器执行
3. **编辑器运行**: ProseMirror + Remark 协同工作
4. **数据转换**: Markdown ↔ 富文本 ↔ HTML
5. **生产部署**: 构建为静态文件，部署到服务器

这个项目运行在你的**浏览器**中，通过**Vite 开发服务器**提供支持，**MilkDown**负责编辑器功能！
