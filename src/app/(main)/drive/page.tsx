import {
  DriveHeroSection,
  DriverSignupSection,
  TimelineSectionDrive,
} from '@/components';
import { Box } from '@mantine/core';
import { Metadata } from 'next';

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
      <DriverSignupSection />
    </Box>
  );
};

export default Drive;
