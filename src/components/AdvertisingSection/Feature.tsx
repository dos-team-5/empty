'use client';
import React from 'react';
import { Title, Box } from '@mantine/core';
import { ExpandableCardDemo } from './ExpandableCards';
import { TextAnimate } from '../TextAnimation';

const FeatureSection: React.FC = () => {
  return (
    <Box
      className="relative h-dvh"
      // className="from-default to-primary-100 relative h-dvh bg-gradient-to-b from-55%"
    >
      <Box
        maw={1800}
        mx={'auto'}
        className="px-4 pb-32 sm:px-8 md:px-16 lg:px-20 xl:px-24 2xl:px-32"
      >
        <div className="mb-12 flex items-center">
          <Title className="text-base" order={1} fw={500}>
            <TextAnimate
              animation="blurInUp"
              by="word"
              startOnView
              duration={0.5}
              className="text-[40px]"
              once
            >
              Billboards Don’t Move.
            </TextAnimate>

            <TextAnimate
              animation="blurInUp"
              by="word"
              startOnView
              duration={0.5}
              delay={1}
              className="text-[40px]"
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
