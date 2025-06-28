'use client';
import { Box, Burger, Drawer, Flex, Group } from '@mantine/core';
import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import MobileNav from './MobileNav';
import { X } from 'lucide-react';
import PrimaryBtn from '../PrimaryBtn';
import { motion } from 'motion/react';
import { LanguageToggle } from '../languageToggle';
import { usePathname } from 'next/navigation';

const rightNavLinks = [
  { href: '/', label: 'Advertise' },
  { href: '/drive', label: 'Drive' },
  { href: '/ad-tracker', label: 'AdTracker(beta)' },
  // { href: '/contact', label: 'Contact Us' },
  // { href: '#', label: <ToggleModeSwitch /> },
];

const TopNav = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 1 }}
    >
      <Group
        w={'full'}
        mx={'auto'}
        className={`bg-default/80 fixed top-0 right-0 left-0 z-50 shadow-lg backdrop-blur-md`}
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
                className="w-32 xl:w-36"
                priority
              />
            </Link>
          </Group>

          <Group className="group">
            {rightNavLinks.map((link, index) => (
              <Box key={index} onKeyDown={(e) => e.preventDefault()}>
                {typeof link.label === 'string' ? (
                  <Link
                    href={link.href}
                    className={`hover:text-primary-400 mx-1 hidden !text-sm font-medium duration-150 group-hover:opacity-50 hover:opacity-100 lg:block ${pathname === link.href ? 'text-primary-400' : 'text-text'}`}
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

          <Flex
            direction={'row'}
            className="!gap-4 lg:!ml-8 lg:!gap-6 2xl:!gap-8"
            justify=""
            align="center"
          >
            <Link className="!hidden lg:!flex" href={'/contact'}>
              <PrimaryBtn btnText="Book A Call" glow arrow={false} />
            </Link>
            <Box className="">
              <LanguageToggle />
            </Box>
            <Burger
              opened={mobileMenuOpen}
              onClick={toggleMobileMenu}
              className="lg:!hidden"
              size={'md'}
            />
          </Flex>
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
          icon: <X size={32} className="text-default-color" />,
          mr: 'sm',
          mt: 'xs',
        }}
      >
        <MobileNav onClose={toggleMobileMenu} />
      </Drawer>
    </motion.div>
  );
};

export default TopNav;
