'use client';
import { Box, Text, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

const BookACallPage = () => {
  const IsAboveMobile = useMediaQuery('(min-width: 768px)');

  return (
    <Box
      maw={1800}
      mx={'auto'}
      className="px-4 sm:px-8 md:px-16 lg:px-20 xl:px-24 2xl:px-32"
    >
      <div className="relative flex h-[92dvh] w-full items-start justify-center">
        <div className="w-1/2">
          <div>
            <Title mt={120} order={1} pr='md' fw={500} fz={IsAboveMobile ? 40 : 'h2'}>
              See how fast-moving brands are turning city streets into
              high-impact ad space
            </Title>
            <Title mt={'lg'} pr='md' order={2} fw={400} fz={IsAboveMobile ? 20 : 'h2'}>
              In 20 minutes, we’ll show you how our mobile OOH ads help brands
              drive more impressions, reduce costs, and stay top-of-mind —
              without the hassle of traditional media buying.
            </Title>
          </div>
          <div className="mt-12 py-8">
            <Text fz={24} fw={500}>
              You'll discover how to:
            </Text>
            <Box className="mt-4 flex items-start justify-start gap-8 text-sm">
              <Box>
                Launch in <br /> under a week with <br /> a simple online setup
              </Box>
              <Box>
                Own 100% of the ad space <br /> on each vehicle <br /> — no
                competition
              </Box>
              <Box>
                Cut your CPM and <br /> boost ROI with smart, <br /> citywide
                visibility
              </Box>
              <Box>
                Scale at your pace <br /> — start with one car or <br /> grow to
                hundreds
              </Box>
            </Box>
          </div>
        </div>
        <div className="h-full w-1/2 bg-blue-400"></div>
      </div>
    </Box>
  );
};

export default BookACallPage;
