import { Box, Flex, ScrollArea } from '@mantine/core';
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
    <Flex bg={'#FFF0FA'} mx={'auto'}>
      <SideBarWrapper menus={menus} />

      <ScrollArea
        px={32}
        py={40}
        bg={'white'}
        pos={'relative'}
        w={'100%'}
        className="h-screen"
      >
        <Flex
          style={{ zIndex: 100 }}
          top={20}
          right={44}
          pos={'fixed'}
          w={'100%'}
          align={'center'}
          justify={{ base: 'space-between', md: 'flex-end' }}
          gap={20}
        >
          <MobileSideBar menus={menus} />
        </Flex>
        <Box>{children}</Box>
      </ScrollArea>
    </Flex>
  );
}
