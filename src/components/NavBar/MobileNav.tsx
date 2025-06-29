'use client';
import { Box } from '@mantine/core';
import Link from 'next/link';
import PrimaryBtn from '../PrimaryBtn';

interface MobileNavProps {
  onClose: () => void;
}

const rightNavLinks = [
  { href: '/', label: 'Advertise' },
  { href: '/drive', label: 'Drive' },
  { href: '/ad-tracker', label: 'AdTracker (beta)' },
  // { href: '/contact', label: 'Contact US' },
  // { href: '#', label: <ToggleModeSwitch /> },
];

const MobileNav = ({ onClose }: MobileNavProps) => {
  return (
    <Box className="bg-default group relative flex h-[88dvh] w-full flex-col items-start justify-end p-4">
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
      <Link href={'/contact'} className="">
        <div onClick={onClose} className="mt-5">
          <PrimaryBtn
            btnText="Book A Call"
            frText="Réserver un appel"
            glow
            arrow={false}
          />
        </div>
      </Link>
    </Box>
  );
};

export default MobileNav;
