import type { ReactNode } from 'react'
import { SiteHeader } from './site-header'

export function PageShell({ eyebrow, title, intro, children }: { eyebrow: string; title: React.ReactNode; intro: string; children: React.ReactNode }) {
  return <main className="min-h-screen bg-[#faf9f5] text-[#242b27]"><SiteHeader /><section className="page-hero"><div className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="page-intro">{intro}</p></div></section>{children}<footer className="border-t border-[#dfe5df] px-5 py-8 text-sm text-[#6b756e] lg:px-8"><div className="mx-auto flex max-w-7xl justify-between gap-4"><span>© 2026 MASALA FOOD. ALL RIGHTS RESERVED.</span><span>DESIGNED FOR EXCELLENCE - ARCHTECH</span></div></footer></main>
}
