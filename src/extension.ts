// 模块 'vscode' 包含了 VS Code 的扩展 API
// 导入该模块，并在代码中用 vscode 作为别名引用
import * as vscode from "vscode";

// 当你的扩展被激活时会调用此方法
// 你的扩展在第一次执行命令时被激活
export function activate(context: vscode.ExtensionContext) {
  // 使用 console 输出诊断信息（console.log）和错误（console.error）
  // 这行代码只会在扩展被激活时执行一次
  console.log('Congratulations, your extension "toLog" is now active!');

  // 该命令已在 package.json 文件中定义
  // 现在通过 registerCommand 提供命令的实现
  // commandId 参数必须与 package.json 中的 command 字段一致
  const disposable = vscode.commands.registerCommand("toLog.helloWorld", () => {
    // 你放在这里的代码会在每次执行命令时被执行
    // 向用户显示一个消息框
    vscode.window.showInformationMessage("Hello World from toLog!");
  });

  context.subscriptions.push(disposable);
}

// 当你的扩展被释放时会调用此方法
export function deactivate() {}
