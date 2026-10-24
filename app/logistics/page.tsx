import { ArrowRight, FileText, MapPin, PackageCheck, Truck } from 'lucide-react'
import { PageShell } from '@/components/page-shell'
import { AnimatedReveal } from '@/components/animated-reveal'

const routes = [
  'Supplier collection',
  'Warehouse or depot',
  'Kasumbalesa border',
  'Buyer address in the DRC',
  'Other agreed destination',
]

export default function LogisticsPage() {
  return (
    <PageShell
      eyebrow="Logistics and delivery"
      title={<>Every route, <em>coordinated.</em></>}
      intro="Reliable movement needs more than a truck. We help partners plan, document and follow every cross-border delivery."
    >
      <section className="mx-auto max-w-7xl px-5 pb-24 lg:px-8">
        <div className="grid gap-5 md:grid-cols-3">
          <AnimatedReveal effect="fade-up" delay={80} duration={650}>
            <div className="service-card group">
              <div className="icon-box">
                <Truck />
              </div>
              <h3>Route planning</h3>
              <p>Coordinate origin, destination, dispatch date, transport quote and delivery milestones.</p>
            </div>
          </AnimatedReveal>

          <AnimatedReveal effect="fade-up" delay={160} duration={650}>
            <div className="service-card group">
              <div className="icon-box">
                <FileText />
              </div>
              <h3>Border documents</h3>
              <p>Keep invoices, certificates, border records, tracking references and proof of delivery together.</p>
            </div>
          </AnimatedReveal>

          <AnimatedReveal effect="fade-up" delay={240} duration={650}>
            <div className="service-card group">
              <div className="icon-box">
                <PackageCheck />
              </div>
              <h3>Live milestones</h3>
              <p>Know what needs attention and where each shipment stands from collection to completion.</p>
            </div>
          </AnimatedReveal>
        </div>

        <AnimatedReveal effect="fade-up" delay={200} duration={700}>
          <div className="mt-14 grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <p className="eyebrow">Configurable delivery</p>
              <h2>
                Choose the route that fits the <em>order.</em>
              </h2>
              <p className="mt-5 leading-7 text-[#6b756e]">
                Delivery options are quoted per order. Transport costs are not fixed prices and are confirmed after destination, load and timing are reviewed.
              </p>
            </div>
            <div className="route-options">
              {routes.map((route, i) => (
                <div className="route-option group" key={route}>
                  <MapPin size={17} className="transition-transform duration-200 group-hover:scale-110 text-[#2f7d4a]" />
                  <span>{route}</span>
                  <b>{String(i + 1).padStart(2, '0')}</b>
                </div>
              ))}
            </div>
          </div>
        </AnimatedReveal>

        <AnimatedReveal effect="fade-scale" delay={260} duration={750}>
          <div className="mt-12 rounded-sm bg-[#174d35] p-8 text-white">
            <p className="eyebrow text-[#e8b44a]">Delivery record</p>
            <div className="grid gap-6 md:grid-cols-4">
              <div className="transition-transform duration-200 hover:-translate-y-1">
                <small className="text-[#9eb3a3]">Dispatch</small>
                <strong className="block mt-1 text-lg">Scheduled</strong>
              </div>
              <div className="transition-transform duration-200 hover:-translate-y-1">
                <small className="text-[#9eb3a3]">Tracking</small>
                <strong className="block mt-1 text-lg">Reference linked</strong>
              </div>
              <div className="transition-transform duration-200 hover:-translate-y-1">
                <small className="text-[#9eb3a3]">Border</small>
                <strong className="block mt-1 text-lg">Documents checked</strong>
              </div>
              <div className="transition-transform duration-200 hover:-translate-y-1">
                <small className="text-[#9eb3a3]">Completion</small>
                <strong className="block mt-1 text-lg">Proof of delivery</strong>
              </div>
            </div>
            <a href="/contact" className="button button-gold mt-7 group">
              Discuss a route{' '}
              <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
            </a>
          </div>
        </AnimatedReveal>
      </section>
    </PageShell>
  )
}
