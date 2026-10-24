'use client'

import { useState, useMemo } from 'react'
import { ArrowRight, Check, Filter, Search, ShieldCheck } from 'lucide-react'
import { PageShell } from '@/components/page-shell'
import { AnimatedReveal } from '@/components/animated-reveal'

const products = [
  { name: 'Premium maize', category: 'Grains', origin: 'Malawi · Central Region', grade: 'Grade A', quantity: '2,400 MT', price: 'From $286 / MT', packaging: '50 kg bags', stock: 'Available now' },
  { name: 'Red kidney beans', category: 'Legumes', origin: 'Malawi · Lilongwe', grade: 'Export quality', quantity: '850 MT', price: 'From $740 / MT', packaging: '25 kg bags', stock: 'Available now' },
  { name: 'Sunflower oil', category: 'Oils', origin: 'DRC · Lubumbashi', grade: 'Refined', quantity: '120,000 L', price: 'From $1.18 / L', packaging: '1 L / 20 L', stock: 'Limited stock' },
]

const categories = ['All commodities', 'Grains', 'Legumes', 'Vegetables', 'Fruits', 'Meat & fish', 'Oils', 'Flour', 'Processed goods']

export default function MarketplacePage() {
  const [activeCategory, setActiveCategory] = useState('All commodities')
  const [searchQuery, setSearchQuery] = useState('')
  const [isTransitioning, setIsTransitioning] = useState(false)

  const handleCategory = (category: string) => {
    if (category === activeCategory) return
    setIsTransitioning(true)
    setTimeout(() => {
      setActiveCategory(category)
      setIsTransitioning(false)
    }, 180)
  }

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCategory = activeCategory === 'All commodities' || p.category === activeCategory
      const matchSearch = !searchQuery || 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.origin.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.grade.toLowerCase().includes(searchQuery.toLowerCase())
      return matchCategory && matchSearch
    })
  }, [activeCategory, searchQuery])

  return (
    <PageShell
      eyebrow="Marketplace"
      title={<>Market-ready <em>commodities.</em></>}
      intro="Discover verified agricultural supply with the information, quality and pathways you need to trade confidently."
    >
      <section className="mx-auto max-w-7xl px-5 pb-24 lg:px-8">
        <AnimatedReveal effect="fade-up" delay={80} duration={600}>
          <div className="marketplace-toolbar">
            <div className="search-field group">
              <Search size={17} className="transition-colors group-focus-within:text-[#174d35]" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, origins or grades"
                aria-label="Search marketplace"
              />
            </div>
            <button className="filter-button group">
              <Filter size={16} className="transition-transform group-hover:rotate-12" /> Filters <span>6</span>
            </button>
          </div>
        </AnimatedReveal>

        <AnimatedReveal effect="fade-in" delay={140} duration={650}>
          <div className="flex flex-wrap gap-2 border-b border-[#dfe5df] pb-5">
            {categories.map((item) => (
              <button
                key={item}
                onClick={() => handleCategory(item)}
                className={`category-pill light-pill ${activeCategory === item ? 'active' : ''}`}
              >
                {item}
              </button>
            ))}
          </div>
        </AnimatedReveal>

        <div className={`mt-8 grid gap-5 md:grid-cols-3 commodity-grid-transition ${isTransitioning ? 'is-changing' : ''}`}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, i) => (
              <AnimatedReveal key={product.name} effect="fade-up" delay={i * 100} duration={650}>
                <article className="commodity-card group">
                  <div
                    className="commodity-image"
                    style={{ backgroundImage: "url('/masala-hero.png')" }}
                  >
                    <span>{i === 0 ? 'Featured' : 'Verified'}</span>
                    <button aria-label={`Search ${product.name}`}>
                      <Search size={17} />
                    </button>
                  </div>
                  <div className="p-5 text-white">
                    <div className="flex items-center justify-between">
                      <p className="text-xs uppercase tracking-[.16em] text-[#9eb3a3]">{product.origin}</p>
                      <ShieldCheck size={16} className="text-[#e8b44a]" />
                    </div>
                    <h3 className="transition-colors duration-200 group-hover:text-[#e8b44a]">{product.name}</h3>
                    <div className="mt-5 grid grid-cols-2 gap-y-3 text-sm">
                      <span className="text-[#9eb3a3]">Grade</span>
                      <strong>{product.grade}</strong>
                      <span className="text-[#9eb3a3]">Available</span>
                      <strong>{product.quantity}</strong>
                      <span className="text-[#9eb3a3]">Packaging</span>
                      <strong>{product.packaging}</strong>
                      <span className="text-[#9eb3a3]">Price</span>
                      <strong>{product.price}</strong>
                    </div>
                    <div className="mt-5 flex items-center justify-between border-t border-white/15 pt-4 text-xs">
                      <span className="text-[#bde2c7]">
                        <Check size={13} className="mr-1 inline" />
                        {product.stock}
                      </span>
                      <a href="/become-buyer" className="font-bold text-[#e8b44a] hover:underline inline-flex items-center gap-1 group/link">
                        View details <ArrowRight size={14} className="transition-transform group-hover/link:translate-x-1" />
                      </a>
                    </div>
                  </div>
                </article>
              </AnimatedReveal>
            ))
          ) : (
            <div className="col-span-3 py-16 text-center text-[#6b756e]">
              <p className="text-lg">No commodities found matching &ldquo;{searchQuery || activeCategory}&rdquo;.</p>
              <button
                onClick={() => { setActiveCategory('All commodities'); setSearchQuery('') }}
                className="mt-4 button button-dark"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>

        <AnimatedReveal effect="fade-up" delay={260} duration={700}>
          <div className="mt-12 grid gap-4 rounded-sm border border-[#dfe5df] bg-[#eef4ee] p-6 md:grid-cols-3">
            <div>
              <p className="eyebrow">Buyer note</p>
              <h3 className="text-xl text-[#174d35]">Supplier identities are protected.</h3>
            </div>
            <p className="text-sm leading-6 text-[#6b756e] md:col-span-2">
              Listings show origin, specifications, quantity, units, price guidance and availability. Approved buyers receive supplier details after an enquiry is reviewed.
            </p>
          </div>
        </AnimatedReveal>
      </section>
    </PageShell>
  )
}
