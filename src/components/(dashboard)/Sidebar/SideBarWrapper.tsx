'use client';

import { Box, Center } from '@mantine/core';
import { SideNavItem } from '../../../types/dashboard';
import { UserSideNav } from './UserSideNav';
import Link from 'next/link';
import Image from 'next/image';
import Logout from '../Logout';

type SideBarWrapperProps = {
  readonly menus?: SideNavItem[];
};

const SideBarWrapper = ({ menus }: SideBarWrapperProps) => {
  return (
    <Box
      h={'100vh'}
      w={{ base: 200, lg: 290 }}
      top={0}
      pos={'sticky'}
      className="hidden lg:block"
    >
      <Center mt={40} mb={52}>
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
      </Center>
      <UserSideNav menus={menus} />
      <Center pos={'absolute'} bottom={20} w={'100%'}>
        <Logout />
      </Center>
    </Box>
  );
};

export default SideBarWrapper;
