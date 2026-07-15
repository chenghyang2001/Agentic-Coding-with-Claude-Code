# Codebase Concerns

**Analysis Date:** 2026-07-15

> 情境備註：本 repo 是 Packt 書籍範例 repo 的演練層（教學示範 + 中文化 + VPS 部署實戰），部分「異味」是刻意的教材設計。已知的刻意項目**不列為待修**：`Chapter01/.mcp.json.tavily` 與 Chapter04 相關的損壞 JSON 是上游刻意示範（勿修復）；`verbose_mcp_server.py` 的冗長 docstring 是反面教材。

## Tech Debt

**三份 HookHub 部署線品質漂移（最舊的 Ch02 缺三個已知修正）:**

- Issue: `deploy-hookhub-ch10.yml` / `deploy-hookhub-ch10-v2.yml` 已修正的三個踩坑，`deploy-hookhub.yml`（Ch02，最早寫的）都還停留在舊版：
  1. 仍用 `git pull --ff-only`（VPS 有未追蹤檔會 abort，此坑已記錄於 commit 0b0e365，v1/v2 已改 `git fetch + reset --hard FETCH_HEAD`）
  2. **完全沒有 `concurrency: group: vps-deploy` 區塊**——根目錄 `CLAUDE.md` 宣稱「三條線共用 concurrency group」與實際不符；Ch02 部署可與 v1/v2 並發，對同一 VPS repo 做 `git pull` 時可能與另一條線的 `git reset --hard` 互撞
  3. 用 `pm2 list | grep -q "hookhub"` 判斷 app 是否存在——`hookhub-ch10`、`hookhub-v2` 都含 `hookhub` 子字串，只要 v1/v2 任一在跑，即使 Ch02 的 `hookhub` app 從未啟動也會走 `pm2 reload` 分支（reload 不存在的 app 會失敗）。v1/v2 已改用 `pm2 describe`
- Files: `.github/workflows/deploy-hookhub.yml`（對照 `.github/workflows/deploy-hookhub-ch10-v2.yml` 的正確寫法）
- Impact: Ch02 部署線在 VPS 有未追蹤檔或並發部署時會失敗或互撞；文件與程式碼漂移誤導後續維護
- Fix approach: 以 `deploy-hookhub-ch10-v2.yml` 為範本回填三個修正（fetch+reset、concurrency、pm2 describe、明確 HTTP 200 health check、`timeout-minutes`）

**三份近似 HookHub 副本無單一事實來源:**

- Issue: `Chapter02/hookhub/hookhub`、`Chapter10/v1-zealous-jemison/hookhub`、`Chapter10/v2-vigilant-feistel/hookhub` 架構同構但 src 已各自漂移（Ch02 多 `Footer.tsx`、`heros/` × 10、`sections/`；三份 `HookCard.tsx` / `page.tsx` / `hooks.json` 內容各異），Next.js 版本也分裂：Ch02 `^15.5.9`、v1/v2 釘死 `15.4.6`
- Files: `Chapter02/hookhub/hookhub/package.json`、`Chapter10/v1-zealous-jemison/hookhub/package.json`、`Chapter10/v2-vigilant-feistel/hookhub/package.json`
- Impact: 修 bug 或升級依賴要改三處；教材上這是「刻意的兩種部署策略對照」，但版本分裂會讓「程式碼同構、差異全在部署層」的教學前提逐漸失真
- Fix approach: 接受三副本為教材設計，但至少對齊 Next.js 版本；任何跨副本修改需三處同步並在 commit message 註明

**Runtime log 進了版控:**

- Issue: `hook-events.log` 是 Hook 每次觸發追加寫入的執行期紀錄（`play_sound.py:29-34` 持續 append），卻被 git 追蹤（目前 40 行）
- Files: `Chapter03/hooks-notification/hook-events.log`、`Chapter03/hooks-notification/play_sound.py`
- Impact: 只要在 Chapter03 目錄啟動 Claude Code 觸發 Hook，git status 就變 dirty；跨機器（B00332/user）同步時必然衝突
- Fix approach: `git rm --cached Chapter03/hooks-notification/hook-events.log` + 在 `.gitignore` 加 `hook-events.log`；若要保留範例，另存一份 `hook-events.sample.log`

