# Agentic Coding with Claude Code — 深度解析文件
## 作者：Eden Marco（Packt 出版）
## 文件用途：NotebookLM 知識庫來源素材

---

## 書籍總覽

本書《Agentic Coding with Claude Code》由 Eden Marco 撰寫，由 Packt 出版社發行。書籍示範程式碼托管於 GitHub：`PacktPublishing/Agentic-Coding-with-Claude-Code`。本書從 Claude Code 的基礎使用，到進階的 Agentic 工作流程，涵蓋了 MCP（Model Context Protocol）伺服器設計、Hooks 機制、自訂指令、Sub-agents 協作、Output Styles、Skills 工作流程，以及桌面應用整合等十個核心主題。

全書共 11 章，其中第 1、2、3、4、7、8、9、10 章附有完整的範例程式碼，第 5、6、11 章為純概念說明。本書以 HookHub（Claude Code Hooks 社群平台）作為貫穿全書的核心實作專案，逐章疊加功能，讓讀者在完整的實際專案脈絡中學習每一個技術主題。

---

## 第九章：Skills 工作流程（Skills & Workflow Automation）

### 核心概念

第九章介紹 Claude Code 的 **Skills** 系統。Skills 是可重用的工作流程規格書，存放在 `.claude/skills/` 目錄中。與 Slash Commands 的差異在於：Commands 是一次性的指令提示，而 Skills 定義了包含腳本、資源和複雜流程的完整工作流程模板。

### git-pushing Skill 範例

本章以 `git-pushing` 為示範，這個 Skill 封裝了整個 Git 提交推送的工作流程：

**SKILL.MD**：
```markdown
---
name: git-pushing
description: Stage, commit, and push git changes with conventional commit messages.
             Activates when user says "push changes", "commit and push", etc.
---

# Git Push Workflow

**ALWAYS use the script** - do NOT use manual git commands:

```bash
bash skills/git-pushing/scripts/smart_commit.sh
```
```

**最關鍵的設計原則**：`ALWAYS use the script`——強制 Claude 使用封裝好的腳本，而不是自己生成 git 指令。這確保了行為的一致性和可預測性。

### smart_commit.sh：海盜風格提交腳本

Skill 的核心實作是 `smart_commit.sh`，這個腳本展示了一個充滿創意的 Claude Code 整合：

**工作流程**：
1. 取得當前分支名稱
2. 檢查是否有未提交的變更
3. `git add .` 暫存所有變更
4. 分析變更類型（test/docs/fix/feat 等）
5. **呼叫 Claude CLI 生成海盜風格的 commit message**
6. 建立 commit（包含 Claude Code 署名）
7. 推送到遠端

**Claude CLI 呼叫**：
```bash
PIRATE_MSG=$(claude -p "You are a pirate! Based on this git diff, 
write a short conventional commit message but make the description 
sound like a pirate talking. Keep it under 72 chars.

Commit type: $COMMIT_TYPE
Files changed: $STAGED_FILES
Diff: $DIFF_CONTENT" 2>/dev/null || echo "")
```

這個設計的精妙之處：Skill 腳本本身是靜態的 bash，但它在執行時動態呼叫 Claude CLI（`claude -p`）生成創意的 commit message，結合了腳本的可靠性和 AI 的創意能力。

**自動 fallback**：如果 Claude CLI 呼叫失敗，腳本有備用的標準 commit message 格式，確保工作流程不中斷。

**Commit 格式**：
```
feat(skill): arrr! discovered treasure in the code, matey!

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

### Skills 目錄結構

Skills 採用約定俗成的目錄結構：
```
.claude/skills/
└── git-pushing/
    ├── SKILL.MD          # 規格說明（Claude 讀取）
    └── scripts/
        └── smart_commit.sh  # 實際腳本
```

`SKILL.MD` 中的 `description` 欄位控制觸發時機，類似於 sub-agent 的 `description`——Claude 根據使用者的語境自動識別是否應該啟用此 Skill。

### Skills 與 Commands 的差異

| 面向 | Commands | Skills |
|------|----------|--------|
| 定義位置 | `.claude/commands/` | `.claude/skills/` |
| 啟動方式 | `/指令名` 顯式呼叫 | 自然語言觸發 |
| 複雜度 | 簡單提示 | 包含腳本和資源 |
| 可重用性 | 單一操作 | 完整工作流程 |
| 版本控制 | 只有 MD | MD + 腳本 + 資源 |

### Skills 的進階應用

書中提到 Skills 的強大應用場景：
- **CI/CD 整合**：封裝部署流程，讓 Claude 能安全執行預定義的部署步驟
- **測試自動化**：定義測試執行流程，確保每次都按正確順序執行
- **文件生成**：封裝從程式碼到文件的完整轉換流程
- **資料庫遷移**：封裝資料庫變更的安全流程（備份、遷移、驗證）

---
