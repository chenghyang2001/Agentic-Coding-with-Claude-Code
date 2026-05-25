# Claude Code 速成課程

一份全面掌握 Claude Code（Anthropic 官方 AI 驅動軟體開發 CLI 工具）的完整指南。

## 什麼是 Claude Code？

Claude Code 是一款互動式命令列工具，藉助 Claude 的 AI 能力協助開發者完成軟體工程任務。它提供智慧程式碼輔助、除錯支援、檔案管理，並能無縫整合至你的開發工作流程中。

## 安裝

### 前置需求
- Node.js 18+ 或 Python 3.8+
- Git
- 終端機 / 命令提示字元

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

## 快速入門

### 基本指令
```bash
# 開啟互動式對話
claude-code

# 執行特定任務
claude-code "修復 src/main.js 中的 bug"

# 分析某個檔案
claude-code --file src/app.py "解釋這段程式碼"

# 建立新功能
claude-code "為我的 React 應用程式新增使用者身分驗證"
```

## 核心功能

### 🔍 程式碼分析
- **理解程式碼**：分析並說明程式碼結構
- **偵測 Bug**：自動識別並修復問題
- **程式碼審查**：提供改進建議

### ✏️ 程式碼生成
- **功能開發**：根據描述建構新功能
- **樣板建立**：生成常見的模式與結構
- **測試撰寫**：建立全面的測試套件

### 🛠️ 開發工具
- **重構**：現代化並優化既有程式碼
- **文件**：生成並維護專案文件
- **除錯**：逐步解決問題

### 🔗 整合
- **Git 工作流程**：Commit 管理與 PR 建立
- **套件管理**：依賴項目處理
- **建置系統**：與常見建置工具整合

## 速成課程模組

### 模組一：入門
- [ ] 安裝與設定
- [ ] 第一次互動式對話
- [ ] 基本檔案操作
- [ ] 了解 Claude Code 的能力

### 模組二：程式碼分析與理解
- [ ] 閱讀並解釋既有程式碼
- [ ] 識別程式碼模式
- [ ] 分析專案結構
- [ ] 程式碼品質評估

### 模組三：Bug 修復與除錯
- [ ] 常見錯誤模式
- [ ] 系統化除錯方法
- [ ] 測試修復結果
- [ ] 預防策略

### 模組四：功能開發
- [ ] 規劃新功能
- [ ] 實作策略
- [ ] 測試與驗證
- [ ] 文件撰寫

### 模組五：重構與優化
- [ ] 程式碼現代化
- [ ] 效能改進
- [ ] 可維護性提升
- [ ] 模式實作

### 模組六：進階工作流程
- [ ] Git 整合
- [ ] CI/CD 管線設定
- [ ] 團隊協作
- [ ] 專案擴展

## 最佳實踐

### 🎯 有效的提示詞技巧
- 明確描述你的需求
- 提供專案的相關背景
- 需要時請求說明
- 將複雜任務拆解成更小的步驟

### 📁 專案組織
- 保持程式碼庫結構清晰
- 使用有意義的檔案名稱與變數名稱
- 維持一致的程式碼標準
- 記錄重要的決策

### 🔄 迭代式開發
- 從小型、可運行的解決方案開始
- 頻繁測試
- 邊開發邊重構
- 逐步累積功能

## 範例專案

### 初級：待辦清單應用
```bash
claude-code "建立一個使用 HTML、CSS 和 JavaScript 的簡單待辦清單應用"
```

### 中級：REST API
```bash
claude-code "建立一個使用 Express 和 MongoDB 的 Node.js 部落格 REST API"
```

### 進階：全端應用
```bash
claude-code "建立一個含身分驗證與付款處理的 React/Next.js 電商網站"
```

## 常見使用場景

### 日常開發任務
- **程式碼審查**：`claude-code "審查這個 Pull Request 的安全性問題"`
- **Bug 修復**：`claude-code "修復 login.js 中的身分驗證錯誤"`
- **功能新增**：`claude-code "為 Dashboard 元件新增深色模式"`

### 學習與探索
- **程式碼說明**：`claude-code "解釋這個 React hook 的運作方式"`
- **最佳實踐**：`claude-code "告訴我處理這個 API 錯誤的最佳方法"`
- **技術研究**：`claude-code "比較 React 的不同狀態管理解決方案"`

### 專案設定
- **樣板生成**：`claude-code "建立一個含測試的新 TypeScript 專案"`
- **配置**：`claude-code "為這個專案設定 ESLint 和 Prettier"`
- **部署**：`claude-code "設定 GitHub Actions 自動部署"`

## 技巧與訣竅

### 💡 進階提示
1. **情境為王**：分享相關檔案和專案結構
2. **迭代方法**：逐步建構並測試
3. **多問問題**：不要猶豫，盡量要求說明
4. **版本控制**：開發過程中頻繁 commit
5. **測試**：務必用適當的測試驗證變更

### ⚠️ 常見陷阱
- 不要試圖一次解決所有問題
- 使用前務必審查生成的程式碼
- 先在安全環境中測試
- 保留重要檔案的備份

## 疑難排解

### 連線問題
```bash
# 檢查身分驗證狀態
claude-code auth status

# 重新驗證
claude-code auth login
```

### 效能問題
- 關閉編輯器中不必要的檔案
- 使用具體的檔案路徑，避免過於廣泛的搜尋
- 將大型任務拆解成較小的區塊

## 資源

### 文件
- [官方 Claude Code 文件](https://docs.anthropic.com/claude-code)
- [API 參考](https://docs.anthropic.com/claude-code/api)
- [最佳實踐指南](https://docs.anthropic.com/claude-code/best-practices)

### 社群
- [GitHub Issues](https://github.com/anthropics/claude-code/issues)
- [Discord 社群](#)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/claude-code)

## 貢獻

這份速成課程是開源的！歡迎：
- 新增新範例
- 改善現有內容
- 修正錯字與錯誤
- 建議新模組

## 授權

MIT 授權 — 詳見 LICENSE 檔案

---

**準備好開始你的 Claude Code 之旅了嗎？** 🚀

從模組一開始，按照自己的步調逐一完成每個章節。記住：學習最好的方式就是實際動手做！
