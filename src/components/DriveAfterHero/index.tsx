'use client';
import React from 'react';
import { Title, Box } from '@mantine/core';
import { motion } from 'motion/react';
import PrimaryBtn from '../PrimaryBtn';

import { TextAnimate } from '../TextAnimation';
import Image from 'next/image';

const DriveAfterHeroSection: React.FC = () => {
  const handleSignUpClick = () => {
    const target = document.querySelector('#driveQualification');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box
      className="relative h-dvh overflow-hidden"
      // className="from-default to-primary-100 relative h-dvh bg-gradient-to-b from-55%"
    >
      <motion.div
        initial={{ x: '-100dvw', y: '30dvh', scale: 1.7, opacity: 0 }}
        whileInView={{ x: 0, y: 0, scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="md: absolute right-0 bottom-24 z-20 lg:bottom-0"
      >
        <Image
          src={'/he.png'}
          alt=""
          width={1000}
          height={1000}
          className="w-full origin-bottom-right 2xl:scale-125"
          priority
        />
      </motion.div>
      <Box
        maw={1800}
        mx={'auto'}
        className="px-4 sm:px-8 md:px-16 lg:px-20 xl:px-24 2xl:px-32"
      >
        <Box className="flex h-full flex-col justify-start">
          <Box className="pt-16 md:pt-20">
            <Title order={1} fw={500}>
              <TextAnimate
                animation="blurInUp"
                by="word"
                startOnView
                duration={0.5}
                once
                className="text-3xl md:text-4xl lg:text-[40px] 2xl:text-5xl"
              >
                Easily installable and removable
              </TextAnimate>
              <TextAnimate
                animation="blurInUp"
                by="word"
                startOnView
                duration={0.5}
                delay={0.5}
                once
                className="text-3xl md:text-4xl lg:text-[40px] 2xl:text-5xl"
              >
                decals, reducing your commitment.
              </TextAnimate>
            </Title>
            <Title order={2} fw={400} mt={'md'}>
              <TextAnimate
                animation="blurInUp"
                by="word"
                startOnView
                duration={0.5}
                delay={1}
                once
                className="text-base md:text-lg lg:text-xl 2xl:text-2xl"
              >
                We mail it. You install it, snap a photo, and start earning.
              </TextAnimate>
              <TextAnimate
                animation="blurInUp"
                by="word"
                startOnView
                duration={0.5}
                delay={1.5}
                once
                className="text-base md:text-lg lg:text-xl 2xl:text-2xl"
              >
                It’s that easy—no hidden costs, no BS.
              </TextAnimate>
            </Title>

            <Box className="mt-6 flex flex-wrap gap-4 lg:flex-col xl:flex-row">
              <motion.div
                initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
                whileInView={{
                  opacity: 1,
                  filter: 'blur(0px)',
                  y: 0,
                }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 1.5 }}
              >
                <Box onClick={handleSignUpClick} className="cursor-pointer">
                  <PrimaryBtn btnText="Learn More" />
                </Box>
              </motion.div>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DriveAfterHeroSection;
