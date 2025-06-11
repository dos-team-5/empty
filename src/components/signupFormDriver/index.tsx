'use client';
import React from 'react';
import { Box } from '@mantine/core';
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
    <Box className="relative">
      <Box
        maw={1800}
        mx="auto"
        className="px-4 pb-16 sm:px-8 md:px-16 lg:px-20 xl:px-24 2xl:px-32"
        id="signUpDriver"
      >
        <Box className="flex flex-col justify-start">
          <Box className="relative flex flex-col items-center justify-center gap-8 lg:flex-row lg:justify-between">
            <TitleSection /> {/* Render memoized title section */}
            <div className="mt-8 w-full rounded-4xl p-4 !shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff] md:p-8 lg:mt-0 lg:w-1/2">
              <Steppers />
            </div>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DriverSignupSection;
