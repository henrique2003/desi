import { Notification } from '@/components'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/context/auth'

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
        <AuthProvider>
          <>
            <Notification />
            {children}
          </>
        </AuthProvider>
      </body>
    </html>
  )
}
