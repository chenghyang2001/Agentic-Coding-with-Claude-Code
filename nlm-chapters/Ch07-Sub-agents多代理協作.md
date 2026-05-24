# Agentic Coding with Claude Code — 深度解析文件
## 作者：Eden Marco（Packt 出版）
## 文件用途：NotebookLM 知識庫來源素材

---

## 書籍總覽

本書《Agentic Coding with Claude Code》由 Eden Marco 撰寫，由 Packt 出版社發行。書籍示範程式碼托管於 GitHub：`PacktPublishing/Agentic-Coding-with-Claude-Code`。本書從 Claude Code 的基礎使用，到進階的 Agentic 工作流程，涵蓋了 MCP（Model Context Protocol）伺服器設計、Hooks 機制、自訂指令、Sub-agents 協作、Output Styles、Skills 工作流程，以及桌面應用整合等十個核心主題。

全書共 11 章，其中第 1、2、3、4、7、8、9、10 章附有完整的範例程式碼，第 5、6、11 章為純概念說明。本書以 HookHub（Claude Code Hooks 社群平台）作為貫穿全書的核心實作專案，逐章疊加功能，讓讀者在完整的實際專案脈絡中學習每一個技術主題。

---

## 第七章：Sub-agents 與多代理協作（Sub-agents & Multi-Agent Collaboration）

### 核心概念

第七章是本書最具影響力的章節之一，系統性地介紹了 Claude Code 的 Sub-agent 系統。核心概念是：複雜任務可以被分解成多個子任務，每個子任務由具有不同專長、工具限制和人格的 sub-agent 負責，主 Claude 扮演「指揮官」協調整體流程。

### Sub-agent 定義方式

Sub-agent 的定義檔放在 `.claude/agents/` 目錄，每個 `.md` 檔案定義一個 sub-agent。

**YAML Frontmatter 必填欄位**：
- `name`：代理識別名稱（用於 Claude 路由決策）
- `description`：觸發條件說明（Claude 根據此決定何時派遣）
- `tools`：允許使用的工具清單（工具白名單）
- `model`：使用的模型（`sonnet`、`haiku`、`opus`、`inherit`）
- `color`：在 Claude Code UI 中顯示的顏色標識

### code-comedy-carl：娛樂型代理

書中最具個性的範例是 `code-comedy-carl`，一個用喜劇風格進行程式碼審查的代理：

**Frontmatter**：
```yaml
---
name: code-comedy-carl
description: >
  Use this agent when you want a humorous, entertaining code review...
  Activate when users request funny review, entertaining review, roast my code...
tools: Glob, Grep, LS, Read, NotebookRead, WebFetch, TodoWrite, WebSearch, 
       mcp__context7__resolve-library-id, mcp__context7__get-library-docs
model: sonnet
color: yellow
---
```

**代理特性**：
- 使用幽默類比和程式設計迷因
- 給出真實技術反饋，但用喜劇方式包裝
- 評分系統使用獨特的量尺（「Clear as mud」到「Crystal clear」）
- 結尾必有引用：「May your code be bug-free and your humor be timeless.」

**工具限制的意義**：`code-comedy-carl` 只有讀取權限（Glob、Grep、Read），沒有 Write、Edit、Bash 工具。這確保了「審查代理只審查，不修改」的職責邊界。

### mermaid-diagram-generator：圖表生成代理

第二個範例代理 `mermaid-diagram-generator` 展示了技術型代理的設計：

**Frontmatter**：
```yaml
---
name: mermaid-diagram-generator
description: Use this agent when you need to convert textual descriptions...
             into visual Mermaid diagrams.
tools: Glob, Grep, Read, WebFetch, TodoWrite, WebSearch, BashOutput, KillBash,
       Edit, MultiEdit, Write, NotebookEdit, Bash
model: sonnet
color: cyan
---
```

**代理行為**：
1. 先在網路上搜尋已有的 Mermaid 圖表模板（`Check ONLINE If there is already a prebuilt diagram`）
2. 分析輸入內容，選擇最適合的圖表類型（流程圖、序列圖、類圖、ER 圖等）
3. 設計清晰的圖表結構，遵守 KISS 原則
4. **強制要求**：只回傳圖表本身，不附加任何解釋文字（`ONLY THE DIAGRAM. NO FLUFF.`）

這個「NO FLUFF」的設計理念體現了多代理協作的精髓：sub-agent 的輸出應該是精確、可直接使用的工件，而不是包含解釋的對話。

### main.py 示範：Fibonacci 函數

本章的 `main.py` 是一個刻意簡單的 Fibonacci 函數實作，目的是作為 `code-comedy-carl` 和 `mermaid-diagram-generator` 的審查對象：

```python
def fibonacci(n):
    """Calculate the nth Fibonacci number."""
    if n <= 0:
        return 0
    elif n == 1:
        return 1
    else:
        a, b = 0, 1
        for _ in range(2, n + 1):
            a, b = b, a + b
        return b
```

使用者可以透過 Claude Code 說「幫我審查 `main.py` 的程式碼」，主 Claude 識別到這是程式碼審查任務後，會自動選擇派遣 `code-comedy-carl` 執行，並在主對話中呈現幽默的審查結果。

### Sub-agent 路由機制

Claude Code 的 sub-agent 路由基於 `description` 欄位中的關鍵字匹配。設計良好的 description 應該：
1. 明確說明**何時**應該啟用此代理
2. 提供具體的觸發語境範例
3. 說明**何時不應該**使用此代理（避免混淆）

```yaml
description: >
  Use this agent when you want a humorous code review...
  Activate when users request: funny review, entertaining review, roast my code,
  or mention Carl or CodeComedy Carl.
```

### 多代理工作流的設計原則

1. **職責分離**：每個 agent 只做一件事，做到最好
2. **工具白名單**：只授予必要的工具，防止代理越權
3. **輸出標準化**：明確定義 sub-agent 的輸出格式（只給圖表、只給審查、只給 commit message）
4. **模型選擇**：探索型任務用 Haiku（成本低）、複雜推理用 Sonnet、深度分析用 Opus

---
