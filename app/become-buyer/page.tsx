import { ArrowRight, Search, Truck } from 'lucide-react'
import { PageShell } from '@/components/page-shell'
import { AnimatedReveal } from '@/components/animated-reveal'

export default function BuyerPage() {
  return (
    <PageShell
      eyebrow="Become a buyer"
      title={<>Source with more <em>confidence.</em></>}
      intro="Find approved supply, submit structured enquiries and receive quotations that include product, transport, fees and timing."
    >
      <section className="mx-auto max-w-7xl px-5 pb-24 lg:px-8">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            [Search, 'Browse supply', 'Filter by category, quantity, origin, price, grade and availability.'],
            [Truck, 'Choose delivery', 'Request supplier collection, warehouse, Kasumbalesa or delivery to your DRC address.'],
            [ArrowRight, 'Track the order', 'Move from enquiry to quotation, confirmed order and completed transaction.'],
          ].map(([Icon, title, text], index) => (
            <AnimatedReveal key={title as string} effect="fade-up" delay={80 + index * 90} duration={650}>
              <div className="service-card group h-full">
                <Icon className="mb-5 text-[#2f7d4a] transition-transform duration-200 group-hover:scale-110" />
                <h3 className="!mt-0">{title as string}</h3>
                <p>{text as string}</p>
              </div>
            </AnimatedReveal>
          ))}
        </div>

        <AnimatedReveal effect="fade-up" delay={260} duration={650}>
          <a href="/marketplace" className="button button-dark mt-10 group inline-flex">
            Explore the marketplace{' '}
            <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
          </a>
        </AnimatedReveal>
      </section>
    </PageShell>
  )
}
