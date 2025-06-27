'use client';
import React, { useEffect, useState } from 'react';
import { Title, Box, Space } from '@mantine/core';
import PrimaryBtn from '../PrimaryBtn';
import Link from 'next/link';
import { TextAnimate } from '../TextAnimation';
import { motion } from 'framer-motion';
import { useMediaQuery } from '@mantine/hooks';
import SecondaryButton from '../toggleModeSwitch/SecondaryButton';
import Image from 'next/image';

const HeroSection: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);
  const md = useMediaQuery('(min-width: 768px)');
  const lg = useMediaQuery('(min-width: 1024px)');
  const xl = useMediaQuery('(min-width: 1280px)');
  const xxl = useMediaQuery('(min-width: 1536px)');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <Box className="relative h-dvh overflow-hidden">
      {isMounted && (
        <div className="absolute right-[-80%] scale-130 lg:right-0 bottom-[-30%]  md:bottom-[-22%] lg:bottom-[-28%] lg:scale-100 xl:bottom-[-20%]">
          <Image
            src="/T1C.svg"
            alt="HeroImage"
            width={1000}
            height={1000}
            className="h-dvh w-[156dvw] origin-bottom-right !bg-transparent md:w-[152dvw] lg:w-[72dvw]"
            priority
          />
        </div>
      )}

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
              c="#000000"
              ff={'var(--font-poppins)'}
              className="capitalize"
            >
              <TextAnimate
                animation="blurInUp"
                by="word"
                startOnView
                duration={0.5}
                className="md:text-[52px] lg:text-[48px] xl:text-[48px] 2xl:text-[64px]"
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
                className="md:text-[52px] lg:text-[48px] xl:text-[48px] 2xl:text-[64px]"
                once
              >
                in high-traffic areas
              </TextAnimate>
            </Title>

            <Title
              order={2}
              fw={400}
              c="#000000"
              ff={'var(--font-inter)'}
              className="capitalize"
              pt={10}
            >
              <TextAnimate
                animation="blurInUp"
                by="word"
                startOnView
                duration={0.5}
                delay={1}
                once
                className="text-[16px] 2xl:text-lg"
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
                className="text-[16px] 2xl:text-lg"
              >
                stationary ads can’t match.
              </TextAnimate>
            </Title>
            <Space className="h-4 md:h-6" />

            <Box className="flex flex-wrap gap-4">
              <motion.div
                initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
                animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                transition={{ duration: 0.4, delay: 2 }}
              >
                <Box
                  onClick={() => {
                    const target = document.querySelector(
                      '#pricing-configurator'
                    );
                    if (target) {
                      target.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  <PrimaryBtn btnText="Advertise" glowOnHover />
                </Box>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
                animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                transition={{ duration: 0.4, delay: 2.4 }}
              >
                <Link href={'/drive'}>
                  <SecondaryButton btnText="Drive" glowOnHover />
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
