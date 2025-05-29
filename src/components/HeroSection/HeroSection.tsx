'use client';
import React from 'react';
import { Title, Box, Space } from '@mantine/core';
import PrimaryBtn from '../PrimaryBtn';
import Link from 'next/link';
import { TextAnimate } from '../TextAnimation';
import { motion } from 'motion/react';
import { useMediaQuery } from '@mantine/hooks';
import HeroCar from '../Icons/HeroCar';

const HeroSection: React.FC = () => {
  const md = useMediaQuery('(min-width: 768px)');
  const lg = useMediaQuery('(min-width: 1024px)');
  const xl = useMediaQuery('(min-width: 1280px)');
  const xxl = useMediaQuery('(min-width: 1536px)');

  const getAnimationProps = () => {
    if (xxl) return { x: '0%' };
    if (xl) return { x: '0%' };
    if (lg) return { x: '0%' };
    if (md) return { x: '36%' };
    return { x: '36%' };
  };

  const { x } = getAnimationProps();

  const handleAdvertiseClick = () => {
    const target = document.querySelector('#pricingSection');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box className="relative h-dvh overflow-hidden">
      <div
        style={{ transform: `translateX(${x})` }}
        className="absolute right-0 bottom-[-34%] md:bottom-[-30%] lg:bottom-[-28%] xl:bottom-[-20%]"
      >
        <HeroCar
          className={
            'h-dvh w-[156dvw] origin-bottom-right md:w-[152dvw] lg:w-[72dvw]'
          }
        />
      </div>

      <Box
        maw={1800}
        mx={'auto'}
        className="px-4 sm:px-8 md:px-16 lg:px-20 xl:px-24 2xl:px-32"
      >
        <Box className="flex h-full flex-col justify-start">
          <Box className="pt-24 md:pt-32">
            <Title
              order={1}
              fw={700}
              c="#333333"
              ff={'var(--font-poppins)'}
              className="capitalize"
            >
              <TextAnimate
                animation="blurInUp"
                by="word"
                startOnView
                duration={0.5}
                className="md:text-[52px] lg:text-[48px] xl:text-[52px] 2xl:text-[64px]"
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
                className="md:text-[52px] lg:text-[48px] xl:text-[52px] 2xl:text-[64px]"
                once
              >
                in high-traffic areas
              </TextAnimate>
            </Title>
            <Space className="h-6 md:h-8" />
            <Title
              order={2}
              fw={700}
              c="#5E5E5E"
              ff={'var(--font-poppins)'}
              className="capitalize"
            >
              <TextAnimate
                animation="blurInUp"
                by="word"
                startOnView
                duration={0.5}
                delay={1}
                once
                className="text-lg md:text-2xl lg:text-xl xl:text-2xl 2xl:text-3xl"
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
                className="text-lg md:text-2xl lg:text-xl xl:text-2xl 2xl:text-3xl"
              >
                stationary ads can’t match.
              </TextAnimate>
            </Title>
            <Space className="h-4 md:h-6" />

            <Box className="flex flex-wrap gap-4">
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
                <Box onClick={handleAdvertiseClick}>
                  <PrimaryBtn btnText="Advertise" glowOnHover />
                </Box>
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
                  <PrimaryBtn btnText="Drive" glowOnHover />
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
