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
  Progress,
  Stack,
  Text,
  Badge,
  Divider,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useEffect, useState } from 'react';
import { deleteFile, uploadFile } from '../actions/fileActions';
import { Icon } from '@/components/FileManager/lib/Icon';
import { ImageDropzone } from './ImageDropzone';
import { useImageCompressor, CompressionSettings } from './useImageCompressor';
import { CompressionSettings as CompSettings } from './CompressionSettings';
import imageCompression from 'browser-image-compression';

export interface FileHandlerRes {
  key: string;
  url: string;
  size: number;
  type: string;
  name: string;
  [key: string]: unknown;
}

interface ProcessingFile {
  file: File;
  status: 'pending' | 'processing' | 'completed' | 'error';
  progress: number;
  compressedFile?: File;
  error?: string;
}

interface MultiFileImageHandlerProps {
  onUploadSuccess?: (files: FileHandlerRes[]) => void;
  withModal?: boolean;
  defaultValue?: FileHandlerRes[];
  label?: string;
  description?: string;
  withAsterisk?: boolean;
  error?: string;
  maxFiles?: number; // Maximum number of files that can be uploaded at once
}

/**
 * Enhanced multi-file image handler with batch processing capabilities
 * Supports simultaneous compression and upload of multiple images
 */
export default function MultiFileImageHandler({
  onUploadSuccess,
  withModal = false,
  defaultValue,
  label,
  description,
  withAsterisk,
  error,
  maxFiles = 10, // Default maximum of 10 files
}: MultiFileImageHandlerProps) {
  const [uploadedFiles, setUploadedFiles] = useState<FileHandlerRes[]>(
    defaultValue || []
  );
  const [processingFiles, setProcessingFiles] = useState<ProcessingFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [compressOpen, setCompressOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const { settings, updateSettings } = useImageCompressor();

  // Effect to sync state when defaultValue prop changes from the parent
  useEffect(() => {
    setUploadedFiles(defaultValue || []);
  }, [defaultValue]);

  /**
   * Compress a single file with progress tracking
   */
  const compressFile = async (
    file: File,
    compressionSettings: CompressionSettings,
    onProgress: (progress: number) => void
  ): Promise<File> => {
    const options = {
      maxWidthOrHeight: compressionSettings.width,
      maxSizeMB: compressionSettings.maxSizeMB,
      useWebWorker: true,
      fileType: `image/${compressionSettings.format}`,
      initialQuality: compressionSettings.quality / 100,
      exifOrientation: compressionSettings.preserveMetadata ? undefined : 1,
      onProgress,
    };

    const compressedFile = await imageCompression(file, options);

    // Create a new File with the original name and correct extension
    const originalName = file.name.replace(/\.[^/.]+$/, ''); // Remove extension
    const newFileName = `${originalName}.${compressionSettings.format}`;

    return new File([compressedFile], newFileName, {
      type: `image/${compressionSettings.format}`,
      lastModified: file.lastModified,
    });
  };

  /**
   * Process multiple files with compression
   */
  const processFiles = async (files: File[]) => {
    setUploading(true);

    // Initialize processing state
    const initialProcessingFiles: ProcessingFile[] = files.map((file) => ({
      file,
      status: 'pending',
      progress: 0,
    }));
    setProcessingFiles(initialProcessingFiles);

    const results: FileHandlerRes[] = [];

    try {
      // Process files sequentially to avoid overwhelming the system
      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        // Update status to processing
        setProcessingFiles((prev) =>
          prev.map((pf, index) =>
            index === i ? { ...pf, status: 'processing' } : pf
          )
        );

        try {
          // Compress the file
          const compressedFile = await compressFile(
            file,
            settings,
            (progress) => {
              setProcessingFiles((prev) =>
                prev.map((pf, index) =>
                  index === i ? { ...pf, progress } : pf
                )
              );
            }
          );

          // Upload the compressed file
          const formData = new FormData();
          formData.append('file', compressedFile);
          const result = await uploadFile(formData, 'image');

          if (!result.success || !result.file) {
            throw new Error(result.error ?? 'Upload failed');
          }

          const fileData: FileHandlerRes = {
            key: result.file.key,
            url: result.file.url,
            size: compressedFile.size,
            type: compressedFile.type,
            name: compressedFile.name,
          };

          results.push(fileData);

          // Update status to completed
          setProcessingFiles((prev) =>
            prev.map((pf, index) =>
              index === i
                ? {
                    ...pf,
                    status: 'completed',
                    progress: 100,
                    compressedFile,
                  }
                : pf
            )
          );
        } catch (err) {
          const errorMessage =
            err instanceof Error ? err.message : 'Unknown error';

          // Update status to error
          setProcessingFiles((prev) =>
            prev.map((pf, index) =>
              index === i
                ? {
                    ...pf,
                    status: 'error',
                    error: errorMessage,
                  }
                : pf
            )
          );
        }
      }

      // Update uploaded files list
      const newFilesList = [...uploadedFiles, ...results];
      setUploadedFiles(newFilesList);
      onUploadSuccess?.(newFilesList);

      // Show success notification
      if (results.length > 0) {
        notifications.show({
          title: 'Upload Successful',
          message: `${results.length} of ${files.length} images uploaded successfully`,
          color: results.length === files.length ? 'green' : 'yellow',
        });
      }

      if (results.length < files.length) {
        notifications.show({
          title: 'Partial Success',
          message: `${files.length - results.length} files failed to upload`,
          color: 'orange',
        });
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      notifications.show({
        title: 'Upload Failed',
        message,
        color: 'red',
      });
    } finally {
      setUploading(false);
      if (withModal) {
        setCompressOpen(false);
      }
      // Clear processing files after a delay
      setTimeout(() => setProcessingFiles([]), 3000);
    }
  };

  /**
   * Handle file drop from dropzone with upload limit validation
   */
  const handleDrop = async (files: File[]) => {
    if (files.length === 0) return;

    // Check if the number of files exceeds the maximum limit
    if (files.length > maxFiles) {
      notifications.show({
        title: 'Upload Limit Exceeded',
        message: `You can only upload a maximum of ${maxFiles} files at once. Please select ${maxFiles} or fewer files.`,
        color: 'red',
      });
      return;
    }

    // Check if adding these files would exceed the total limit including already uploaded files
    const totalFilesAfterUpload = uploadedFiles.length + files.length;
    if (totalFilesAfterUpload > maxFiles) {
      const remainingSlots = maxFiles - uploadedFiles.length;
      notifications.show({
        title: 'Upload Limit Exceeded',
        message: `You can only upload ${remainingSlots} more file(s). You currently have ${uploadedFiles.length} file(s) uploaded and the maximum limit is ${maxFiles}.`,
        color: 'red',
      });
      return;
    }

    if (withModal) {
      // In modal mode, start processing immediately
      await processFiles(files);
    } else {
      // In non-modal mode, show settings first
      setShowSettings(true);
      // Store files for processing after settings confirmation
      const initialProcessingFiles: ProcessingFile[] = files.map((file) => ({
        file,
        status: 'pending',
        progress: 0,
      }));
      setProcessingFiles(initialProcessingFiles);
    }
  };

  /**
   * Handle settings confirmation and start processing
   */
  const handleConfirmSettings = async () => {
    setShowSettings(false);
    const filesToProcess = processingFiles.map((pf) => pf.file);
    await processFiles(filesToProcess);
  };

  /**
   * Handle file deletion
   */
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
      onUploadSuccess?.(newFilesList);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      notifications.show({ title: 'Deletion Failed', message, color: 'red' });
    } finally {
      setIsDeleting(null);
    }
  };

  // Processing status component
  const processingStatusComponent = (
    <Stack gap="sm" mt="md">
      {processingFiles.length > 0 && (
        <>
          <Text size="sm" fw={500}>
            Processing Files:
          </Text>
          {processingFiles.map((pf, index) => (
            <Card key={index} withBorder p="sm" radius="md">
              <Group justify="space-between">
                <Group>
                  <Text size="sm" truncate maw={200}>
                    {pf.file.name}
                  </Text>
                  <Badge
                    color={
                      pf.status === 'completed'
                        ? 'green'
                        : pf.status === 'error'
                          ? 'red'
                          : pf.status === 'processing'
                            ? 'blue'
                            : 'gray'
                    }
                    size="sm"
                  >
                    {pf.status}
                  </Badge>
                </Group>
                <Text size="xs" c="dimmed">
                  {pf.status === 'processing'
                    ? `${Math.round(pf.progress)}%`
                    : ''}
                </Text>
              </Group>
              {pf.status === 'processing' && (
                <Progress value={pf.progress} size="sm" mt="xs" />
              )}
              {pf.error && (
                <Text size="xs" c="red" mt="xs">
                  Error: {pf.error}
                </Text>
              )}
            </Card>
          ))}
        </>
      )}
    </Stack>
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
          {uploading ? 'Processing...' : 'Upload Multiple Images'}
        </Button>
        <Box mt="md">{displayListComponent}</Box>
        {processingStatusComponent}

        <Modal
          opened={compressOpen}
          onClose={() => setCompressOpen(false)}
          title="Upload Multiple Images"
          size="lg"
          centered
        >
          <ImageDropzone
            onDrop={handleDrop}
            loading={uploading}
            label={label}
            description={description}
            withAsterisk={withAsterisk}
            error={error}
            multiple={true}
            maxFiles={maxFiles}
          />
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

      <ImageDropzone
        onDrop={handleDrop}
        loading={uploading}
        label={label}
        description={description}
        withAsterisk={withAsterisk}
        error={error}
        multiple={true}
        maxFiles={maxFiles}
      />

      {processingStatusComponent}

      {uploadedFiles.length > 0 && (
        <>
          <Divider mt="md" />
          <Box>{displayListComponent}</Box>
        </>
      )}

      {/* Settings Modal */}
      <Modal
        opened={showSettings}
        onClose={() => {
          setShowSettings(false);
          setProcessingFiles([]);
        }}
        title="Compression Settings"
        size="md"
        centered
      >
        <Stack>
          <Text size="sm" c="dimmed">
            Configure compression settings for {processingFiles.length} file(s)
          </Text>

          <CompSettings
            settings={settings}
            updateSettings={updateSettings}
            disabled={uploading}
          />

          <Group justify="flex-end" mt="md">
            <Button
              variant="outline"
              onClick={() => {
                setShowSettings(false);
                setProcessingFiles([]);
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleConfirmSettings}>Process Files</Button>
          </Group>
        </Stack>
      </Modal>
    </Stack>
  );
}
