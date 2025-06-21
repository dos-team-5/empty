'use client';

import { Paper, Text, Image, ActionIcon, Box } from '@mantine/core';
import { useState } from 'react';
import { IconEye } from '@tabler/icons-react'; // Make sure this is installed
import Link from 'next/link';

interface ImageCardProps {
  src: string;
  alt: string;
  name: string;
  size: number;
}

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return (
    Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  );
};

export const ImageCard = ({ src, alt, name, size }: ImageCardProps) => {
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);

  return (
    <Paper
      radius="xl"
      withBorder
      style={{
        overflow: 'hidden',
        border: '2px solid #e9ecef',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        setHoveredImage(src);
        e.currentTarget.style.borderColor = '#CB6AA7';
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
      }}
      onMouseLeave={(e) => {
        setHoveredImage(null);
        e.currentTarget.style.borderColor = '#e9ecef';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <Box
        style={{
          position: 'relative',
          aspectRatio: '16/9',
          overflow: 'hidden',
        }}
      >
        <Image
          src={src || '/placeholder.svg?height=200&width=300'}
          alt={alt}
          fit="cover"
          style={{
            transition: 'transform 0.3s ease',
          }}
        />
        <Box
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)',
            opacity: hoveredImage === src ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}
        />
        <ActionIcon
          size="sm"
          variant="filled"
          color="gray"
          style={{
            position: 'absolute',
            top: 12,
            right: 12,
            opacity: hoveredImage === src ? 1 : 0,
            transform: hoveredImage === src ? 'scale(1)' : 'scale(0.95)',
            transition: 'all 0.3s ease',
            backgroundColor: 'rgba(255,255,255,0.9)',
            color: '#374151',
          }}
        >
          <Link href={src} target="_blank">
            <IconEye size={16} />
          </Link>
        </ActionIcon>
      </Box>
      <Box p="sm" bg="white">
        <Text size="sm" fw={500} c="dark" truncate>
          {name}
        </Text>
        <Text size="xs" c="dimmed">
          {formatFileSize(size)}
        </Text>
      </Box>
    </Paper>
  );
};
