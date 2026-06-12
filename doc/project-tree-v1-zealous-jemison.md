# 專案樹狀結構 — v1-zealous-jemison

> 生成日期：2026-06-12 ｜ 掃描目標：`C:\Users\B00332\workspace\Agentic-Coding-with-Claude-Code\Chapter10\v1-zealous-jemison`
> 統計：10 個資料夾 / 27 個檔案（已排除 2 個噪音目錄）
> 由 `project-tree` skill 生成

```
v1-zealous-jemison/                   # Chapter10 v1 HookHub（VPS PORT 3002，nginx 路徑 /ch10）
└── hookhub/                          # Next.js 15.4.6 精簡版 HookHub（無 heros/sections，單卡片版）
    ├── memory/
    │   ├── frontend/
    │   │   ├── CLAUDE.md             #   資深前端工程師 persona（React/Next/TS/Tailwind 編碼準則）
    │   │   └── CLAUDE-中文.md        #   上述 persona 的繁中翻譯版
    │   └── spec/
    │       ├── CLAUDE.md             #   HookHub 產品規格（社群驅動的 Hook 探索/分享平台）
    │       └── CLAUDE-中文.md        #   上述規格的繁中翻譯版
    ├── public/                       # *.svg × 5（Next.js 預設靜態圖示）
    ├── src/
    │   ├── app/
    │   │   ├── globals.css           #   Tailwind 全域樣式
    │   │   ├── layout.tsx            #   根 layout（metadata + 字型）
    │   │   └── page.tsx              #   首頁（Hook 清單頁）
    │   ├── components/
    │   │   └── HookCard.tsx          #   Hook 卡片元件（本版唯一元件）
    │   ├── data/
    │   │   └── hooks.json            #   Hook 範例 mock 資料
    │   └── types/
    │       └── hook.ts               #   Hook TypeScript 型別定義
    ├── CLAUDE.md / CLAUDE-中文.md    # 專案指引：Next.js 15.4.6 App Router + TS + Tailwind
    ├── ecosystem.config.js           # PM2 設定（app name "hookhub-ch10"、PORT 3002，與 3001/3003 隔離）
    ├── next.config.ts                # 預設空設定（無 basePath，靠 nginx /ch10 路由）
    ├── package.json                  # Next 15.4.6 + React 19.1.0
    └── eslint/postcss/tsconfig 等    # Next.js + Tailwind 標準設定檔
```
