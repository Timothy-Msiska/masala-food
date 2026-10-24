'use client'

import { FormEvent, useState } from 'react'
import { ArrowRight, LockKeyhole } from 'lucide-react'
import { PageShell } from '@/components/page-shell'
import { AnimatedReveal } from '@/components/animated-reveal'

const roles = ['Supplier', 'Buyer', 'Marketing', 'Logistics'] as const

export default function LoginPage() {
  const [role, setRole] = useState<(typeof roles)[number]>('Buyer')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const email = String(data.get('email') || '').trim()
    const password = String(data.get('password') || '')
    if (!email || password.length < 6) {
      setError('Enter a valid email and a password with at least 6 characters.')
      return
    }
    setLoading(true)
    document.cookie = `masala_session=active; max-age=86400; path=/; samesite=lax`
    setTimeout(() => {
      window.location.href = `/dashboard?role=${role}&email=${encodeURIComponent(email)}`
    }, 200)
  }

  return (
    <PageShell
      eyebrow="Member access"
      title={<>Welcome back to <em>MASALA FOOD.</em></>}
      intro="Sign in to manage listings, enquiries, orders, documents, deliveries or referral activity."
    >
      <section className="mx-auto max-w-md px-5 pb-24 lg:px-8">
        <AnimatedReveal effect="fade-up" delay={100} duration={650}>
          <form onSubmit={handleSubmit} className="space-y-5 border border-[#dfe5df] bg-white p-8 rounded-sm shadow-sm transition-shadow hover:shadow-md">
            <label className="block text-sm font-semibold text-[#174d35]">
              Email address
              <input
                name="email"
                className="mt-2 w-full border border-[#cfd9d1] p-3 outline-none rounded-sm transition-all focus:border-[#174d35] focus:ring-2 focus:ring-[#174d35]/10"
                type="email"
                placeholder="you@company.com"
                autoComplete="email"
                required
              />
            </label>
            <label className="block text-sm font-semibold text-[#174d35]">
              Password
              <input
                name="password"
                className="mt-2 w-full border border-[#cfd9d1] p-3 outline-none rounded-sm transition-all focus:border-[#174d35] focus:ring-2 focus:ring-[#174d35]/10"
                type="password"
                placeholder="At least 6 characters"
                autoComplete="current-password"
                minLength={6}
                required
              />
            </label>
            <label className="block text-sm font-semibold text-[#174d35]">
              Access pathway
              <select
                value={role}
                onChange={(event) => setRole(event.target.value as (typeof roles)[number])}
                className="mt-2 w-full border border-[#cfd9d1] bg-white p-3 outline-none rounded-sm transition-all focus:border-[#174d35] cursor-pointer"
              >
                {roles.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>
            {error && (
              <p role="alert" className="text-xs text-red-700 bg-red-50 p-2.5 rounded-sm border border-red-200 animate-in fade-in">
                {error}
              </p>
            )}
            <button
              className="button button-dark w-full justify-center group"
              type="submit"
              disabled={loading}
            >
              {loading ? 'Opening...' : 'Open my dashboard'}{' '}
              <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
            </button>
            <p className="flex items-center justify-center gap-2 text-xs text-[#6b756e] pt-1">
              <LockKeyhole size={14} className="text-[#2f7d4a]" /> Secure, role-based member access.
            </p>
          </form>
        </AnimatedReveal>
      </section>
    </PageShell>
  )
}
