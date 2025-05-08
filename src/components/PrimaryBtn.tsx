'use client';
import { useMediaQuery } from '@mantine/hooks';
import { ArrowRight } from 'lucide-react';

interface PrimaryBtnProps {
  btnText?: string;
  glow?: boolean;
  arrow?: boolean;
}

const PrimaryBtn = ({
  btnText = 'Primary btn',
  glow = false,
  arrow = true,
}: PrimaryBtnProps) => {
  const IsAboveMobile = useMediaQuery('(min-width: 768px)');

  return (
    <div className="group relative z-20 inline-flex shadow-xl hover:shadow-2xl cursor-pointer">
      {glow && (
        <div className="from-primary-800 to-primary-800 via-primary animate-infinite-tilt absolute -inset-px rounded-xl bg-gradient-to-r opacity-70 blur-lg"></div>
      )}

      <div
        className="font-pj bg-primary-400 hover:bg-primary-400 text-default hover:border-default-color border-primary-400 relative inline-flex items-center justify-center rounded-xl border-2 px-3 py-2 text-base font-medium transition-all duration-200 "
        role="button"
      >
        {btnText}
        {arrow && (
          <span className="relative ml-1 inline-block overflow-hidden">
            <ArrowRight
              size={16}
              className="group-hover:animate-slide-in transform stroke-[2.5]"
            />
          </span>
        )}
      </div>
    </div>
  );
};

export default PrimaryBtn;
