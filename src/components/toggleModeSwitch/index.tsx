'use client';
import { useComputedColorScheme, useMantineColorScheme } from '@mantine/core';
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useMediaQuery } from '@mantine/hooks';

const ToggleModeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const isAboveMobile = useMediaQuery('(min-width: 768px)');

  const { setColorScheme } = useMantineColorScheme({
    keepTransitions: true,
  });

  const computedColorScheme = useComputedColorScheme('light');

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMode = () => {
    setColorScheme(computedColorScheme === 'dark' ? 'light' : 'dark');
  };

  // Loading state
  if (!mounted) {
    return (
      <div className="h-6 w-6 animate-pulse cursor-pointer rounded-full" />
    );
  }

  return (
    <button
      onClick={toggleMode}
      className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full transition-colors duration-200"
      aria-label="Toggle theme"
    >
      {computedColorScheme === 'dark' ? (
        <Sun
          size={isAboveMobile ? 16 : 20}
          color="var(--mantine-color-default-color)"
        />
      ) : (
        <Moon
          size={isAboveMobile ? 16 : 20}
          color="var(--mantine-color-default-color)"
        />
      )}
    </button>
  );
};

export default ToggleModeSwitch;
