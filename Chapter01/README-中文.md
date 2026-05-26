# 優化 Claude Code 的 MCP 情境（Context）

本教學示範如何透過使用專案專屬的 MCP 設定（而非載入所有可用的 MCP 伺服器），將 Claude Code 的情境 token 消耗降至最低。

## 問題所在

當你使用包含多個 MCP 伺服器的通用 [.mcp.json](https://docs.claude.com/en/docs/claude-code/mcp) 檔案時，Claude Code 會將所有伺服器的工具及其描述全部載入到情境視窗（context window）中。即使你只需要其中一小部分功能，這也會消耗大量 token。

## 解決方案

使用 `--mcp-config` 旗標來載入針對當前任務量身訂製的最小化、專案專屬 MCP 設定。

## 教學步驟

### 步驟一：[冗長的 MCP 伺服器](https://github.com/emarco177/claude-code-crash-course/commit/edef7ffdcaeeeca4d109048053e7444e47cf4a78)

首先，我們建立了一個刻意冗長的 MCP 伺服器，使用過度詳細的工具描述來示範 token 浪費的問題：

- 建立了 [verbose_mcp_server.py](verbose_mcp_server.py)，其中包含過度詳細的文件說明
- 每個工具都有數百個 token 的不必要描述
- 示範冗長工具如何不必要地消耗情境空間

### 步驟二：[載入所有 MCP 伺服器](https://github.com/emarco177/claude-code-crash-course/commit/d6e830a881d448aa75502edf05c5b5b8be23fa1d)

新增一個載入多個 MCP 伺服器的通用 [.mcp.json](.mcp.json) 設定：

- verbose-server（本地）
- context7
- tavily
- playwright

**結果**：使用 `/context` 執行 Claude Code 後，可發現數千個 token 被未使用的工具描述所佔用。

### 步驟三：[最小化 MCP 設定](https://github.com/emarco177/claude-code-crash-course/commit/c0b0538570b431a24166e5f33ffab901284097c5)

建立了僅包含 Tavily MCP 伺服器的 [.mcp.json.tavily](.mcp.json.tavily)，專用於研究任務。

**使用方式**：

```bash
claude --mcp-config .mcp.json.tavily
```

**結果**：在維持必要功能的同時，大幅降低了情境的消耗。

## Commit 參考

| 步驟 | Commit | 變更的檔案 |
|------|--------|-----------|
| 1. 冗長 MCP 伺服器 | [edef7ff](https://github.com/emarco177/claude-code-crash-course/commit/edef7ffdcaeeeca4d109048053e7444e47cf4a78) | `verbose_mcp_server.py`、`main.py`、`pyproject.toml` |
| 2. 通用 MCP 設定 | [d6e830a](https://github.com/emarco177/claude-code-crash-course/commit/d6e830a881d448aa75502edf05c5b5b8be23fa1d) | `.mcp.json` |
| 3. 最小化 MCP 設定 | [c0b0538](https://github.com/emarco177/claude-code-crash-course/commit/c0b0538570b431a24166e5f33ffab901284097c5) | `.mcp.json.tavily` |

## 核心重點

1. **預設行為會造成浪費**：載入所有 MCP 伺服器會為你不會用到的工具消耗 token
2. **專案專屬設定**：針對不同工作流程建立最小化的 `.mcp.json.*` 檔案
3. **使用 `--mcp-config` 旗標**：每次啟動 Claude Code 時只載入所需的伺服器
4. **透過 `/context` 監控**：檢查 token 使用量以優化你的設定

## 最佳實踐

- 建立任務專屬的 MCP 設定（例如 `.mcp.json.research`、`.mcp.json.testing`）
- 建立 MCP 伺服器時，保持工具描述簡潔
- 使用 `--mcp-config` 為每個工作階段選擇最小化的伺服器集合
- 定期審查 MCP 設定，移除不必要的工具
