'use client';
import React, { useState, useEffect } from 'react';
import {
  Group,
  Burger,
  Paper,
  UnstyledButton,
  Box,
  Drawer,
} from '@mantine/core';
import NavItem from './NavItem';
import NavDropdown from './NavDropdown';
import { navigation } from '@/data/navigation';
import Link from 'next/link';
import MobileNav from './MobileNav';
import Image from 'next/image';
import ToggleModeSwitch from '../toggleModeSwitch';

const Navbar2: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleNavItemHover = (label: string) => {
    const navItem = navigation.find((item) => item.label === label);

    if ((navItem?.isDropdown && navItem?.dropdown) || label === 'Contact') {
      setActiveDropdown(label);
      setIsDropdownOpen(true);
    }
  };

  const handleDropdownClose = () => {
    setIsDropdownOpen(false);
    setActiveDropdown(null);
  };

  const activeItem = navigation.find((item) => item.label === activeDropdown);

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
      <Paper
        component="header"
        maw={1800}
        mx={'auto'}
        className={`fixed top-0 right-0 left-0 z-50 w-full px-4 transition-transform duration-300 sm:px-8 md:px-16 lg:px-20 xl:px-24 2xl:px-32 ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <Box>
          <Group justify="space-between" h={{ base: 64, md: 80 }}>
            <UnstyledButton component={Link} href={'/'} size="xl">
              <Image
                src={'/EMPTY-Logo.png'}
                width={1000}
                height={1000}
                alt="logo"
                className="w-28"
              />
            </UnstyledButton>

            <Group className="group !h-fit" visibleFrom="md">
              {navigation.map((item) => (
                <NavItem
                  key={item.label}
                  item={item}
                  isActive={activeDropdown === item.label}
                  onHover={handleNavItemHover}
                  onClick={() => {
                    if (activeDropdown === item.label) {
                      setIsDropdownOpen(false);
                      setActiveDropdown(null);
                    } else {
                      setActiveDropdown(item.label);
                      setIsDropdownOpen(true);
                    }
                  }}
                />
              ))}
              <ToggleModeSwitch />
            </Group>

            <Burger
              opened={mobileMenuOpen}
              onClick={toggleMobileMenu}
              hiddenFrom="md"
            />
          </Group>
        </Box>
      </Paper>

      <NavDropdown
        isOpen={isDropdownOpen}
        sections={activeItem?.dropdown}
        onMouseLeave={handleDropdownClose}
        isEmpty={
          activeDropdown === 'Contact Us' ||
          activeDropdown === 'AdTracker (beta)'
        }
      />

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

export default Navbar2;
