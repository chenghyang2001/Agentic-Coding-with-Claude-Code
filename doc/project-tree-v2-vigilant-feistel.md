# 專案樹狀結構 — v2-vigilant-feistel

> 生成日期：2026-06-12 ｜ 掃描目標：`C:\Users\B00332\workspace\Agentic-Coding-with-Claude-Code\Chapter10\v2-vigilant-feistel`
> 統計：10 個資料夾 / 27 個檔案（已排除 2 個噪音目錄）
> 由 `project-tree` skill 生成

```
v2-vigilant-feistel/                  # Chapter10 v2 HookHub（VPS PORT 3003，basePath=/v2）
└── hookhub/                          # Next.js 15.4.6 精簡版 HookHub（與 v1 同構，路由策略不同）
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
    │   │   ├── globals.css           #   Tailwind 全域樣式（2.7KB，比 v1 多自訂樣式）
    │   │   ├── layout.tsx            #   根 layout（metadata + 字型）
    │   │   └── page.tsx              #   首頁（Hook 清單頁）
    │   ├── components/
    │   │   └── HookCard.tsx          #   Hook 卡片元件（本版唯一元件）
    │   ├── data/
    │   │   └── hooks.json            #   Hook 範例 mock 資料（5.8KB，比 v1 精簡）
    │   └── types/
    │       └── hook.ts               #   Hook TypeScript 型別定義
    ├── CLAUDE.md / CLAUDE-中文.md    # 專案指引：Next.js 15.4.6 App Router + TS + Tailwind
    ├── ecosystem.config.js           # PM2 設定（app name "hookhub-v2"、PORT 3003，與 3001/3002 隔離）
    ├── next.config.ts                # basePath: "/v2" — 讓 Next.js 感知 nginx /v2 前綴（Link/API 以 /v2 為根）
    ├── package.json                  # Next 15.4.6 + React 19.1.0
    └── eslint/postcss/tsconfig 等    # Next.js + Tailwind 標準設定檔
```
