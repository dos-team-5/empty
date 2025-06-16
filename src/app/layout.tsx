import type { Metadata } from 'next';
import { Inter, Sora } from 'next/font/google';
import '@mantine/core/styles.css';
import './globals.css';
import { Providers } from '@/providers';
import {
  ActionIcon,
  Box,
  ColorSchemeScript,
  Image,
  mantineHtmlProps,
  Stack,
} from '@mantine/core';
import { Footer, Navbar } from '@/components';
import Link from 'next/link';

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
  title: 'Empty - Advertise On Rideshare Vehicles In High-Traffic Areas',
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
          <Box maw={2000} mx={'auto'} className="relative">
            <Navbar />
            <Box>
              {signupModal}
              {children}
              <ActionIcon
                component={Link}
                href="/scan&spin-attributation"
                variant="transparent"
                className="!fixed right-4 bottom-4 z-50 transition-all duration-300 hover:scale-125"
                size="2xl"
              >
                <Stack align="center" gap={0}>
                  <svg
                    width="100"
                    height="32"
                    viewBox="0 0 100 20"
                    className="fill-none"
                  >
                    <path
                      id="sadPath"
                      d="M 10 40 Q 50 0 90 40" // Downward curve for sad face
                      stroke="none"
                      fill="none"
                    />
                    <text
                      className="text-primary-800 fill-current text-[8px]"
                      textAnchor="middle"
                    >
                      <textPath href="#sadPath" startOffset="50%">
                        Scan & Spin
                      </textPath>
                    </text>
                  </svg>
                  <Image src="spinnerLogo2.svg" w={40} h={40} />
                  <svg
                    width="100"
                    height="32"
                    viewBox="0 0 100 20"
                    className="fill-none"
                  >
                    <path
                      id="smilePath"
                      // d="M 10 20 Q 50 0 90 20" // Upward curve for smiley face
                      d="M 10 -10 Q 50 20 90 -10"
                      stroke="none"
                      fill="none"
                    />
                    <text
                      className="text-primary-800 fill-current text-[8px]"
                      textAnchor="middle"
                    >
                      <textPath href="#smilePath" startOffset="50%">
                        How it works
                      </textPath>
                    </text>
                  </svg>
                </Stack>
              </ActionIcon>
            </Box>
            <Footer />
          </Box>
        </Providers>
      </body>
    </html>
  );
}
