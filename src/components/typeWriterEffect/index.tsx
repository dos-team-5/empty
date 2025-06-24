'use client';

import { cn } from '@/lib/utils';
import { motion, stagger, useAnimate, useInView } from 'motion/react';
import { useEffect } from 'react';

export const TypewriterEffect = ({
  words,
  className,
  cursorClassName,
}: {
  words: {
    text: string;
    className?: string;
  }[];
  className?: string;
  cursorClassName?: string;
}) => {
  // Split text inside of words into array of characters
  const wordsArray = words.map((word) => {
    return {
      ...word,
      text: word.text.split(''),
    };
  });

  const [scope, animate] = useAnimate();
  const isInView = useInView(scope);

  useEffect(() => {
    if (isInView) {
      animate(
        'span',
        {
          display: 'inline-block',
          opacity: 1,
          width: 'fit-content',
        },
        {
          duration: 0.3,
          delay: stagger(0.1),
          ease: 'easeInOut',
        }
      );
    }
  }, [isInView, animate]);

  const renderWords = () => {
    return (
      <motion.div
        ref={scope}
        className="inline-flex flex-wrap items-center text-center"
      >
        {wordsArray.map((word, idx) => (
          <div key={`word-${idx}`} className="inline-block text-center">
            {word.text.map((char, index) => (
              <motion.span
                initial={{ opacity: 0, display: 'none' }}
                key={`char-${index}`}
                className={cn(`text-center text-black`, word.className)}
              >
                {char}
              </motion.span>
            ))}
            {/* Add a single space after each word, except the last one */}
            {idx < wordsArray.length - 1 && <span>&nbsp;</span>}
          </div>
        ))}
      </motion.div>
    );
  };

  return (
    <div
      className={cn(
        'text-center text-base font-bold sm:text-xl md:text-2xl',
        className
      )}
    >
      <div className="inline-flex items-center">
        {renderWords()}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 0 }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className={cn(
            'ml-1 inline-block h-4 w-[4px] rounded-sm bg-blue-500 md:h-6 lg:h-10',
            cursorClassName
          )}
        />
      </div>
    </div>
  );
};
