import type { Metadata } from 'next';
import { Inter, Sora } from 'next/font/google';
import '@mantine/core/styles.css';
import './globals.css';
import { Providers } from '@/providers';
import { Box, ColorSchemeScript, mantineHtmlProps } from '@mantine/core';
import { Footer, Navbar } from '@/components';

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
  title: 'Empty - Advertise on rideshare vehicles in high-traffic areas',
  description:
    'Generate an average of $300 in passive income each month by displaying an advertisement on your front doors',
};

export default function RootLayout({
  children,
  signupModal,
}: Readonly<{
  children: React.ReactNode;
  signupModal: React.ReactNode;
}>) {
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
        className={`${poppins.variable} ${inter.variable} relative overflow-clip antialiased`}
      >
        <Providers>
          <Box maw={2000} mx={'auto'} className="">
            <Navbar />
            <Box>
              {signupModal}
              {children}
            </Box>
            <Footer />
          </Box>
        </Providers>
      </body>
    </html>
  );
}
