'use client';
import { Box, Title } from '@mantine/core';
import { useMotionValueEvent, useScroll } from 'motion/react';
import { useRef, useState } from 'react';

const QuestionSection = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end start'],
  });

  const [scrollValue, setScrollValue] = useState(0);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setScrollValue(latest);
  });

  return (
    <Box className="h-[300dvh]" ref={targetRef}>
      <Box
        maw={1800}
        mx="auto"
        className="relative px-4 sm:px-8 md:px-16 lg:px-20 xl:px-24 2xl:px-32"
      >
        <div className="sticky top-[20dvh] ">
         
            <div className="flex w-full items-center justify-center gap-1.5 pt-[40dvh] text-xl text-nowrap">
              <div>Go Further</div>
              <div>With Your Ad</div>
            </div>
            <div className="flex w-full items-center justify-center gap-1.5 text-xl text-nowrap">
              <div>Spend Than</div>
              <div>Ever Before</div>
            </div>
          
        </div>
      </Box>
    </Box>
  );
};

export default QuestionSection;
