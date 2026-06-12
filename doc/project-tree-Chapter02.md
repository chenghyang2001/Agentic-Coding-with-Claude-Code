# 專案樹狀結構 — Chapter02

> 生成日期：2026-06-12 ｜ 掃描目標：`C:\Users\B00332\workspace\Agentic-Coding-with-Claude-Code\Chapter02`
> 統計：22 個資料夾 / 98 個檔案（已排除 2 個噪音目錄）
> 由 `project-tree` skill 生成

```
Chapter02/                                # 無限代理迴圈 + 多代理協作（HookHub 主戰場）
├── hookhub/
│   ├── hookhub/                          # HookHub Next.js 15 應用（已部署 VPS PORT 3001，CI/CD 自動部署）
│   │   ├── .claude/
│   │   │   ├── commands/
│   │   │   │   ├── infinite.md           #     無限代理迴圈指令（spec 驅動的多輪變體生成）
│   │   │   │   └── infinite-中文.md      #     上述指令的繁中翻譯版
│   │   │   └── session-state.md          #     session 狀態記錄
│   │   ├── memory/
│   │   │   ├── frontend/
│   │   │   │   └── CLAUDE.md             #     資深前端工程師 persona（React/Next/TS/Tailwind 編碼準則）
│   │   │   └── spec/
│   │   │       ├── CLAUDE.md             #     HookHub 產品規格（社群驅動的 Hook 探索/分享平台）
│   │   │       └── CLAUDE-中文.md        #     上述規格的繁中翻譯版
│   │   ├── public/                       #   *.svg × 5（Next.js 預設靜態圖示）
│   │   ├── specs/                        #   *.spec.md × 20（頁面/元件/API routes/13 個 app 範例規格）
│   │   ├── specs-中文/                   #   *.spec-中文.md × 20（上述規格的繁中翻譯）
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── globals.css           #     Tailwind 全域樣式
│   │   │   │   ├── layout.tsx            #     根 layout（metadata + 字型）
│   │   │   │   └── page.tsx              #     首頁（組裝 Hero/Section/卡片/FAQ/Footer）
│   │   │   ├── components/
│   │   │   │   ├── heros/                #     Hero*.tsx × 10（無限迴圈生成的 10 種 Hero 風格變體）
│   │   │   │   ├── sections/
│   │   │   │   │   ├── SectionHowItWorks.tsx    # 「怎麼運作」區塊元件
│   │   │   │   │   └── SectionTestimonials.tsx  # 使用者見證區塊元件
│   │   │   │   ├── Footer.tsx            #     頁尾元件
│   │   │   │   └── HookCard.tsx          #     Hook 卡片元件
│   │   │   ├── data/
│   │   │   │   └── hooks.json            #     Hook 範例 mock 資料
│   │   │   └── types/
│   │   │       └── hook.ts               #     Hook TypeScript 型別定義
│   │   ├── .gitignore                    #   Next.js 標準排除（node_modules/coverage 等）
│   │   ├── CLAUDE.md / CLAUDE-中文.md    #   專案指引：Next.js 15.4.6 App Router + TS + Tailwind
│   │   ├── DEPLOYMENT.md                 #   VPS 部署文件（佔位，62 bytes）
│   │   ├── ecosystem.config.js           #   PM2 設定（__dirname 動態 cwd，跨機器可移植）
│   │   ├── nginx-hookhub.conf            #   nginx 反向代理設定
│   │   ├── next.config.ts                #   含 outputFileTracingRoot 修復 workspace root 誤判（樣式空白坑）
│   │   ├── package.json                  #   Next ^15.5.9 + React 19.1.0
│   │   └── eslint/postcss/tsconfig 等    #   Next.js + Tailwind 標準設定檔
│   ├── static/
│   │   └── banner.png                    #   HookHub 橫幅圖
│   └── nginx-hookhub-merged.conf         #   nginx 多 server block 合併版設定（單一 conf 服務多章節）
└── hookhub2/                             # 多代理協作版（5 agent 團隊，無應用程式碼，純 agent 定義）
    └── .claude/
        ├── agents/                       #   *.md × 5（prd-writer / system-architect / python-backend-dev /
        │                                 #     react-typescript-specialist / ui-designer）
        ├── agents-中文/                  #   上述 5 個 agent 的繁中翻譯版
        └── session-state.md              #   session 狀態記錄
```
