# Agentic Coding with Claude Code — 深度解析文件
## 作者：Eden Marco（Packt 出版）
## 文件用途：NotebookLM 知識庫來源素材

---

## 書籍總覽

本書《Agentic Coding with Claude Code》由 Eden Marco 撰寫，由 Packt 出版社發行。書籍示範程式碼托管於 GitHub：`PacktPublishing/Agentic-Coding-with-Claude-Code`。本書從 Claude Code 的基礎使用，到進階的 Agentic 工作流程，涵蓋了 MCP（Model Context Protocol）伺服器設計、Hooks 機制、自訂指令、Sub-agents 協作、Output Styles、Skills 工作流程，以及桌面應用整合等十個核心主題。

全書共 11 章，其中第 1、2、3、4、7、8、9、10 章附有完整的範例程式碼，第 5、6、11 章為純概念說明。本書以 HookHub（Claude Code Hooks 社群平台）作為貫穿全書的核心實作專案，逐章疊加功能，讓讀者在完整的實際專案脈絡中學習每一個技術主題。

---

## 第一章：MCP 情境工程（Context Engineering with MCP）

### 核心概念

第一章聚焦在 MCP（Model Context Protocol）工具的情境工程問題。核心論點是：MCP 工具的說明文字（docstring）直接消耗 Claude 的 context window token，如果每個工具的描述過於冗長，在工具數量多時會嚴重浪費可用的對話空間，進而降低 AI 的推理品質與回應效率。

MCP 是一個標準化的協議，讓 Claude Code 能夠連接外部工具伺服器。當 Claude 啟動時，它會讀取 `.mcp.json` 配置檔，連接所有宣告的 MCP 伺服器，並將每個工具的名稱、參數、描述都載入到 context window 中。這些工具描述對 Claude 來說是「靜態占用」的 token，不論 Claude 是否使用這些工具，描述都會占用空間。

### 範例程式碼：Verbose MCP Server

書中提供了 `verbose_mcp_server.py`，這是一個刻意設計「過度冗長描述」的 MCP 伺服器，用來示範問題。該伺服器使用 FastMCP 框架（v3.1.1），定義了 20 個極其簡單的數學運算工具（加法、減法、乘法、除法等），但每個工具的 docstring 都寫得極其詳細，包含：功能說明段落、詳細功能清單、使用案例、參數說明、回傳值說明等。

舉例來說，`add_two_numbers` 函數只是執行 `return a + b`，但其 docstring 卻有超過 20 行，包含「Advanced Numerical Addition Operation Tool」的標題、精確度說明（「maintains mathematical accuracy up to 15 decimal places」）、財務計算、科學計算、資料分析等四個使用案例。

這 20 個工具合計的描述文字約 3,272 個英文單詞，換算成 token 約 4,254 個。這些 token 在每次對話中都被靜態消耗，即使 Claude 不需要任何數學工具也一樣。

### `.mcp.json` 配置架構

書中示範兩種 `.mcp.json` 配置方式：

**完整版（載入多個伺服器）**：
```json
{
  "mcpServers": {
    "verbose-server": {
      "type": "stdio",
      "command": "python",
      "args": ["verbose_mcp_server.py"]
    },
    "context7": {
      "type": "http",
      "url": "https://mcp.context7.com/mcp"
    },
    "tavily": {
      "type": "http",
      "url": "https://mcp.tavily.com/mcp/?tavilyApiKey=..."
    },
    "playwright": {
      "type": "stdio",
      "command": "npx",
      "args": ["playwright-mcp"]
    }
  }
}
```

**精簡版（只載入必要工具）**：僅保留 `tavily` 一個伺服器，大幅節省 token 消耗。

### FastMCP 框架

FastMCP 是 Python 的 MCP 伺服器開發框架。基本用法：

```python
from fastmcp import FastMCP

mcp = FastMCP("My Server Name")

@mcp.tool()
def my_function(param: str) -> str:
    """工具描述（這裡的文字會被 Claude 讀取）"""
    return result
```

### 情境工程最佳實踐

1. **最小化工具描述**：只寫 Claude 理解工具用途的最少資訊，不需要詳細說明實作細節
2. **選擇性載入**：使用不同的 `.mcp.json` 配置（例如 `.mcp.json.tavily`）視任務需求切換，不要同時載入所有伺服器
3. **工具命名清晰**：良好的函數名稱比冗長的描述更有效（`add_numbers` 比「Advanced Numerical Addition Tool」更清晰且節省 token）
4. **專案級配置**：在專案根目錄放置 `.mcp.json`，只為該專案載入需要的工具

