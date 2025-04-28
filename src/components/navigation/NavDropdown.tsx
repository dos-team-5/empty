'use client';
import React, { useRef } from 'react';
import { Paper, Box, Transition, Flex, SimpleGrid } from '@mantine/core';
import { DropdownItem } from '@/types/navigation.type';
import Image from 'next/image';
import Link from 'next/link';
import { Url } from 'next/dist/shared/lib/router/router';

interface NavDropdownProps {
  isOpen: boolean;
  sections?: DropdownItem;
  onMouseLeave: () => void;
  isEmpty?: boolean;
}

const NavDropdown: React.FC<NavDropdownProps> = ({
  isOpen,
  sections,
  onMouseLeave,
  isEmpty,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <Transition
      mounted={isOpen}
      transition={'scale-y'}
      duration={1000}
      timingFunction="ease"
    >
      {(styles) => (
        <Paper
          ref={ref}
          pos="fixed"
          left={0}
          right={0}
          top={120}
          style={styles}
          onMouseLeave={onMouseLeave}
          className="z-50"
        >
          <Box>
            {isEmpty ? (
              <></>
            ) : (
              <Box
                className="text-text flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20"
                maw={1800}
                mx="auto"
              >
                <SimpleGrid cols={4} spacing={80}>
                  <Flex className="group" direction={'column'} gap="sm">
                    {(sections?.content1 ?? []).map((item) => (
                      <Link
                        key={item.itemName}
                        href={item.href as Url}
                        className="text-lg font-medium transition-opacity group-hover:opacity-50 hover:opacity-100"
                        style={{
                          textDecoration: 'none',
                          fontSize: '28px',
                        }}
                      >
                        {item.itemName}
                      </Link>
                    ))}
                  </Flex>
                  <Flex className="group" direction={'column'} gap="sm">
                    {(sections?.content2 ?? []).map((item) => (
                      <Link
                        key={item.itemName}
                        href={item.href as Url}
                        className="text-lg font-medium transition-opacity group-hover:opacity-50 hover:opacity-100"
                        style={{
                          textDecoration: 'none',
                          fontSize: '28px',
                        }}
                      >
                        {item.itemName}
                      </Link>
                    ))}
                  </Flex>
                  <Flex className="group" direction={'column'} gap="sm">
                    {(sections?.content3 ?? []).map((item) => (
                      <Link
                        key={item.itemName}
                        href={item.href as Url}
                        className="text-lg font-medium transition-opacity group-hover:opacity-50 hover:opacity-100"
                        style={{
                          textDecoration: 'none',
                          fontSize: '28px',
                        }}
                      >
                        {item.itemName}
                      </Link>
                    ))}
                  </Flex>
                  <Flex className="group" direction={'column'} gap="sm">
                    {(sections?.content4 ?? []).map((item) => (
                      <Link
                        key={item.itemName}
                        href={item.href as Url}
                        className="text-lg font-medium transition-opacity group-hover:opacity-50 hover:opacity-100"
                        style={{
                          textDecoration: 'none',
                          fontSize: '28px',
                        }}
                      >
                        {item.itemName}
                      </Link>
                    ))}
                  </Flex>
                </SimpleGrid>
                {sections?.image && (
                  <Image
                    src={sections.image}
                    alt="Dropdown Image"
                    width={400}
                    height={400}
                  />
                )}
              </Box>
            )}
          </Box>
        </Paper>
      )}
    </Transition>
  );
};

export default NavDropdown;
