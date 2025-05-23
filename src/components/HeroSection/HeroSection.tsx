'use client';
import React from 'react';
import { Title, Box } from '@mantine/core';
import PrimaryBtn from '../PrimaryBtn';
import Link from 'next/link';
import { TextAnimate } from '../TextAnimation';
import { motion, useAnimationControls } from 'motion/react';
import { useMediaQuery } from '@mantine/hooks';
import { useEffect, useRef } from 'react';
import HeroCar from '../Icons/HeroCar';

const HeroSection: React.FC = () => {
  const md = useMediaQuery('(min-width: 768px)');
  const lg = useMediaQuery('(min-width: 1024px)');
  const xl = useMediaQuery('(min-width: 1280px)');
  const xxl = useMediaQuery('(min-width: 1536px)');

  const rootRef = useRef<HTMLDivElement>(null);
  const imageControls = useAnimationControls();

  const getAnimationProps = () => {
    if (xxl) return { initialX: '100%', animateX: '0%' };
    if (xl) return { initialX: '100%', animateX: '0%' };
    if (lg) return { initialX: '100%', animateX: '0%' };
    if (md) return { initialX: '100%', animateX: '0%' };
    return { initialX: '200%', animateX: '36%' };
  };

  const { initialX, animateX } = getAnimationProps();

  useEffect(() => {
    imageControls.start({ x: animateX });
  }, [imageControls, animateX]);

  const handleAdvertiseClick = () => {
    const target = document.querySelector('#pricingSection');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box className="relative h-dvh overflow-hidden" ref={rootRef}>
      <motion.div
        initial={{ x: initialX }}
        animate={imageControls}
        transition={{
          duration: 2.7,
        }}
        className="absolute right-0 bottom-[-38%] md:bottom-[-20%] lg:bottom-[-40%] xl:bottom-[-42%] 2xl:bottom-[-40%]"
      >
        {/* <Image
          src={'/R3.png'}
          alt="car1"
          width={1000}
          height={1000}
          className="w-[900px] origin-bottom-right scale-200 md:scale-160 lg:scale-90 xl:scale-130 2xl:scale-172"
        /> */}
        <HeroCar
          className={'w-[900px] origin-bottom-right scale-75 xl:scale-100'}
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
                className="text- seizing md:text-4xl lg:text-[40px] 2xl:text-5xl"
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
