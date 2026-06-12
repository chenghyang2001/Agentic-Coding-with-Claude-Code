# 專案樹狀結構 — hooks-notification

> 生成日期：2026-06-12 ｜ 掃描目標：`C:\Users\B00332\workspace\Agentic-Coding-with-Claude-Code\Chapter03\hooks-notification`
> 統計：1 個資料夾 / 27 個檔案（已排除 2 個噪音目錄）
> 由 `project-tree` skill 生成

```
hooks-notification/                       # Chapter03 Hook 音效通知系統（6 事件 × 英文/中文雙音效）
├── .claude/
│   ├── session-state.md                  #   session 狀態記錄
│   └── settings.json                     #   6 個 Hook 事件綁定：每事件 uv run play_sound.py 連播英文+中文 WAV
├── .python-version                       # Python 版本鎖定
├── play_sound.py                         # pygame 播放 WAV 的 Hook 腳本（含觸發 log 寫入）
├── merge_hooks_wav.py                    # 合併 12 WAV 為單一展示音檔（純標準庫 wave，零外部依賴）
├── *.wav × 15                            # 6 事件英文音（PreToolUse/PostToolUse/Stop/Notification/
│                                         #   UserPromptSubmit/PreCompact）+ 6 事件中文音（工具使用前/後、
│                                         #   回應結束時、系統通知時、提交Prompt時、壓縮Context前）
│                                         #   + ding/ulala 素材 + ch03_all_hooks_combined 合併檔（23.51 秒）
├── hook-events.log                       # Hook 觸發紀錄（時間戳 + 播放的 WAV 檔名）
├── wav-playlist.md                       # 音檔清單與播放順序說明
├── table-hook-events-test-20260526.html  # Hook 事件測試結果表格（numbered-table style 產出）
├── pyproject.toml                        # uv 專案設定（依賴 pygame>=2.6.1）
├── uv.lock                               # uv 依賴鎖定檔
├── README.md                             # Hooks 教學說明（英文原文：什麼是 Hook、聲音通知範例）
└── README-中文.md                        # 上述教學的繁中翻譯版
```
