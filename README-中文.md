<a href="https://www.packtpub.com/en-us/unlock"><img src="https://drive.google.com/uc?export=view&id=1lQCTQQ8iV5pGuPA1n5wuds-3pwJi0OD_"></a>
<h1 align="center">
Agentic Coding with Claude Code 第一版</h1>
<p align="center">這是 <a href ="https://www.packtpub.com/en-us/product/agentic-coding-with-claude-code-first-edition/9781806022595">Agentic Coding with Claude Code 第一版</a> 的程式碼儲存庫，由 Packt 出版。
</p>

<h2 align="center">
給每位開發者的 Claude Code 代理式程式設計實戰指南
</h2>
<p align="center">
Eden Marco</p>

<p align="center">
  <a href="https://packt.link/free-ebook/9781806022595"><img width="32px" alt="免費 PDF" title="免費 PDF" src="https://cdn-icons-png.flaticon.com/512/4726/4726010.png"/></a>
 &#8287;&#8287;&#8287;&#8287;&#8287;
  <a href="https://packt.link/gbp/9781806022595"><img width="32px" alt="圖形套件" title="圖形套件" src="https://cdn-icons-png.flaticon.com/512/2659/2659360.png"/></a>
  &#8287;&#8287;&#8287;&#8287;&#8287;
   <a href="https://www.amazon.com/Agentic-Coding-Claude-Code-Developers/dp/1806022591/"><img width="32px" alt="Amazon" title="立即取得" src="https://cdn-icons-png.flaticon.com/512/15466/15466027.png"/></a>
  &#8287;&#8287;&#8287;&#8287;&#8287;
</p>
<details open>
  <summary><h2>關於本書</summary>
<a href="https://www.packtpub.com/en-us/product/agentic-coding-with-claude-code-first-edition/9781806022595">
<img src="https://content.packt.com/B37082/cover_image_small.jpg" alt="Agentic Coding with Claude Code, First Edition" height="256px" align="right">
</a>

大多數開發者是透過類似聊天的提示方式接觸 Claude Code，但隨著專案規模擴大，自動化需要更安全、可重複且受控，這種方式便逐漸失靈。<i>Agentic Coding with Claude Code</i> 示範如何超越臨時提示，將 Claude Code 作為可延伸的、代理驅動的開發平台來使用。</br>
本書聚焦於在終端機和 IDE 中直接建立具備情境感知能力的 AI 工作流程。你將學習如何使用斜線指令控制 Claude Code、利用持久記憶檔案管理長期情境，以及透過在 Claude Code 生命週期中觸發動作的 Hooks 來自動化開發任務。</br>
本書也涵蓋<b>模型情境協定</b>（<b>MCP</b>）作為現代代理生態系統的重要組成部分。你將了解 MCP 存在的原因、探索其核心架構，並在 Claude Code 中設定 MCP 伺服器，以改善工具、代理與工作流程之間的情境共享。書中也討論 MCP、技能與子代理之間的取捨，協助你選擇正確的方式。</br>
你將設計並協調使用子代理、平行工作階段和階層式委派的多代理系統。完成本書後，你將能夠自信且有條不紊地將 Claude Code 整合至真實世界的開發工作流程中。</details>
<details open>
  <summary><h2>核心學習重點</summary>
<ul>

<li>在終端機和 IDE 中使用 Claude Code 設計代理式程式設計工作流程</li>

<li>利用可重複使用的斜線指令和 Hooks 建立自訂自動化</li>

<li>將 Claude Code 與 Next.js 專案結合，實作 AI 驅動的工作流程</li>

<li>使用 Claude Code 記憶檔案建立持久的 AI 記憶</li>

<li>應用 MCP 在工具和代理之間進行結構化情境共享</li>

<li>使用子代理和協調模式設計多代理系統</li>

<li>透過專案文件和情境控制強制執行程式碼標準</li>

<li>在保持程式碼可維護性的同時，擴展 AI 結對程式設計的規模</li>

</ul>

  </details>

<details open>
  <summary><h2>章節目錄</summary>
     <img src="https://cliply.co/wp-content/uploads/2020/02/372002150_DOCUMENTS_400px.gif" alt="Unity Cookbook, Fifth Edition" height="556px" align="right">
