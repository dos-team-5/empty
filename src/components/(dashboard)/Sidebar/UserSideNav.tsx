'use client';

import { Box, Flex, Group, ScrollArea, Text } from '@mantine/core';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { SideNavItem } from '../../../types/dashboard';
import { Icon } from '@iconify/react/dist/iconify.js';

type UserSidenavProps = {
  readonly menus?: SideNavItem[];
  readonly onClose?: () => void;
};

export function UserSideNav({ menus, onClose }: UserSidenavProps) {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<{ [key: number]: boolean }>({});

  const onToggle = (id: number) => {
    setOpenMenus((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const linkClickHandler = () => {
    if (onClose) {
      onClose();
    }
    setOpenMenus({});
  };

  // Auto open parent if current route matches any child
  useEffect(() => {
    menus?.forEach((item) => {
      if (item.children.length > 0) {
        const hasActiveChild = item.children.some(
          (child) => child.path === pathname
        );
        if (hasActiveChild) {
          setOpenMenus((prev) => ({
            ...prev,
            [item.id]: true,
          }));
        }
      }
    });
  }, [pathname, menus]);

  const sideNavLinks = menus?.map((item) => {
    const isActive = pathname === item.path;

    return (
      <Box key={item.id}>
        {item.children.length > 0 ? (
          <Box className={`${openMenus[item.id] ? 'nav-neumorphic' : ''}`}>
            <Box
              onClick={() => onToggle(item.id)}
              className={`flex w-full cursor-pointer items-center justify-between px-4 py-5 transition hover:bg-neutral-200 ${openMenus[item.id] ? 'mb-0 rounded-t-xl' : 'mb-3 rounded-xl'} `}
            >
              <Group>
                <Icon color="#ee7b1f" icon={item.icon} width={20} />
                <span className="text-[14px] font-medium">{item.label}</span>
              </Group>
              <Icon
                icon={
                  openMenus[item.id]
                    ? 'tabler:chevron-up'
                    : 'tabler:chevron-down'
                }
                width={18}
              />
            </Box>

            <AnimatePresence>
              {openMenus[item.id] && item.children.length > 0 && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="mb-3 space-y-1 overflow-hidden rounded-b-xl py-2"
                >
                  {item.children.map((child) => {
                    const isActive = child.path === pathname;

                    return (
                      <Flex
                        key={child.id}
                        direction="row"
                        align="center"
                        className={`ml-11 rounded-sm px-2 py-1 hover:text-[#1941BA] ${isActive ? 'text-[#1941BA]' : ''}`}
                      >
                        <Icon icon="ph:dot-outline-thin" width={20} />
                        {child?.path && (
                          <Link
                            onClick={onClose}
                            href={child.path}
                            className={`ml-2 flex items-center rounded-lg text-[14px] transition ${isActive ? 'text-[#1941BA]' : ''}`}
                          >
                            {child.label}
                          </Link>
                        )}
                      </Flex>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </Box>
        ) : (
          <Link
            onClick={linkClickHandler}
            href={item.path ?? '#'}
            className={`mb-3 flex cursor-pointer items-center px-[55px] py-3 transition hover:bg-white ${
              isActive ? 'bg-white' : ''
            } `}
          >
            <Group justify="center">
              <Icon color="#ee7b1f" icon={item.icon} width={20} />
              <span className="text-[14px] font-medium">{item.label}</span>
            </Group>
          </Link>
        )}
      </Box>
    );
  });

  return (
    <Box component="nav">
      <ScrollArea w="100%" h="100%" px={16}>
        {sideNavLinks}
      </ScrollArea>
      <Flex
        align={'center'}
        justify={'center'}
        gap={12}
        className=""
        pos={'absolute'}
        w={'100%'}
        bottom={40}
        component="button"
      >
        <Text>Logout</Text>
        <Icon icon="ic:round-logout" width={20} height={20} />
      </Flex>
    </Box>
  );
}
