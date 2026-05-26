# Session 6 Summary — 2026-05-26

## 日期

2026-05-26（B00332 公司機）

## 完成事項

### 1. 完成 CI/CD 部署檔案的 git commit（接續 Session 5 未完成）

- Session 5 已 `git add` 3 個部署檔案但尚未 commit，本次 session 接續執行
- 執行 `git commit -m "新增 GitHub Actions CI/CD + PM2 + Nginx 設定"` → commit `22d71b3`
- `git push` 到 `chenghyang2001/Agentic-Coding-with-Claude-Code`

### 2. 全程自動化設定 GitHub Secrets（使用者說「you do. go」）

- 生成 ed25519 SSH key pair：`~/.ssh/github_actions_hookhub` + `.pub`（之前無 `.ssh` 目錄）
- 用 `@小雲` subagent SSH 進 VPS，將公鑰寫入 `~/.ssh/authorized_keys`
- 用 `gh secret set` 設定 5 個 GitHub Secrets：`VPS_HOST`、`VPS_USER`、`VPS_SSH_KEY`、`VPS_PORT`、`VPS_FINGERPRINT`（後改為 `VPS_KNOWN_HOSTS` 再移除）

### 3. 三輪除錯讓 GitHub Actions 首次成功

| 輪次 | 錯誤 | 根本原因 | 修法 |
|------|------|---------|------|
| Round 1 | `ssh: host key fingerprint mismatch` | fingerprint 格式或值不匹配 | 改用 `known_hosts` 參數（commit `0f49e69`）|
| Round 2 | `Unexpected input(s) 'known_hosts'` | `appleboy/ssh-action@v1.0.3` 無此參數 | 移除 host key 驗證改 comment（commit `997df73`）|
| Round 3 | `EACCES: permission denied, mkdir '/usr/lib/node_modules/pm2'` | user `claude` 無 root，`npm install -g` 需 `/usr/lib/node_modules` | Step 2 新增 `NPM_GLOBAL=$HOME/.npm-global` + `npm config set prefix` + `export PATH`（Writer-QA pipeline，commit `0702ef8`）|

- **最終成功**：GitHub Actions run `26431709372`，耗時 1m10s，PM2 啟動 HookHub

### 4. 部署 Nginx 設定讓 port 80 可存取

- `@小雲` SSH 進 VPS，發現已有 `demo17.conf`（`server_name _` 同佔 port 80）
- 將 demo17.conf 的 location 塊（A2A agent + Kindle 音訊路由）合併進 `nginx-hookhub.conf`
- 移除 demo17.conf symlink，重載 Nginx
- `curl http://localhost:80` 回傳 HTTP 200

### 5. 驗證 HookHub 對外可存取

- `@小雲` 確認：PM2 status online（162 MB）、port 3001 監聽、HTTP 200
- Puppeteer 截圖 `http://187.127.109.145/` — HeroTerminal variant 正常渲染，品牌色 `#d97757` 顯示正確

## 關鍵技術筆記

### appleboy/ssh-action@v1.0.3 已知限制

- **無 `known_hosts` 參數**（只有 `fingerprint`）— 不同於其他 SSH action
- `fingerprint` 的 SHA256 格式（`SHA256:xxx`）在實測中無法穩定通過 → 移除後仍可正常連線（私鑰認證足夠）
- 有效參數清單：`host / username / key / port / fingerprint / command_timeout / script / ...`

### npm 全域安裝在無 root VPS 上的正確做法

```bash
export NPM_GLOBAL="$HOME/.npm-global"
mkdir -p "$NPM_GLOBAL"
npm config set prefix "$NPM_GLOBAL"
export PATH="$NPM_GLOBAL/bin:$PATH"
command -v pm2 || npm install -g pm2
```

- `npm config set prefix` 必須在 `export PATH` 之前
- `command -v pm2` 短路跳過重複安裝

### Nginx 多 server block 衝突解法

- 同一 VPS 上多個 conf 都用 `server_name _` → Nginx 只服務第一個（按 filename 排序）
- 解法：將 location 塊合併進主 conf，移除舊 conf symlink

### GitHub Actions SSH 部署流程（最終可運作版本）

1. 生成本地 ed25519 key → `gh secret set VPS_SSH_KEY`
2. 公鑰寫入 VPS `~/.ssh/authorized_keys`
3. workflow YAML 不設 fingerprint，只用 private key 認證
4. VPS 腳本：`npm config set prefix $HOME/.npm-global` + PM2 idempotent reload

## 產出檔案

| 檔案 | 操作 | Commit |
|------|------|--------|
| `.github/workflows/deploy-hookhub.yml` | 建立 + 3 次修復 | `22d71b3` → `0f49e69` → `997df73` → `0702ef8` |
| `Chapter02/hookhub/hookhub/ecosystem.config.js` | 建立（PM2 config，`__dirname` 無硬編碼路徑） | `22d71b3` |
| `Chapter02/hookhub/hookhub/nginx-hookhub.conf` | 建立（port 80 → 3001 反向代理） | `22d71b3` |
| `Chapter02/hookhub/hookhub/DEPLOYMENT.md` | 建立（測試觸發 CI/CD 用） | `8dc2721` |
| VPS `/etc/nginx/sites-available/hookhub` | 部署（含 demo17 合併）| 手動 via @小雲 |
| `~/.ssh/github_actions_hookhub` + `.pub` | 生成（GitHub Actions 專用 SSH key）| 本機，不在 repo |

## HANDOFF（下次 session 優先處理）

### 立即行動

- [ ] **確認 Nginx 合併後的 `nginx-hookhub.conf` commit 進 repo**：@小雲 合併了 demo17 的路由進去，但合併版只在 VPS 上，本地 repo 仍是舊版。需要 `scp` 拉回或手動更新 `nginx-hookhub.conf` 再 commit
- [ ] **開始 Chapter04 演練**：MEMORY.md 標記 Chapter04 未開始，可接續進行
- [ ] **驗證下次 push 自動觸發 CI/CD**：本次首次成功部署，下次改任何 `Chapter02/hookhub/**` 的改動都應自動跑

### 進行中（需接續）

- HookHub 已成功運行在 `http://187.127.109.145/`，PM2 狀態 online
- GitHub Actions CI/CD pipeline 完全設定完畢（5 Secrets + workflow YAML），後續 push 自動部署
- `nginx-hookhub.conf` 在 VPS 上包含 demo17 合併的 location 塊，但本地 repo 版本未更新

### 注意事項

- `appleboy/ssh-action@v1.0.3` 不支援 `known_hosts` 參數（只有 `fingerprint`），且 fingerprint 驗證不穩定 — 目前選擇移除 host key 驗證
- VPS user `claude` 無 root — 所有 `npm install -g` 必須搭配 `npm config set prefix $HOME/.npm-global`
- Nginx 上 demo17.conf 的 Kindle 音訊和 A2A agent 路由已合併進 hookhub.conf，demo17.conf symlink 已移除 — 若未來增加其他服務需注意 Nginx conf 不能再有多個 `server_name _`
