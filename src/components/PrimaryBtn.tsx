'use client';
import { Button } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { ArrowRight } from 'lucide-react';

interface PrimaryBtnProps {
  btnText?: string;
}

const PrimaryBtn = ({ btnText = 'Primary btn' }: PrimaryBtnProps) => {
  const IsAboveMobile = useMediaQuery('(min-width: 768px)');

  return (
    <Button
      radius={15}
      rightSection={
        <span className="relative inline-block overflow-hidden">
          <ArrowRight
            size={16}
            className="group-hover:animate-slide-in transform stroke-[2.5]"
          />
        </span>
      }
      variant="filled"
      size={IsAboveMobile ? 'lg' : 'md'}
      className="group !w-fit !border-2 !font-medium duration-150 ease-in-out"
    >
      {btnText}
    </Button>
  );
};

export default PrimaryBtn;
