import { ArrowRight, Camera, FileCheck, Package } from 'lucide-react'
import { PageShell } from '@/components/page-shell'
import { AnimatedReveal } from '@/components/animated-reveal'

export default function SupplierPage() {
  return (
    <PageShell
      eyebrow="Become a supplier"
      title={<>Put your harvest in the <em>right hands.</em></>}
      intro="Create a supplier profile and submit detailed product listings for review before they reach approved buyers."
    >
      <section className="mx-auto max-w-7xl px-5 pb-24 lg:px-8">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            [Package, 'Product listings', 'Add specs, quantity, units, price, minimum order, packaging, origin, stock and availability.'],
            [Camera, 'Rich evidence', 'Upload photos, quality certificates and supporting documents with each listing.'],
            [FileCheck, 'Approval first', 'Update stock or withdraw a listing. Every submission is reviewed before publication.'],
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
          <a href="/become-member" className="button button-dark mt-10 group inline-flex">
            Start supplier registration{' '}
            <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
          </a>
        </AnimatedReveal>
      </section>
    </PageShell>
  )
}
