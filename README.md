# toLog

一个简单而强大的 VS Code 日志生成扩展，帮助你快速在代码中插入格式化的日志语句。

## 特性

- 🚀 快速生成日志：通过快捷键快速插入日志语句
- 📝 智能缩进：自动保持与当前代码相同的缩进级别
- 🎨 高度可定制：支持自定义日志格式和样式
- 📍 自动定位：包含文件路径和行号信息
- ⚡️ 选中即用：选中变量后自动生成对应的日志语句

## 使用方法

1. 选中想要打印的变量或表达式
2. 按下快捷键 `Cmd+1` (Mac) / `Ctrl+1` (Windows/Linux)
3. 自动在下一行插入格式化的日志语句

示例：
```javascript
const user = { name: 'John' };
// 选中 user 后按下快捷键，将生成：
console.log("src/index.js:2:: user", user);
```

## 扩展设置

此扩展提供以下可配置项：

* `toLog.VarPilotSymbol`: 变量标识符号 (默认: `"::"`)
* `toLog.QuotationMark`: 引号类型，可选 `'single'` 或 `'double'` (默认: `"double"`)
* `toLog.ShowLogSemicolon`: 是否在日志语句末尾显示分号 (默认: `true`)
* `toLog.LogMethod`: 日志方法，如 "console.log"、"console.info" 等 (默认: `"console.log"`)

## 快捷键

| 命令     | Mac     | Windows/Linux | 说明                 |
| -------- | ------- | ------------- | -------------------- |
| 插入日志 | `Cmd+1` | `Ctrl+1`      | 在下一行插入日志语句 |

## 安装

在 VS Code 中搜索 "toLog" 并安装，或者从 [VS Code Marketplace](https://marketplace.visualstudio.com) 下载安装。

## 更新日志

### 0.0.1 (初始版本)
- ✨ 基础日志生成功能
- 🎨 自定义配置支持
- ⌨️ 快捷键支持

## 许可证

MIT

## 贡献

欢迎提交 Issues 和 Pull Requests！

## 作者

[你的名字/组织]

---

**享受编码！** 🎉