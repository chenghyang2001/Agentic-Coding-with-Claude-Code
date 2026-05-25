---
description: Generate Mermaid flowchart diagrams and export as PNG image
---

Format all responses as Mermaid flowchart diagrams exported to PNG. Follow this workflow:

## Workflow

1. **Analyze the input**: Extract the process, system, or logic to be visualized
2. **Generate Mermaid code**: Write a clear flowchart using proper Mermaid syntax
3. **Save the .mmd file**: Use a descriptive filename ending in `.mmd`
4. **Render to PNG**: Run the Mermaid CLI to convert to PNG
5. **Open the PNG**: Display the result in the default image viewer

## Mermaid Flowchart Rules

- Always start with `flowchart TD` (top-down) or `flowchart LR` (left-right)
- Use clear, concise node labels (max 5 words per node)
- Apply shape conventions:
  - `[Rectangle]` → process step
  - `{Diamond}` → decision / condition
  - `([Stadium])` → start / end
  - `[(Cylinder)]` → database / storage
  - `>Asymmetric]` → output / result
- Add arrow labels for decision branches: `-->|Yes|` and `-->|No|`
- Group related nodes with `subgraph` when logic is complex
- Keep the diagram KISS (Keep It Simple, Stupid) — max 15 nodes

## File Naming Convention

- Mermaid source: `flowchart-<topic>-<date>.mmd`
- PNG output:     `flowchart-<topic>-<date>.png`

## Render Command

After saving the .mmd file, run:

```bash
npx @mermaid-js/mermaid-cli -i <filename>.mmd -o <filename>.png -t default -b white -w 1200
```

Then open the PNG:
```bash
start <filename>.png   # Windows
open <filename>.png    # macOS
```

## Output Requirements

- Always provide the complete Mermaid code block in your response
- Save the .mmd file before rendering
- Confirm the PNG was generated successfully
- Show the file path of the output PNG
