'use client';

import {
  ActionIcon,
  Box,
  Button,
  Card,
  Divider,
  Group,
  Stack,
  Text,
} from '@mantine/core';
import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
import { notifications } from '@mantine/notifications';
import { useEffect, useState } from 'react';
import { deleteFile, uploadFile } from '../actions/fileActions'; // Make sure this path is correct
import { Icon } from '@/components/FileManager/lib/Icon'; // Make sure this path is correct
import { useLanguage } from '@/providers/languageToggleContext';

export interface FileHandlerRes {
  key: string;
  url: string;
  size: number;
  type: string;
  name: string;
  [key: string]: unknown;
}

interface FileHandlerProps {
  onUploadSuccess?: (files: FileHandlerRes[]) => void;
  /** Set to true to allow multiple file uploads. Defaults to false. */
  multiple?: boolean;
  /** An array of existing files to display on initial render. */
  defaultValue?: FileHandlerRes[];
  label?: string;
  description?: string;
  withAsterisk?: boolean;
  error?: string;
  /** Maximum file size in megabytes (MB). Defaults to 10 MB. */
  maxSizeMB?: number;
}

export default function FileHandler({
  onUploadSuccess,
  multiple = false,
  defaultValue,
  label,
  description,
  withAsterisk,
  error,
  maxSizeMB = 10, // Default to 10MB
}: FileHandlerProps) {
  // Initialize state with the defaultValue prop
  const [uploadedFiles, setUploadedFiles] = useState<FileHandlerRes[]>(
    defaultValue || []
  );
  const [uploading, setUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const { language } = useLanguage();

  // Effect to sync state when defaultValue prop changes from the parent
  useEffect(() => {
    setUploadedFiles(defaultValue || []);
  }, [defaultValue]);

  const handleFileDrop = async (files: File[]) => {
    setUploading(true);

    // In single-file mode, if a file already exists, prepare to delete it after successful upload.
    const oldFileKey =
      !multiple && uploadedFiles.length > 0 ? uploadedFiles[0].key : null;

    // Create a parallel upload promise for each dropped file
    const uploadPromises = files.map(async (file) => {
      const formData = new FormData();
      formData.append('file', file);
      const result = await uploadFile(formData, 'document');
      if (!result.success || !result.file) {
        throw new Error(result.error ?? `Upload failed for ${file.name}`);
      }
      return {
        key: result.file.key,
        url: result.file.url,
        size: file.size,
        type: file.type,
        name: file.name,
      };
    });

    try {
      const newFilesData = await Promise.all(uploadPromises);

      // In single-file mode, if a new file was successfully uploaded, delete the old one.
      if (oldFileKey) {
        await deleteFile(oldFileKey);
      }

      // Add to state based on the `multiple` prop
      const newFilesList = multiple
        ? [...uploadedFiles, ...newFilesData]
        : newFilesData;

      setUploadedFiles(newFilesList);
      onUploadSuccess?.(newFilesList);

      notifications.show({
        title: 'Upload Successful',
        message: `${newFilesData.length} file(s) have been uploaded.`,
        color: 'green',
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'An unknown error occurred';
      notifications.show({
        title: 'Upload Failed',
        message: `Error uploading file: ${errorMessage}`,
        color: 'red',
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (keyToDelete: string) => {
    setIsDeleting(keyToDelete);
    try {
      await deleteFile(keyToDelete);

      notifications.show({
        title: 'File Deleted',
        message: 'The file has been successfully removed.',
        color: 'green',
      });

      const newFilesList = uploadedFiles.filter((f) => f.key !== keyToDelete);
      setUploadedFiles(newFilesList);
      onUploadSuccess?.(newFilesList); // Notify parent of the change
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'An unknown error occurred';
      notifications.show({
        title: 'Deletion Failed',
        message: errorMessage,
        color: 'red',
      });
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <Stack mx={4} bg={'#f3f3f3'} mt={20} gap={16} p={16} className="rounded-xl">
      <Dropzone
        onDrop={handleFileDrop}
        onReject={(rejectedFiles) => {
          notifications.show({
            title: 'File Rejected',
            message: `One or more files exceed the ${maxSizeMB} MB size limit.`,
            color: 'red',
          });
        }}
        maxSize={maxSizeMB * 1024 * 1024}
        accept={[
          MIME_TYPES.pdf,
          MIME_TYPES.doc,
          MIME_TYPES.docx,
          MIME_TYPES.xls,
          MIME_TYPES.xlsx,
          MIME_TYPES.ppt,
          MIME_TYPES.pptx,
        ]}
        loading={uploading}
        disabled={isDeleting !== null}
        multiple={multiple} // Control dropzone behavior with the prop
        radius="sm"
        className="!border-primary !border border-dashed !bg-[#f3f3f3]"
      >
        <Group
          justify="center"
          className="!flex-col"
          gap="xs"
          style={{ pointerEvents: 'none' }}
        >
          <Dropzone.Accept>
            <Icon icon="system-uicons:cloud-upload" />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <Icon icon="system-uicons:cross-circle" />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <Icon icon="humbleicons:upload" className="text-primary size-9" />
          </Dropzone.Idle>
          <div className="flex w-full flex-col items-center justify-center">
            <Text size="sm" fw={400} ta={'center'}>
              {language === 'fr'
                ? 'Déposez vos fichiers ici'
                : 'Drag your file(s) to start uploading'}
            </Text>
            <Divider
              my={2}
              label={language === 'fr' ? 'ou' : 'OR'}
              labelPosition="center"
              size="sm"
            />

            <Button
              unstyled
              className="text-primary cursor-pointer !py-[6px] font-bold"
              w={{ base: 100, sm: 160 }}
            >
              {language === 'fr' ? 'Parcourir' : 'Browse'}
            </Button>
          </div>
        </Group>
      </Dropzone>

      {/* Display list of uploaded files */}
      <Stack gap="sm" mt={uploadedFiles.length > 0 ? 'sm' : 0}>
        {uploadedFiles.map((file) => (
          <Card key={file.key} shadow="sm" padding="sm" radius="md" withBorder>
            <Group justify="space-between">
              <Box>
                <Text fw={500} truncate maw={250}>
                  {file.name}
                </Text>
                <Text size="sm" c="dimmed">
                  Size: {(file.size / 1024 / 1024).toFixed(2)} MB
                </Text>
                <Text size="sm" c="dimmed">
                  Type: {file.type}
                </Text>
              </Box>

              <ActionIcon
                variant="light"
                color="red"
                size="lg"
                onClick={() => handleDelete(file.key)}
                loading={isDeleting === file.key}
                disabled={uploading}
              >
                <Icon icon="tabler:trash" />
              </ActionIcon>
            </Group>

            <Button
              component="a"
              href={file.url}
              target="_blank"
              rel="noopener noreferrer"
              variant="light"
              mt="sm"
              fullWidth
            >
              View File
            </Button>
          </Card>
        ))}
      </Stack>
    </Stack>
  );
}
