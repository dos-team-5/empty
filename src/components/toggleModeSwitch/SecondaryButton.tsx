'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface SecondaryButtonProps {
  btnText?: string;
  glow?: boolean;
  glowOnHover?: boolean;
  arrow?: boolean;
  type?: string;
  customeSize?: boolean;
}

const SecondaryButton = ({
  type = 'outline',
  btnText = 'Primary btn',
  glow = false,
  glowOnHover = false,
  arrow = true,
  customeSize = false,
}: SecondaryButtonProps) => {
  const [btnHovered, setBtnHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setBtnHovered(true)}
      onMouseLeave={() => setBtnHovered(false)}
      className="group relative z-20 inline-flex cursor-pointer"
    >
      {glow && (
        <div className="from-primary-900 to-primary-800 via-primary animate-infinite-tilt absolute -inset-px rounded-xl bg-gradient-to-r opacity-70 blur-lg"></div>
      )}

      <AnimatePresence>
        {glowOnHover && btnHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            exit={{ opacity: 0 }}
            className="from-primary-900 to-primary-800 via-primary animate-infinite-tilt absolute -inset-px rounded-xl bg-gradient-to-r opacity-0 blur-lg transition-opacity duration-200 group-hover:opacity-70"
          />
        )}
      </AnimatePresence>

      <div
        className={`hover:bg-primary-400 text-primary-500 border-primary-400 relative flex items-center justify-center rounded-lg border-2 bg-transparent px-[25px] py-3 text-center text-sm font-medium capitalize transition-all duration-200 hover:text-white ${customeSize ? 'w-48' : ''}`}
        role="button"
      >
        {btnText}
        {arrow && (
          <span className="relative ml-1 inline-block overflow-hidden">
            {/* <ArrowRight
              size={16}
              className="group-hover:animate-slide-in transform stroke-[2.5]"
            /> */}
          </span>
        )}
      </div>
    </div>
  );
};

export default SecondaryButton;
