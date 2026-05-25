'use client';

/**
 * HeroGlass — 玻璃擬態（Glassmorphism）風格 Hero 區塊
 *
 * 設計特點：
 * - 背景大型彩色光球（blur-3xl）製造磨砂玻璃底色感
 * - 主要內容包裹在 backdrop-blur-xl 玻璃卡片內
 * - 右欄以多層疊加玻璃卡片展示 Hook 功能特性
 * - Badge、按鈕均採用毛玻璃半透明效果
 * - 光球使用 animate-float / animate-float-delayed 緩慢漂移
 */
export default function HeroGlass() {
  return (
    <section className="relative w-full overflow-hidden bg-[var(--background)]">
      {/* ── 背景層：大型彩色光球 ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* 珊瑚橘光球 — 左上 */}
        <div className="animate-float absolute -left-32 -top-32 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-[#d97757] to-[#d97757]/20 opacity-30 blur-3xl" />

        {/* 藍色光球 — 右上 */}
        <div className="animate-float-delayed absolute -right-40 top-20 h-[700px] w-[700px] rounded-full bg-gradient-to-bl from-[#6a9bcc] to-[#6a9bcc]/20 opacity-25 blur-3xl" />

        {/* 橄欖綠光球 — 底部中央 */}
        <div className="animate-float absolute bottom-0 left-1/3 h-[500px] w-[500px] rounded-full bg-gradient-to-t from-[#788c5d] to-[#788c5d]/10 opacity-20 blur-3xl" />

        {/* 混合暈染 — 中間填補 */}
        <div className="animate-float-delayed absolute left-1/2 top-1/3 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-gradient-to-br from-[#d97757]/20 via-[#6a9bcc]/15 to-[#788c5d]/20 opacity-40 blur-3xl" />

        {/* 細格紋覆蓋（增加質感） */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      {/* ── 主要內容：玻璃卡片容器 ── */}
      <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
        {/* 外層玻璃卡片包裹整個 grid */}
        <div className="relative rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl dark:border-white/5 dark:bg-black/10 lg:p-12">
          {/* 卡片內部光暈 */}
          <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 via-transparent to-transparent" />

          <div className="relative grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
            {/* ── 左欄：文字內容 ── */}
            <div className="flex flex-col space-y-8">
              {/* Badge */}
              <div className="animate-fade-in">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-[var(--foreground)] shadow-sm backdrop-blur-md">
                  {/* 脈衝指示燈 — 表示平台活躍狀態 */}
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="absolute inline-flex h-full w-full animate-ping-slow rounded-full bg-[#d97757] opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#d97757]" />
                  </span>
                  Community-Powered Automation
                </span>
              </div>

              {/* H1 標題 */}
              <h1 className="animate-fade-in text-4xl font-bold leading-tight tracking-tight text-[var(--foreground)] animation-delay-200 sm:text-5xl lg:text-6xl">
                Supercharge Claude Code with{' '}
                <span className="bg-gradient-to-r from-[#d97757] via-[#6a9bcc] to-[#788c5d] bg-clip-text text-transparent">
                  powerful hooks
                </span>
              </h1>

              {/* 描述文字 */}
              <p className="animate-fade-in text-lg leading-relaxed text-[var(--slate-light)] animation-delay-400 lg:text-xl">
                Discover, share, and install community-driven hooks that
                transform your AI-powered development workflow.
              </p>

              {/* CTA 按鈕組 */}
              <div className="animate-fade-in flex flex-col gap-4 animation-delay-600 sm:flex-row">
                {/* Primary：毛玻璃橘色按鈕 */}
                <button className="group inline-flex items-center justify-center gap-2 rounded-xl border border-[#d97757]/40 bg-[#d97757]/80 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-[#d97757]/20 backdrop-blur-md transition-all hover:bg-[#d97757] hover:shadow-xl hover:shadow-[#d97757]/30 hover:scale-105">
                  Browse Hooks
                  <svg
                    className="h-5 w-5 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </button>

                {/* Secondary：純毛玻璃輪廓按鈕 */}
                <button className="group inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-base font-semibold text-[var(--foreground)] shadow-sm backdrop-blur-md transition-all hover:bg-white/20 hover:border-white/30 hover:scale-105">
                  <svg
                    className="h-5 w-5 transition-transform group-hover:rotate-90"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Submit a Hook
                </button>
              </div>

              {/* Stats — 小型玻璃數字卡 */}
              <div className="animate-fade-in flex flex-wrap gap-4 pt-2 animation-delay-600">
                {/* 各數字用獨立的迷你玻璃卡片包裹，強調資料感 */}
                {[
                  { value: '50+', label: 'Hooks Available' },
                  { value: '1.2k', label: 'Downloads' },
                  { value: '200+', label: 'Contributors' },
                ].map(({ value, label }) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-white/15 bg-white/8 px-5 py-3 backdrop-blur-md"
                  >
                    <div className="text-2xl font-bold text-[var(--foreground)]">
                      {value}
                    </div>
                    <div className="text-xs text-[var(--slate-light)]">
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── 右欄：多層玻璃功能卡片（lg 以上才顯示） ── */}
            <div className="relative hidden h-[480px] items-center justify-center lg:flex">
              {/* 大背景光環 — 增加景深感 */}
              <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 animate-pulse-slow" />
              <div className="absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5 animate-pulse-slow" />

              {/* 卡片容器 */}
              <div className="relative h-[400px] w-[400px]">

                {/* ── 後層：Notification 卡 ── */}
                <div className="animate-float absolute right-0 top-0 w-64 rounded-2xl border border-white/20 bg-white/10 p-4 shadow-xl backdrop-blur-xl">
                  {/* 卡頂部光澤 */}
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-2xl bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                  <div className="mb-3 flex items-center gap-2">
                    {/* Notification 圖示 */}
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#d97757]/20 backdrop-blur-sm">
                      <svg className="h-4 w-4 text-[#d97757]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                      </svg>
                    </div>
                    <span className="text-sm font-semibold text-[var(--foreground)]">
                      Notification Hook
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    <div className="h-2 w-full rounded-full bg-[#d97757]/30" />
                    <div className="h-2 w-4/5 rounded-full bg-[#d97757]/20" />
                    <div className="h-2 w-2/3 rounded-full bg-[#d97757]/15" />
                  </div>
                  <div className="mt-3 flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#788c5d]" />
                    <span className="text-xs text-[var(--slate-light)]">Active</span>
                  </div>
                </div>

                {/* ── 中層：Validation 卡 — 中間稍大，浮動延遲 ── */}
                <div className="animate-float-delayed absolute bottom-12 left-0 right-0 mx-auto w-72 rounded-2xl border border-white/25 bg-white/12 p-5 shadow-2xl backdrop-blur-xl">
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-2xl bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                  <div className="mb-3 flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#6a9bcc]/20 backdrop-blur-sm">
                      <svg className="h-4 w-4 text-[#6a9bcc]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="text-sm font-semibold text-[var(--foreground)]">
                      Validation Hook
                    </span>
                    {/* 成功徽章 */}
                    <span className="ml-auto rounded-full border border-[#788c5d]/30 bg-[#788c5d]/15 px-2 py-0.5 text-xs text-[#788c5d] backdrop-blur-sm">
                      PASS
                    </span>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 font-mono text-xs text-[var(--slate-light)]">
                    <span className="text-[#6a9bcc]">hook</span>
                    <span className="text-[var(--foreground)]">.validate(</span>
                    <span className="text-[#d97757]">payload</span>
                    <span className="text-[var(--foreground)]">)</span>
                  </div>
                </div>

                {/* ── 前層：Speed 卡 — 左上小卡 ── */}
                <div className="animate-float absolute left-0 top-20 w-52 rounded-2xl border border-white/20 bg-white/10 p-4 shadow-xl backdrop-blur-xl">
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-2xl bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                  <div className="mb-2 flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#788c5d]/20 backdrop-blur-sm">
                      <svg className="h-4 w-4 text-[#788c5d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <span className="text-sm font-semibold text-[var(--foreground)]">
                      Speed Hook
                    </span>
                  </div>
                  {/* 速度指標條 */}
                  <div className="flex items-end gap-1 h-10">
                    {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-sm bg-gradient-to-t from-[#788c5d]/60 to-[#788c5d]/20"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                  <div className="mt-2 text-xs text-[var(--slate-light)]">
                    avg <span className="font-semibold text-[#788c5d]">12ms</span>
                  </div>
                </div>

                {/* ── 裝飾：浮動小圓點 ── */}
                <div className="animate-ping-slow absolute right-8 bottom-8 h-3 w-3 rounded-full bg-[#d97757]/60 backdrop-blur-sm" />
                <div className="animate-float absolute right-4 top-1/2 h-2 w-2 rounded-full bg-[#6a9bcc]/80" />
                <div className="animate-float-delayed absolute left-24 bottom-4 h-2 w-2 rounded-full bg-[#788c5d]/80" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 底部漸層分隔線 */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
