# Claude Code Hooks 教學

學習如何使用 Claude Code Hooks 自動化你的工作流程。

## 什麼是 Claude Code Hooks？

Claude Code Hooks 允許你在程式設計工作階段的特定時間點自動執行指令。它們在本地的 `.claude/settings.json` 檔案中設定，可以在特定事件發生時觸發自訂腳本、驗證工具或通知。

## 本地專案設定

本專案使用**本地**的 `.claude/settings.json` 檔案，僅影響此儲存庫，不會影響你的全域 Claude Code 設定。

## Hook 範例：聲音通知

本教學示範一個「Stop」Hook，每當 Claude Code 完成回應時播放聲音：

```json
{
  "hooks": {
    "Stop": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "cd \"%USERPROFILE%\\workspace\\Agentic-Coding-with-Claude-Code\\Chapter03\\hooks-notification\" && uv run play_sound.py"
          }
        ]
      }
    ]
  }
}
```

## 安裝設定

安裝所需的 Python 依賴套件：

```bash
uv sync
```

這會安裝 pygame（定義於 `pyproject.toml`），用於音訊播放。

## 可用的 Hook 類型

- **PreToolUse**：在 Claude 使用工具之前執行
- **PostToolUse**：在工具成功完成後執行
- **UserPromptSubmit**：在你提交提示時執行
- **Stop/SubagentStop**：在 Claude 完成回應時執行
- **Notification**：在系統通知期間執行
- **PreCompact**：在情境壓縮之前執行

## Hook 結構

```json
{
  "hooks": {
    "HookType": [
      {
        "matcher": "tool_pattern",
        "hooks": [
          {
            "type": "command",
            "command": "your_script.sh"
          }
        ]
      }
    ]
  }
}
```

- **matcher**：選填的正規表達式，用於比對特定工具或條件
- **command**：要執行的 Shell 指令

## 試試看

1. 在此專案中執行任何 Claude Code 指令
2. 當 Claude 完成回應時，聆聽聲音通知
3. 實驗不同的 Hook 類型和指令

這示範了 Hooks 如何透過自訂自動化來強化你的開發工作流程！
