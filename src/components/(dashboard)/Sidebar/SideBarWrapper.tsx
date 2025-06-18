'use client';

import { Box, Center } from '@mantine/core';
import { SideNavItem } from '../../../types/dashboard';
import { UserSideNav } from './UserSideNav';
import Link from 'next/link';
import Image from 'next/image';

type SideBarWrapperProps = {
  readonly menus?: SideNavItem[];
};

const SideBarWrapper = ({ menus }: SideBarWrapperProps) => {
  return (
    <Box w={290} pos={'relative'}>
      <Center mt={40} mb={52}>
        <Link href="/">
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
    </Box>
  );
};

export default SideBarWrapper;
