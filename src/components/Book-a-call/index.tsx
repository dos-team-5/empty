'use client';

import Calendly from './Calendly';
import { motion } from 'framer-motion';
import { Box, Title } from '@mantine/core';
import { TextAnimate } from '../TextAnimation';
import { Icon } from '../FileManager/lib/Icon';

const checkItemVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
};

const Meeting = () => {
  return (
    <Box
      maw={1800}
      mx={'auto'}
      className="px-4 sm:px-8 md:px-16 lg:px-20 xl:px-24 2xl:px-32"
    >
      <div className="mx-auto mt-20 justify-between gap-4 lg:mt-4 lg:flex lg:px-0">
        <div className="pb-4 lg:w-1/2 lg:pt-30 lg:pb-0">
          <Title
            order={1}
            fw={700}
            c="#333333"
            ff={'var(--font-poppins)'}
            className="capitalize"
            mt="lg"
          >
            {/* <TextAnimate
              animation="blurInUp"
              by="word"
              duration={0.5}
              className="md:text-[52px] lg:text-[48px] xl:text-[52px] 2xl:text-[64px]"
              once
            > */}
            <TextAnimate
              animation="blurInUp"
              by="word"
              duration={0.5}
              className="text-[25px] md:text-[50px] lg:text-[30px] xl:text-[35px] 2xl:text-[40px]"
              once
            >
              Lowest CPM in OOH. Period.
            </TextAnimate>
          </Title>
          <Title
            order={2}
            fw={400}
            c="#5E5E5E"
            ff={'var(--font-poppins)'}
            className="capitalize"
            mt={'lg'}
            // >
            //   <TextAnimate
            //     animation="blurInUp"
            //     by="word"
            //     duration={0.5}
            //     delay={0.5}
            //     className="text-lg md:text-2xl lg:text-xl xl:text-2xl 2xl:text-3xl"
            //     once
            //   >
          >
            <TextAnimate
              animation="blurInUp"
              by="word"
              duration={0.5}
              delay={0.5}
              className="lg:text-md max-w-[400px] text-sm normal-case md:max-w-[500px] 2xl:max-w-[600px] md:text-[13px] xl:text-[12px] 2xl:text-base"
              once
            >
              Our CPM is the lowest in out-of-home and rivals digital. We’ll
              show you how to drive high-value impressions for a fraction of the
              cost of traditional OOH, with digital-level performance.
            </TextAnimate>
            <TextAnimate
              animation="blurInUp"
              by="word"
              duration={0.5}
              delay={0.7}
              className="lg:text-md mt-2 max-w-[400px] text-sm normal-case md:max-w-[500px] md:text-[13px] xl:text-[12px] 2xl:text-base"
              once
            >
              Re-target your real-world audience online for results that scale
              fast, without the usual media buying headaches.
            </TextAnimate>
          </Title>
          <Title
            order={2}
            fw={700}
            c="#5E5E5E"
            ff={'var(--font-poppins)'}
            className="!mt-16 capitalize"
          >
            <TextAnimate
              animation="blurInUp"
              by="word"
              duration={0.5}
              delay={1}
              className="text-lg md:text-2xl lg:text-xl xl:text-xl 2xl:text-2xl"
              once
            >
              In 20 Minutes You&apos;ll discover how to...
            </TextAnimate>
          </Title>

          <div className="mt-2 grid grid-cols-1 gap-2 md:grid-cols-2">
            {[
              {
                title: 'Unlock full attribution from your ads',
                description:
                  'Track scans, leads, and conversions with Scan & Spin',
              },

              {
                title: 'Analyze your impression data',
                description:
                  ' Get weekly reports powered by real GPS and device tracking',
              },
              {
                title: 'Cut your CPM and boost ROI',
                description:
                  'Leverage our high-volume model for the lowest CPM in OOH',
              },
              {
                title: 'Scale as you go',
                description:
                  ' Launch with one car or expand to hundreds in days',
              },
              {
                title: 'Get Citywide visibility',
                description:
                  'Get seen across the city without paying billboard prices.',
              },
              {
                title: 'Own 100% share of voice',
                description: 'On each vehicle, no competition',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={checkItemVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: (index + 1) * 0.5 }}
                className="flex min-w-2xs items-start justify-start gap-x-4 py-4 lg:min-w-auto"
              >
                <Icon
                  icon="lets-icons:check-fill"
                  className="text-primary-400 size-6 flex-shrink-0 rounded-md text-lg"
                />
                <ul className="max-w-max">
                  <h3 className="mb-0.5 text-lg font-medium xl:text-[15px] 2xl:text-xl">
                    {item.title}
                  </h3>
                  <div className="text-base font-normal text-[#5E5E5E] xl:text-[12px] 2xl:text-sm">
                    {item.description}
                  </div>
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="z-30 lg:w-1/2">
          <Calendly />
        </div>
      </div>
    </Box>
  );
};

export default Meeting;
