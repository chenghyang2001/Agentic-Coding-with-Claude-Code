# Session 15 — 9 站範例互動復習全部完成 + 錄影 + YouTube 公開發布

- 日期：2026-10-03
- 機器：Yama-Desktop（Windows 10 Home，Git Bash）
- 接續自：Session 14（家用機 DESKTOP-6LST1BR，交接文件 `doc/handoff-互動復習-20261002.md`）

## 完成事項

### A. 9 站互動復習（使用者要求從第 1 站重新開始）

- 每站照交接文件 §4 流程：實際讀檔 → 一句話說明 → 拆解 → 與前站對照 → 實測找問題 → 動手試 → AskUserQuestion
- 新增「每站自動語音播報」：沿用 kindle-28 專案的 `say_ui.exe`（tkinter 講稿視窗 + edge-tts），規則寫進根目錄 CLAUDE.md（commit `292c6e4`）
- 9 站實測發現（詳見交接文件 §★.1）：
  1. Ch08：statusline.py 讀檔無 encoding，`PYTHONUTF8=0` 重現 cp950 解碼錯；更正交接文件「Last: error」說法
  2. Ch03 Commands：以「叫模型印原始訊息」實驗證實小寫 `$arguments` 不被替換，Claude Code 在尾端附加 `ARGUMENTS: <參數>`
  3. Ch09 Skills：`smart_commit.sh` 只有未追蹤新檔時回報 No changes 且 exit 0（靜默失敗，實測）；CRLF 工作目錄
  4. Ch07 Agents：實派 code-comedy-carl 審 main.py；mermaid agent 權限過大
  5. Ch03 Hooks：🔴 6 個 hook 在 Claude Code 中全部失效（Windows 以 Git Bash 執行 hook，`%USERPROFILE%` 不展開）→ **已修**改 `$CLAUDE_PROJECT_DIR`，`claude -p` 實測 hook-events.log +14 筆（commit `029f531`、CLAUDE.md 補陷阱 `2179b26`）
  6. Ch01 MCP：20 工具描述 22,426 字元 ≈ 5.6k tokens；HTTP server + FastMCP Client 實呼叫成功；新版 MCP 工具延遲載入
  7. Ch04：`.mcp.json.tavily` 語法合法但 tavily 在 mcpServers 外 → 0 個 server；`--mcp-config` 需 `--strict-mcp-config`
  8. Ch02：build 通過 + headless Chrome 截圖；實跑 `/infinite specs/section.spec.md <out> 2`，2 子代理人平行、約 67 秒、tsc --strict 0 錯
  9. Ch10：🔴 `/ch10` 對外 404（VPS nginx 無 `/ch10` location，v1 在 127.0.0.1:3002 正常）；🔴 3001 埠對外開放（Ch02 未設 HOSTNAME）— **未修**

### B. 錄影（使用者需求：每站講稿用 say_ui 播放並錄視窗）

