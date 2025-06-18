'use client';

import { Box, Image } from '@mantine/core';
import { SideNavItem } from '../../../types/dashboard';
import { UserSideNav } from './UserSideNav';

type SideBarWrapperProps = {
  readonly menus?: SideNavItem[];
};

const SideBarWrapper = ({ menus }: SideBarWrapperProps) => {
  return (
    <Box className="sidebar-shadow mt-2 ml-2 hidden h-[98dvh] space-y-7 rounded-tl-[20px] rounded-tr-[12px] rounded-br-[12px] rounded-bl-[20px] lg:block">
      <Box mx={'auto'} w={148} h={20} py={16}>
        <Image alt="logo" src="/logo.png" w={40} h={40} />
      </Box>
      <UserSideNav menus={menus} />
    </Box>
  );
};

export default SideBarWrapper;
