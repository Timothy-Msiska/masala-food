import { ArrowRight, CircleDollarSign, FileCheck, LockKeyhole, Receipt } from 'lucide-react'
import { PageShell } from '@/components/page-shell'
import { AnimatedReveal } from '@/components/animated-reveal'

export default function TradeSupportPage() {
  return (
    <PageShell
      eyebrow="Banking and trade support"
      title={<>Make the next move with <em>clarity.</em></>}
      intro="Secure documents, transparent fees and recorded payment milestones help partners move from quotation to settlement with confidence."
    >
      <section className="mx-auto max-w-7xl px-5 pb-24 lg:px-8">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {[
            [LockKeyhole, 'Secure uploads', 'Keep invoices, certificates and payment documents in a protected order area.'],
            [Receipt, 'Invoice records', 'Link invoice numbers, payment status and transaction references to every order.'],
            [CircleDollarSign, 'USD arrangements', 'Support agreed USD payment workflows with clear settlement milestones.'],
            [FileCheck, 'Compliance support', 'Configure document requirements by product category and destination.'],
          ].map(([Icon, title, text], index) => (
            <AnimatedReveal key={title as string} effect="fade-up" delay={80 + index * 100} duration={750}>
              <div className="service-card group h-full">
                <Icon className="mb-5 text-[#2f7d4a] transition-transform duration-300 group-hover:scale-110" />
                <h3 className="!mt-0">{title as string}</h3>
                <p>{text as string}</p>
              </div>
            </AnimatedReveal>
          ))}
        </div>

        <AnimatedReveal effect="fade-up" delay={260} duration={800}>
          <div className="mt-14 grid gap-10 lg:grid-cols-2">
            <div>
              <p className="eyebrow">Transparent terms</p>
              <h2>
                Every fee has a <em>place.</em>
              </h2>
              <p className="mt-5 leading-7 text-[#6b756e]">
                Membership fees, commissions and service charges are configurable by administrators and recorded per transaction. Partners can see what applies before confirming.
              </p>
            </div>
            <div className="rounded-sm bg-[#eef4ee] p-7">
              <p className="eyebrow">Order settlement</p>
              {['Quotation prepared', 'Terms confirmed', 'Invoice issued', 'Payment reference recorded', 'Transaction completed'].map(
                (item, i) => (
                  <div className="flex items-center gap-4 border-b border-[#d5e1d6] py-4 text-sm group" key={item}>
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-[#174d35] text-xs text-white transition-transform duration-300 group-hover:scale-110">
                      {i + 1}
                    </span>
                    <span className="transition-colors duration-300 group-hover:text-[#174d35] font-medium">{item}</span>
                  </div>
                )
              )}
            </div>
          </div>
        </AnimatedReveal>

        <AnimatedReveal effect="fade-scale" delay={340} duration={800}>
          <div className="mt-12 join-section p-8 text-white md:p-12 rounded-sm">
            <p className="eyebrow text-[#e8b44a]">Start a conversation</p>
            <h2 className="text-white">Tell us what you&apos;re looking to trade.</h2>
            <a href="mailto:trade@masalafood.com" className="button button-gold mt-7 group">
              Contact the team{' '}
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </AnimatedReveal>
      </section>
    </PageShell>
  )
}
