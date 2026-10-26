'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowRight, ChevronDown, Menu, X, Wheat, Search, Truck, Handshake } from 'lucide-react'
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
    <header className="site-header">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        <a href="/" className="brand-mark" aria-label="Masala Food home"><Image src="/masala-logo.png" alt="" width={68} height={68} priority /></a>
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
          <div ref={marketplaceRef} className="nav-dropdown">
            <button className={`nav-link nav-dropdown-trigger ${marketplaceOpen ? 'active' : ''}`} onClick={() => setMarketplaceOpen((open) => !open)} aria-expanded={marketplaceOpen} aria-haspopup="true">Marketplace <ChevronDown size={14} className={marketplaceOpen ? 'rotate-180' : ''} /></button>
            {marketplaceOpen && <div className="marketplace-dropdown" role="menu">{marketplaceLinks.map(({ label, detail, href, icon: Icon }) => <a key={label} href={href} role="menuitem" onClick={() => setMarketplaceOpen(false)}><span className="dropdown-icon"><Icon size={16} /></span><span><strong>{label}</strong><small>{detail}</small></span><ArrowRight size={14} /></a>)}</div>}
          </div>
          {links.map(([label, href]) => <a key={label} href={href} className="nav-link">{label}</a>)}
        </nav>
        <div className="hidden items-center gap-4 lg:flex"><a href="/login" className="text-sm font-semibold text-[#174d35]">Log in</a><a href="/become-member" className="button button-dark">Join MASALA FOOD <ArrowRight size={16} /></a></div>
        <button className="rounded-full p-2 lg:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen}>{menuOpen ? <X /> : <Menu />}</button>
      </div>
      {menuOpen && <div className="mobile-menu lg:hidden"><button className="mobile-menu-heading" onClick={() => setMarketplaceOpen((open) => !open)} aria-expanded={marketplaceOpen}>Marketplace <ChevronDown size={15} className={marketplaceOpen ? 'rotate-180' : ''} /></button>{marketplaceOpen && <div className="mobile-submenu">{marketplaceLinks.map(({ label, href }) => <a key={label} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}</div>}{links.map(([label, href]) => <a key={label} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}<a href="/login" onClick={() => setMenuOpen(false)}>Log in</a><a href="/become-member" onClick={() => setMenuOpen(false)} className="button button-dark w-full justify-center">Join MASALA FOOD <ArrowRight size={16} /></a></div>}
    </header>
  )
}
