import { ShieldCheck } from 'lucide-react'
import { PageShell } from '@/components/page-shell'
import { AnimatedReveal } from '@/components/animated-reveal'

export default function TermsPage() {
  return (
    <PageShell
      eyebrow="Terms, privacy and compliance"
      title={<>Clear rules for <em>confident trade.</em></>}
      intro="Our policies explain how membership, ordering, cancellation, fees, documents and personal data are handled."
    >
      <section className="mx-auto max-w-4xl px-5 pb-24 lg:px-8">
        <div className="grid gap-4 md:grid-cols-2">
          {[
            'Terms of use',
            'Privacy policy',
            'Membership rules',
            'Ordering and cancellation',
            'Fees and commissions',
            'Compliance requirements',
          ].map((item, index) => (
            <AnimatedReveal key={item} effect="fade-up" delay={60 + index * 70} duration={650}>
              <div className="service-card group h-full">
                <ShieldCheck className="mb-4 text-[#2f7d4a] transition-transform duration-200 group-hover:scale-110" />
                <h3 className="!mt-0">{item}</h3>
                <p>Published policy with configurable requirements by country, product, currency and route.</p>
              </div>
            </AnimatedReveal>
          ))}
        </div>
      </section>
    </PageShell>
  )
}
