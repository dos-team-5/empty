import {
  DriveHeroSection,
  DriverSignupSection,
  TimelineSectionDrive,
} from '@/components';
import { Box } from '@mantine/core';
import { Metadata } from 'next';
import { LanguageProvider } from './context/languageToggleContext';

export const metadata: Metadata = {
  title: 'Drive',
};

const Drive = () => {
  return (
    <Box component="main" className="">
      <DriveHeroSection />
      {/* <DriveAfterHeroSection /> */}
      {/* <DriveQualificationSection /> */}
      <TimelineSectionDrive />
      <LanguageProvider>
        <DriverSignupSection />
      </LanguageProvider>
    </Box>
  );
};

export default Drive;
