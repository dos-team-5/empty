import { Box, Flex, ScrollArea, Text, Center } from '@mantine/core';
import { SideNavItem } from '../../../types/dashboard';
import { adminSideNavData } from '../../../data/menuData';
import { MobileSideBar, SideBarWrapper } from '@/components';
import { Icon } from '@iconify/react/dist/iconify.js';

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const menus = adminSideNavData as SideNavItem[];

  return (
    <Flex bg={'#F3F3F3'} mx={'auto'} gap={20}>
      <SideBarWrapper menus={menus} />

      <ScrollArea
        pos={'relative'}
        bg={'#F3F3F3'}
        w={'100%'}
        className="h-screen px-4 pt-10 sm:px-8"
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

          <Box mr={4} className="flex items-center gap-4">
            <Box pos={'relative'} className="button-neumorphic p-1 sm:p-3">
              <Icon
                icon="clarity:notification-line"
                width={32}
                className="text-[#ED6300]"
              />
              <Center
                top={12}
                right={10}
                pos={'absolute'}
                bg={'#ED6300'}
                c={'white'}
                className="h-4 w-4 rounded-full"
              >
                <Text fz={10}>3</Text>
              </Center>
            </Box>
          </Box>
        </Flex>
        <Box className="!-z-50" mt={60}>
          {children}
        </Box>
      </ScrollArea>
    </Flex>
  );
}
