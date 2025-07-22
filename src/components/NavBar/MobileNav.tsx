'use client';
import { Box, Button, Flex } from '@mantine/core';
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

      <Flex align={'center'} gap={8}>
        <Link className="block lg:hidden" href={'/login'}>
          <Button
            gradient={{ from: '#D482B6', to: '#CB6AA7', deg: 90 }}
            size="sm"
            variant="gradient"
          >
            Login
          </Button>
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
