'use client';

import { useEffect, useId, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useClickOutside } from '@mantine/hooks';
import { PlusIcon } from 'lucide-react';

export function ExpandableCardDemo() {
  const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(
    null
  );
  const id = useId();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setActive(false);
      }
    }

    if (active && typeof active === 'object') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [active]);

  const ref = useClickOutside(() => setActive(false));

  return (
    <>
      <AnimatePresence>
        {active && typeof active === 'object' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-10 h-full w-full bg-black/20"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === 'object' ? (
          <div className="fixed inset-0 z-[100] grid place-items-center">
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="relative flex h-full w-full max-w-[500px] flex-col overflow-hidden bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] sm:rounded-3xl md:h-fit md:max-h-[90%]"
            >
              {' '}
              <motion.button
                key={`button-${active.title}-${id}`}
                layout
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                exit={{
                  opacity: 0,
                  transition: {
                    duration: 0.05,
                  },
                }}
                className="absolute top-2 right-2 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-white"
                onClick={() => setActive(null)}
              >
                <CloseIcon />
              </motion.button>
              <motion.div layoutId={`image-${active.title}-${id}`}>
                <img
                  width={200}
                  height={200}
                  src={active.src}
                  alt={active.title}
                  className="h-80 w-full object-contain object-center sm:rounded-tl-lg sm:rounded-tr-lg lg:h-80"
                />
              </motion.div>
              <div>
                <div className="flex items-start justify-between p-4">
                  <div className="">
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="text-base font-medium text-neutral-700 dark:text-neutral-200"
                    >
                      {active.title}
                    </motion.h3>
                  </div>
                </div>
                <div className="relative px-4 pt-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex h-40 flex-col items-start gap-4 overflow-auto pb-10 text-xs text-neutral-600 [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch] [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] md:h-fit md:text-sm lg:text-base dark:text-neutral-400"
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
      <ul className="grid w-full grid-cols-1 items-start gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card, index) => (
          <motion.div
            layoutId={`card-${card.title}-${id}`}
            key={card.title}
            onClick={() => setActive(card)}
            className="flex transform cursor-pointer flex-col rounded-xl bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] p-4 duration-150 hover:contrast-95"
          >
            <div className="flex w-full flex-col gap-4">
              <motion.div layoutId={`image-${card.title}-${id}`}>
                <img
                  width={100}
                  height={100}
                  src={card.src}
                  alt={card.title}
                  className="h-60 w-full rounded-lg object-contain object-top"
                />
              </motion.div>
              <div className="relative flex h-16 items-center justify-between px-2">
                <motion.h3
                  layoutId={`title-${card.title}-${id}`}
                  className="w-[85%] text-left text-lg font-medium text-neutral-800 dark:text-neutral-200"
                >
                  {card.title}
                </motion.h3>
                <div className="bg-primary rounded-full">
                  <PlusIcon />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </ul>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

const cards = [
  {
    title: 'Unlock the Untapped Potential of Rideshare Advertising',
    src: '/1.png',

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
    src: '/2.png',

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
    src: '/3.png',

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
    src: '/4.png',

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
