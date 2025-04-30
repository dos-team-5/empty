// components/ExpandableCardDemo.tsx
'use client';
import { JSX, useEffect, useId, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Box } from '@mantine/core';

interface Card {
  title: string;
  src: string;
  content: () => JSX.Element;
}

const cards: Card[] = [
  {
    title: 'Unlock the Untapped Potential of Rideshare Advertising',
    src: '/1.png',
    content: () => (
      <p>
        The rideshare industry is one of the most underutilized channels for
        advertising today. Most vehicles don’t feature any form of ad placement,
        and the few that do rely on in-car screens, rooftop displays, or
        full-vehicle wraps. Empty offers a smarter, more cost-effective
        alternative. We help you stand out and reach a broader audience for a
        fraction of the cost.
      </p>
    ),
  },
  {
    title: 'From Preview to Live in a Few Days',
    src: '/3.png',
    content: () => (
      <p>
        With Empty’s cutting-edge platform, launching your ad is as easy as
        shopping online. Preview your asset directly on a vehicle, complete
        checkout, and go live—all within a week. No sales reps. No delays. No
        hassle. This streamlined process gives Empty a distinct edge over
        traditional out-of-home advertising options.
      </p>
    ),
  },
  {
    title: 'Any sized fleet, as per your needs',
    src: '/2.png',
    content: () => (
      <p>
        At Empty, we believe powerful advertising should be accessible to
        everyone. Whether you're a small business with a tight budget or a
        global brand with massive reach, we scale to fit your goals. From one
        vehicle to an entire fleet, our platform delivers unmatched value and
        visibility, outperforming traditional out-of-home options at every
        level.
      </p>
    ),
  },
  {
    title: 'Precision Targeting, Real-Time Insights',
    src: '/4.png',
    content: () => (
      <p>
        Empty ads move through high-traffic areas and key times to reach the
        right audience. Target specific demographics by strategically choosing
        when and where your ad appears. With our AI-powered BETA 2 analytics
        dashboard, you can track performance and ROI in real time, ensuring your
        ad is always on target.
      </p>
    ),
  },
];

export function ExpandableCardDemo() {
  const [active, setActive] = useState<Card | null>(null);
  const id = useId();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActive(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <Box className="w-full p-4" style={{ fontFamily: 'var(--font-poppins)' }}>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-10 bg-black/20"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && (
          <div className="fixed inset-0 z-[100] grid place-items-center p-4">
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              className="relative flex h-full w-full max-w-[500px] flex-col rounded-3xl bg-[var(--color-default)] md:h-fit md:max-h-[90%]"
            >
              <motion.button
                key={`button-${active.title}-${id}`}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.05 } }}
                className="absolute top-2 right-2 z-50 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-[var(--color-text)]"
                onClick={() => setActive(null)}
              >
                <CloseIcon />
              </motion.button>
              <motion.div layoutId={`image-${active.title}-${id}`}>
                <img
                  width={800}
                  height={320}
                  src={active.src}
                  alt={active.title}
                  className="h-80 w-full rounded-t-lg object-contain object-top"
                />
              </motion.div>
              <div className="p-4">
                <motion.h3
                  layoutId={`title-${active.title}-${id}`}
                  className="mb-2 text-lg font-medium text-[var(--color-text)]"
                >
                  {active.title}
                </motion.h3>
                <motion.div
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="max-h-40 overflow-auto text-sm text-[var(--color-text)]/80 [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch] [scrollbar-width:none]"
                >
                  {active.content()}
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <ul className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <motion.div
            layoutId={`card-${card.title}-${id}`}
            key={card.title}
            className="flex flex-col rounded-lg bg-[var(--color-default)]"
          >
            <motion.div layoutId={`image-${card.title}-${id}`} className="h-60">
              <img
                width={100}
                height={100}
                src={card.src}
                alt={card.title}
                className="h-60 w-full rounded-t-lg object-contain object-top"
              />
            </motion.div>
            <div className="relative flex items-center justify-between p-4">
              <motion.h3
                layoutId={`title-${card.title}-${id}`}
                className="w-[90%] text-base font-medium text-[var(--color-text)]"
              >
                {card.title}
              </motion.h3>
              <motion.button
                layoutId={`button-${card.title}-${id}`}
                onClick={() => setActive(card)}
                className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-[var(--color-primary)] text-[var(--color-text)] hover:bg-[var(--color-primary)]/80"
              >
                +
              </motion.button>
            </div>
          </motion.div>
        ))}
      </ul>
    </Box>
  );
}

export function CloseIcon() {
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
      className="h-4 w-4 cursor-pointer text-[var(--color-default)]"
    >
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
}
