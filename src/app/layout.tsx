import type { Metadata } from 'next'
import AppShell from '@/components/layout/AppShell'
import './globals.css'

export const metadata: Metadata = {
  title: 'Bhavika Portfolio',
  description: 'UX/UI designer portfolio.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  )
}
