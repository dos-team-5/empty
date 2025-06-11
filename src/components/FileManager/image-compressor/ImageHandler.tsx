'use client';

import { Box, Button, Card, Image, Modal, Stack, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useState } from 'react';
import { uploadFile } from '../actions/fileActions';
import ImageCompressor from './ImageCompressor';
import { Icon } from '@/components/Icon';

interface ImageHandlerProps {
  onUploadSuccess?: (file: FileHandlerRes) => void;
  withModal?: boolean;
}

export interface FileHandlerRes {
  key: string;
  url: string;
  size: number;
  type: string;
  name: string;
  [key: string]: unknown;
}

export default function ImageHandler({
  onUploadSuccess,
  withModal = false,
  label,
  description,
  withAsterisk,
  error,
}: ImageHandlerProps & {
  onUploadSuccess?: (file: FileHandlerRes) => void;
  withModal?: boolean;
  label?: string;
  description?: string;
  withAsterisk?: boolean;
  error?: string;
}) {
  const [compressOpen, setCompressOpen] = useState(false);
  const [compressedFile, setCompressedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadUrl, setUploadUrl] = useState<string | null>(null);

  const handleConfirm = async (file: File) => {
    setCompressedFile(file);

    // Upload to R2 via server action
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const result = await uploadFile(formData);

      if (!result.success) {
        throw new Error(result.error ?? 'Upload failed');
      }
      setUploadUrl(result.file?.url ?? null);
      if (result.file) {
        const fileData: FileHandlerRes = {
          key: result.file.key,
          url: result.file.url,
          size: file.size,
          type: file.type,
          name: file.name,
        };
        onUploadSuccess?.(fileData);
      }

      notifications.show({
        title: 'Upload Successful',
        message: `File uploaded to R2: ${file.name}`,
        color: 'green',
      });
    } catch (error) {
      notifications.show({
        title: 'Upload Failed',
        message: `Error uploading to R2: ${error instanceof Error ? error.message : 'Unknown error'}`,
        color: 'red',
      });
      console.error('R2 upload error:', error);
    } finally {
      setUploading(false);
    }
  };

  return withModal ? (
    <Box>
      <Button
        onClick={() => setCompressOpen(true)}
        disabled={uploading}
        leftSection={<Icon icon="ic:round-image" />}
      >
        {uploading ? 'Uploading...' : 'Upload Image'}
      </Button>
      {compressedFile && (
        <Box mt="md">
          <Text>
            Compressed File: {compressedFile.name} (
            {(compressedFile.size / 1024).toFixed(2)} KB)
          </Text>
          {uploadUrl && (
            <Text mt="xs">
              R2 URL:{' '}
              <a href={uploadUrl} target="_blank" rel="noopener noreferrer">
                {uploadUrl}
              </a>
            </Text>
          )}
        </Box>
      )}
      <Modal
        opened={compressOpen}
        onClose={() => setCompressOpen(false)}
        title="Compress Image"
        size="lg"
        centered
      >
        <ImageCompressor
          label={label}
          description={description}
          withAsterisk={withAsterisk}
          error={error}
          opened={compressOpen}
          onClose={() => setCompressOpen(false)}
          onConfirm={handleConfirm}
        />
      </Modal>
    </Box>
  ) : (
    <Stack
      mx={4}
      bg={'#f3f3f3'}
      mt={20}
      gap={0}
      p={16}
      className="card-neumorphic rounded-xl"
    >
      <ImageCompressor
        opened={true}
        onClose={() => setCompressOpen(false)}
        onConfirm={handleConfirm}
        label={label}
        description={description}
        withAsterisk={withAsterisk}
        error={error}
      />
      {/* preview image  */}
      {compressedFile && (
        <Card
          shadow="sm"
          padding={0}
          px={5}
          radius="md"
          maw={120}
          mah={80}
          className="overflow-hidden"
        >
          {uploadUrl && (
            <Image
              src={uploadUrl}
              alt="Uploaded Image"
              style={{
                maxWidth: 120,
                maxHeight: 80,
                width: 'auto',
                height: 'auto',
                aspectRatio: '1 / 1',
                borderRadius: 8,
                objectFit: 'contain',
              }}
            />
          )}
        </Card>
      )}
    </Stack>
  );
}
