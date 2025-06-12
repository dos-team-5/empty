'use client';
import React from 'react';
import { Title, Box } from '@mantine/core';
import { TextAnimate } from '../TextAnimation';

const FeatureSection: React.FC = () => {
  const checkItemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <Box
      className="relative"
      // className="from-default to-primary-100 relative h-dvh bg-gradient-to-b from-55%"
    >
      <Box
        maw={1800}
        mx={'auto'}
        className="mt-16 px-4 sm:px-8 md:px-16 lg:px-20 xl:px-24 2xl:px-32 2xl:py-16"
        mt={180}
      >
        <div className=" flex items-center">
          <Title
            order={1}
            fw={700}
            ff={'var(--font-poppins)'}
            className="text-start capitalize"
            mx="auto"
            ta="center"
          >
            <TextAnimate
              animation="blurInUp"
              by="word"
              startOnView
              duration={0.5}
              className="text-[30px] md:text-[52px] lg:text-[48px] xl:text-[52px] 2xl:text-[64px]"
              once
            >
              Billboards Don’t Move,
            </TextAnimate>

            <TextAnimate
              animation="blurInUp"
              by="word"
              startOnView
              duration={0.5}
              delay={1}
              className="text-[30px] md:text-[52px] lg:text-[48px] xl:text-[52px] 2xl:text-[64px]"
              once
            >
              Your Customers Do.
            </TextAnimate>
          </Title>
        </div>

        {/* <ExpandableCardDemo /> */}
      </Box>
    </Box>
  );
};

export default FeatureSection;
