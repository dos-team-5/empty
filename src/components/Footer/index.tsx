'use client';
import { Anchor, Box, Group, Stack, Text } from '@mantine/core';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/providers/languageToggleContext';

const links = [
  { href: '/', label: { fr: 'Annoncer', en: 'Advertise' } },
  { href: '/drive', label: { fr: 'Conduire', en: 'Drive' } },
  {
    href: '/ad-tracker',
    label: { fr: 'AdTracker (bêta)', en: 'AdTracker (beta)' },
  },
  // { href: '/contact', label: 'Contact Us' },
  // { href: '#', label: <ToggleModeSwitch /> },
];

const Footer = () => {
  const { language } = useLanguage();
  const items = links.map((link) => (
    <Anchor
      component={Link}
      key={link.label[language]}
      href={link.href}
      lh={1}
      // onClick={(event) => event.preventDefault()}
      size="sm"
      className="!text-text"
    >
      {link.label[language]}
    </Anchor>
  ));

  return (
    <Box
      // maw={1800}
      mx={'auto'}
      mb={50}
      className="px-4 sm:px-8 md:px-16 lg:px-20 xl:px-24 2xl:px-32"
    >
      {/* <div className="flex flex-col items-center justify-between gap-y-4 md:flex-row"> */}
      <Stack align="center">
        <Link
          href="/"
          className="border-b-1 border-[#FF83D5] px-8 py-2 md:py-6"
        >
          <Image
            src={'/EMPTY-Logo.png'}
            width={200}
            height={200}
            alt="logo"
            className="w-28"
          />
        </Link>
        <Group className="!flex-wrap !items-center !justify-center border-b-1 border-[#FF83D5] px-8 pb-4">
          {items}
        </Group>
        {/* <Group gap="lg" justify="flex-end" wrap="nowrap">
          <ActionIcon
            className="!bg-[#FF83D5]"
            size="lg"
            variant="filed"
            radius="xl"
          >
            <IconBrandX size={28} stroke={1.5} />
          </ActionIcon>

          <ActionIcon
            className="!bg-[#FF83D5]"
            size="lg"
            variant="filled"
            radius="xl"
          >
            <IconBrandWhatsapp size={28} stroke={2} />
          </ActionIcon>

          <ActionIcon
            className="!bg-[#FF83D5]"
            size="lg"
            variant="filled"
            radius="xl"
          >
            <IconBrandInstagram size={28} stroke={1.5} />
          </ActionIcon>

          <ActionIcon
            className="!bg-[#FF83D5]"
            size="lg"
            variant="filled"
            radius="xl"
          >
            <IconPhoneFilled size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon
            className="!bg-[#FF83D5]"
            size="lg"
            variant="filled"
            radius="xl"
          >
            <IconMailFilled size={18} stroke={1.5} />
          </ActionIcon>
        </Group> */}
        <Text
          component="p"
          c="dimmed"
          size="xs"
          className="text-centerStep Center"
        >
          {language === 'fr'
            ? '© 2025 Empty Advertising | Tous droits réservés | Développé par '
            : '© 2025 Empty Advertising | All Rights Reserved | Developed by'}
          <Link
            className="hover:text-primary pl-1"
            target="_blank"
            href={'https://www.devsonsteroids.com/'}
          >
            DevsOnSteroids
          </Link>
        </Text>
      </Stack>

      {/* </div> */}
    </Box>
  );
};

export default Footer;
