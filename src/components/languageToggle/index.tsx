'use client';

import { useLanguage } from '@/app/(main)/drive/context/languageToggleContext';
import { rem, Select } from '@mantine/core';
import { IconWorld } from '@tabler/icons-react';

const languageOptions = [
  { value: 'en', label: '🇺🇸 English' },
  { value: 'fr', label: '🇫🇷 Français' },
];

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  const handleLanguageChange = (value: string | null) => {
    if (value && (value === 'en' || value === 'fr')) {
      console.log('Select changing language to:', value); // Debug log
      setLanguage(value);
    }
  };

  return (
    <Select
      value={language}
      onChange={handleLanguageChange}
      data={languageOptions}
      leftSection={<IconWorld style={{ width: rem(16), height: rem(16) }} />}
      variant="filled"
      size="sm"
      w={140}
    />
  );
}
