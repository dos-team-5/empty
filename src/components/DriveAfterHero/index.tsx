'use client';
import React, { useState } from 'react';
import { Title, BackgroundImage, Box, Mark } from '@mantine/core';
import PrimaryBtn from '../PrimaryBtn';
import { useMediaQuery } from '@mantine/hooks';
import SignupModal from '../SignupModal';
import Link from 'next/link';

const DriveAfterHeroSection: React.FC = () => {
  const [driverOpened, setDriverOpened] = useState(false);
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
          <Box className="max-w-3xl pt-16 md:pt-20">
            <Title order={1} fw={500} fz={IsAboveMobile ? 'h1' : 'h2'}>
              Easily installable and removable decals, reducing your commitment.
            </Title>
            <Title
              order={2}
              fw={500}
              fz={IsAboveMobile ? 'lg' : 'md'}
              mt={'md'}
              className="max-w-sm"
            >
              Join now, receive an ad, apply it, take a photo, start earning.
              <br />
              <Mark color={'var(--mantine-primary-color-5)'}>
                No hidden fees. No BS.
              </Mark>
            </Title>

            <Box className="mt-6 flex flex-wrap gap-4 lg:flex-col xl:flex-row">
            <Link href={'/signup/driver'}>
                <PrimaryBtn btnText="Learn More" />
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>
    </BackgroundImage>
  );
};

export default DriveAfterHeroSection;
