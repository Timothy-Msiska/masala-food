import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'MASALA FOOD | Dashboard',
  description: 'Role-based MASALA FOOD trade workspace.',
  robots: { index: false, follow: false },
}

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const cookieStore = await cookies()
  if (cookieStore.get('masala_session')?.value !== 'active') redirect('/login')
  return children
}
