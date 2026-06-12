# 專案樹狀結構 — Agentic-Coding-with-Claude-Code

> 生成日期：2026-06-12 ｜ 88 個資料夾 / 303 個檔案（已排除 12 個噪音目錄）
> 由 `project-tree` skill 生成

```
Agentic-Coding-with-Claude-Code/        # 《Agentic Coding with Claude Code》（Packt, Eden Marco）章節演練 repo
├── .github/workflows/                  # CI/CD：三條 GitHub Actions → VPS 部署線
│   ├── deploy-hookhub.yml              #   Chapter02 HookHub（PORT 3001）
│   ├── deploy-hookhub-ch10.yml         #   Chapter10 v1（PORT 3002，/ch10）
│   └── deploy-hookhub-ch10-v2.yml      #   Chapter10 v2（PORT 3003，/v2 basePath）
├── Chapter01/                          # MCP 入門：verbose MCP server 初版
│   ├── main.py                         #   uv 專案進入點（hello world）
│   ├── verbose_mcp_server.py           #   FastMCP 示範 server
│   ├── .mcp.json / .mcp.json.tavily    #   MCP server 設定（context7 / tavily）
│   └── README.md + README-中文.md
├── Chapter02/                          # HookHub 主專案：spec 驅動開發 + 多代理
│   ├── hookhub/hookhub/                #   Next.js 16 應用（已部署 VPS PORT 3001）
│   │   ├── .claude/commands/           #     infinite.md + infinite-中文.md（無限代理迴圈指令）
│   │   ├── CLAUDE.md + CLAUDE-中文.md  #     專案記憶（hooks 平台說明）
│   │   ├── memory/{frontend,spec}/     #     階層式記憶：前端人設 + 產品規格
│   │   ├── specs/        × 20          #     各元件/頁面規格（hero、card、faq、13 個 app...）
│   │   ├── specs-中文/   × 20          #     上述規格的繁中版
│   │   ├── src/                        #     app router + components（10 種 Hero 變體）+ hooks.json 資料
│   │   ├── ecosystem.config.js         #     PM2 部署設定
│   │   └── nginx-hookhub.conf          #     VPS nginx 反代設定
│   └── hookhub2/.claude/
│       ├── agents/       × 5           #     sub-agent 定義（prd-writer、system-architect...）
│       └── agents-中文/  × 5           #     上述 agents 繁中版
├── Chapter03/                          # Custom Commands + Hooks 音效通知
│   ├── custom commands/.claude/commands/  # commit-code、dad-joke（各含 -中文 版）
│   ├── hooks-notification/             #   6 Hook 事件音效系統
│   │   ├── .claude/settings.json       #     PreToolUse/PostToolUse/Stop... 6 事件 hook 設定
│   │   ├── play_sound.py               #     pygame WAV 播放器（hook 觸發）
│   │   ├── merge_hooks_wav.py          #     12 WAV 合併為單檔工具
│   │   └── *.wav × 15                  #     英文 6 + 中文 6 + ding/ulala/combined
│   └── ch03_demo_all_hooks_order.bat   #   全 Hook 音效依序演示
├── Chapter04/                          # Context Engineering + MCP 進階
│   ├── CLAUDE.md + CLAUDE-中文.md
│   └── context-engineering-mcp/        #   verbose_mcp_server.py：冗長工具描述吃 context 示範
├── Chapter07/                          # Sub-agents 多代理協作
│   ├── .claude/agents/ + agents-中文/  #   code-comedy-carl、mermaid-diagram-generator（各 2）
│   └── README.md + README-中文.md
├── Chapter08/                          # Output Styles + Status Line
│   ├── .claude/output-styles/ × 6      #   yaml-concise、retro-ascii-blog、numbered-table...（含 -中文 版 × 6）
│   ├── statusline.py                   #   自訂 status line 腳本
│   ├── mermaid/{mmd,png}/              #   演練產出的流程圖/心智圖
│   └── *.html × 5                      #   output style 示範頁
├── Chapter09/                          # Skills 工作流
│   └── .claude/skills/git-pushing/     #   SKILL.MD + scripts/smart_commit.sh（含 -中文 資料夾版）
├── Chapter10/                          # Next.js CI/CD 部署（兩版演練）
│   ├── v1-zealous-jemison/hookhub/     #   v1：PORT 3002（CLAUDE/README/memory 皆有 -中文 版）
│   └── v2-vigilant-feistel/hookhub/    #   v2：PORT 3003 + basePath=/v2
├── mermaid/                            # 全書層級圖表 + NotebookLM artifacts（audio/video/slides/infographic）
├── nlm-chapters/                       # NotebookLM 章節摘要 .md × 8 + 圖 + pptx
├── png/                                # 全書圖表彙整（flowchart/mindmap/infographic/slides）
├── summary-02-sessions/                # Session 1-9 工作紀錄（依日期分資料夾）
├── doc/                                # 專案文件（本檔案所在）
├── README.md + README-中文.md          # Packt 官方書籍說明 + 繁中版
├── agentic-coding-book-深度解析.md     # 全書深度解析筆記
├── book-author.md                      # 作者 Eden Marco 介紹
└── LICENSE                             # MIT
```

## 結構特徵

1. **章節 = 演練單元**：每章一個資料夾，各含獨立的 `.claude/` 設定（commands/agents/skills/output-styles），對應書中主題；Chapter05/06 上游無程式碼資料夾。
2. **中文化慣例**：所有翻譯檔以 `-中文` 後綴命名（55 個），與英文原檔並存；`-zh` 舊後綴已於 2026-06-12 全數清理。
3. **三條部署線**：Chapter02 / Chapter10 v1 / v2 透過 GitHub Actions + PM2 + nginx 部署到同一台 VPS（187.127.109.145）的 3001/3002/3003。
