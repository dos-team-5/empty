'use client';
import { Box, Title } from '@mantine/core';
import { TextAnimate } from '../TextAnimation';
import Image from 'next/image';
import { motion } from 'motion/react';
import { CheckCircle } from 'lucide-react';

const Advertisement = () => {
  const checkItemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <Box className="relative h-dvh overflow-hidden sm:h-dvh">
      <motion.div
        initial={{ x: '82%', scale: 0.7, y: '-8%' }}
        whileInView={{ x: 0, scale: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="md: absolute right-0 bottom-4 z-20 md:bottom-24 lg:bottom-0"
      >
        <Image
          src={'/R2.png'}
          alt=""
          width={1000}
          height={1000}
          className="w-full origin-bottom-right lg:scale-75 xl:scale-80 2xl:scale-100"
          priority
        />
      </motion.div>
      <Box
        maw={1800}
        mx={'auto'}
        className="px-4 sm:px-8 md:px-16 lg:px-20 xl:px-24 2xl:px-32"
      >
        <Box className="flex h-full flex-col items-start justify-start">
          <Box className="pt-16 md:pt-20">
            <Title order={1} fw={500} className="text-start">
              <TextAnimate
                animation="blurInUp"
                by="word"
                startOnView
                duration={0.5}
                className="text-start text-3xl sm:text-start md:text-4xl lg:text-[40px] 2xl:text-5xl"
                once
              >
                Outperform Everyone,
              </TextAnimate>
              <TextAnimate
                animation="blurInUp"
                by="word"
                startOnView
                duration={0.5}
                delay={0.5}
                className="text-start text-3xl sm:text-start md:text-4xl lg:text-[40px] 2xl:text-5xl"
                once
              >
                Outspend No One
              </TextAnimate>
            </Title>
            <div className="mt-8 flex flex-wrap justify-start gap-4 sm:justify-start">
              {[
                'From startups to global brands, launch cost-effective campaigns that scale with your budget.',
                'Simple, fast, and built to deliver unmatched ROI and best-in-class CPM.',
                'We represent modern advertising done right.',
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={checkItemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: (index + 1) * 0.6 }}
                  className="items-end-start flex justify-start gap-x-4 py-2 lg:min-w-auto"
                >
                  <CheckCircle className="text-primary-400 flex-shrink-0 rounded-md text-xl" />
                  <Title order={2} fw={400} className="!max-w-3xs">
                    <div className="mb-0.5 text-base md:text-lg lg:text-xl 2xl:text-2xl">
                      {item}
                    </div>
                  </Title>
                </motion.div>
              ))}
            </div>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Advertisement;
