'use client';

import { motion, MotionValue, useScroll, useTransform } from 'framer-motion';
import {
  ComponentPropsWithoutRef,
  FC,
  ReactNode,
  useRef,
  useState,
} from 'react';
import { cn } from '@/lib/utils';
import { Flex } from '@mantine/core';
import Link from 'next/link';
import SecondaryButton from './toggleModeSwitch/SecondaryButton';
import { useLanguage } from '@/providers/languageToggleContext';
import { getAdvertisePageContent } from '@/contents/advertise/AdvertisePage';

export interface TextRevealByWordProps extends ComponentPropsWithoutRef<'div'> {
  children: string;
  textColor?: string;
}

export const TextRevealByWord: FC<TextRevealByWordProps> = ({
  children,
  className,
  textColor = 'text-[#D481B5]',
}) => {
  const { language } = useLanguage();
  const content = getAdvertisePageContent[language];
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });
  const [btnHovered, setBtnHovered] = useState(false);

  if (typeof children !== 'string') {
    throw new Error('TextReveal: children must be a string');
  }

  const words = children.split(' ');
  // Calculate the range for the last word
  const lastWordIndex = words.length - 1;
  const lastWordStart = lastWordIndex / words.length;
  const lastWordEnd =
    lastWordStart + (language === 'fr' ? 0.3 : 0.5) / words.length;

  // Button animation starts after the last word's opacity animation ends
  const y = useTransform(
    scrollYProgress,
    [lastWordEnd, lastWordEnd + 0.1],
    ['40vh', '-8vh']
  );

  return (
    <div ref={targetRef} className={cn('relative z-0 h-[200vh]', className)}>
      <div className="sticky top-16 mx-auto flex h-[40%] flex-col items-center justify-center">
        <div className="flex max-w-7xl items-center bg-transparent px-4 py-8">
          <p className="flex flex-wrap justify-center px-5 pt-5 text-center text-4xl font-bold text-black/20 md:px-8 md:pt-8 md:text-7xl lg:px-10 lg:pt-10 lg:text-9xl">
            {words.map((word, i) => {
              const start = i / words.length;
              // changed to 0.25 to ensure the last word has enough space
              const end = start + 0.25 / words.length;
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
        <motion.div
          onHoverStart={() => setBtnHovered(true)}
          onHoverEnd={() => setBtnHovered(false)}
          style={{ y }}
          className="scale-100 md:scale-125 lg:scale-150"
        >
          <Flex
            mt={20}
            component={Link}
            href={'/contact'}
            justify="center"
            align="center"
          >
            <SecondaryButton
              btnText={content.textRevealSection.cta}
              glowOnHover
              customeSize
            />
          </Flex>
        </motion.div>
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
  const opacity = useTransform(progress, range, [0, 1]);

  return (
    <span className="relative mx-1 lg:mx-1.5">
      <span className="absolute opacity-10">{children}</span>
      <motion.span style={{ opacity: opacity }} className={textColorClass}>
        {children}
      </motion.span>
    </span>
  );
};
