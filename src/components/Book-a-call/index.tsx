'use client';

import Calendly from './Calendly';
import { motion } from 'framer-motion';
import { Box, Title } from '@mantine/core';
import { TextAnimate } from '../TextAnimation';
import { Icon } from '../Icon';

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
              className="text-[25px] md:text-[50px] lg:text-[30px] xl:text-[27px] 2xl:text-[64px]"
              once
            >
              See how fast-moving brands are turning city streets into
              high-impact, ad space
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
              className="lg:text-md text-sm md:text-lg xl:text-[13px] 2xl:text-3xl"
              once
            >
              In 20 minutes, we’ll show you how our mobile OOH ads help brands
              drive more impressions, reduce costs, and stay top-of-mind —
              without the hassle of traditional media buying.
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
              className="text-lg md:text-2xl lg:text-xl xl:text-xl 2xl:text-3xl"
              once
            >
              You'll discover how to:
            </TextAnimate>
          </Title>

          <div className="mt-2 grid grid-cols-1 gap-2 px-6 md:grid-cols-2">
            {[
              {
                title: 'Launch in under a week',
                description: 'with a simple online setup',
              },

              {
                title: 'Own 100% of the ad space',
                description: 'on each vehicle — no competition',
              },
              {
                title: 'Cut your CPM and boost ROI',
                description: 'with smart, citywide visibility',
              },
              {
                title: 'Scale at your pace',
                description: '— start with one car or grow to hundreds',
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
                  <h3 className="mb-0.5 text-lg font-medium xl:text-[15px] 2xl:text-2xl">
                    {item.title}
                  </h3>
                  <div className="text-base font-normal text-[#5E5E5E] xl:text-[12px] 2xl:text-[12px]">
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
