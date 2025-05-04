'use client';
import { Title, Box } from '@mantine/core';
import PrimaryBtn from '../PrimaryBtn';
import { TextAnimate } from '../TextAnimation';
import { motion } from 'motion/react';
import Image from 'next/image';

const DriveHeroSection: React.FC = () => {
  const handleSignUpClick = () => {
    const target = document.querySelector('#signUpDriver');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box className="relative h-dvh overflow-hidden">
      <motion.div
        initial={{ x: '-132%' }}
        animate={{
          x: 0,
        }}
        transition={{ duration: 2.7, ease: 'easeOut' }}
        className="absolute bottom-16 left-0 lg:bottom-0"
      >
        <Image
          src={'/r5c.png'}
          alt="car2"
          width={1000}
          height={1000}
          className="w-[900px] origin-bottom-left lg:scale-88 xl:scale-90 2xl:scale-125"
          priority
        />
      </motion.div>
      <Box
        maw={1800}
        mx={'auto'}
        className="px-4 sm:px-8 md:px-16 lg:px-20 xl:px-24 2xl:px-32"
      >
        <Box className="flex h-full w-full flex-col justify-end">
          <Box className="pt-32">
            <Title order={1} fw={500}>
              <TextAnimate
                animation="blurInUp"
                by="word"
                startOnView
                duration={0.5}
                className="text-end text-3xl md:text-4xl lg:text-[40px] 2xl:text-5xl"
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
                className="text-end text-3xl md:text-4xl lg:text-[40px] 2xl:text-5xl"
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
                className="text-end text-base md:text-lg lg:text-xl 2xl:text-2xl"
                once
              >
                Get paid up to $300/month to display ads
              </TextAnimate>
              <TextAnimate
                animation="blurInUp"
                by="word"
                startOnView
                duration={0.5}
                delay={1.5}
                className="text-end text-base md:text-lg lg:text-xl 2xl:text-2xl"
                once
              >
                on your car’s front doors.
              </TextAnimate>
            </Title>

            <Box className="mt-6 flex flex-wrap justify-end gap-4">
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