### 關鍵洞察

MCP 情境工程的本質是「投資報酬率」問題：每個 token 的描述是否真正幫助 Claude 更好地使用工具？如果描述沒有提供超過工具名稱本身的額外資訊，那些 token 就是浪費。良好的 MCP 設計應該讓 Claude 以最少的 token 消耗，精確理解工具的能力邊界。

---

## 第二章：無限代理迴圈與多代理協作（Infinite Agentic Loop & Multi-Agent）

### 核心概念

第二章圍繞「HookHub」專案展開，這是一個以 Next.js 15 建構的 Claude Code Hooks 社群平台。這章介紹了兩個重要的進階技術：

1. **無限代理迴圈（Infinite Agentic Loop）**：透過 Claude Code 的自訂指令（Slash Commands）啟動，讓 Claude 平行派遣多個 sub-agent，無限生成創意變體
2. **自訂 Sub-agents**：透過在 `.claude/agents/` 目錄放置 Markdown 配置檔，定義具有特定人格、工具限制和模型配置的專屬代理

### HookHub 專案架構

HookHub 是本書貫穿的核心實作專案，技術堆疊為：
- **框架**：Next.js 15.4.6（App Router 架構）
- **語言**：TypeScript（嚴格型別）
- **樣式**：Tailwind CSS 4.x
- **部署**：Vercel

專案目錄結構：
```
hookhub/
├── src/
│   ├── app/           # Next.js App Router 頁面
│   ├── components/    # React 元件（HookCard 等）
│   ├── data/          # hooks.json（靜態資料）
│   └── types/         # TypeScript 型別定義
├── .claude/
│   ├── commands/      # 自訂 Slash Commands
│   ├── agents/        # Sub-agent 定義
│   └── settings.json  # Hooks 配置
└── specs/             # 元件規格書（hero.spec.md）
```

### HookHub 的資料模型

HookHub MVP 使用靜態 JSON 作為資料來源，定義了豐富的 Hook 資料模型：

```typescript
interface Hook {
  id: string;         // 唯一識別碼
  name: string;       // 顯示名稱
  category: HookCategory;  // 分類（監控、安全、工作流、測試等）
  description: string;  // 簡短描述（最多 200 字）
  githubUrl: string;  // GitHub 倉庫連結
  author: string;     // 作者 GitHub 帳號
  stars?: number;     // GitHub 星數
  language: string;   // 主要程式語言
  hookTypes: HookType[];  // Hook 類型（PreToolUse、Stop 等）
  featured?: boolean; // 是否為精選
}
```

Hook 分類包含：監控與可觀察性（MONITORING）、安全與驗證（SECURITY）、工作流自動化（WORKFLOW）、測試與品質（TESTING）、外部整合（INTEGRATION）、工具程式（UTILITY）等。

### 無限代理迴圈（/infinite 指令）

書中最亮眼的技術示範之一是「無限代理迴圈」。這是一個自訂 Slash Command，定義在 `.claude/commands/infinite.md`，透過以下流程運作：

**指令接受的三個參數**：
- `spec_file`：規格說明 Markdown 檔案路徑
- `output_dir`：迭代結果存放的目錄
- `count`：迭代次數（數字或 "infinite" 無限模式）

**五階段執行流程**：

**第一階段：規格分析**——深度讀取規格檔案，理解要生成什麼類型的內容、格式需求、以及各迭代之間的演化模式。

**第二階段：輸出目錄偵察**——分析現有輸出目錄，找出最大的迭代編號、分析現有迭代的演化軌跡、找出可補強或創新的空間，決定下一個起始編號。

**第三階段：迭代策略**——規劃每次新迭代如何保持獨特性，在延續前次迭代的同時保持創新。

**第四階段：平行代理協調**——依數量採用不同策略：
- count 1-5：同時啟動所有代理
- count 6-20：以每批 5 個分批啟動
- "infinite" 模式：以 3-5 個代理為一波，監控 context 後持續啟動新波次

每個 sub-agent 收到：完整的規格分析、輸出目錄快照、具體迭代編號指派、唯一性指令、品質標準。

