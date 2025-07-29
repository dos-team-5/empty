'use client';

import { Box, Stack } from '@mantine/core';
import { memo } from 'react';
import { EarnByDrivingSection } from './EarnByDrivingSection';
import { useLanguage } from '@/providers/languageToggleContext';
import DriverSignUpForm from './DriverSignUpForm';

// Memoized TitleSection to prevent re-rendering
const TitleSection = memo(() => (
  <div className="w-full">
    <EarnByDrivingSection />
  </div>
));

TitleSection.displayName = 'TitleSection';

const DriverSignupSection: React.FC = () => {
  const { language } = useLanguage();
  return (
    <Box mt={260} className="relative" id="signUpDriver">
      <Box  >
        <DriverSignUpForm/>
      </Box>
      <Box
        maw={1800}
        mx="auto"
        className="px-4 pb-16 sm:px-8 md:px-16 lg:px-20 xl:px-24 2xl:px-32"
       
      >
        <Box className="flex flex-col justify-start" mt={110} mb={50}>
          <Box className="relative flex flex-col items-center justify-center gap-8 lg:flex-row lg:items-start lg:justify-between">
            <TitleSection />
            {/* Render memoized title section */}
            <Stack>
              {/* <Stack maw={690} px={30}>
                <Title
                  order={1}
                  className="!mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl"
                  ta="center"
                >
                  <span className="">
                    {language === 'fr' ? 'Inscrivez-vous' : 'Sign Up'}
                  </span>
                </Title>
              </Stack> */}
              {/* <Box
                mt={{ base: 8, md: 32, lg: 0 }}
                w={'100%'}
                p={{ base: 16, md: 32 }}
                maw={690}
                className="rounded-4xl !shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#080F340F]"
              >
                <SingleSignupForm />
              </Box> */}
            </Stack>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DriverSignupSection;
