import React from 'react'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: {
    default: 'Merit Graphics Solutions | Creative Design & Development Agency',
    template: '%s | Merit Graphics Solutions'
  },
  description: 'Merit Graphics Solutions is a creative design and development agency specializing in brand identity, UI/UX design, motion graphics, print design, and web development services.',
  keywords: ['design agency', 'brand identity', 'UI/UX design', 'motion graphics', 'print design', 'web development', 'Nairobi', 'Kenya'],
  authors: [{ name: 'Merit Graphics Solutions' }],
  creator: 'Merit Graphics Solutions',
  publisher: 'Merit Graphics Solutions',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://meritgraphics.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://meritgraphics.com',
    title: 'Merit Graphics Solutions | Creative Design & Development Agency',
    description: 'Merit Graphics Solutions is a creative design and development agency specializing in brand identity, UI/UX design, motion graphics, print design, and web development services.',
    siteName: 'Merit Graphics Solutions',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Merit Graphics Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Merit Graphics Solutions | Creative Design & Development Agency',
    description: 'Merit Graphics Solutions is a creative design and development agency specializing in brand identity, UI/UX design, motion graphics, print design, and web development services.',
    images: ['/og-image.jpg'],
    creator: '@meritgraphics',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Merit Graphics Solutions',
    url: 'https://meritgraphics.com',
    logo: 'https://meritgraphics.com/portfolio/Logo@3x.png',
    description: 'Merit Graphics Solutions is a creative design and development agency specializing in brand identity, UI/UX design, motion graphics, print design, and web development services.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Roysambu',
      addressLocality: 'Nairobi',
      addressCountry: 'KE'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+254-714-531-574',
      contactType: 'customer service',
      email: 'meritmediapro007@gmail.com',
      availableLanguage: ['English']
    },
    sameAs: [
      'https://www.instagram.com/meritgraphics',
      'https://www.linkedin.com/company/meritgraphics',
      'https://twitter.com/meritgraphics'
    ]
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${poppins.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
} 