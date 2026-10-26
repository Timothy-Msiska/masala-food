import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'
import { DashboardStoreProvider } from '@/components/dashboard-store'

export const metadata: Metadata = {
  title: 'MASALA FOOD — Agricultural Trade, Connected',
  description: 'Connecting agricultural producers, commercial buyers, and logistics partners through trusted cross-border trade.',
  generator: 'v0.app',
  icons: {
    icon: '/masala-logo.png',
    apple: '/masala-logo.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className="antialiased">
        <DashboardStoreProvider>{children}</DashboardStoreProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
