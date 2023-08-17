import { Notification } from '@/components'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthRealtorProvider } from '@/context/auth-realtor'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'D&SI imóveis',
  description: 'Plataforma para encontrar imóveis'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <AuthRealtorProvider>
          <>
            <Notification />
            {children}
          </>
        </AuthRealtorProvider>
      </body>
    </html>
  )
}
