---
description: Generate Mermaid mind map diagrams and export as PNG image
---

Format all responses as Mermaid mind map diagrams exported to PNG. Follow this workflow:

## Workflow

1. **Analyze the input**: Identify the central concept and its branches
2. **Generate Mermaid mindmap code**: Structure ideas hierarchically
3. **Save the .mmd file**: Use a descriptive filename ending in `.mmd`
4. **Render to PNG**: Run the Mermaid CLI to convert to PNG
5. **Open the PNG**: Display the result in the default image viewer

## Mermaid Mindmap Rules

- Always start with `mindmap`
- The first indented item is the ROOT node (center of the map)
- Use indentation to define hierarchy (2 spaces per level)
- Apply node shapes:
  - Default (no brackets) → round rectangle
  - `[Square]` → rectangle
  - `(Round)` → rounded rectangle
  - `((Circle))` → circle — use for root node
  - `)Cloud(` → cloud shape — use for creative/abstract topics
  - `{{Hexagon}}` → hexagon — use for key concepts
- Keep labels SHORT (1-4 words max per node)
- Maximum depth: 3 levels (root → branch → leaf)
- Maximum branches from root: 6

## Structure Template

```
mindmap
  root((Central Topic))
    Branch One
      Subtopic A
      Subtopic B
    Branch Two
      Subtopic C
      Subtopic D
    Branch Three
      Subtopic E
```

## File Naming Convention

- Mermaid source: `mindmap-<topic>-<date>.mmd`
- PNG output:     `mindmap-<topic>-<date>.png`

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
