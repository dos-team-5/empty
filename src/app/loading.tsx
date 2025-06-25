'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Poppins } from 'next/font/google';
import Image from 'next/image';

const emptyFont = Poppins({
  variable: '--font-emptyFont',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

export default function Loading() {
  const [animationStep, setAnimationStep] = useState(0);
  const timers = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    const runAnimation = () => {
      setAnimationStep(0);
      timers.current.push(setTimeout(() => setAnimationStep(1), 500));
      timers.current.push(setTimeout(() => setAnimationStep(2), 2000));
      timers.current.push(setTimeout(() => setAnimationStep(3), 3200));
      timers.current.push(
        setTimeout(() => {
          runAnimation();
        }, 4200) // Adjust this to match the total animation duration
      );
    };

    runAnimation();

    return () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
  }, []);

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@600&display=swap');
      `}</style>

      <div className="flex min-h-screen items-center justify-center bg-white">
        <motion.div className="relative flex h-screen w-[400px] items-center justify-center overflow-hidden">
          {/* Logo */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: animationStep >= 1 ? 1 : 0,
              opacity: animationStep >= 1 ? 1 : 0,
              x: animationStep >= 2 ? -130 : 0,
              y: animationStep >= 3 ? -100 : 0,
            }}
            transition={{
              scale: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] },
              opacity: { duration: 0.6 },
              x: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] },
              y: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
            }}
            className="absolute z-10"
          >
            <div style={{ filter: 'hue-rotate(0deg) saturate(1)' }}>
              <Image
                title="Empty Logo"
                src="/logo-icon.png"
                alt="Logo"
                width={100}
                height={100}
                className="w-17 object-contain"
              />
            </div>
          </motion.div>

          {/* EMPTY Text */}
          <motion.div
            initial={{ x: 350, opacity: 1 }}
            animate={{
              x: animationStep >= 2 ? 45 : 350,
              opacity: animationStep >= 2 ? 1 : 0,
              y: animationStep >= 3 ? -100 : 0,
            }}
            transition={{
              x: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] },
              opacity: { duration: 0.8 },
              y: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
            }}
            className="absolute"
          >
            <div
              className={`text-7xl select-none ${emptyFont.variable}`}
              style={{
                color: '#D381B5',
                fontWeight: 550,
                fontFamily: 'Poppins',
                letterSpacing: '0.02em',
              }}
            >
              EMPTY
            </div>
          </motion.div>
          {/* <div className="mt-80 ml-8 text-center xl:ml-16">
            <h1
              className="text-3xl font-bold xl:text-4xl 2xl:text-5xl"
              style={{ color: '#d481b6' }}
            >
              LOADING...
            </h1>
          </div> */}
        </motion.div>
      </div>
    </>
  );
}
