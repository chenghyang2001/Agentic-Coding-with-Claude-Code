# Agentic Coding with Claude Code — 深度解析文件
## 作者：Eden Marco（Packt 出版）
## 文件用途：NotebookLM 知識庫來源素材

---

## 書籍總覽

本書《Agentic Coding with Claude Code》由 Eden Marco 撰寫，由 Packt 出版社發行。書籍示範程式碼托管於 GitHub：`PacktPublishing/Agentic-Coding-with-Claude-Code`。本書從 Claude Code 的基礎使用，到進階的 Agentic 工作流程，涵蓋了 MCP（Model Context Protocol）伺服器設計、Hooks 機制、自訂指令、Sub-agents 協作、Output Styles、Skills 工作流程，以及桌面應用整合等十個核心主題。

全書共 11 章，其中第 1、2、3、4、7、8、9、10 章附有完整的範例程式碼，第 5、6、11 章為純概念說明。本書以 HookHub（Claude Code Hooks 社群平台）作為貫穿全書的核心實作專案，逐章疊加功能，讓讀者在完整的實際專案脈絡中學習每一個技術主題。

---

## 第八章：Output Styles 與 Status Line（輸出樣式與狀態列）

### 核心概念

第八章介紹 Claude Code 的兩個使用者體驗功能：
1. **Output Styles**：定義 Claude 回應的格式和風格的預設檔案
2. **Status Line**：Claude Code 狀態列的自訂，透過 Python 腳本動態顯示上下文資訊

### Output Styles 系統

Output Styles 定義在 `.claude/output-styles/` 目錄。每個 `.md` 檔案定義一種輸出風格，使用者可以切換不同風格，Claude 會自動調整其回應格式。

**retro-ascii-blog.md**（復古 ASCII 部落格風格）：

```markdown
---
description: Format responses as retro HTML pages with ASCII art styling
---

Format all responses as complete HTML pages with retro ASCII art blog styling.

## Workflow
- Save the HTML file after writing it
- OPEN the generated file in the default web browser

## HTML Structure
- Complete HTML5 documents
- Use semantic HTML elements

## ASCII Art Styling
- Use ASCII art for headers and dividers
- Create borders using: ═, ║, ╔, ╗, ╚, ╝, -, |, +, *, #
- Use monospace fonts (Courier New, Monaco, Consolas)
- Dark background (#1a1a1a) with light text
- Retro color schemes (green on black, amber on black)
```

啟用這個 Output Style 後，Claude 的每個回應都會輸出一個完整的 HTML 頁面，包含 ASCII 藝術標題、復古終端機配色、並自動在瀏覽器中開啟展示。

**yaml-concise.md**（精簡 YAML 風格）：
```markdown
---
description: Concise YAML-structured responses with minimal explanations
---

Format all responses in YAML structure:
- Use clear key-value pairs
- Provide direct answers without verbose explanations
- Structure information hierarchically
- Keep explanations minimal
```

### Status Line 動態顯示

`statusline.py` 是本章的核心技術示範——一個讀取 Claude Code transcript 並在狀態列顯示動態資訊的 Python 腳本：

```python
def get_last_user_prompt(transcript_path):
    """從 transcript 檔案提取最後一個使用者輸入。"""
    lines = content.strip().split('\n')
    user_prompts = []
    
    for line in lines:
        entry = json.loads(line)
        if (entry.get('type') == 'user' and 
            entry.get('message', {}).get('role') == 'user'):
            # 跳過命令訊息和 meta 訊息
            content_text = extract_text(entry)
            if not content_text.startswith('<command-name>'):
                user_prompts.append(content_text.strip())
    
    # 回傳最後一個，截斷到 50 字元
    last_prompt = user_prompts[-1]
    return last_prompt[:47] + "..." if len(last_prompt) > 50 else last_prompt

def main():
    input_data = json.load(sys.stdin)
    output_style = input_data.get('output_style', {}).get('name', 'default')
    transcript_path = input_data.get('transcript_path', '')
    last_prompt = get_last_user_prompt(transcript_path)
    
    # 用 ANSI 顏色碼輸出狀態列
    print(f"\033[1;32mStyle: {output_style}\033[0m "
          f"\033[1;36mLast Prompt: {last_prompt}\033[0m")
```

**運作機制**：
- Claude Code 透過 stdin 傳入 JSON（包含 `output_style.name` 和 `transcript_path`）
- 腳本讀取 transcript 檔案，過濾出真實的使用者訊息
- 用 ANSI 顏色碼輸出格式化的狀態列字串
- Claude Code 在畫面底部顯示此腳本的輸出

### Status Line 的實用性

Status Line 的最大用處是讓使用者在長時間工作後，快速知道：
1. 目前使用的 Output Style 是什麼
2. 上次問 Claude 的問題是什麼（特別在 Claude 長時間處理中，提醒使用者任務脈絡）

### Output Styles 的實際應用場景

- **技術文件撰寫**：使用 YAML 精簡風格，獲得結構化、可直接複製的輸出
- **部落格文章**：使用 HTML 風格，直接產出可發布的網頁內容
- **視覺呈現**：使用 ASCII 藝術風格，在終端機創造視覺豐富的回應
- **程式碼任務**：預設風格，Claude 根據任務自然選擇適合的格式

---
