# Codebase Structure

**Analysis Date:** 2026-07-15

## Directory Layout

```
Agentic-Coding-with-Claude-Code/
├── .github/workflows/            # 三條 VPS 部署線（deploy-hookhub*.yml）
├── Chapter01/                    # MCP context 優化教學（uv 專案 + verbose_mcp_server.py）
├── Chapter02/                    # HookHub 主戰場
│   ├── hookhub/
│   │   ├── hookhub/              #   Next.js 15 完整版（VPS PORT 3001）
│   │   │   ├── .claude/commands/ #     infinite 無限代理迴圈指令（英+中）
│   │   │   ├── memory/           #     frontend persona + 產品規格（spec/）
│   │   │   ├── specs/            #     20 個 .spec.md（specs-中文/ 為翻譯）
│   │   │   └── src/              #     app/ components/ data/ types/
│   │   └── nginx-hookhub-merged.conf  # nginx 多 server block 合併版
│   └── hookhub2/.claude/agents/  #   5-agent 團隊（agents-中文/ 為翻譯）
├── Chapter03/                    # 自訂指令 + Hooks 音效
│   ├── custom commands/.claude/commands/   # commit-code / dad-joke（含中文版，注意目錄名含空白）
│   ├── hooks-notification/       #   .claude/settings.json + play_sound.py + 15 WAV
│   └── ch03_demo_all_hooks_order.bat       # 原生 CMD 展示腳本
├── Chapter04/                    # 進階 MCP（context-engineering-mcp/ 與 Ch01 同構）
├── Chapter07/.claude/agents/     # 2 個示範 agent（+ agents-中文/）
├── Chapter08/                    # output-styles × 6（+ 中文版）+ statusline.py + mermaid/
├── Chapter09/.claude/skills/     # git-pushing/（SKILL.MD + scripts/）+ git-pushing-中文/
├── Chapter10/                    # 兩版部署演練 HookHub
│   ├── v1-zealous-jemison/hookhub/   # PORT 3002，/ch10，空 next.config + nginx 改寫
│   └── v2-vigilant-feistel/hookhub/  # PORT 3003，/v2，basePath 路由
├── doc/                          # project-tree*.md × 9（/project-tree skill 產出）
├── mermaid/                      # 全書層級圖表（mmd/ png/ artifacts/）
├── nlm-chapters/                 # NotebookLM 章節摘要知識庫（Ch01~Ch10 繁中摘要）
├── png/                          # 圖表彙整（png + pdf/pptx）
├── summary-02-sessions/          # Session 紀錄（YYYY-MM-DD/sessionN-summary.md）
├── .planning/codebase/           # 本分析文件（GSD codebase map）
├── CLAUDE.md                     # 給 Claude Code 的 repo 級指引（必讀）
├── README.md / README-中文.md    # Packt 官方說明 + 繁中翻譯
└── agentic-coding-book-深度解析.md  # 全書深度解析文章
```

（Chapter05/06 上游無程式碼資料夾，本 repo 亦無。）

## Directory Purposes

**Chapter01/ 與 Chapter04/context-engineering-mcp/:**

- Purpose: MCP context engineering 教學（兩者同構的 Python uv 專案）
- Contains: `main.py`、`verbose_mcp_server.py`、`pyproject.toml`、`uv.lock`、`.python-version`、`.mcp.json`
- Key files: `Chapter01/verbose_mcp_server.py`（反面教材，docstring 刻意英文）、`Chapter04/.mcp.json.tavily`（上游刻意損壞，勿修）

**三個 hookhub/（Ch02 + Ch10 v1/v2）:**

- Purpose: Next.js 15 App Router 展示站，程式碼同構、部署層互異
- Contains: `src/`、`next.config.ts`、`ecosystem.config.js`、`CLAUDE.md`（+ `-中文`）、`DEPLOYMENT.md`、`package.json`、`tsconfig.json`
- Key files: `src/app/page.tsx`（唯一頁面）、`src/types/hook.ts`（資料模型）、`src/data/hooks.json`（mock data）

**Chapter03/hooks-notification/:**

- Purpose: Claude Code Hooks 音效通知實作
- Contains: `.claude/settings.json`（6 事件綁定）、`play_sound.py`、`merge_hooks_wav.py`、15 個 `.wav`、`hook-events.log`
- Key files: `play_sound.py`（`Path(__file__).parent` 定位 WAV 的標準寫法範例）

**各章 .claude/（配置示範）:**

- Purpose: 每章示範一種 Claude Code 擴充機制；只在從該目錄啟動 Claude Code 時生效
- Contains: `commands/` / `agents/` / `skills/` / `output-styles/` / `settings.json`，各配一個 `-中文` 平行目錄
- Key files: `Chapter09/.claude/skills/git-pushing/SKILL.MD`（注意大寫副檔名）+ `scripts/smart_commit.sh`

**.github/workflows/:**

- Purpose: CI/CD——push main 自動部署三個 HookHub 到 VPS
- Contains: `deploy-hookhub.yml`、`deploy-hookhub-ch10.yml`、`deploy-hookhub-ch10-v2.yml`
- Key files: 三檔皆有 paths filter + 共用 `concurrency: group: vps-deploy`

**知識庫目錄（nlm-chapters/ mermaid/ png/ summary-02-sessions/ doc/）:**

- Purpose: 非程式碼產出——NotebookLM source、圖表、session 紀錄、專案樹文件
- Contains: Markdown / mmd / png / pptx / m4a / mp4
- Key files: `summary-02-sessions/2026-05-26/session4-summary.md`（VPS nginx 設定重建參考）

