'use client';

import { useLanguage } from '@/providers/languageToggleContext';
import { rem, Select } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconWorld } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

interface LanguageToggle {
  readonly onClick?: () => void;
}

export function LanguageToggle({ onClick }: LanguageToggle) {
  const { language, setLanguage } = useLanguage();
  const router = useRouter();

  const md = useMediaQuery('(min-width: 768px)');

  const languageOptions = [
    { value: 'en', label: 'En' },
    { value: 'fr', label: 'Fr' },
  ];

  const handleLanguageChange = (value: string | null) => {
    if (value && (value === 'en' || value === 'fr')) {
      console.log('Select changing language to:', value); // Debug log
      setLanguage(value);
      router.refresh();
    }
    if (onClick) {
      onClick();
    }
  };

  return (
    <Select
      value={language}
      onChange={handleLanguageChange}
      data={languageOptions}
      leftSection={<IconWorld style={{ width: rem(16), height: rem(16) }} />}
      variant="filled"
      size={md ? 'sm' : 'xs'}
      w={90}
    />
  );
}
