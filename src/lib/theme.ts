import { generateColors } from './colors-generator';
import { createTheme, DEFAULT_THEME, mergeMantineTheme } from '@mantine/core';

const customSHades = generateColors('#D482B6');
const darkShades: [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  ...string[],
] = [
  '#ffffff', // primary texts
  '#000000',
  '#ffffff', // border, btn, text
  '#ffffff', //
  '#CB6AA7', // badges and other minor elements background
  '#ffffff',
  '#161616', // cards and other elements background
  '#101010', // body
  '#ffffff',
  '#ffffff',
  '#ffffff',
  '#ffffff',
];

const themeOverride = createTheme({
  colors: {
    primaryShades: customSHades,
    dark: darkShades,
  },
  primaryColor: 'primaryShades',
});

export const theme = mergeMantineTheme(DEFAULT_THEME, themeOverride);
