'use client';

import { Title } from '@mantine/core';
import { CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion'; // Import AnimatePresence
import { useEffect, useState } from 'react';

type Testimonial = {
  quote1: string;
  name1: string;
  quote2: string;
  name2: string;
};

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
}) => {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  return (
    <div className="mx-auto mt-0 w-full max-w-sm font-sans antialiased md:max-w-4xl lg:mt-16 lg:w-[30%]">
      <div className="relative">
        <div className="flex flex-col justify-between py-4">
          <AnimatePresence mode="wait">
            <div className="flex items-start justify-between gap-2">
              <CheckCircle className="text-primary-400 flex-shrink-0 rounded-md text-xl" />
              <motion.div
                key={`testimonial-1-${active}`} // Unique key for first testimonial
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }} // Slightly longer duration
              >
                <Title
                  order={3}
                  style={{ fontFamily: 'var(--font-poppins)' }}
                  c="#333333"
                  className="text-start capitalize lg:!max-w-xs xl:!max-w-sm 2xl:!max-w-md"
                >
                  <div className="text-lg font-medium xl:text-xl 2xl:text-2xl">
                    {testimonials[active].name1}
                  </div>
                </Title>

                <motion.p className="mt-3 text-base font-normal text-[#5E5E5E] xl:text-lg 2xl:text-xl">
                  {testimonials[active].quote1.split(' ').map((word, index) => (
                    <motion.span
                      key={`quote1-${active}-${index}-${word}`} // More unique key
                      initial={{ filter: 'blur(10px)', opacity: 0, y: 5 }}
                      animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.3,
                        ease: 'easeInOut',
                        delay: 0.03 * index, // Slightly increased delay for smoother effect
                      }}
                      className="inline-block"
                    >
                      {word}&nbsp;
                    </motion.span>
                  ))}
                </motion.p>
              </motion.div>
            </div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <div className="mt-8 flex items-start justify-between gap-2">
              <CheckCircle className="text-primary-400 flex-shrink-0 rounded-md text-xl" />
              <motion.div
                key={`testimonial-2-${active}`} // Unique key for second testimonial
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                // className="mt-4"
              >
                <Title
                  order={3}
                  style={{ fontFamily: 'var(--font-poppins)' }}
                  c="#333333"
                  className="text-start capitalize lg:!max-w-xs xl:!max-w-sm 2xl:!max-w-md"
                >
                  <div className="text-lg font-medium xl:text-xl 2xl:text-2xl">
                    {testimonials[active].name2}
                  </div>
                </Title>

                <motion.p className="mt-3 text-base font-normal text-[#5E5E5E] xl:text-lg 2xl:text-xl">
                  {testimonials[active].quote2.split(' ').map((word, index) => (
                    <motion.span
                      key={`quote2-${active}-${index}-${word}`} // More unique key
                      initial={{ filter: 'blur(10px)', opacity: 0, y: 5 }}
                      animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.3,
                        ease: 'easeInOut',
                        delay: 0.03 * index,
                      }}
                      className="inline-block"
                    >
                      {word}&nbsp;
                    </motion.span>
                  ))}
                </motion.p>
              </motion.div>
            </div>
          </AnimatePresence>

          <div className="flex gap-4 pt-12 pl-6">
            <button
              onClick={handlePrev}
              className="group/button flex h-7 w-7 cursor-pointer items-center justify-center rounded-full"
            >
              <ChevronLeft className="text-primary h-5 w-5 transition-transform duration-300 group-hover/button:rotate-12" />
            </button>
            <button
              onClick={handleNext}
              className="group/button flex h-7 w-7 cursor-pointer items-center justify-center rounded-full"
            >
              <ChevronRight className="text-primary h-5 w-5 transition-transform duration-300 group-hover/button:-rotate-12" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
