'use client';
import { Icon } from '@/components/FileManager/lib/Icon';
import { useLanguage } from '@/providers/languageToggleContext';
import { Box, Button, Divider, Group, Input, Space, Text } from '@mantine/core';
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { notifications } from '@mantine/notifications';
import { useRef } from 'react';

interface ImageDropzoneProps extends Partial<DropzoneProps> {
  readonly onDrop: (files: File[]) => void;
  readonly loading: boolean;
  readonly label?: string;
  readonly description?: string;
  readonly withAsterisk?: boolean;
  readonly error?: string;
}

export function ImageDropzone({
  onDrop,
  loading,
  label,
  description,
  withAsterisk,
  error,
  ...props
}: ImageDropzoneProps) {
  const openRef = useRef<() => void>(null);
  const { language } = useLanguage();

  return (
    <Box>
      <Input.Wrapper
        label={label}
        description={description}
        withAsterisk={withAsterisk}
        error={error}
        className="font-inter text-base font-normal"
      >
        <Space h={4} />
        <Dropzone
          onDrop={onDrop}
          onReject={(files) => {
            files.forEach((file) => {
              notifications.show({
                title: 'Error',
                message: `Failed to upload ${file.file.name}: ${file.errors[0]?.message || 'Invalid file'}`,
                color: 'red',
              });
            });
          }}
          maxSize={50 * 1024 * 1024} // 50 MB max
          accept={IMAGE_MIME_TYPE}
          openRef={openRef}
          loading={loading}
          {...props}
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
                  ? 'Glissez-deposez ou cliquez pour charger une image'
                  : 'Drag and drop or click to upload an image'}
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
      </Input.Wrapper>
      <Text size="xs" c="dimmed" mt={2}>
        {language === 'fr'
          ? 'Taille maximale: 50 Mo. Format: .jpg, .png'
          : 'Max size: 50 MB. Format: .jpg, .png'}
      </Text>
    </Box>
  );
}
