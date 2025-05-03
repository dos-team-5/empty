'use client';
import React from 'react';
import { Title, Box } from '@mantine/core';
import PrimaryBtn from '../PrimaryBtn';
import Link from 'next/link';
import { TextAnimate } from '../TextAnimation';
import { motion } from 'framer-motion'; // Ensure correct import
import Image from 'next/image';

const HeroSection: React.FC = () => {
  return (
    <Box className="relative h-dvh overflow-hidden">
      <motion.div
        initial={{ x: '100vw' }}
        animate={{ x: 0 }}
        transition={{ duration: 2.7, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          right: 0,
          bottom: 20,
          width: '900px',
        }}
      >
        <Image
          src={'/R3.png'}
          alt=""
          width={1000}
          height={1000}
          className="ml- h-auto w-full origin-bottom-right scale-125"
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
                Advertise on rideshare vehicles
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
                className="text-lg"
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
                className="text-lg"
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
