'use client';

// SectionHowItWorks — 說明如何在 30 秒內安裝並使用 HookHub
// 採用三步驟 Timeline 佈局，底部附設定檔範例 Code Block

export default function SectionHowItWorks() {
  // 三個步驟的資料（硬編碼於元件內，方便 SSG 靜態輸出）
  const steps = [
    {
      number: '01',
      color: '#d97757',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6"
        >
          {/* 放大鏡 icon — 代表搜尋 */}
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      ),
      title: 'Browse',
      description:
        '搜尋 500+ 社群 Hooks，依類型篩選。涵蓋 Security、Workflow、Monitoring 等多種分類，快速找到最適合你工作流的 Hook。',
      tags: ['Security', 'Workflow', 'Monitoring'],
    },
    {
      number: '02',
      color: '#6a9bcc',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6"
        >
          {/* 終端機 icon — 代表安裝指令 */}
          <polyline points="4 17 10 11 4 5" />
          <line x1="12" y1="19" x2="20" y2="19" />
        </svg>
      ),
      title: 'Install',
      description:
        '一行指令完成安裝，自動加入 settings.json。無需手動編輯配置檔，HookHub CLI 一切搞定。',
      command: 'npx hookhub install <hook-name>',
    },
    {
      number: '03',
      color: '#788c5d',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6"
        >
          {/* 閃電 icon — 代表自動執行 */}
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      ),
      title: 'Automate',
      description:
        'Hook 在每次 Claude Code 操作時自動執行。從此不必手動觸發，工作流效率大幅提升，讓 AI 協作更安全、更可靠。',
    },
  ];

  // settings.json 範例的 JSON tokens，用純 CSS class 模擬語法高亮
  // 各 token 對應不同顏色，避免依賴第三方 highlight 套件
  return (
    <section className="py-20 lg:py-28 bg-[var(--background)]">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">

        {/* ── Section 標籤 + 標題 ── */}
        <div className="text-center mb-16 animate-fade-in">
          <span
            className="inline-block text-xs font-semibold tracking-widest uppercase mb-4 px-3 py-1 rounded-full border"
            style={{ color: '#d97757', borderColor: '#d97757', background: 'rgba(217,119,87,0.08)' }}
          >
            HOW IT WORKS
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-[var(--foreground)] mt-2">
            From zero to automated{' '}
            <span style={{ color: '#d97757' }}>in 30 seconds</span>
          </h2>
          <p className="mt-4 text-base text-[var(--foreground)] opacity-60 max-w-xl mx-auto">
            無需複雜設定，三步驟即可將強大的 Hooks 整合進你的 Claude Code 工作流。
          </p>
        </div>

        {/* ── 三步驟 Timeline ── */}
        <div className="relative">

          {/* 桌機版水平連接線（偽元素以 border-t dashed 代替） */}
          <div
            className="hidden lg:block absolute top-[52px] left-[calc(16.67%-16px)] right-[calc(16.67%-16px)] border-t-2 border-dashed"
            style={{ borderColor: 'var(--border)' }}
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-8 relative z-10">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className="flex flex-col items-center text-center animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* 大號圓形數字 Badge */}
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-white font-extrabold text-xl shadow-lg mb-5 flex-shrink-0"
                  style={{ background: step.color }}
                >
                  {step.number}
                </div>

                {/* 圖示圓框 */}
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center mb-4"
                  style={{ background: `${step.color}18`, color: step.color }}
                >
                  {step.icon}
                </div>

                {/* 標題 */}
                <h3 className="text-xl font-bold text-[var(--foreground)] mb-2">
                  {step.title}
                </h3>

                {/* 說明文字 */}
                <p className="text-sm text-[var(--foreground)] opacity-60 leading-relaxed mb-3">
                  {step.description}
                </p>

                {/* 步驟 02 的指令 pill */}
                {step.command && (
                  <code
                    className="text-xs px-3 py-1.5 rounded-md font-mono"
                    style={{
                      background: '#0f172a',
                      color: '#6a9bcc',
                      border: '1px solid #1e293b',
                    }}
                  >
                    {step.command}
                  </code>
                )}

                {/* 步驟 01 的 tag pills */}
                {step.tags && (
                  <div className="flex flex-wrap gap-2 justify-center">
                    {step.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2.5 py-0.5 rounded-full font-medium"
                        style={{
                          background: `${step.color}15`,
                          color: step.color,
                          border: `1px solid ${step.color}40`,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── 底部 Demo Code Block ── */}
        <div className="mt-16 animate-fade-in" style={{ animationDelay: '450ms' }}>
          <p className="text-center text-sm text-[var(--foreground)] opacity-50 mb-4 font-mono tracking-wide uppercase">
            — 自動產生的 settings.json 範例 —
          </p>
          <div
            className="rounded-xl overflow-hidden shadow-2xl border"
            style={{ background: '#0f172a', borderColor: '#1e293b' }}
          >
            {/* Code Block 標題列 */}
            <div
              className="flex items-center gap-2 px-4 py-3 border-b"
              style={{ background: '#0d1424', borderColor: '#1e293b' }}
            >
              {/* 視窗圓點裝飾 */}
              <span className="w-3 h-3 rounded-full bg-red-500 opacity-70" />
              <span className="w-3 h-3 rounded-full bg-yellow-400 opacity-70" />
              <span className="w-3 h-3 rounded-full bg-green-500 opacity-70" />
              <span className="ml-3 text-xs font-mono" style={{ color: '#64748b' }}>
                ~/.claude/settings.json
              </span>
            </div>

            {/* 程式碼內容（純 CSS 模擬語法高亮） */}
            <pre className="p-6 text-sm font-mono leading-7 overflow-x-auto">
              {/* 以 span 拼接 JSON tokens，模擬語法高亮 */}
              <span style={{ color: '#94a3b8' }}>{'{'}</span>
              {'\n'}
              {'  '}
              <span style={{ color: '#6a9bcc' }}>&quot;hooks&quot;</span>
              <span style={{ color: '#94a3b8' }}>: {'{'}</span>
              {'\n'}
              {'    '}
              <span style={{ color: '#6a9bcc' }}>&quot;PreToolUse&quot;</span>
              <span style={{ color: '#94a3b8' }}>: [{'{'}</span>
              {'\n'}
              {'      '}
              <span style={{ color: '#6a9bcc' }}>&quot;matcher&quot;</span>
              <span style={{ color: '#94a3b8' }}>: </span>
              <span style={{ color: '#788c5d' }}>&quot;Bash&quot;</span>
              <span style={{ color: '#94a3b8' }}>,</span>
              {'\n'}
              {'      '}
              <span style={{ color: '#6a9bcc' }}>&quot;hooks&quot;</span>
              <span style={{ color: '#94a3b8' }}>: [{'{'}</span>
              {'\n'}
              {'        '}
              <span style={{ color: '#6a9bcc' }}>&quot;type&quot;</span>
              <span style={{ color: '#94a3b8' }}>: </span>
              <span style={{ color: '#788c5d' }}>&quot;command&quot;</span>
              <span style={{ color: '#94a3b8' }}>,</span>
              {'\n'}
              {'        '}
              <span style={{ color: '#6a9bcc' }}>&quot;command&quot;</span>
              <span style={{ color: '#94a3b8' }}>: </span>
              <span style={{ color: '#d97757' }}>
                &quot;~/.claude/hooks/security-check.sh&quot;
              </span>
              {'\n'}
              {'      '}
              <span style={{ color: '#94a3b8' }}>{'}]'}</span>
              {'\n'}
              {'    '}
              <span style={{ color: '#94a3b8' }}>{'}]'}</span>
              {'\n'}
              {'  '}
              <span style={{ color: '#94a3b8' }}>{'}'}</span>
              {'\n'}
              <span style={{ color: '#94a3b8' }}>{'}'}</span>
            </pre>
          </div>
        </div>

        {/* ── CTA 按鈕 ── */}
        <div className="mt-12 text-center animate-fade-in" style={{ animationDelay: '600ms' }}>
          <a
            href="#browse"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-white text-sm transition-all duration-200 hover:opacity-90 hover:scale-105 active:scale-95 shadow-lg"
            style={{ background: '#d97757' }}
          >
            Start Browsing Hooks
            <span aria-hidden="true">→</span>
          </a>
        </div>

      </div>
    </section>
  );
}
