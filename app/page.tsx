'use client'

import { useEffect, useMemo, useState } from 'react'
import { ArrowRight, Check, Search, ShieldCheck, Truck, X, LayoutDashboard, Bell, Package, FileText, Settings, LogOut, CircleDollarSign, Clock3, ArrowUpRight } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { HeroSection } from '@/components/hero';

const commodities = [
  { name: 'Premium maize', origin: 'Malawi · Central Region', grade: 'Grade A', quantity: '2,400 MT', image: '/masala-hero.png', tag: 'Featured' },
  { name: 'Red kidney beans', origin: 'Malawi · Lilongwe', grade: 'Export quality', quantity: '850 MT', image: '/masala-hero.png', tag: 'Verified' },
  { name: 'Sunflower oil', origin: 'DRC · Lubumbashi', grade: 'Refined', quantity: '120,000 L', image: '/masala-hero.png', tag: 'New listing' },
]

const navItems = ['About us', 'Marketplace', 'How it works', 'Logistics', 'Trade support']
const routeFor = (item: string) => `/${item.toLowerCase().replaceAll(' ', '-')}`
const currencies = { MWK: { name: 'Malawi Kwacha', symbol: 'MK', rate: 1 }, CDF: { name: 'Congolese Franc', symbol: 'FC', rate: 1.72 }, USD: { name: 'US Dollar', symbol: '$', rate: 0.00058 } } as const
const roles = { Supplier: ['Overview', 'My products', 'Quotations', 'Orders', 'Stock management'], Buyer: ['Overview', 'Marketplace', 'Saved products', 'My enquiries', 'Orders'], Marketing: ['Overview', 'Referral links', 'Commissions', 'Reports', 'Activity history'], Logistics: ['Overview', 'Assigned deliveries', 'Shipments', 'Documents', 'Payment records'] } as const

