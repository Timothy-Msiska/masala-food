'use client'

import { useSearchParams } from 'next/navigation'
import { ArrowRight, Bell, CheckCircle2, FileText, LayoutDashboard, LogOut, Package, Settings, ShieldCheck } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { AnimatedReveal } from '@/components/animated-reveal'

const dashboardData = {
  Supplier: {
    intro: 'Your supply network at a glance.',
    stats: [['Active listings', '12'], ['Open enquiries', '08'], ['Pending orders', '04']],
    actions: ['Add a commodity listing', 'Review a buyer enquiry', 'Upload verification documents'],
  },
  Buyer: {
    intro: 'Your sourcing activity at a glance.',
    stats: [['Open enquiries', '06'], ['Saved products', '18'], ['In transit', '03']],
    actions: ['Create a sourcing request', 'Compare verified suppliers', 'Review an incoming quotation'],
  },
  Marketing: {
    intro: 'Your referral activity at a glance.',
    stats: [['Referred members', '24'], ['Pending commission', 'MK 284,000'], ['Eligible trades', '09']],
    actions: ['Create a referral link', 'Review eligible commissions', 'Open activity report'],
  },
  Logistics: {
    intro: 'Your delivery operations at a glance.',
    stats: [['Assigned deliveries', '07'], ['In transit', '04'], ['Completed this month', '18']],
    actions: ['Review assigned delivery', 'Upload a delivery document', 'Confirm a route milestone'],
  },
} as const

type Role = keyof typeof dashboardData

export default function DashboardPage() {
  const params = useSearchParams()
  const role = (params.get('role') as Role) in dashboardData ? (params.get('role') as Role) : 'Buyer'
  const email = params.get('email') || 'member@masala.food'
  const data = dashboardData[role]

  return (
    <>
      <SiteHeader />
      <main className="dashboard-page page-fade-enter">
        <AnimatedReveal effect="fade-scale" delay={80} duration={650}>
          <div className="dashboard-frame">
            <aside className="dashboard-sidebar">
              <span className="brand-mark group">
                <span className="transition-transform duration-300 group-hover:scale-105">MF</span>
                <strong>
                  MASALA<br />FOOD
                </strong>
              </span>
              <span className="status-dot dashboard-status">Verified session</span>
              <nav aria-label="Dashboard navigation">
                {['Overview', ...data.actions, 'Documents', 'Settings'].map((item, index) => (
                  <a
                    href={index === 0 ? '#overview' : '#actions'}
                    key={item}
                    className={`group ${index === 0 ? 'active' : ''}`}
                  >
                    {index === 0 ? (
                      <LayoutDashboard size={16} />
                    ) : item.includes('document') ? (
                      <FileText size={16} />
                    ) : item.includes('delivery') ? (
                      <Package size={16} />
                    ) : (
                      <Settings size={16} />
                    )}
                    <span>{item}</span>
                  </a>
                ))}
              </nav>
              <a className="dashboard-logout group" href="/">
                <LogOut size={16} className="transition-transform group-hover:-translate-x-1" /> Sign out
              </a>
            </aside>

            <section className="dashboard-main" id="overview">
              <header className="dashboard-top">
                <div>
                  <p className="eyebrow">{role} workspace</p>
                  <h1>Good morning, {role.toLowerCase()} partner.</h1>
                  <p>{email} · {data.intro}</p>
                </div>
                <button className="notification-button group" aria-label="Notifications">
                  <Bell size={18} className="transition-transform group-hover:rotate-12" />
                  <i />
                </button>
              </header>

              <div className="dashboard-content">
                <div className="dashboard-title-row">
                  <div>
                    <p className="eyebrow">Tuesday, 23 October 2026</p>
                    <h2>Overview</h2>
                  </div>
                  <a className="button button-dark group" href="#actions">
                    New request{' '}
                    <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
                  </a>
                </div>

                <div className="dashboard-stats">
                  {data.stats.map(([label, value], i) => (
                    <AnimatedReveal key={label} effect="fade-up" delay={100 + i * 80} duration={600}>
                      <article className="dashboard-stat">
                        <span>{label}</span>
                        <strong>{value}</strong>
                        <small>
                          <CheckCircle2 size={12} className="text-[#2f7d4a]" /> Updated just now
                        </small>
                      </article>
                    </AnimatedReveal>
                  ))}
                </div>

                <div className="dashboard-columns">
                  <AnimatedReveal effect="fade-up" delay={260} duration={650}>
                    <article className="dashboard-panel" id="actions">
                      <div className="panel-heading">
                        <h3>Priority actions</h3>
                        <span className="status-badge">Live</span>
                      </div>
                      {data.actions.map((action, index) => (
                        <button className="dashboard-action group" key={action}>
                          <b>0{index + 1}</b>
                          <span>
                            {action}
                            <small>Requires your attention</small>
                          </span>
                          <ArrowRight
                            size={16}
                            className="transition-transform duration-200 group-hover:translate-x-1 text-[#2f7d4a]"
                          />
                        </button>
                      ))}
                    </article>
                  </AnimatedReveal>

                  <AnimatedReveal effect="fade-up" delay={320} duration={650}>
                    <article className="dashboard-panel">
                      <div className="panel-heading">
                        <h3>Account status</h3>
                        <ShieldCheck className="text-[#2f7d4a]" size={19} />
                      </div>
                      <div className="dashboard-approval">
                        <strong>Verification approved</strong>
                        <p>Your {role.toLowerCase()} profile is ready for structured trade.</p>
                        <div>
                          <i />
                          <i />
                          <i />
                        </div>
                        <small>Next review: 23 October 2027</small>
                      </div>
                    </article>
                  </AnimatedReveal>
                </div>
              </div>
            </section>
          </div>
        </AnimatedReveal>
      </main>
    </>
  )
}
