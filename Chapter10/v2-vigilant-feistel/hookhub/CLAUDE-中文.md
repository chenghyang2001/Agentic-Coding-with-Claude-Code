# CLAUDE.md

此檔案提供 Claude Code（claude.ai/code）在操作此儲存庫程式碼時的指引。

## 專案概述

HookHub 是一個使用 App Router 架構搭配 TypeScript 和 Tailwind CSS 的 Next.js 15.4.6 應用程式。

## 常用指令

```bash
# 開發環境
npm run dev         # 在 http://localhost:3000 啟動開發伺服器

# 正式環境
npm run build       # 建立正式版本
npm run start       # 啟動正式伺服器

# 程式碼品質
npm run lint        # 執行 ESLint
```

## 架構

- **框架**：Next.js 15.4.6，使用 App Router
- **結構**：所有應用程式碼位於 `src/app/`
- **樣式**：Tailwind CSS 4.x（無自訂設定檔，使用預設值）
- **TypeScript**：設有路徑別名（`@/*` → `./src/*`）

## 重要檔案

- `src/app/layout.tsx` — 根佈局，含 Geist 字型設定
- `src/app/page.tsx` — 首頁元件
- `src/app/globals.css` — 全域樣式與 Tailwind 指令

## 開發注意事項

- 目前尚未設定測試框架
- 使用 npm 作為套件管理工具（已存在 package-lock.json）
- ESLint 使用 Next.js 預設設定
- 透過 Tailwind 支援淺色與深色模式

## 測試策略

- 使用 Playwright MCP 進行 UI 測試
- 截圖存放於 `/memory/screenshots` 目錄
