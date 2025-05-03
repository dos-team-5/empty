import {
  DriveAfterHeroSection,
  DriveHeroSection,
  DriveQualificationSection,
  DriverSignupSection,
} from '@/components';
import { Box } from '@mantine/core';

const Drive = () => {
  return (
    <Box className="">
      <DriveHeroSection />
      <DriveAfterHeroSection />
      <DriveQualificationSection />
      {/* <Faq /> */}
      <DriverSignupSection />
    </Box>
  );
};

export default Drive;
