---
name: git-pushing
description: 暫存、提交並推送 Git 變更，並附上符合規範的 Commit 訊息。當使用者想要提交並推送變更、提到推送到遠端，或要求儲存並推送工作時啟用。也適用於使用者說「推送變更」、「提交並推送」、「推這個」、「推到 GitHub」或類似 Git 工作流程請求時自動觸發。
---

# Git 推送工作流程

暫存所有變更、建立符合規範的 Commit，並推送到遠端分支。

## 使用時機

當使用者出現以下情況時自動啟用：
- 明確要求推送變更（「推這個」、「提交並推送」、「推到遠端」）
- 提到將工作儲存到遠端（「存到 GitHub」、「推到遠端」）
- 完成一個功能並想分享
- 說出類似「來推上去」或「提交這些變更」的句子

## 工作流程

**永遠使用腳本** — 不要手動下 git 指令：

```bash
bash skills/git-pushing/scripts/smart_commit.sh
```

附自訂訊息：
```bash
bash skills/git-pushing/scripts/smart_commit.sh "feat: 新增功能"
```

腳本處理範圍：暫存、符合 Conventional Commits 規範的提交訊息、Claude 作者標記、以 -u flag 推送。
