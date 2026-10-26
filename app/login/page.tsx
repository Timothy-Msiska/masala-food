'use client'

import { FormEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, LockKeyhole } from 'lucide-react'
import { PageShell } from '@/components/page-shell'

const credentials = {
  'admin@masala.food': { password: 'admin123', role: 'Administrator' },
  'supplier@masala.food': { password: 'supplier123', role: 'Supplier' },
  'buyer@masala.food': { password: 'buyer123', role: 'Buyer' },
  'marketing@masala.food': { password: 'marketing123', role: 'Marketing' },
  'logistics@masala.food': { password: 'logistics123', role: 'Logistics' },
} as const

type Role = (typeof credentials)[keyof typeof credentials]['role']

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState('')

  useEffect(() => {
    const url = new URL(window.location.href)
    if (url.searchParams.has('password')) {
      window.history.replaceState(window.history.state, '', url.pathname)
    }
  }, [])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const email = String(data.get('email') || '').trim().toLowerCase()
    const password = String(data.get('password') || '')
    const account = credentials[email as keyof typeof credentials]
    if (!account || account.password !== password) {
      setError('Those credentials do not match a MASALA FOOD member account.')
      return
    }
    setError('')
    setIsSubmitting(true)
    document.cookie = `masala_session=active; max-age=86400; path=/; samesite=lax`
    document.cookie = `masala_role=${account.role}; max-age=86400; path=/; samesite=lax`
    document.cookie = `masala_email=${email}; max-age=86400; path=/; samesite=lax`
    router.push(`/dashboard?role=${account.role}&email=${encodeURIComponent(email)}`)
  }

  return <PageShell eyebrow="Member access" title={<>Welcome back to <em>MASALA FOOD.</em></>} intro="Sign in to manage listings, enquiries, orders, documents, deliveries or referral activity."><section className="mx-auto max-w-md px-5 pb-24 lg:px-8"><form method="post" action="/login" onSubmit={handleSubmit} className="space-y-5 border border-[#dfe5df] bg-white p-7"><label className="block text-sm font-semibold text-[#174d35]">Email address<input name="email" className="mt-2 w-full border border-[#cfd9d1] p-3 outline-none" type="email" placeholder="you@company.com" autoComplete="email" required /></label><label className="block text-sm font-semibold text-[#174d35]">Password<input name="password" className="mt-2 w-full border border-[#cfd9d1] p-3 outline-none" type="password" placeholder="At least 6 characters" autoComplete="current-password" minLength={6} required /></label><div className="login-routing-note"><LockKeyhole size={15}/><span><strong>Automatic workspace routing</strong><small>The demo account role determines which workspace is shown.</small></span></div>{error && <p role="alert" className="text-xs text-red-700">{error}</p>}<button className="button button-dark w-full justify-center" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Opening your workspace…' : 'Open my dashboard'} {!isSubmitting && <ArrowRight size={16}/>}</button><div className="demo-credentials"><strong>Demo member accounts</strong><span>buyer@masala.food · buyer123</span><span>supplier@masala.food · supplier123</span><span>marketing@masala.food · marketing123</span><span>logistics@masala.food · logistics123</span><span>admin@masala.food · admin123</span></div><p className="flex items-center gap-2 text-xs text-[#6b756e]"><LockKeyhole size={14}/> Demo-only sign-in: these sample credentials are checked in the browser, not secure production authentication.</p></form></section></PageShell>
}
