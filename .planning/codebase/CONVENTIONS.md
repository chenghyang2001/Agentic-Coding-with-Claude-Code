# Coding Conventions

**Analysis Date:** 2026-07-15

> 本 repo 是 Packt 書籍《Agentic Coding with Claude Code》官方範例的演練層，混合四種語言生態：TypeScript/Next.js（HookHub × 3 份同構副本）、Python（uv 管理的 MCP/Hook 腳本）、Shell（skill 腳本）、Markdown（`.claude/` 設定檔 + 繁中翻譯）。慣例以「上游原檔照抄 + 自有產出遵循全域規則」為主軸。

## Naming Patterns

**Files:**

- React 元件：PascalCase，`.tsx` 副檔名 — `Chapter02/hookhub/hookhub/src/components/HookCard.tsx`、`Footer.tsx`
- 元件變體以「基底名 + 風格後綴」命名：`src/components/heros/Hero.tsx`、`HeroNeon.tsx`、`HeroGlass.tsx`、`HeroTerminal.tsx`（共 10 個變體）
- 區塊元件以 `Section` 前綴：`src/components/sections/SectionHowItWorks.tsx`、`SectionTestimonials.tsx`
- TypeScript 型別檔：小寫單數，`src/types/hook.ts`
- Python 腳本：snake_case — `play_sound.py`、`merge_hooks_wav.py`、`verbose_mcp_server.py`、`statusline.py`
- Shell 腳本：snake_case — `Chapter09/.claude/skills/git-pushing/scripts/smart_commit.sh`
- 產品規格文件：`<主題>.spec.md`（注意：**是產品規格，不是測試檔**）— `Chapter02/hookhub/hookhub/specs/homepage.spec.md` 等 20 檔
- 展示用批次檔：`ch<NN>_` 前綴 — `Chapter03/ch03_demo_all_hooks_order.bat`
- WAV 音效檔：Hook 事件名（英文 PascalCase 或繁中）— `PreToolUse.wav`、`工具使用前.wav`

**中文化翻譯檔命名（本 repo 鐵律，root `CLAUDE.md` 明定）:**

- 翻譯版 = 原名 + `-中文` 後綴：`README-中文.md`、`prd-writer-中文.md`、`specs-中文/`、`agents-中文/`
- **禁止 `-zh` 後綴**（2026-06-12 已全 repo 清零，不可再引入）
- 上游英文原檔保留不動，翻譯是並存的新檔（目前 git 追蹤 55 個 `-中文` 檔）
- 查中文檔名必加 `git -c core.quotepath=false`，改檔名用 `git mv` 保留 rename 歷史

**Functions:**

- TypeScript：camelCase（`determine_commit_type` 例外在 shell）；React 元件函式 PascalCase + `export default function`（`HookCard`、`Home`、`RootLayout`）
- Python：snake_case — `merge_wav_files()`、`get_last_user_prompt()`、`fibonacci()`；進入點統一叫 `main()`
- Shell：snake_case — `determine_commit_type()`、`determine_scope()`；輸出輔助函式 `info()` / `warn()` / `error()`

**Variables:**

- TypeScript：camelCase（`featuredHooks`、`categoryStyle`）；模組層查表常數用 camelCase Record（`categoryStyles`、`languageColors`）
- Python：snake_case；模組層常數全大寫（`WAV_ORDER`、`BASE_DIR`、`OUTPUT` — `merge_hooks_wav.py:11-27`）
- Shell：全大寫（`CURRENT_BRANCH`、`STAGED_FILES`、`COMMIT_MSG`）

**Types:**

- Interface / Enum：PascalCase — `Hook`、`HookCategory`、`HookType`（`src/types/hook.ts`）
- Enum 成員：SCREAMING_SNAKE_CASE，值為人類可讀字串（`PRE_TOOL_USE = "PreToolUse"`）
- Props interface：`<元件名>Props` — `HookCardProps`（`HookCard.tsx:3`）

## Code Style

**Formatting:**

