import { generateColors } from './colors-generator';
import { createTheme, DEFAULT_THEME, mergeMantineTheme } from '@mantine/core';

const customSHades = generateColors('#D482B6');

const themeOverride = createTheme({
  colors: {
    primaryShades: customSHades,
  },
  primaryColor: 'primaryShades',
});

export const theme = mergeMantineTheme(DEFAULT_THEME, themeOverride);
