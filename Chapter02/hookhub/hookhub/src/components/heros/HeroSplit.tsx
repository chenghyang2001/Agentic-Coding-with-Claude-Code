"use client";

/**
 * HeroSplit.tsx — 分割螢幕（Split Screen）風格 Hero 變體
 *
 * 設計特點：
 * - 畫面左半：深色面板，放主要文字內容（badge、headline、CTAs、stats）
 * - 畫面右半：橘色漸層面板（#d97757），放裝飾性視覺元素
 * - 兩半之間用斜對角線（clip-path polygon）分割，非直線切割
 * - 全螢幕高度（min-h-screen）
 * - 手機版：上下堆疊（左半在上，右半在下，各 50vh）
 *
 * 右半視覺元素：
 * - 大型半透明「{  }」程式碼括號符號（純裝飾）
 * - 浮動的 Hook 類型標籤（animate-float）
 * - 底部 hook execution 計數器裝飾
 */
export default function HeroSplit() {
  return (
    <section
      className="relative w-full overflow-hidden min-h-screen"
      aria-label="Split-View Hook Explorer Hero"
    >
      {/* ===== 容器：手機為 flex-col，桌面為 flex-row ===== */}
      <div className="relative flex flex-col lg:flex-row min-h-screen">
        {/* ================================================================
            左半面板：深色背景 + 文字內容
            手機：高度 50vh；桌面：佔一半寬度，全高
        ================================================================ */}
        <div className="relative flex-1 flex items-center justify-center bg-[var(--background)] px-8 py-16 min-h-[50vh] lg:min-h-screen lg:px-12 lg:py-24">
          {/* 左半的微妙背景點陣紋理，增加層次感 */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.03]"
            aria-hidden="true"
            style={{
              backgroundImage:
                "radial-gradient(circle, var(--foreground) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />

          {/* 左下角光暈（橘色洩入，呼應右半面板） */}
          <div
            className="pointer-events-none absolute -bottom-20 -right-20 h-[300px] w-[300px] rounded-full blur-3xl opacity-15"
            aria-hidden="true"
            style={{ background: "#d97757" }}
          />

          {/* 內容包裹，最大寬度限制讓文字不過長 */}
          <div className="relative w-full max-w-xl space-y-8">
            {/* Badge */}
            <div className="animate-fade-in">
              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--background)] px-4 py-1.5 text-sm font-medium text-[var(--foreground)] shadow-sm">
                {/* 指示燈：表示系統活躍 */}
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#d97757] opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#d97757]" />
                </span>
                Split-View Hook Explorer
              </span>
            </div>

            {/* H1 標題 */}
            <h1 className="animate-fade-in text-4xl font-bold leading-tight tracking-tight text-[var(--foreground)] animation-delay-200 sm:text-5xl lg:text-6xl">
              Browse Hooks, {/* 「Build Faster」使用橘藍漸層文字，呼應品牌色 */}
              <span className="bg-gradient-to-r from-[#d97757] via-[#e8956e] to-[#6a9bcc] bg-clip-text text-transparent">
                Build Faster
              </span>
            </h1>

            {/* 描述文字 */}
            <p className="animate-fade-in text-lg leading-relaxed text-[var(--slate-light)] animation-delay-400 lg:text-xl">
              Explore and install community-driven Claude Code hooks that
              supercharge your AI development workflow in seconds.
            </p>

            {/* CTA 按鈕組 */}
            <div className="animate-fade-in flex flex-col gap-4 animation-delay-600 sm:flex-row">
              {/* Primary 按鈕：橘色填充 */}
              <button className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#d97757] px-6 py-3 text-base font-semibold text-white shadow-md shadow-[#d97757]/30 transition-all hover:bg-[#c86644] hover:shadow-lg hover:shadow-[#d97757]/40 hover:scale-105 active:scale-95">
                Browse Hooks
                <svg
                  className="h-5 w-5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </button>

              {/* Secondary 按鈕：輪廓樣式 */}
              <button className="group inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-transparent px-6 py-3 text-base font-semibold text-[var(--foreground)] transition-all hover:bg-[var(--border)]/30 hover:scale-105 active:scale-95">
                <svg
                  className="h-5 w-5 transition-transform group-hover:rotate-90"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
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

            {/* Stats 數字列 */}
            <div className="animate-fade-in flex flex-wrap gap-8 pt-2 animation-delay-600">
              {[
                { value: "50+", label: "Hooks", color: "#d97757" },
                { value: "1.2k", label: "Downloads", color: "#6a9bcc" },
                { value: "200+", label: "Contributors", color: "#788c5d" },
              ].map(({ value, label, color }) => (
                <div key={label} className="flex flex-col">
                  <span className="text-2xl font-bold" style={{ color }}>
                    {value}
                  </span>
                  <span className="text-sm text-[var(--slate-light)]">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ================================================================
            右半面板：橘色漸層背景 + 裝飾視覺
            斜對角線切割：在桌面版用 clip-path 把左邊緣切成斜線
            手機版：無 clip-path，維持正常矩形堆疊
        ================================================================ */}
        <div
          className="relative flex-1 flex items-center justify-center min-h-[50vh] lg:min-h-screen overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, #d97757 0%, #c86644 40%, #b85a38 100%)",
            /* 桌面版：左邊緣斜切，製造分割感。
               polygon 起點在左側往內縮 60px，形成斜向分割線 */
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          }}
          aria-hidden="false"
        >
          {/* clip-path 斜切：只在 lg 以上套用，透過 style 注入 media query 變通 */}
          <style>{`
            @media (min-width: 1024px) {
              .hero-split-right {
                clip-path: polygon(60px 0%, 100% 0%, 100% 100%, 0% 100%);
              }
            }
            @keyframes hero-float-slow {
              0%, 100% { transform: translateY(0px) rotate(0deg); }
              50%       { transform: translateY(-12px) rotate(2deg); }
            }
            @keyframes hero-float-med {
              0%, 100% { transform: translateY(0px) rotate(0deg); }
              50%       { transform: translateY(-8px) rotate(-3deg); }
            }
            @keyframes hero-count-up {
              0%   { opacity: 0.4; }
              50%  { opacity: 1; }
              100% { opacity: 0.4; }
            }
            .animate-hero-float-slow {
              animation: hero-float-slow 5s ease-in-out infinite;
            }
            .animate-hero-float-med {
              animation: hero-float-med 4s ease-in-out infinite;
            }
            .animate-count-pulse {
              animation: hero-count-up 2s ease-in-out infinite;
            }
          `}</style>

          {/* clip-path 斜切套用目標（獨立 div 避免 clip-path 擋到 overflow） */}
          <div
            className="hero-split-right absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, #d97757 0%, #c86644 40%, #b85a38 100%)",
            }}
          />

          {/* 右半背景光暈：增加深度層次 */}
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden="true"
          >
            <div className="absolute top-1/4 left-1/4 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 h-32 w-32 rounded-full bg-[#b85a38]/50 blur-2xl" />
          </div>

          {/* ── 主裝飾：大型半透明「{ }」括號符號 ── */}
          <div className="relative flex items-center justify-center w-full h-full select-none">
            {/* 大括號：純裝飾用，用 aria-hidden 隱藏螢幕閱讀器 */}
            <span
              className="pointer-events-none absolute text-white/15 font-mono font-bold leading-none"
              style={{
                fontSize: "clamp(120px, 20vw, 260px)",
                letterSpacing: "-0.05em",
              }}
              aria-hidden="true"
            >
              {"{  }"}
            </span>

            {/* ── 浮動 Hook 類型標籤群 ── */}

            {/* PRE_TOOL_USE — 左上角 */}
            <div
              className="animate-hero-float-slow absolute"
              style={{ top: "15%", left: "8%" }}
            >
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/30 bg-white/20 px-3 py-1.5 text-xs font-mono font-semibold text-white shadow-md backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
                PRE_TOOL_USE
              </span>
            </div>

            {/* POST_TOOL_USE — 右上 */}
            <div
              className="animate-hero-float-med absolute"
              style={{ top: "22%", right: "6%", animationDelay: "0.8s" }}
            >
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/30 bg-white/20 px-3 py-1.5 text-xs font-mono font-semibold text-white shadow-md backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
                POST_TOOL_USE
              </span>
            </div>

            {/* STOP — 右側中央 */}
            <div
              className="animate-hero-float-slow absolute"
              style={{ top: "48%", right: "5%", animationDelay: "1.5s" }}
            >
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/30 bg-white/20 px-3 py-1.5 text-xs font-mono font-semibold text-white shadow-md backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
                STOP
              </span>
            </div>

            {/* NOTIFICATION — 左側中央 */}
            <div
              className="animate-hero-float-med absolute"
              style={{ top: "55%", left: "4%", animationDelay: "2.2s" }}
            >
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/30 bg-white/20 px-3 py-1.5 text-xs font-mono font-semibold text-white shadow-md backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
                NOTIFICATION
              </span>
            </div>

            {/* USER_PROMPT_SUBMIT — 左下 */}
            <div
              className="animate-hero-float-slow absolute"
              style={{ bottom: "20%", left: "10%", animationDelay: "0.4s" }}
            >
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/30 bg-white/20 px-3 py-1.5 text-xs font-mono font-semibold text-white shadow-md backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
                USER_PROMPT_SUBMIT
              </span>
            </div>

            {/* PRE_COMPACT — 右下 */}
            <div
              className="animate-hero-float-med absolute"
              style={{ bottom: "18%", right: "8%", animationDelay: "1.2s" }}
            >
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/30 bg-white/20 px-3 py-1.5 text-xs font-mono font-semibold text-white shadow-md backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
                PRE_COMPACT
              </span>
            </div>

            {/* ── 底部：hook execution 計數器裝飾 ── */}
            <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center gap-3 px-8">
              <div className="h-px flex-1 bg-white/20" />
              <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 backdrop-blur-sm">
                {/* 脈衝計數器圓點，表示系統持續執行中 */}
                <span
                  className="animate-count-pulse h-2 w-2 rounded-full bg-white"
                  aria-hidden="true"
                />
                <span className="text-xs font-mono font-medium text-white/80">
                  hook execution
                </span>
                {/* 模擬遞增的計數數字（靜態展示） */}
                <span className="text-xs font-mono font-bold text-white animate-count-pulse">
                  ×1,284
                </span>
              </div>
              <div className="h-px flex-1 bg-white/20" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
