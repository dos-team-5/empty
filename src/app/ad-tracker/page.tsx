'use client';
import { PrimaryBtn } from '@/components';
import { Group } from '@mantine/core';
import Link from 'next/link';
import { motion } from 'motion/react';

const AdTracker = () => {
  return (
    <div className="flex h-dvh flex-col">
      <div className="flex flex-grow items-center justify-center">
        <div className="text-center">
          <motion.h1
            className="text-primary-400 mb-12 text-7xl font-bold"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            >
              COMING
            </motion.span>
            <br />
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
            >
              SOON
            </motion.span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.6, ease: 'easeOut' }}
          >
            <Group justify="center">
              <Link href={'/'}>
                <PrimaryBtn btnText="Back to Home" />
              </Link>
            </Group>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdTracker;
