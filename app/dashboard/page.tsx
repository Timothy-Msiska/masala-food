import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { DashboardApp } from '@/components/dashboard-app'
import { isDashboardRole } from '@/components/dashboard-data'

type DashboardPageProps = {
  searchParams: Promise<{ role?: string; email?: string }>
}

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const { role, email } = await searchParams
  const cookieStore = await cookies()
  if (!isDashboardRole(role) || !email || cookieStore.get('masala_role')?.value !== role || cookieStore.get('masala_email')?.value !== email) redirect('/login')
  return <DashboardApp roleValue={role} email={email} initialView="overview" />
}