**第五階段：無限模式協作**——波次式生成，每個波次探索更進階的創新維度，追蹤 context 使用量，接近上限時優雅收尾。

### Hero 元件規格書

書中以 `hero.spec.md` 示範如何用 Markdown 規格書驅動 AI 生成元件。Hero 元件規格包含：

**元件結構**：
1. 背景層（漸層光球、網格圖案、浮動節點、連接線）
2. 內容區（左欄）：徽章、H1 標題、說明文字、CTA 按鈕組、數據列
3. 視覺區（右欄）：旋轉外環、反向旋轉中環、內部光暈、中心圖示、軌道元素

**色彩系統**：
- 主色 `#d97757`（橘紅）
- 次要色 `#6a9bcc`（藍）
- 第三色 `#788c5d`（綠）

**動畫規範**：包含 12 種必要動畫（`animate-fade-in`、`animate-spin-slow`、`animate-reverse-spin` 等）

### Self-Agent 定義：react-typescript-specialist

書中示範如何在 `hookhub2/.claude/agents/` 定義自訂 sub-agent。範例 `react-typescript-specialist` 具有以下特性：

**YAML Frontmatter 配置**：
```yaml
---
name: react-typescript-specialist
version: 1.1.0
description: 當需要建立 TypeScript React 元件時使用
model: inherit
---
```

**代理人格定義**：嚴格 TypeScript 專家，對 `any` 型別零容忍，必須使用嚴格模式，實作完整介面定義。

**開發標準**：建立新 Next.js 專案時必須使用官方 `create-next-app` CLI，包含 TypeScript、ESLint、Tailwind、App Router 配置。

### 平行 Sub-agent 協調的意義

無限代理迴圈的核心設計理念是：AI 生成的本質是「機率採樣」。每個 sub-agent 在獨立的 context 中工作，因此即使接到相同的規格，也會由於 LLM 的隨機性而產生不同的創意輸出。透過同時派遣多個代理，我們可以在短時間內獲得多樣性的設計變體，選擇最優者。

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

## 第四章：進階 MCP 伺服器設計（Advanced MCP Server Design）

### 核心概念

第四章深入 MCP 伺服器的進階設計模式，特別聚焦在「情境工程最佳化」——如何在不損失功能的前提下，最大程度地降低 MCP 工具描述的 token 消耗。

### CLAUDE.md 與 MCP 的整合

本章引入了 `CLAUDE.md` 的重要角色。`CLAUDE.md` 是 Claude Code 的專案說明檔，在每次啟動時會自動載入到 context 中。書中示範如何在 `CLAUDE.md` 中整合 MCP 使用指引：

```markdown
## Interaction Preferences

- When discussing LangGraph, always use context7 MCP
```

這樣的配置讓 Claude 在討論特定主題時，自動知道要使用哪個 MCP 工具查詢最新文件。

### Context7 MCP 伺服器

書中重點介紹 Context7 MCP 伺服器，這是一個即時技術文件查詢工具。配置方式：

```json
{
  "mcpServers": {
    "context7": {
      "type": "http",
      "url": "https://mcp.context7.com/mcp"
    }
  }
}
```

Context7 的核心優勢：
- 提供最新的 API 文件（比 Claude 訓練資料更新）
- 不消耗本地 context（工具描述精簡）
- 支援多種框架（LangGraph、Next.js、FastAPI 等）

### Verbose vs. Concise MCP 設計對比

本章透過 `verbose_mcp_server.py` 對比 `context-engineering-mcp` 的精簡版本，示範好的 MCP 設計原則：

**差劣設計（Verbose）**：
- 每個工具描述 15-30 行
- 重複的「Use Cases」段落
- 描述實作細節而非能力邊界
- 20 個工具 × 平均 212 token = 4,254 token 靜態消耗

**良好設計（Concise）**：
- 工具描述控制在 2-3 行
- 只說明「什麼情況用這個工具」
- 不重複函數名已傳達的資訊
- 相同功能的工具可節省 70-80% 的 token

### FastMCP 框架的進階使用

FastMCP 支援多種 MCP 功能：

```python
from fastmcp import FastMCP

mcp = FastMCP("Context Engineering MCP")

@mcp.tool()
def search_docs(query: str, library: str) -> str:
    """Search library documentation. Use for API reference."""
    # 精簡描述，只說本質
    return fetch_docs(query, library)

@mcp.resource("config://settings")
def get_settings() -> str:
    """Return project configuration."""
    return load_settings()

@mcp.prompt("code-review")  
def code_review_prompt(code: str) -> str:
    """Generate a code review prompt."""
    return f"Review this code: {code}"
```

