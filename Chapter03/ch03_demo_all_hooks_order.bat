@echo off
chcp 65001 > nul

:: Chapter03 Hook 事件音效完整演示腳本
:: 依照 Claude Code 一次完整互動的 Hook 觸發順序，
:: 依序播放英文版與中文版音效，驗證所有事件皆可正常播放。

set HOOK_DIR=%USERPROFILE%\workspace\Agentic-Coding-with-Claude-Code\Chapter03\hooks-notification
cd /d "%HOOK_DIR%"

echo ====================================================
echo  Chapter03 - Hook 事件音效完整演示
echo  觸發順序：UserPromptSubmit -> PreToolUse ->
echo            PostToolUse -> Stop -> Notification ->
echo            PreCompact
echo ====================================================
echo.

echo [1/6] UserPromptSubmit -- 使用者送出 Prompt
uv run play_sound.py UserPromptSubmit.wav && uv run play_sound.py 提交Prompt時.wav
echo.

echo [2/6] PreToolUse -- Claude 使用工具前
uv run play_sound.py PreToolUse.wav && uv run play_sound.py 工具使用前.wav
echo.

echo [3/6] PostToolUse -- Claude 使用工具後
uv run play_sound.py PostToolUse.wav && uv run play_sound.py 工具使用後.wav
echo.

echo [4/6] Stop -- Claude 回應結束
uv run play_sound.py Stop.wav && uv run play_sound.py 回應結束時.wav
echo.

echo [5/6] Notification -- 系統通知
uv run play_sound.py Notification.wav && uv run play_sound.py 系統通知時.wav
echo.

echo [6/6] PreCompact -- 壓縮 Context 前
uv run play_sound.py PreCompact.wav && uv run play_sound.py 壓縮Context前.wav
echo.

echo ====================================================
echo  演示完成！共播放 12 個音效（6 事件 x 2 語言版本）
echo ====================================================
