'use client';

import { motion } from 'framer-motion';
import { FC, ReactNode } from 'react';
import Image from 'next/image';
import { Group, Stack } from '@mantine/core';
import { Icon } from '../FileManager/lib/Icon';
import { useMediaQuery } from '@mantine/hooks';

// --- Helper Components (Placeholders for your actual components) ---

// Placeholder for Mantine's Title component
const Title: FC<{
  children: ReactNode;
  className?: string;
  order?: number;
  fw?: number;
  ff?: string;
}> = ({ children, className }) => <h2 className={className}>{children}</h2>;

// Placeholder for your TextAnimate component
const TextAnimate: FC<{ children: ReactNode; className?: string }> = ({
  children,
  className,
}) => <span className={className}>{children}</span>;

// --- Main Component Data ---

// Data for the feature cards with absolute positioning classes
const features = [
  {
    title: 'Bigger Reach, Smaller Cost',
    description:
      'We offer record-breaking CPM with more hours of weekly exposure across the city. Traditional OOH can’t compete on value, scale, or flexibility.',
    animation: {
      initial: { opacity: 0, x: -150 },
      whileInView: { opacity: 1, x: -120 },
    },
    position: 'top-0 left-0', // Positioned top-left
  },
  {
    title: 'Trackable, Transparent, and Flexible',
    description:
      'We provide live tracking and weekly analytics. You can adjust your fleet size or creative mid-campaign, giving you digital-level control in a physical space.',
    animation: {
      initial: { opacity: 0, x: 190 },
      whileInView: { opacity: 1, x: 160 },
    },
    position: 'top-0 right-0', // Positioned top-right
  },
  {
    title: 'Mobile Coverage & High Visibility',
    description:
      'Each vehicle gives you 40+ hours a week across commercial, residential, and high-traffic zones. We give you city-wide coverage at an unbeatable price. Our ads travel directly to where your customers are.',
    animation: {
      initial: { opacity: 0, x: -70, y: 90 },
      whileInView: { opacity: 1, x: -40, y: 90 },
    },
    position: 'bottom-0 left-0', // Positioned bottom-left
  },
  {
    title: 'Attribution & Digital Retargetting',
    description:
      'Scan&Spin brings real attribution to out-of-home. Know exactly who engaged with your ad, track future conversions, and retarget them online at a lower cost than digital CPCs.',
    animation: {
      initial: { opacity: 0, x: 70, y: 90 },
      whileInView: { opacity: 1, x: 40, y: 90 },
    },
    position: 'bottom-0 right-0', // Positioned bottom-right
  },
];

// --- Main Component ---

export const WhyChooseUsSection: FC = () => {
  const md = useMediaQuery('(min-width: 768px)');
  return (
    <section className="pt-16">
      {/* Section Title */}
      <Stack gap={10}>
        <Title
          order={1}
          fw={700}
          ff={'var(--font-poppins)'}
          className="text-center"
        >
          <TextAnimate className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
            Why Advertisers
          </TextAnimate>
        </Title>
        <Title
          order={1}
          fw={700}
          ff={'var(--font-poppins)'}
          className="pb-12 text-center"
        >
          <TextAnimate className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
            Choose EMPTY
          </TextAnimate>
        </Title>
      </Stack>
      {/* <Title
        order={1}
        fw={700}
        ff={'var(--font-poppins)'}
        className="pb-12 text-center"
      >
        <TextAnimate className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
          Why Advertisers Choose EMPTY
        </TextAnimate>
      </Title> */}

      <div className="mx-auto max-w-7xl scale-100 px-6 md:scale-60 lg:scale-75 lg:px-8 xl:scale-80 2xl:scale-100">
        {/* Main relative container for positioning */}
        <div className="lg::min-h-[500px] relative flex w-full flex-col items-center justify-center md:min-h-[600px] md:min-w-[600px] md:flex-row lg:min-h-[500px]">
          {/* Central Car Image with scaling animation */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.5 }}
            className="z-10 w-full max-w-2xl" // Image is on top
          >
            <Image
              src={'/R24.png'}
              alt="Advertiser car"
              width={826}
              height={412}
              className="h-auto w-full"
              priority
            />
          </motion.div>

          {md ? (
            <>
              {/* Feature Cards - Mapped and absolutely positioned */}
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={feature.animation.initial}
                  whileInView={feature.animation.whileInView}
                  viewport={{ once: true, amount: 0.8 }}
                  transition={{
                    delay: index * 0.6,
                  }}
                  // Absolute positioning with responsive width
                  className={`bg-primary-50/50 absolute w-full max-w-xs rounded-lg p-6 shadow-lg ring-1 ring-gray-900/5 backdrop-blur-sm ${feature.position}`}
                >
                  <div className="flex items-start gap-x-3">
                    <Icon
                      icon="lets-icons:check-fill"
                      className="text-primary-400 size-7 flex-shrink-0 rounded-md text-xl"
                    />
                    <h3 className="text-base leading-7 font-semibold text-gray-900">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </>
          ) : (
            <>
              {' '}
              {/* Mobile: Stacked cards */}
              <Stack className="w-full md:hidden" gap="md">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{
                      delay: 0.6 * index,
                    }}
                    className="bg-primary-50/50 w-full rounded-lg p-6 shadow-lg ring-1 ring-gray-900/5 backdrop-blur-sm"
                  >
                    <Group wrap="nowrap" gap="xs">
                      <Icon
                        icon="lets-icons:check-fill"
                        className="text-primary-400 size-6 flex-shrink-0 rounded-md text-lg"
                      />
                      <h3 className="text-sm leading-6 font-semibold text-gray-900">
                        {feature.title}
                      </h3>
                    </Group>
                    <p className="mt-2 text-xs leading-5 text-gray-600">
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </Stack>
            </>
          )}
        </div>
      </div>
    </section>
  );
};
