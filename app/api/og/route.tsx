import { ImageResponse } from 'next/og';
// App router includes @vercel/og/dist/index.edge as next/og

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0A0A0F',
          backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(108, 99, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(0, 217, 255, 0.1) 0%, transparent 50%)',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '40px 80px',
            borderRadius: '24px',
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
          }}
        >
            <div style={{ color: '#6C63FF', fontSize: 24, fontWeight: 600, marginBottom: 20 }}>
                Eriel Portfolio
            </div>
          <div
            style={{
              fontSize: 80,
              fontWeight: 800,
              background: 'linear-gradient(135deg, #6C63FF 0%, #00D9FF 100%)',
              backgroundClip: 'text',
              color: 'transparent',
              letterSpacing: '-0.05em',
            }}
          >
            Eriel Budiman
          </div>
          <div
            style={{
              fontSize: 32,
              color: 'rgba(255, 255, 255, 0.5)',
              marginTop: 20,
              textAlign: 'center',
            }}
          >
            Information Systems Student & Web Developer
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
