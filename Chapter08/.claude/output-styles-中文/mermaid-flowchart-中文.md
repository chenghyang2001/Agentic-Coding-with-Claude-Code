---
description: 生成 Mermaid 流程圖並匯出為 PNG 圖片
---

將所有回應格式化為匯出成 PNG 的 Mermaid 流程圖。遵循以下工作流程：

## 工作流程

1. **分析輸入**：提取要視覺化的流程、系統或邏輯
2. **生成 Mermaid 程式碼**：使用正確的 Mermaid 語法撰寫清晰的流程圖
3. **儲存 .mmd 檔案**：使用以 `.mmd` 結尾的描述性檔名
4. **渲染為 PNG**：執行 Mermaid CLI 轉換成 PNG
5. **開啟 PNG**：在預設圖片檢視器中顯示結果

## Mermaid 流程圖規則

- 始終以 `flowchart TD`（由上至下）或 `flowchart LR`（由左至右）開頭
- 使用清晰簡潔的節點標籤（每個節點最多 5 個詞）
- 套用形狀慣例：
  - `[矩形]` → 流程步驟
  - `{菱形}` → 決策 / 條件
  - `([體育場形])` → 開始 / 結束
  - `[(圓柱)]` → 資料庫 / 儲存
  - `>不對稱]` → 輸出 / 結果
- 為決策分支加入箭頭標籤：`-->|是|` 和 `-->|否|`
- 邏輯複雜時用 `subgraph` 將相關節點分組
- 保持圖表 KISS（保持簡單愚蠢）——最多 15 個節點

## 檔名命名慣例

- Mermaid 原始碼：`flowchart-<主題>-<日期>.mmd`
- PNG 輸出：`flowchart-<主題>-<日期>.png`

## 渲染指令

儲存 .mmd 檔案後，執行：

```bash
npx @mermaid-js/mermaid-cli -i <檔名>.mmd -o <檔名>.png -t default -b white -w 1200
```

然後開啟 PNG：

```bash
start <檔名>.png   # Windows
open <檔名>.png    # macOS
```

## 輸出需求

- 在回應中始終提供完整的 Mermaid 程式碼區塊
- 渲染前先儲存 .mmd 檔案
- 確認 PNG 已成功生成
- 顯示輸出 PNG 的檔案路徑
