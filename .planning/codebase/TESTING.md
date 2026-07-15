# Testing Patterns

**Analysis Date:** 2026-07-15

> **核心事實：本 repo 沒有自動化測試套件。** 全 repo 找不到任何 `*.test.*` / `test_*.py` / jest / vitest / pytest 設定（`.venv` site-packages 內的除外）。這是書籍範例演練 repo，驗證策略是「建置必過 + 人工/截圖驗證 + Python 冒煙區塊」。以下記錄實際存在的驗證方式，勿假設有測試框架可呼叫。

## Test Framework

**Runner:**

- 未安裝任何測試框架（三份 HookHub 的 `package.json` scripts 只有 `dev` / `build` / `start` / `lint`；Python `pyproject.toml` 無 pytest 依賴）
- `Chapter02/hookhub/hookhub/CLAUDE.md` 明文記載：「No test framework is currently set up」

**Assertion Library:**

- 無

**Run Commands（實際的驗證指令）:**

```bash
# Next.js（三份 HookHub 通用；部署前必過）
cd Chapter02/hookhub/hookhub    # 或 Chapter10/v1-zealous-jemison/hookhub、Chapter10/v2-vigilant-feistel/hookhub
npm run build    # 建置驗證 —— 這就是「測試」的守門員
npm run lint     # ESLint（next/core-web-vitals + next/typescript）

# Python（uv 專案）
cd Chapter03/hooks-notification
uv sync
uv run play_sound.py ding.wav        # 冒煙執行
uv run merge_hooks_wav.py            # 跑一次即驗證（含格式檢查與錯誤路徑）

# Shell
bash -n Chapter09/.claude/skills/git-pushing/scripts/smart_commit.sh   # 語法檢查
```

## Test File Organization

**Location:**

- 不存在測試檔目錄

**⚠️ 命名陷阱：`specs/*.spec.md` 不是測試檔**

- `Chapter02/hookhub/hookhub/specs/` 下的 20 個 `*.spec.md`（如 `homepage.spec.md`、`api-routes.spec.md`）是**產品規格文件**（infinite agent loop 的生成藍圖），與測試框架的 `.spec` 慣例無關
- 對應繁中翻譯在 `specs-中文/`（`*.spec-中文.md` × 20）

## Test Structure

**驗證層級（實際採用的金字塔）:**

| 層級 | 對象 | 方式 | 證據位置 |
| ------ | ------ | ------ | --------- |
| 建置驗證 | Next.js × 3 | `npm run build` 必須成功才部署 | root `CLAUDE.md`、CI workflow 內建置步驟 |
| 視覺驗證 | 前端 UI | 瀏覽器 / Puppeteer / Playwright MCP 截圖 | `Chapter02/hookhub/hookhub/CLAUDE.md`「Testing Strategy」節 |
| 冒煙驗證 | Python 腳本 | `if __name__ == "__main__": main()` 區塊實跑一次 | `play_sound.py:45`、`merge_hooks_wav.py:114`、`Chapter07/main.py:32`、`Chapter08/statusline.py:84` |
| 端對端驗證 | VPS 部署 | `curl http://187.127.109.145/v2` 等 health check（注意不加尾斜線，避免 308） | root `CLAUDE.md` 部署陷阱節 |
| 事件驗證 | Claude Code Hooks | 觸發實際事件 + 檢查 `hook-events.log` | `Chapter03/hooks-notification/hook-events.log`、`table-hook-events-test-20260526.html` |

**Python 冒煙區塊 pattern（新增腳本必備）:**

```python
def main() -> None:
    try:
        # 主邏輯，print 進度
        ...
    except (FileNotFoundError, ValueError) as e:
        print(f"錯誤：{e}", file=sys.stderr)
        sys.exit(1)
    except Exception as e:
        print(f"未預期錯誤：{e}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()
```

（實例：`Chapter03/hooks-notification/merge_hooks_wav.py:93-115`）

**Patterns:**

