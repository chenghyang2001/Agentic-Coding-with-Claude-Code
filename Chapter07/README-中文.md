# Claude Code 速成課程

掌握 Claude Code — Anthropic 官方 AI 輔助軟體開發 CLI 的完整指南。

## 什麼是 Claude Code？

Claude Code 是一款互動式命令列工具，利用 Claude 的 AI 能力協助開發者完成軟體工程任務。它提供智慧程式碼輔助、除錯支援、檔案管理，以及與你的開發工作流程的無縫整合。

## 安裝

### 前置需求

- Node.js 18+ 或 Python 3.8+
- Git
- 終端機／命令提示字元

### 安裝 Claude Code

```bash
npm install -g @anthropic-ai/claude-code
# 或
pip install claude-code
```

### 身分驗證

```bash
claude-code auth login
```

## 快速開始

### 基本指令

```bash
# 啟動互動式工作階段
claude-code

# 執行特定任務
claude-code "Fix the bug in src/main.js"

# 分析檔案
claude-code --file src/app.py "Explain this code"

# 建立新功能
claude-code "Add user authentication to my React app"
```

## 核心功能

### 🔍 程式碼分析

- **檔案理解**：分析並說明程式碼結構
- **錯誤偵測**：自動識別並修復問題
- **程式碼審查**：取得改進建議

### ✏️ 程式碼生成

- **功能開發**：根據描述建立新功能
- **樣板建立**：生成常見模式和結構
- **測試撰寫**：建立完整的測試套件

### 🛠️ 開發工具

- **重構**：現代化並最佳化現有程式碼
- **文件**：生成並維護專案文件
- **除錯**：逐步問題解決

### 🔗 整合

- **Git 工作流程**：Commit 管理和 PR 建立
- **套件管理**：依賴套件處理
- **建置系統**：與常見建置工具整合

## 速成課程模組

### 模組一：入門

- [ ] 安裝與設定
- [ ] 第一次互動式工作階段
- [ ] 基本檔案操作
- [ ] 了解 Claude Code 的能力

### 模組二：程式碼分析與理解

- [ ] 閱讀並說明現有程式碼
- [ ] 識別程式碼模式
- [ ] 分析專案結構
- [ ] 程式碼品質評估

### 模組三：錯誤修復與除錯

- [ ] 常見錯誤模式
- [ ] 系統化除錯方式
- [ ] 測試修復結果
- [ ] 預防策略

### 模組四：功能開發

- [ ] 規劃新功能
- [ ] 實作策略
- [ ] 測試與驗證
- [ ] 文件撰寫

### 模組五：重構與最佳化

- [ ] 程式碼現代化
- [ ] 效能提升
- [ ] 可維護性強化
- [ ] 模式實作

### 模組六：進階工作流程

- [ ] Git 整合
- [ ] CI/CD 流水線設定
- [ ] 團隊協作
- [ ] 專案擴展

## 最佳實踐

### 🎯 有效的提示

- 明確說明你的需求
- 提供關於專案的情境資訊
- 需要時主動詢問說明
- 將複雜任務拆分為較小的步驟

### 📁 專案組織

- 保持程式碼庫結構良好
- 使用有意義的檔案和變數名稱
- 維持一致的程式碼標準
- 記錄重要決策

### 🔄 迭代開發

- 從小型且可運作的解決方案開始
- 頻繁測試
- 隨時重構
- 逐步建置

## 範例專案

### 初級：待辦事項應用程式

```bash
claude-code "Create a simple todo app with HTML, CSS, and JavaScript"
```

### 中級：REST API

```bash
claude-code "Build a Node.js REST API with Express and MongoDB for a blog"
```

### 進階：全端應用程式

```bash
claude-code "Create a React/Next.js e-commerce site with authentication and payment processing"
```

## 常見使用情境

### 日常開發任務

- **程式碼審查**：`claude-code "Review this pull request for security issues"`
- **錯誤修復**：`claude-code "Fix the authentication error in login.js"`
- **功能新增**：`claude-code "Add dark mode to the dashboard component"`

### 學習與探索

- **程式碼說明**：`claude-code "Explain how this React hook works"`
- **最佳實踐**：`claude-code "Show me the best way to handle errors in this API"`
- **技術研究**：`claude-code "Compare different state management solutions for React"`

### 專案設定

- **樣板生成**：`claude-code "Set up a new TypeScript project with testing"`
- **設定配置**：`claude-code "Configure ESLint and Prettier for this project"`
- **部署**：`claude-code "Set up GitHub Actions for automated deployment"`

## 技巧與訣竅

### 💡 專業建議

1. **情境是關鍵**：分享相關檔案和專案結構
2. **迭代方式**：逐步建置和測試
3. **主動提問**：不要猶豫，盡量詢問說明
4. **版本控制**：開發過程中頻繁 commit
5. **測試**：始終以適當的測試驗證變更

### ⚠️ 常見陷阱

- 不要試圖一次解決所有問題
- 使用前務必審查生成的程式碼
- 先在安全環境中測試
- 保留重要檔案的備份

## 疑難排解

### 連線問題

```bash
# 檢查身分驗證
claude-code auth status

# 重新驗證
claude-code auth login
```

### 效能問題

- 在編輯器中關閉不必要的檔案
- 使用具體的檔案路徑而非廣泛搜尋
- 將大型任務拆分為較小的區塊

## 資源

### 文件

- [Claude Code 官方文件](https://docs.anthropic.com/claude-code)
- [API 參考](https://docs.anthropic.com/claude-code/api)
- [最佳實踐指南](https://docs.anthropic.com/claude-code/best-practices)

### 社群

- [GitHub Issues](https://github.com/anthropics/claude-code/issues)
- [Discord 社群](#)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/claude-code)

## 貢獻

本速成課程是開源的！歡迎：

- 新增範例
- 改善現有內容
- 修正錯字和錯誤
- 建議新模組

## 授權

MIT 授權 — 詳見 LICENSE 檔案。

---

**準備好開始你的 Claude Code 之旅了嗎？** 🚀

從模組一開始，按照自己的步調逐一完成每個章節。記住：學習的最好方式就是動手實作！
