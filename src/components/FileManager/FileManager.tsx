'use client';

import {
  ActionIcon,
  Button,
  Group,
  Image,
  Loader,
  SimpleGrid,
  Checkbox,
  Stack,
  Text,
  Box,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useState } from 'react';
import { deleteFile, listFiles } from './actions/fileActions';
import { FileHandlerRes } from './image-compressor/ImageHandler';
import MultiFileImageHandler from './image-compressor/MultiFileImageHandler';
import { Icon } from './lib/Icon';

/**
 * Enhanced FileManager component with multi-select functionality
 * Supports bulk operations and improved image handling
 */
export default function FileManager() {
  const [files, setFiles] = useState<{ key: string; url: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set());
  const [isSelectionMode, setIsSelectionMode] = useState(false);

  /**
   * Load files from storage
   */
  const loadFiles = async () => {
    setLoading(true);
    const result = await listFiles();
    if (result.success) {
      setFiles(result.files ?? []);
    } else {
      notifications.show({
        title: 'Error',
        message: result.error,
        color: 'red',
      });
    }
    setLoading(false);
  };

  /**
   * Handle single file deletion
   */
  const handleDelete = async (key: string) => {
    setLoading(true);
    const result = await deleteFile(key);
    if (result.success) {
      notifications.show({
        title: 'Success',
        message: 'File deleted successfully',
        color: 'green',
      });
      loadFiles();
    } else {
      notifications.show({
        title: 'Error',
        message: result.error,
        color: 'red',
      });
    }
    setLoading(false);
  };

  /**
   * Handle bulk deletion of selected files
   */
  const handleBulkDelete = async () => {
    if (selectedFiles.size === 0) return;

    setLoading(true);
    const deletePromises = Array.from(selectedFiles).map((key) =>
      deleteFile(key)
    );

    try {
      const results = await Promise.allSettled(deletePromises);
      const successCount = results.filter(
        (result) => result.status === 'fulfilled'
      ).length;
      const failureCount = results.length - successCount;

      if (successCount > 0) {
        notifications.show({
          title: 'Success',
          message: `${successCount} file(s) deleted successfully${failureCount > 0 ? `, ${failureCount} failed` : ''}`,
          color: successCount === results.length ? 'green' : 'yellow',
        });
      }

      if (failureCount > 0 && successCount === 0) {
        notifications.show({
          title: 'Error',
          message: `Failed to delete ${failureCount} file(s)`,
          color: 'red',
        });
      }

      setSelectedFiles(new Set());
      setIsSelectionMode(false);
      loadFiles();
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: `An error occurred during bulk deletion. ${error}`,
        color: 'red',
      });
    } finally {
      setLoading(false);
    }
  };

  /**
   * Toggle file selection
   */
  const toggleFileSelection = (key: string) => {
    const newSelection = new Set(selectedFiles);
    if (newSelection.has(key)) {
      newSelection.delete(key);
    } else {
      newSelection.add(key);
    }
    setSelectedFiles(newSelection);
  };

  /**
   * Select all files
   */
  const selectAllFiles = () => {
    setSelectedFiles(new Set(files.map((file) => file.key)));
  };

  /**
   * Clear all selections
   */
  const clearSelection = () => {
    setSelectedFiles(new Set());
    setIsSelectionMode(false);
  };

  /**
   * Handle successful upload from ImageHandler
   */
  const handleUploadSuccess = (uploadedFiles: FileHandlerRes[]) => {
    notifications.show({
      title: 'Upload Success',
      message: `${uploadedFiles.length} file(s) uploaded successfully`,
      color: 'green',
    });
    loadFiles(); // Refresh the file list
  };

  return (
    <Stack gap="md">
      {/* Enhanced Multi-File ImageHandler with batch processing */}
      <MultiFileImageHandler
        onUploadSuccess={handleUploadSuccess}
        label="Upload Multiple Images"
        description="Select multiple images to upload and compress at once"
        maxFiles={5} // Limit to 5 files at once
      />

      {/* Control buttons */}
      <Group justify="space-between">
        <Group>
          <Button onClick={loadFiles} disabled={loading}>
            Load Files
          </Button>
          <Button
            variant="outline"
            onClick={() => setIsSelectionMode(!isSelectionMode)}
            disabled={files.length === 0}
          >
            {isSelectionMode ? 'Exit Selection' : 'Select Files'}
          </Button>
        </Group>

        {/* Selection controls */}
        {isSelectionMode && (
          <Group>
            <Text size="sm" c="dimmed">
              {selectedFiles.size} of {files.length} selected
            </Text>
            <Button size="xs" variant="light" onClick={selectAllFiles}>
              Select All
            </Button>
            <Button size="xs" variant="light" onClick={clearSelection}>
              Clear
            </Button>
            <Button
              size="xs"
              color="red"
              onClick={handleBulkDelete}
              disabled={selectedFiles.size === 0}
            >
              Delete Selected
            </Button>
          </Group>
        )}
      </Group>

      {loading && <Loader mt="md" />}

      {/* File grid with enhanced selection capabilities */}
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
        {files.map((file) => (
          <Box key={file.key} style={{ position: 'relative' }}>
            {/* Selection checkbox */}
            {isSelectionMode && (
              <Checkbox
                checked={selectedFiles.has(file.key)}
                onChange={() => toggleFileSelection(file.key)}
                style={{
                  position: 'absolute',
                  top: 10,
                  left: 10,
                  zIndex: 10,
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  borderRadius: '4px',
                  padding: '2px',
                }}
              />
            )}

            {/* Image with click handler for selection mode */}
            <Image
              src={file.url}
              alt={file.key}
              radius="md"
              style={{
                cursor: isSelectionMode ? 'pointer' : 'default',
                border: selectedFiles.has(file.key)
                  ? '2px solid #228be6'
                  : 'none',
              }}
              onClick={() => isSelectionMode && toggleFileSelection(file.key)}
            />

            {/* Delete button (hidden in selection mode) */}
            {!isSelectionMode && (
              <ActionIcon
                color="red"
                style={{ position: 'absolute', top: 10, right: 10 }}
                onClick={() => handleDelete(file.key)}
              >
                <Icon icon={'ic:round-delete'} />
              </ActionIcon>
            )}
          </Box>
        ))}
      </SimpleGrid>

      {/* Empty state */}
      {files.length === 0 && !loading && (
        <Box ta="center" py="xl">
          <Text c="dimmed">
            No files found. Upload some images to get started.
          </Text>
        </Box>
      )}
    </Stack>
  );
}
