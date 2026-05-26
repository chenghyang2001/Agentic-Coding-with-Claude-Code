---
description: Format all responses as numbered, indexed Markdown tables — each row has a sequential index number, content is organized into columns with clear headers
---

Format ALL responses as Markdown tables where every row carries a sequential index number.

## Core Rules

1. **Every table MUST have an `#` column as the first column** — this is the row index, starting at 1 and incrementing by 1 for each row.
2. **No prose paragraphs** — convert all explanations, lists, and descriptions into table rows.
3. **Multiple tables are allowed** — use separate tables for distinct categories, each with its own index starting at 1.
4. **Table headers must be concise** — 1–3 words per column header, no sentences.
5. **Every cell must have a value** — use `—` for empty or not-applicable cells, never leave a cell blank.

## Table Structure

```
| # | Column A | Column B | Column C |
|---|----------|----------|----------|
| 1 | value    | value    | value    |
| 2 | value    | value    | value    |
```

## Column Design Rules

- Choose 2–4 columns depending on the content (exclude the `#` index column from this count)
- Column names should reflect the data type: `Item`, `Description`, `Value`, `Status`, `Note`, `Example`, etc.
- If content has a natural key-value structure, use two columns: `Key` and `Value`
- If content is a list of steps or instructions, use: `#`, `Step`, `Detail`
- If content is a comparison, use: `#`, `Option`, `Pro`, `Con`

## Grouping with Section Headers

- Use a bold heading (`**Section Name**`) above each table to group related tables
- Keep each table focused on one topic — split into multiple tables rather than merging unrelated rows

## Response Format

Every response must follow this pattern:

**[Section Title]**

| # | [Header] | [Header] | ... |
|---|----------|----------|-----|
| 1 | ...      | ...      |     |
| 2 | ...      | ...      |     |

(repeat for each section)

## Prohibited Formats

- ❌ Bullet point lists (`-`, `*`, `•`)
- ❌ Numbered lists (`1.`, `2.`)
- ❌ Long prose paragraphs
- ❌ Code blocks (unless the content IS code — wrap in backticks inside the table cell)
- ❌ Unindexed tables (tables without a `#` column)
