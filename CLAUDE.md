# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 專案概述

這是 Packt 書籍《Agentic Coding with Claude Code》（Eden Marco 著）官方範例 repo 的演練層：上游提供各章節範例（Chapter01~10），本 repo 在其上疊加了三類自有產出——

1. **繁體中文化**：README / CLAUDE.md / agents / commands / skills / output-styles / specs 的 `-中文` 翻譯版
2. **VPS 實戰部署**：三個 HookHub 版本經 GitHub Actions 部署到 Hostinger VPS（187.127.109.145）
3. **知識庫產出**：`nlm-chapters/`（NotebookLM 章節摘要）、`mermaid/`（全書圖表）、`summary-02-sessions/`（session 工作紀錄）

Chapter05/06 上游無程式碼資料夾，本 repo 也沒有。

## 常用指令

### HookHub（Next.js 15，三份同構副本）

```bash
cd Chapter02/hookhub/hookhub    # 或 Chapter10/v1-zealous-jemison/hookhub、Chapter10/v2-vigilant-feistel/hookhub
npm install
npm run dev      # 開發伺服器
npm run build    # 建置（部署前必過）
npm run lint     # ESLint
```

無自動化測試；驗證方式是 `npm run build` + 瀏覽器/Puppeteer 截圖。

### MCP 教學專案（Chapter01、Chapter04，uv 管理）

```bash
cd Chapter01     # 或 Chapter04/context-engineering-mcp
uv sync
uv run main.py
```

### Hook 音效系統（Chapter03）

```bash
cd Chapter03/hooks-notification
uv sync                              # 首次執行，安裝 pygame
uv run play_sound.py <檔名>.wav      # 播放單一音效
```

Hook 綁定在 `Chapter03/hooks-notification/.claude/settings.json`（6 事件 × 各 2 WAV，英文+中文音）。`ch03_demo_all_hooks_order.bat` 需在原生 CMD 雙擊執行——Git Bash 下 `cmd //c` 會因 MSYS2 路徑轉換導致中文亂碼。

## 高層架構

### 三個 HookHub 的部署差異（程式碼同構，差異全在部署層）

| 版本 | 目錄 | VPS PORT | 對外路徑 | 路由策略 |
| ------ | ------ | ---------- | --------- | --------- |
| Ch02 | `Chapter02/hookhub/hookhub` | 3001 | `/` | nginx 直代理 |
| Ch10 v1 | `Chapter10/v1-zealous-jemison/hookhub` | 3002 | `/ch10` | 空 next.config，靠 nginx **有尾斜線** proxy_pass 改寫路徑 |
| Ch10 v2 | `Chapter10/v2-vigilant-feistel/hookhub` | 3003 | `/v2` | `next.config.ts` 設 `basePath: "/v2"`，nginx **無尾斜線** proxy_pass 保留 URI |

關鍵陷阱：

- nginx `proxy_pass` 尾斜線 = 路徑改寫；無尾斜線 = 原封轉發。搭配 Next.js `basePath` 時必須用無尾斜線。
- Next.js 會把 `/v2/`（尾斜線）308 重定向到 `/v2`，health check 必須打不含尾斜線的路徑。
- `next.config.ts` 皆含 `outputFileTracingRoot: __dirname`——因為 `%USERPROFILE%\package-lock.json` 存在會讓 Next.js 誤判 workspace root，影響 Tailwind PostCSS 掃描。
- PM2 `ecosystem.config.js` 必須設 `HOSTNAME=127.0.0.1`（loopback only，由 nginx 對外代理）。

### CI/CD（.github/workflows/，三條部署線）

- `deploy-hookhub.yml` / `deploy-hookhub-ch10.yml` / `deploy-hookhub-ch10-v2.yml`，push main 觸發，`appleboy/ssh-action@v1.0.3`
- 三條線共用 `concurrency: group: vps-deploy` 防止並發部署互撞
- VPS 端同步策略：`git fetch origin main && git reset --hard FETCH_HEAD`（VPS 是乾淨鏡像；**不要**用 `git pull --ff-only`，有未追蹤檔會 abort）
- `appleboy/ssh-action` 無 `known_hosts` 參數；不設 fingerprint，靠私鑰認證
- VPS 上的 nginx conf 手動改動不在本 repo 版控中（重建時參考 `summary-02-sessions/2026-05-26/session4-summary.md`）

### 各章節 `.claude/` 配置的角色

各章節示範 Claude Code 不同擴充機制，其 `.claude/` 只在**從該目錄啟動 Claude Code** 時生效：

- Chapter02 `hookhub/.claude/commands/`：infinite 無限代理迴圈；`hookhub2/.claude/agents/`：5-agent 團隊協作
- Chapter03：custom commands + Hooks 音效
- Chapter04：`.mcp.json`（context7）；`CLAUDE.md` 示範互動偏好注入。注意 `.mcp.json.tavily` 上游 JSON 本來就是損壞的（僅示範用，不要「修復」它）
- Chapter07 agents、Chapter08 output-styles + `statusline.py`、Chapter09 skills（git-pushing）

## 中文化翻譯規則（本 repo 確立的慣例）

翻譯任何 `.claude/` 設定檔或文件時：

- Frontmatter `name` / `model` / `tools` / `color` / `version` → 保留英文（程式識別碼）；`description` → 翻譯
- Body 說明文字、觸發詞 → 翻譯；程式碼區塊內的 bash 指令 → 保留原文；程式碼區塊內的說明字串 → 翻譯
- 檔名／資料夾命名：原名 + `-中文`（如 `prd-writer-中文.md`、`specs-中文/`）。舊 `-zh` 後綴已全 repo 清零，不要再引入
- 上游英文原檔保留不動，翻譯是並存的新檔（`translate-zh` skill 的行為）

## 開發注意事項

- **查中文檔名**必加 `git -c core.quotepath=false`，否則非 ASCII 路徑輸出為八進位跳脫，`grep 中文` 會空手而回
- 改檔名用 `git mv` 保留 rename 歷史
- `bash.exe.stackdump` 等當機殘留檔不入版控（見全域 junk-files 規則）
- Session 紀錄寫入 `summary-02-sessions/YYYY-MM-DD/sessionN-summary.md`；專案樹文件在 `doc/project-tree*.md`（由 `/project-tree` skill 生成）
- Commit message 繁體中文「動詞 + 簡短說明」，commit 後直接 push
