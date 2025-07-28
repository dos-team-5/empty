'use client';
import {
  DriveHeroSection, DriverSignupSection, TimelineSectionDrive
} from '@/components';
import { Box, Flex } from '@mantine/core';
import { LanguageToggle } from '@/components/languageToggle';

const Drive = () => {
  return (
    <Box component="main" className="">
      {/* Language Toggle */}
      <Flex justify="flex-end" p="md">
        <LanguageToggle />
      </Flex>
      <DriveHeroSection />
      {/* <DriveAfterHeroSection /> */}
      {/* <DriveQualificationSection /> */}
      <TimelineSectionDrive />
      <DriverSignupSection />
    </Box>
  );
};

export default Drive;