FastMCP 不僅支援 `@mcp.tool()`，還支援 `@mcp.resource()`（資源存取）和 `@mcp.prompt()`（提示模板）兩種類型。

### 多 MCP 伺服器的配置策略

書中建議根據不同任務類型維護多個 `.mcp.json` 配置：

- `.mcp.json`（預設）：專案常用工具
- `.mcp.json.tavily`：需要即時搜尋時
- `.mcp.json.full`：需要完整工具集時

在 Claude Code 中可以用 `--mcp-config` 參數指定使用哪個配置，或在不同目錄放置適合該情境的配置。

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

## 第八章：Output Styles 與 Status Line（輸出樣式與狀態列）

### 核心概念

第八章介紹 Claude Code 的兩個使用者體驗功能：
1. **Output Styles**：定義 Claude 回應的格式和風格的預設檔案
2. **Status Line**：Claude Code 狀態列的自訂，透過 Python 腳本動態顯示上下文資訊

### Output Styles 系統

Output Styles 定義在 `.claude/output-styles/` 目錄。每個 `.md` 檔案定義一種輸出風格，使用者可以切換不同風格，Claude 會自動調整其回應格式。

**retro-ascii-blog.md**（復古 ASCII 部落格風格）：

```markdown
---
description: Format responses as retro HTML pages with ASCII art styling
---

Format all responses as complete HTML pages with retro ASCII art blog styling.

## Workflow
- Save the HTML file after writing it
- OPEN the generated file in the default web browser

## HTML Structure
- Complete HTML5 documents
- Use semantic HTML elements

## ASCII Art Styling
- Use ASCII art for headers and dividers
- Create borders using: ═, ║, ╔, ╗, ╚, ╝, -, |, +, *, #
- Use monospace fonts (Courier New, Monaco, Consolas)
- Dark background (#1a1a1a) with light text
- Retro color schemes (green on black, amber on black)
```

啟用這個 Output Style 後，Claude 的每個回應都會輸出一個完整的 HTML 頁面，包含 ASCII 藝術標題、復古終端機配色、並自動在瀏覽器中開啟展示。

**yaml-concise.md**（精簡 YAML 風格）：
```markdown
---
description: Concise YAML-structured responses with minimal explanations
---

Format all responses in YAML structure:
- Use clear key-value pairs
- Provide direct answers without verbose explanations
- Structure information hierarchically
- Keep explanations minimal
```

### Status Line 動態顯示

`statusline.py` 是本章的核心技術示範——一個讀取 Claude Code transcript 並在狀態列顯示動態資訊的 Python 腳本：

```python
def get_last_user_prompt(transcript_path):
    """從 transcript 檔案提取最後一個使用者輸入。"""
    lines = content.strip().split('\n')
    user_prompts = []
    
    for line in lines:
        entry = json.loads(line)
        if (entry.get('type') == 'user' and 
            entry.get('message', {}).get('role') == 'user'):
            # 跳過命令訊息和 meta 訊息
            content_text = extract_text(entry)
            if not content_text.startswith('<command-name>'):
                user_prompts.append(content_text.strip())
    
    # 回傳最後一個，截斷到 50 字元
    last_prompt = user_prompts[-1]
    return last_prompt[:47] + "..." if len(last_prompt) > 50 else last_prompt

def main():
    input_data = json.load(sys.stdin)
    output_style = input_data.get('output_style', {}).get('name', 'default')
    transcript_path = input_data.get('transcript_path', '')
    last_prompt = get_last_user_prompt(transcript_path)
    
    # 用 ANSI 顏色碼輸出狀態列
    print(f"\033[1;32mStyle: {output_style}\033[0m "
          f"\033[1;36mLast Prompt: {last_prompt}\033[0m")
```

**運作機制**：
- Claude Code 透過 stdin 傳入 JSON（包含 `output_style.name` 和 `transcript_path`）
- 腳本讀取 transcript 檔案，過濾出真實的使用者訊息
- 用 ANSI 顏色碼輸出格式化的狀態列字串
- Claude Code 在畫面底部顯示此腳本的輸出

