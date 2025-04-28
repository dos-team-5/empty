'use client';
import React, { useState } from 'react';
import { Title, BackgroundImage, Box, Mark } from '@mantine/core';
import PrimaryBtn from '../PrimaryBtn';
import { useMediaQuery } from '@mantine/hooks';
import SignupModal from '../SignupModal';

const DriveQualificationSection: React.FC = () => {
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
              Generate an average of $300 in passive income each month by
              displaying an advertisement on your front doors
            </Title>
            <Title
              order={2}
              fw={500}
              fz={IsAboveMobile ? 'lg' : 'md'}
              mt={'md'}
              className="max-w-sm"
            >
              <Mark color={'var(--mantine-primary-color-5)'}>
                Are you qualified to join the empty team today?
                <br />
                - you must drive 30+ hours per week in high traffic areas
                <br />- nothing else
              </Mark>
            </Title>

            <Box className="mt-6 flex flex-wrap gap-4 lg:flex-col xl:flex-row">
              <Box onClick={() => setDriverOpened(true)}>
                <PrimaryBtn btnText="Sign Up" />
              </Box>
              <SignupModal
                opened={driverOpened}
                onClose={() => setDriverOpened(false)}
                type="driver"
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </BackgroundImage>
  );
};

export default DriveQualificationSection;
