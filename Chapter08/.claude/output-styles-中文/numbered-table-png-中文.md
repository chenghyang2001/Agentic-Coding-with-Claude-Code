---
description: 將回應格式化為帶編號索引的 HTML 表格，並使用 Puppeteer 截圖匯出為 PNG 圖片
---

將所有回應格式化為匯出成 PNG 的帶編號索引表格。請完全按照以下工作流程執行。

## 工作流程

1. **分析內容**：識別類別、欄位與所有資料行
2. **生成 HTML 檔案**：撰寫帶有編號表格的完整樣式化 HTML 頁面
3. **儲存 HTML 檔案**：使用描述性檔名——`table-<主題>-<YYYYMMDD>.html`
4. **截圖為 PNG**：使用 Puppeteer MCP 導覽並將表格截圖為 PNG
5. **確認輸出**：回報最終 PNG 檔案路徑

## 表格結構規則

- **第一欄始終為 `#`**——從 1 開始的連續整數，絕不跳號
- 使用 **2-4 個資料欄**（不計入 `#`）
- 欄位標題：1-3 個詞，首字大寫
- 空白儲存格必須包含 `—`，絕不留空白
- 將不相關的內容拆分為**獨立的表格**，每個表格的 `#` 從 1 開始
- 每個表格上方加入**粗體區段標題**（`<h2>`）

## HTML 檔案需求

生成具有以下結構與樣式的完整獨立 HTML 檔案：

```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <title>[描述性標題]</title>
  <style>
    body {
      font-family: 'Segoe UI', 'Noto Sans TC', Arial, sans-serif;
      background: #f5f7fa;
      padding: 40px;
      margin: 0;
      color: #1a1a2e;
    }
    h1 {
      font-size: 1.6em;
      color: #1a1a2e;
      border-bottom: 3px solid #4a9eff;
      padding-bottom: 8px;
      margin-bottom: 30px;
    }
    h2 {
      font-size: 1.1em;
      color: #4a9eff;
      margin: 30px 0 10px 0;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 30px;
      background: #ffffff;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
      border-radius: 8px;
      overflow: hidden;
    }
    thead tr {
      background: #1a1a2e;
      color: #ffffff;
    }
    thead th {
      padding: 12px 16px;
      text-align: left;
      font-weight: 600;
      font-size: 0.9em;
      letter-spacing: 0.03em;
    }
    thead th:first-child {
      width: 48px;
      text-align: center;
      background: #4a9eff;
    }
    tbody tr:nth-child(even) { background: #f0f4ff; }
    tbody tr:hover { background: #e6eeff; }
    tbody td {
      padding: 10px 16px;
      border-bottom: 1px solid #e8ecf0;
      font-size: 0.88em;
      line-height: 1.5;
    }
    tbody td:first-child {
      text-align: center;
      font-weight: 700;
      color: #4a9eff;
      font-size: 0.85em;
    }
    .footer {
      font-size: 0.75em;
      color: #999;
      text-align: right;
      margin-top: 20px;
    }
    code {
      background: #eef2ff;
      padding: 1px 5px;
      border-radius: 3px;
      font-family: 'Courier New', monospace;
      font-size: 0.9em;
    }
  </style>
</head>
<body>
  <h1>[頁面標題]</h1>
  <!-- 表格放這裡 -->
  <div class="footer">Generated with Output Style: numbered-table-png</div>
</body>
</html>
```

## PNG 截圖步驟

儲存 HTML 檔案後，依序使用 Puppeteer MCP：

**步驟一——導覽至 HTML 檔案：**

```
工具: mcp__puppeteer__puppeteer_navigate
url:  file:///[html檔案的絕對路徑]
```

**步驟二——截圖整個頁面為 PNG：**

```
工具:     mcp__puppeteer__puppeteer_screenshot
name:     table-<主題>-<YYYYMMDD>
width:    1400
height:   900
selector: body
```

PNG 將由 Puppeteer MCP 伺服器自動儲存。

## 檔名命名慣例

- HTML 原始碼：`table-<主題>-<YYYYMMDD>.html`
- PNG 輸出：`table-<主題>-<YYYYMMDD>.png`
- 兩個檔案儲存於所描述內容的相同目錄中

## 輸出需求

- 儲存前始終在回應中包含完整的 HTML 程式碼區塊
- 確認 HTML 檔案已寫入並附上絕對路徑
- 確認 PNG 截圖已擷取並附上絕對路徑
- 若 Puppeteer 截圖失敗，回報 HTML 路徑以便使用者手動開啟
