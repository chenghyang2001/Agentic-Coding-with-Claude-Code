<!-- refreshed: 2026-07-15 -->
# Architecture

**Analysis Date:** 2026-07-15

## System Overview

```text
┌─────────────────────────────────────────────────────────────────────┐
│                    教學章節層（每章一個獨立示範專案）                  │
├───────────────────┬───────────────────┬─────────────────────────────┤
│  MCP 教學（Python）│  HookHub（Next.js）│  Claude Code 擴充機制示範    │
│  `Chapter01/`     │  `Chapter02/hookhub/hookhub/`                   │
│  `Chapter04/      │  `Chapter10/v1-zealous-jemison/hookhub/`        │
│   context-        │  `Chapter10/v2-vigilant-feistel/hookhub/`       │
│   engineering-mcp/│                   │  Ch03 hooks / Ch07 agents / │
│                   │                   │  Ch08 output-styles /        │
│                   │                   │  Ch09 skills                 │
└───────────────────┴────────┬──────────┴─────────────────────────────┘
                             │ push main（paths filter）
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│              CI/CD 部署層（GitHub Actions，三條部署線）                │
│  `.github/workflows/deploy-hookhub.yml`（Ch02 → PORT 3001, /）      │
│  `.github/workflows/deploy-hookhub-ch10.yml`（v1 → 3002, /ch10）    │
│  `.github/workflows/deploy-hookhub-ch10-v2.yml`（v2 → 3003, /v2）   │
│  共用 concurrency group: vps-deploy（序列化，防並發互撞）              │
└────────────────────────────┬────────────────────────────────────────┘
                             │ appleboy/ssh-action@v1.0.3
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│  Hostinger VPS（187.127.109.145）                                    │
│  nginx（對外 80）→ PM2（`ecosystem.config.js`，loopback only）        │
│  hookhub:3001 / hookhub-ch10:3002 / hookhub-v2:3003                 │
└─────────────────────────────────────────────────────────────────────┘

