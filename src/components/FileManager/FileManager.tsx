'use client';

import {
  ActionIcon,
  Button,
  Group,
  Image,
  Loader,
  SimpleGrid,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useState } from 'react';
import { deleteFile, listFiles } from './actions/fileActions';
import ImageHandler from './image-compressor/ImageHandler';
import { Icon } from './lib/Icon';

export default function FileManager() {
  const [files, setFiles] = useState<{ key: string; url: string }[]>([]);
  const [loading, setLoading] = useState(false);

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

  return (
    <div>
      <ImageHandler />
      <Group justify="center" mt="md">
        <Button onClick={loadFiles} disabled={loading}>
          Load Files
        </Button>
      </Group>

      {loading && <Loader mt="md" />}
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md" mt="md">
        {files.map((file) => (
          <div key={file.key} style={{ position: 'relative' }}>
            <Image src={file.url} alt={file.key} radius="md" />
            <ActionIcon
              color="red"
              style={{ position: 'absolute', top: 10, right: 10 }}
              onClick={() => handleDelete(file.key)}
            >
              <Icon icon={'ic:round-delete'} />
            </ActionIcon>
          </div>
        ))}
      </SimpleGrid>
    </div>
  );
}
