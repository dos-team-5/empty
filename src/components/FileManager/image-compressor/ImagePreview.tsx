'use client';

import { ActionIcon, Box, Group, Text } from '@mantine/core';
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from 'react-compare-slider';
import { ImageData } from './useImageCompressor';
import { Icon } from '@/components/FileManager/lib/Icon';

interface ImagePreviewProps {
  readonly originalImage: ImageData | null;
  readonly compressedImage: ImageData | null;
  readonly onDownload: () => void;
}

export function ImagePreview({
  originalImage,
  compressedImage,
  onDownload,
}: ImagePreviewProps) {
  if (!originalImage && !compressedImage) return null;
  return (
    <Box className="relative">
      {originalImage && compressedImage ? (
        <Box
          style={{
            width: '100%',
            maxWidth: '800px',
            margin: '0 auto',
            aspectRatio: '4 / 3', // Maintain aspect ratio for consistency
            borderRadius: '8px',
            overflow: 'hidden',
          }}
        >
          <ReactCompareSlider
            itemOne={
              <ReactCompareSliderImage
                src={originalImage.url}
                alt="Original image"
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              />
            }
            itemTwo={
              <ReactCompareSliderImage
                src={compressedImage.url}
                alt="Compressed image"
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              />
            }
            style={{ width: '100%', height: '100%' }}
          />
        </Box>
      ) : (
        <Text c="dimmed" size="sm">
          {originalImage ? 'Compressing image...' : 'No image uploaded'}
        </Text>
      )}
      <Group
        className="absolute top-0 w-full"
        justify="space-between"
        mt="xs"
        grow
      >
        <Box style={{ flex: 1 }} w="100%">
          {originalImage && (
            <Text size="xs" c="dimmed">
              Original Size: {(originalImage.file.size / 1024).toFixed(2)} KB
            </Text>
          )}
        </Box>
        <Group style={{ flex: 1 }} w="100%" justify="center">
          {compressedImage && (
            <ActionIcon variant="light" mt="xs" onClick={onDownload} size="xs">
              <Icon icon="line-md:download-loop" />
            </ActionIcon>
          )}
        </Group>

        <Box style={{ flex: 1 }} w="100%">
          {compressedImage && (
            <Text size="xs" c="dimmed" ta="right">
              Compressed Size: {(compressedImage.file.size / 1024).toFixed(2)}{' '}
              KB
            </Text>
          )}
        </Box>
      </Group>
    </Box>
  );
}
