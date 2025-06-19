'use client';
import { Burger, Drawer, Group } from '@mantine/core';
import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { motion } from 'motion/react';
import { UserSideNav } from './UserSideNav';
import { SideNavItem } from '@/types/dashboard';

type SidebarTopNavProps = {
  readonly menus?: SideNavItem[];
};

const SidebarTopNav = ({ menus }: SidebarTopNavProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
          icon: <X size={32} className="text-default-color" />,
          mr: 'sm',
          mt: 'xs',
        }}
      >
        <UserSideNav onClose={toggleMobileMenu} menus={menus} />
      </Drawer>
    </motion.div>
  );
};

export default SidebarTopNav;
