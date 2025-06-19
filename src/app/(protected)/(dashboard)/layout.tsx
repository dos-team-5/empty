import { Box, Flex, ScrollArea } from '@mantine/core';
import { SideNavItem } from '../../../types/dashboard';
import { adminSideNavData } from '../../../data/menuData';
import { SideBarWrapper } from '@/components';
import SidebarTopNav from '@/components/(dashboard)/Sidebar/SidebarTopNav';

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const menus = adminSideNavData as SideNavItem[];

  return (
    <Flex pos={'relative'} bg={'#FFF0FA'}>
      {/* Sidebar (non-scrollable) */}
      <SideBarWrapper menus={menus} />

      {/* Scrollable main content */}
      <ScrollArea px={{ base: 0, md: 32 }} bg="white" w="100%">
        <SidebarTopNav menus={menus} />
        <Box py={40}>{children}</Box>
      </ScrollArea>
    </Flex>
  );
}
