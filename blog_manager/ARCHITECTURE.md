# MilkDown 项目架构解析

## 📚 项目定义

**MilkDown** 是一个现代化的 **WYSIWYG Markdown 编辑器框架**，基于 ProseMirror 和 Remark 构建。

### 核心概念解释：

#### 1. WYSIWYG (What You See Is What You Get)
- **含义**: "所见即所得"
- **体验**: 像 Word 文档一样编辑，实时显示格式效果
- **输出**: 最终保存的是 Markdown 纯文本，不是 HTML

#### 2. 框架 vs 应用
- **MilkDown 是框架**: 提供编辑能力，需要自己配置
- **Crepe 是应用**: 基于 MilkDown 的完整编辑器，开箱即用

#### 3. 无头编辑器 (Headless Editor)
- **特点**: 不带任何 UI 样式
- **优势**: 完全自定义外观
- **劣势**: 需要自己写样式

## 🏗️ 技术架构

```
┌─────────────────────────────────────────┐
│         用户界面层 (你控制)              │
│  - CSS 样式                             │
│  - 按钮和工具栏                          │
│  - 布局和设计                            │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│      Crepe 层 (可选的完整编辑器)          │
│  - 开箱即用的编辑器                       │
│  - 内置主题和功能                         │
│  - 快速启动解决方案                       │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│      插件层 (功能模块)                   │
│  - 语法插件: CommonMark, GFM             │
│  - UI 插件: Tooltip, Slash, Block        │
│  - 功能插件: 表格, 数学公式, 协作编辑      │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│      核心层 (Milkdown Core)              │
│  - 插件管理系统                          │
│  - 状态管理 (Context)                    │
│  - 命令系统                              │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│      底层技术                             │
│  - ProseMirror: 富文本编辑框架            │
│  - Remark: Markdown 解析器               │
└─────────────────────────────────────────┘
```

## 🔄 数据转换流程

```
用户输入 Markdown 文本
        ↓
┌──────────────────┐
│  Remark 解析器    │  → Markdown AST (抽象语法树)
└──────────────────┘
        ↓
┌──────────────────┐
│  ProseMirror     │  → ProseMirror 文档树
│  Schema 转换     │
└──────────────────┘
        ↓
┌──────────────────┐
│  编辑器显示       │  → 用户看到的富文本
└──────────────────┘
        ↓
┌──────────────────┐
│  序列化         │  → Markdown 文本 (保存)
└──────────────────┘
```

## 🆚 与其他编辑器的区别

### 1. Markdown 纯编辑器 (如 Typora)
```typescript
// 传统 Markdown 编辑器
- 通常是桌面应用
- 功能固定，无法扩展
- 样式和功能耦合在一起
```

### 2. 富文本编辑器 (如 Quill, TinyMCE)
```typescript
// 传统富文本编辑器
- 输出 HTML，不是 Markdown
- 不支持 Markdown 语法
- 功能固定，扩展困难
```

### 3. MilkDown
```typescript
// MilkDown 的优势
- 输出 Markdown 纯文本
- 支持所见即所得编辑
- 插件化架构，高度可扩展
- 可以精确控制每个功能
- 支持协作编辑
```

## 🎯 设计理念

### 1. 插件驱动 (Plugin-Driven)
```typescript
// 所有功能都是插件
Editor.make()
  .use(commonmark)     // 基础语法
  .use(gfm)            // GitHub 风格 Markdown
  .use(history)        // 撤销/重做
  .use(table)          // 表格支持
  .use(slash)          // 斜杠命令
  .use(tooltip);       // 工具提示
```

### 2. 状态管理 (Context System)
```typescript
// 编辑器状态通过 Context 管理
const editor = Editor.make()
  .config((ctx) => {
    // 设置默认值
    ctx.set(defaultValueCtx, "# Hello");

    // 监听变化
    ctx.get(listenerCtx).markdownUpdated((ctx, markdown) => {
      console.log("内容更新:", markdown);
    });
  });
```

### 3. 命令系统 (Command System)
```typescript
// 通过命令操作编辑器
editor.action((ctx) => {
  const commands = ctx.get(commandsCtx);

  // 执行命令
  commands.call(toggleBoldCommand.key);

  // 插入内容
  insert("# 新标题")(ctx);
});
```

## 🌟 适用场景

### 1. 博客系统
```typescript
// 适合写作博客文章
- Markdown 格式，便于版本控制
- 所见即所得，提升写作体验
- 支持代码高亮、表格等丰富功能
```

### 2. 文档系统
```typescript
// 适合技术文档
- 支持 Mermaid 图表
- 支持数学公式
- 可以添加自定义功能
```

### 3. 笔记应用
```typescript
// 适合个人笔记
- 协作编辑支持
- 快速搜索和导航
- 可以集成云存储
```

### 4. 内容管理系统
```typescript
// 适合 CMS 后台
- 无头设计，可以完全自定义 UI
- 插件化，可以精确控制功能
- 支持多用户协作
```

## 💡 核心价值

1. **开发体验**: TypeScript 支持，类型安全
2. **用户体验**: 所见即所得，操作流畅
3. **可扩展性**: 插件系统，功能随意组合
4. **可维护性**: 代码结构清晰，易于维护
5. **性能**: 基于 ProseMirror，性能优秀

## 🎓 学习曲线

### 初级 (快速上手)
```typescript
// 使用 Crepe，5分钟上手
import { Crepe } from "@milkdown/crepe";

const editor = new Crepe({
  root: "#app",
  defaultValue: "Hello World",
});
editor.create();
```

### 中级 (自定义配置)
```typescript
// 使用 Milkdown + 插件
Editor.make()
  .use(commonmark)
  .use(gfm)
  .use(history)
  .use(listener)
  .config((ctx) => {
    // 自定义配置
  });
```

### 高级 (开发插件)
```typescript
// 开发自定义插件
const myPlugin: MilkdownPlugin = (ctx) => {
  return async () => {
    // 插件逻辑
  };
};
```

## 🔮 技术前景

MilkDown 代表了新一代编辑器的发展趋势：
- **无头化**: 关注点分离，样式和逻辑分离
- **插件化**: 功能模块化，按需加载
- **协作化**: 内置协作支持
- **标准化**: 基于 Web 标准，跨平台

这就是 MilkDown 项目的本质和特点！
