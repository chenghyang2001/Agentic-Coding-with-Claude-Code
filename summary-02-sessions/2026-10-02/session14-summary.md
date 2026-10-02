# Session 14 — CLAUDE.md 稽核更新 + 三條部署 workflow 修正 + 範例互動復習起步

- **日期**：2026-10-02
- **機器**：家用機 `DESKTOP-6LST1BR`（Windows 11 Pro，Git Bash）
- **Commits**：`0bdeb33`（workflow + CLAUDE.md）、`b228bb8`（交接文件）

---

## 完成事項

### A. CLAUDE.md 管理工具

- 盤點 user skills：沒有專門「更新 CLAUDE.md」的 skill；找到官方 plugin `claude-md-management`（在 marketplace 目錄但未安裝）
- 以 `claude plugin install claude-md-management@claude-plugins-official` 安裝（user scope，v1.0.0，enabled），`/reload-plugins` 後可用
  - Skill `claude-md-management:claude-md-improver`、Command `/revise-claude-md`

### B. 根目錄 CLAUDE.md 稽核與更新（commit `0bdeb33`）

- 稽核分數 77/100（B），Currency 僅 7/15：3 處描述與實際不符
  1. `outputFileTracingRoot` 只有 Ch02 `next.config.ts` 有（原寫「皆含」）
  2. `HOSTNAME=127.0.0.1` + 字串 PORT 只有 Ch10 v1/v2；Ch02 沒有（綁 0.0.0.0）
  3. 「三條線共用 concurrency + reset --hard」原本只對 Ch10 成立
- 章節內 20 份 CLAUDE.md / `-中文` 為上游範例，依規則不動
- 新增：`paths:` 過濾、concurrency 排隊取消語意與補跑時機、`pm2 describe`、VPS 共用 clone 禁止手改追蹤檔、fetch/reset 不可用 `&&` 串接、`Chapter03/custom commands/` 含空格、`.planning/codebase/` 與 `doc/handoff-*.md`

### C. 三條 VPS 部署 workflow 修正（三 agent 流程跑兩輪，commit `0bdeb33`）

- 第一輪（Ch02 對齊 Ch10）：加 `concurrency: vps-deploy`、`git pull --ff-only` → fetch + `reset --hard FETCH_HEAD`、timeout 10m→15m、`pm2 list | grep hookhub` → `pm2 describe hookhub`（子字串誤中 hookhub-ch10/v2）
  - QA PASS；reviewer CHANGES_REQUESTED（2 項 must-fix）
- 第二輪（三檔一起）：`cd && fetch && reset` 拆三行（QA 本機實證 `&&` 串列中間失敗不觸發 `set -e`）、加 `workflow_dispatch`、改正 concurrency 註解、job 層 `timeout-minutes: 20`、刪除錯誤的 commit `0b0e365` 引用
  - QA PASS（3 檔 × 3 case）；reviewer APPROVED
- 部署結果：Ch02 success、v2 success、**v1 被 concurrency cancelled**（正是修的語意，實際重現）→ 等排隊清空後 `gh workflow run deploy-hookhub-ch10.yml` 補跑 → success（run 36971370037）

### D. 範例程式互動式復習（9 站，由淺入深）

- 第 1 站 Ch08 Output Styles：講解 output style = 取代 system prompt 回應風格段落；實跑 `statusline.py`（輸出 `Style: yaml-concise Last Prompt: …`）；深入 `numbered-table-png`（152 行，模板佔 6 成、點名 puppeteer MCP、失敗退路）
- 第 2 站 Ch03 Custom Commands：講解 `commit-code.md` / `dad-joke.md`，指出小寫 `$arguments`、無 frontmatter、未用 `` !`git diff` ``、錯字，且 `~/.claude/commands/` 是逐字複製；展示改良版（未寫入）
- 使用者在第 2 站選擇題時按「想先釐清」後決定中斷，改到另一台 PC 接續

### E. 跨 PC 交接（commit `b228bb8`）

- 撰寫 `doc/handoff-互動復習-20261002.md`（20 KB）：從零 clone、工具版本/安裝、`~/.claude` 同步、plugin 重裝、接續提示詞、9 站進度、已講內容、後續各站重點、FAQ
- 寄 Gmail（message id `1a0fb43c35d6a66c`，完整純文字版）+ Telegram（Notify_Server，chat 7292664350，回報「發送成功」）