### Status Line 的實用性

Status Line 的最大用處是讓使用者在長時間工作後，快速知道：
1. 目前使用的 Output Style 是什麼
2. 上次問 Claude 的問題是什麼（特別在 Claude 長時間處理中，提醒使用者任務脈絡）

### Output Styles 的實際應用場景

- **技術文件撰寫**：使用 YAML 精簡風格，獲得結構化、可直接複製的輸出
- **部落格文章**：使用 HTML 風格，直接產出可發布的網頁內容
- **視覺呈現**：使用 ASCII 藝術風格，在終端機創造視覺豐富的回應
- **程式碼任務**：預設風格，Claude 根據任務自然選擇適合的格式

---

## 第九章：Skills 工作流程（Skills & Workflow Automation）

### 核心概念

第九章介紹 Claude Code 的 **Skills** 系統。Skills 是可重用的工作流程規格書，存放在 `.claude/skills/` 目錄中。與 Slash Commands 的差異在於：Commands 是一次性的指令提示，而 Skills 定義了包含腳本、資源和複雜流程的完整工作流程模板。

### git-pushing Skill 範例

本章以 `git-pushing` 為示範，這個 Skill 封裝了整個 Git 提交推送的工作流程：

**SKILL.MD**：
```markdown
---
name: git-pushing
description: Stage, commit, and push git changes with conventional commit messages.
             Activates when user says "push changes", "commit and push", etc.
---

# Git Push Workflow

**ALWAYS use the script** - do NOT use manual git commands:

```bash
bash skills/git-pushing/scripts/smart_commit.sh
```
```

**最關鍵的設計原則**：`ALWAYS use the script`——強制 Claude 使用封裝好的腳本，而不是自己生成 git 指令。這確保了行為的一致性和可預測性。

### smart_commit.sh：海盜風格提交腳本

Skill 的核心實作是 `smart_commit.sh`，這個腳本展示了一個充滿創意的 Claude Code 整合：

**工作流程**：
1. 取得當前分支名稱
2. 檢查是否有未提交的變更
3. `git add .` 暫存所有變更
4. 分析變更類型（test/docs/fix/feat 等）
5. **呼叫 Claude CLI 生成海盜風格的 commit message**
6. 建立 commit（包含 Claude Code 署名）
7. 推送到遠端

**Claude CLI 呼叫**：
```bash
PIRATE_MSG=$(claude -p "You are a pirate! Based on this git diff, 
write a short conventional commit message but make the description 
sound like a pirate talking. Keep it under 72 chars.

Commit type: $COMMIT_TYPE
Files changed: $STAGED_FILES
Diff: $DIFF_CONTENT" 2>/dev/null || echo "")
```

這個設計的精妙之處：Skill 腳本本身是靜態的 bash，但它在執行時動態呼叫 Claude CLI（`claude -p`）生成創意的 commit message，結合了腳本的可靠性和 AI 的創意能力。

**自動 fallback**：如果 Claude CLI 呼叫失敗，腳本有備用的標準 commit message 格式，確保工作流程不中斷。

**Commit 格式**：
```
feat(skill): arrr! discovered treasure in the code, matey!

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

### Skills 目錄結構

Skills 採用約定俗成的目錄結構：
```
.claude/skills/
└── git-pushing/
    ├── SKILL.MD          # 規格說明（Claude 讀取）
    └── scripts/
        └── smart_commit.sh  # 實際腳本
