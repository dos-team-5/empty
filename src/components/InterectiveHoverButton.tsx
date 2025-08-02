import { Icon } from '@/components/FileManager/lib/Icon';
import { cn } from '@/lib';
import React from 'react';

interface InteractiveHoverButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const InteractiveHoverButton = React.forwardRef<
  HTMLButtonElement,
  InteractiveHoverButtonProps
>(({ children, className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        'group relative w-auto cursor-pointer overflow-hidden rounded-lg border-2 border-[#D37EB4] px-[25px] py-2.5 text-center text-sm font-bold text-[#D37EB4]',
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-[#D37EB4] transition-all duration-450 group-hover:scale-[100.8]"></div>
        <span className="inline-block text-sm font-bold transition-all duration-450 group-hover:translate-x-12 group-hover:opacity-0">
          {children}
        </span>
      </div>
      <div className="absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 text-sm font-bold text-white opacity-0 transition-all duration-450 group-hover:-translate-x-5 group-hover:opacity-100">
        <span>{children}</span>
        <Icon icon="material-symbols:arrow-right-rounded" className="text-xl" />
      </div>
    </button>
  );
});

InteractiveHoverButton.displayName = 'InteractiveHoverButton';
