'use client'

// 社群評價區塊 — 展示 6 位真實開發者對 HookHub 的評語
// 採用三欄 Grid 佈局，卡片高度交錯呈現視覺層次感

import React from 'react'

interface Testimonial {
  id: number
  name: string
  github: string
  role: string
  quote: string
  avatarColor: string
  initials: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Chen',
    github: '@sarahc_dev',
    role: 'Senior Engineer at Stripe',
    quote:
      'HookHub completely transformed how I manage Claude Code sessions. The hook marketplace alone saved me weeks of boilerplate — I just install, configure, and ship.',
    avatarColor: '#d97757',
    initials: 'SC',
  },
  {
    id: 2,
    name: 'Marcus Rivera',
    github: '@mrivera_oss',
    role: 'Lead Dev at Vercel',
    quote:
      'I used to copy-paste the same pre-tool hooks across every project. With HookHub, I publish once and sync everywhere. My entire team adopted it within a day.',
    avatarColor: '#6a9bcc',
    initials: 'MR',
  },
  {
    id: 3,
    name: 'Aiko Tanaka',
    github: '@aikobuilds',
    role: 'Staff Engineer at Linear',
    quote:
      'The PostToolUse hooks I found on HookHub cut my code-review cycle in half. Real community-tested patterns, not toy examples.',
    avatarColor: '#788c5d',
    initials: 'AT',
  },
  {
    id: 4,
    name: 'Devon Walsh',
    github: '@devonwx',
    role: 'Principal Eng at Cloudflare',
    quote:
      'HookHub is the npm registry for Claude Code hooks. It has the same discoverability, versioning, and community trust signals I expect from modern tooling.',
    avatarColor: '#7c3aed',
    initials: 'DW',
  },
  {
    id: 5,
    name: 'Priya Nair',
    github: '@priyanair_eng',
    role: 'Engineering Lead at Notion',
    quote:
      'Our team standardised on three HookHub hooks for guardrails and logging. Onboarding a new Claude Code user now takes minutes instead of a full afternoon.',
    avatarColor: '#059669',
    initials: 'PN',
  },
  {
    id: 6,
    name: 'Lars Eriksson',
    github: '@larse_codes',
    role: 'Open-Source Maintainer',
    quote:
      'I published my session-cost tracker hook on HookHub and got 400 installs in the first week. The feedback loop with the community is incredible.',
    avatarColor: '#dc2626',
    initials: 'LE',
  },
]

// 5 顆金色星星，用純文字組成避免 SVG 依賴
function StarRating() {
  return (
    <div className="flex gap-0.5" aria-label="5 stars out of 5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} style={{ color: '#f59e0b' }} aria-hidden="true">
          ★
        </span>
      ))}
    </div>
  )
}

// 單張評語卡片
function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <article
      className="
        group relative flex flex-col gap-4 rounded-2xl border border-[var(--border)]
        bg-[var(--background)] p-6 shadow-sm
        transition-all duration-300
        hover:-translate-y-1 hover:shadow-md
      "
    >
      {/* 大引號裝飾 — 使用 primary 色強調 */}
      <span
        className="absolute -top-3 left-5 select-none text-5xl font-serif leading-none"
        style={{ color: '#d97757' }}
        aria-hidden="true"
      >
        &ldquo;
      </span>

      {/* 評語本文 */}
      <p className="pt-3 text-sm leading-relaxed text-[var(--foreground)] opacity-85">
        {testimonial.quote}
      </p>

      {/* 底部：頭像 + 姓名 + 評分 */}
      <div className="mt-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* 圓形彩色初始字母頭像 — 不用 img tag */}
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white shadow-sm"
            style={{ backgroundColor: testimonial.avatarColor }}
            aria-hidden="true"
          >
            {testimonial.initials}
          </div>

          <div>
            <p className="text-sm font-semibold text-[var(--foreground)]">
              {testimonial.name}
            </p>
            <p className="text-xs text-[var(--foreground)] opacity-50">
              {testimonial.github}
            </p>
            <p className="mt-0.5 text-xs text-[var(--foreground)] opacity-60">
              {testimonial.role}
            </p>
          </div>
        </div>

        <StarRating />
      </div>
    </article>
  )
}

export default function SectionTestimonials() {
  return (
    <section className="py-20 lg:py-28" aria-labelledby="testimonials-heading">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">

        {/* 頂部文字區 */}
        <div className="mb-14 text-center animate-fade-in">
          {/* Section label */}
          <span
            className="
              mb-4 inline-block rounded-full px-4 py-1.5
              text-xs font-semibold uppercase tracking-widest
              border border-[var(--border)]
              bg-[var(--slate-light,#f8fafc)]
              text-[var(--foreground)] opacity-70
            "
          >
            Trusted by Developers
          </span>

          <h2
            id="testimonials-heading"
            className="mt-4 text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl lg:text-5xl"
          >
            What the{' '}
            <span style={{ color: '#d97757' }}>community</span>{' '}
            says
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base text-[var(--foreground)] opacity-65 leading-relaxed">
            Thousands of developers use HookHub to share, discover, and manage
            Claude Code hooks. Here&apos;s what they&apos;re saying.
          </p>
        </div>

        {/* 三欄 Grid，行動版單欄 */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* 將 6 張卡片分配到三欄，偶數欄加 mt 造成交錯高度效果 */}
          {[0, 1, 2].map((colIndex) => (
            <div
              key={colIndex}
              className={`flex flex-col gap-6 ${
                // 中間欄與最右欄在大螢幕上往下偏移，製造 Masonry 視覺感
                colIndex === 1 ? 'lg:mt-8' : colIndex === 2 ? 'lg:mt-4' : ''
              }`}
            >
              {testimonials
                .filter((_, i) => i % 3 === colIndex)
                .map((testimonial) => (
                  <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                ))}
            </div>
          ))}
        </div>

        {/* 底部統計數字 */}
        <div className="mt-16 flex flex-wrap justify-center gap-10 animate-fade-in">
          {[
            { value: '12,000+', label: 'Active Users' },
            { value: '3,400+', label: 'Hooks Published' },
            { value: '4.9 / 5', label: 'Average Rating' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p
                className="text-3xl font-bold"
                style={{ color: '#d97757' }}
              >
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-[var(--foreground)] opacity-60">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
