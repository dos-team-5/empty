'use client';

import {
  Box,
  Button,
  Group,
  Modal,
  Progress,
  Text,
  Title,
} from '@mantine/core';
import { useEffect, useState } from 'react';
import { ImageDropzone } from './ImageDropzone';
import { ImagePreview } from './ImagePreview';
import { useImageCompressor } from './useImageCompressor';
import { useMediaQuery } from '@mantine/hooks';

interface ImageCompressorProps {
  readonly opened: boolean;
  readonly onClose: () => void;
  readonly onConfirm: (compressedFile: File) => void;
  readonly label?: string;
  readonly description?: string;
  readonly withAsterisk?: boolean;
  readonly error?: string;
}

export default function ImageCompressor({
  opened,
  onClose,
  onConfirm,
  label,
  description,
  withAsterisk,
  error,
}: ImageCompressorProps) {
  const {
    originalImage,
    compressedImage,
    loading,
    progress,
    handleDrop,
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
      >
        <Title fz={{ base: 16, sm: 28, lg: 40 }} order={3}>
          Compress Image
        </Title>
        <Box pos={'relative'} p="md">
          {loading && (
            <Box mt="md">
              <Text size="sm">Compressing... {Math.round(progress)}%</Text>
              <Progress value={progress} size="lg" color="blue" />
            </Box>
          )}

          <Group
            top={{ base: -10, xl: -56 }}
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
          />
        </Box>
      </Modal>
    </>
  );
}
