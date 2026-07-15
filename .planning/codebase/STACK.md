# Technology Stack

**Analysis Date:** 2026-07-15

> 本 repo 是「多專案集合」（monorepo-like 章節演練庫），非單一應用。每個 Chapter 是獨立可執行的專案，各自有獨立的 lockfile 與依賴樹。以下按技術線分述。

## Languages

**Primary:**

- TypeScript 5.x — 三份 HookHub Next.js 應用（`Chapter02/hookhub/hookhub/`、`Chapter10/v1-zealous-jemison/hookhub/`、`Chapter10/v2-vigilant-feistel/hookhub/`）
- Python 3.11 — MCP 教學專案（`Chapter01/`、`Chapter04/context-engineering-mcp/`）、Hook 音效系統（`Chapter03/hooks-notification/`）、範例腳本（`Chapter07/main.py`、`Chapter08/statusline.py`）

**Secondary:**

- JavaScript (CommonJS) — PM2 部署設定（各 hookhub 的 `ecosystem.config.js`）
- Shell script — CI/CD 部署腳本（內嵌於 `.github/workflows/*.yml`）、`Chapter09/.claude/skills/git-pushing/smart_commit.sh`
- Batch — `Chapter03/ch03_demo_all_hooks_order.bat`（需原生 CMD 執行，Git Bash 下中文亂碼）
- Markdown — 大量文件層產出（翻譯、specs、agents、skills、session 紀錄）；是本 repo 的「內容主體」

## Runtime

**Environment:**

- Node.js 20+（`@types/node: ^20`；VPS 上以 PM2 fork 模式執行 `node_modules/.bin/next start`）
- Python >= 3.11（三個 uv 專案的 `.python-version` 均為 `3.11`）

**Package Manager:**

- npm — 三份 HookHub 各自有 `package-lock.json`（present）；CI 用 `npm ci` 保證 lockfile 一致性
- uv — 三個 Python 專案各自有 `uv.lock`（present）：`Chapter01/`、`Chapter03/hooks-notification/`、`Chapter04/context-engineering-mcp/`
- Lockfile 狀態：全部 present（6 個）

## Frameworks

**Core:**

- Next.js — `Chapter02` 為 `^15.5.9`，`Chapter10 v1/v2` 鎖定 `15.4.6`；全部使用 App Router（`src/app/`）
- React / React DOM 19.1.0（三份 HookHub 皆同）
- Tailwind CSS 4.x（經 `@tailwindcss/postcss`，無自訂 config，用預設值）
- FastMCP >= 2.12.4 — MCP server 框架（`Chapter01/verbose_mcp_server.py`、`Chapter04/context-engineering-mcp/verbose_mcp_server.py`）
- pygame >= 2.6.1 — WAV 音效播放（`Chapter03/hooks-notification/play_sound.py`）

**Testing:**

- 無自動化測試框架（三份 HookHub 的 CLAUDE.md 明載「No test framework is currently set up」）
- 驗證方式：`npm run build` 必過 + 瀏覽器/Puppeteer/Playwright MCP 截圖

**Build/Dev:**

- ESLint 9 + `eslint-config-next` 15.4.6（`npm run lint`）
- TypeScript 5（strict，path alias `@/*` → `./src/*`，見各 hookhub `tsconfig.json`）
- PM2 — VPS 生產進程管理（`ecosystem.config.js` × 3）

## Key Dependencies

**Critical:**

- `next` 15.4.6 / ^15.5.9 — 全部三個部署應用的核心；`Chapter02` 版本已飄移到 15.5.x，Ch10 兩版仍鎖 15.4.6
- `fastmcp` >= 2.12.4 — MCP 教學章的唯一 Python 依賴（示範「冗長工具描述吃 context」的反面教材 server）
- `pygame` >= 2.6.1 — Chapter03 Hook 音效唯一依賴；`merge_hooks_wav.py` 則刻意只用標準庫 `wave`

**Infrastructure:**

- PM2（VPS 端 `npm install -g pm2` 安裝到 `~/.npm-global`，非 repo 依賴）— 進程守護 + zero-downtime reload
- nginx（VPS 端，設定範本在 `Chapter02/hookhub/hookhub/nginx-hookhub.conf` 與 `Chapter02/hookhub/nginx-hookhub-merged.conf`）
- `appleboy/ssh-action@v1.0.3` — GitHub Actions SSH 部署 action（版本鎖定，勿改 @master）

## Configuration

**Environment:**

- HookHub 應用本身**零環境變數需求**（純靜態 mock data，無 DB、無 API key）
- 生產環境變數由 PM2 `env_production` 注入：`NODE_ENV=production`、`PORT`（3001/3002/3003）、`HOSTNAME=127.0.0.1`（v2 有；強制 loopback，外部流量必經 nginx）
- CI/CD 需要 4 個 GitHub Secrets：`VPS_HOST` / `VPS_USER` / `VPS_SSH_KEY` / `VPS_PORT`
- `.env*` 已在 `.gitignore` 排除，但目前無任何專案實際使用 .env

**Build:**

- `next.config.ts` × 3：
  - `Chapter02/hookhub/hookhub/next.config.ts` — `outputFileTracingRoot: path.resolve(__dirname)`（修復 `%USERPROFILE%\package-lock.json` 造成的 workspace root 誤判，否則 Tailwind 樣式全空白）
  - `Chapter10/v1-zealous-jemison/hookhub/next.config.ts` — 空設定（路由改寫全靠 nginx 尾斜線 proxy_pass）
  - `Chapter10/v2-vigilant-feistel/hookhub/next.config.ts` — `basePath: "/v2"`（配 nginx 無尾斜線 proxy_pass）
- `pyproject.toml` × 3 — 均命名 `claude-code-crash-course`，`requires-python = ">=3.11"`
- `.claude/settings.json`（`Chapter03/hooks-notification/`）— 6 個 Hook 事件（PreToolUse/PostToolUse/UserPromptSubmit/Stop/Notification/PreCompact）綁定 `uv run play_sound.py <wav>`，路徑用 `%USERPROFILE%` 可攜寫法

## Platform Requirements

**Development:**

- Windows 10 + Git Bash 為主要開發環境（本 repo 的踩坑紀錄多與 MSYS2 路徑轉換、cp950 編碼相關）
- Node.js + npm、Python 3.11 + uv、Claude Code CLI（各章 `.claude/` 配置只在從該目錄啟動時生效）
- Chapter03 音效需 Windows 音訊裝置 + pygame 2.6.1（`uv sync` 安裝）

**Production:**

- Hostinger VPS（187.127.109.145，無 root 的 user 帳號）：Node.js + PM2 + nginx
- 三個 PM2 app：`hookhub`（3001）/ `hookhub-ch10`（3002）/ `hookhub-v2`（3003），皆 fork 單實例、`max_memory_restart: 512M`
- 部署流程：push main → GitHub Actions → SSH → `git fetch + reset --hard FETCH_HEAD` → `npm ci` → `npm run build` → `pm2 reload/start` → curl health check

---

*Stack analysis: 2026-07-15*
