# 專案樹狀結構 — Agentic-Coding-with-Claude-Code

> 生成日期：2026-06-12 ｜ 88 個資料夾 / 301 個檔案（已排除 12 個噪音目錄：node_modules、.next、.venv 等）
> 由 `project-tree` skill 生成

```
Agentic-Coding-with-Claude-Code/          # 《Agentic Coding with Claude Code》（Packt）章節演練 repo
├── .github/
│   └── workflows/                        # GitHub Actions CI/CD（三條 VPS 自動部署線）
│       ├── deploy-hookhub.yml            #   Ch02 hookhub 部署（push main 觸發，appleboy/ssh-action）
│       ├── deploy-hookhub-ch10.yml       #   Ch10 v1 部署（PORT 3002）
│       └── deploy-hookhub-ch10-v2.yml    #   Ch10 v2 部署（PORT 3003，basePath=/v2）
├── Chapter01/                            # MCP 情境優化教學（專案專屬 .mcp.json 降 token 消耗）
│   ├── .mcp.json                         #   專案級 MCP 設定（只載 verbose-server）
│   ├── .mcp.json.tavily                  #   Tavily MCP 設定範例（上游 JSON 格式損壞，僅示範）
│   ├── main.py                           #   uv 專案進入點（Hello World）
│   ├── verbose_mcp_server.py             #   「冗長工具描述吃 context」反面示範 MCP server
│   ├── pyproject.toml                    #   uv 專案設定（claude-code-crash-course）
│   ├── README.md / README-中文.md        #   MCP context 優化教學說明（英文原文 + 繁中翻譯）
│   └── uv.lock / .python-version         #   uv 依賴鎖定與 Python 版本
├── Chapter02/                            # 無限代理迴圈 + 多代理協作（HookHub 主戰場）
│   ├── hookhub/
│   │   ├── hookhub/                      #   HookHub Next.js 15 應用（已部署 VPS PORT 3001）
│   │   │   ├── .claude/
│   │   │   │   ├── commands/             #     infinite 無限代理迴圈指令（英文 + 中文版）
│   │   │   │   └── session-state.md      #     session 狀態記錄
│   │   │   ├── memory/
│   │   │   │   ├── frontend/CLAUDE.md    #     資深前端工程師 persona 指引
│   │   │   │   └── spec/                 #     HookHub 產品規格（英文 + 中文版）
│   │   │   ├── public/                   #     *.svg × 5（Next.js 預設靜態圖示）
│   │   │   ├── specs/                    #     *.spec.md × 20（頁面/元件/13 個 app 範例規格）
│   │   │   ├── specs-中文/               #     *.spec-中文.md × 20（上述規格的繁中翻譯）
│   │   │   ├── src/
│   │   │   │   ├── app/                  #     Next.js App Router 進入點（layout/page/globals.css）
│   │   │   │   ├── components/
│   │   │   │   │   ├── heros/            #       Hero*.tsx × 10（無限迴圈生成的 10 種 Hero 變體）
│   │   │   │   │   ├── sections/         #       HowItWorks / Testimonials 區塊元件
│   │   │   │   │   ├── Footer.tsx        #       頁尾元件
│   │   │   │   │   └── HookCard.tsx      #       Hook 卡片元件
│   │   │   │   ├── data/hooks.json       #     Hook 範例資料（mock data）
│   │   │   │   └── types/hook.ts         #     Hook TypeScript 型別定義
│   │   │   ├── CLAUDE.md / CLAUDE-中文.md  #   給 Claude Code 的專案指引（英文 + 繁中）
│   │   │   ├── DEPLOYMENT.md             #     VPS 部署文件
│   │   │   ├── ecosystem.config.js       #     PM2 設定（Next.js 15，loopback only）
│   │   │   ├── nginx-hookhub.conf        #     nginx 反向代理設定
│   │   │   ├── next.config.ts            #     含 outputFileTracingRoot 修復 workspace root 誤判
│   │   │   └── package.json / tsconfig.json 等  # Next.js + Tailwind 標準設定檔
│   │   ├── static/banner.png             #   HookHub 橫幅圖
│   │   └── nginx-hookhub-merged.conf     #   nginx 多 server block 合併版設定
│   └── hookhub2/                         #   多代理協作版（5 agent 團隊）
│       └── .claude/
│           ├── agents/                   #     *.md × 5（prd-writer / 架構師 / 前後端 / UI 設計師）
│           ├── agents-中文/              #     上述 5 個 agent 的繁中翻譯版
│           └── session-state.md          #     session 狀態記錄
├── Chapter03/                            # 自訂指令 + Hooks 音效通知系統
│   ├── custom commands/
│   │   └── .claude/commands/             #   commit-code / dad-joke 指令（各含中文版，共 4 檔）
│   ├── hooks-notification/               #   Hook 音效通知實作（6 事件 × 2 WAV）
│   │   ├── .claude/settings.json         #     6 個 Hook 事件 → play_sound.py 的綁定設定
│   │   ├── play_sound.py                 #     pygame 播放 WAV 的 Hook 腳本（含 log）
│   │   ├── merge_hooks_wav.py            #     合併 12 WAV 為單一展示音檔（純標準庫 wave）
│   │   ├── *.wav × 15                    #     6 事件英文音 + 6 事件中文音 + ding/ulala/合併檔
│   │   ├── hook-events.log               #     Hook 觸發紀錄
│   │   ├── wav-playlist.md               #     音檔清單說明
│   │   ├── table-hook-events-test-*.html #     Hook 事件測試結果表格
│   │   └── README.md / README-中文.md    #     Hooks 教學說明（英文 + 繁中）
│   └── ch03_demo_all_hooks_order.bat     #   CMD 依序播放 12 音效的展示腳本
├── Chapter04/                            # 進階 MCP 伺服器設計（context engineering）
│   ├── context-engineering-mcp/          #   與 Ch01 同構的 MCP 教學專案（README 已中文化）
│   │   ├── verbose_mcp_server.py         #     冗長工具描述示範（docstring 刻意保留英文）
│   │   └── main.py / pyproject.toml 等   #     uv 專案標準檔
│   ├── .mcp.json                         #   context7 MCP 設定
│   └── CLAUDE.md / CLAUDE-中文.md        #   互動偏好：討論 LangGraph 一律用 context7
├── Chapter07/                            # Sub-agents 多代理協作
│   ├── .claude/
│   │   ├── agents/                       #   code-comedy-carl + mermaid-diagram-generator
│   │   └── agents-中文/                  #   上述 2 個 agent 的繁中翻譯版
│   ├── main.py                           #   fibonacci 範例（給 agent 審查/演示用）
│   └── README.md / README-中文.md        #   Claude Code 速成課程說明
├── Chapter08/                            # Output Styles + Status Line
│   ├── .claude/
│   │   ├── output-styles/                #   *.md × 6（mermaid 圖/編號表格/復古 ASCII/yaml 等）
│   │   └── output-styles-中文/           #   上述 6 個 style 的繁中翻譯版
│   ├── mermaid/
│   │   ├── mmd/                          #   *.mmd × 4（書摘/output-styles 的流程圖+心智圖源碼）
│   │   └── png/                          #   *.png × 6（渲染輸出，含 3x/5x 高解析版）
│   ├── statusline.py                     #   自訂 status line 腳本
│   └── *.html × 5                        #   output styles 示範/指南/復古 ASCII 書摘等網頁
├── Chapter09/                            # Skills 工作流程
│   └── .claude/skills/
│       ├── git-pushing/                  #   慣例式 commit + push skill（SKILL.MD + smart_commit.sh）
│       └── git-pushing-中文/             #   繁中翻譯版（同結構）
├── Chapter10/                            # 桌面應用整合（兩版 HookHub 部署演練）
│   ├── v1-zealous-jemison/
│   │   └── hookhub/                      #   v1 精簡版 HookHub（VPS PORT 3002，路徑 /ch10）
│   │       ├── memory/                   #     frontend persona + 產品規格（各含中文版）
│   │       ├── src/                      #     App Router + HookCard + hooks.json（精簡版）
│   │       ├── ecosystem.config.js       #     PM2 設定（Ch10 v1）
│   │       └── CLAUDE / README / next.config 等  # 專案指引與 Next.js 標準設定（各含中文版）
│   └── v2-vigilant-feistel/
│       └── hookhub/                      #   v2 版 HookHub（VPS PORT 3003，basePath=/v2）
│           ├── memory/                   #     同 v1 結構（frontend persona + spec，各含中文版）
│           ├── src/                      #     同 v1 結構
│           ├── ecosystem.config.js       #     PM2 設定（含 HOSTNAME=127.0.0.1）
│           └── CLAUDE / README / next.config 等  # 同 v1（next.config 含 basePath: "/v2"）
├── doc/
│   └── project-tree.md                   # 本檔（project-tree skill 產出）
├── mermaid/                              # 全書層級的 Mermaid 圖表與多媒體產出
│   ├── artifacts/                        #   NotebookLM 產出（語音 m4a/影片 mp4/簡報 pptx/圖表 png）
│   ├── mmd/                              #   *.mmd × 3（Claude 擴充機制/學習路徑/章節心智圖源碼）
│   ├── png/                              #   *.png × 3（上述渲染輸出）
│   └── agentic-coding-beginners-guide.md #   新手入門指南文章
├── nlm-chapters/                         # NotebookLM 章節摘要知識庫
│   ├── Ch01~Ch10-*.md × 8                #   各章繁中重點摘要（餵 NotebookLM 的 source）
│   ├── Agentic_Coding_Blueprint.pptx     #   全書藍圖簡報
│   └── AI_代理式*.jpg × 2                #   入門指南資訊圖表
├── png/                                  # 圖表彙整目錄（*.png × 12 + 簡報 pdf/pptx）
├── summary-02-sessions/                  # Session 工作紀錄（依日期分目錄）
│   ├── 2026-05-26/                       #   session1~6-summary.md × 6（首日大量演練）
│   ├── 2026-05-28/                       #   session7（VPS nginx 合併）
│   ├── 2026-06-02/                       #   session8
│   ├── 2026-06-03/                       #   session9（收工確認 + HANDOFF）
│   └── 2026-06-12/                       #   session10（中文化全收尾 + -zh 清零）
├── .gitignore                            # 排除 node_modules/.next 等建置產物
├── agentic-coding-book-深度解析.md       # 全書深度解析文章
├── book-author.md                        # 書籍作者介紹
├── LICENSE                               # MIT License（Packt 2026）
├── README.md                             # Packt 官方書籍 repo 說明（英文原文）
└── README-中文.md                        # 上述的繁中翻譯版
```
