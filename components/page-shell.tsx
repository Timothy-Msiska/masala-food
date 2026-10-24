'use client'

import type { ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'
import { SiteHeader } from './site-header'
import { AnimatedReveal } from './animated-reveal'

export function PageShell({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string
  title: React.ReactNode
  intro: string
  children: React.ReactNode
}) {
  return (
    <main className="min-h-screen bg-[#faf9f5] text-[#242b27] page-fade-enter">
      <SiteHeader />
      <section className="page-hero">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
          <AnimatedReveal effect="fade-down" delay={80} duration={750}>
            <p className="eyebrow">{eyebrow}</p>
          </AnimatedReveal>
          <AnimatedReveal effect="fade-up" delay={180} duration={850}>
            <h1>{title}</h1>
          </AnimatedReveal>
          <AnimatedReveal effect="fade-up" delay={280} duration={800}>
            <p className="page-intro">{intro}</p>
          </AnimatedReveal>
        </div>
      </section>
      
      <AnimatedReveal effect="fade-in" delay={380} duration={800}>
        {children}
      </AnimatedReveal>

      <footer className="border-t border-[#dfe5df] px-5 py-8 text-sm text-[#6b756e] lg:px-8">
        <div className="mx-auto flex max-w-7xl justify-between items-center gap-4">
          <span>© 2026 MASALA FOOD</span>
          <a
            href="/"
            className="group inline-flex items-center gap-1.5 font-semibold text-[#174d35] transition-all hover:text-[#2f7d4a]"
          >
            Back to home{' '}
            <ArrowRight
              className="inline transition-transform duration-200 group-hover:translate-x-1"
              size={15}
            />
          </a>
        </div>
      </footer>
    </main>
  )
}