- **使用者決定**：只錄 say_ui 播放器視窗、音軌直接用播放器產生的 mp3、產出 9 支單站＋1 支合輯（共 10 支）、存 `%USERPROFILE%\Downloads\agentic-coding-review-video\` 不進 git
- 9 站講稿 st01~09.txt 從對話原文重建
- `record_stations.py` 走 code-writer → code-qa → code-reviewer（各 2 輪，757 行）：DWM 可見邊界擷取、視窗固定置頂、mp3 穩定 2.5 秒 + 字數合理性檢查、.part 檔、重試、缺站不串接
- 一次錄完 9 站無重試；每站 h264+aac 1782×862；完整版 20:23.1（1223.1 秒）；9 站片尾格人工檢查皆為正確講稿畫面

### C. YouTube 公開發布

- `upload_youtube.py` 走三 agent（各 2 輪，687 行）：頻道 ID 雙重確認、狀態檔冪等、雲端同標題比對防重複、lock 檔、`--confirm-public` 必要旗標
- 頻道 ChengHsien Yang（UCdq7Mig9UZNjtpj1KJRsJ6A），10 支皆 public；頻道影片數 193 → 202（+9，st01 為 QA 時先傳），無重複
- 播放清單 <https://www.youtube.com/playlist?list=PLQJW2IsOTVrk> ；網址已寄 Gmail（msg 1a10101116559b60）+ Telegram（message_id 968）

### D. 文件

- 交接文件新增 §★（實測發現表、影片網址、下一步），§0/§5 標為 9 站完成（commit `a5162ad`）

## 關鍵技術筆記

- Claude Code 在 Windows 以 `/usr/bin/bash` 執行 hook；失敗只記 debug log（`~/.claude/debug/*.txt`），不中斷對話 → hook 驗證要看 log 證據
- 驗證 `$ARGUMENTS` 等 harness 行為：寫一個「把收到的整則訊息原樣包在 <<< >>> 回傳」的測試 command，用 `claude -p` 執行
- Git Bash 呼叫 taskkill/tasklist 必加 `MSYS_NO_PATHCONV=1`；Windows 版 git/ffmpeg/python 吃不到 `/c/...`、`/tmp/...` 路徑，用 `cygpath -w/-m`
- gdigrab 用 `GetWindowRect` 會含 Win10 隱形陰影邊框 → 改 `DwmGetWindowAttribute(DWMWA_EXTENDED_FRAME_BOUNDS)`
- YouTube API：未審核專案上傳本次未被鎖 private；10 支一次傳完未撞配額；新建播放清單立即 `playlistItems` 會 404 playlistNotFound（最終一致性），重跑即可
- `--mcp-config` 是附加，`--strict-mcp-config` 才只用指定設定

## 產出檔案

| 檔案 | 說明 | commit |
| --- | --- | --- |
| `CLAUDE.md` | 新增互動復習每站語音播報規則；Hook 在 Git Bash 執行的陷阱 | `292c6e4`、`2179b26` |
| `Chapter03/hooks-notification/.claude/settings.json` | 6 條 hook 改 `$CLAUDE_PROJECT_DIR` | `029f531` |
| `doc/handoff-互動復習-20261002.md` | §★ 9 站完成、實測發現、影片網址 | `a5162ad` |
| `summary-02-sessions/2026-10-03/session15-summary.md` | 本檔 | 收工 commit |
| `%USERPROFILE%\Downloads\agentic-coding-review-video\`（不進 git） | 10 支 mp4、audio/、tools/（record_stations.py、upload_youtube.py、st01~09.txt）、youtube_meta.json、youtube_upload_state.json | — |

## HANDOFF（下次 session 優先處理）

### 立即行動

- [ ] 修 VPS（正式環境，需使用者同意）：nginx `sites-enabled/hookhub` 補 `/ch10` 路由或下線 v1（v1 無 basePath，資產 `/_next/` 會打到 Ch02）；`Chapter02/hookhub/hookhub/ecosystem.config.js` 加 `HOSTNAME=127.0.0.1` 關閉 3001 對外
- [ ] 更正根目錄 CLAUDE.md 兩處與實測不符：`.mcp.json.tavily`（語法合法、0 server）、Ch10 v1 `/ch10` 現況
- [ ] 部署 health check 改測對外網址（目前只測本機 port，`/ch10` 壞了仍綠燈）

### 進行中（需接續）

- 9 站復習已全部完成；上游範例的已知問題（statusline encoding、smart_commit 未追蹤檔、infinite 參數、重複 model 鍵等）皆**未修**，待決定是否另建 `-修正版` 對照檔（上游原檔依規則不動）
- `Chapter10/{zealous-jemison,vigilant-feistel}/` 未追蹤舊目錄（只剩 .next / node_modules）可刪

### 注意事項

- 影片已公開；第 9 站與完整版旁白提到 3001 埠對外開放（使用者選擇照常公開）→ 修 VPS 優先度提高
- YouTube 上傳工具在 `~/Downloads/agentic-coding-review-video/tools/`，狀態檔在同層；重跑 `upload_youtube.py --confirm-public` 是冪等的（不會重傳）
- 這台 Yama-Desktop 全域設 `PYTHONUTF8=1`，部分編碼 bug 在這台不會重現，測試要刻意 `PYTHONUTF8=0`
- Hook 改完要用 `claude -p` + 檢查 debug log 或 side-effect 檔驗證，不能只直接跑腳本
