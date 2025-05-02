'use client';
import React from 'react';
import { Title, BackgroundImage, Box } from '@mantine/core';
import PrimaryBtn from '../PrimaryBtn';
import { useMediaQuery } from '@mantine/hooks';
import Link from 'next/link';
import { TextAnimate } from '../TextAnimation';
import { motion } from 'motion/react';

const DriveHeroSection: React.FC = () => {
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
                Generate revenue every month
              </TextAnimate>
              <TextAnimate
                animation="blurInUp"
                by="word"
                startOnView
                duration={0.5}
                delay={0.5}
                once
              >
                without doing more work.
              </TextAnimate>
            </Title>

            <Title
              order={2}
              fw={400}
              fz={IsAboveMobile ? 'h2' : 'md'}
              mt={'md'}
            >
              <TextAnimate
                animation="blurInUp"
                by="word"
                startOnView
                duration={0.5}
                delay={1}
                className="max-w-3xl"
                once
              >
                Get paid up to $300/month to display ads on your car’s front
                doors.
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
                <Link href={'/drive#signUpDriver'}>
                  <PrimaryBtn btnText="Sign Up" />
                </Link>
              </motion.div>
            </Box>
          </Box>
        </Box>
      </Box>
    </BackgroundImage>
  );
};

export default DriveHeroSection;
