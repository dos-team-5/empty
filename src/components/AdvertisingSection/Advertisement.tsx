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
        <Box className="mt-10 flex h-full flex-col items-end justify-start">
          <Box className="pt-16 md:pt-20">
            <Title
              order={1}
              fw={500}
              fz={IsAboveMobile ? '56' : 'h2'}
              className="text-end"
            >
              Outperform Everyone, Outspend No One
            </Title>

            <Title
              order={2}
              fw={400}
              fz={IsAboveMobile ? 'h2' : 'md'}
              mt={'md'}
              className="text-end"
            >
              From startups to global brands, launch cost-effective campaigns
              that scale with your budget. <br /> Simple, fast, and built to
              deliver unmatched ROI and best-in-class CPM. <br />
              We represent modern advertising done right.
            </Title>
          </Box>
        </Box>
      </Box>
    </BackgroundImage>
  );
};

export default Advertisement;
