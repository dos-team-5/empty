'use client';

import { Box, Stack, Title } from '@mantine/core';
import { memo } from 'react';
import Steppers from './Steppers';
import { EarnByDrivingSection } from './EarnByDrivingSection';
import { useLanguage } from '@/providers/languageToggleContext';

// Memoized TitleSection to prevent re-rendering
const TitleSection = memo(() => (
  <div className="w-full lg:w-1/2">
    <EarnByDrivingSection />
  </div>
));

TitleSection.displayName = 'TitleSection';

const DriverSignupSection: React.FC = () => {
  const { language } = useLanguage();
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
                  <span className="">
                    {language === 'fr' ? 'Inscrivez-vous' : 'Sign Up'}
                  </span>
                </Title>
              </Stack>
              <Box
                mt={{ base: 8, md: 32, lg: 0 }}
                w={'100%'}
                p={{ base: 16, md: 32 }}
                maw={690}
                className="rounded-4xl !shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#080F340F]"
              >
                <Steppers />
              </Box>
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
