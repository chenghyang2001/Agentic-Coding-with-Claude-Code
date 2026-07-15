# External Integrations

**Analysis Date:** 2026-07-15

> 本 repo 的執行期外部整合極少（HookHub 是純靜態 mock data 應用）。主要「整合」集中在兩處：MCP server 設定（教學示範）與 CI/CD → VPS 部署鏈。

## APIs & External Services

**MCP Servers（Claude Code 擴充，教學示範用）:**

- verbose-server — 本地 FastMCP HTTP server（反面教材：冗長工具描述吃 context）
  - 設定：`Chapter01/.mcp.json`（`http://127.0.0.1:8000/mcp`）
  - 實作：`Chapter01/verbose_mcp_server.py`、`Chapter04/context-engineering-mcp/verbose_mcp_server.py`（fastmcp）
- context7 — 外部文件查詢 MCP（`https://mcp.context7.com/mcp`）
  - 設定：`Chapter01/.mcp.json`（含 `CONTEXT7_API_KEY` header，值為 `XXXXX` 佔位符，非真實金鑰）、`Chapter04/.mcp.json`（無 key）
  - 使用慣例：`Chapter04/CLAUDE.md` 規定「討論 LangGraph 一律用 context7」
- tavily — 搜尋 MCP（`https://mcp.tavily.com/mcp/?tavilyApiKey=XXXXX`，佔位符）
  - 設定：`Chapter01/.mcp.json`、`Chapter01/.mcp.json.tavily`、`Chapter04/context-engineering-mcp/.mcp.json.tavily`
  - ⚠️ `.mcp.json.tavily` 兩份的 JSON 結構是**上游刻意損壞的示範檔**（`mcpServers` 提早關閉），不要「修復」它（`CLAUDE.md` 明載）
- playwright — 瀏覽器自動化 MCP（`npx @playwright/mcp@latest`）
  - 設定：`Chapter01/.mcp.json`；HookHub 的 CLAUDE.md 指定用 Playwright MCP 做 UI 驗證截圖

**NotebookLM（離線產出，非執行期整合）:**

- `nlm-chapters/`（章節摘要 source）、`mermaid/artifacts/`（m4a/mp4/pptx/png 產出）為 NotebookLM 生成的靜態檔案，repo 內無呼叫 NotebookLM 的程式碼

## Data Storage

**Databases:**

- 無。三份 HookHub 的資料來源是靜態 JSON mock data：
  - `Chapter02/hookhub/hookhub/src/data/hooks.json`
  - `Chapter10/v1-zealous-jemison/hookhub/src/data/hooks.json`
  - `Chapter10/v2-vigilant-feistel/hookhub/src/data/hooks.json`

**File Storage:**

- Local filesystem only（Chapter03 WAV 音檔、log 檔 `Chapter03/hooks-notification/hook-events.log`、PM2 log 在各 hookhub `logs/`）

**Caching:**

- 無（僅 Next.js 內建的建置快取 `.next/`，已 gitignore）

## Authentication & Identity

**Auth Provider:**

- 無。HookHub 無登入功能、無使用者系統
- 部署鏈認證：SSH ed25519 私鑰（GitHub Secret `VPS_SSH_KEY`）；不設 host fingerprint（`appleboy/ssh-action@v1.0.3` 無 `known_hosts` 參數，靠私鑰認證）

## Monitoring & Observability

**Error Tracking:**

- 無（無 Sentry 等服務）

**Logs:**

- PM2 檔案 log：`out_file`/`error_file` 於各 hookhub `logs/hookhub*-out.log` / `*-err.log`（`ecosystem.config.js` 設定，`log_date_format: "YYYY-MM-DD HH:mm:ss"`）
- Hook 觸發紀錄：`Chapter03/hooks-notification/hook-events.log`（`play_sound.py` 寫入，格式 `YYYY-MM-DD HH:MM:SS | filename.wav`）
- 健康檢查：CI 部署尾段 curl（Ch02 打 `localhost:3001`；v2 打 `localhost:3003/v2` 並驗證 HTTP 200——不可打 `/v2/`，Next.js 會 308 重定向）

## CI/CD & Deployment

**Hosting:**

- Hostinger VPS（187.127.109.145），nginx 反向代理 + PM2 進程管理
- 對外路由：Ch02 → `/`（3001）；Ch10 v1 → `/ch10`（3002，nginx 有尾斜線 proxy_pass 改寫）；Ch10 v2 → `/v2`（3003，`basePath` + 無尾斜線 proxy_pass）
- nginx 設定範本：`Chapter02/hookhub/hookhub/nginx-hookhub.conf`、`Chapter02/hookhub/nginx-hookhub-merged.conf`（合併版含同 VPS 上其他專案的 A2A agent 代理與 Kindle 音訊靜態路徑）
- ⚠️ VPS 上 nginx conf 的手動改動**不在本 repo 版控中**（漂移中；重建參考 `summary-02-sessions/2026-05-26/session4-summary.md`）

**CI Pipeline:**

- GitHub Actions，三條部署線（push main + path filter 觸發）：
  - `.github/workflows/deploy-hookhub.yml` — Ch02（PORT 3001）
  - `.github/workflows/deploy-hookhub-ch10.yml` — Ch10 v1（PORT 3002）
  - `.github/workflows/deploy-hookhub-ch10-v2.yml` — Ch10 v2（PORT 3003）
- 三條線共用 `concurrency: group: vps-deploy`（`cancel-in-progress: false`，排隊不取消）
- VPS 同步策略：v2 用 `git fetch origin main && git reset --hard FETCH_HEAD`（正確）；`deploy-hookhub.yml` 仍用 `git pull --ff-only`（遇未追蹤檔會 abort 的舊寫法）
- 無測試 job——build 成功 + health check 即視為通過

## Environment Configuration

**Required env vars:**

- 應用執行期：無（PM2 注入 `NODE_ENV` / `PORT` / `HOSTNAME`，定義在各 `ecosystem.config.js`，非外部 secret）
- CI/CD（GitHub Secrets）：`VPS_HOST`、`VPS_USER`、`VPS_SSH_KEY`、`VPS_PORT`
- MCP（如要實際啟用）：context7 API key、tavily API key（repo 內均為 `XXXXX` 佔位符）

**Secrets location:**

- GitHub repo Secrets（部署用 4 個）
- repo 內無真實機密；`.env*` / `credentials` 類已在 `.gitignore` 排除

## Webhooks & Callbacks

**Incoming:**

- None（GitHub Actions 的 push 觸發是 GitHub 內建事件，非自建 webhook endpoint）

**Outgoing:**

- None

---

*Integration audit: 2026-07-15*
