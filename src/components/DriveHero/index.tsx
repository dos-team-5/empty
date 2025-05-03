'use client';
import { useRef } from 'react';
import { Title, Box } from '@mantine/core';
import PrimaryBtn from '../PrimaryBtn';
import { TextAnimate } from '../TextAnimation';
import { motion } from 'motion/react';
import Image from 'next/image';
import { useMediaQuery } from '@mantine/hooks';

const DriveHeroSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  const md = useMediaQuery('(min-width: 768px)');
  const lg = useMediaQuery('(min-width: 1024px)');
  const xl = useMediaQuery('(min-width: 1280px)');
  const xxl = useMediaQuery('(min-width: 1536px)');

  const handleSignUpClick = () => {
    const target = document.querySelector('#signUpDriver');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box ref={ref} className="relative h-dvh overflow-hidden">
      <motion.div
        initial={{ x: lg ? '100%' : md ? '180%' : '200%' }}
        animate={{ x: xxl ? '72%' : xl ? '56%' : lg ? '48%' : md ? '60%' : '80%' }}
        transition={{ duration: 2.7, ease: 'easeOut' }}
        className="absolute right-0 bottom-0"
      >
        <Image
          src={'/r5c.png'}
          alt="car2"
          width={1000}
          height={1000}
          className="w-[900px] origin-bottom-right scale-180 md:scale-160 lg:scale-140 xl:scale-150 2xl:scale-172"
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
                Generate revenue every month
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
                without doing more work.
              </TextAnimate>
            </Title>

            <Title order={2} fw={400} mt={'md'}>
              <TextAnimate
                animation="blurInUp"
                by="word"
                startOnView
                duration={0.5}
                delay={1}
                className="text-base md:text-lg lg:text-xl 2xl:text-2xl"
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
                <Box onClick={handleSignUpClick} className="cursor-pointer">
                  <PrimaryBtn btnText="Sign Up" />
                </Box>
              </motion.div>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DriveHeroSection;
