'use client';
import React from 'react';
import { Title, Box } from '@mantine/core';
import PrimaryBtn from '../PrimaryBtn';
import Link from 'next/link';
import { TextAnimate } from '../TextAnimation';
import { motion } from 'framer-motion'; // Ensure correct import
import Image from 'next/image';
import { useMediaQuery } from '@mantine/hooks';

const HeroSection: React.FC = () => {
  const md = useMediaQuery('(min-width: 768px)');
  const lg = useMediaQuery('(min-width: 1024px)');
  const xl = useMediaQuery('(min-width: 1280px)');
  const xxl = useMediaQuery('(min-width: 1536px)');
  return (
    <Box className="relative h-dvh overflow-hidden">
      <motion.div
        initial={{ x: lg ? '100%' : md ? '180%' : '200%' }}
        animate={{ x: xxl ? '6%' : xl ? 0 : lg ? '2%' : md ? '60%' : '100%' }}
        transition={{ duration: 2.7, ease: 'easeOut' }}
        className="absolute right-0 bottom-16 md:bottom-24 lg:bottom-16"
      >
        <Image
          src={'/R3.png'}
          alt="car1"
          width={1000}
          height={1000}
          className="w-[900px] origin-bottom-right scale-210 md:scale-160 lg:scale-110 xl:scale-150 2xl:scale-172"
        />
      </motion.div>

      <Box
        maw={1800}
        mx={'auto'}
        className="px-4 sm:px-8 md:px-16 lg:px-20 xl:px-24 2xl:px-32"
      >
        <Box className="flex h-full flex-col justify-start">
          <Box className="pt-32">
            <Title order={1} fw={500}>
              <TextAnimate
                animation="blurInUp"
                by="word"
                startOnView
                duration={0.5}
                className="text-3xl md:text-4xl lg:text-[40px] 2xl:text-5xl"
                once
              >
                Advertise on rideshare vehicles
              </TextAnimate>
              <TextAnimate
                animation="blurInUp"
                by="word"
                startOnView
                duration={0.5}
                delay={0.5}
                className="text-3xl md:text-4xl lg:text-[40px] 2xl:text-5xl"
                once
              >
                in high-traffic areas
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
                Unbeatable visibility and returns that
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
                stationary ads can’t match
              </TextAnimate>
            </Title>

            <Box className="mt-6 flex flex-wrap gap-4">
              <motion.div
                initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
                whileInView={{
                  opacity: 1,
                  filter: 'blur(0px)',
                  y: 0,
                }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 2 }}
              >
                <Link href={'/#pricingSection'}>
                  <PrimaryBtn btnText="Advertise" />
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
                whileInView={{
                  opacity: 1,
                  filter: 'blur(0px)',
                  y: 0,
                }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 2.4 }}
              >
                <Link href={'/drive'}>
                  <PrimaryBtn btnText="Drive" />
                </Link>
              </motion.div>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default HeroSection;
