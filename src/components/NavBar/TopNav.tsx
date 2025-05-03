'use client';
import { Box, Burger, Drawer, Group } from '@mantine/core';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import MobileNav from './MobileNav';
import { X } from 'lucide-react';
import PrimaryBtn from '../PrimaryBtn';
import { motion } from 'motion/react';

const rightNavLinks = [
  { href: '/', label: 'Advertise' },
  { href: '/drive', label: 'Drive' },
  { href: '/ad-tracker', label: 'AdTracker(beta)' },
  { href: '/contact', label: 'Contact Us' },
  // { href: '#', label: <ToggleModeSwitch /> },
];

const TopNav = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  useEffect(() => {
    document.onkeydown = function () {
      return false;
    };
  }, []);

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 1 }}
    >
      <Group
        w={'full'}
        mx={'auto'}
        className={`bg-default/70 fixed top-0 right-0 left-0 z-50 shadow-lg backdrop-blur-md`}
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
              />
            </Link>
          </Group>

          <Group className="group">
            {rightNavLinks.map((link, index) => (
              <Box key={index} onKeyDown={(e) => e.preventDefault()}>
                {typeof link.label === 'string' ? (
                  <Link
                    href={link.href}
                    className="text-text hover:text-primary-400 mx-1 hidden !text-base font-medium duration-150 group-hover:opacity-50 hover:opacity-100 lg:block"
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
            <Link href={'/contact'}>
              {/* <Button
                className="!text-primary-400 hover:!bg-primary !hidden !bg-white lg:!block"
                size={IsAboveMobile ? 'lg' : 'md'}
                radius={15}
              >
                Book A Call
              </Button> */}
              {/* <ShimmerButton
                background="#ffffff"
                className="border-primary-400 shadow-lg"
                borderRadius="15px"
              >
                <span className="text-center text-sm leading-none font-medium tracking-tight whitespace-pre-wrap text-black lg:text-lg">
                  Book A Call
                </span>
              </ShimmerButton> */}
              {/* <div className="group relative z-50 inline-flex">
                <div className="from-primary-800 to-primary-800 via-primary animate-infinite-tilt absolute -inset-px rounded-xl bg-gradient-to-r opacity-70 blur-lg"></div>
                <div
                  className="font-pj text-text border-default-color bg-default hover:bg-primary-400 hover:text-default hover:border-default relative inline-flex items-center justify-center rounded-xl border-2 px-3 py-2 text-base font-medium transition-all duration-200"
                  role="button"
                >
                  Book A Call
                </div>
              </div> */}
              <PrimaryBtn btnText="Book A Call" glow arrow={false} />
            </Link>
          </Group>

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
          icon: <X size={32} color="white" />,
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