（平行的非程式碼層）
┌─────────────────────────────────────────────────────────────────────┐
│  知識庫層：`nlm-chapters/`（NotebookLM source）、`mermaid/`（圖表）、  │
│  `summary-02-sessions/`（session 紀錄）、`doc/`（project-tree 產出） │
└─────────────────────────────────────────────────────────────────────┘
```

## Component Responsibilities

| Component | Responsibility | File |
| ----------- | ---------------- | ------ |
| HookHub Ch02（完整版） | 無限代理迴圈產出的展示站（10 Hero 變體 + sections） | `Chapter02/hookhub/hookhub/` |
| HookHub Ch10 v1（精簡版） | nginx 路徑改寫部署示範（空 next.config） | `Chapter10/v1-zealous-jemison/hookhub/` |
| HookHub Ch10 v2（精簡版） | Next.js `basePath` 部署示範 | `Chapter10/v2-vigilant-feistel/hookhub/` |
| MCP 反面教材 server | 冗長工具描述吃 context 的示範 | `Chapter01/verbose_mcp_server.py`、`Chapter04/context-engineering-mcp/verbose_mcp_server.py` |
| Hook 音效系統 | 6 個 Claude Code hook 事件 → pygame 播 WAV | `Chapter03/hooks-notification/play_sound.py` + `.claude/settings.json` |
| WAV 合併工具 | 12 WAV → 單一展示音檔（純標準庫 wave） | `Chapter03/hooks-notification/merge_hooks_wav.py` |
| 多代理協作示範 | 5-agent 團隊 / 2 個示範 agent | `Chapter02/hookhub2/.claude/agents/`、`Chapter07/.claude/agents/` |
| Output styles + 狀態列 | 6 個 output style + statusline 腳本 | `Chapter08/.claude/output-styles/`、`Chapter08/statusline.py` |
| Skill 示範 | 慣例式 commit + push skill | `Chapter09/.claude/skills/git-pushing/SKILL.MD` + `scripts/` |
| CI/CD 部署腳本 | SSH 進 VPS：git reset → npm ci → build → PM2 reload | `.github/workflows/deploy-hookhub*.yml` |
| PM2 行程管理設定 | port / HOSTNAME / log 路徑（每個 HookHub 各一份） | 各 hookhub 目錄的 `ecosystem.config.js` |
| nginx 反向代理設定 | 對外路由 → loopback port | `Chapter02/hookhub/hookhub/nginx-hookhub.conf`、`Chapter02/hookhub/nginx-hookhub-merged.conf` |

## Pattern Overview

**Overall:** Monorepo 式「章節教學專案集合」——非單一應用，而是 10 個章節目錄各自獨立、互不 import 的示範專案，外加繁中翻譯平行檔（`-中文` 後綴）與知識庫產出。

**Key Characteristics:**

- 每個章節是自足專案（各有自己的 `package.json` / `pyproject.toml` / `.claude/`），根目錄無共用程式碼層
- 三個 HookHub **程式碼同構，差異全在部署層**（port、nginx 路由策略、`next.config.ts`、PM2 name）——這是刻意的教材對照設計
- 翻譯採「並存新檔」策略：上游英文原檔不動，翻譯檔以 `-中文` 後綴並列
- 各章 `.claude/` 只在從該目錄啟動 Claude Code 時生效（project-level 配置示範）

## Layers

**教學章節層（Chapter01~10）:**

- Purpose: 各章示範 Claude Code 的一種擴充機制或工作流
- Location: `Chapter01/` ~ `Chapter10/`（Chapter05/06 上游無程式碼，本 repo 亦無）
- Contains: Next.js 應用、Python uv 專案、`.claude/` 配置（commands/agents/hooks/skills/output-styles）
- Depends on: 無跨章依賴——章節之間零 import
- Used by: 讀者演練、CI/CD（僅 HookHub 三份）

**HookHub 應用內部層（三份同構）:**

- Purpose: Next.js 15 App Router 靜態展示站
- Location: `src/app/`（進入點）→ `src/components/`（UI）→ `src/data/hooks.json`（mock 資料）→ `src/types/hook.ts`（型別）
- Contains: Server Components（無 client state、無 API route）
- Depends on: Next.js 15 + Tailwind CSS 4 + TypeScript
- Used by: nginx → PM2 → 瀏覽器

**部署層（CI/CD + VPS）:**

- Purpose: push main 自動部署三個 HookHub 到同一台 VPS
- Location: `.github/workflows/`、各 hookhub 的 `ecosystem.config.js` / `nginx-hookhub*.conf` / `DEPLOYMENT.md`
- Contains: GitHub Actions YAML、PM2 設定、nginx conf
- Depends on: GitHub Secrets（VPS_HOST / VPS_USER / VPS_SSH_KEY / VPS_PORT）
- Used by: GitHub push 事件觸發

**知識庫層（非程式碼）:**

- Purpose: 全書摘要、圖表、session 工作紀錄
- Location: `nlm-chapters/`、`mermaid/`、`png/`、`summary-02-sessions/`、`doc/`
- Contains: Markdown、mmd/png、pptx/m4a/mp4
- Depends on: NotebookLM / mermaid-cli / project-tree skill 產出
- Used by: 人類閱讀與 NotebookLM 餵料，程式不引用

## Data Flow

### HookHub 頁面渲染路徑（三份共通）

1. 請求進入 nginx（Ch02: `/`；v1: `/ch10` 尾斜線改寫；v2: `/v2` 原封轉發）
2. nginx proxy_pass → PM2 管理的 Next.js（`127.0.0.1:3001/3002/3003`）
3. `src/app/page.tsx` import `src/data/hooks.json`，以 `Hook[]` 型別（`src/types/hook.ts`）切分 featured / regular
4. 組合 Hero 變體（`src/components/heros/Hero*.tsx`）+ `HookCard.tsx` + sections → Server Component 靜態渲染回應

### CI/CD 部署流程

1. push main 且命中 paths filter → 對應 workflow 觸發（`.github/workflows/deploy-hookhub*.yml`）
2. `appleboy/ssh-action@v1.0.3` SSH 進 VPS，`git fetch origin main && git reset --hard FETCH_HEAD`（VPS 是乾淨鏡像，禁用 `git pull --ff-only`）
3. `npm ci` → `npm run build` → `pm2 startOrReload ecosystem.config.js --env production`
4. health check `curl` 對應路徑（v2 必須打 `/v2` 不含尾斜線，避免 308）

### Hook 音效觸發流程（Chapter03）

1. Claude Code 觸發 6 事件之一（PreToolUse / PostToolUse / UserPromptSubmit / Stop / SubagentStop / Notification）
2. `Chapter03/hooks-notification/.claude/settings.json` 的 command 以 `&&` 串接：先 `cd` 到 hooks-notification 目錄（hook 執行時 CWD 不固定）
3. `uv run play_sound.py <事件>.wav`（英文音）→ 再播中文音 WAV
4. `play_sound.py` 用 `Path(__file__).parent` 定位 WAV，播放後獨立 try/except 追加 `hook-events.log`

**State Management:**

- HookHub 無任何執行期狀態——純靜態 Server Components，資料源是版控內的 `hooks.json`
- VPS 端狀態由 PM2 持有（app name 隔離：`hookhub` / `hookhub-ch10` / `hookhub-v2`）

## Key Abstractions

**Hook（HookHub 資料模型）:**

- Purpose: 代表一個 Claude Code hook 專案條目（名稱、分類、GitHub 連結、hookTypes）
- Examples: `Chapter02/hookhub/hookhub/src/types/hook.ts`（interface + `HookCategory` / `HookType` enum）、`src/data/hooks.json`
- Pattern: JSON mock data + TypeScript 型別斷言（`hooksData.hooks as Hook[]`）

**`.claude/` 章節級配置:**

- Purpose: 每章示範一種 Claude Code 擴充機制
- Examples: `Chapter02/hookhub/hookhub/.claude/commands/`、`Chapter07/.claude/agents/`、`Chapter08/.claude/output-styles/`、`Chapter09/.claude/skills/git-pushing/`
- Pattern: YAML frontmatter（name/model/tools 保留英文）+ 純自然語言 body；翻譯版並存於 `-中文` 目錄

**規格檔（spec-driven 產出）:**

- Purpose: 無限代理迴圈的輸入規格（每頁面/元件一份 `.spec.md`）
- Examples: `Chapter02/hookhub/hookhub/specs/`（20 檔）+ `specs-中文/`（20 檔翻譯）
- Pattern: 一 spec 對應一產出元件（如 Hero 變體）

**memory/ persona 注入:**

- Purpose: 給 Claude Code 的角色與產品規格上下文
- Examples: `Chapter02/hookhub/hookhub/memory/frontend/CLAUDE.md`（前端工程師 persona）、`memory/spec/`（產品規格）；Ch10 兩版同構
- Pattern: 目錄化的 CLAUDE.md 分層引用

## Entry Points

**HookHub × 3:**

- Location: `src/app/layout.tsx` + `src/app/page.tsx`（各 hookhub 目錄下）
- Triggers: `npm run dev` / PM2 `next start`
- Responsibilities: 單頁靜態渲染（Ch02 完整版含 10 Hero 變體；Ch10 兩版精簡）

**MCP 教學專案 × 2:**

- Location: `Chapter01/main.py`、`Chapter04/context-engineering-mcp/main.py`（`uv run main.py`）
- Triggers: 手動執行；`verbose_mcp_server.py` 由 `.mcp.json` 註冊給 Claude Code 載入
- Responsibilities: Hello World 進入點 + MCP server 反面教材

**Hook 音效:**

- Location: `Chapter03/hooks-notification/play_sound.py`
- Triggers: `.claude/settings.json` 綁定的 6 個 hook 事件；或手動 `uv run play_sound.py <檔名>.wav`
- Responsibilities: pygame 播 WAV + 寫 `hook-events.log`

**CI/CD:**

- Location: `.github/workflows/deploy-hookhub*.yml`
- Triggers: push main + paths filter 命中對應 hookhub 目錄
- Responsibilities: SSH 部署全流程（clone/reset → build → PM2 → health check）

## Architectural Constraints

- **Threading:** 全部單執行緒——Next.js fork 模式（PM2 `instances: 1`）、Python 腳本同步執行
- **Global state:** 無模組級共享狀態；唯一「全域」是 VPS 上的 PM2 daemon 與 nginx conf（後者手動改動**不在版控中**，重建參考 `summary-02-sessions/2026-05-26/session4-summary.md`）
- **Circular imports:** 無——章節間零依賴，HookHub 內部是單向 app → components → data/types
- **部署序列化:** 三條 workflow 共用 `concurrency: group: vps-deploy`、`cancel-in-progress: false`，同時間僅一條可操作 VPS
- **workspace root 陷阱:** 使用者 home 若存在 `package-lock.json`，Next.js 會誤判 workspace root → 各 `next.config.ts` 以 `outputFileTracingRoot: __dirname` 防禦（Ch02；v2 用 `basePath`，注意 v1 為空 config 是刻意教材設計）

## Anti-Patterns

### 「修復」上游刻意損壞的示範檔

**What happens:** `Chapter04/.mcp.json.tavily` 上游 JSON 格式本來就是損壞的（mcpServers 提早關閉）
**Why it's wrong:** 它是教材示範用途，修好會偏離上游原文
**Do this instead:** 保留原樣不動；同理 `verbose_mcp_server.py` 的冗長英文 docstring 是反面教材，刻意不翻譯

### nginx proxy_pass 尾斜線與 basePath 混用錯誤

**What happens:** 對設了 `basePath: "/v2"` 的 Next.js 用**有尾斜線**的 proxy_pass（路徑改寫），或 health check 打 `/v2/`（尾斜線）
**Why it's wrong:** 尾斜線改寫會剝掉 `/v2` 前綴導致 404；Next.js 對 `/v2/` 回 308 導致 health check 誤判
**Do this instead:** basePath 搭配**無尾斜線** proxy_pass（見 `Chapter10/v2-vigilant-feistel/hookhub/next.config.ts` 與 `.github/workflows/deploy-hookhub-ch10-v2.yml` 註解）

### VPS 用 `git pull --ff-only` 同步

**What happens:** VPS 有手動建立的未追蹤檔時 pull abort，部署失敗
**Why it's wrong:** VPS 應是 repo 的乾淨鏡像，不該保留本地改動
**Do this instead:** `git fetch origin main && git reset --hard FETCH_HEAD`（三條 workflow 皆已採用，踩坑記錄 commit 0b0e365）

### Next.js 監聽 0.0.0.0 對外裸露

**What happens:** PM2 未設 `HOSTNAME` 時 Next.js 預設監聽 0.0.0.0，port 直接對外可繞過 nginx
**Why it's wrong:** 繞過 nginx 的安全標頭與路由層
**Do this instead:** `ecosystem.config.js` 一律設 `HOSTNAME: "127.0.0.1"`（v2 已設；v1 待查驗，見 MEMORY 待辦）

## Error Handling

**Strategy:** 各層獨立防禦，無跨層錯誤傳遞框架

**Patterns:**

- Python hook 腳本：主功能（播音）與 log 寫入各自獨立 try/except，log 失敗不中斷播音（`Chapter03/hooks-notification/play_sound.py`）
- CI/CD script：`set -euo pipefail` 遇錯即停；步驟間有 echo 標記便於定位
- 部署 idempotent：`.git` 目錄判斷 clone/reset、`command -v pm2 || npm install -g pm2` 短路安裝
- HookHub 前端：無 runtime 錯誤處理需求（靜態渲染、無外部 I/O）

## Cross-Cutting Concerns

**Logging:** PM2 分離 out/err log（`logs/hookhub-*-out.log` / `-err.log`，`log_date_format` 統一）；hook 音效寫 `hook-events.log`（`YYYY-MM-DD HH:MM:SS | filename.wav`）
**Validation:** 無執行期驗證層（mock data 靠 TypeScript 型別斷言）；部署驗證 = `npm run build` 必過 + health check curl
**Authentication:** 無應用層認證；CI/CD 用 GitHub Secrets 存 SSH 私鑰（不設 host fingerprint）

---

*Architecture analysis: 2026-07-15*
