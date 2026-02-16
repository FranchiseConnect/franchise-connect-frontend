import type { Metadata, Viewport } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'
import BottomNav from '@/components/layout/bottom-nav'
import InstallPrompt from '@/components/pwa/install-prompt'
import OfflineBanner from '@/components/pwa/offline-banner'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'FranchiseConnect - Find Franchise Opportunities',
  description: 'Discover verified franchise opportunities in your city. Connect business owners with potential franchisees.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'FranchiseConnect',
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: '/icons/icon-192x192.png',
    apple: '/icons/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    title: 'FranchiseConnect - Find Franchise Opportunities',
    description: 'Discover verified franchise opportunities in your city',
    siteName: 'FranchiseConnect',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FranchiseConnect - Find Franchise Opportunities',
    description: 'Discover verified franchise opportunities in your city',
    images: ['/og-image.png'],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#2563EB',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body className={`${inter.variable} ${poppins.variable} font-sans`}>
        <OfflineBanner />
        <main className="min-h-screen bg-muted pb-24 md:pb-0">
          {children}
        </main>
        <BottomNav />
        <InstallPrompt />
        <Toaster />
      </body>
    </html>
  )
}
