# Agentic Coding with Claude Code — 深度解析文件
## 作者：Eden Marco（Packt 出版）
## 文件用途：NotebookLM 知識庫來源素材

---

## 書籍總覽

本書《Agentic Coding with Claude Code》由 Eden Marco 撰寫，由 Packt 出版社發行。書籍示範程式碼托管於 GitHub：`PacktPublishing/Agentic-Coding-with-Claude-Code`。本書從 Claude Code 的基礎使用，到進階的 Agentic 工作流程，涵蓋了 MCP（Model Context Protocol）伺服器設計、Hooks 機制、自訂指令、Sub-agents 協作、Output Styles、Skills 工作流程，以及桌面應用整合等十個核心主題。

全書共 11 章，其中第 1、2、3、4、7、8、9、10 章附有完整的範例程式碼，第 5、6、11 章為純概念說明。本書以 HookHub（Claude Code Hooks 社群平台）作為貫穿全書的核心實作專案，逐章疊加功能，讓讀者在完整的實際專案脈絡中學習每一個技術主題。

---

## 第三章：自訂指令與 Hooks（Custom Commands & Hooks）

### 核心概念

第三章介紹 Claude Code 的兩個擴充機制：
1. **自訂 Slash Commands**：在 `.claude/commands/` 目錄放置 Markdown 檔案，定義可用 `/指令名` 呼叫的工作流程
2. **Hooks**：在 `.claude/settings.json` 定義的事件觸發器，在 Claude Code 的生命週期特定時機執行外部程式

### 自訂 Slash Commands

自訂指令是 Claude Code 中最直覺的擴充方式。在 `.claude/commands/` 目錄放置一個 Markdown 檔案，就能創建一個 `/檔名` 的指令。

**commit-code.md 範例**：
```markdown
# Commit Code

Review the files that have changed, and create a commit with a commit message
summarizing the changes made. Always try to give short and concise messages
that convey the business logic.

Use user hints to be the message main subject $arguments
```

用 `/commit-code` 呼叫時，Claude 會自動審查變更的檔案、產生清晰的 commit message。`$ARGUMENTS` 變數接受使用者傳入的補充提示。

**dad-joke.md 範例**（更簡單的指令）：
```markdown
## Dad Joke

Generate a dad joke about $arguments
```

用 `/dad-joke programming` 呼叫，Claude 就會生成一則關於程式設計的爸爸笑話。

### Hooks 機制

Hooks 是 Claude Code 的事件系統，讓開發者可以在 AI 工作流程的特定時機注入自訂邏輯。配置在專案的 `.claude/settings.json` 中。

**支援的 Hook 類型**：
- `Stop`：Claude 完成一個回應後觸發
- `PreToolUse`：Claude 呼叫工具（讀檔、寫檔、執行指令）之前觸發
- `PostToolUse`：工具執行完成之後觸發
- `UserPromptSubmit`：使用者送出訊息時觸發
- `SubagentStop`：Sub-agent 完成工作後觸發
- `SubagentStart`：Sub-agent 啟動時觸發

### hooks-notification 範例

本章的主要範例是「通知音效 Hook」：當 Claude 完成工作（Stop 事件）時，自動播放音效，提醒使用者任務完成。

**`.claude/settings.json` 配置**：
```json
{
  "hooks": {
    "Stop": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "uv run play_sound.py"
          }
        ]
      }
    ]
  }
}
```

**play_sound.py**：
```python
import pygame
import os

def main():
    pygame.mixer.init()
    sound_file = "ulala.wav"
    sound = pygame.mixer.Sound(sound_file)
    sound.play()
    while pygame.mixer.get_busy():
        pygame.time.wait(100)
    pygame.mixer.quit()
```

使用 `pygame` 庫播放 `ulala.wav` 音效檔。整個 Python 環境用 `uv` 管理（`pyproject.toml` + `uv.lock`），確保跨平台的環境一致性。

### Hooks 的進階應用

書中說明 Hooks 可以實現更複雜的控制邏輯：

**PreToolUse Hook 的安全控制**：
```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "python security_check.py"
          }
        ]
      }
    ]
  }
}
```

當 Claude 要執行 Bash 指令時，先呼叫 `security_check.py`，該腳本可以審查指令內容，如果發現危險操作（如 `rm -rf`），可以傳回非零退出碼阻止 Claude 繼續執行。

**Hook 的 matcher 欄位**：決定哪些事件會觸發 Hook。空字串 `""` 表示所有事件。也可以指定工具名稱（`"Bash"`、`"Write"` 等）做精確匹配。

### 自訂指令與 Hooks 的組合威力

當自訂指令與 Hooks 結合時，可以創建強大的自動化工作流：
- 使用者呼叫 `/commit-code` → Claude 審查變更
- PostToolUse Hook 監測 git 操作 → 自動更新 changelog
- Stop Hook 播放音效 → 通知使用者 commit 完成

---