**編譯產物 .pyc 被追蹤（.gitignore 規則生效前就 commit）:**

- Issue: `__pycache__/` 已在 `.gitignore:23`，但這個 .pyc 在規則加入前就被追蹤，gitignore 對已追蹤檔無效
- Files: `Chapter04/context-engineering-mcp/__pycache__/verbose_mcp_server.cpython-311.pyc`
- Impact: 無功能影響，但污染 repo、且 Python 版本不同的機器上會與原始碼不一致
- Fix approach: `git rm --cached -r Chapter04/context-engineering-mcp/__pycache__/`

**大型媒體檔直接入 git（repo 追蹤內容約 127 MB）:**

- Issue: NotebookLM 產出的影音直接 commit：`mermaid/artifacts/agentic-coding-video.mp4`（57 MB，已超過 GitHub 50 MB 警告閾值）、`agentic-coding-audio.m4a`（35 MB）、兩份 pptx（各 ~9.5 MB）；`.git` 目錄已達 ~113 MB
- Files: `mermaid/artifacts/`、`nlm-chapters/Agentic_Coding_Blueprint.pptx`、`png/agentic-coding-slides.pptx`
- Impact: clone 變慢（VPS 首次部署也要拉完整 .git）；媒體一旦 commit 即永久留在歷史，未來只會膨脹
- Fix approach: 新媒體改放 Google Drive（rclone）只 commit 連結；若要瘦身歷史需 `git filter-repo`（破壞性，需所有 clone 重拉，教學 repo 可先不做）

**同一張圖重複 commit 3–4 份:**

- Issue: 兩張 infographic（各 ~850 KB）同內容存在於 `png/`、`mermaid/png/`、`mermaid/artifacts/` 三處 + `nlm-chapters/` 的 jpg 版；`banner.png`（272 KB）存在於 `png/` 與 `Chapter02/hookhub/static/` 兩處；`flowchart-book-summary-*-5x.png` 也在 `png/` 與 `Chapter08/mermaid/png/` 重複
- Files: `png/`、`mermaid/png/`、`mermaid/artifacts/`、`nlm-chapters/`、`Chapter08/mermaid/png/`
- Impact: 每份重複 ~0.8–1.7 MB × 多處，repo 無謂膨脹；改圖時容易只改一處造成不一致
- Fix approach: 選定單一正典目錄（建議 `mermaid/png/` 放渲染輸出、`png/` 移除），其餘刪除，文件內連結改指正典路徑

**產出文件內含硬編碼使用者路徑:**

