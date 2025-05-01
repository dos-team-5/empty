'use client';
import React from 'react';
import { Title, Box } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { ExpandableCardDemo } from './ExpandableCards';
import { TextAnimate } from '../TextAnimation';

const FeatureSection: React.FC = () => {
  const IsAboveMobile = useMediaQuery('(min-width: 768px)');

  return (
    <Box
      mt={{ base: 40, md: 80 }}
      maw={1800}
      mx={'auto'}
      className="px-4 sm:px-8 md:px-16 lg:px-20 xl:px-24 2xl:px-32"
    >
      <div className="mb-12 flex items-center">
        <Title
          className="text-base"
          order={1}
          fw={500}
          fz={IsAboveMobile ? 52 : 'h2'}
        >
          <TextAnimate
            animation="blurInUp"
            by="word"
            startOnView
            duration={0.5}
            className="max-w-5xl"
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
            className="max-w-5xl"
            once
          >
            Your Customers Do.
          </TextAnimate>
        </Title>
      </div>

      <ExpandableCardDemo />
    </Box>
  );
};

export default FeatureSection;
