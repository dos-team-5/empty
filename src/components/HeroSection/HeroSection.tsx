'use client';
import React from 'react';
import { Title, Box, Space } from '@mantine/core';
import PrimaryBtn from '../PrimaryBtn';
import Link from 'next/link';
import { TextAnimate } from '../TextAnimation';
import { motion } from 'framer-motion';
import { useMediaQuery } from '@mantine/hooks';
import SecondaryButton from '../toggleModeSwitch/SecondaryButton';
import Lottie from 'lottie-react';
import animationData from '../../../public/T1C.json';
import { useLanguage } from '@/providers/languageToggleContext';
import { getAdvertisePageContent } from '@/contents/advertise/AdvertisePage';

const HeroSection: React.FC = () => {
  const { language } = useLanguage();
  const content = getAdvertisePageContent[language];
  const xs = useMediaQuery('(max-width: 380px)');

  return (
    <Box className="relative h-dvh overflow-hidden">
      <div
        className={`absolute ${xs ? 'right-[-50%]' : 'right-[-60%]'} bottom-[-80%] scale-130 md:right-[-40%] md:bottom-[-100%] md:scale-200 lg:right-[20%]`}
      >
        <Lottie
          loop={false}
          animationData={animationData}
          className="h-dvh w-full !origin-bottom-right"
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
              c="#000000"
              ff={'var(--font-poppins)'}
              className="capitalize"
            >
              <TextAnimate
                animation="blurInUp"
                by="word"
                startOnView
                duration={0.5}
                className={`${language === 'fr' ? 'text-[30px] lg:text-[36px]' : 'lg:text-[48px]'} md:text-[52px] xl:text-[48px] 2xl:text-[64px]`}
                once
              >
                {content.heroSection.title.line1}
              </TextAnimate>
              <TextAnimate
                animation="blurInUp"
                by="word"
                startOnView
                duration={0.5}
                delay={0.5}
                className={`${language === 'fr' ? 'text-[30px] lg:text-[36px]' : 'lg:text-[48px]'} md:text-[52px] xl:text-[48px] 2xl:text-[64px]`}
                once
              >
                {content.heroSection.title.line2}
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
                {content.heroSection.subtitle.line1}
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
                {content.heroSection.subtitle.line2}
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
                  <PrimaryBtn
                    btnText={content.heroSection.cta.cta1}
                    glowOnHover
                  />
                </Box>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
                animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                transition={{ duration: 0.4, delay: 2.4 }}
              >
                <Link href={'/drive'}>
                  <SecondaryButton
                    btnText={content.heroSection.cta.cta2}
                    glowOnHover
                  />
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
