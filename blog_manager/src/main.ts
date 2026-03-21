import { Crepe } from "@milkdown/crepe";
import "@milkdown/crepe/theme/common/style.css";
import "@milkdown/crepe/theme/frame.css";
import { replaceAll, getHTML as getHTMLUtil } from "@milkdown/kit/utils";

// 扩展window对象类型
declare global {
  interface Window {
    getMarkdown: () => string;
    setMarkdown: (markdown: string) => void;
    getHTML: () => string;
    setReadonly: (readonly: boolean) => void;
  }
}

// 创建编辑器实例
const crepe = new Crepe({
  root: "#app",
  defaultValue: `# Welcome to MilkDown! 🎉

这是一个功能强大的 **Markdown 编辑器**，基于 MilkDown Crepe 构建。

## 主要特性

- ✨ **所见即所得** - 直观的编辑体验
- 🎨 **美观的主题** - 内置多种主题选择
- 🚀 **快速启动** - 开箱即用的完整功能
- 🔧 **高度可定制** - 灵活的插件系统

## 支持的 Markdown 语法

### 文本格式
这是 **粗体**，这是 *斜体*，这是 ~~删除线~~

### 代码块
\`\`\`javascript
function hello() {
  console.log("Hello, MilkDown!");
}
\`\`\`

### 列表
- 无序列表项 1
- 无序列表项 2
  - 嵌套列表项

1. 有序列表项 1
2. 有序列表项 2
3. 有序列表项 3

### 引用
> 这是一个引用块
> 可以包含多行内容

### 表格
| 功能 | 支持情况 |
|------|----------|
| 标题 | ✅ |
| 列表 | ✅ |
| 代码 | ✅ |
| 表格 | ✅ |

## 开始编辑

你可以直接在这里开始编辑，所有更改都会实时渲染！

试试输入 \`/\` 来查看快捷命令菜单。
`,
});

// 初始化编辑器
crepe.create().then(() => {
  console.log("MilkDown 编辑器已成功初始化！");

  // 添加一些实用的功能
  setupEditorFeatures(crepe);
}).catch(error => {
  console.error("编辑器初始化失败:", error);
});

// 设置编辑器功能
function setupEditorFeatures(editor: Crepe) {
  // 获取当前内容的函数
  window.getMarkdown = () => {
    return editor.getMarkdown();
  };

  // 设置内容的函数
  window.setMarkdown = (markdown: string) => {
    if (editor.editor) {
      editor.editor.action(replaceAll(markdown));
    }
  };

  // 获取HTML的函数
  window.getHTML = () => {
    if (editor.editor) {
      return editor.editor.action(getHTMLUtil());
    }
    return '';
  };

  // 设置只读模式
  window.setReadonly = (readonly: boolean) => {
    editor.setReadonly(readonly);
  };

  console.log("编辑器功能已设置完成！");
  console.log("可用命令:");
  console.log("  - getMarkdown()     获取 Markdown 内容");
  console.log("  - setMarkdown(str)  设置 Markdown 内容");
  console.log("  - getHTML()         获取 HTML 内容");
  console.log("  - setReadonly(bool) 设置只读模式");

  // 监听内容变化
  editor.on((listener) => {
    listener.markdownUpdated((_ctx, markdown) => {
      console.log("内容已更新，长度:", markdown.length);

      // 可以在这里添加自动保存功能
      // localStorage.setItem('markdown-content', markdown);
    });

    listener.focus(() => {
      console.log("编辑器获得焦点");
    });

    listener.blur(() => {
      console.log("编辑器失去焦点");
    });
  });
}

// 导出编辑器实例供外部使用
export default crepe;