<ol>

  <li>情境工程（Context Engineering）</li>
  
  <li>Claude Code 的精髓（The GIST of Claude Code）</li>

  <li>Claude Code 入門 — 基本指令導覽</li>

  <li>使用 MCP 伺服器和外掛擴展 Claude Code</li>

  <li>使用 Claude Code 與 GitHub 自動化你的開發工作流程</li>

  <li>Claude Code 規劃與多代理工作流程</li>

  <li>使用 Claude Code 子代理（Subagents）</li>

  <li>建立和自訂輸出樣式（Output Styles）</li>

  <li>了解代理技能（Agent Skills）</li>

  <li>使用 Claude Code 桌面版</li>

  <li>了解深度代理（Deep Agents）</li>

</ol>

</details>

<details open>
  <summary><h2>本書需求</summary>
本書假設讀者具有軟體開發和生成式 AI 概念的先備經驗。開始之前，你應熟悉以 Python 或 TypeScript 編寫和除錯程式碼、從終端機執行程式，以及在程式碼庫中工作。預期具備基本的 Git 知識，例如克隆儲存庫和提交變更。你也應了解虛擬環境和環境變數。</br>
需要熟悉<b>大型語言模型</b>（<b>LLMs</b>）及其核心概念，如代理（agents）、RAG 和 ReAct。你應曾與 LLM 互動並建立過至少一個簡單的代理。本書不涵蓋初級程式設計或生成式 AI 入門主題。</br>
若要跟著實作範例操作，你需要一個已安裝 Node.js 和簡單 Next.js 的工作開發環境（如早期章節所介紹）。你還需要存取 Claude Code，以及適當的身分驗證和定價設定。部分章節需要安裝和設定 GitHub CLI、使用 GitHub 儲存庫，以及使用 GitHub Actions。後段章節涉及設定本地和遠端 MCP 伺服器，以及在 Cursor 和 Claude 桌面應用程式中執行 Claude Code。</br>
建議逐步跟隨範例操作，並在介紹設定時進行實驗。本書循序漸進，多個章節依賴先前章節（包括 HookHub 專案）所建立的專案和設定。</br>
</br></br>
<b>免責聲明</b></br>
本書為獨立出版品，與 Anthropic, PBC 或其任何子公司或關聯企業無關，亦未獲其背書、贊助或官方認可。「Claude」、「Claude Code」和「Anthropic」是 Anthropic, PBC 的商標或註冊商標。本文提及的所有其他商標均為各自所有者的財產。</br>
作者是 Google LLC 的員工。然而，本書為個人專案，不代表 Google LLC、Google Cloud、Alphabet Inc. 或其任何子公司或關聯企業的觀點、意見或官方立場。本書在任何方面均未獲 Google 的背書、贊助或官方認可。「Google」、「Google Cloud」及相關標誌是 Google LLC 的商標。</br>
本書內容完全基於作者的個人經驗、獨立研究和公開文件。所表達的觀點、意見和解讀僅代表作者個人，不代表 Anthropic PBC、Google LLC 或任何其他組織的官方立場、策略或意見。</br>
雖然已盡一切努力確保所呈現資訊的準確性和完整性，但作者對內容的完整性、準確性、可靠性或適用性不作任何明示或暗示的保證或陳述。AI 工具及其相關 API、功能和特性快速演進，本書中的資訊可能在出版後過時。</br>
作者和出版商對因直接或間接使用或依賴本書中所含資訊而產生的任何損害、損失或後果概不負責。鼓勵讀者查閱 docs.anthropic.com 上 Anthropic 的官方文件，以獲取最新和最具權威的資訊。
  </details>

<details>
  <summary><h2>認識作者</h2></summary>

_Eden Marco_ 是 Google Cloud 的 LLM 專家，也是 LangChain 大使，在軟體工程和雲端架構領域擁有多年經驗。他是 Orca Security 的早期工程師之一，擁有以色列理工學院（Technion）電腦科學學士學位，並曾在 Reichman University 任教。Eden 根據真實世界的經驗創作實用、具生產就緒品質的課程。

</details>
<details>
  <summary><h2>其他相關書籍</h2></summary>
<ul>

  <li><a href="https://www.packtpub.com/en-us/product/learn-model-context-protocol-with-typescript-first-edition/9781806661398">Learn Model Context Protocol with TypeScript, First Edition</a></li>

  <li><a href="https://www.packtpub.com/en-us/product/learn-model-context-protocol-with-python-first-edition/9781806103232">Learn Model Context Protocol with Python, First Edition</a></li>

</ul>

</details>

<h2>勘誤</h2>
<ul>
  <li>第 32 頁：第 2 章中，標題「Using pec-driven design」應為「Using spec-driven design」。</li>
</ul>
