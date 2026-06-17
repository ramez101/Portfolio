import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Portfolio Ramez Werfelli',
    short_name: 'Ramez Werfelli',
    description:
      'Portfolio de Ramez Werfelli, developpeur web full-stack specialise Java/JEE, React, Next.js, Python et IA.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#eef3f7',
    theme_color: '#3286f4',
    lang: 'fr-TN',
    icons: [
      {
        src: '/RW.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/RW.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
