import {
  DriveHeroSection,
  DriverSignupSection,
  TimelineSectionDrive,
} from '@/components';
import { Box } from '@mantine/core';
import { Metadata } from 'next';
import Head from 'next/head';

export const metadata: Metadata = {
  title: 'Drive',
};

const Drive = () => {
  return (
    <>
      <Head>
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_URL}`} />
        <title>Drive-Empty</title>
      </Head>
      <Box component="main" className="">
        <DriveHeroSection />
        {/* <DriveAfterHeroSection /> */}
        {/* <DriveQualificationSection /> */}
        <TimelineSectionDrive />
        <DriverSignupSection />
      </Box>
    </>
  );
};

export default Drive;
