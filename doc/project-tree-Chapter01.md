# 專案樹狀結構 — Chapter01

> 生成日期：2026-06-12 ｜ 掃描目標：`C:\Users\B00332\workspace\Agentic-Coding-with-Claude-Code\Chapter01`
> 統計：0 個資料夾 / 9 個檔案（已排除 2 個噪音目錄）
> 由 `project-tree` skill 生成

```
Chapter01/                       # MCP 情境優化教學（--mcp-config 載入最小化專案級 MCP 設定省 token）
├── .mcp.json                    # 專案級 MCP 設定（verbose-server / context7 / tavily 三個 HTTP server）
├── .mcp.json.tavily             # Tavily 單一 server 的最小化 MCP 設定範例（示範用）
├── .python-version              # Python 版本鎖定
├── main.py                      # uv 專案進入點（Hello World 佔位）
├── verbose_mcp_server.py        # 「冗長工具描述吃 context」反面示範 MCP server（FastMCP，28KB）
├── pyproject.toml               # uv 專案設定（claude-code-crash-course，依賴 fastmcp>=2.12.4）
├── uv.lock                      # uv 依賴鎖定檔
├── README.md                    # 教學說明：用 --mcp-config 降低 MCP context token 消耗（英文原文）
└── README-中文.md               # 上述教學的繁中翻譯版
```