- 無 Prettier 設定檔（未偵測到 `.prettierrc`）；依 Next.js 預設風格
- TypeScript/TSX：2 空格縮排、單引號 import + JSX 屬性雙引號混用（照上游原樣）
- Python：4 空格縮排、UTF-8；執行時加 `PYTHONUTF8=1`（Windows cp950 環境防禦）

**Linting:**

- ESLint 9（flat config）：`Chapter02/hookhub/hookhub/eslint.config.mjs`（三份 HookHub 各自一份，同構）
- 規則集：`next/core-web-vitals` + `next/typescript`（透過 `@eslint/eslintrc` FlatCompat）
- 執行：`npm run lint`
- Python 無 ruff/flake8 設定；`pyproject.toml` 僅宣告依賴（`fastmcp>=2.12.4` / `pygame`）

**TypeScript 設定（`tsconfig.json`，三份 HookHub 同構）:**

- `strict: true`、`target: ES2017`、`moduleResolution: bundler`、`resolveJsonModule: true`

## Import Organization

**Order（觀察自 `src/app/page.tsx`、`play_sound.py`）:**

1. TypeScript：元件 import（`@/components/...`）→ 型別（`@/types/hook`）→ 資料（`@/data/hooks.json`）；Next.js 內建（`next/font/google`、`next/server`）在最前
2. Python：標準庫 → 第三方（`pygame`、`fastmcp`）→ 本地（本 repo 腳本皆單檔，無本地 import）

**Path Aliases:**

- `@/*` → `./src/*`（三份 HookHub `tsconfig.json` 皆有）— 元件間引用一律用 `@/`，不用相對路徑

## Error Handling

**Python patterns（本 repo 自有產出遵循全域 code-quality 規則）:**

- 具體例外類型 + 兜底：`except (FileNotFoundError, ValueError)` → `except Exception`，錯誤印到 `sys.stderr` + `sys.exit(1)`（`merge_hooks_wav.py:106-111`）
- **主功能與 log 各自獨立 try/except**：log 寫入失敗只印警告、不中斷音效播放（`play_sound.py:30-37`）
- 資源清理放 `finally`：`pygame.mixer.quit()`（`play_sound.py:41-42`）
- 前置驗證 + 明確 raise：格式不符即 `raise ValueError`（含期望值 vs 實際值），避免輸出破損資料（`merge_hooks_wav.py:68-82`）
- Hook/statusline 腳本必須永不 crash：`statusline.py:80-82` 用兜底 except 印 fallback 字串（status line 壞掉不能拖垮 Claude Code）

**Shell patterns:**

- `set -e` 開頭（`smart_commit.sh:5`）
- 外部指令失敗有 fallback：`claude -p ... || echo ""` 失敗時改用模板訊息（`smart_commit.sh:87-106`）
- 彩色輸出函式 `info`/`warn`/`error`，error 導向 stderr

**TypeScript patterns:**

- HookHub 為純靜態展示頁，無 API 呼叫；防禦以查表 fallback 為主：`categoryStyles[hook.category] || {預設}`（`HookCard.tsx:27`）、`languageColors[...] || 'bg-...'`（`HookCard.tsx:54`）
- Optional 欄位用條件渲染：`{hook.featured && ...}`、`{hook.stars && ...}`

## Logging

**Framework:** 無框架 — Python 用 `print()`，前端無 console 呼叫

**Patterns:**

- Hook 事件記錄：append 到 `Chapter03/hooks-notification/hook-events.log`，格式 `YYYY-MM-DD HH:MM:SS | filename.wav`（`play_sound.py:29-34`）
- PM2 log：`ecosystem.config.js` 指定 `logs/hookhub-out.log` / `hookhub-err.log`，`log_date_format: "YYYY-MM-DD HH:mm:ss"`
- 進度回報用 print：批次處理每步印「已加入：xxx」（`merge_hooks_wav.py:88`）

## Comments

**When to Comment（本 repo 自有產出 vs 上游原檔有明顯分界）:**

