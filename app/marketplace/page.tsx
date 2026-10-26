import { ArrowRight, Check, Filter, Search, ShieldCheck } from 'lucide-react'
import { PageShell } from '@/components/page-shell'

const products = [
  { name: 'Premium maize', category: 'Grains', origin: 'Malawi · Central Region', grade: 'Grade A', quantity: '2,400 MT', price: 'From $286 / MT', packaging: '50 kg bags', stock: 'Available now' },
  { name: 'Red kidney beans', category: 'Legumes', origin: 'Malawi · Lilongwe', grade: 'Export quality', quantity: '850 MT', price: 'From $740 / MT', packaging: '25 kg bags', stock: 'Available now' },
  { name: 'Sunflower oil', category: 'Oils', origin: 'DRC · Lubumbashi', grade: 'Refined', quantity: '120,000 L', price: 'From $1.18 / L', packaging: '1 L / 20 L', stock: 'Limited stock' },
]

export default function MarketplacePage() {
  return <PageShell eyebrow="Marketplace" title={<>Market-ready <em>commodities.</em></>} intro="Discover verified agricultural supply with the information, quality and pathways you need to trade confidently.">
    <section className="mx-auto max-w-7xl px-5 pb-24 lg:px-8">
      <div className="marketplace-toolbar"><div className="search-field"><Search size={17} /><input placeholder="Search products, origins or grades" aria-label="Search marketplace" /></div><button className="filter-button"><Filter size={16} /> Filters <span>6</span></button></div>
      <div className="flex flex-wrap gap-2 border-b border-[#dfe5df] pb-5">{['All commodities', 'Grains', 'Legumes', 'Vegetables', 'Fruits', 'Meat & fish', 'Oils', 'Flour', 'Processed goods'].map((item, i) => <button key={item} className={`category-pill light-pill ${i === 0 ? 'active' : ''}`}>{item}</button>)}</div>
      <div className="mt-8 grid gap-5 md:grid-cols-3">{products.map((product, i) => <article className="commodity-card" key={product.name}><div className="commodity-image" style={{ backgroundImage: "url('/masala-hero.png')" }}><span>{i === 0 ? 'Featured' : 'Verified'}</span><button aria-label={`Search ${product.name}`}><Search size={17} /></button></div><div className="p-5 text-white"><div className="flex items-center justify-between"><p className="text-xs uppercase tracking-[.16em] text-[#9eb3a3]">{product.origin}</p><ShieldCheck size={16} className="text-[#e8b44a]" /></div><h3>{product.name}</h3><div className="mt-5 grid grid-cols-2 gap-y-3 text-sm"><span className="text-[#9eb3a3]">Grade</span><strong>{product.grade}</strong><span className="text-[#9eb3a3]">Available</span><strong>{product.quantity}</strong><span className="text-[#9eb3a3]">Packaging</span><strong>{product.packaging}</strong><span className="text-[#9eb3a3]">Price</span><strong>{product.price}</strong></div><div className="mt-5 flex items-center justify-between border-t border-white/15 pt-4 text-xs"><span className="text-[#bde2c7]"><Check size={13} className="mr-1 inline" />{product.stock}</span><button className="font-bold text-[#e8b44a]">View details <ArrowRight size={14} className="inline" /></button></div></div></article>)}</div>
      <div className="mt-12 grid gap-4 rounded-sm border border-[#dfe5df] bg-[#eef4ee] p-6 md:grid-cols-3"><div><p className="eyebrow">Buyer note</p><h3 className="text-xl text-[#174d35]">Supplier identities are protected.</h3></div><p className="text-sm leading-6 text-[#6b756e] md:col-span-2">Listings show origin, specifications, quantity, units, price guidance and availability. Approved buyers receive supplier details after an enquiry is reviewed.</p></div>
    </section>
  </PageShell>
}
