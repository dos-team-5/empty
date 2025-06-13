'use client';

import {
  ActionIcon,
  Box,
  Button,
  Card,
  Group,
  Image,
  LoadingOverlay,
  Modal,
  Stack,
  Text,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useEffect, useState } from 'react'; // Import useEffect
import { deleteFile, uploadFile } from '../actions/fileActions';
import { Icon } from '@/components/FileManager/lib/Icon';
import ImageCompressor from './ImageCompressor';

export interface FileHandlerRes {
  key: string;
  url: string;
  size: number;
  type: string;
  name: string;
  [key: string]: unknown;
}

interface ImageHandlerProps {
  onUploadSuccess?: (files: FileHandlerRes[]) => void;
  withModal?: boolean;
  /**
   * If true, allows accumulating multiple images.
   * If false, each new upload will replace the previous one.
   * Defaults to false.
   */
  multiple?: boolean;
  /**
   * An array of existing files to display on initial render.
   */
  defaultValue?: FileHandlerRes[];
  label?: string;
  description?: string;
  withAsterisk?: boolean;
  error?: string;
}

export default function ImageHandler({
  onUploadSuccess,
  withModal = false,
  multiple = false,
  defaultValue,
  label,
  description,
  withAsterisk,
  error,
}: ImageHandlerProps) {
  // Initialize state with the defaultValue prop
  const [uploadedFiles, setUploadedFiles] = useState<FileHandlerRes[]>(
    defaultValue || []
  );
  const [uploading, setUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [compressOpen, setCompressOpen] = useState(false);

  // Effect to sync state when defaultValue prop changes from the parent
  useEffect(() => {
    setUploadedFiles(defaultValue || []);
  }, [defaultValue]);

  const handleConfirmAndUpload = async (file: File) => {
    setUploading(true);
    try {
      // In single-file mode, delete the old file before uploading the new one
      if (!multiple && uploadedFiles.length > 0) {
        // Find the file that is not in the defaultValue to avoid deleting pre-saved files on first upload
        const fileToDelete = uploadedFiles.find(
          (uf) => !(defaultValue || []).some((df) => df.key === uf.key)
        );
        if (fileToDelete) {
          await deleteFile(fileToDelete.key);
        }
      }

      // Upload the new compressed file
      const formData = new FormData();
      formData.append('file', file);
      const result = await uploadFile(formData, 'image');

      if (!result.success || !result.file) {
        throw new Error(result.error ?? 'Upload failed');
      }

      const fileData: FileHandlerRes = {
        key: result.file.key,
        url: result.file.url,
        size: file.size,
        type: file.type,
        name: file.name,
      };

      // Add to state based on the `multiple` prop
      const newFilesList = multiple ? [...uploadedFiles, fileData] : [fileData];
      setUploadedFiles(newFilesList);
      onUploadSuccess?.(newFilesList);

      notifications.show({
        title: 'Upload Successful',
        message: `Image uploaded: ${file.name}`,
        color: 'green',
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      notifications.show({ title: 'Upload Failed', message, color: 'red' });
    } finally {
      setUploading(false);
      if (withModal) {
        setCompressOpen(false); // Close modal on success/failure
      }
    }
  };

  const handleDelete = async (keyToDelete: string) => {
    setIsDeleting(keyToDelete);
    try {
      await deleteFile(keyToDelete);
      notifications.show({
        title: 'Image Deleted',
        message: 'The image was successfully removed.',
        color: 'green',
      });
      const newFilesList = uploadedFiles.filter((f) => f.key !== keyToDelete);
      setUploadedFiles(newFilesList);
      onUploadSuccess?.(newFilesList); // Notify parent of the change
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      notifications.show({ title: 'Deletion Failed', message, color: 'red' });
    } finally {
      setIsDeleting(null);
    }
  };

  // UI component for the image compressor
  const imageCompressorComponent = (
    <ImageCompressor
      label={label}
      description={description}
      withAsterisk={withAsterisk}
      error={error}
      opened={withModal ? compressOpen : true}
      onClose={() => setCompressOpen(false)}
      onConfirm={handleConfirmAndUpload}
    />
  );

  // UI component for displaying the list of uploaded files
  const displayListComponent = (
    <Stack gap="sm">
      {uploadedFiles.map((file) => (
        <Card key={file.key} withBorder p="sm" radius="md">
          <Group justify="space-between">
            <Group>
              <Image
                src={file.url}
                alt={file.name}
                w={60}
                h={60}
                radius="md"
                fit="contain"
              />
              <Box>
                <Text fz="sm" fw={500} truncate maw={200}>
                  {file.name}
                </Text>
                <Text size="xs" c="dimmed">
                  {/* Show 'N/A' for size if it's a default value without size info */}
                  {file.size ? `${(file.size / 1024).toFixed(2)} KB` : 'N/A'}
                </Text>
              </Box>
            </Group>
            <ActionIcon
              variant="light"
              color="red"
              onClick={() => handleDelete(file.key)}
              loading={isDeleting === file.key}
              disabled={uploading}
            >
              <Icon icon="tabler:trash" />
            </ActionIcon>
          </Group>
        </Card>
      ))}
    </Stack>
  );

  // Render based on `withModal` prop
  if (withModal) {
    return (
      <Box mt="md">
        <Button
          onClick={() => setCompressOpen(true)}
          disabled={uploading}
          leftSection={<Icon icon="ic:round-image" />}
        >
          {uploading ? 'Uploading...' : 'Upload Image'}
        </Button>
        <Box mt="md">{displayListComponent}</Box>
        <Modal
          opened={compressOpen}
          onClose={() => setCompressOpen(false)}
          title="Compress & Upload Image"
          size="lg"
          centered
        >
          {imageCompressorComponent}
        </Modal>
      </Box>
    );
  }

  // Default non-modal view
  return (
    <Stack mx={4} bg={'#f3f3f3'} p={16} mt="md" className="relative rounded-xl">
      <LoadingOverlay
        visible={uploading}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2 }}
      />

      {imageCompressorComponent}
      {uploadedFiles.length > 0 && <Box>{displayListComponent}</Box>}
    </Stack>
  );
}
