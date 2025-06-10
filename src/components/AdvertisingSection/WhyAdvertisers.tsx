'use client';

import { motion } from 'framer-motion';
import { FC, ReactNode } from 'react';
import Image from 'next/image';

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

// A simple checkmark icon component
const CheckIcon: FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

// --- Main Component Data ---

// Data for the feature cards with absolute positioning classes
const features = [
  {
    title: 'Trackable, Transparent, and Flexible',
    description:
      'We provide live tracking and weekly analytics. You can adjust your fleet size or creative mid-campaign, giving you digital-level control in a physical space.',
    animation: {
      initial: { opacity: 0, x: -50, y: -50 },
      whileInView: { opacity: 1, x: -120, y: 0 },
    },
    position: 'top-0 left-0', // Positioned top-left
  },
  {
    title: 'Trackable, Transparent, and Flexible',
    description:
      'We provide live tracking and weekly analytics. You can adjust your fleet size or creative mid-campaign, giving you digital-level control in a physical space.',
    animation: {
      initial: { opacity: 0, x: 50, y: -50 },
      whileInView: { opacity: 1, x: 160, y: 0 },
    },
    position: 'top-0 right-0', // Positioned top-right
  },
  {
    title: 'Trackable, Transparent, and Flexible',
    description:
      'We provide live tracking and weekly analytics. You can adjust your fleet size or creative mid-campaign, giving you digital-level control in a physical space.',
    animation: {
      initial: { opacity: 0, x: -50, y: 50 },
      whileInView: { opacity: 1, x: -40, y: 90 },
    },
    position: 'bottom-0 left-0', // Positioned bottom-left
  },
  {
    title: 'Trackable, Transparent, and Flexible',
    description:
      'We provide live tracking and weekly analytics. You can adjust your fleet size or creative mid-campaign, giving you digital-level control in a physical space.',
    animation: {
      initial: { opacity: 0, x: 50, y: 50 },
      whileInView: { opacity: 1, x: 40, y: 90 },
    },
    position: 'bottom-0 right-0', // Positioned bottom-right
  },
];

// --- Main Component ---

export const WhyChooseUsSection: FC = () => {
  return (
    <section className="overflow-hidden py-16 sm:py-24">
      {/* Section Title */}
      <Title
        order={1}
        fw={700}
        ff={'var(--font-poppins)'}
        className="pb-12 text-center"
      >
        <TextAnimate className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
          Why Advertisers Choose EMPTY
        </TextAnimate>
      </Title>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Main relative container for positioning */}
        <div
          className="relative flex items-center justify-center"
          style={{ minHeight: '450px' }}
        >
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

          {/* Feature Cards - Mapped and absolutely positioned */}
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={feature.animation.initial}
              whileInView={feature.animation.whileInView}
              viewport={{ once: true, amount: 0.8 }}
              transition={{
                type: 'spring',
                stiffness: 50,
                delay: 0.2 + index * 0.1,
              }}
              // Absolute positioning with responsive width
              className={`bg-primary-50/50 absolute w-full max-w-xs rounded-lg p-6 shadow-lg ring-1 ring-gray-900/5 backdrop-blur-sm ${feature.position}`}
            >
              <div className="flex items-start gap-x-3">
                <CheckIcon className="h-6 w-6 flex-none text-[#D481B5]" />
                <h3 className="text-base leading-7 font-semibold text-gray-900">
                  {feature.title}
                </h3>
              </div>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