- 前置驗證即測試：`merge_wav_files()` 開頭逐檔檢查存在性 + 格式一致性，不符即 raise，錯誤訊息含「實際值 vs 期望值」（`merge_hooks_wav.py:48-82`）
- 執行結果自我回報：印出可驗證的數字（frames 數、時長秒數），供人工比對（12 WAV → 23.51 秒是已知基準）

## Mocking

**Framework:** 無

**Patterns:**

- 不使用 mock；資料層以靜態 JSON 代替後端：`Chapter02/hookhub/hookhub/src/data/hooks.json` 是 HookHub 的 mock data，元件直接 import（`src/app/page.tsx:10`）
- Shell 腳本用 fallback 代替外部依賴失敗：`smart_commit.sh:87-106` 中 `claude -p` 失敗時退回模板 commit message

**What NOT to Mock:**

- 一切 —— 本 repo 沒有需要隔離的外部服務；Hook 音效、WAV 合併、MCP server 都直接實跑驗證

## Fixtures and Factories

**Test Data:**

- `Chapter02/hookhub/hookhub/src/data/hooks.json` — Hook 卡片展示資料（符合 `src/types/hook.ts` 的 `Hook` interface）
- `Chapter03/hooks-notification/*.wav` × 15 — Hook 音效即驗證素材（格式基準：mono / 22050 Hz / 16-bit）
- `Chapter07/main.py` — fibonacci 範例，專供 agent 審查/演示用的固定輸入

**Location:**

- 與被驗證程式同目錄（無獨立 fixtures 目錄）

## Coverage

**Requirements:** 無強制；`.gitignore` 已預留 `coverage/`、`.nyc_output/`、`.pytest_cache/` 排除項，但無任何工具產生它們

**View Coverage:**

```bash
# 不適用 —— 無 coverage 工具
```

## Test Types

**Unit Tests:**

- 不存在

**Integration Tests:**

- 不存在（自動化形式）；人工整合驗證 = Hook 事件實觸發 → `hook-events.log` 留痕 → 整理成 `table-hook-events-test-20260526.html` 結果表

**E2E Tests:**

- 無 Playwright/Cypress 套件；`Chapter02/hookhub/hookhub/CLAUDE.md` 指定策略為「Use Playwright MCP for UI testing, save screenshots in `/memory/screenshots`」（由 Claude Code MCP 工具執行，非 npm 依賴；`memory/` 目前有 `frontend/` 與 `spec/`，截圖目錄按需建立）
- VPS 部署後驗證：`curl` 三個端點（`/`＝3001、`/ch10`＝3002、`/v2`＝3003）

**CI 中的測試:**

- 三條 GitHub Actions workflow（`.github/workflows/deploy-hookhub*.yml`）**只做部署，無測試 job**；品質守門靠 VPS 端 `npm run build` 失敗即部署中斷

## Common Patterns

**新增程式碼時的驗證義務（依全域規則 + 本 repo 實況）:**

- Python：底部必加 `if __name__ == "__main__":` 冒煙區塊，寫完立即 `uv run` 一次
- Next.js/TSX：改動後 `npm run build` + `npm run lint` 必過，UI 變更用 Puppeteer/Playwright MCP 截圖確認
- Shell：`bash -n` 語法檢查；`smart_commit.sh` 型腳本設計為冪等（無變更時 `exit 0` 不報錯）
- Hook 綁定（settings.json）：實際觸發一次事件，確認 `hook-events.log` 有新行

**Error Testing（手動）:**

- 靠明確的錯誤路徑設計代替斷言：餵不存在的檔名給 `play_sound.py` → 印 `Error: ... not found` 而非 crash；餵格式不符 WAV 給 `merge_hooks_wav.py` → `ValueError` + exit 1

**已知驗證環境限制:**

- `ch03_demo_all_hooks_order.bat` 必須在原生 CMD 雙擊執行 —— Git Bash 下 `cmd //c` 會因 MSYS2 路徑轉換導致中文亂碼
- 中文 WAV 需 `Microsoft Hanhan Desktop` 聲音包，缺聲音包的機器直接用 repo 內預生成 WAV
- Health check 打 `/v2`（不含尾斜線），Next.js basePath 會把 `/v2/` 308 重定向

---

*Testing analysis: 2026-07-15*
