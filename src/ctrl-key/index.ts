import * as vscode from "vscode";
import * as path from "path";
import { LogConfig, LogLevel } from "@/types";
import { Logger } from "@/utils";

Logger.setLevel(LogLevel.DEBUG);

const configName = "toLog";
function getLogConfig(): LogConfig {
  const logOption = vscode.workspace.getConfiguration(configName);
  return {
    logMethod: logOption.get("LogMethod") || "console.log",
    varPilotSymbol: logOption.get("VarPilotSymbol") || "::",
    quotationMark: logOption.get("QuotationMark") === "single" ? `'` : `"`,
    showLogSemicolon: logOption.get("ShowLogSemicolon") || false,
  };
}

// 简化生成 log 语句
function generateLogStatement(
  document: vscode.TextDocument,
  selection: vscode.Selection,
  word: string
): string {
  const lineNumber = selection.end.line + 1;
  const { relativePath } = getFileInfo(document);
  const config = getLogConfig();
  const template = `${relativePath}:${lineNumber}${config.varPilotSymbol} ${word}`;

  return `${config.logMethod}(${config.quotationMark}${template}${
    config.quotationMark
  }, ${word})${config.showLogSemicolon ? ";" : ""}\n`;
}

export function normalizePath(inputPath: string): string {
  return inputPath.replace(/\\/g, "/");
}
export function getFileInfo(document: vscode.TextDocument) {
  // 获取文件名并去掉扩展名
  const fileName = path.basename(document.fileName);

  // 获取文件目录路径并标准化
  const fileDir = normalizePath(path.dirname(document.fileName));

  // 获取最后一级目录名称
  const dirName = path.basename(fileDir);

  // 生成相对路径并标准化
  const relativePath = normalizePath(path.join(dirName, fileName));

  return { fileName, fileDir, relativePath };
}

// 获取当前行的缩进
function getIndentation(document: vscode.TextDocument, line: number): string {
  const lineText = document.lineAt(line).text;
  const match = lineText.match(/^[\s]*/);
  return match ? match[0] : "";
}

// 插入 log 语句
function insertConsoleLog() {
  const editor = vscode.window.activeTextEditor;
  if (!editor) return;

  const document = editor.document;
  const selection = editor.selection;
  const word = document.getText(selection);

  // 获取当前行的缩进
  const currentIndent = getIndentation(document, selection.end.line);

  // 生成带缩进的日志语句
  const logStatement = word
    ? currentIndent + generateLogStatement(document, selection, word)
    : currentIndent + `console.log(":");\n`;

  // 计算插入位置 (下一行的开始)
  const insertPosition = new vscode.Position(selection.end.line + 1, 0);

  editor
    .edit((editBuilder) => {
      editBuilder.insert(insertPosition, logStatement);
    })
    .then(() => {
      // 计算插入位置的结束位置并移动光标
      const logStatementLines = logStatement.split("\n");
      const lastLine = logStatementLines[logStatementLines.length - 2]; // 减2是因为最后有一个换行符

      const endPosition = new vscode.Position(
        insertPosition.line,
        lastLine.length
      );

      // 设置新的光标位置
      editor.selection = new vscode.Selection(endPosition, endPosition);

      // 确保新插入的行可见
      editor.revealRange(
        new vscode.Range(insertPosition, endPosition),
        vscode.TextEditorRevealType.Default
      );
    });
}
export const quickLog = vscode.commands.registerTextEditorCommand(
  "toLog.qlog",
  function () {
    insertConsoleLog();
  }
);
