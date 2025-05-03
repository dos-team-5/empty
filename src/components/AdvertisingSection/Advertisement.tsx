'use client';
import { Box, Title } from '@mantine/core';
import { TextAnimate } from '../TextAnimation';
import Image from 'next/image';
import { motion } from 'motion/react';

const Advertisement = () => {
  return (
    <Box className="relative h-[80dvh] overflow-hidden">
      <motion.div
        initial={{ x: '700px', scale: 0.7 }}
        // whileInView={{ x: 0, scale: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        viewport={{ once: true }}
        style={{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: '900px',
        }}
      >
        <Image
          src={'/R2.png'}
          alt=""
          width={1000}
          height={1000}
          className="h-auto w-full"
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
                className="text-[40px]"
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
                className="text-[40px]"
                once
              >
                Outspend No One
              </TextAnimate>
            </Title>
            <div className="mt-8 flex gap-2">
              {[
                'From startups to global brands, launch cost-effective campaigns that scale with your budget.',
                'Simple, fast, and built to deliver unmatched ROI and best-in-class CPM.',
                'We represent modern advertising done right.',
              ].map((item, index) => (
                <div
                  key={index}
                  className="group relative w-40 transform overflow-hidden rounded-xl bg-transparent shadow-md transition-all duration-500 hover:scale-105 hover:shadow-lg"
                >
                  <div className="from-primary-100 to-primary absolute inset-0 bg-gradient-to-br opacity-30 blur-md transition-opacity duration-500 group-hover:opacity-30"></div>
                  <div className="relative z-10 p-4">
                    <p className="text-text mt-2 text-xs">{item}</p>
                  </div>
                </div>
              ))}
            </div>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Advertisement;