type Currency = keyof typeof currencies
type Role = keyof typeof roles

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState('All commodities')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [currency, setCurrency] = useState<Currency>('MWK')
  const [currencyLoading, setCurrencyLoading] = useState(false)
  const [workspace, setWorkspace] = useState(false)
  const [role, setRole] = useState<Role>('Buyer')
  const [activeView, setActiveView] = useState('Overview')

  useEffect(() => {
    const saved = document.cookie.match(/masala_currency=(MWK|CDF|USD)/)?.[1] as Currency | undefined
    if (saved) setCurrency(saved)
  }, [])

  const switchCurrency = (next: Currency) => {
    if (next === currency) return
    setCurrencyLoading(true)
    window.setTimeout(() => {
      setCurrency(next)
      document.cookie = `masala_currency=${next}; max-age=31536000; path=/; samesite=lax`
      setCurrencyLoading(false)
    }, 420)
  }
  const displayAmount = (amount: number) => `${currencies[currency].symbol} ${Math.round(amount * currencies[currency].rate).toLocaleString()} ${currency}`

  return (
    <main className="min-h-screen overflow-hidden bg-[#faf9f5] text-[#242b27]">
      <SiteHeader />

      <section id="top" className="hero-section">
        <HeroSection/>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28"><div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-end"><div><p className="eyebrow">A clearer way to trade</p><h2>From harvest to <em>destination.</em></h2></div><p className="max-w-xl text-lg leading-8 text-[#6b756e]">MASALA FOOD makes agricultural trade more transparent, coordinated, and accessible. We bring the right people, products, and pathways together in one professional network.</p></div><div className="mt-16 grid gap-4 md:grid-cols-3"><ServiceCard icon={<ShieldCheck />} number="01" title="Trusted supply" text="Discover verified producers and quality-led commodity listings." /><ServiceCard icon={<Truck />} number="02" title="Coordinated logistics" text="Move goods with clear milestones, documents, and delivery support." /><ServiceCard icon={<Check />} number="03" title="Confident trade" text="Make informed decisions with structured enquiries and quotations." /></div></section>

      <section id="marketplace" className="bg-[#174d35] px-5 py-20 text-white lg:px-8 lg:py-28"><div className="mx-auto max-w-7xl"><div className="flex flex-col justify-between gap-7 md:flex-row md:items-end"><div><p className="eyebrow text-[#e8b44a]">Explore supply</p><h2 className="text-white">Market-ready <em>commodities.</em></h2></div><a href="#contact" className="button button-light">View all listings <ArrowRight size={16} /></a></div><div className="mt-12 flex flex-wrap gap-2 border-b border-white/15 pb-5">{['All commodities', 'Grains', 'Legumes', 'Oils', 'Processed goods'].map((category) => <button key={category} onClick={() => setActiveCategory(category)} className={`category-pill ${activeCategory === category ? 'active' : ''}`}>{category}</button>)}</div><div className="mt-8 grid gap-5 md:grid-cols-3">{commodities.map((item, i) => <article key={item.name} className="commodity-card" style={{ '--delay': `${i * 100}ms` } as React.CSSProperties}><div className="commodity-image" style={{ backgroundImage: `url(${item.image})` }}><span>{item.tag}</span><button aria-label={`Search ${item.name}`}><Search size={17} /></button></div><div className="p-5"><p className="text-xs uppercase tracking-[.16em] text-[#9eb3a3]">{item.origin}</p><h3>{item.name}</h3><div className="mt-5 flex justify-between text-sm"><span className="text-[#9eb3a3]">{item.grade}</span><strong>{item.quantity}</strong></div></div></article>)}</div></div></section>

      <section id="how-it-works" className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28"><div className="grid gap-14 lg:grid-cols-[.85fr_1.15fr]"><div><p className="eyebrow">How it works</p><h2>A better journey for <em>every partner.</em></h2><p className="mt-6 leading-7 text-[#6b756e]">Every transaction is built around clarity — from the first enquiry to the final delivery record.</p><a href="#contact" className="button button-dark mt-8">See the full process <ArrowRight size={16} /></a></div><div className="process-list">{['Register and verify your business', 'Discover products or submit a sourcing request', 'Receive a clear quotation and agreed terms', 'Coordinate fulfilment, logistics and delivery'].map((step, i) => <div className="process-step" key={step}><div className="step-number">0{i + 1}</div><div><h3>{step}</h3><p>{['Tell us who you are and what you trade.', 'Browse approved supply with relevant specifications.', 'Align on product, transport, fees and timing.', 'Follow recorded milestones through to completion.'][i]}</p></div><ArrowRight size={18} /></div>)}</div></div></section>

      <section id="join" className="join-section"><div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24"><div className="max-w-2xl"><p className="eyebrow text-[#e8b44a]">Build your network</p><h2 className="text-white">Trade with more <em>possibility.</em></h2><p className="mt-6 text-lg leading-8 text-white/70">Whether you supply, source, promote or deliver, there is a place for your business in the MASALA FOOD network.</p><div className="mt-8 flex flex-wrap gap-3"><a className="button button-gold" href="#contact">Find your pathway <ArrowRight size={16} /></a><a className="button button-outline" href="#contact">Talk to our team</a></div></div></div></section>

      <footer id="contact" className="border-t border-[#dfe5df] bg-[#faf9f5]"><div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-[1.3fr_1fr_1fr_1.3fr] lg:px-8"><div><a href="#top" className="brand-mark dark"><span>MF</span><strong>MASALA<br />FOOD</strong></a><p className="mt-6 max-w-xs text-sm leading-6 text-[#6b756e]">Connecting agricultural supply to global opportunity.</p></div><div><p className="footer-heading">Explore</p><a href="/marketplace">Marketplace</a><a href="/how-it-works">How it works</a><a href="#join">Become a member</a><a href="#contact">Contact us</a></div><div><p className="footer-heading">For partners</p><a href="#join">Suppliers & producers</a><a href="#join">Commercial buyers</a><a href="#join">Logistics providers</a><a href="#join">Trade support</a></div><div><p className="footer-heading">Stay connected</p><p className="text-sm leading-6 text-[#6b756e]">Receive occasional updates about new supply and trade opportunities.</p><form onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }} className="mt-4 flex border-b border-[#9eaaa1] py-2"><input value={email} onChange={(e) => setEmail(e.target.value)} required type="email" placeholder="Your email address" aria-label="Your email address" className="min-w-0 flex-1 bg-transparent text-sm outline-none" />{submitted ? <Check size={18} className="text-[#2f7d4a]" /> : <button aria-label="Subscribe"><ArrowRight size={18} /></button>}</form></div></div><div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 border-t border-[#dfe5df] px-5 py-6 text-xs text-[#6b756e] sm:flex-row lg:px-8"><span>© 2026 MASALA FOOD.</span><span>Terms · Privacy · Compliance</span><span>Designed by ARCHTECH</span></div></footer>
      {workspace && <Workspace role={role} setRole={setRole} activeView={activeView} setActiveView={setActiveView} currency={currency} displayAmount={displayAmount} onClose={() => setWorkspace(false)} />}
    </main>
  )
}

function Workspace({ role, setRole, activeView, setActiveView, currency, displayAmount, onClose }: { role: Role; setRole: (role: Role) => void; activeView: string; setActiveView: (view: string) => void; currency: Currency; displayAmount: (amount: number) => string; onClose: () => void }) {
  const stats = role === 'Supplier' ? [['Active listings', '12'], ['Open enquiries', '08'], ['Pending orders', '04']] : role === 'Buyer' ? [['Open enquiries', '06'], ['Saved products', '18'], ['In transit', '03']] : role === 'Marketing' ? [['Referred members', '24'], ['Pending commission', displayAmount(284000)], ['Eligible trades', '09']] : [['Assigned deliveries', '07'], ['In transit', '04'], ['Completed this month', '18']]
  return <div className="workspace-backdrop" role="dialog" aria-modal="true" aria-label={`${role} workspace`}><section className="workspace"><aside className="workspace-sidebar"><div className="flex items-center justify-between"><span className="brand-mark"><span>MF</span><strong>MASALA<br />FOOD</strong></span><button onClick={onClose} className="workspace-close" aria-label="Close dashboard"><X size={18} /></button></div><div className="workspace-role"><span className="status-dot">Verified workspace</span><select value={role} onChange={(e) => { setRole(e.target.value as Role); setActiveView('Overview') }} aria-label="Account role">{Object.keys(roles).map((item) => <option key={item}>{item}</option>)}</select></div><nav className="workspace-nav" aria-label="Workspace navigation">{roles[role].map((item) => <button key={item} className={activeView === item ? 'active' : ''} onClick={() => setActiveView(item)}>{item === 'Overview' ? <LayoutDashboard size={16} /> : item.includes('Order') || item.includes('delivery') ? <Package size={16} /> : item.includes('Quotation') || item.includes('Commission') ? <FileText size={16} /> : <Settings size={16} />}{item}</button>)}</nav><button className="workspace-logout" onClick={onClose}><LogOut size={16} /> Sign out</button></aside><div className="workspace-main"><header className="workspace-header"><div><p className="eyebrow">{role} portal</p><h2>{activeView}</h2></div><div className="flex items-center gap-3"><span className="workspace-currency"><CircleDollarSign size={15} /> Displaying {currency}</span><button className="notification-button" aria-label="Notifications"><Bell size={17} /><i /></button></div></header><div className="workspace-content"><div className="workspace-welcome"><div><p className="eyebrow">Tuesday, 23 October 2026</p><h3>{activeView === 'Overview' ? `Good morning, ${role.toLowerCase()} partner.` : activeView}</h3><p>Here&apos;s a clear view of what needs your attention today.</p></div><button className="button button-dark"><ArrowUpRight size={16} /> New request</button></div><div className="workspace-stats">{stats.map(([label, value]) => <div className="workspace-stat" key={label}><span>{label}</span><strong className={currency !== 'MWK' && value.includes(currency) ? 'currency-value' : ''}>{value}</strong><small><Clock3 size={12} /> Updated just now</small></div>)}</div><div className="workspace-grid"><div className="workspace-panel"><div className="panel-heading"><h4>Priority actions</h4><span className="status-badge">Live</span></div>{['Review new trade enquiry', 'Upload verification document', 'Confirm delivery milestone'].map((item, index) => <button className="action-row" key={item}><span className="action-index">0{index + 1}</span><span>{item}<small>Requires your attention</small></span><ArrowRight size={16} /></button>)}</div><div className="workspace-panel"><div className="panel-heading"><h4>Account status</h4><ShieldCheck size={18} className="text-[#2f7d4a]" /></div><div className="approval-card"><strong>Verification approved</strong><p>Your business profile is ready for structured trade.</p><div className="approval-line"><span /><span /><span /></div><small>Next review: 23 October 2027</small></div></div></div></div></div></section></div>
}

function CurrencyWave() {
  return <svg className="currency-wave" viewBox="0 0 112 28" role="img" aria-label="Indicative currency connection waveform" preserveAspectRatio="none">
    <path d="M1 15 C8 4, 13 23, 21 13 S34 7, 41 15 S53 25, 60 12 S72 5, 79 14 S91 24, 99 10 S106 12, 111 7" />
  </svg>
}

function ServiceCard({ icon, number, title, text }: { icon: React.ReactNode; number: string; title: string; text: string }) { return <div className="service-card"><div className="flex items-center justify-between"><span className="icon-box">{icon}</span><span className="text-xs tracking-[.2em] text-[#9eaaa1]">{number}</span></div><h3>{title}</h3><p>{text}</p><ArrowRight className="service-arrow" size={18} /></div> }
