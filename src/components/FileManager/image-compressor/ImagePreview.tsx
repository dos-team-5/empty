'use client';

import { ActionIcon, Box, Flex, Group, Menu, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from 'react-compare-slider';
import { CompressionSettings } from './CompressionSettings';
// Make sure CompressionSettings's own props are aligned
import type {
  CompressionSettings as TCompressionSettings,
  ImageData,
} from './useImageCompressor';
import { Icon } from '../lib/Icon';

interface ImagePreviewProps {
  readonly originalImage: ImageData | null;
  readonly compressedImage: ImageData | null;
  readonly onDownload: () => void;
  // --- ADD THESE PROPS ---
  readonly settings: TCompressionSettings;
  readonly updateSettings: (newSettings: Partial<TCompressionSettings>) => void;
  readonly loading: boolean;
}

export function ImagePreview({
  originalImage,
  compressedImage,
  onDownload,
  // --- DESTRUCTURE NEW PROPS ---
  settings,
  updateSettings,
  loading,
}: ImagePreviewProps) {
  const mobile = useMediaQuery('(max-width: 600px)');

  // --- REMOVE THIS LINE ---
  // const { settings, updateSettings, loading } = useImageCompressor();

  if (!originalImage && !compressedImage) return null;

  return (
    <Box mt={{ base: 30, xl: 0 }} className="relative">
      <Group w={'100%'} justify="right" mt="xs">
        <Flex gap={30}>
          <Box>
            {originalImage && (
              <Text size="xs" c="dimmed">
                Original Size: {(originalImage.file.size / 1024).toFixed(2)} KB
              </Text>
            )}
          </Box>

          <Box>
            {compressedImage && (
              <Text size="xs" c="dimmed" ta="right">
                Compressed Size: {(compressedImage.file.size / 1024).toFixed(2)}{' '}
                KB
              </Text>
            )}
          </Box>
        </Flex>
      </Group>
      {originalImage && compressedImage ? (
        <Box
          mt={20}
          style={{
            width: '100%',
            maxWidth: '800px',
            margin: '0 auto',
            aspectRatio: '4 / 3',
            borderRadius: '8px',
            overflow: 'hidden',
            maxHeight: '600px',
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

      <Group pos={'absolute'} top={24} w="100%" justify="right">
        <Menu position="bottom-end" width={300} closeOnItemClick={false}>
          <Menu.Target>
            <ActionIcon variant="light" mt="xs" size="sm">
              <Icon icon="jam:settings-alt" width={32} />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            {/* This will now receive the correct props from the parent */}
            <CompressionSettings
              settings={settings}
              updateSettings={updateSettings}
              disabled={loading}
            />
          </Menu.Dropdown>
        </Menu>
        <ActionIcon
          variant="light"
          mt="xs"
          onClick={onDownload}
          size="sm"
          disabled={!compressedImage || loading}
        >
          <Icon icon="mynaui:download" width={32} />
        </ActionIcon>
      </Group>
    </Box>
  );
}
