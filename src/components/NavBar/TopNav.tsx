'use client';
import { Box, Burger, Button, Drawer, Group } from '@mantine/core';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import MobileNav from './MobileNav';
import { useMediaQuery } from '@mantine/hooks';
import { X } from 'lucide-react';

const rightNavLinks = [
  { href: '/', label: 'Advertise' },
  { href: '/drive', label: 'Drive' },
  { href: '/ad-tracker', label: 'AdTracker (beta)' },
  { href: '/contact', label: 'Contact US' },
  // { href: '#', label: <ToggleModeSwitch /> },
];

const TopNav = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const IsAboveMobile = useMediaQuery('(min-width: 1280px)');

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  useEffect(() => {
    document.onkeydown = function () {
      return false;
    };
  }, []);

  return (
    <>
      <Group
        w={'full'}
        mx={'auto'}
        className={`bg-default fixed top-0 right-0 left-0 z-50`}
      >
        <Group
          maw={1800}
          mx={'auto'}
          className="w-full !justify-between px-4 sm:px-8 md:px-16 lg:px-20 xl:px-24 2xl:px-32"
        >
          <Group>
            <Link href="/" className="py-6">
              <Image
                src={'/EMPTY-Logo.png'}
                width={1000}
                height={1000}
                alt="logo"
                className="w-40 xl:w-48"
              />
            </Link>
          </Group>

          <Group className="group">
            {rightNavLinks.map((link, index) => (
              <Box key={index} onKeyDown={(e) => e.preventDefault()}>
                {typeof link.label === 'string' ? (
                  <Link
                    href={link.href}
                    className="text-text mx-1 hidden text-lg font-medium transition-opacity group-hover:opacity-50 hover:opacity-100 lg:block xl:text-xl"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <div className="text-text mx-1 hidden text-lg font-medium transition-opacity group-hover:opacity-50 hover:opacity-100 lg:block xl:text-xl">
                    {link.label}
                  </div>
                )}
              </Box>
            ))}
          </Group>
          <Button
            className="!hidden lg:!block"
            size={IsAboveMobile ? 'lg' : 'md'}
            radius={15}
          >
            Book A Call
          </Button>
          <Burger
            opened={mobileMenuOpen}
            onClick={toggleMobileMenu}
            className="lg:hidden"
            size={'md'}
          />
        </Group>
      </Group>

      {/* mobile menu */}
      <Drawer
        opened={mobileMenuOpen}
        onClose={toggleMobileMenu}
        size={'100%'}
        position="right"
        withCloseButton={true}
        closeButtonProps={{
          icon: <X size={32} color="white"  />,
          mr:'xl'
        }}
      >
        <MobileNav onClose={toggleMobileMenu} />
      </Drawer>
    </>
  );
};

export default TopNav;
