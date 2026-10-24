'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowRight, ChevronDown, Menu, X, Wheat, Search, Truck, Handshake } from 'lucide-react'
import { FadeTransition } from './animated-reveal'

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
  const [scrolled, setScrolled] = useState(false)
  const marketplaceRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const closeOnOutside = (event: MouseEvent) => {
      if (!marketplaceRef.current?.contains(event.target as Node)) {
        setMarketplaceOpen(false)
      }
    }
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMarketplaceOpen(false)
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', closeOnOutside)
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.removeEventListener('mousedown', closeOnOutside)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [])

  return (
    <header className={`site-header ${scrolled ? 'site-header-scrolled' : ''}`}>
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        <a href="/" className="brand-mark group" aria-label="Masala Food home">
          <span className="transition-transform duration-300 group-hover:scale-105 group-hover:rotate-6">
            MF
          </span>
          <strong>
            MASALA<br />FOOD
          </strong>
        </a>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
          <div ref={marketplaceRef} className="nav-dropdown">
            <button
              className={`nav-link nav-dropdown-trigger ${marketplaceOpen ? 'active' : ''}`}
              onClick={() => setMarketplaceOpen((open) => !open)}
              aria-expanded={marketplaceOpen}
              aria-haspopup="true"
            >
              Marketplace{' '}
              <ChevronDown
                size={14}
                className={`transition-transform duration-250 ease-out ${
                  marketplaceOpen ? 'rotate-180 text-[#174d35]' : ''
                }`}
              />
            </button>

            <FadeTransition show={marketplaceOpen} duration={220} className="marketplace-dropdown-wrapper">
              <div className="marketplace-dropdown" role="menu">
                {marketplaceLinks.map(({ label, detail, href, icon: Icon }, index) => (
                  <a
                    key={label}
                    href={href}
                    role="menuitem"
                    onClick={() => setMarketplaceOpen(false)}
                    className="dropdown-item group"
                    style={{ animationDelay: `${index * 40}ms` }}
                  >
                    <span className="dropdown-icon transition-transform duration-200 group-hover:scale-110">
                      <Icon size={16} />
                    </span>
                    <span>
                      <strong className="transition-colors duration-200 group-hover:text-[#174d35]">
                        {label}
                      </strong>
                      <small>{detail}</small>
                    </span>
                    <ArrowRight
                      size={14}
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </a>
                ))}
              </div>
            </FadeTransition>
          </div>

          {links.map(([label, href]) => (
            <a key={label} href={href} className="nav-link nav-link-animated">
              {label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href="/login"
            className="text-sm font-semibold text-[#174d35] transition-colors duration-200 hover:text-[#2f7d4a]"
          >
            Log in
          </a>
          <a href="/become-member" className="button button-dark group">
            Join MASALA FOOD{' '}
            <ArrowRight
              size={16}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </a>
        </div>

        <button
          className="rounded-full p-2 transition-colors duration-200 hover:bg-[#e7efe8] lg:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span className="transition-transform duration-250 inline-block">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </span>
        </button>
      </div>

      <FadeTransition show={menuOpen} duration={250}>
        <div className="mobile-menu lg:hidden">
          <button
            className="mobile-menu-heading"
            onClick={() => setMarketplaceOpen((open) => !open)}
            aria-expanded={marketplaceOpen}
          >
            Marketplace{' '}
            <ChevronDown
              size={15}
              className={`transition-transform duration-250 ${marketplaceOpen ? 'rotate-180' : ''}`}
            />
          </button>
          
          <FadeTransition show={marketplaceOpen} duration={180}>
            <div className="mobile-submenu">
              {marketplaceLinks.map(({ label, href }) => (
                <a key={label} href={href} onClick={() => setMenuOpen(false)}>
                  {label}
                </a>
              ))}
            </div>
          </FadeTransition>

          {links.map(([label, href]) => (
            <a key={label} href={href} onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
          <a href="/login" onClick={() => setMenuOpen(false)}>
            Log in
          </a>
          <a
            href="/become-member"
            onClick={() => setMenuOpen(false)}
            className="button button-dark mt-3 w-full justify-center group"
          >
            Join MASALA FOOD{' '}
            <ArrowRight
              size={16}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </a>
        </div>
      </FadeTransition>
    </header>
  )
}
