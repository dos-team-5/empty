'use client';
import {
  IconBrandInstagram,
  IconBrandTwitter,
  IconBrandYoutube,
} from '@tabler/icons-react';
import { ActionIcon, Anchor, Box, Group } from '@mantine/core';
import Link from 'next/link';
import Image from 'next/image';

const links = [
  { link: '/', label: 'Advertise' },
  { link: '/drive', label: 'Drive' },
  { link: '/ad-tracker', label: 'AdTracker (beta)' },
  { link: '/contact', label: 'Contact US' },
];

const Footer = () => {
  const items = links.map((link) => (
    <Anchor
      key={link.label}
      href={link.link}
      lh={1}
      onClick={(event) => event.preventDefault()}
      size="sm"
      className="!text-text"
    >
      {link.label}
    </Anchor>
  ));

  return (
    <Box
      maw={1800}
      mx={'auto'}
      className="border-dimmed border-t-2 px-4 sm:px-8 md:px-16 lg:px-20 xl:px-24 2xl:px-32"
    >
      <div className="flex flex-col items-center justify-between gap-y-4 md:flex-row">
        <Link href="/" className="py-2 md:py-6">
          <Image
            src={'/EMPTY-Logo.png'}
            width={1000}
            height={1000}
            alt="logo"
            className="w-28"
          />
        </Link>

        <Group className="!flex-wrap !items-center !justify-center">
          {items}
        </Group>

        <Group gap="xs" justify="flex-end" wrap="nowrap">
          <ActionIcon size="lg" variant="default" radius="xl">
            <IconBrandTwitter size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" variant="default" radius="xl">
            <IconBrandYoutube size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" variant="default" radius="xl">
            <IconBrandInstagram size={18} stroke={1.5} />
          </ActionIcon>
        </Group>
      </div>
    </Box>
  );
};

export default Footer;
