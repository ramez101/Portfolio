import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/ui/Navbar'

export const metadata: Metadata = {
  metadataBase: new URL('https://portfolio-ramez.vercel.app'),
  title: 'Ramez Werfelli — Développeur Full-Stack',
  description:
    'Portfolio de Ramez Werfelli, développeur web full-stack spécialisé Java/JEE, React, Next.js, Python et IA. Basé à Tunis, Tunisie.',
  keywords: [
    'développeur web',
    'full-stack',
    'Java',
    'Next.js',
    'React',
    'Python',
    'Tunis',
    'Tunisie',
    'portfolio',
  ],
  authors: [{ name: 'Ramez Werfelli' }],
  icons: {
    icon: '/RW.png',
    shortcut: '/RW.png',
    apple: '/RW.png',
  },
  openGraph: {
    title: 'Ramez Werfelli — Développeur Full-Stack',
    description: 'Portfolio de Ramez Werfelli, développeur web full-stack basé à Tunis.',
    type: 'website',
    locale: 'fr_TN',
    images: ['/RW.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body>
        <Navbar />
        <main className="relative z-10">{children}</main>
        <footer className="relative z-10 text-center py-8 px-6 lg:px-16 border-t border-[var(--border)] bg-white/40 text-[var(--slate)] text-sm">
          <p>
            © 2026 <span className="text-[var(--blue)]">Ramez Werfelli</span> — Développeur Full-Stack · El Mourouj, Tunis
          </p>
        </footer>
      </body>
    </html>
  )
}
