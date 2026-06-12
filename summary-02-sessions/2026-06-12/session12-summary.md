# Session 12 Summary — learnings.md 瘦身任務（5384 → 365 行）

**日期**：2026-06-12
**主題**：`~/.claude/context/learnings.md` 蒸餾瘦身 + 完整歷史歸檔（接續 Session 11 收工時 Learnings Curator 的超標警報）

---

## 完成事項

### 1. 問題診斷（主 Claude）

- `learnings.md` 實測 **5384 行 / 351 個 section**（紀律上限 500 行，超標 10.8 倍）
- 根因確認：同一 skill 的學習記錄每個 session 追加**新 section**（帶日期後綴）而非合併進既有 section——`end-session / 收工` 累積 8+ 段、`writer-QA-iron-rule` 6 段、`youtube-summarizer` 5+ 段、`deploy-viewer` 4 段
- 結構掃描方法：`grep -n "^## "` 列出全部 351 個 section 標題（頭 80 + 尾 100），不讀全文即可定位膨脹模式

### 2. 歸檔（主 Claude，歷史零丟失）

- 原檔完整複製為 `~/.claude/context/learnings-archive-2026H1.md`（5384 行），瘦身後可隨時回查
- 新 learnings.md header 第一行即標注歸檔位置與日期

### 3. 蒸餾重寫（subagent 執行，主 Claude 驗收）

- 派單一 general-purpose subagent 讀完整 5384 行，按 8 條蒸餾規則重寫：
  - 同 skill 多段合併為一段；衝突取最新裁決
  - 只留「下次該怎麼做」（行為規則 / 使用者偏好 / 踩坑解法 / API 正確語法）
  - 砍掉：200+ 條 session 流水帳、已廢止規則（只留新版）、一次性專案細節（Hermes/RK3568/Moltbook 等）、與 MEMORY.md/instructions 重複內容、同主題重複 5+ 次段落（Shorts fallback×6、plan-first×8 合併成單條通則）
  - 不確定是否過時的保守保留（costco「不碰 Place Order」、slide-loop Left Arrow 技法、Vapi 試用限制 3 例）
- **結果：351 section → 28 section，5384 行 → 365 行**（目標 350-450 達標）

### 4. 主 Claude 驗收（4 項全過）

- 行數 365 ≤ 500 ✓
- 高頻 skill（end-session / writer-QA / youtube-summarizer / project-tree）各只剩 1 個 section ✓
- header 含歸檔指引 ✓
- **防再膨脹紀律**寫入 header：「同 skill 只一個 section；新學習**合併進既有 section 而非追加新段**」——未來 end-session 的 Learnings Curator 讀檔時會看到此規則 ✓

---

## 關鍵技術筆記

- **瘦身 = 歸檔 + 蒸餾兩步**，不是直接刪：先 `cp` 完整歸檔保歷史，再蒸餾重寫工作檔。歸檔檔進 git，跨機器同步後也能回查
- **大檔蒸餾派 subagent**：5384 行讀進主 context 會爆量；subagent 獨立 context 讀全文 + 主 Claude 只做規則制定與抽查驗收（grep section 數 / 行數 / 重複檢查），分工乾淨
- **膨脹根因是「追加式記錄」**：學習類檔案若無「合併不追加」紀律，每 session +15 行 × 350 session 就是 5000 行。修復不只砍行數，更要把紀律寫進檔案 header 讓後續自動化流程遵守

---

## 產出檔案

| 檔案 | 動作 | Commit |
|------|------|--------|
| `~/.claude/context/learnings.md` | 重寫（5384 → 365 行）| `e163d52`（~/.claude repo）|
| `~/.claude/context/learnings-archive-2026H1.md` | 新增（完整歸檔）| `e163d52` |

---

## HANDOFF（下次 session 優先處理）

### 立即行動

- [ ] **執行 `ch03_demo_all_hooks_order.bat`**：直接雙擊 CMD 執行（非 Git Bash），確認 12 音效全播正常（沿用 S11）
- [ ] **拉回 VPS nginx 合併版**：`scp root@187.127.109.145:/etc/nginx/conf.d/nginx-hookhub.conf` 拉回 commit（沿用 S11）
- [ ] **Chapter10 v1 健康驗證**：`curl http://187.127.109.145/ch10` + 查 v1 ecosystem.config.js 是否有 `HOSTNAME=127.0.0.1`（沿用 S11）

### 進行中（需接續）

- learnings.md 瘦身已完成並 push；**user 家用機與其他機器（DESKTOP-FFSFP66 / user-pc 等）需 `git pull ~/.claude`** 才會拿到瘦身版 + project-tree 升級版，pull 前那些機器的 end-session 仍會在舊版 learnings.md 上追加
- 若其他機器在 pull 前已追加造成衝突：learnings.md 以瘦身版為底，把對方新增內容**合併進對應 section**（遵守新紀律），不要恢復追加式

### 注意事項

- 蒸餾版有 3 項「保守保留」（costco 硬規則 / slide-loop 技法 / Vapi 試用限制），未來確認過時可刪
- learnings-archive-2026H1.md（5384 行）勿再編輯——它是凍結快照；下半年若再膨脹，歸檔檔名用 `learnings-archive-2026H2.md`
- end-session skill 的 Learnings Curator prompt 仍寫「≤ 500 行」，現在可實際執行；若未來想把「合併不追加」紀律也寫進 end-session skill 本體，改 `~/.claude/commands/`（或對應 skill 檔）的 Curator prompt
