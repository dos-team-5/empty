'use client';
import { TextAnimate } from '@/components/TextAnimation';
import { Stack, Title } from '@mantine/core';
import { motion } from 'motion/react';
import HowSpinWorks from './HowSpinWorks';
import Image from 'next/image';

const lines = [
  {
    text: "Scan & Spin delivers the kind of engagement you'd get if you hired dozens of people",
  },
  {
    text: 'to hand out coupons across the city. But instead of guessing who took one, ',
  },
  {
    text: 'each person is tracked individually and can be retargeted again and again.',
  },
];

const GiftSteps = () => {
  return (
    <Stack maw={1200} mx="auto" mt={{ base: 80 }} mb={{ base: 80 }}>
      <div className="flex flex-col items-center justify-center lg:flex-row lg:gap-32">
        <Image
          src={'/VS_SCANSPIN.png'}
          alt="Image"
          width={1000}
          height={1000}
          className="w-full bg-transparent lg:w-1/2"
        />
        <motion.p
          initial={{ scale: 0.3, opacity: 0 }}
          whileInView={{
            scale: 1,
            opacity: 1,
            transition: {
              duration: 0.7,
              ease: 'easeInOut',
            },
          }}
          viewport={{ once: true }}
          className="mx-4 mt-16 rounded-2xl bg-[#D24C96] p-8 text-center text-xs text-white sm:mx-24 md:text-sm lg:mx-0 lg:w-108"
        >
          Scan & Spin delivers the kind of engagement you'd get if you hired
          dozens of people to hand out coupons across the city. But instead of
          guessing who took one, each person is tracked individually and can be
          re-targeted again and again.
        </motion.p>
      </div>

      <Title mt={100} ta="center" fz={{ base: 25, sm: 35 }} fw={600} pb={30}>
        <TextAnimate
          animation="blurInUp"
          by="word"
          startOnView
          duration={0.5}
          once
        >
          How It Works: The Scan & Spin Journey
        </TextAnimate>
      </Title>
      {/* <Text
        ta="center"
        fz={{ base: 13, sm: 16 }}
        maw={540}
        mx="auto"
        className="!text-gray-600"
      >
        Ready to turn your everyday commute into passive income? We make it
        simple and secure to earn extra cash just by driving your car as usual.
      </Text> */}
      {/* svg image */}
      {/* <Image src="/giftDetails/giftSteps.svg" /> */}

      <div
        // initial={{ opacity: 0, scale: 0.3 }}
        // whileInView={{ opacity: 1, scale: 1 }}
        // transition={{ duration: 0.7, ease: 'easeInOut' }}
        className="flex w-full items-start justify-center"
      >
        {/* <GiftStepsSvg /> */}
        <HowSpinWorks />
      </div>
    </Stack>
  );
};

export default GiftSteps;
