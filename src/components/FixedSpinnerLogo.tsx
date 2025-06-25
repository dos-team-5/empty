'use client';
import { ActionIcon, Image, Stack } from '@mantine/core';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const FixedSpinnerLogo = () => {
  const pathname = usePathname();

  if (pathname === '/scan&spin-attributation') {
    return null;
  }

  return (
    <ActionIcon
      component={Link}
      href="/attribution"
      variant="transparent"
      className="group !fixed right-1 bottom-2 z-50 transition-all duration-300 hover:scale-125 md:right-4 md:bottom-4"
      size="2xl"
    >
      <Stack align="center" gap={0}>
        <svg width="100" height="32" viewBox="0 0 100 20" className="fill-none">
          <path
            id="sadPath"
            d="M 10 40 Q 50 0 90 40" // Downward curve for sad face
            stroke="none"
            fill="none"
          />
          <text
            className="text-primary-800 fill-current text-[8px]"
            textAnchor="middle"
          >
            <textPath href="#sadPath" startOffset="50%">
              Scan & Spin
            </textPath>
          </text>
        </svg>
        <Image
          title="Spinner logo"
          alt="Spinner logo"
          radius="100%"
          src="/spinLogo.png"
          w={40}
          h={40}
          fallbackSrc="/spinnerLogo.svg"
          className="transition-transform duration-500 group-hover:animate-[spin_0.7s_linear_infinite]"
        />
        <svg width="100" height="32" viewBox="0 0 100 20" className="fill-none">
          <path
            id="smilePath"
            // d="M 10 20 Q 50 0 90 20" // Upward curve for smiley face
            d="M 10 -10 Q 50 20 90 -10"
            stroke="none"
            fill="none"
          />
          <text
            className="text-primary-800 fill-current text-[8px]"
            textAnchor="middle"
          >
            <textPath href="#smilePath" startOffset="50%">
              How it works
            </textPath>
          </text>
        </svg>
      </Stack>
    </ActionIcon>
  );
};

export default FixedSpinnerLogo;
