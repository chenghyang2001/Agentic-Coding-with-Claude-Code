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
