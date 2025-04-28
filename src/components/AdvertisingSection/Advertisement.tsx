'use client';
import { Box, BackgroundImage, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

const Advertisement = () => {
  const mobile = useMediaQuery('(max-width: 1024px)');
  const IsAboveMobile = useMediaQuery('(min-width: 768px)');
  const mobileBanner = 'polestar-banner-2.png';
  const desktopBanner = 'polestar-banner-1.png';
  const banner = mobile ? mobileBanner : desktopBanner;
  return (
    <BackgroundImage
      src={banner}
      className="h-dvh bg-contain bg-center bg-no-repeat"
    >
      <Box
        maw={1800}
        mx={'auto'}
        className="px-4 sm:px-8 md:px-16 lg:px-20 xl:px-24 2xl:px-32"
      >
        <Box className="mt-10 flex h-full flex-col justify-start">
          <Box className="max-w-md pt-16 md:pt-20">
            <Title order={1} fw={500} fz={IsAboveMobile ? 'h1' : 'h2'}>
              Get access to on-the-go billboards,
            </Title>

            <Title
              order={2}
              fw={500}
              fz={IsAboveMobile ? 'lg' : 'md'}
              mt={'md'}
              className="max-w-sm"
            >
              ensuring visibility across bustling city centers for a fraction of
              the price. Minimize your Cost per Acquisition while owning a 100%
              share of voice on all of your vehicles
            </Title>
          </Box>
        </Box>
      </Box>
    </BackgroundImage>
  );
};

export default Advertisement;
