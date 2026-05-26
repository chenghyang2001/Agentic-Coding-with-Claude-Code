# Hook 音效播放清單

## 播放順序（每個 Hook 事件依序播放英文 → 中文）

| Hook 事件         | 英文 WAV              | 中文 WAV         |
|-------------------|-----------------------|-----------------|
| PreToolUse        | PreToolUse.wav        | 工具使用前.wav   |
| PostToolUse       | PostToolUse.wav       | 工具使用後.wav   |
| UserPromptSubmit  | UserPromptSubmit.wav  | 提交Prompt時.wav |
| Stop              | Stop.wav              | 回應結束時.wav   |
| Notification      | Notification.wav      | 系統通知時.wav   |
| PreCompact        | PreCompact.wav        | 壓縮Context前.wav|

## 其他音效

| 檔案       | 說明                             |
|------------|----------------------------------|
| ding.wav   | 預設音效（play_sound.py 無參數時）|
| ulala.wav  | 原始示範音效                     |

## 執行記錄

Hook 觸發紀錄儲存於：`hook-events.log`（同目錄，自動建立）

格式：`YYYY-MM-DD HH:MM:SS | 音效檔名`