```

`SKILL.MD` 中的 `description` 欄位控制觸發時機，類似於 sub-agent 的 `description`——Claude 根據使用者的語境自動識別是否應該啟用此 Skill。

### Skills 與 Commands 的差異

| 面向 | Commands | Skills |
|------|----------|--------|
| 定義位置 | `.claude/commands/` | `.claude/skills/` |
| 啟動方式 | `/指令名` 顯式呼叫 | 自然語言觸發 |
| 複雜度 | 簡單提示 | 包含腳本和資源 |
| 可重用性 | 單一操作 | 完整工作流程 |
| 版本控制 | 只有 MD | MD + 腳本 + 資源 |

### Skills 的進階應用

書中提到 Skills 的強大應用場景：
- **CI/CD 整合**：封裝部署流程，讓 Claude 能安全執行預定義的部署步驟
- **測試自動化**：定義測試執行流程，確保每次都按正確順序執行
- **文件生成**：封裝從程式碼到文件的完整轉換流程
- **資料庫遷移**：封裝資料庫變更的安全流程（備份、遷移、驗證）

---

## 第十章：桌面應用整合（Desktop Application Integration）

### 核心概念

第十章展示了 Claude Code 在桌面應用開發工作流中的整合，重點是如何透過 `CLAUDE.md` 系統和 `memory/` 目錄讓 Claude Code 在複雜的多工程師、多 session 環境中保持上下文。

### vigilant-feistel 和 zealous-jemison：兩個並行版本

書中提供了 HookHub 的兩個完整實作版本（`vigilant-feistel` 和 `zealous-jemison`），代表不同 Claude Code session 生成的結果。這兩個版本具有完全相同的功能，但實作細節不同，展示了 AI 生成代碼的「機率性」——即使在相同規格下，不同 session 產生的代碼也會有差異。

**共同架構**：
```
hookhub/
├── CLAUDE.md           # 專案給 Claude 的指引
├── memory/
│   ├── frontend/CLAUD.MD   # 前端記憶（HookCard 設計決策）
│   └── spec/CLAUDE.md      # 規格記憶（完整產品規格書）
├── src/
│   ├── app/            # Next.js App Router
│   ├── components/
│   │   └── HookCard.tsx    # Hook 卡片元件
│   ├── data/
│   │   └── hooks.json      # 靜態 Hook 資料
│   └── types/
│       └── hook.ts         # TypeScript 型別定義
└── package.json
```

### 階層式 CLAUDE.md 系統

本章最重要的技術是**階層式記憶系統**，透過多個 CLAUDE.md 檔案管理不同層級的上下文：

**`/CLAUDE.md`（專案根）**：
```markdown
# CLAUDE.md

## Project Overview
HookHub is a Next.js 15.4.6 application using App Router with TypeScript.

## Essential Commands
- npm run dev    # Development server
- npm run build  # Production build
- npm run lint   # ESLint

