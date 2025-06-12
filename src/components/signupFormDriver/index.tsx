'use client';

import { Box, Stack, Title } from '@mantine/core';
import { memo } from 'react';
import Steppers from './Steppers';
import { EarnByDrivingSection } from './EarnByDrivingSection';

// Memoized TitleSection to prevent re-rendering
const TitleSection = memo(() => (
  <div className="w-full lg:w-1/2">
    <EarnByDrivingSection />
  </div>
));

TitleSection.displayName = 'TitleSection';

const DriverSignupSection: React.FC = () => {
  return (
    <Box mt={260} className="relative">
      <Box
        maw={1800}
        mx="auto"
        className="px-4 pb-16 sm:px-8 md:px-16 lg:px-20 xl:px-24 2xl:px-32"
        id="signUpDriver"
      >
        <Box className="flex flex-col justify-start" mt={110} mb={50}>
          <Box className="relative flex flex-col items-center justify-center gap-8 lg:flex-row lg:items-start lg:justify-between">
            <TitleSection />
            {/* Render memoized title section */}
            <Stack>
              <Stack maw={690} px={30}>
                <Title
                  order={1}
                  className="!mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl"
                  ta="center"
                >
                  <span className="">Sign Up</span>
                </Title>
              </Stack>
              <div className="mt-2 w-full max-w-[690] rounded-4xl p-4 !shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#080F340F] md:mt-8 md:p-8 lg:mt-0 lg:w-full">
                <Steppers />
              </div>
            </Stack>
            {/* <div className="mt-8 w-full rounded-4xl p-4 !shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff] md:p-8 lg:mt-0 lg:w-1/2">
              <Steppers />
            </div> */}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DriverSignupSection;
