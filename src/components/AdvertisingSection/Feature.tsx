'use client';
import React from 'react';
import { Title, Box } from '@mantine/core';
import { ExpandableCardDemo } from './ExpandableCards';
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
        className="px-4 mt-16 sm:px-8 md:px-16 lg:px-20 2xl:py-16 xl:px-24 2xl:px-32"
      >
        <div className="my-8 flex items-center md:my-12">
          <Title
            order={1}
            fw={700}
            ff={'var(--font-poppins)'}
            className="text-start capitalize"
          >
            <TextAnimate
              animation="blurInUp"
              by="word"
              startOnView
              duration={0.5}
              className="md:text-[52px] lg:text-[48px] xl:text-[52px] 2xl:text-[64px]"
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
              className="md:text-[52px] lg:text-[48px] xl:text-[52px] 2xl:text-[64px]"
              once
            >
              Your Customers Do.
            </TextAnimate>
          </Title>
        </div>

        <ExpandableCardDemo />
      </Box>
    </Box>
  );
};

export default FeatureSection;
