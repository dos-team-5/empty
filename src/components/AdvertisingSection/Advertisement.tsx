'use client';
import { Box, Title } from '@mantine/core';
import { TextAnimate } from '../TextAnimation';
import Image from 'next/image';
import { motion } from 'motion/react';
import { CheckCircle } from 'lucide-react';

const Advertisement = () => {
  const checkItemVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Box className="relative h-dvh overflow-hidden">
      <motion.div
        initial={{ x: '-32%', scale: 0.7, y: '-8%' }}
        whileInView={{ x: 0, scale: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="absolute top-auto bottom-0 left-0 z-20 lg:top-[24dvh]"
      >
        <Image
          src={'/R22.png'}
          alt=""
          width={1000}
          height={1000}
          className="w-full sm:origin-bottom-left sm:scale-75 md:origin-bottom-left md:scale-100 lg:scale-60 xl:scale-72 2xl:scale-100"
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
                Why Advertisers Choose EMPTY
              </TextAnimate>
            </Title>
            <div className="right-20 mt-8 flex flex-col gap-4 md:absolute xl:right-[16dvw]">
              {[
                {
                  title: 'Budget-friendly, Brand-ready.',
                  des: 'Launch flexible, scalable campaigns. Perfect for startups or global brands. ',
                },
                {
                  title: 'High Impact, Low CPM.',
                  des: 'Fast and simple setup. Premium visibility. Industry-leading ROI',
                },
                {
                  title: 'Your Ad, All Over the City.',
                  des: 'Whether you own a fleet or a single car, your ad will be seen across the entire city.',
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={checkItemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: (index + 1) * 0.6 }}
                  className="flex items-start justify-start gap-x-4 py-2 lg:min-w-auto"
                >
                  <CheckCircle className="text-primary-400 flex-shrink-0 rounded-md text-xl" />
                  <Title
                    order={2}
                    fw={400}
                    className="!max-w-3xs 2xl:!max-w-2xs"
                  >
                    <div className="mb-0.5 text-sm font-semibold md:text-base lg:text-lg 2xl:text-xl">
                      {item.title}
                    </div>
                    <div className="mb-0.5 text-sm md:text-base lg:text-lg 2xl:text-xl">
                      {item.des}
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
