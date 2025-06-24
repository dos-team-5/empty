/* eslint-disable @typescript-eslint/no-explicit-any */
import { ImageResponse } from 'next/og';

export const runtime = 'edge'; // 👈 This is required for @vercel/og

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const title =
      searchParams.get('title') ??
      'Advertise on Rideshare Vehicles in High-Traffic Areas';
    const subtitle =
      searchParams.get('subtitle') ??
      'Transform your daily commute into a premium revenue stream';

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
            backgroundColor: '#000000',
            color: 'white',
            fontFamily: 'system-ui',
            padding: '60px',
            position: 'relative',
          }}
        >
          {/* Background gradient effects */}
          <div
            style={{
              position: 'absolute',
              top: '0',
              left: '0',
              width: '400px',
              height: '400px',
              backgroundColor: '#CB6AA7',
              borderRadius: '50%',
              opacity: 0.1,
              filter: 'blur(100px)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '0',
              right: '0',
              width: '300px',
              height: '300px',
              backgroundColor: '#8B5CF6',
              borderRadius: '50%',
              opacity: 0.1,
              filter: 'blur(80px)',
            }}
          />

          {/* Main content container */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              maxWidth: '1000px',
              zIndex: 2,
            }}
          >
            {/* Logo section */}
            <div
              style={{
                marginBottom: '60px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  fontSize: '80px',
                  fontWeight: '300',
                  letterSpacing: '12px',
                  textTransform: 'uppercase',
                  marginBottom: '30px',
                  color: 'white',
                }}
              >
                Empty
              </div>
              <div
                style={{
                  width: '64px',
                  height: '4px',
                  backgroundColor: '#CB6AA7',
                  borderRadius: '2px',
                }}
              />
            </div>

            {/* Main headline */}
            <div
              style={{
                fontSize: title.length > 50 ? '48px' : '56px',
                fontWeight: '700',
                color: '#CB6AA7',
                lineHeight: 1.1,
                marginBottom: '40px',
                textAlign: 'center',
              }}
            >
              {title}
            </div>

            {/* Subtitle */}
            <div
              style={{
                fontSize: '28px',
                color: 'rgba(255, 255, 255, 0.7)',
                fontWeight: '400',
                lineHeight: 1.4,
                marginBottom: '60px',
                textAlign: 'center',
              }}
            >
              {subtitle}
            </div>

            {/* Premium indicators */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '30px',
                fontSize: '16px',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                color: 'rgba(255, 255, 255, 0.6)',
                fontWeight: '500',
              }}
            >
              <span>Premium Network</span>
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  backgroundColor: '#CB6AA7',
                  borderRadius: '50%',
                }}
              />
              <span>Exclusive Brands</span>
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  backgroundColor: '#CB6AA7',
                  borderRadius: '50%',
                }}
              />
              <span>Passive Income</span>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.log(`Error generating OG image: ${e.message}`);
    return new Response(`Failed to generate the image: ${e.message}`, {
      status: 500,
    });
  }
}
