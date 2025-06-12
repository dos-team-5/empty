'use client';

import {
  Box,
  Checkbox,
  Flex,
  Select,
  Slider,
  Text,
  TextInput,
} from '@mantine/core';
import type { CompressionSettings } from './useImageCompressor';

interface CompressionSettingsProps {
  readonly settings: CompressionSettings;
  readonly updateSettings: (newSettings: Partial<CompressionSettings>) => void;
  readonly disabled: boolean;
}

export function CompressionSettings({
  settings,
  updateSettings,
  disabled,
}: CompressionSettingsProps) {
  return (
    <Box p={'md'} mt="md">
      <Text size="sm">Settings</Text>
      <Flex
        w={'100%'}
        justify="space-between"
        align="center"
        direction={{ base: 'column', sm: 'column' }}
        gap="md"
        mb="xs"
      >
        <Box w={{ base: '100%' }}>
          <Text size="xs">Target Width (px)</Text>
          <Slider
            min={100}
            max={3840}
            labelAlwaysOn
            value={settings.width}
            onChange={(value) => updateSettings({ width: value })}
            label={(value) => `${value}px`}
            disabled={disabled}
          />
        </Box>
        <Box w={{ base: '100%' }}>
          <Text size="xs">Format</Text>
          <Select
            value={settings.format}
            onChange={(value) =>
              updateSettings({ format: (value as 'webp' | 'jpeg') || 'webp' })
            }
            data={[
              { value: 'webp', label: 'WebP (Best Compression)' },
              { value: 'jpeg', label: 'JPEG (High Compatibility)' },
            ]}
            disabled={disabled}
          />
        </Box>
        <Box w={{ base: '100%' }}>
          <Text size="xs">Quality (0–100)</Text>
          <Slider
            min={10}
            max={100}
            value={settings.quality}
            labelAlwaysOn
            onChange={(value) => updateSettings({ quality: value })}
            label={(value) => `${value}`}
            disabled={disabled}
          />
        </Box>
      </Flex>
      <Flex
        w={'100%'}
        justify="space-between"
        align="center"
        direction={{ base: 'column', sm: 'column' }}
        gap="md"
        mb="xs"
      >
        <Box w={{ base: '100%' }}>
          <Text size="xs">Compression Strength (max size in MB)</Text>
          <Slider
            min={0.1}
            max={5}
            step={0.1}
            labelAlwaysOn
            value={settings.maxSizeMB}
            onChange={(value) => updateSettings({ maxSizeMB: value })}
            label={(value) => `${value.toFixed(1)} MB`}
            disabled={disabled}
          />
        </Box>
        <Box w={{ base: '100%' }}>
          <Text size="xs">File Name Prefix</Text>
          <TextInput
            value={settings.fileNamePrefix}
            onChange={(event) =>
              updateSettings({ fileNamePrefix: event.currentTarget.value })
            }
            placeholder="compressed"
            disabled={disabled}
          />
        </Box>
        <Box w={{ base: '100%' }}>
          <Text size="xs">Preserve Metadata</Text>
          <Checkbox
            checked={settings.preserveMetadata}
            onChange={(event) =>
              updateSettings({ preserveMetadata: event.currentTarget.checked })
            }
            disabled={disabled}
            label="Keep EXIF data"
          />
        </Box>
      </Flex>
    </Box>
  );
}
