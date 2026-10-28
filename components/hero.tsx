'use client'

import { ArrowRight, ShieldCheck } from 'lucide-react'

const bottomRibbonLinks = [
  { label: 'Browse Marketplace', href: '/marketplace' },
  { label: 'Sourcing Requests', href: '/become-buyer' },
  { label: 'Supplier Network', href: '/become-supplier' },
  { label: 'Logistics Routes', href: '/logistics' },
  { label: 'Trade Support', href: '/trade-support' },
] as const

export function HeroSection() {
  return (
    <section id="top" className="relative w-full overflow-hidden bg-[#0a1a12] font-sans text-white">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://media.gettyimages.com/id/1542614865/photo/man-shopping-vegetables-in-groceries-store.jpg?s=612x612&w=0&k=20&c=e4cvmZDGoWJjzfzzAX4CMwU-xmxjUxJ1cRa5GUU3yFo="
          alt="Fresh Produce and Agricultural Supply"
          className="h-full w-full object-cover object-center"
        />
        {/* Left Dark Gradient Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d261b] via-[#0d261b]/90 to-transparent lg:w-[65%]" />
      </div>

      {/* Angular Geometric Diagonal Split Frame */}
      <div 
        className="pointer-events-none absolute inset-0 z-10 hidden lg:block"
        style={{
          clipPath: 'polygon(62% 0, 100% 0, 100% 100%, 54% 100%)',
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          borderLeft: '2px solid rgba(255, 255, 255, 0.6)'
        }}
      />

      {/* Main Hero Copy Content Area */}
      <div className="relative z-20 mx-auto max-w-7xl px-5 pt-16 pb-20 lg:px-8 lg:pt-20 lg:pb-28">
        <div className="max-w-xl">
          {/* Eyebrow Label */}
          <p className="mb-3 text-xs font-semibold tracking-[0.15em] text-white/80 uppercase">
            AGRICULTURAL TRADE, CONNECTED
          </p>

          {/* Main Hero Headline */}
          <h1 className="mb-4 text-xl font-bold tracking-tight text-white leading-snug sm:text-2xl lg:text-3xl">
            Connecting agricultural supply to global opportunity.
          </h1>

          {/* Subtext Paragraph */}
          <p className="mb-6 text-sm sm:text-base font-normal text-white/90 leading-relaxed max-w-lg">
            A trusted platform connecting producers, commercial buyers, and logistics partners across Africa and beyond.
          </p>

          {/* Call To Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <a
              href="/marketplace"
              className="inline-flex items-center gap-2 bg-[#174d35] border border-[#174d35] px-5 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-md hover:bg-[#123b29] transition-all"
            >
              Explore Marketplace <ArrowRight size={15} />
            </a>
            <a
              href="/become-member"
              className="inline-flex items-center gap-2 border border-white/80 bg-black/30 backdrop-blur-xs px-5 py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-white hover:text-[#174d35] transition-all"
            >
              Become a Member
            </a>
          </div>

          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 text-xs text-white/90 bg-black/40 backdrop-blur-xs px-3.5 py-2 border border-white/15 rounded-sm">
            <ShieldCheck size={16} className="text-white" />
            <span>Verified trade pathways · Malawi to DRC and beyond</span>
          </div>
        </div>
      </div>

      {/* Bottom Full-Width Ribbon / Bar */}
      <div className="relative z-30 w-full border-t border-white/20 bg-[#174d35]">
        <div className="mx-auto max-w-7xl px-2 sm:px-5 lg:px-8">
          <div className="grid grid-cols-2 divide-x divide-white/20 border-x border-white/20 sm:grid-cols-3 lg:grid-cols-5">
            {bottomRibbonLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="group flex items-center justify-center p-3 sm:py-4 text-center text-xs font-bold tracking-wider text-white uppercase transition-colors hover:bg-[#123b29]"
              >
                <span className="border border-white/40 px-3 py-2 w-full text-center group-hover:border-white transition-all">
                  {label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}