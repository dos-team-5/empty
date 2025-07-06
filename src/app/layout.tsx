import type { Metadata } from 'next';
import { Inter, Sora } from 'next/font/google';
import '@mantine/core/styles.css';
import './globals.css';
import '@mantine/dates/styles.css';
import 'mantine-datatable/styles.layer.css';
import { Providers } from '@/providers';
import { ColorSchemeScript, mantineHtmlProps } from '@mantine/core';
import { FpjsProvider } from '@fingerprintjs/fingerprintjs-pro-react';
import '@mantine/carousel/styles.css';
import { keywords } from '@/data/keyWords';
import Script from 'next/script';
import Image from 'next/image';

const poppins = Sora({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
  display: 'swap',
});
const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

// app/layout.tsx or any layout file

export const metadata: Metadata = {
  title: {
    default: 'Empty: Advertise on Rideshare Vehicles in High-Traffic Areas',
    template: '%s | EmptyAd',
  },
  description:
    'Empty: Boost your brand with high-impact rideshare advertising. Drivers, effortlessly earn up to $200/month on your usual routes. Track performance!',
  authors: [{ name: 'DevsOnSteroids', url: 'https://devsonsteroids.com' }],
  creator: 'DevsOnSteroids',
  publisher: 'DevsOnSteroids',
  keywords: [...keywords],
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL as string),
  twitter: {
    card: 'summary_large_image',
  },

  openGraph: {
    title: 'EmptyAd: Earn Passive Income Driving for Brands',
    description:
      'Monetize your commute with EmptyAd! Drivers earn up to $200/month displaying ads on their car. Connect with top brands and start earning effortlessly.',
    url: 'https://www.emptyad.com/',
    siteName: 'EmptyAd',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/og/opengraph.png`,
        width: 1200,
        height: 630,
        alt: 'EmptyAd: Car Advertising for Passive Income',
      },
    ],
    type: 'website',
  },
  // Optional: Add Twitter metadata, icons, etc.
  // twitter: {
  //   card: 'summary_large_image',
  //   site: '@your_twitter',
  //   title: 'EmptyAd: Earn Passive Income Driving for Brands',
  //   description: '...',
  //   images: ['https://...'],
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const api_key = process.env.NEXT_PUBLIC_FPJS_API_KEY as string;

  return (
    <html lang="en" {...mantineHtmlProps} suppressHydrationWarning>
      <head>
        <ColorSchemeScript forceColorScheme="light" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <meta name="publisher" content="DevsOnSteroids" />
        <link rel="canonical" href="https://emptyad.com/" />
        <meta name="robots" content="index, follow" />
      </head>
      <body
        className={`${poppins.variable} ${inter.variable} relative antialiased`}
      >
        <FpjsProvider
          loadOptions={{
            apiKey: api_key,
          }}
        >
          <Providers>{children}</Providers>
        </FpjsProvider>
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', ${process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID});
          fbq('track', 'PageView');
        `}
        </Script>
        <noscript>
          <Image
            alt="meta pixel"
            height="1"
            width="1"
            style={{ display: 'none' }}
            src={`https://www.facebook.com/tr?id=${process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID}&ev=PageView&noscript=1`}
          />
        </noscript>
      </body>
    </html>
  );
}
