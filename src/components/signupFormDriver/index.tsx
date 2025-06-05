'use client';
import React from 'react';
import { Box, Space, Text, Anchor } from '@mantine/core';
import { memo } from 'react';
import Steppers from './Steppers';

// Memoized TitleSection to prevent re-rendering
const TitleSection = memo(() => (
  <div className=" w-full lg:w-1/2">
    <Text
      ff={'var(--font-poppins)'}
      fw={400}
      c="#333333"
      className="!text-sm xl:!text-base 2xl:!text-lg"
    >
      Before you can begin earning passive income with our platform, we need to
      verify your identity and banking information to ensure timely and secure
      payments via direct deposit. <br /> <br />
      Once your information is verified, you’ll be officially onboarded to our
      network and eligible to receive advertising campaign offers, which you may
      choose to accept or decline. <br /> <br />
      Please note: the time it takes to be assigned to a campaign can vary from
      as little as one day to several weeks or months. This depends on campaign
      availability, location, and advertiser demand. Don’t worry if you’re not
      placed immediately.
    </Text>
    <Space className="h-4 md:h-6" />
    <div
      className={`font-poppins !text-sm font-bold !text-[#333333] xl:!text-base 2xl:!text-lg`}
    >
      Your Role: Drive as you normally do. We’ll provide a decal to place on
      your car. <br />
      <br />
      Campaign Matching: We match you with advertisers based on your location
      and driving habits.
      <br />
      <br />
      Earnings: You’re paid monthly by direct deposit. Payment varies by
      campaign.
      <br />
      <br />
      Commitment: Once the decal is installed, you’ll be expected to provide
      regular updates on its condition and keep your full-time driving hours
      updated through your account dashboard on our website.{' '}
      <Anchor variant="text" size="md" className="!ml-1 underline">
        Sign In
      </Anchor>
    </div>
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
          <Box className="relative flex flex-col items-center justify-center lg:flex-row lg:justify-between">
            <TitleSection /> {/* Render memoized title section */}
            <div className="rounded-2xl bg-transparent p-4 !shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff] mt-8 lg:mt-0">
              <Steppers />
            </div>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DriverSignupSection;
