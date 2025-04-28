import {
  DriveAfterHeroSection,
  DriveHeroSection,
  DriveQualificationSection,
  Faq,
} from '@/components';
import { Box } from '@mantine/core';

const Drive = () => {
  return (
    <Box className="">
      <DriveHeroSection />
      <DriveAfterHeroSection />
      <DriveQualificationSection />
      <Faq />
    </Box>
  );
};

export default Drive;
