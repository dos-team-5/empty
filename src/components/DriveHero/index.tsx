'use client';
import React from 'react';
import { Title, BackgroundImage, Box } from '@mantine/core';
import PrimaryBtn from '../PrimaryBtn';
import { useMediaQuery } from '@mantine/hooks';
import Link from 'next/link';

const DriveHeroSection: React.FC = () => {
  const mobile = useMediaQuery('(max-width: 1024px)');
  const IsAboveMobile = useMediaQuery('(min-width: 768px)');
  const mobileBanner = 'polestar-banner-2.png';
  const desktopBanner = 'polestar-banner-1.png';
  const banner = mobile ? mobileBanner : desktopBanner;
  return (
    <BackgroundImage
      src={banner}
      className="h-dvh bg-contain bg-center lg:bg-cover"
    >
      <Box
        maw={1800}
        mx={'auto'}
        className="px-4 sm:px-8 md:px-16 lg:px-20 xl:px-24 2xl:px-32"
      >
        <Box className="flex h-full flex-col justify-start">
          <Box className="pt-40">
            <Title order={1} fw={500} fz={IsAboveMobile ? 56 : 'h2'}>
              Generate revenue every month <br /> without doing more work.
            </Title>

            <Title
              order={2}
              fw={400}
              fz={IsAboveMobile ? 'h2' : 'md'}
              mt={'md'}
            >
              Get paid up to $300/month to display ads on your car’s front
              doors.
            </Title>

            <Box className="mt-6 flex flex-wrap gap-4 lg:flex-col xl:flex-row">
              <Link href={'/signup/driver'}>
                <PrimaryBtn btnText="Sign Up" />
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>
    </BackgroundImage>
  );
};

export default DriveHeroSection;
