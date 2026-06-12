# 專案樹狀結構 — Chapter03

> 生成日期：2026-06-12 ｜ 掃描目標：`C:\Users\B00332\workspace\Agentic-Coding-with-Claude-Code\Chapter03`
> 統計：5 個資料夾 / 32 個檔案（已排除 2 個噪音目錄）
> 由 `project-tree` skill 生成（子資料夾引數測試）

```
Chapter03/                                # 自訂指令 + Hooks 音效通知系統
├── custom commands/
│   └── .claude/
│       └── commands/                     # *.md × 4（commit-code / dad-joke 指令，各含中文版）
├── hooks-notification/                   # Hook 音效通知實作（6 事件 × 2 WAV）
│   ├── .claude/
│   │   ├── session-state.md              #   session 狀態記錄
│   │   └── settings.json                 #   6 個 Hook 事件 → play_sound.py 的綁定設定（英文+中文音各播一次）
│   ├── .python-version                   #   Python 版本鎖定
│   ├── play_sound.py                     #   pygame 播放 WAV 的 Hook 腳本（含 log）
│   ├── merge_hooks_wav.py                #   合併 12 WAV 為單一展示音檔（純標準庫 wave）
│   ├── *.wav × 15                        #   6 事件英文音 + 6 事件中文音 + ding/ulala/合併檔
│   ├── hook-events.log                   #   Hook 觸發紀錄
│   ├── wav-playlist.md                   #   音檔清單說明
│   ├── table-hook-events-test-20260526.html  # Hook 事件測試結果表格
│   ├── pyproject.toml                    #   uv 專案設定（依賴 pygame>=2.6.1）
│   ├── uv.lock                           #   uv 依賴鎖定
│   └── README.md / README-中文.md        #   Hooks 教學說明（英文 + 繁中）
└── ch03_demo_all_hooks_order.bat         # CMD 依序播放 12 音效的展示腳本
```
