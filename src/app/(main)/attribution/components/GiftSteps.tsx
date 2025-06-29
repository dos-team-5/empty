'use client';
import { TextAnimate } from '@/components/TextAnimation';
import { Stack, Title } from '@mantine/core';
import { motion } from 'motion/react';
import HowSpinWorks from './HowSpinWorks';
import Image from 'next/image';
import { useLanguage } from '@/providers/languageToggleContext';
import { attributionPageContent } from '@/contents/attribution/attributionPage';

const GiftSteps = () => {
  const { language } = useLanguage();
  const content = attributionPageContent[language];
  return (
    <Stack maw={1200} mx="auto" mt={{ base: 80 }} mb={{ base: 80 }}>
      <div className="flex flex-col items-center justify-center lg:flex-row lg:gap-32">
        <Image
          title="Vs Scan & Spin"
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
          className="mx-4 mt-16 rounded-2xl bg-[#FF83D5] p-8 text-center text-xs text-white sm:mx-24 md:text-sm lg:mx-0 lg:w-108"
        >
          {content.aboutScanSpinSection.description}
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
          {content.aboutScanSpinSection.title}
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
