import {
  DriveHeroSection,
  DriverSignupSection,
  TimelineSectionDrive,
} from '@/components';
import { Box } from '@mantine/core';

const Drive = () => {
  return (
    <Box className="">
      <DriveHeroSection />
      {/* <DriveAfterHeroSection /> */}
      {/* <DriveQualificationSection /> */}
      <TimelineSectionDrive />
      <DriverSignupSection />
    </Box>
  );
};

export default Drive;
