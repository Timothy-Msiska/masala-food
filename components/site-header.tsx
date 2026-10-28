'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowRight, ChevronDown, Menu, X, Wheat, Search, Truck, Handshake, PhoneCall, HelpCircle, Globe } from 'lucide-react'
import Image from 'next/image'

const links = [
  ['About us', '/about'],
  ['How it works', '/how-it-works'],
  ['Logistics', '/logistics'],
  ['Trade support', '/trade-support'],
] as const

const marketplaceLinks = [
  { label: 'Browse commodities', detail: 'Verified grains, legumes and oils', href: '/marketplace', icon: Wheat },
  { label: 'Sourcing requests', detail: 'Tell suppliers what you need', href: '/become-buyer', icon: Search },
  { label: 'Supplier network', detail: 'List and manage your supply', href: '/become-supplier', icon: Handshake },
  { label: 'Logistics routes', detail: 'Track cross-border delivery', href: '/logistics', icon: Truck },
] as const

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [marketplaceOpen, setMarketplaceOpen] = useState(false)
  const marketplaceRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const closeOnOutside = (event: MouseEvent) => {
      if (!marketplaceRef.current?.contains(event.target as Node)) setMarketplaceOpen(false)
    }
    const closeOnEscape = (event: KeyboardEvent) => event.key === 'Escape' && setMarketplaceOpen(false)
    document.addEventListener('mousedown', closeOnOutside)
    document.addEventListener('keydown', closeOnEscape)
    return () => { document.removeEventListener('mousedown', closeOnOutside); document.removeEventListener('keydown', closeOnEscape) }
  }, [])

  return (
    <header className="site-header sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-xs">
      {/* Top Utility Bar (Inspired by the reference image's top auxiliary links) */}
      <div className="bg-[#174d35] text-white text-xs py-1.5 px-5 lg:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-white/80 hover:text-white transition-colors">
              <Globe size={13} className="text-[#e8b44a]" /> Malawi &amp; DRC Trade Corridor
            </span>
            <a href="/support" className="hidden sm:flex items-center gap-1 text-white/80 hover:text-white transition-colors">
              <HelpCircle size={13} /> Support Center
            </a>
          </div>
          <div className="flex items-center gap-5 font-medium">
            <a href="/contact" className="hover:text-[#e8b44a] transition-colors">Contact us</a>
            <a href="/login" className="hover:text-[#e8b44a] transition-colors">Customer login</a>
          </div>
        </div>
      </div>

      {/* Main Header Navigation */}
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        <a href="/" className="brand-mark flex items-center gap-3" aria-label="Masala Food home">
          <Image src="/masala-logo.png" alt="Masala Food" width={56} height={56} priority className="object-contain" />
        </a>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
          <div ref={marketplaceRef} className="nav-dropdown relative">
            <button 
              className={`nav-link nav-dropdown-trigger flex items-center gap-1.5 font-medium text-gray-700 hover:text-[#174d35] transition-colors py-2 ${marketplaceOpen ? 'text-[#174d35] font-semibold' : ''}`} 
              onClick={() => setMarketplaceOpen((open) => !open)} 
              aria-expanded={marketplaceOpen} 
              aria-haspopup="true"
            >
              Marketplace <ChevronDown size={14} className={`transition-transform duration-200 ${marketplaceOpen ? 'rotate-180' : ''}`} />
            </button>
            {marketplaceOpen && (
              <div className="marketplace-dropdown absolute top-full left-0 mt-2 w-80 rounded-xl bg-white p-2 shadow-xl ring-1 ring-black/5" role="menu">
                {marketplaceLinks.map(({ label, detail, href, icon: Icon }) => (
                  <a 
                    key={label} 
                    href={href} 
                    role="menuitem" 
                    onClick={() => setMarketplaceOpen(false)}
                    className="flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-emerald-50/60"
                  >
                    <span className="mt-0.5 rounded-lg bg-emerald-100/70 p-2 text-[#174d35]"><Icon size={18} /></span>
                    <span className="flex flex-col">
                      <strong className="text-sm font-semibold text-gray-900">{label}</strong>
                      <small className="text-xs text-gray-500 font-normal">{detail}</small>
                    </span>
                  </a>
                ))}
              </div>
            )}
          </div>
          {links.map(([label, href]) => (
            <a key={label} href={href} className="nav-link font-medium text-gray-700 hover:text-[#174d35] transition-colors">{label}</a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a href="/login" className="text-sm font-semibold text-[#174d35] hover:underline">Log in</a>
          <a href="/become-member" className="button button-dark inline-flex items-center gap-2 rounded-lg bg-[#174d35] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#123b29] transition-all">
            Join MASALA FOOD <ArrowRight size={16} />
          </a>
        </div>

        <button className="rounded-full p-2 text-gray-700 hover:bg-gray-100 lg:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {menuOpen && (
        <div className="mobile-menu absolute top-full left-0 w-full bg-white border-b border-gray-200 px-6 py-6 shadow-xl lg:hidden flex flex-col gap-4">
          <button className="mobile-menu-heading flex items-center justify-between w-full py-2 font-semibold text-gray-800 border-b border-gray-100" onClick={() => setMarketplaceOpen((open) => !open)} aria-expanded={marketplaceOpen}>
            Marketplace <ChevronDown size={15} className={`transition-transform ${marketplaceOpen ? 'rotate-180' : ''}`} />
          </button>
          {marketplaceOpen && (
            <div className="mobile-submenu flex flex-col pl-4 gap-2 py-2 bg-gray-50 rounded-lg">
              {marketplaceLinks.map(({ label, href }) => (
                <a key={label} href={href} onClick={() => setMenuOpen(false)} className="py-1.5 text-sm text-gray-600 hover:text-[#174d35]">{label}</a>
              ))}
            </div>
          )}
          {links.map(([label, href]) => (
            <a key={label} href={href} onClick={() => setMenuOpen(false)} className="py-2 font-medium text-gray-800 hover:text-[#174d35] border-b border-gray-100">{label}</a>
          ))}
          <a href="/login" onClick={() => setMenuOpen(false)} className="py-2 font-semibold text-[#174d35]">Log in</a>
          <a href="/become-member" onClick={() => setMenuOpen(false)} className="button button-dark flex items-center justify-center gap-2 rounded-lg bg-[#174d35] px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#123b29]">
            Join MASALA FOOD <ArrowRight size={16} />
          </a>
        </div>
      )}
    </header>
  )
}