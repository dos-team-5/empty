'use client';
import { Box, Burger, Drawer, Flex, Group, SegmentedControl } from '@mantine/core';
import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import MobileNav from './MobileNav';
import { X } from 'lucide-react';
import PrimaryBtn from '../PrimaryBtn';
import { motion } from 'motion/react';

import { usePathname, useRouter } from 'next/navigation';
import { useLanguage } from '@/providers/languageToggleContext';
import { InteractiveHoverButton } from '../InterectiveHoverButton';

const rightNavLinks = [
  { href: '/', label: { fr: 'Annoncer', en: 'Advertise' } },
  { href: '/drive', label: { fr: 'Conduire', en: 'Drive' } },
  // {
  //   href: '/ad-tracker',
  //   label: { fr: 'AdTracker (bêta)', en: 'AdTracker (beta)' },
  // },
  // { href: '/contact', label: 'Contact Us' },
  // { href: '#', label: <ToggleModeSwitch /> },
];

const TopNav = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { language, setLanguage } = useLanguage();
  const router = useRouter();

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
                <Link
                  href={link.href}
                  className={`hover:text-primary-400 mx-1 hidden !text-sm font-medium duration-150 group-hover:opacity-50 hover:opacity-100 lg:block ${pathname === link.href ? 'text-primary-400' : 'text-text'}`}
                >
                  {link.label[language]}
                </Link>
              </Box>
            ))}
          </Group>

          <Flex
            direction={'row'}
            className="!gap-4 lg:!ml-8 lg:!gap-6 2xl:!gap-8"
            justify=""
            align="center"
          >
            {/* <Link
              className="hidden lg:block"
              href="https://dashboard.emptyad.com/"
            >
              <Button
                gradient={{ from: '#D482B6', to: '#CB6AA7', deg: 90 }}
                size="md"
                variant="gradient"
              >
                Login
              </Button>
            </Link> */}
             {/* <Link
              className="hidden lg:block"
              href="https://dashboard.emptyad.com/"
            >
              <InteractiveHoverButton>Login</InteractiveHoverButton>
            </Link> */}
            <Link
              className="hidden lg:block"
              href="https://dashboard.emptyad.com/"
            >
              <InteractiveHoverButton>Login</InteractiveHoverButton>
            </Link>
            <Link className="hidden lg:!flex" href={'/contact'}>
              <PrimaryBtn
                btnText="Book A Call"
                frText="Réserver un appel"
                glow
                arrow={false}
              />
            </Link>
            <Box>
              <Box className="rounded-md border border-[#D381B5]">
                <SegmentedControl
                  withItemsBorders={false}
                  color="#D381B5"
                  bg="white"
                  value={language}
                  onChange={(value) => {
                    if (value === 'en' || value === 'fr') {
                      setLanguage(value);
                      router.refresh();
                    }
                  }}
                  data={[
                    { label: 'En', value: 'en' },
                    { label: 'Fr', value: 'fr' },
                  ]}
                />
              </Box>
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
