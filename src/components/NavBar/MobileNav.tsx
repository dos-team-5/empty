'use client';
import { Box } from '@mantine/core';
import Link from 'next/link';
import ToggleModeSwitch from '../toggleModeSwitch'; // Adjust path

interface MobileNavProps {
  onClose: () => void;
}

const rightNavLinks = [
  { href: '/', label: 'Advertise' },
  { href: '/drive', label: 'Drive' },
  { href: '/ad-tracker', label: 'AdTracker (beta)' },
  { href: '/contact', label: 'Contact US' },
  { href: '#', label: <ToggleModeSwitch /> },
];

const MobileNav = ({ onClose }: MobileNavProps) => {
  return (
    <Box className="bg-default group flex h-[88dvh] w-full flex-col items-end justify-end p-4">
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
            <Box className='!text-3xl'>{link.label}</Box>
          )}
        </div>
      ))}
    </Box>
  );
};

export default MobileNav;
