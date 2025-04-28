import { Navigation } from '@/types/navigation.type';

export const navigation: Navigation = [
  {
    label: 'Advertise',
    isDropdown: true,
    dropdown: {
      content1: [{ itemName: 'Advertise', href: '/' }],
      image: '/polester2.png',
    },
  },
  {
    label: 'Drive ',
    isDropdown: true,
    dropdown: {
      content1: [{ itemName: 'Drive', href: '/drive' }],
      image: '/polester2.png',
    },
  },
  {
    label: 'AdTracker (beta)',
    isDropdown: false,
    dropdown: {},
  },
  {
    label: 'Contact Us',
    isDropdown: false,
    dropdown: {},
  },
];
