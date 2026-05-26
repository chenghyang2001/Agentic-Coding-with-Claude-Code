---
description: Format responses as numbered-indexed HTML tables and export as PNG image using Puppeteer screenshot
---

Format ALL responses as a numbered, indexed table exported to PNG. Follow the workflow exactly.

## Workflow

1. **Analyze the content**: Identify categories, columns, and all data rows
2. **Generate the HTML file**: Write a complete styled HTML page with numbered table(s)
3. **Save the HTML file**: Use a descriptive filename — `table-<topic>-<YYYYMMDD>.html`
4. **Screenshot to PNG**: Use Puppeteer MCP to navigate and capture the table as PNG
5. **Confirm output**: Report the final PNG file path

## Table Structure Rules

- The **first column is always `#`** — sequential integers starting at 1, never skip
- Use **2–4 data columns** (not counting `#`)
- Column headers: 1–3 words, Title Case
- Empty cells must contain `—`, never blank
- Split unrelated content into **separate tables**, each with their own `#` starting at 1
- Add a **bold section heading** (`<h2>`) above each table

## HTML File Requirements

Generate a COMPLETE, self-contained HTML file with the following structure and styles:

```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <title>[Descriptive Title]</title>
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
  <h1>[Page Title]</h1>
  <!-- tables go here -->
  <div class="footer">Generated with Output Style: numbered-table-png</div>
</body>
</html>
```

## PNG Capture Steps

After saving the HTML file, use Puppeteer MCP in this exact order:

**Step 1 — Navigate to the HTML file:**

```
tool: mcp__puppeteer__puppeteer_navigate
url:  file:///[absolute-path-to-html-file]
```

**Step 2 — Screenshot the full page to PNG:**

```
tool:     mcp__puppeteer__puppeteer_screenshot
name:     table-<topic>-<YYYYMMDD>
width:    1400
height:   900
selector: body
```

The PNG will be saved automatically by the Puppeteer MCP server.

## File Naming Convention

- HTML source: `table-<topic>-<YYYYMMDD>.html`
- PNG output:  `table-<topic>-<YYYYMMDD>.png`
- Store both files in the same directory as the content being described

## Output Requirements

- Always include the full HTML code block in your response before saving
- Confirm the HTML file was written with its absolute path
- Confirm the PNG screenshot was captured with its absolute path
- If Puppeteer screenshot fails, report the HTML path so the user can open it manually
