'use client';
import { Box, Flex } from '@mantine/core';
import Link from 'next/link';
import PrimaryBtn from '../PrimaryBtn';
import { InteractiveHoverButton } from '../InterectiveHoverButton';

interface MobileNavProps {
  onClose: () => void;
}

const rightNavLinks = [
  { href: '/', label: 'Advertise' },
  { href: '/drive', label: 'Drive' },
  // { href: '/ad-tracker', label: 'AdTracker (beta)' },
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
       

      <Flex align={'center'} gap={8}>
        <Link
              href="https://dashboard.emptyad.com/"
            >
              <InteractiveHoverButton>Login</InteractiveHoverButton>
            </Link>
        <Link href={'/contact'} className="">
          <div onClick={onClose}>
            <PrimaryBtn
              btnText="Book A Call"
              frText="Réserver un appel"
              glow
              arrow={false}
            />
          </div>
        </Link>
      </Flex>
      
    </Box>
  );
};

export default MobileNav;
