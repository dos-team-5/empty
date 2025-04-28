'use client';
import React, { useState } from 'react';
import { NavigationItem } from '../../types/navigation.type';
import { ChevronRight, ArrowLeft, Map, User } from 'lucide-react';
import { navigation } from '../../data/navigation';
import Link from 'next/link';
import { Url } from 'next/dist/shared/lib/router/router';
import { Box, Drawer } from '@mantine/core';

interface SubMenuProps {
  item: NavigationItem;
  onBack: () => void;
}

interface MobileNavProps {
  onClose: () => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ onClose }) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<NavigationItem | null>(
    null
  );

  const handleItemClick = (item: NavigationItem) => {
    if (item.isDropdown) {
      setActiveSubmenu(item);
      setOpenDrawer(true);
    }
  };

  return (
    <>
      <Box w={'100%'} h={'90vh'}>
        <MainMenu onItemClick={handleItemClick} items={navigation} />
      </Box>
      <Drawer
        opened={openDrawer}
        onClose={onClose}
        size={'100%'}
        position="right"
        withCloseButton={true}
      >
        {activeSubmenu && (
          <SubMenu item={activeSubmenu} onBack={() => setOpenDrawer(false)} />
        )}
      </Drawer>
    </>
  );
};

const MainMenu: React.FC<{
  onItemClick: (item: NavigationItem) => void;
  items: NavigationItem[];
}> = ({ onItemClick, items }) => {
  return (
    <div className="relative flex h-full w-full flex-col px-4">
      <div className="flex-1">
        <nav className="absolute bottom-6 w-full px-6 py-4">
          <ul className="">
            {items.map((item) => (
              <li key={item.label} className="text-2xl">
                <button
                  className="flex w-full items-center justify-between px-6 py-5 text-left text-lg"
                  onClick={() => onItemClick(item)}
                >
                  {item.label}
                  {item.isDropdown && (
                    <ChevronRight size={32} strokeWidth={1.5} />
                  )}
                </button>
              </li>
            ))}
          </ul>
          <div className="flex space-x-6 p-6">
            <Link href="#" className="flex items-center space-x-2">
              <Map size={32} strokeWidth={1.5} />
            </Link>
            <Link href="#" className="flex items-center space-x-2">
              <User size={32} strokeWidth={1.5} />
            </Link>
          </div>
        </nav>
      </div>

      {/* Footer */}
    </div>
  );
};

const SubMenu: React.FC<SubMenuProps> = ({ item, onBack }) => {
  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5">
        <button
          onClick={onBack}
          className="flex items-center p-2"
          aria-label="Go back"
        >
          <ArrowLeft size={20} strokeWidth={1.5} />
        </button>
        <h2 className="text-lg font-medium">{item.label}</h2>
        <div className="w-8"></div> {/* Spacer for centering title */}
      </div>

      {/* Submenu content */}
      <div className="flex-1 overflow-auto">
        <div className="py-4">
          {item.dropdown.content1 && (
            <div className="mb-6">
              <ul>
                {item.dropdown.content1.map((subItem) => (
                  <li key={subItem.itemName}>
                    <Link
                      href={subItem.href as Url}
                      className="block px-6 py-3 text-lg hover:bg-gray-50"
                    >
                      {subItem.itemName}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {item.dropdown.content2 && (
            <div className="mb-6">
              <ul>
                {item.dropdown.content2.map((subItem) => (
                  <li key={subItem.itemName}>
                    <Link
                      href={subItem.href as Url}
                      className="block px-6 py-3 text-lg hover:bg-gray-50"
                    >
                      {subItem.itemName}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {item.dropdown.content3 && (
            <div>
              <ul>
                {item.dropdown.content3.map((subItem) => (
                  <li key={subItem.itemName}>
                    <Link
                      href={subItem.href as Url}
                      className="block px-6 py-3 text-lg hover:bg-gray-50"
                    >
                      {subItem.itemName}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
