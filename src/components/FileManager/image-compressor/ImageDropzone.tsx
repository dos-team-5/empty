'use client';

import { Icon } from '@/components/Icons';
import { Box, Button, Divider, Group, Input, Space, Text } from '@mantine/core';
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { notifications } from '@mantine/notifications';
import Image from 'next/image';
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
              <Image
                src={'/uploadIcon.svg'}
                alt="Upload file"
                width={1000}
                height={1000}
                className="w-6"
              />
            </Dropzone.Idle>
            <div className="flex w-full flex-col items-center justify-center">
              <Text size="sm" fw={400} ta={'center'}>
                Drag your file(s) to start uploading
              </Text>
              <Divider my={2} label="OR" labelPosition="center" size="sm" />

              <Button
                unstyled
                className="button-neumorphic cursor-pointer !py-[6px] font-bold text-[#ee7b1f]"
                w={{ base: 100, sm: 160 }}
              >
                Browse files
              </Button>
            </div>
          </Group>
        </Dropzone>
      </Input.Wrapper>
      <Text mb={40} size="xs" c="dimmed" mt={2}>
        Only support .jpg, .png, max 50 MB for compression
      </Text>
    </Box>
  );
}
