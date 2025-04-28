import React from 'react';
import { UnstyledButton, Group, Text } from '@mantine/core';
import { NavigationItem } from '@/types/navigation.type';

interface NavItemProps {
  item: NavigationItem;
  isActive: boolean;
  onHover: (label: string) => void;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({
  item,
  isActive,
  onHover,
  onClick,
}) => {
  const hasDropdown = item.isDropdown && item.dropdown;

  return (
    <div onMouseEnter={() => onHover(item.label)} className="h-full">
      <UnstyledButton
        className={`text-text mx-1 font-medium transition-opacity group-hover:opacity-50 hover:opacity-100 ${isActive ? 'opacity-100' : ''}`}
        component="div"
        onClick={(e) => {
          if (hasDropdown || item.label === 'Contact') {
            e.preventDefault();
            onClick();
          }
        }}
        py="sm"
      >
        <Group gap={16}>
          <Text size="sm" fw={500}>
            {item.label}
          </Text>
        </Group>
      </UnstyledButton>
    </div>
  );
};

export default NavItem;
