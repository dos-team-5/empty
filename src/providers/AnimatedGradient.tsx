'use client';
import React, { useEffect, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
} from 'motion/react';

interface AnimatedGradientProps {
  gradientColors?: [string, string];
  className?: string;
  transitionDuration?: number;
}

const AnimatedGradient: React.FC<AnimatedGradientProps> = ({
  gradientColors = ['#ffffff', 'var(--mantine-primary-color-0)'],
  className = 'fixed top-0 left-0 -z-10 h-dvh w-full',
  transitionDuration = 0.7,
}) => {
  const { scrollYProgress } = useScroll();
  const [isScrolling, setIsScrolling] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [motionValue, setMotionValue] = useState(0);

  const rawAngle = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const angle = useSpring(rawAngle, { stiffness: 100, damping: 20 });

  const backgroundImage = useMotionTemplate`linear-gradient(${angle}deg, ${gradientColors[0]}, ${gradientColors[1]})`;

  useMotionValueEvent(scrollYProgress, 'change', (latest) =>
    setMotionValue(latest)
  );

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout | null = null;

    const handleScroll = () => {
      setIsScrolling(true);
      setHasScrolled(true);

      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, []);

  return (
    <>
      <div
        style={{
          backgroundImage: `linear-gradient(0deg, ${gradientColors[0]}, ${gradientColors[1]})`,
          opacity: !hasScrolled || motionValue < 0.1 ? 1 : 0,
          transition: `opacity ${transitionDuration}s ease-in-out`,
        }}
        className={className}
      />

      <AnimatePresence>
        {isScrolling && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: transitionDuration, ease: 'easeInOut' }}
            className={className}
            style={{ backgroundImage }}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default AnimatedGradient;
