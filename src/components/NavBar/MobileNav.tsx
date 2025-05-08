'use client';
import { Box, Button } from '@mantine/core';
import Link from 'next/link';

interface MobileNavProps {
  onClose: () => void;
}

const rightNavLinks = [
  { href: '/', label: 'Advertise' },
  { href: '/drive', label: 'Drive' },
  { href: '/ad-tracker', label: 'AdTracker (beta)' },
  { href: '/contact', label: 'Contact US' },
  // { href: '#', label: <ToggleModeSwitch /> },
];

const MobileNav = ({ onClose }: MobileNavProps) => {
  return (
    <Box className="bg-default group flex h-[88dvh] w-full flex-col items-start justify-end p-4">
      {rightNavLinks.map((link, index) => (
        <div key={index} className="text-text relative w-full py-3 text-start">
          {typeof link.label === 'string' ? (
            <Link
              href={link.href}
              onClick={onClose}
              className="text-text text-3xl font-medium transition-opacity group-hover:opacity-50 hover:opacity-150"
            >
              {link.label}
            </Link>
          ) : (
            <Box className="!text-3xl">{link.label}</Box>
          )}
        </div>
      ))}
      <Link href={'/contact'}>
        <Button
          className="!bg-primary-400 hover:!bg-primary"
          size={'md'}
          mt={'sm'}
          radius={15}
          onClick={onClose}
        >
          Book A Call
        </Button>
      </Link>
    </Box>
  );
};

export default MobileNav;
