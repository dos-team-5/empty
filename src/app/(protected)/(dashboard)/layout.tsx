import { Box, Flex } from '@mantine/core';
import { SideNavItem } from '../../../types/dashboard';
import { adminSideNavData } from '../../../data/menuData';
import { MobileSideBar, SideBarWrapper } from '@/components';

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const menus = adminSideNavData as SideNavItem[];

  return (
    <Flex bg={'#FFF0FA'}>
      {/* Sidebar (non-scrollable) */}
      <SideBarWrapper menus={menus} />

      {/* Scrollable main content */}
      <Box className="!overflow-y-auto" px={32} bg="white" w="100%" h={'100vh'}>
        <Flex
          style={{ zIndex: 100 }}
          top={20}
          right={44}
          w="100%"
          align="center"
          justify={{ base: 'space-between', md: 'flex-end' }}
          gap={20}
        >
          <MobileSideBar menus={menus} />
        </Flex>

        <Box py={40}>{children}</Box>
      </Box>
    </Flex>
  );
}
