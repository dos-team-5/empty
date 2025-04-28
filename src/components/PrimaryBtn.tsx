'use client';
import { Button } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { ArrowRight } from 'lucide-react';

interface PrimaryBtnProps {
  btnText?: string;
  iconColor?: string;
}

const PrimaryBtn = ({
  btnText = 'Primary btn',
  iconColor = 'var(--color-primary)',
}: PrimaryBtnProps) => {
  const IsAboveMobile = useMediaQuery('(min-width: 768px)');

  return (
    <Button
      radius={0}
      rightSection={
        <span className="relative inline-block overflow-hidden">
          <ArrowRight
            size={16}
            className="group-hover:animate-slide-in transform stroke-[2.5]"
            style={{ color: iconColor }}
          />
        </span>
      }
      variant="outline"
      size={IsAboveMobile ? 'lg' : 'md'}
      className="group !border-dimmed hover:!border-dimmed/30 !text-dimmed !w-fit !border-2 !font-medium duration-150 ease-in-out hover:!bg-transparent"
    >
      {btnText}
    </Button>
  );
};

export default PrimaryBtn;
