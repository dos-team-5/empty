'use client';
import { Box, Burger, Drawer, Group } from '@mantine/core';
import Link from 'next/link';
import ToggleModeSwitch from '../toggleModeSwitch';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import MobileNav from './MobileNav';

const rightNavLinks = [
  { href: '/', label: 'Advertise' },
  { href: '/drive', label: 'Drive' },
  { href: '/ad-tracker', label: 'AdTracker (beta)' },
  { href: '/contact', label: 'Contact US' },
  { href: '#', label: <ToggleModeSwitch /> },
];

const TopNav = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false); // Hide on scroll down
      } else {
        setIsVisible(true); // Show on scroll up
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <>
      <Group
        w={'full'}
        mx={'auto'}
        className={`bg-default fixed top-0 right-0 left-0 z-50 transition-transform duration-300 ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <Group
          maw={1800}
          mx={'auto'}
          className="w-full px-4 sm:px-8 md:px-16 lg:px-20 xl:px-24 2xl:px-32"
        >
          <Group>
            <Link href="/" className="py-6">
              <Image
                src={'/EMPTY-Logo.png'}
                width={1000}
                height={1000}
                alt="logo"
                className="w-28"
              />
            </Link>
          </Group>

          <Group className="group ml-auto">
            {rightNavLinks.map((link, index) => (
              <Box key={index}>
                {typeof link.label === 'string' ? (
                  <Link
                    href={link.href}
                    className="text-text mx-1 hidden text-sm font-medium transition-opacity group-hover:opacity-50 hover:opacity-100 md:block"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <div className="text-text mx-1 hidden text-sm font-medium transition-opacity group-hover:opacity-50 hover:opacity-100 md:block">
                    {link.label}
                  </div>
                )}
              </Box>
            ))}
            <Burger
              opened={mobileMenuOpen}
              onClick={toggleMobileMenu}
              className="md:hidden"
              size={'sm'}
            />
          </Group>
        </Group>
      </Group>

      {/* mobile menu */}
      <Drawer
        opened={mobileMenuOpen}
        onClose={toggleMobileMenu}
        size={'100%'}
        position="right"
        withCloseButton={true}
      >
        <MobileNav onClose={toggleMobileMenu} />
      </Drawer>
    </>
  );
};

export default TopNav;
