import type { Metadata, Viewport } from 'next'
import { Cairo, Inter, JetBrains_Mono, Space_Grotesk } from 'next/font/google'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})
const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  variable: '--font-cairo',
  display: 'swap',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://portfolio-ramez.vercel.app'

const siteTitle = 'Ramez Werfelli - Développeur Full-Stack'
const siteDescription =
  'Portfolio de Ramez Werfelli, développeur web full-stack spécialisé Java/JEE, React, Next.js, Python et IA. Basé à Tunis, Tunisie.'

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'Portfolio Ramez Werfelli',
      description: siteDescription,
      inLanguage: 'fr-TN',
      publisher: {
        '@id': `${siteUrl}/#person`,
      },
    },
    {
      '@type': 'Person',
      '@id': `${siteUrl}/#person`,
      name: 'Ramez Werfelli',
      url: siteUrl,
      image: `${siteUrl}/RW.png`,
      jobTitle: 'Développeur web full-stack',
      email: 'mailto:ramez.werfelli9@gmail.com',
      telephone: '+21655568854',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'El Mourouj',
        addressRegion: 'Tunis',
        addressCountry: 'TN',
      },
      sameAs: ['https://linkedin.com/in/ramez-werfelli'],
      knowsAbout: [
        'Java',
        'Jakarta EE',
        'React',
        'Next.js',
        'TypeScript',
        'Python',
        'PostgreSQL',
        'Oracle SQL',
        'Intelligence artificielle',
      ],
    },
    {
      '@type': 'ProfilePage',
      '@id': `${siteUrl}/#profile`,
      url: siteUrl,
      name: siteTitle,
      description: siteDescription,
      inLanguage: 'fr-TN',
      mainEntity: {
        '@id': `${siteUrl}/#person`,
      },
    },
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: 'Portfolio Ramez Werfelli',
  title: {
    default: siteTitle,
    template: '%s | Ramez Werfelli',
  },
  description: siteDescription,
  keywords: [
    'Ramez Werfelli',
    'developpeur web Tunisie',
    'developpeur full-stack Tunis',
    'full-stack',
    'Java',
    'Jakarta EE',
    'Next.js',
    'React',
    'TypeScript',
    'Python',
    'PostgreSQL',
    'Oracle SQL',
    'IA',
    'Tunis',
    'Tunisie',
    'portfolio',
  ],
  authors: [{ name: 'Ramez Werfelli', url: siteUrl }],
  creator: 'Ramez Werfelli',
  publisher: 'Ramez Werfelli',
  category: 'portfolio',
  alternates: {
    canonical: '/',
  },
  manifest: '/manifest.webmanifest',
  icons: {
    icon: [{ url: '/RW.png', sizes: 'any', type: 'image/png' }],
    shortcut: '/RW.png',
    apple: [{ url: '/RW.png', sizes: '180x180', type: 'image/png' }],
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: '/',
    siteName: 'Portfolio Ramez Werfelli',
    type: 'website',
    locale: 'fr_TN',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Portfolio de Ramez Werfelli, developpeur full-stack',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: ['/opengraph-image'],
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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#f4f6fb',
  colorScheme: 'light',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`scroll-smooth ${spaceGrotesk.variable} ${inter.variable} ${jetBrainsMono.variable} ${cairo.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
          }}
        />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  )
}
