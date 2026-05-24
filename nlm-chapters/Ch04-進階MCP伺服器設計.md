# Agentic Coding with Claude Code — 深度解析文件
## 作者：Eden Marco（Packt 出版）
## 文件用途：NotebookLM 知識庫來源素材

---

## 書籍總覽

本書《Agentic Coding with Claude Code》由 Eden Marco 撰寫，由 Packt 出版社發行。書籍示範程式碼托管於 GitHub：`PacktPublishing/Agentic-Coding-with-Claude-Code`。本書從 Claude Code 的基礎使用，到進階的 Agentic 工作流程，涵蓋了 MCP（Model Context Protocol）伺服器設計、Hooks 機制、自訂指令、Sub-agents 協作、Output Styles、Skills 工作流程，以及桌面應用整合等十個核心主題。

全書共 11 章，其中第 1、2、3、4、7、8、9、10 章附有完整的範例程式碼，第 5、6、11 章為純概念說明。本書以 HookHub（Claude Code Hooks 社群平台）作為貫穿全書的核心實作專案，逐章疊加功能，讓讀者在完整的實際專案脈絡中學習每一個技術主題。

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