- 自有產出（部署設定、Hook 腳本）：**繁體中文註解，寫「為什麼」不寫「做什麼」**，含踩坑紀錄 — 例：`next.config.ts` 註明「%USERPROFILE% 有 package-lock.json 會讓 Next.js 誤判 workspace root」；`ecosystem.config.js` 每個欄位都有理由註解（「512MB 自動重啟防止記憶體洩漏讓 VPS 癱瘓」）
- 上游原檔（HookCard、statusline.py、verbose_mcp_server.py）：英文註解，保留不動
- 例外：`Chapter04/context-engineering-mcp/verbose_mcp_server.py` 的冗長英文 docstring 是**刻意的反面教材**（示範 token 浪費），不可翻譯或精簡

**Docstring:**

- Python 自有產出：繁中 Google-style docstring，含 Args / Returns / Raises（`merge_wav_files()` — `merge_hooks_wav.py:31-47`）
- 模組層 docstring 說明用途與設計理由（`merge_hooks_wav.py:1-5`）

## Function Design

**Size:** 單一職責、多數 < 60 行；核心邏輯抽成獨立函式（`merge_wav_files`）、`main()` 只做組裝 + 錯誤處理

**Parameters:** Python 自有產出使用 type hints（`file_paths: list[Path], output_path: Path`）；上游檔案（`statusline.py`、`fibonacci`）無 type hints — 新增程式碼應加

**Return Values:** 明確回傳型別註記（`-> int`、`-> None`）；React 元件 `export default function` 直接回傳 JSX

## Module Design

**Exports:**

- React 元件一律 `export default function <PascalCase>`；型別用具名 export（`export interface Hook`、`export enum HookCategory`）
- Python 腳本皆為單檔可執行模組：`if __name__ == "__main__": main()` 收尾

**Barrel Files:** 不使用 — 元件直接以完整路徑 import（`@/components/heros/HeroNeon`）

## `.claude/` 設定檔慣例（本 repo 教材主體）

**Agent `.md` 結構**（`Chapter02/hookhub2/.claude/agents/`、`Chapter07/.claude/agents/`）：

- YAML frontmatter：`name` / `version` / `description`（含 `<example>` 使用範例）/ `tools` / `model` / `color`
- Body 為純自然語言人設與行為規則，不含可執行程式碼

**翻譯規則（root `CLAUDE.md` 明定，翻譯任何 `.claude/` 設定或文件時遵守）:**

- Frontmatter `name`/`model`/`tools`/`color`/`version` → 保留英文（程式識別碼）；`description` → 翻譯
- Body 說明文字、觸發詞 → 翻譯；程式碼區塊 bash 指令 → 保留原文；程式碼區塊內說明字串 → 翻譯

**Hook 綁定**（`Chapter03/hooks-notification/.claude/settings.json`）：

- command 先 `cd` 到專案目錄（Hook 執行時 CWD 不固定）、路徑用 `%USERPROFILE%` 不硬編碼使用者名、`&&` 串接多指令（前者失敗後者不執行）
- 腳本內部用 `Path(__file__).parent` 推算絕對路徑，不依賴 CWD

## 跨機器可攜性（硬規則）

- 所有設定與腳本**禁止硬編碼 `C:\Users\<name>\`**：Python 用 `Path(__file__).parent` / `Path.home()`；settings.json 用 `%USERPROFILE%`；`ecosystem.config.js` 用 `__dirname`
- PM2 設定必含 `HOSTNAME: "127.0.0.1"`（loopback only，nginx 對外代理）— v2 有、v1 待補
- `next.config.ts` 必含 `outputFileTracingRoot`（修復 workspace root 誤判）

## Git 慣例

- Commit message：繁體中文「動詞 + 簡短說明」（新增/修復/重構/更新/移除），commit 後直接 push
- `.gitignore` 排除：`node_modules/`、`.next/`、`.venv/`、`__pycache__/`、`*.stackdump`、`**/.claude/session-state.md`
- 三條 CI/CD 線（`.github/workflows/deploy-hookhub*.yml`）共用 `concurrency: group: vps-deploy`；YAML 內步驟名與註解用繁體中文

---

*Convention analysis: 2026-07-15*
