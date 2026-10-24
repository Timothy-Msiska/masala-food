import { ArrowRight, Check, FileCheck, PackageCheck, ShieldCheck } from 'lucide-react'
import { PageShell } from '@/components/page-shell'
import { AnimatedReveal } from '@/components/animated-reveal'

const steps = [
  ['01', 'Create an account', 'Choose whether you are a supplier, buyer, marketing member, or logistics and service provider.'],
  ['02', 'Verify your business', 'Submit registration details and the documents required for your member category, product and destination.'],
  ['03', 'List or discover supply', 'Suppliers add specs, quantity, units, price, minimum order, packaging, origin, stock, photos and certificates.'],
  ['04', 'Submit an enquiry', 'Buyers select a product, required quantity, destination and preferred delivery option.'],
  ['05', 'Review and quotation', 'Our team reviews the request, confirms availability, prepares a product and transport quotation, and assigns partners.'],
  ['06', 'Confirm terms', 'Agree product, fees, currency, payment arrangements, delivery milestones and cancellation conditions.'],
  ['07', 'Prepare documents', 'Upload invoices, certificates, border documents and other compliance records to the secure order area.'],
  ['08', 'Coordinate dispatch', 'Track collection, warehouse or depot handling, Kasumbalesa crossing and onward delivery to the DRC.'],
  ['09', 'Confirm delivery', 'Record tracking references, dispatch dates and proof of delivery against the order.'],
  ['10', 'Settle and close', 'Link payment references, complete the transaction, and record any dispute or referral commission.'],
]

export default function HowItWorksPage() {
  return (
    <PageShell
      eyebrow="How it works"
      title={<>A better journey for <em>every partner.</em></>}
      intro="Every transaction is built around clarity, from account creation and enquiry to delivery, payment settlement and reporting."
    >
      <section className="mx-auto max-w-5xl px-5 pb-24 lg:px-8">
        <div className="process-list">
          {steps.map(([number, title, text], i) => (
            <AnimatedReveal key={number} effect="fade-up" delay={Math.min(i * 90, 600)} duration={750}>
              <div className="process-step">
                <div className="step-number">{number}</div>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
                <ArrowRight size={18} />
              </div>
            </AnimatedReveal>
          ))}
        </div>

        <AnimatedReveal effect="fade-up" delay={260} duration={750}>
          <div className="mt-10 rounded-sm border border-[#ecd79e] bg-[#fff8e6] p-6 text-sm leading-6 text-[#6b756e]">
            <strong className="text-[#174d35]">Important:</strong> An enquiry or order does not guarantee stock or constitute final acceptance. Availability, pricing, transport and terms are confirmed through the quotation and approval process.
          </div>
        </AnimatedReveal>

        <div className="mt-12 grid gap-5 md:grid-cols-4">
          {[
            [ShieldCheck, 'Verified'],
            [FileCheck, 'Documented'],
            [PackageCheck, 'Trackable'],
            [Check, 'Settled'],
          ].map(([Icon, label], index) => (
            <AnimatedReveal key={label as string} effect="fade-up" delay={180 + index * 120} duration={750}>
              <div className="service-card group h-full">
                <Icon className="mb-4 text-[#2f7d4a] transition-transform duration-300 group-hover:scale-110" />
                <h3 className="!mt-0">{label as string}</h3>
                <p>Recorded at each milestone.</p>
              </div>
            </AnimatedReveal>
          ))}
        </div>
      </section>
    </PageShell>
  )
}
