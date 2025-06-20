import { Box } from '@mantine/core';
import { Footer, Navbar } from '@/components';
import FixedSpinnerLogo from '@/components/FixedSpinnerLogo';
import React from 'react';
import ReactLenis from 'lenis/react';
import AnimatedGradient from '@/providers/AnimatedGradient';

export default function MainLayout({
  children,
  signupModal,
}: Readonly<{
  children: React.ReactNode;
  signupModal: React.ReactNode;
}>) {
  return (
    <ReactLenis
      root
      options={{
        duration: 1.2, // Smooth and natural scroll duration
        wheelMultiplier: 0.8, // Slightly slower scroll for better control
        syncTouch: false, // Sync touch for better mobile experience
        overscroll: false, // Disable overscroll for a cleaner feel
      }}
    >
      <Box maw={2000} mx={'auto'} className="relative">
        <Navbar />
        <Box>
          {signupModal}
          {children}
          {/* <ActionIcon
                component={Link}
                href="/scan&spin-attributation"
                variant="transparent"
                className="!fixed right-1 bottom-2 z-50 transition-all duration-300 hover:scale-125 md:right-4 md:bottom-4"
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
                  <Image radius="100%" src="spinnerLogo2.svg" w={40} h={40} />
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
              </ActionIcon> */}
          <FixedSpinnerLogo />
        </Box>
        <Footer />
      </Box>
      <AnimatedGradient />
    </ReactLenis>
  );
}
