'use client';

import { useEffect, useId } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useClickOutside } from '@mantine/hooks';
import { PlusIcon } from 'lucide-react';
import React from 'react';

export const ExpandableCardDemo = React.memo(function ExpandableCardDemo() {
  const [active, setActive] = React.useState<
    (typeof cards)[number] | boolean | null
  >(null);
  const id = useId();
  const ref = useClickOutside(() => setActive(false));

  useEffect(() => {
    // Preload images
    cards.forEach((card) => {
      const img = new Image();
      img.src = card.src;
    });
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActive(false);
    };

    document.body.style.overflow =
      active && typeof active === 'object' ? 'hidden' : 'auto';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [active]);

  return (
    <>
      <AnimatePresence>
        {active && typeof active === 'object' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, delay: 0.1 }}
            className="fixed inset-0 z-10 h-full w-full bg-black/20 backdrop-blur-[2px]"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === 'object' ? (
          <div className="fixed inset-0 z-[100] grid place-items-center">
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              transition={{ duration: 0.3, ease: 'easeInOut', delay: 0.05 }}
              className="bg-default relative flex h-fit w-full max-w-[500px] flex-col overflow-hidden rounded-3xl !shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff]"
              style={{ willChange: 'transform, opacity' }}
            >
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className="bg-default absolute top-4 right-4 z-40 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full"
                onClick={() => setActive(null)}
              >
                <CloseIcon />
              </motion.button>
              <motion.div
                layoutId={`image-${active.title}-${id}`}
                layout
                style={{ willChange: 'transform' }}
              >
                <img
                  width={500}
                  height={400}
                  src={active.src}
                  alt={active.title}
                  className="h-100 w-full rounded-t-lg object-cover object-center"
                />
              </motion.div>
              <div>
                <div className="flex items-start justify-between p-4">
                  <motion.h3
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="text-text text-base font-medium"
                  >
                    {active.title}
                  </motion.h3>
                </div>
                <div className="relative px-4 pt-4">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-text flex h-40 flex-col items-start gap-4 overflow-auto pb-10 text-sm"
                    style={{ willChange: 'opacity' }}
                  >
                    {typeof active.content === 'function'
                      ? active.content()
                      : active.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <motion.ul
        layout
        className="grid w-full grid-cols-1 items-start gap-4 md:grid-cols-2 xl:grid-cols-4"
      >
        {cards.map((card, i) => (
          <motion.div
            layoutId={`card-${card.title}-${id}`}
            key={card.title}
            onClick={() => setActive(card)}
            initial={{ x: -50, opacity: 0 }}
            whileInView={{
              x: 0,
              opacity: 1,
              transition: {
                delay: (i + 1) * 0.6,
              },
            }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="hover:bg-primary-50 flex cursor-pointer flex-col overflow-hidden rounded-xl bg-transparent p-4 !shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff] transition-colors duration-150"
          >
            <div className="flex w-full flex-col gap-4">
              <motion.div
                layoutId={`image-${card.title}-${id}`}
                layout
                style={{ willChange: 'transform' }}
              >
                <img
                  width={300}
                  height={320}
                  src={card.src}
                  alt={card.title}
                  className="h-80 w-full rounded-lg object-cover object-top pb-10"
                  
                />
              </motion.div>
              <div className="relative flex h-24 items-center justify-between px-2">
                <motion.h3 className="text-text w-[85%] text-left text-lg">
                  {card.title}
                </motion.h3>
                <div className="bg-primary-400 !text-default rounded-full p-1">
                  <PlusIcon />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.ul>
    </>
  );
});

export const CloseIcon = React.memo(function CloseIcon() {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.05 } }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="z-40 h-4 w-4"
      color={'#000000'}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
});

const cards = [
  {
    title: 'Unlock the Untapped Potential of Rideshare Advertising',
    src: '/1.jpg',
    content: () => {
      return (
        <p>
          The rideshare industry is one of the most underutilized channels for
          advertising today. Most vehicles don’t feature any form of ad
          placement, and the few that do rely on in-car screens, rooftop
          displays, or full-vehicle wraps. Empty offers a smarter, more
          cost-effective alternative. We help you stand out and reach a broader
          audience for a fraction of the cost.
        </p>
      );
    },
  },
  {
    title: 'From Preview to Live in a Few Days',
    src: '/2.jpg',
    content: () => {
      return (
        <p>
          With Empty’s cutting-edge platform, launching your ad is as easy as
          shopping online. Preview your asset directly on a vehicle, complete
          checkout, and go live—all within a week. No sales reps. No delays. No
          hassle. This streamlined process gives Empty a distinct edge over
          traditional out-of-home advertising options.
        </p>
      );
    },
  },
  {
    title: 'Any sized fleet, as per your needs.',
    src: '/3.jpg',
    content: () => {
      return (
        <p>
          At Empty, we believe powerful advertising should be accessible to
          everyone. Whether you're a small business with a tight budget or a
          global brand with massive reach, we scale to fit your goals. From one
          vehicle to an entire fleet, our platform delivers unmatched value and
          visibility, outperforming traditional out-of-home options at every
          level.
        </p>
      );
    },
  },
  {
    title: 'Precision Targeting, Real-Time Insights',
    src: '/4.jpg',
    content: () => {
      return (
        <p>
          Empty ads move through high-traffic areas and key times to reach the
          right audience. Target specific demographics by strategically choosing
          when and where your ad appears. With our AI-powered BETA 2 analytics
          dashboard, you can track performance and ROI in real time, ensuring
          your ad is always on target.
        </p>
      );
    },
  },
];

export default ExpandableCardDemo;
