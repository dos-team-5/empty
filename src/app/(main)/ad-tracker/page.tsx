'use client';
import { motion } from 'motion/react';
import Link from 'next/link';
import { PrimaryBtn } from '@/components';
import Image from 'next/image';
import Head from 'next/head';

const images = [
  '/Empty1.jpg',
  '/Empty2.jpg',
  '/Empty3.jpg',
  '/Empty4.jpg',
  '/Empty5.jpg',
  '/Empty6.jpg',
];

const AdTracker = () => {
  return (
    <>
      <Head>
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://emptyad.com/ad-tracker" />
        <title>Ad Tracker | Empty</title>
      </Head>
      <div className="flex min-h-dvh flex-col overflow-hidden">
        <div className="relative flex flex-col items-center justify-center bg-[#FDFEFD] transform-3d">
          <div className="mt-24 text-center">
            <motion.h1
              className="text-primary-400 mb-4 text-4xl font-bold sm:text-5xl 2xl:text-7xl"
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
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
                className="ml-2"
              >
                SOON
              </motion.span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.6, ease: 'easeOut' }}
            >
              <Link href={'/'}>
                <PrimaryBtn btnText="Back to Home" />
              </Link>
            </motion.div>
          </div>
          <div className="relative z-10 translate-z-100 rotate-324 rotate-x-47 rotate-y-31 rounded-2xl border-t border-l border-black/20 pt-8 backface-hidden transform-3d md:ml-40 md:scale-150 lg:scale-120 xl:scale-130">
            {images.map((image, i) => (
              <motion.div
                key={i}
                initial={{ z: 100, x: 100, opacity: 0 }}
                animate={{ z: 0, x: 0, opacity: 1 }}
                transition={{
                  duration: 2.2,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 1 + i * 0.1,
                }}
                className="relative"
              >
                <Image
                  src={image}
                  alt={`Image ${i + 1}`}
                  width={1000}
                  height={1000}
                  className="rounded-2xl"
                />
              </motion.div>
            ))}
            <motion.div
              className="absolute inset-0 rounded-lg bg-radial-[at_30%_30%] from-transparent to-[#FDFEFD] to-65%"
              // initial={{ opacity: 0, z: 100, x: 100 }}
              // animate={{ opacity: 1, z: 0, x: 0 }}
              // transition={{
              //   duration: 2.4,
              //   ease: [0.22, 1, 0.36, 1],
              //   delay: 1.2,
              // }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdTracker;
