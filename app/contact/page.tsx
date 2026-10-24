import { Mail, MessageCircle, Phone } from 'lucide-react'
import { PageShell } from '@/components/page-shell'
import { AnimatedReveal } from '@/components/animated-reveal'

export default function ContactPage() {
  return (
    <PageShell
      eyebrow="Contact us"
      title={<>Let&apos;s move the <em>conversation forward.</em></>}
      intro="Tell us whether you are supplying, sourcing, promoting or delivering. Our team will route your enquiry to the right pathway."
    >
      <section className="mx-auto grid max-w-7xl gap-5 px-5 pb-24 md:grid-cols-3 lg:px-8">
        {[
          [Mail, 'Email', 'trade@masalafood.com'],
          [Phone, 'Phone', 'Available for registered partners'],
          [MessageCircle, 'WhatsApp', 'Available where commercially sensible'],
        ].map(([Icon, title, text], index) => (
          <AnimatedReveal key={title as string} effect="fade-up" delay={80 + index * 90} duration={650}>
            <div className="service-card group h-full">
              <Icon className="mb-5 text-[#2f7d4a] transition-transform duration-200 group-hover:scale-110" />
              <h3 className="!mt-0">{title as string}</h3>
              <p>{text as string}</p>
            </div>
          </AnimatedReveal>
        ))}
      </section>
    </PageShell>
  )
}