---

## 關鍵技術筆記

- **bash `set -e` 盲點**：`a && b && c` 中非最後一個指令失敗不觸發 `set -e`（在 `if` 分支內同樣）→ 部署腳本關鍵步驟必須分行寫
- **GitHub Actions concurrency**：同 group 最多 1 執行中 + 1 排隊；第三個進來會取消排隊中的；`cancel-in-progress: false` 只保護執行中的。補跑要等 group 內沒有 queued/pending，否則反過來取消別條
- 一次 push 改到多個 workflow 檔 = 多條線同時觸發；同一次 push 拆多 commit 無效
- `gh run list --commit <短 SHA>` 回傳空 → 用 `--limit N` 再比對 `headSha`
- `pm2 describe <name>` 精確比對；`pm2 list | grep` 會子字串誤中
- Git Bash `mktemp` 的 `/tmp/...` 路徑 Windows Python 讀不到 → `cygpath -m`
- `statusline.py` 讀 transcript 未指定 encoding → cp950 中文顯示 `Last: error`（未修）
- `git -C ~/.claude` 在本機 Git Bash 失敗（`~` 未展開）→ 用 `"$HOME/.claude"`
- Plugin 安裝不隨 `~/.claude` git 同步，每台機器需各自 `claude plugin install`

## 產出檔案

| 檔案 | 動作 | Commit |
| --- | --- | --- |
| `CLAUDE.md` | 修改（+ 修正 3 處、補部署陷阱與目錄說明） | `0bdeb33` |
| `.github/workflows/deploy-hookhub.yml` | 修改（對齊 Ch10 + 拆行 + dispatch + timeout） | `0bdeb33` |
| `.github/workflows/deploy-hookhub-ch10.yml` | 修改（拆行 + dispatch + timeout + 註解） | `0bdeb33` |
| `.github/workflows/deploy-hookhub-ch10-v2.yml` | 修改（拆行 + dispatch + 註解） | `0bdeb33` |
| `doc/handoff-互動復習-20261002.md` | 新增（跨 PC 交接） | `b228bb8` |
| `summary-02-sessions/2026-10-02/session14-summary.md` | 新增（本檔） | 本次收工 commit |

## 重要決定

- 使用者明確要求：**reviewer 通過就直接 commit + push，不必再問**
- 章節內 CLAUDE.md 不稽核不改（上游範例）
- 刻意未做：健康檢查一致化、reusable workflow 重構、Ch02 PM2 `HOSTNAME`、安裝 actionlint/yamllint

---

## HANDOFF（下次 session 優先處理）

### 立即行動

- [ ] 在另一台 PC：clone repo → `git -C "$HOME/.claude" pull` → `claude plugin install claude-md-management@claude-plugins-official`，再貼 `doc/handoff-互動復習-20261002.md` §2 的接續提示詞
- [ ] 接續第 2 站：先問使用者上次想釐清什麼，再重給四選一（下一站 Ch09 Skills／升級全域 command／驗證小寫 `$arguments`／暫停）
- [ ] 進入第 3 站：先實讀 `Chapter09/.claude/skills/git-pushing/SKILL.MD` 與 `scripts/smart_commit.sh`，對照第 2 站 commit-code 講解 skill 與 command 差異

### 進行中（需接續）

- 9 站互動復習：第 1 站完成、第 2 站講解完待選擇；第 3–9 站未開始
- 改良版 `commit-code.md`（`$ARGUMENTS` + frontmatter + `` !`git diff HEAD` `` + `allowed-tools`）僅展示，尚未寫入 `~/.claude/commands/`

### 注意事項

- 每站必須先實際讀檔再講，交接文件只是索引
- 改程式檔 > 3 行走 code-writer → code-qa →（視情況）code-reviewer；`.md` 可直改；章節上游原檔不動
- 一次 push 改到多個 workflow 會觸發多條部署線，必有一條被 cancelled → 等排隊清空再 `gh workflow run` 補跑
- `statusline.py` 中文 encoding bug 尚未修（使用者未選修）
