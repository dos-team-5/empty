'use client';

import { motion, MotionValue, useScroll, useTransform } from 'framer-motion';
import { ComponentPropsWithoutRef, FC, ReactNode, useRef } from 'react';
import { cn } from '@/lib/utils'; // Your utility for merging class names
import { Flex } from '@mantine/core';
import PrimaryBtn from './PrimaryBtn';

export interface TextRevealByWordProps extends ComponentPropsWithoutRef<'div'> {
  children: string;
  /**
   * The text color of the revealed word. Can be any Tailwind CSS color class.
   * @default 'text-[#D481B5]' (The pink from your example)
   */
  textColor?: string;
}

export const TextRevealByWord: FC<TextRevealByWordProps> = ({
  children,
  className,
  textColor = 'text-[#D481B5]', // Default to pink
}) => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  if (typeof children !== 'string') {
    throw new Error('TextReveal: children must be a string');
  }

  const words = children.split(' ');
  return (
    <div ref={targetRef} className={cn('relative z-0 h-[200vh]', className)}>
      <div className="sticky top-16 mx-auto flex h-[50%] flex-col items-center justify-center">
        <div className="flex max-w-4xl items-center bg-transparent px-4 py-8">
          {/* The container sets the placeholder text color */}
          <p className="flex flex-wrap justify-center p-5 text-center text-2xl font-bold text-black/20 md:p-8 md:text-3xl lg:p-10 lg:text-8xl">
            {words.map((word, i) => {
              const start = i / words.length;
              const end = start + 1 / words.length;
              return (
                <Word
                  key={i}
                  progress={scrollYProgress}
                  range={[start, end]}
                  textColorClass={textColor}
                >
                  {word}
                </Word>
              );
            })}
          </p>
        </div>
        <Flex justify="center" align="center">
          <PrimaryBtn btnText="Don’t Believe Us?" glowOnHover />
        </Flex>
      </div>
    </div>
  );
};

interface WordProps {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
  textColorClass: string;
}

const Word: FC<WordProps> = ({ children, progress, range, textColorClass }) => {
  // Animate the opacity of the revealing word based on scroll progress
  const opacity = useTransform(progress, range, [0, 1]);

  return (
    <span className="relative mx-1 lg:mx-1.5">
      {/* This is the placeholder text that is always visible but faded */}
      <span className="absolute opacity-10">{children}</span>

      {/* This is the revealing text that fades in with the desired solid color */}
      <motion.span style={{ opacity: opacity }} className={textColorClass}>
        {children}
      </motion.span>
    </span>
  );
};
