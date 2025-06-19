'use client';
import { Box, Burger, Drawer } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { SideNavItem } from '../../../types/dashboard';
import { UserSideNav } from './UserSideNav';

type MobileSideBarProps = {
  readonly menus?: SideNavItem[];
};

const MobileSideBar = ({ menus }: MobileSideBarProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <Box>
      <Burger opened={false} onClick={open} size="sm" mr="md" hiddenFrom="sm" mt='md' />
      <Drawer
        radius="md"
        opened={opened}
        onClose={close}
        title="Authentication"
      >
        <UserSideNav menus={menus} onClose={close} />
      </Drawer>
    </Box>
  );
};

export default MobileSideBar;
