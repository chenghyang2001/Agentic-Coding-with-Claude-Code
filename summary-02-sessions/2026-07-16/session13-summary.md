# Session 13 Summary — 2026-07-16

**機器**：家用機（Yama-Desktop）
**主題**：全 repo 演練紀錄盤點 + 章節演練復習交接文件（家用機 → 公司機 B00332）+ 三管道通知

---

## 完成事項

### 1. 過去 12 個 session 演練紀錄全面盤點

- 使用者（語音輸入）想找回之前做過的章節演練，經 AskUserQuestion 確認要「全部總覽」
- 讀完 `summary-02-sessions/` 全部 12 份 summary（2026-05-26 ~ 2026-06-12，共 1107 行）
- 整理出按章節分類的演練地圖：Ch02（HookHub+CI/CD，S5/S6）、Ch03（Hook 音效，S3/S7/S8 三個 session）、Ch04（MCP 探索，S10）、Ch07/08/09（中文化，S5/S10）、Ch10（兩版部署對照，S1/S4）、基礎設施類（S2/S11/S12）

### 2. 交接文件建立（commit `08dae47`）

- 新增 `doc/handoff-演練復習-20260716.md`（156 行），5 節結構：
  1. 公司機前置動作（repo + `~/.claude` 雙 git pull）
  2. 各章演練總覽（sample code 路徑 + 重點踩坑筆記逐章列出）
  3. 懸置待辦 3 項（S6 起沿用：ch03 bat 原生 CMD 驗證 / VPS nginx conf 拉回 / Ch10 v1 健康檢查）
  4. 公司機接續提示詞（複製貼上即可啟動逐章復習流程）
  5. 參考檔案索引（12 份 summary、project-tree 快照、入門指南、NLM 素材）
- 建議復習順序按書籍難度 01→09：Ch08 → Ch03 → Ch09 → Ch04 → Ch07 → Ch02 → Ch10

### 3. 三管道通知全數送達

- **Gmail**：`mcp__gmail__send_email` 寄到 <chenghyang2001@gmail.com>（message ID `19f67abb6e8563bd`），含完整接續提示詞
- **Telegram**：Bot API `sendMessage`（HTTP 200），用 `TELEGRAM_BOT_TOKEN` + `TELEGRAM_CHAT_ID` 環境變數
- **LINE**：Messaging API push（HTTP 200），用 `LINE_CHANNEL_ACCESS_TOKEN` + `LINE_USER_ID` 環境變數
- CJK 內文走 Python urllib（`PYTHONUTF8=1` heredoc 直跑，不落地 .py 檔），避開 Git Bash curl 的 cp950 編碼問題

### 4. task-handoff 任務池嘗試（跳過）

- 想順手推任務給 pc2（公司機），但家用機缺 `TASK_HANDOFF_URL` / `TASK_HANDOFF_API_KEY` / `TASK_HANDOFF_PC_ID` 三個環境變數，腳本 fail-fast
- 不影響交接：文件已 push GitHub，公司機 `git pull` 即可取得

---

## 關鍵技術筆記

- **家用機（Yama-Desktop）task-handoff 未配置**：需要 `setx TASK_HANDOFF_URL "http://187.127.109.145/task-handoff"` + API key + `TASK_HANDOFF_PC_ID "pc1"` 才能用跨 PC 任務池；API key 需從 VPS 或公司機取得
- **通知三件套環境變數在家用機齊全**：`TELEGRAM_BOT_TOKEN` / `TELEGRAM_CHAT_ID` / `LINE_CHANNEL_ACCESS_TOKEN` / `LINE_USER_ID` 都在，Python urllib 直發即可，不需 n8n 中轉
- **跨 PC 交接的標準組合**：交接 .md 進 repo（git push）+ Gmail 存完整提示詞 + Telegram/LINE 短訊提醒——三層備援，任一管道漏看都能接上

---

## 產出檔案

| 檔案 | 動作 | Commit |
|------|------|--------|
| `doc/handoff-演練復習-20260716.md` | 新增（156 行交接文件） | `08dae47` |
| `summary-02-sessions/2026-07-16/session13-summary.md` | 新增（本檔） | 本次收工 commit |

---

## HANDOFF（下次 session 優先處理）

### 立即行動

- [ ] **（公司機 B00332）執行章節演練復習**：`git pull` 後讀 `doc/handoff-演練復習-20260716.md`，用第 4 節提示詞啟動逐章復習（Gmail 信件也有完整提示詞）
- [ ] **復習途中順手處理 3 個懸置待辦**：ch03 bat 原生 CMD 驗證 / VPS nginx conf 拉回 commit / Ch10 v1 `HOSTNAME=127.0.0.1` 確認
- [ ] **（選配）家用機補 task-handoff 環境變數**：從公司機或 VPS 取 API key 後 `setx`，之後就能直接跨 PC 派工

### 進行中（需接續）

- 章節演練復習尚未開始——本 session 只做「盤點 + 交接」，實際復習在公司機進行
- 交接文件、Gmail、Telegram、LINE 四路都已送達，公司機開工零依賴本機

### 注意事項

- 交接文件的建議復習順序是按書籍難度（01→09），不是章節編號順序
- `ch03_demo_all_hooks_order.bat` 必須原生 CMD 雙擊（Git Bash 會 MSYS2 中文亂碼）——復習 Ch03 時注意
- 公司機記得同步 `~/.claude`（`git pull`），否則 project-tree 等 user-level skill 是舊版
