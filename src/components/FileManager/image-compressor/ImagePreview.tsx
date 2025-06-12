'use client';

import { ActionIcon, Box, Group, Menu, Text } from '@mantine/core';
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from 'react-compare-slider';
import { ImageData, useImageCompressor } from './useImageCompressor';
import { Icon } from '../lib/Icon';
import { CompressionSettings } from './CompressionSettings';
import { useMediaQuery } from '@mantine/hooks';

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
  const mobile = useMediaQuery('(max-width: 600px)');
  const { settings, updateSettings, loading } = useImageCompressor();
  if (!originalImage && !compressedImage) return null;

  return (
    <Box mt={{ base: 30, xl: 0 }} className="relative">
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
                style={{
                  objectFit: mobile ? 'cover' : 'contain',
                  width: '100%',
                  height: '100%',
                }}
              />
            }
            itemTwo={
              <ReactCompareSliderImage
                src={compressedImage.url}
                alt="Compressed image"
                style={{
                  objectFit: mobile ? 'cover' : 'contain',
                  width: '100%',
                  height: '100%',
                }}
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

      <Group pos={'absolute'} top={0} w="100%" justify="right">
        <Menu position="bottom-end" width={300}>
          <Menu.Target>
            <ActionIcon variant="light" mt="xs" size="sm">
              <Icon icon="jam:settings-alt" width={32} />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <CompressionSettings
              settings={settings}
              updateSettings={updateSettings}
              disabled={loading}
            />
          </Menu.Dropdown>
        </Menu>
        <ActionIcon variant="light" mt="xs" onClick={onDownload} size="sm">
          <Icon icon="mynaui:download" width={32} />
        </ActionIcon>
      </Group>

      <Group justify="space-between" mt="xs" grow>
        <Box style={{ flex: 1 }} w="100%">
          {originalImage && (
            <Text size="xs" c="dimmed">
              Original Size: {(originalImage.file.size / 1024).toFixed(2)} KB
            </Text>
          )}
        </Box>

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