- Issue: `doc/project-tree-*.md` 的 header 寫入 `C:\Users\B00332\workspace\...` 掃描目標絕對路徑（12 份中 8 份命中）；`Chapter02/hookhub/hookhub/next.config.ts:5` 註解也含 `C:\Users\B00332\`。違反全域 no-hardcoded-paths 規則（雖然只是文件/註解，不影響執行）
- Files: `doc/project-tree-Chapter01.md:3` 等 8 份、`Chapter02/hookhub/hookhub/next.config.ts:5`
- Impact: 洩漏機器使用者名稱；project-tree skill 每次生成都會再引入
- Fix approach: 修 `~/.claude/skills/project-tree/` 的輸出模板改用 `%USERPROFILE%` 或 repo 相對路徑；既有文件下次重新生成時自然更正

## Known Bugs

**statusline.py 讀 transcript 未指定 encoding（Windows cp950 陷阱）:**

- Symptoms: 中文 prompt 寫入 transcript 後，status line 可能拋 `UnicodeDecodeError` 或顯示亂碼
- Files: `Chapter08/statusline.py:12`（`open(transcript_path, 'r')` 無 `encoding='utf-8'`）
- Trigger: 在系統預設 cp950 的 Windows 機器上，transcript 含非 ASCII 字元時
- Workaround: 執行環境設 `PYTHONUTF8=1`；正解是補 `encoding='utf-8'`（違反本 repo 全域 code-quality 原則 7a）

**play_sound.py 的 pygame.mixer.init() 在 try 區塊外:**

- Symptoms: 無音訊裝置（如 RDP/headless）時 `pygame.error` 未被捕捉直接 traceback，Hook 指令以非零碼結束
- Files: `Chapter03/hooks-notification/play_sound.py:9`
- Trigger: 音訊裝置不可用的機器上觸發任一 Hook
- Workaround: 無；修法是把 `mixer.init()` 移入 try/except

**deploy-hookhub.yml 的 pm2 存在性判斷子字串誤命中:**

- Symptoms: Ch02 的 `hookhub` app 不存在但 `hookhub-ch10`/`hookhub-v2` 在跑時，`pm2 list | grep -q "hookhub"` 為真 → 走 `pm2 reload` 分支 → reload 不存在的 app 失敗
- Files: `.github/workflows/deploy-hookhub.yml`（Step 4）
- Trigger: VPS 重建後先部署 Ch10 再部署 Ch02 的順序
- Workaround: 手動先 `pm2 start`；正解同 v2 改 `pm2 describe hookhub`

## Security Considerations

**Ch02 HookHub 未綁 loopback，port 3001 對外裸露:**

- Risk: `Chapter02/hookhub/hookhub/ecosystem.config.js` 的 `env_production` **缺 `HOSTNAME: "127.0.0.1"`**（v1/v2 都有，且 v1/v2 的設定註解明言不設會「監聽 0.0.0.0、繞過 nginx」）。Next.js 預設監聽所有介面，外部可直接打 `187.127.109.145:3001` 繞過 nginx
- Files: `Chapter02/hookhub/hookhub/ecosystem.config.js`（對照 `Chapter10/v2-vigilant-feistel/hookhub/ecosystem.config.js` 的正確寫法）
- Current mitigation: 依 VPS 防火牆設定而定（未在 repo 版控中，無法確認）
- Recommendations: 補 `HOSTNAME: "127.0.0.1"`（同時把 `PORT: 3001` 改字串型別與 v1/v2 對齊）；VPS 端確認 ufw/iptables 只開 80/443/SSH

**SSH 部署跳過 host key 驗證（已知且有意識的決策）:**

- Risk: 三條 workflow 的 `appleboy/ssh-action@v1.0.3` 都不設 `fingerprint`，首連即信任，理論上可被 MITM 竊取部署階段流量（私鑰本身不會外洩，但 script 內容與 repo 位置會）
- Files: `.github/workflows/deploy-hookhub.yml`、`deploy-hookhub-ch10.yml`、`deploy-hookhub-ch10-v2.yml`
- Current mitigation: 私鑰認證 + GitHub Secrets（`VPS_HOST`/`VPS_USER`/`VPS_SSH_KEY`/`VPS_PORT`）；決策原因已寫在 workflow 註解（SHA256 fingerprint 格式在此 action 實測不穩定）
- Recommendations: 維持現狀可接受（個人教學 VPS）；若要收緊，改用 `fingerprint` 或在 script 前手動寫入 known_hosts

**VPS 公網 IP 散佈於文件:**

- Risk: `187.127.109.145` 出現在 `CLAUDE.md`、多份 summary 與 README 中，配合 repo 公開（public repo），攻擊面資訊完整（IP + port 配置 + nginx 路由 + PM2 app 名）
- Files: `CLAUDE.md:10`、`summary-02-sessions/**`、各 `DEPLOYMENT.md`
- Current mitigation: 無敏感憑證外洩（掃描確認 `.mcp.json.tavily` 的 API key 是 `XXXXX` 佔位符；無 `.env` 被追蹤）
- Recommendations: 接受現狀（教學展示用途）；確保 VPS SSH 只用金鑰登入、fail2ban 開啟

## Performance Bottlenecks

**Hook 音效在每次工具呼叫都串行播放兩段 WAV:**

- Problem: `PreToolUse`/`PostToolUse` matcher 為空字串（萬用），每次工具呼叫觸發兩次 `uv run play_sound.py`（英文音 + 中文音），每次都冷啟動 Python + pygame + 等音檔播完才返回（`play_sound.py:23-24` busy-wait）
- Files: `Chapter03/hooks-notification/.claude/settings.json`、`Chapter03/hooks-notification/play_sound.py`
- Cause: Hook 是同步阻塞的；一次工具呼叫的音效開銷約 2-4 秒 × 2 段
- Improvement path: 教學示範可接受；若日常使用，matcher 縮小到特定工具、或改單一短音效、或播放改非阻塞（`sound.play()` 後不等待）

**VPS 部署每次全量 `npm ci` + build:**

- Problem: 低規 VPS 上 build 實測 8-10 分鐘（workflow 註解自述），三條線排隊時尾端等待可達 30 分鐘
- Files: `.github/workflows/deploy-hookhub-ch10-v2.yml`（Step 3）
- Cause: 無 build cache；`npm ci` 每次刪除 node_modules 重裝
- Improvement path: 教學規模可接受；要加速可在 GitHub Runner build 後 rsync `.next` 到 VPS，或 VPS 端保留 npm cache

## Fragile Areas

**Chapter03 Hook 設定綁死 repo 位置與 shell 環境:**

- Files: `Chapter03/hooks-notification/.claude/settings.json`
- Why fragile: 六個事件的 command 都硬編 `cd "%USERPROFILE%\workspace\Agentic-Coding-with-Claude-Code\Chapter03\hooks-notification"`——repo 若 clone 到其他路徑即全部失效；`%USERPROFILE%` 展開依賴 cmd 語意（已在 B00332 驗證可用，但換 shell 執行環境不保證）；且依賴先跑過 `uv sync`（pygame 在 `.venv`）
- Safe modification: 改路徑時六個事件要一起改；改完在該目錄啟動 Claude Code 實際觸發一輪驗證（參考 `ch03_demo_all_hooks_order.bat`）
- Test coverage: 無自動測試，只有手動音效驗證紀錄（`table-hook-events-test-*.html`）

**VPS nginx 設定與 repo 版本已知漂移:**

- Files: `Chapter02/hookhub/hookhub/nginx-hookhub.conf`、`Chapter02/hookhub/nginx-hookhub-merged.conf`
- Why fragile: VPS 上的 nginx conf 有手動改動（session 6 合併 demo17 路由）未拉回 repo；repo 內兩份 conf 都是 2026-05-26 的舊版。重建 VPS 時照 repo 的 conf 會遺失後續路由；且 nginx `proxy_pass` 尾斜線語意（有=改寫路徑、無=原封轉發）與 Next.js `basePath` 的配對極易弄反（v1 要有尾斜線、v2 要無尾斜線）
- Safe modification: 任何 nginx 改動先 `scp` VPS 現行 conf 回 repo 對照；改 `location /v2` 時記住 health check 要打 `/v2`（不含尾斜線，含尾斜線會 308）
- Test coverage: 無；只能靠部署後 curl 驗證

**next.config.ts 的 `outputFileTracingRoot` workaround:**

- Files: `Chapter02/hookhub/hookhub/next.config.ts`、`Chapter10/*/hookhub/next.config.ts`
- Why fragile: 加此設定是為了繞過「`%USERPROFILE%\package-lock.json` 存在導致 Next.js 誤判 workspace root、Tailwind PostCSS 掃描失效」的環境相依 bug；拿掉後在特定機器會無聲壞掉（樣式消失但 build 成功）
- Safe modification: 三份 next.config 都不要移除此行；v2 的 `basePath: "/v2"` 與 nginx 無尾斜線 proxy_pass 是配對設計，只改一邊必壞
- Test coverage: 無自動測試；驗證方式是 `npm run build` + 瀏覽器截圖

## Scaling Limits

**單一 VPS 承載三個 Next.js 實例:**

- Current capacity: 1 台 Hostinger VPS（187.127.109.145），PM2 fork 模式各 1 實例，`max_memory_restart: 512M` × 3
- Limit: 低規 VPS 上三個 Next.js + build 過程並存，build 期間記憶體壓力大（workflow 已把 timeout 從 10m 加到 15m 因應）；同時 build 兩個專案可能 OOM——目前靠 `concurrency: vps-deploy` 序列化保護，但 Ch02 線缺此保護（見 Tech Debt 第一條）
- Scaling path: 教學規模無需擴展；若要，先補 Ch02 concurrency，再考慮 build 移到 GitHub Runner

## Dependencies at Risk

**appleboy/ssh-action 固定 v1.0.3:**

- Risk: 固定舊版是刻意的（防上游破壞性更新），但長期不升會累積安全修補落差
- Impact: 部署線本身；不影響對外服務
- Migration plan: 每季檢查一次 release notes 後升 minor 版

**Next.js 版本分裂且無更新機制:**

- Risk: v1/v2 釘死 `15.4.6`、Ch02 用 `^15.5.9`；repo 無 Dependabot / renovate，安全通告（Next.js 歷史上有 middleware/image 相關 CVE）不會自動浮現
- Impact: 三個對外公開的 VPS 服務
- Migration plan: 開啟 GitHub Dependabot security alerts（零成本）；升級時三份一起升並跑 `npm run build` 驗證

## Missing Critical Features

**部署失敗無回滾機制:**

- Problem: workflow 的 health check 失敗只會讓 job 標紅，VPS 上已 `git reset --hard` 到新版 + PM2 已 reload，舊版無法一鍵恢復
- Blocks: 壞版本上線後只能手動 SSH 修復；`pm2 reload` 的 zero-downtime 只保護「新 process 起不來」的情況，不保護「起得來但頁面壞」的情況

**Repo 全域無自動化測試:**

- Problem: 三個 HookHub 皆無 unit/E2E 測試（`CLAUDE.md` 自述：驗證方式是 `npm run build` + 截圖）；Python 腳本（`play_sound.py`、`statusline.py`、`merge_hooks_wav.py`）無 `if __name__` 以外的測試
- Blocks: 重構 `HookCard.tsx` / `page.tsx` 或升級 Next.js 時無回歸保護，只能靠 build 過 + 肉眼看

## Test Coverage Gaps

**HookHub 前端（三份副本）:**

- What's not tested: 元件渲染、`hooks.json` 資料契約、basePath 路由行為
- Files: `Chapter02/hookhub/hookhub/src/`、`Chapter10/v1-zealous-jemison/hookhub/src/`、`Chapter10/v2-vigilant-feistel/hookhub/src/`
- Risk: `hooks.json` 欄位改動或 Hero 元件 props 變更後 build 仍過但頁面壞，部署後才發現（v2 的 HTTP 200 health check 只驗回應碼不驗內容）
- Priority: Medium（教學 repo，但服務對外公開）

**部署 workflow 腳本邏輯:**

- What's not tested: `pm2 describe` 分支、fetch+reset 流程、health check retry——只有真部署才會執行
- Files: `.github/workflows/*.yml`
- Risk: workflow 改動要 push main 才知道對錯，錯了直接影響 VPS；Ch02 線的三個已知缺陷即因此長期未修
- Priority: High（先修 `deploy-hookhub.yml` 的三個漂移項，見 Tech Debt 第一條）

**Chapter03 Hook 腳本:**

- What's not tested: 無音訊裝置、WAV 檔缺失、log 目錄唯讀等錯誤路徑
- Files: `Chapter03/hooks-notification/play_sound.py`
- Risk: `user` 家用機尚未驗證過音效播放（MEMORY 待辦）；headless 環境會 traceback
- Priority: Low（示範性質）

---

*Concerns audit: 2026-07-15*
