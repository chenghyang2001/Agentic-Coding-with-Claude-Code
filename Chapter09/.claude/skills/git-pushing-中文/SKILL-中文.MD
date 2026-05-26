---
name: git-pushing
description: 使用慣例式提交訊息（Conventional Commits）暫存、提交並推送 git 變更。當使用者想要提交並推送變更、提到推送到遠端，或要求儲存並推送工作時使用。也會在使用者說「推送變更」、「提交並推送」、「推送這個」、「推送到 GitHub」或類似 git 工作流程請求時啟動。
---

# Git 推送工作流程

暫存所有變更、建立慣例式提交，並推送到遠端分支。

## 使用時機

在以下情況自動啟動：
- 使用者明確要求推送變更（「推送這個」、「提交並推送」、「推送到遠端」）
- 提到將工作儲存至遠端（「儲存到 GitHub」、「推送到遠端」）
- 完成功能並想要分享
- 說出「讓我們把這個推上去」或「提交這些變更」等語句

## 工作流程

**始終使用腳本**——不要使用手動的 git 指令：

```bash
bash skills/git-pushing/scripts/smart_commit.sh
```

使用自訂訊息：
```bash
bash skills/git-pushing/scripts/smart_commit.sh "feat: 新增功能"
```

腳本會處理：暫存、慣例式提交訊息、Claude 頁尾、使用 -u 旗標推送。
