'use client';
import { useRef } from 'react';
import { Title, Box } from '@mantine/core';
import PrimaryBtn from '../PrimaryBtn';
import { TextAnimate } from '../TextAnimation';
import { motion } from 'motion/react';
import Image from 'next/image';

const DriveHeroSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  const handleSignUpClick = () => {
    // Smoothly scroll to #signUpDriver
    const target = document.querySelector('#signUpDriver');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box ref={ref} className="relative h-dvh overflow-hidden">
      <motion.div
        initial={{ x: '100vw' }}
        animate={{ x: '20vw', scale:1.4 }}
        transition={{ duration: 2.7, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: '900px',
        }}
      >
        <Image
          src={'/r5c.png'}
          alt=""
          width={1000}
          height={1000}
          className="h-auto w-full origin-bottom-right"
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
                className="text-[40px]"
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
                className="text-[40px]"
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
                className="text-lg"
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