## Architecture
- Framework: Next.js 15.4.6 with App Router
- Styling: Tailwind CSS 4.x
- TypeScript with path aliases (@/* → ./src/*)

## Testing Strategy
- Use Playwright MCP for UI testing
- Save screenshots in /memory/screenshots
```

**`/memory/spec/CLAUDE.md`**（規格記憶）：包含完整的 HookHub 產品規格書，涵蓋 MVP 範圍、資料模型、UI/UX 需求、技術架構、實作階段計劃。當 Claude 需要了解產品規格時，可以直接讀取這個檔案。

**`/memory/frontend/CLAUD.MD`**（前端記憶）：記錄前端實作的設計決策，例如 HookCard 元件的設計選擇、Tailwind 樣式策略、響應式設計方案等。

### HookCard 元件

HookHub 的核心 UI 元件是 `HookCard.tsx`，展示單一 Hook 的資訊：

```typescript
interface HookCardProps {
  hook: Hook;  // 使用統一的 Hook 型別定義
}

// HookCard 展示：
// - Hook 名稱（醒目顯示）
// - 分類徽章（顏色區分）
// - 描述（截斷到兩行）
// - 作者、語言資訊
// - GitHub 星數
// - Hook 類型標籤
// - "View on GitHub" 連結按鈕
```

### 靜態資料：hooks.json

MVP 版本使用靜態 JSON 作為 Hook 資料庫，包含精選的社群 Hook 倉庫：

1. **Claude Code Hooks Mastery**（disler）- 完整的 Hook 生命週期實作，234 ⭐
2. **Multi-Agent Observability**（disler）- 多代理即時追蹤，189 ⭐
3. **CCHooks SDK**（GowayLee）- 輕量 Python SDK，156 ⭐
4. **Claude Hooks PHP SDK**（beyondcode）- Laravel 風格 PHP SDK，143 ⭐
5. **Claude Hub**（claude-did-this）- GitHub webhook 整合服務

### Claude Code 的 Testing Strategy

本章展示了與 Playwright MCP 的整合：

```markdown
## Testing Strategy
- Use Playwright MCP for UI testing
- Save screenshots in /memory/screenshots directory
```

Claude Code 可以透過 Playwright MCP 自動化 UI 測試，截圖儲存在 `/memory/screenshots/` 供後續比對。這種「記憶截圖」的模式讓 Claude 在後續 session 中可以對比 UI 變化。

### memory/ 目錄的設計哲學

`memory/` 目錄是本章最重要的概念——它是為 AI 設計的「長期記憶」系統：

- **目的**：跨 session 保持設計決策和狀態
- **內容**：CLAUDE.md 規格、截圖、設計決策記錄
- **讀取方式**：Claude 在工作時主動讀取相關 memory 檔案
- **更新方式**：Claude 完成工作後，將重要決策寫回 memory

這個模式解決了 LLM context window 有限的問題：不是試圖在一個 session 中記住所有事情，而是設計一個外部記憶系統，讓 Claude 按需查詢。

---

## 跨章節的核心主題

### 1. HookHub 作為學習載體

HookHub 是全書的核心實作專案，從第二章的 Hero 元件規格，到第十章的完整應用，讀者跟著專案逐步成長，在真實情境中學習每個技術。

### 2. Claude Code 的配置系統

全書展示了 Claude Code 的完整配置生態系：
- `.mcp.json`：MCP 工具配置
- `CLAUDE.md`：專案上下文說明
- `.claude/settings.json`：Hooks 配置
- `.claude/commands/`：自訂指令
- `.claude/agents/`：Sub-agent 定義
- `.claude/output-styles/`：輸出風格
- `.claude/skills/`：可重用工作流程
- `memory/`：AI 長期記憶

### 3. 情境工程的核心原則

貫穿全書的核心哲學是「情境工程」（Context Engineering）——如何精確控制進入 Claude context window 的資訊：
- 最小化必要資訊（MCP 精簡描述）
- 按需載入資訊（分層 CLAUDE.md）
- 外部化長期記憶（memory/ 系統）
- 精確的 sub-agent 路由（description 設計）

### 4. 從工具使用到工具設計

書中最重要的認知轉變是：從「使用 Claude Code 工具」進化到「為 Claude Code 設計工具」。讀者學會如何設計 MCP 伺服器、定義 sub-agent、撰寫 Skill 規格，成為 AI 工作流程的設計者而非單純的使用者。

### 5. 平行性與創意多樣性

無限代理迴圈和多 sub-agent 協作體現了一個重要設計原則：LLM 的機率性不是缺陷，而是資源。通過平行派遣多個代理，可以在短時間內獲得多樣的創意輸出，選擇最優者，這是傳統軟體開發無法做到的。

---

## 技術詞彙表

| 術語 | 定義 |
|------|------|
| MCP（Model Context Protocol）| Anthropic 定義的標準協議，讓 AI 連接外部工具伺服器 |
| FastMCP | Python 的 MCP 伺服器開發框架 |
| Context Window | Claude 在單次對話中能處理的最大 token 數量 |
| Context Engineering | 精確控制進入 context 的資訊，最大化 AI 效能 |
| Sub-agent | 由主 Claude 派遣的專屬代理，具有特定人格和工具限制 |
| Slash Command | 用 `/指令名` 呼叫的自訂 Claude Code 工作流程 |
| Hook | Claude Code 生命週期中的事件觸發器 |
| Output Style | 定義 Claude 回應格式的預設模板 |
| Skill | 包含腳本和資源的可重用工作流程規格 |
| CLAUDE.md | 給 Claude Code 讀取的專案說明文件 |
| memory/ | 為 AI 設計的外部長期記憶目錄 |
| Infinite Agentic Loop | 透過平行 sub-agent 無限生成創意變體的技術 |
| HookHub | 書中貫穿的核心示範專案（Claude Code Hooks 社群平台）|
| App Router | Next.js 13+ 的新路由架構，以資料夾結構定義路由 |
| Tailwind CSS | 工具類別優先的 CSS 框架 |
| TypeScript | 帶有靜態型別系統的 JavaScript 超集 |

---

## 結論

《Agentic Coding with Claude Code》展示了 AI 輔助開發的未來方向：開發者不再只是使用 AI 工具，而是成為 AI 工作流程的設計師。通過精心設計的 MCP 伺服器、Sub-agent 系統、Hooks 機制和 Skills 工作流程，複雜的軟體開發任務可以被分解成清晰定義的子任務，由專業化的 AI 代理協同完成。

書中最重要的洞察是：AI 的能力不僅取決於模型本身，更取決於圍繞它設計的系統——情境工程、工具設計、代理協調，這些「AI 工程」技能將成為下一代開發者的核心競爭力。