## Key File Locations

**Entry Points:**

- `Chapter02/hookhub/hookhub/src/app/page.tsx`: HookHub 完整版首頁（Ch10 兩版路徑同構）
- `Chapter01/main.py`、`Chapter04/context-engineering-mcp/main.py`: uv 專案進入點
- `Chapter03/hooks-notification/play_sound.py`: hook 音效進入點

**Configuration:**

- `CLAUDE.md`（repo 根）: 全 repo 指引與慣例（翻譯規則、部署陷阱）
- 各 hookhub 的 `next.config.ts` / `ecosystem.config.js`: 三版部署差異所在
- `Chapter03/hooks-notification/.claude/settings.json`: 6 hook 事件綁定
- `Chapter01/.mcp.json`、`Chapter04/.mcp.json`: 專案級 MCP 設定

**Core Logic:**

- `src/components/`（各 hookhub）: UI 元件（Ch02 含 `heros/` × 10、`sections/`）
- `.github/workflows/deploy-hookhub*.yml`: 部署腳本（含大量繁中註解，是踩坑知識載體）

**Testing:**

- 無自動化測試框架。驗證方式：`npm run build` 必過 + 瀏覽器/Puppeteer 截圖 + 部署後 health check curl

## Naming Conventions

**Files:**

- 繁中翻譯檔：原名 + `-中文`（`prd-writer-中文.md`、`README-中文.md`、`specs-中文/`）。**`-zh` 後綴已全 repo 清零，禁止再引入**
- React 元件：PascalCase（`HookCard.tsx`、`HeroTerminal.tsx`）
- Python：snake_case（`play_sound.py`、`merge_hooks_wav.py`）
- 規格檔：`<名稱>.spec.md`（翻譯版 `<名稱>.spec-中文.md`）
- Workflow：`deploy-hookhub[-ch10[-v2]].yml`（章節後綴遞增）
- 中文音檔直接用中文檔名（`工具使用前.wav`）——查檔需 `git -c core.quotepath=false`

**Directories:**

- 章節：`ChapterNN/`（兩位數，PascalCase）
- Ch10 版本目錄：`vN-<代號>/hookhub/`（如 `v1-zealous-jemison`）
- Session 紀錄：`summary-02-sessions/YYYY-MM-DD/sessionN-summary.md`
- 例外注意：`Chapter03/custom commands/` 目錄名**含空白**，shell 操作需引號

## Where to Add New Code

**New Feature（HookHub 元件）:**

- Primary code: `Chapter02/hookhub/hookhub/src/components/`（Hero 變體放 `heros/`、區塊放 `sections/`）；先寫 spec 到 `specs/`
- Tests: 無測試目錄——以 `npm run build` + 截圖驗證
- 若三版都要改：三個 hookhub 目錄需各自同步（無共用套件）

**New Component/Module（Claude Code 擴充示範）:**

- Implementation: 依機制放對章節——commands → `Chapter03/custom commands/.claude/commands/`；agents → `Chapter07/.claude/agents/`；output-styles → `Chapter08/.claude/output-styles/`；skills → `Chapter09/.claude/skills/<name>/`（SKILL.MD + scripts/）
- 同步產出 `-中文` 翻譯版（frontmatter 識別碼保留英文，`description` 與 body 翻譯，程式碼區塊指令不翻）

**New 部署線:**

- Workflow: `.github/workflows/deploy-<name>.yml`（加入 `concurrency: group: vps-deploy`、paths filter、`appleboy/ssh-action@v1.0.3` 固定版本）
- PM2 設定: 目標應用目錄下 `ecosystem.config.js`（新 port、獨立 app name、`HOSTNAME: "127.0.0.1"`）

**Utilities:**

- Shared helpers: 不存在共用層——工具腳本與其使用章節同目錄（如 `merge_hooks_wav.py` 在 `Chapter03/hooks-notification/`）

**文件與紀錄:**

- Session 紀錄: `summary-02-sessions/YYYY-MM-DD/sessionN-summary.md`
- 專案樹: `doc/project-tree-<資料夾名>.md`（由 `/project-tree` skill 生成）
- NotebookLM 摘要: `nlm-chapters/ChNN-*.md`

## Special Directories

**node_modules/ 與 .next/（各 hookhub 內）:**

- Purpose: npm 依賴與 Next.js 建置產物
- Generated: Yes
- Committed: No（`.gitignore` 排除）

**.venv/（Chapter01/03/04 uv 專案內）:**

- Purpose: uv 虛擬環境
- Generated: Yes（`uv sync`）
- Committed: No（`uv.lock` 有入版控）

**mermaid/artifacts/:**

- Purpose: NotebookLM 產出（m4a/mp4/pptx/png 大型二進位）
- Generated: Yes（外部工具）
- Committed: Yes

**Chapter03/hooks-notification/*.wav 與 hook-events.log:**

- Purpose: 預生成音檔（跨機器可直接用，缺聲音包機器不需重生）+ hook 觸發紀錄
- Generated: WAV 預生成後入版控；log 為執行期產物
- Committed: WAV Yes；log 目前有入版控（歷史紀錄）

**.planning/codebase/:**

- Purpose: GSD codebase map 文件（本檔所在）
- Generated: Yes（/gsd:map-codebase）
- Committed: Yes（由 orchestrator 處理）

---

*Structure analysis: 2026-07-15*
