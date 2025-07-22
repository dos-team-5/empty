'use client';

import {
  ActionIcon,
  Box,
  Button,
  Flex,
  Group,
  List,
  Menu,
  Modal,
  Paper,
  Progress,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { useEffect, useState } from 'react';
import { ImageDropzone } from './ImageDropzone';
import { ImagePreview } from './ImagePreview';
import { useImageCompressor } from './useImageCompressor';
import { useMediaQuery } from '@mantine/hooks';
import { Icon } from '../lib/Icon';

interface ImageCompressorProps {
  readonly opened: boolean;
  readonly onClose: () => void;
  readonly onConfirm: (compressedFile: File) => void;
  readonly label?: string;
  readonly description?: string;
  readonly withAsterisk?: boolean;
  readonly error?: string;
  readonly multiple?: boolean; // Support for multiple file processing
}

/**
 * Enhanced ImageCompressor component with multi-file support
 * Processes multiple images with compression settings
 */
export default function ImageCompressor({
  opened,
  onClose,
  onConfirm,
  label,
  description,
  withAsterisk,
  error,
  multiple = false,
}: ImageCompressorProps) {
  const {
    settings,
    originalImage,
    compressedImage,
    loading,
    progress,
    handleDrop,
    updateSettings,
    handleDownload,
    clearState,
  } = useImageCompressor();
  const mobile = useMediaQuery('(max-width: 768px)');
  const [showModalContent, setShowModalContent] = useState(false);

  // Show modal content when an image is compressed
  useEffect(() => {
    if (compressedImage) {
      setShowModalContent(true);
    }
  }, [compressedImage]);

  // Handle confirm action
  const handleConfirm = () => {
    if (compressedImage?.file) {
      onConfirm(compressedImage.file);
      clearState();
      setShowModalContent(false);
      onClose();
    }
  };

  // Handle delete action
  const handleDelete = () => {
    clearState();
    setShowModalContent(false);
  };

  return (
    <>
      <ImageDropzone
        onDrop={handleDrop}
        loading={loading}
        label={label}
        description={description}
        withAsterisk={withAsterisk}
        error={error}
        multiple={multiple} // Pass multiple prop to dropzone
      />
      <Modal
        opened={opened && showModalContent}
        onClose={() => {
          setShowModalContent(false);
          onClose();
          clearState();
        }}
        size="xl"
        centered
        title={'Compress Image'}
      >
        <Flex align={'center'}>
          <Text mt={16} c={'dimmed'} fz={{ base: 12, sm: 14 }}>
            Compress images to reduce size with minimal quality loss.
          </Text>
          <Menu width={300} position="bottom-end">
            <Menu.Target>
              <ActionIcon mt={16} variant="subtle" size="sm">
                <Icon icon="ix:question-filled" />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Paper p="md" radius="md" withBorder>
                <Stack gap="md">
                  <Title fz={16} order={3}>
                    How to use Image compressor
                  </Title>

                  <List listStyleType="disc" size="xs" type="ordered">
                    <List.Item>
                      <span className="font-bold">Target Width (px):</span> Sets
                      the desired width of the output image. Example: 1920px
                      resizes the image to that width while maintaining aspect
                      ratio.
                    </List.Item>

                    <List.Item>
                      <span className="font-bold">Format:</span> Selects the
                      output image format. WebP (Best Compression): Modern
                      format that provides excellent compression and quality
                      balance for web use.
                    </List.Item>

                    <List.Item>
                      <span className="font-bold">Quality (0–100):</span>{' '}
                      Controls image quality and file size. 80 is a good
                      balance—clear visuals with smaller file size.
                    </List.Item>

                    <List.Item>
                      <span className="font-bold">File Name Prefix:</span> Adds
                      a prefix to the output file name. Example:
                      compressed_image.jpg if &quot;compressed&quot; is set.
                    </List.Item>

                    <List.Item>
                      <span className="font-bold">Compression Strength:</span>{' '}
                      (max size in MB) Limits the final image file size. 1.0 MB
                      ensures the compressed image won&apos;t exceed this size.
                    </List.Item>

                    <List.Item>
                      <span className="font-bold">
                        Preserve Metadata / Keep EXIF data:
                      </span>{' '}
                      When checked, keeps original image metadata (e.g., camera
                      info, location). Useful for photographers or archival use;
                      leave unchecked for privacy or smaller files.
                    </List.Item>
                  </List>
                </Stack>
              </Paper>
            </Menu.Dropdown>
          </Menu>
        </Flex>
        <Box pos={'relative'} p="md">
          {loading && (
            <Box mt="md">
              <Text size="sm">Compressing... {Math.round(progress)}%</Text>
              <Progress value={progress} size="lg" color="blue" />
            </Box>
          )}

          <Group
            top={{ base: -10, xl: -48 }}
            right={16}
            pos={'absolute'}
            justify="flex-end"
            mt="md"
          >
            <Button
              onClick={handleDelete}
              disabled={!compressedImage || loading}
              variant="outline"
              size={mobile ? 'xs' : 'sm'}
            >
              Delete
            </Button>
            <Button
              size={mobile ? 'xs' : 'sm'}
              onClick={handleConfirm}
              disabled={!compressedImage || loading}
            >
              Confirm
            </Button>
          </Group>
          <ImagePreview
            originalImage={originalImage}
            compressedImage={compressedImage}
            onDownload={handleDownload}
            // --- PASS THE PROPS DOWN ---
            settings={settings}
            updateSettings={updateSettings}
            loading={loading}
          />
        </Box>
      </Modal>
    </>
  );
}
