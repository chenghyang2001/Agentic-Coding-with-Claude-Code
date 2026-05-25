'use client';

/**
 * HeroNeon.tsx
 * 賽博龐克霓虹光效風格 Hero 變體
 * 使用霓虹光暈、掃描線動畫與電路板圖案營造電馭叛客視覺
 */

export default function HeroNeon() {
  return (
    <section className="relative w-full overflow-hidden bg-[#0a0a0f]">
      {/* ===== 背景層 ===== */}

      {/* 深色底層漸層：確保深色賽博龐克基底（覆蓋系統 --background 變數） */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0f] via-[#0d0a1a] to-[#080d14]" />

      {/* 霓虹藍紫光暈 — 左上角 */}
      <div className="absolute -left-32 -top-32 h-[500px] w-[500px] animate-pulse-slow rounded-full bg-[#6a9bcc] opacity-15 blur-[100px]" />

      {/* 霓虹橘色光暈 — 右下角 */}
      <div className="absolute -bottom-32 -right-20 h-[450px] w-[450px] animate-pulse-slow animation-delay-2000 rounded-full bg-[#d97757] opacity-15 blur-[100px]" />

      {/* 霓虹紫色光暈 — 中央背景增深度 */}
      <div className="absolute left-1/2 top-1/3 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 animate-float rounded-full bg-[#7c3aed] opacity-10 blur-[80px]" />

      {/* 網格背景：電路板風格 dot grid */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'radial-gradient(circle, #6a9bcc 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* 掃描線動畫：橫向移動的亮線，強化賽博龐克氛圍 */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute left-0 right-0 h-[2px] opacity-20"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, #6a9bcc 40%, #d97757 60%, transparent 100%)',
            animation: 'scanline 6s linear infinite',
            top: '0%',
          }}
        />
      </div>

      {/* 掃描線 keyframe — 透過 style 注入，避免修改全域 CSS */}
      <style>{`
        @keyframes scanline {
          0%   { top: -2px; opacity: 0; }
          5%   { opacity: 0.25; }
          95%  { opacity: 0.25; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes neon-flicker {
          0%, 100% { opacity: 1; }
          92%       { opacity: 1; }
          93%       { opacity: 0.4; }
          94%       { opacity: 1; }
          96%       { opacity: 0.6; }
          97%       { opacity: 1; }
        }
        @keyframes circuit-pulse {
          0%, 100% { stroke-dashoffset: 0;   opacity: 0.4; }
          50%      { stroke-dashoffset: -40; opacity: 0.9; }
        }
        .animate-neon-flicker {
          animation: neon-flicker 5s ease-in-out infinite;
        }
        .animate-circuit-pulse {
          animation: circuit-pulse 3s ease-in-out infinite;
          stroke-dasharray: 20 10;
        }
        .neon-glow-text {
          text-shadow:
            0 0 8px  rgba(217, 119, 87, 0.8),
            0 0 20px rgba(217, 119, 87, 0.5),
            0 0 40px rgba(217, 119, 87, 0.3);
        }
        .neon-border-blue {
          box-shadow:
            0 0 6px  rgba(106, 155, 204, 0.6),
            0 0 16px rgba(106, 155, 204, 0.3),
            inset 0 0 6px rgba(106, 155, 204, 0.1);
        }
        .neon-border-orange {
          box-shadow:
            0 0 8px  rgba(217, 119, 87, 0.7),
            0 0 20px rgba(217, 119, 87, 0.4),
            inset 0 0 6px rgba(217, 119, 87, 0.1);
        }
        .neon-border-orange:hover {
          box-shadow:
            0 0 12px rgba(217, 119, 87, 0.9),
            0 0 30px rgba(217, 119, 87, 0.6),
            0 0 50px rgba(217, 119, 87, 0.3),
            inset 0 0 8px rgba(217, 119, 87, 0.2);
        }
        .neon-border-blue-hover:hover {
          box-shadow:
            0 0 10px rgba(106, 155, 204, 0.8),
            0 0 25px rgba(106, 155, 204, 0.5),
            0 0 45px rgba(106, 155, 204, 0.2),
            inset 0 0 8px rgba(106, 155, 204, 0.15);
        }
      `}</style>

      {/* ===== 主內容區 ===== */}
      <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">

          {/* ===== 左欄 ===== */}
          <div className="flex flex-col justify-center space-y-8">

            {/* Badge：霓虹邊框 + 閃爍發光圓點 */}
            <div className="animate-fade-in">
              <span
                className="inline-flex items-center gap-2.5 rounded-full border border-[#6a9bcc]/50 bg-[#0d1520]/80 px-4 py-1.5 text-sm font-medium text-[#6a9bcc] backdrop-blur-sm neon-border-blue"
              >
                {/* 發光閃爍指示燈：代表「系統在線」 */}
                <span className="relative flex h-2 w-2 flex-shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#6a9bcc] opacity-80" />
                  <span className="animate-neon-flicker relative inline-flex h-2 w-2 rounded-full bg-[#6a9bcc]" />
                </span>
                Community-Powered Automation
              </span>
            </div>

            {/* H1 標題：主詞正常顏色，強調詞使用霓虹橘漸層 + glow */}
            <h1 className="animate-fade-in text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl animation-delay-200">
              Supercharge Claude Code with{' '}
              <span
                className="neon-glow-text animate-neon-flicker"
                style={{
                  background:
                    'linear-gradient(135deg, #d97757 0%, #e8956e 40%, #6a9bcc 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                powerful hooks
              </span>
            </h1>

            {/* 描述文字 */}
            <p className="animate-fade-in text-lg leading-relaxed text-[#8899aa] lg:text-xl animation-delay-400">
              Discover, share, and install community-driven hooks that transform
              your AI-powered development workflow.
            </p>

            {/* CTA 按鈕：橘色主按鈕 + 藍色次要按鈕，兩者皆有霓虹邊框 glow */}
            <div className="animate-fade-in flex flex-col gap-4 sm:flex-row animation-delay-600">
              {/* 主要按鈕：填充橘色 + hover 時增強 glow */}
              <button className="neon-border-orange group inline-flex items-center justify-center gap-2 rounded-lg border border-[#d97757]/80 bg-[#d97757]/20 px-6 py-3 text-base font-semibold text-[#d97757] backdrop-blur-sm transition-all duration-300 hover:bg-[#d97757]/30 hover:scale-105">
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

              {/* 次要按鈕：透明底 + 藍色霓虹邊框，hover 時增強 glow */}
              <button className="neon-border-blue-hover group inline-flex items-center justify-center gap-2 rounded-lg border border-[#6a9bcc]/50 bg-transparent px-6 py-3 text-base font-semibold text-[#6a9bcc] transition-all duration-300 hover:bg-[#6a9bcc]/10 hover:scale-105">
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

            {/* Stats：數字用霓虹色區分，強化視覺層次 */}
            <div className="animate-fade-in flex flex-wrap gap-8 pt-4 animation-delay-600">
              <div>
                <div
                  className="text-2xl font-bold"
                  style={{
                    color: '#d97757',
                    textShadow:
                      '0 0 10px rgba(217,119,87,0.7), 0 0 20px rgba(217,119,87,0.4)',
                  }}
                >
                  50+
                </div>
                <div className="text-sm text-[#556677]">Hooks Available</div>
              </div>
              <div>
                <div
                  className="text-2xl font-bold"
                  style={{
                    color: '#6a9bcc',
                    textShadow:
                      '0 0 10px rgba(106,155,204,0.7), 0 0 20px rgba(106,155,204,0.4)',
                  }}
                >
                  1.2k
                </div>
                <div className="text-sm text-[#556677]">Downloads</div>
              </div>
              <div>
                <div
                  className="text-2xl font-bold"
                  style={{
                    color: '#788c5d',
                    textShadow:
                      '0 0 10px rgba(120,140,93,0.7), 0 0 20px rgba(120,140,93,0.4)',
                  }}
                >
                  200+
                </div>
                <div className="text-sm text-[#556677]">Contributors</div>
              </div>
            </div>
          </div>

          {/* ===== 右欄：霓虹六角形 + 電路板 SVG 圖案 ===== */}
          <div className="relative hidden lg:flex items-center justify-center">

            {/* 外圍旋轉光環 */}
            <div
              className="animate-spin-slow absolute h-[420px] w-[420px] rounded-full"
              style={{
                border: '1px solid rgba(106, 155, 204, 0.3)',
                boxShadow:
                  '0 0 15px rgba(106, 155, 204, 0.2), inset 0 0 15px rgba(106, 155, 204, 0.1)',
              }}
            />

            {/* 反向旋轉中環 */}
            <div
              className="animate-reverse-spin absolute h-[320px] w-[320px] rounded-full"
              style={{
                border: '1px solid rgba(217, 119, 87, 0.35)',
                boxShadow:
                  '0 0 12px rgba(217, 119, 87, 0.2), inset 0 0 12px rgba(217, 119, 87, 0.1)',
              }}
            />

            {/* 中央電路板 SVG（六角形 + 電路線） */}
            <div className="relative h-[280px] w-[280px]">
              <svg
                viewBox="0 0 280 280"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-full w-full"
                aria-hidden="true"
              >
                {/* 六角形外框 — 藍色霓虹描邊 */}
                <polygon
                  points="140,20 240,75 240,205 140,260 40,205 40,75"
                  stroke="#6a9bcc"
                  strokeWidth="1.5"
                  fill="rgba(106,155,204,0.04)"
                  style={{
                    filter: 'drop-shadow(0 0 6px rgba(106,155,204,0.6))',
                  }}
                />

                {/* 六角形內框 — 橘色霓虹描邊 */}
                <polygon
                  points="140,55 210,95 210,185 140,225 70,185 70,95"
                  stroke="#d97757"
                  strokeWidth="1"
                  fill="rgba(217,119,87,0.03)"
                  style={{
                    filter: 'drop-shadow(0 0 5px rgba(217,119,87,0.5))',
                  }}
                />

                {/* 電路水平線 — 帶 dasharray 流動動畫 */}
                <line
                  x1="40" y1="140" x2="100" y2="140"
                  stroke="#6a9bcc"
                  strokeWidth="1"
                  className="animate-circuit-pulse"
                  style={{ filter: 'drop-shadow(0 0 3px rgba(106,155,204,0.8))' }}
                />
                <line
                  x1="180" y1="140" x2="240" y2="140"
                  stroke="#6a9bcc"
                  strokeWidth="1"
                  className="animate-circuit-pulse animation-delay-1000"
                  style={{ filter: 'drop-shadow(0 0 3px rgba(106,155,204,0.8))' }}
                />

                {/* 電路垂直線 */}
                <line
                  x1="140" y1="20" x2="140" y2="80"
                  stroke="#d97757"
                  strokeWidth="1"
                  className="animate-circuit-pulse animation-delay-500"
                  style={{ filter: 'drop-shadow(0 0 3px rgba(217,119,87,0.8))' }}
                />
                <line
                  x1="140" y1="200" x2="140" y2="260"
                  stroke="#d97757"
                  strokeWidth="1"
                  className="animate-circuit-pulse animation-delay-1500"
                  style={{ filter: 'drop-shadow(0 0 3px rgba(217,119,87,0.8))' }}
                />

                {/* 電路節點圓點 */}
                <circle cx="100" cy="140" r="4" fill="#6a9bcc"
                  style={{ filter: 'drop-shadow(0 0 5px rgba(106,155,204,1))' }}
                />
                <circle cx="180" cy="140" r="4" fill="#6a9bcc"
                  style={{ filter: 'drop-shadow(0 0 5px rgba(106,155,204,1))' }}
                />
                <circle cx="140" cy="80" r="4" fill="#d97757"
                  style={{ filter: 'drop-shadow(0 0 5px rgba(217,119,87,1))' }}
                />
                <circle cx="140" cy="200" r="4" fill="#d97757"
                  style={{ filter: 'drop-shadow(0 0 5px rgba(217,119,87,1))' }}
                />

                {/* 中央核心圓：雙層發光 */}
                <circle
                  cx="140" cy="140" r="28"
                  fill="rgba(106,155,204,0.08)"
                  stroke="#6a9bcc"
                  strokeWidth="1.5"
                  style={{ filter: 'drop-shadow(0 0 8px rgba(106,155,204,0.7))' }}
                />
                <circle
                  cx="140" cy="140" r="16"
                  fill="rgba(217,119,87,0.15)"
                  stroke="#d97757"
                  strokeWidth="1.5"
                  className="animate-ping-slow"
                  style={{ filter: 'drop-shadow(0 0 6px rgba(217,119,87,0.8))' }}
                />
                {/* 中心亮點 */}
                <circle
                  cx="140" cy="140" r="5"
                  fill="#d97757"
                  style={{ filter: 'drop-shadow(0 0 8px rgba(217,119,87,1))' }}
                />

                {/* 斜向電路輔助線（左上、右上、左下、右下） */}
                <line x1="90" y1="90"  x2="110" y2="110"
                  stroke="#788c5d" strokeWidth="0.8" opacity="0.6"
                  style={{ filter: 'drop-shadow(0 0 2px rgba(120,140,93,0.6))' }}
                />
                <line x1="190" y1="90"  x2="170" y2="110"
                  stroke="#788c5d" strokeWidth="0.8" opacity="0.6"
                  style={{ filter: 'drop-shadow(0 0 2px rgba(120,140,93,0.6))' }}
                />
                <line x1="90" y1="190" x2="110" y2="170"
                  stroke="#788c5d" strokeWidth="0.8" opacity="0.6"
                  style={{ filter: 'drop-shadow(0 0 2px rgba(120,140,93,0.6))' }}
                />
                <line x1="190" y1="190" x2="170" y2="170"
                  stroke="#788c5d" strokeWidth="0.8" opacity="0.6"
                  style={{ filter: 'drop-shadow(0 0 2px rgba(120,140,93,0.6))' }}
                />

                {/* 角落電路節點 */}
                <rect x="83" y="83"  width="8" height="8" rx="1"
                  fill="none" stroke="#788c5d" strokeWidth="1"
                  opacity="0.7"
                  style={{ filter: 'drop-shadow(0 0 3px rgba(120,140,93,0.7))' }}
                />
                <rect x="189" y="83"  width="8" height="8" rx="1"
                  fill="none" stroke="#788c5d" strokeWidth="1"
                  opacity="0.7"
                  style={{ filter: 'drop-shadow(0 0 3px rgba(120,140,93,0.7))' }}
                />
                <rect x="83" y="189" width="8" height="8" rx="1"
                  fill="none" stroke="#788c5d" strokeWidth="1"
                  opacity="0.7"
                  style={{ filter: 'drop-shadow(0 0 3px rgba(120,140,93,0.7))' }}
                />
                <rect x="189" y="189" width="8" height="8" rx="1"
                  fill="none" stroke="#788c5d" strokeWidth="1"
                  opacity="0.7"
                  style={{ filter: 'drop-shadow(0 0 3px rgba(120,140,93,0.7))' }}
                />
              </svg>
            </div>

            {/* 浮動的霓虹小資訊卡片 — 左上 */}
            <div
              className="animate-float absolute left-0 top-12 rounded-lg border border-[#6a9bcc]/40 bg-[#0d1520]/90 px-4 py-2.5 backdrop-blur-sm"
              style={{
                boxShadow:
                  '0 0 10px rgba(106,155,204,0.3), inset 0 0 6px rgba(106,155,204,0.05)',
              }}
            >
              <div className="text-xs font-semibold text-[#6a9bcc]">HOOK ACTIVE</div>
              <div className="mt-0.5 text-xs text-[#445566]">PreToolUse: enforced</div>
            </div>

            {/* 浮動的霓虹小資訊卡片 — 右下 */}
            <div
              className="animate-float-delayed absolute bottom-12 right-0 rounded-lg border border-[#d97757]/40 bg-[#1a0d08]/90 px-4 py-2.5 backdrop-blur-sm"
              style={{
                boxShadow:
                  '0 0 10px rgba(217,119,87,0.3), inset 0 0 6px rgba(217,119,87,0.05)',
              }}
            >
              <div className="text-xs font-semibold text-[#d97757]">SYSTEM STATUS</div>
              <div className="mt-0.5 text-xs text-[#554433]">All hooks: online</div>
            </div>
          </div>
        </div>
      </div>

      {/* 底部霓虹橫線 */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[1px]"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(106,155,204,0.6) 30%, rgba(217,119,87,0.6) 70%, transparent 100%)',
          boxShadow: '0 0 8px rgba(106,155,204,0.4)',
        }}
      />
    </section>
  );
}
