# Session 4 — Chapter10 v2 CI/CD 完整部署 + nginx/basePath 踩坑修復

**日期**：2026-05-26
**Session 編號**：4（同日第四 session）

---

## 完成事項

### 1. Chapter10 v2（vigilant-feistel）CI/CD 建立與除錯

- 建立 `Chapter10/v2-vigilant-feistel/hookhub/ecosystem.config.js`：PM2 config，app name `hookhub-v2`，PORT 3003，`HOSTNAME=127.0.0.1`（loopback only）
- 建立 `.github/workflows/deploy-hookhub-ch10-v2.yml`：完整 CI/CD workflow，含 concurrency group `vps-deploy`（與 v1 共用，序列化防並發）、`timeout-minutes: 20`、appleboy/ssh-action@v1.0.3

### 2. Writer-QA-Reviewer 三 agent 鐵律完整執行

- Writer → QA（23 個 test case，PASS）→ Reviewer（CHANGES_REQUESTED：`curl -f` 不能保證 HTTP 200）→ Writer 修正 → QA（3 case，PASS）→ Reviewer（APPROVED）
- 最終 health check 改為 `curl -w "%{http_code}"` + 明確 `[ "$HTTP_CODE" = "200" ]` 判斷

### 3. 修復 v1 CI/CD：git pull --ff-only → fetch + reset --hard

- 問題：VPS 有手動建立的未追蹤檔（剛 commit 進 repo 的 workflow yml），`git pull --ff-only` 報錯 `error: The following untracked working tree files would be overwritten by merge`
- 修復：兩個 workflow（v1 + v2）都改為 `git fetch origin main && git reset --hard FETCH_HEAD`
- 原則：VPS 是 repo 的乾淨鏡像，本地未追蹤檔應被覆蓋而非阻斷部署

### 4. 加入 basePath: '/v2' 並修復 nginx 設定

- `next.config.ts` 加入 `basePath: "/v2"`，讓 Next.js 感知 nginx 的路徑前綴
- 發現問題：health check 打 `localhost:3003/v2/` 得到 HTTP 308（Next.js trailing slash 正規化）
- 修復：URL 改為 `localhost:3003/v2`（去尾斜線）
- 同時修復 nginx：`proxy_pass http://127.0.0.1:3003/`（有尾斜線）改為 `proxy_pass http://127.0.0.1:3003`（無尾斜線），`location /v2/` 改為 `location /v2`
- **關鍵知識**：`proxy_pass` 有尾斜線 = path rewriting（剝掉 location 前綴），無尾斜線 = 保留完整 URI。basePath 生效後 nginx 必須保留完整 URI

### 5. v2 成功上線

- `http://187.127.109.145/v2` 回傳 HTTP 200，頁面正常顯示
- GitHub Actions 最後成功 run #26435109825（37 秒完成）
- VPS 三個 HookHub 並行運作：Ch02（3001）、Ch10-v1（3002）、Ch10-v2（3003）

---

## 關鍵技術筆記

### nginx proxy_pass 尾斜線差異

```nginx
# ❌ 有尾斜線 = Path Rewriting（剝掉 /v2 前綴）
location /v2/ {
    proxy_pass http://127.0.0.1:3003/;  # 把 /v2/xxx 改成 /xxx 送給後端
}

# ✅ 無尾斜線 = 保留完整 URI
location /v2 {
    proxy_pass http://127.0.0.1:3003;   # 把 /v2/xxx 原封不動送給後端
}
```

### Next.js basePath 行為

- 設定 `basePath: "/v2"` 後，所有 URL 都以 `/v2` 為根
- Next.js 會把 `/v2/` 301 重定向至 `/v2`（308 redirect）
- Health check 必須打 `/v2`（不加尾斜線）

### git fetch + reset --hard vs git pull

```bash
# 正確：VPS 以 repo 為準，強制同步
git fetch origin main && git reset --hard FETCH_HEAD

# 危險：--ff-only 遇到 untracked files 會 abort
git pull --ff-only origin main
```

---

## 產出檔案

| 檔案 | 動作 | 說明 |
|------|------|------|
| `Chapter10/v2-vigilant-feistel/hookhub/ecosystem.config.js` | 新增 | PM2 config for hookhub-v2（PORT 3003） |
| `.github/workflows/deploy-hookhub-ch10-v2.yml` | 新增 | Ch10 v2 CI/CD workflow（含 basePath health check 修正） |
| `.github/workflows/deploy-hookhub-ch10.yml` | 修改 | git pull 策略改為 fetch+reset（commit 0b0e365 記錄） |
| `Chapter10/v2-vigilant-feistel/hookhub/next.config.ts` | 修改 | 加入 basePath: "/v2" |
| VPS `/etc/nginx/sites-available/hookhub` | 修改 | 修正 proxy_pass 尾斜線 + location /v2 |

**Commits**：`b4998ce` → `764b42c` → `7d471ae` → `9b1a00d` → `0db228d`

---

## HANDOFF（下次 session 優先處理）

### 立即行動

- [ ] Chapter10 v1（zealous-jemison）驗證：確認 VPS 的 hookhub-ch10 服務 port 3002 健康（目前只有 v2 手動驗證過 <http://187.127.109.145/ch10> 是否正常）
- [ ] 提交 `CLAUDE-中文.md`：Chapter02/hookhub、Chapter04、Chapter10 兩子目錄（vigilant-feistel、zealous-jemison）尚未 commit
- [ ] Chapter04 開始探索

### 進行中（需接續）

- VPS nginx 已手動修改（session 內用 @小雲 SSH），但此改動未 commit 進 repo（nginx conf 不在 git 追蹤範圍）；若 VPS 重建需重新套用

### 注意事項

- VPS nginx conf 改動不在 git 中，若需重建 VPS 請參考 session4-summary.md 的 nginx 設定
- v1（zealous-jemison）的 ecosystem.config.js 存在於 `Chapter10/v1-zealous-jemison/hookhub/ecosystem.config.js`，確認它設定 PORT=3002 且 HOSTNAME=127.0.0.1（v2 時才補上 HOSTNAME，v1 可能沒有）
- `concurrency: group: vps-deploy` 在三個 workflow 中共用，確保 Ch02、v1、v2 部署不並發
