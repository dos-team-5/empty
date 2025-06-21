import type { Metadata } from 'next';
import { Inter, Sora } from 'next/font/google';
import '@mantine/core/styles.css';
import './globals.css';
import '@mantine/dates/styles.css';
import 'mantine-datatable/styles.layer.css';
import { Providers } from '@/providers';
import { ColorSchemeScript, mantineHtmlProps } from '@mantine/core';
import { FpjsProvider } from '@fingerprintjs/fingerprintjs-pro-react';

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

export const metadata: Metadata = {
  title: 'Empty - Advertise On Ride-share Vehicles In High-Traffic Areas',
  description:
    'Generate an average of $300 in passive income each month by displaying an advertisement on your front doors',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const api_key = process.env.NEXT_PUBLIC_FPJS_API_KEY as string;
  console.log(api_key);
  return (
    <html lang="en" {...mantineHtmlProps} suppressHydrationWarning>
      <head>
        <ColorSchemeScript forceColorScheme="light" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
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
      </body>
    </html>
  );
}
