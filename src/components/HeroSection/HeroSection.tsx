'use client';
import React from 'react';
import { Title, BackgroundImage, Box } from '@mantine/core';
import PrimaryBtn from '../PrimaryBtn';
import { useMediaQuery } from '@mantine/hooks';
import Link from 'next/link';
import { TextAnimate } from '../TextAnimation';
import { motion } from 'motion/react';

const HeroSection: React.FC = () => {
  const mobile = useMediaQuery('(max-width: 1024px)');
  const IsAboveMobile = useMediaQuery('(min-width: 768px)');
  const mobileBanner = 'polestar-banner-2.png';
  const desktopBanner = 'polestar-banner-1.png';
  const banner = mobile ? mobileBanner : desktopBanner;
  return (
    <BackgroundImage
      src={banner}
      className="h-dvh bg-contain bg-center lg:bg-cover"
    >
      <Box
        maw={1800}
        mx={'auto'}
        className="px-4 sm:px-8 md:px-16 lg:px-20 xl:px-24 2xl:px-32"
      >
        <Box className="flex h-full flex-col justify-start">
          <Box className="pt-40">
            <Title order={1} fw={500} fz={IsAboveMobile ? 52 : 'h2'}>
              <TextAnimate
                animation="blurInUp"
                by="word"
                startOnView
                duration={0.5}
                className="max-w-5xl"
                once
              >
                Advertise on rideshare vehicles in high-traffic areas
              </TextAnimate>
            </Title>
            <Title order={2} fw={400} fz={IsAboveMobile ? 21 : 'md'} mt={'md'}>
              <TextAnimate
                animation="blurInUp"
                by="word"
                startOnView
                duration={0.5}
                delay={0.5}
                className="max-w-3xl"
                once
              >
                Unbeatable visibility and returns that stationary ads can’t
                match
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
                transition={{ duration: 0.4, delay: 1 }}
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
                transition={{ duration: 0.4, delay: 1.4 }}
              >
                <Link href={'/drive'}>
                  <PrimaryBtn btnText="Drive" />
                </Link>
              </motion.div>
            </Box>
          </Box>
        </Box>
      </Box>
    </BackgroundImage>
  );
};

export default HeroSection;
