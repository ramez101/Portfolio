import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Portfolio Ramez Werfelli - Developpeur Full-Stack'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: 'center',
          background: '#eef3f7',
          display: 'flex',
          height: '100%',
          justifyContent: 'center',
          padding: 56,
          width: '100%',
        }}
      >
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #dce4ec',
            borderRadius: 28,
            boxShadow: '0 28px 100px rgba(17, 28, 47, 0.16)',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            justifyContent: 'space-between',
            padding: 58,
            width: '100%',
          }}
        >
          <div
            style={{
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <div
              style={{
                alignItems: 'center',
                background: 'linear-gradient(135deg, #3286f4, #35d4d4)',
                borderRadius: 18,
                color: '#ffffff',
                display: 'flex',
                fontSize: 32,
                fontWeight: 800,
                height: 82,
                justifyContent: 'center',
                letterSpacing: -1,
                width: 82,
              }}
            >
              RW
            </div>
            <div
              style={{
                color: '#3286f4',
                fontSize: 26,
                fontWeight: 700,
              }}
            >
              Portfolio
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                color: '#111c2f',
                fontSize: 82,
                fontWeight: 800,
                letterSpacing: -2,
                lineHeight: 1.02,
              }}
            >
              Ramez Werfelli
            </div>
            <div
              style={{
                background: 'linear-gradient(135deg, #3286f4, #35d4d4)',
                backgroundClip: 'text',
                color: 'transparent',
                fontSize: 58,
                fontWeight: 800,
                lineHeight: 1.15,
                marginTop: 10,
              }}
            >
              Developpeur Web Full-Stack
            </div>
            <div
              style={{
                color: '#687386',
                fontSize: 30,
                lineHeight: 1.45,
                marginTop: 28,
                maxWidth: 860,
              }}
            >
              Java/JEE · React · Next.js · TypeScript · Python · IA
            </div>
          </div>

          <div
            style={{
              alignItems: 'center',
              borderTop: '1px solid #e8eef4',
              color: '#687386',
              display: 'flex',
              fontSize: 26,
              justifyContent: 'space-between',
              paddingTop: 28,
            }}
          >
            <span>Tunis, Tunisie</span>
            <span>portfolio-ramez.vercel.app</span>
          </div>
        </div>
      </div>
    ),
    size
  )
}
