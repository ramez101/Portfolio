import type { Metadata, Viewport } from 'next'
import './globals.css'
import Navbar from '@/components/ui/Navbar'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://portfolio-ramez.vercel.app'

const siteTitle = 'Ramez Werfelli - Developpeur Full-Stack'
const siteDescription =
  'Portfolio de Ramez Werfelli, developpeur web full-stack specialise Java/JEE, React, Next.js, Python et IA. Base a Tunis, Tunisie.'

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
      jobTitle: 'Developpeur web full-stack',
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
  themeColor: '#3286f4',
  colorScheme: 'light',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
          }}
        />
        <Navbar />
        <main className="relative z-10">{children}</main>
        <footer className="relative z-10 border-t border-[var(--border)] bg-white/40 px-6 py-8 text-center text-sm text-[var(--slate)] lg:px-16">
          <p>
            © 2026 <span className="text-[var(--blue)]">Ramez Werfelli</span> - Developpeur Full-Stack · El Mourouj, Tunis
          </p>
        </footer>
      </body>
    </html>
  )
}
