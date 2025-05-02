'use client';

import Calendly from './Calendly';
import { motion } from 'framer-motion';
import { Box, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { TextAnimate } from '../TextAnimation';
import { CheckCircle } from 'lucide-react';

const checkItemVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
};

const Meeting = () => {
  const IsAboveMobile = useMediaQuery('(min-width: 768px)');

  return (
    <Box
      maw={1800}
      mx={'auto'}
      className="px-4 sm:px-8 md:px-16 lg:px-20 xl:px-24 2xl:px-32"
    >
      <div className="mx-auto mt-22 justify-between gap-2 md:flex md:px-0">
        <div className="pb-4 md:w-1/2 md:pb-0">
          <Title order={1} fw={500}  mt="lg">
            <TextAnimate
              animation="blurInUp"
              by="word"
              startOnView
              duration={0.5}
              once
              className='md:text-[40] lg:text-[44px] xl:text-[52px]'
            >
              See how fast-moving brands are turning city streets into
              high-impact ad space
            </TextAnimate>
          </Title>
          <Title order={2} fw={400} fz={IsAboveMobile ? 21 : 'md'} mt={'md'}>
            <TextAnimate
              animation="blurInUp"
              by="word"
              startOnView
              duration={0.5}
              delay={0.5}
              once
            >
              In 20 minutes, we’ll show you how our mobile OOH ads help brands
              drive more impressions, reduce costs, and stay top-of-mind —
              without the hassle of traditional media buying.
            </TextAnimate>
          </Title>
          <Title order={2} fw={700} fz={IsAboveMobile ? 21 : 'md'} mt={'xl'}>
            <TextAnimate
              animation="blurInUp"
              by="word"
              startOnView
              duration={0.5}
              delay={1}
              once
            >
              You'll discover how to:
            </TextAnimate>
          </Title>

          <div className="mt-2 flex flex-wrap items-start justify-start gap-2">
            {[
              {
                title: 'Launch in under a week',
                description: 'with a simple online setup',
              },

              {
                title: 'Own 100% of the ad space',
                description: 'on each vehicle — no competitio',
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
                transition={{ delay: (index + 1) * 1.5 }}
                className="items-end-start flex justify-start gap-x-4 py-4 min-w-3xs md:min-w-auto"
              >
                <CheckCircle className="text-primary-400 flex-shrink-0 rounded-md text-xl" />
                <ul className="max-w-max md:max-w-[140px]">
                  <h3 className="mb-0.5 text-xs font-bold">{item.title}</h3>
                  <div className="text-xs">{item.description}</div>
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="z-30 md:w-1/2">
          <Calendly />
        </div>
      </div>
    </Box>
  );
};

export default Meeting;
